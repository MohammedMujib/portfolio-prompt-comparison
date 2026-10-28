import { useCallback, useEffect, useRef, useState } from "react";
import {
  AUDIO_PATHS,
  localAudioExists,
  readAudioPrefs,
  writeAudioPrefs,
  type AudioPrefs,
} from "./audioConfig";

export function useSiteAudio(active: boolean) {
  const bootRef = useRef<HTMLAudioElement>(null);
  const themeRef = useRef<HTMLAudioElement>(null);
  const fadeRef = useRef(0);
  const holdTheme = useRef(false);
  const prefsRef = useRef<AudioPrefs>(readAudioPrefs());
  const readyRef = useRef({ boot: false, theme: false });
  const [bootReady, setBootReady] = useState(false);
  const [themeReady, setThemeReady] = useState(false);
  const [probed, setProbed] = useState(false);
  const [bootMissing, setBootMissing] = useState(false);
  const [themeMissing, setThemeMissing] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(prefsRef.current.muted);
  const [volume, setVolumeState] = useState(prefsRef.current.volume);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    const timeout = window.setTimeout(() => {
      if (!cancelled) setProbed(true);
    }, 2000);
    void Promise.all([localAudioExists(AUDIO_PATHS.boot), localAudioExists(AUDIO_PATHS.theme)]).then(
      ([boot, theme]) => {
        if (cancelled) return;
        readyRef.current = { boot, theme };
        setBootReady(boot);
        setThemeReady(theme);
        setBootMissing(!boot);
        setThemeMissing(!theme);
        setProbed(true);
      },
    );
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [active]);

  const level = useCallback(() => (prefsRef.current.muted ? 0 : prefsRef.current.volume), []);

  const fadeThemeIn = useCallback(() => {
    const theme = themeRef.current;
    if (!theme || !readyRef.current.theme) {
      setThemeMissing(true);
      setPlaying(false);
      return;
    }
    const boot = bootRef.current;
    if (boot && !boot.paused && !boot.ended) return;
    cancelAnimationFrame(fadeRef.current);
    holdTheme.current = false;
    theme.loop = true;
    theme.muted = prefsRef.current.muted;
    theme.volume = 0;
    void theme
      .play()
      .then(() => {
        setPlaying(true);
        setBlocked(false);
        const target = level();
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min(1, (now - start) / 900);
          theme.volume = target * progress;
          if (progress < 1) fadeRef.current = requestAnimationFrame(step);
        };
        fadeRef.current = requestAnimationFrame(step);
      })
      .catch(() => {
        setBlocked(true);
        setPlaying(false);
      });
  }, [level]);

  useEffect(() => {
    const boot = bootRef.current;
    if (!boot || !active || !bootReady) return;
    const onEnded = () => {
      setPlaying(false);
      fadeThemeIn();
    };
    boot.addEventListener("ended", onEnded);
    return () => boot.removeEventListener("ended", onEnded);
  }, [active, bootReady, fadeThemeIn]);

  const stopAll = useCallback(() => {
    cancelAnimationFrame(fadeRef.current);
    const boot = bootRef.current;
    const theme = themeRef.current;
    if (boot) {
      boot.pause();
      boot.currentTime = 0;
    }
    if (theme) {
      theme.pause();
      theme.currentTime = 0;
    }
    setPlaying(false);
  }, []);

  useEffect(() => {
    if (active) return;
    stopAll();
  }, [active, stopAll]);

  useEffect(
    () => () => {
      cancelAnimationFrame(fadeRef.current);
      bootRef.current?.pause();
      themeRef.current?.pause();
    },
    [],
  );

  const startWithSound = useCallback(() => {
    setBlocked(false);
    stopAll();
    const boot = bootRef.current;
    if (!readyRef.current.boot && !readyRef.current.theme) {
      setBootMissing(true);
      setThemeMissing(true);
      setPlaying(false);
      return;
    }
    if (readyRef.current.boot && boot) {
      setBootMissing(false);
      const theme = themeRef.current;
      if (readyRef.current.theme && theme) {
        theme.volume = 0;
        holdTheme.current = true;
        void theme
          .play()
          .then(() => {
            if (!holdTheme.current) return;
            theme.pause();
            theme.currentTime = 0;
          })
          .catch(() => {
            /* The theme is tried again after the startup sound, or from the sound control. */
          });
      }
      boot.muted = prefsRef.current.muted;
      boot.volume = level();
      void boot
        .play()
        .then(() => {
          setPlaying(true);
          if (!readyRef.current.theme) setThemeMissing(true);
        })
        .catch(() => {
          setBlocked(true);
          setPlaying(false);
        });
      return;
    }
    setBootMissing(true);
    fadeThemeIn();
  }, [fadeThemeIn, level, stopAll]);

  const togglePlay = useCallback(() => {
    const boot = bootRef.current;
    const theme = themeRef.current;
    const bootRunning = Boolean(boot && !boot.paused && !boot.ended);
    const themeRunning = Boolean(theme && !theme.paused && !theme.ended);
    if (bootRunning || themeRunning) {
      boot?.pause();
      theme?.pause();
      setPlaying(false);
      return;
    }
    if (boot && boot.currentTime > 0 && !boot.ended && readyRef.current.boot) {
      void boot
        .play()
        .then(() => setPlaying(true))
        .catch(() => setBlocked(true));
      return;
    }
    if (!readyRef.current.theme) {
      setThemeMissing(true);
      if (!readyRef.current.boot) setBootMissing(true);
      return;
    }
    fadeThemeIn();
  }, [fadeThemeIn]);

  const toggleMute = useCallback(() => {
    const next = !prefsRef.current.muted;
    prefsRef.current = { ...prefsRef.current, muted: next };
    setMuted(next);
    writeAudioPrefs(prefsRef.current);
    if (bootRef.current) bootRef.current.muted = next;
    if (themeRef.current) themeRef.current.muted = next;
  }, []);

  const setVolume = useCallback((value: number) => {
    const nextVolume = Math.min(1, Math.max(0, value));
    const nextMuted = nextVolume === 0;
    prefsRef.current = { volume: nextVolume, muted: nextMuted };
    setVolumeState(nextVolume);
    setMuted(nextMuted);
    writeAudioPrefs(prefsRef.current);
    if (bootRef.current) {
      bootRef.current.muted = nextMuted;
      if (!bootRef.current.paused) bootRef.current.volume = nextVolume;
    }
    if (themeRef.current) {
      themeRef.current.muted = nextMuted;
      if (!themeRef.current.paused) themeRef.current.volume = nextVolume;
    }
  }, []);

  return {
    bootRef,
    themeRef,
    bootReady,
    themeReady,
    probed,
    bootMissing,
    themeMissing,
    blocked,
    playing,
    muted,
    volume,
    startWithSound,
    stopAll,
    togglePlay,
    toggleMute,
    setVolume,
  };
}

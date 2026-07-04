import { useEffect, useRef } from "react";

/**
 * Vídeo de propaganda em tela ampla, sem cortes e responsivo.
 * size: "hero" | "default" | "panel"
 */
export default function AutoPlayVideo({
  src,
  title,
  className = "",
  style,
  loop = true,
  size = "default",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.playsInline = true;

    const tryPlay = async () => {
      try {
        await video.play();
      } catch {
        const resume = () => {
          video.play().catch(() => {});
          window.removeEventListener("touchstart", resume);
          window.removeEventListener("scroll", resume);
          window.removeEventListener("click", resume);
        };
        window.addEventListener("touchstart", resume, { once: true });
        window.addEventListener("scroll", resume, { once: true });
        window.addEventListener("click", resume, { once: true });
      }
    };

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener("loadeddata", tryPlay, { once: true });
      video.load();
    }

    return () => {
      video.pause();
    };
  }, [src]);

  return (
    <div
      className={`video-stage video-stage--${size} ${className}`.trim()}
      style={style}
    >
      <video
        ref={ref}
        key={src}
        src={src}
        className="video-stage__player"
        title={title}
        autoPlay
        muted
        loop={loop}
        playsInline
        controls
        preload="auto"
        controlsList="nodownload"
      />
    </div>
  );
}

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import gallery0 from "@/assets/gallery/tech7.jpg";
import gallery1 from "@/assets/gallery/tech2.jpeg";
import gallery2 from "@/assets/gallery/tech6.jpeg";
import gallery3 from "@/assets/gallery/tech4.jpeg";
import gallery4 from "@/assets/gallery/tech5.jpeg";
import gallery5 from "@/assets/gallery/tech8.jpg";

const galleryItems = [
  { src: gallery0, caption: "" },
  { src: gallery1, caption: "" },
  { src: gallery2, caption: "" },
  { src: gallery3, caption: "" },
  { src: gallery4, caption: "" },
  { src: gallery5, caption: "" },
];

const n = galleryItems.length;

const Gallery = () => {
  const [active, setActive] = useState(0);
  const dragX = useRef<number | null>(null);

  const go = (dir: number) => setActive((i) => (i + dir + n) % n);

  const onPointerDown = (e: React.PointerEvent) => (dragX.current = e.clientX);
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragX.current === null) return;
    const dx = e.clientX - dragX.current;
    dragX.current = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  return (
    <>
      <div className="container mb-8 md:mb-12">
        <h2 className="text-3xl font-semibold tracking-tight">Gallery</h2>
        <p className="mt-2 text-muted-foreground">A collection of my tech journey.</p>
      </div>

      <div
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={() => (dragX.current = null)}
        className="relative mx-auto h-[clamp(280px,60vw,460px)] w-full max-w-6xl touch-pan-y select-none overflow-hidden"
      >
        {galleryItems.map((item, i) => {
          let off = i - active;
          if (off > n / 2) off -= n;
          if (off < -n / 2) off += n;
          const abs = Math.abs(off);

          return (
            <button
              key={i}
              type="button"
              aria-label={`Show image ${i + 1} of ${n}`}
              aria-current={off === 0}
              tabIndex={abs > 1 ? -1 : 0}
              onClick={() => off !== 0 && setActive(i)}
              className="absolute left-1/2 top-1/2 w-[clamp(170px,42vw,290px)] rounded-2xl transition-all duration-500 ease-out will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{
                transform: `translate(-50%,-50%) translateX(calc(${off} * clamp(105px, 26vw, 190px))) scale(${
                  1 - abs * 0.13
                })`,
                opacity: abs > 2 ? 0 : 1 - abs * 0.3,
                zIndex: n - abs,
                pointerEvents: abs > 2 ? "none" : "auto",
                cursor: off === 0 ? "grab" : "pointer",
              }}
            >
              <img
                src={item.src}
                alt={item.caption || `Gallery image ${i + 1}`}
                width={800}
                height={1000}
                loading={abs <= 1 ? "eager" : "lazy"}
                draggable={false}
                className="aspect-[3/4] w-full rounded-2xl object-cover shadow-lg ring-1 ring-border"
              />
              {item.caption && off === 0 && (
                <p className="mt-3 text-center text-sm font-medium text-foreground/80">
                  {item.caption}
                </p>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => go(-1)}
          aria-label="Previous image"
          className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:bg-accent"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next image"
          className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:bg-accent"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </>
  );
};

export default Gallery;

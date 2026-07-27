import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award } from "lucide-react";
import type { CertificateAlbum } from "@/data/certificates";

interface Props {
  albums: CertificateAlbum[];
}

const CertificateDeck = ({ albums }: Props) => {
  const n = albums.length;
  const [active, setActive] = useState(0);
  const [openId, setOpenId] = useState<string | null>(null);
  const dragX = useRef<number | null>(null);

  const go = (dir: number) => {
    setActive((i) => (i + dir + n) % n);
    setOpenId(null);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (dragX.current === null) return;
    const dx = e.clientX - dragX.current;
    dragX.current = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  const openAlbum = albums.find((a) => a.id === openId);

  return (
    <div>
      {/* overflow-x-clip, not hidden: rotated side cards would push the page sideways on
          phones, but the peek layers still need to show above the cards */}
      <div
        onPointerDown={(e) => (dragX.current = e.clientX)}
        onPointerUp={onPointerUp}
        onPointerLeave={() => (dragX.current = null)}
        className="relative h-[clamp(240px,58vw,330px)] w-full touch-pan-y select-none overflow-x-clip"
      >
        {albums.map((album, i) => {
          let off = i - active;
          if (off > n / 2) off -= n;
          if (off < -n / 2) off += n;
          const abs = Math.abs(off);
          const isActive = off === 0;

          return (
            <button
              key={album.id}
              type="button"
              aria-label={
                isActive
                  ? `${album.issuer} — ${openId === album.id ? "hide" : "show"} certificates`
                  : `Bring ${album.issuer} to front`
              }
              aria-expanded={isActive ? openId === album.id : undefined}
              tabIndex={abs > 1 ? -1 : 0}
              onClick={() =>
                isActive
                  ? setOpenId((prev) => (prev === album.id ? null : album.id))
                  : setActive(i)
              }
              className="group absolute left-1/2 top-1/2 w-[clamp(220px,62vw,340px)] rounded-xl border border-border bg-card shadow-lg transition-all duration-500 ease-out will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{
                transform: `translate(-50%,-50%) translateX(calc(${off} * clamp(70px, 20vw, 130px))) rotate(${
                  off * 8
                }deg) scale(${1 - abs * 0.08})`,
                opacity: abs > 1 ? 0 : 1 - abs * 0.25,
                zIndex: n - abs,
                pointerEvents: abs > 1 ? "none" : "auto",
                cursor: isActive ? "pointer" : "grab",
              }}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  src={album.certificates[0].image}
                  alt={`${album.issuer} certificate`}
                  loading={abs <= 1 ? "eager" : "lazy"}
                  draggable={false}
                  className={`h-full w-full object-cover transition-transform duration-500 ${
                    isActive ? "group-hover:scale-105" : "opacity-70"
                  }`}
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 rounded-b-xl bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent p-4 pt-12">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5" style={{ color: `hsl(${album.color})` }} />
                    <h3
                      className="text-lg font-semibold text-card"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {album.issuer}
                    </h3>
                  </div>
                  <span
                    className="whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium text-card"
                    style={{ backgroundColor: `hsl(${album.color})` }}
                  >
                    {album.certificates.length} Certificates
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {openAlbum && (
          <motion.div
            key={openAlbum.id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-3 pt-6 sm:grid-cols-2 lg:grid-cols-3">
              {openAlbum.certificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ delay: index * 0.05, type: "spring", stiffness: 350, damping: 25 }}
                  className="group/cert overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow duration-200 hover:shadow-md"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover/cert:scale-105"
                    />
                  </div>
                  <div className="p-3">
                    <p
                      className="text-sm font-medium text-foreground"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {cert.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{cert.issueDate}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CertificateDeck;

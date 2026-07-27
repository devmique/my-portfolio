import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Github, SquareArrowOutUpRightIcon } from "lucide-react";
import { Project } from "@/types/project";

const TechChips = ({ tech }: { tech: string[] }) => (
  <div className="flex flex-wrap items-center gap-2">
    {tech.map((value) => (
      <span
        key={value}
        className="rounded-lg bg-secondary px-2 py-1 text-xs text-muted-foreground"
      >
        {value}
      </span>
    ))}
  </div>
);

export const ProjectCard = ({ p }: { p: Project }) => (
  <Dialog>
    <DialogTrigger asChild>
      {/* a real <button> so the card is keyboard-operable, not just clickable */}
      <button
        type="button"
        className="group h-full w-full rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
          <CardContent className="flex flex-1 flex-col p-0">
            <div className="overflow-hidden">
              {/* loading="lazy" — browser skips fetch until card enters viewport */}
              {/* decoding="async" — decode off the main thread                    */}
              <img
                src={p.imgSrc}
                alt={`${p.title} preview`}
                loading="lazy"
                decoding="async"
                width={640}
                height={192}
                className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-1 flex-col p-4">
              <h3 className="font-medium leading-snug group-hover:text-primary">{p.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-auto pt-4">
                <TechChips tech={p.tech} />
              </div>
            </div>
          </CardContent>
        </Card>
      </button>
    </DialogTrigger>

    <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
      <img
        src={p.imgSrc}
        alt={`${p.title} preview`}
        loading="lazy"
        decoding="async"
        className="max-h-[45vh] w-full rounded-lg object-cover"
      />
      <DialogHeader>
        <DialogTitle className="text-left leading-snug">{p.title}</DialogTitle>
        <DialogDescription className="text-left">{p.desc}</DialogDescription>
      </DialogHeader>

      <TechChips tech={p.tech} />

      <div className="flex flex-wrap items-center gap-2 pt-2">
        <Button asChild variant="outline" size="sm" className="text-muted-foreground">
          <a href={p.glink} target="_blank" rel="noreferrer">
            <Github className="mr-2 h-4 w-4" /> Github Repo
          </a>
        </Button>
        {p.llink && (
          <Button asChild variant="outline" size="sm" className="text-muted-foreground">
            <a href={p.llink} target="_blank" rel="noreferrer">
              <SquareArrowOutUpRightIcon className="mr-2 h-4 w-4" /> Live Demo
            </a>
          </Button>
        )}
      </div>
    </DialogContent>
  </Dialog>
);

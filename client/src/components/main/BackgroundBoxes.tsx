import { Boxes } from "../ui/background-boxes";
import { cn } from "@/lib/utils";

export function BackgroundBoxes() {
  return (
    <div className="flex overflow-hidden relative flex-col justify-center items-center w-full h-96 rounded-lg bg-slate-900">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <h1 className={cn("relative z-20 text-xl text-white md:text-4xl")}>
        Tailwind is Awesome
      </h1>
      <p className="relative z-20 mt-2 text-center text-neutral-300">
        Framer motion is the best animation library ngl
      </p>
    </div>
  );
}

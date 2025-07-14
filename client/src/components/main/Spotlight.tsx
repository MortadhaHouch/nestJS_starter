import React from "react";
import { Spotlight as SpotlightRoot } from "@/components/ui/spotlight-new";
 
export function Spotlight() {
  return (
    <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-slate-200 dark:bg-slate-800 antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <SpotlightRoot />
      <div className="relative z-10 p-4 pt-20 mx-auto w-full max-w-7xl md:pt-0">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-opacity-50 bg-gradient-to-b md:text-7xl from-neutral-50 to-neutral-400">
          Spotlight
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-base font-normal text-center text-neutral-300">
          A subtle yet effective spotlight effect, because the previous version
          is used a bit too much these days.
        </p>
      </div>
    </div>
  );
}
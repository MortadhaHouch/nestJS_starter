import React from "react";
import { BackgroundLines as BackgroundLinesRoot } from "../ui/background-lines";

export function BackgroundLines() {
  return (
    <BackgroundLinesRoot className="flex flex-col justify-center items-center px-4 w-full">
      <h2 className="relative z-20 py-2 font-sans text-2xl font-bold tracking-tight text-center text-transparent bg-clip-text bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white md:text-4xl lg:text-7xl md:py-10">
        Sanjana Airlines, <br /> Sajana Textiles.
      </h2>
      <p className="mx-auto max-w-xl text-sm text-center md:text-lg text-neutral-700 dark:text-neutral-400">
        Get the best advices from our experts, including expert artists,
        painters, marathon enthusiasts and RDX, totally free.
      </p>
    </BackgroundLinesRoot>
  );
}

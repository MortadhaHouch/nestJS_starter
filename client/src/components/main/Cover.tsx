import React from "react";
import { Cover as CoverComponent } from "@/components/ui/cover";

export function Cover({title,description}:{title:string,description:string}) {
  return (
    <div className="flex relative top-0 left-0 flex-col justify-center items-center px-4 py-20 mx-auto w-full max-w-7xl md:py-40">
      <p className="mx-auto mt-4 max-w-lg text-sm font-normal text-center md:text-lg lg:text-xl text-neutral-400">{description}</p>
      <h1 className="relative z-20 py-2 mx-auto mt-0 max-w-7xl text-4xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-b md:text-4xl lg:text-6xl from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        <br /> with <CoverComponent>{title}</CoverComponent>
      </h1>
    </div>
  );
}

import React from "react";
import { Cover as CoverComponent } from "@/components/ui/cover";

export function Cover() {
  return (
    <div>
      <h1 className="relative z-20 py-6 mx-auto mt-6 max-w-7xl text-4xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-b md:text-4xl lg:text-6xl from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Build amazing websites <br /> at <CoverComponent>warp speed</CoverComponent>
      </h1>
    </div>
  );
}

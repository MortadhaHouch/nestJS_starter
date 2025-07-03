import { motion } from "motion/react";
import React from "react";
import { AuroraBackground as AuroraBackgroundRoot } from "../ui/aurora-background";

export function AuroraBackground() {
  return (
    <AuroraBackgroundRoot>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="flex relative flex-col gap-4 justify-center items-center px-4"
      >
        <div className="text-3xl font-bold text-center md:text-7xl dark:text-white">
          Background lights are cool you know.
        </div>
        <div className="py-4 text-base font-extralight md:text-4xl dark:text-neutral-200">
          And this, is chemical burn.
        </div>
        <button className="px-4 py-2 text-white bg-black rounded-full dark:bg-white w-fit dark:text-black">
          Debug now
        </button>
      </motion.div>
    </AuroraBackgroundRoot>
  );
}

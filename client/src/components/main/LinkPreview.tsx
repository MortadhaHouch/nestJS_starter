import React from "react";
import { LinkPreview as LinkPreviewRoot } from "@/components/ui/link-preview";

export function LinkPreview() {
  return (
    <div className="flex justify-center items-center h-[40rem] flex-col px-4">
      <p className="mx-auto mb-10 max-w-3xl text-xl text-neutral-500 dark:text-neutral-400 md:text-3xl">
        <LinkPreviewRoot url="https://tailwindcss.com" className="font-bold">
          Tailwind CSS
        </LinkPreviewRoot>{" "}
        and{" "}
        <LinkPreviewRoot url="https://framer.com/motion" className="font-bold">
          Framer Motion
        </LinkPreviewRoot>{" "}
        are a great way to build modern websites.
      </p>
      <p className="mx-auto max-w-3xl text-xl text-neutral-500 dark:text-neutral-400 md:text-3xl">
        Visit{" "}
        <LinkPreviewRoot
          url="https://ui.aceternity.com"
          className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-pink-500"
        >
          Aceternity UI
        </LinkPreviewRoot>{" "}
        for amazing Tailwind and Framer Motion components.
      </p>
    </div>
  );
}

import React from "react";
import { TextHoverEffect as TextHoverEffectRoot } from "@/components/ui/text-hover-effect";

export function TextHoverEffect({text}:{text:string}) {
  return (
    <div className="h-[40rem] flex items-center justify-center">
      <TextHoverEffectRoot text={text} />
    </div>
  );
}

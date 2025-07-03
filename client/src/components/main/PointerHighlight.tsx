import { PointerHighlight as PointerHighlightRoot } from "@/components/ui/pointer-highlight";

export function PointerHighlight() {
  return (
    <div className="py-20 mx-auto max-w-lg text-2xl font-bold tracking-tight md:text-4xl">
      The best way to grow is to
      <PointerHighlightRoot>
        <span>collaborate</span>
      </PointerHighlightRoot>
    </div>
  );
}

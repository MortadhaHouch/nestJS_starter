import { TooltipContent } from "@radix-ui/react-tooltip";

import { TooltipTrigger,Tooltip as TooltipRoot } from "@radix-ui/react-tooltip";

export default function Tooltip() {
  return (
        <TooltipRoot>
            <TooltipTrigger>Hover</TooltipTrigger>
            <TooltipContent>
                <p>Add to library</p>
            </TooltipContent>
        </TooltipRoot>
    )
}

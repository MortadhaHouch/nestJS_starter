import { cn } from "@/lib/utils"
import { Slider as SliderRoot } from "@/components/ui/slider"

type SliderProps = React.ComponentProps<typeof SliderRoot>

export function Slider({ className, ...props }: SliderProps) {
  return (
    <SliderRoot
      defaultValue={[50]}
      max={100}
      step={1}
      className={cn("w-[60%]", className)}
      {...props}
    />
  )
}

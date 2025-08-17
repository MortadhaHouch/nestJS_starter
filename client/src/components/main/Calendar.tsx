import { Calendar as CalendarRoot } from "@/components/ui/calendar"
import { twMerge } from "tailwind-merge"

export function Calendar({
  className,
  onChange,
  selected,
}: {
  className?: string
  onChange?: (date: Date) => void
  selected?: Date
}) {
  return (
    <CalendarRoot
      mode="single"
      onSelect={onChange}
      className={twMerge("border rounded-md shadow-sm",className)}
      captionLayout="dropdown"
      required={true}
      selected={selected || new Date()}
    />
  )
}

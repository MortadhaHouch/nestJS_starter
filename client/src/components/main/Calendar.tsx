import { Calendar as CalendarRoot } from "@/components/ui/calendar"
import { useState } from "react"

export function Calendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <CalendarRoot
      mode="single"
      selected={date}
      onSelect={setDate}
      className="border rounded-md shadow-sm"
      captionLayout="dropdown"
    />
  )
}

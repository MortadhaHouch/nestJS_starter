import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { LoaderThree } from "../ui/loader"

export function Combobox(
  {
    options,
    value, 
    setValue,
    isLoading,
    isError
  }: 
  {
    options: {
      value: string,
      label: string
    }[], 
      value: string, 
      setValue: (v:string)=>void,
      isLoading:boolean,
      isError:boolean
  },
  
) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : "Select..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="w-full">
          <CommandInput 
            placeholder="Search..." 
            className="h-9 w-full"
            onValueChange={(v)=>{
              console.log(v);
              setValue(v);
              console.log(v)
            }}
          />
          <CommandList className="w-full">
            <CommandEmpty className="w-full">No options found.</CommandEmpty>
            <CommandGroup className="w-full">
              {
                isLoading ? (
                  <CommandItem className="w-full">
                    <LoaderThree />
                  </CommandItem>
                ):(
                  isError ? (
                    <CommandItem className="w-full">
                      Error searching users
                    </CommandItem>
                  ):(
                    <>
                      {options.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          className="w-full"
                          onSelect={(currentValue) => {
                            setValue(currentValue === value ? "" : currentValue)
                            setOpen(false)
                          }}
                        >
                          {option.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              value === option.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </>
                  )
                )
              }
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

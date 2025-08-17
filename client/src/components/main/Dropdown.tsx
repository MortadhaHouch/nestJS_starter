import {
  DropdownMenu as DropdownMenuComponent,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenu(
    {
        trigger,
        children
    }: {
        trigger: React.ReactNode,
        children: React.ReactNode
    }) {
    return (
        <DropdownMenuComponent>
            <DropdownMenuTrigger asChild>
                {trigger}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-2 p-2" align="end">
                {children}
            </DropdownMenuContent>
        </DropdownMenuComponent>
    )
}
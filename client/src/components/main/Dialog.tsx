import { Button } from "@/components/ui/button"
import {
  Dialog as DialogRoot,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function Dialog({
    actionTitle, 
    title,
    description,
    action,
    children
}: {title: string, description: string, actionTitle: string, action: () => void, children: React.ReactNode}) {
  return (
    <DialogRoot>
      <form onSubmit={action}>
        <DialogTrigger asChild>
          <Button variant="outline">{actionTitle}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
                {description}
            </DialogDescription>
            {children}
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </DialogRoot>
  )
}

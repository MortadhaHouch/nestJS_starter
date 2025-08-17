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
    title,
    description,
    actionTitle,
    action,
    children,
    trigger,
    triggerAction,
    open
}: {
  title: string, 
  description: string, 
  actionTitle: React.ReactNode, 
  action: () => void, 
  children: React.ReactNode, 
  trigger?: React.ReactNode, 
  triggerAction?: () => void, 
  open?: boolean
}) {
  return (
    <DialogRoot open={open}>
        <DialogTrigger onClick={triggerAction} asChild>
          {trigger}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] max-w-[95vw] max-h-[85vh] flex flex-col">
          <DialogHeader className="px-1">
            <DialogTitle className="text-lg">{title}</DialogTitle>
            {description && (
              <DialogDescription className="text-sm">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
          <div className="flex-1 overflow-y-auto px-1 py-2">
            {children}
          </div>
          <DialogFooter className="pt-4 border-t mt-4">
            <DialogClose className="flex items-center justify-center gap-2 px-2 py-1 bg-gray-100 border border-gray-200 rounded-md cursor-pointer dark:bg-slate-800 dark:border-slate-700">
              close
            </DialogClose>
            <Button 
              className="bg-purple-700 cursor-pointer active:bg-purple-950"
              onClick={action}
            >{actionTitle}</Button>
          </DialogFooter>
        </DialogContent>
    </DialogRoot>
  )
}

import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"

import {
  Alert as AlertRoot,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function Alert() {
  return (
    <div className="grid items-start w-full max-w-xl gap-4">
      <AlertRoot>
        <CheckCircle2Icon />
        <AlertTitle>Success! Your changes have been saved</AlertTitle>
        <AlertDescription>
          This is an alert with icon, title and description.
        </AlertDescription>
      </AlertRoot>
      <AlertRoot>
        <PopcornIcon />
        <AlertTitle>
          This Alert has a title and an icon. No description.
        </AlertTitle>
      </AlertRoot>
      <AlertRoot variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Unable to process your payment.</AlertTitle>
        <AlertDescription>
          <p>Please verify your billing information and try again.</p>
          <ul className="text-sm list-disc list-inside">
            <li>Check your card details</li>
            <li>Ensure sufficient funds</li>
            <li>Verify billing address</li>
          </ul>
        </AlertDescription>
      </AlertRoot>
    </div>
  )
}

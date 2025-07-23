import {type Dispatch} from "react"
import {
  InputOTP as InputOTPRoot,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
export function InputOTP({optValue,setOptValue}:{optValue:string,setOptValue:Dispatch<React.SetStateAction<string>>}) {
  return (
    <div className="space-y-2">
      <InputOTPRoot
        maxLength={6}
        value={optValue}
        onChange={(value) => setOptValue(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTPRoot>
    </div>
  )
}
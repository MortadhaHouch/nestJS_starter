import { twMerge } from "tailwind-merge";
import { TracingBeam as TracingBeamRoot } from "../ui/tracing-beam";
 
export function TracingBeam({children, className}: {children: React.ReactNode, className?: string}) {
  return (
    <TracingBeamRoot className={twMerge("px-6", className)}>
        {children}
    </TracingBeamRoot>
  );
}
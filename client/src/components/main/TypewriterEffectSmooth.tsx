import { NavLink } from "react-router-dom";
import { TypewriterEffect } from "../ui/typewriter-effect";
import { ArrowRightCircle, LogIn } from "lucide-react";
import {motion} from "framer-motion"
export function TypewriterEffectSmooth() {
  const words = [
    {
      text: "Plan",
    },{
      text: "Your",
    },{
      text: "Success",
      className: "text-blue-500 dark:text-blue-500",
    },{
      text: "With",
    },{
      text: "Task",
    },{
      text: "Vortex",
      className: "text-blue-500 dark:text-blue-500",
    }
  ];
  return (
    <div className="flex flex-col gap-4 justify-center items-center min-h-screen">
      <motion.p
        initial={{ 
          opacity: 0,
          y: 20
        }}
        whileInView={{ 
          opacity: 1,
          y: 0
        }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.5,
          stiffness: 100,
          type: "spring"
        }}
        className="text-xs font-semibold md:text-lg text-neutral-600 dark:text-neutral-200 sm:text-base">
        The World to success is{" "} few clicks away
      </motion.p>
      <TypewriterEffect words={words} />
      <div className="flex flex-col space-x-0 space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <NavLink 
          to={"/login"}
          className="flex flex-row gap-2 justify-center items-center w-40 h-10 text-sm text-white bg-black rounded-xl border border-transparent transition-all dark:border-white hover:border-white hover:bg-white hover:text-black">
          <LogIn/> <span>Login</span>
        </NavLink>
        <NavLink to={"/signup"} className="flex flex-row gap-2 justify-center items-center w-40 h-10 text-sm text-black bg-white rounded-xl border border-black transition-all dark:border-white hover:border-black hover:bg-black hover:text-white">
          <ArrowRightCircle/><span>Signup</span>
        </NavLink>
      </div>
    </div>
  );
}

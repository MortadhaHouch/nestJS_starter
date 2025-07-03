import React from "react";
import { Meteors as MeteorsRoot } from "../ui/meteors";

export function Meteors() {
  return (
    <div className="">
      <div className="relative w-full max-w-xl">
        <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl" />
        <div className="flex overflow-hidden relative flex-col justify-end items-start px-4 py-8 h-full bg-gray-900 rounded-2xl border border-gray-800 shadow-xl">
          <div className="flex justify-center items-center mb-4 w-5 h-5 rounded-full border border-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-2 h-2 text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
              />
            </svg>
          </div>

          <h1 className="relative z-50 mb-4 text-xl font-bold text-white">
            Meteors because they&apos;re cool
          </h1>

          <p className="relative z-50 mb-4 text-base font-normal text-slate-500">
            I don&apos;t know what to write so I&apos;ll just paste something
            cool here. One more sentence because lorem ipsum is just
            unacceptable. Won&apos;t ChatGPT the shit out of this.
          </p>

          <button className="px-4 py-1 text-gray-300 rounded-lg border border-gray-500">
            Explore
          </button>

          {/* Meaty part - Meteor effect */}
          <MeteorsRoot number={20} />
        </div>
      </div>
    </div>
  );
}

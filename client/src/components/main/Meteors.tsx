import { Meteors as MeteorsRoot } from "../ui/meteors";

export function Meteors({
  title,
  description,
  children,
  containerClassName
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  containerClassName?:string
}) {
  return (
    <div className={containerClassName}>
      <div className="relative w-full max-w-7xl">
        <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl" />
        <div className="relative flex flex-col items-start justify-end h-full px-4 py-8 overflow-hidden bg-gray-300 border border-gray-300 shadow-xl rounded-2xl dark:bg-gray-900 dark:border-gray-900">
          <h1 className="relative z-50 mb-4 text-xl font-bold text-gray-800 dark:text-gray-300 sm:text-2xl">
            {title}
          </h1>
          <p className="relative z-50 mb-4 text-base font-normal text-slate-500 dark:text-slate-400">
            {description}
          </p>
          {children}
          <MeteorsRoot number={20} />
        </div>
      </div>
    </div>
  );
}

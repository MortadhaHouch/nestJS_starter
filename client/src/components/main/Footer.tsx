import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="overflow-hidden relative z-10 pt-16 pb-8 mt-8 w-full bg-slate-500 dark:bg-slate-900 md:pt-24 md:pb-12 md:mt-0">
      <div className="absolute top-0 left-1/2 z-0 w-full h-full -translate-x-1/2 pointer-events-none select-none">
        <div className="absolute -top-32 left-1/4 w-72 h-72 rounded-full blur-3xl bg-purple-400/20 dark:bg-purple-600/20"></div>
        <div className="absolute -bottom-24 right-1/4 w-80 h-80 rounded-full blur-3xl bg-purple-400/20 dark:bg-purple-600/20"></div>
      </div>
      <div className="flex relative flex-col gap-8 items-center px-6 py-10 mx-auto max-w-6xl rounded-2xl glass md:flex-row md:items-start md:justify-between md:gap-12">
        <div className="flex flex-col items-center md:items-start">
          <NavLink to="/" className="flex gap-2 items-center mb-4">
            <span className="flex justify-center items-center w-9 h-9 text-2xl font-extrabold text-white bg-gradient-to-br from-purple-400 to-purple-700 rounded-full shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </span>
            <span className="text-xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-purple-200 to-purple-500">
              Task Vortex
            </span>
          </NavLink>
          <p className="mb-6 max-w-xs text-sm text-center text-foreground md:text-left">
            Task Vortex is a task management platform that helps you stay
            organized and on top of your to-dos.
          </p>
          <div className="flex gap-3 mt-2 text-purple-400">
            <a
              href="#"
              aria-label="Twitter"
              className="transition hover:text-foreground"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.633 7.997c.013.176.013.353.013.53 0 5.387-4.099 11.605-11.604 11.605A11.561 11.561 0 010 18.29c.373.044.734.074 1.12.074a8.189 8.189 0 005.065-1.737 4.102 4.102 0 01-3.834-2.85c.25.04.5.065.765.065.37 0 .734-.049 1.08-.147A4.092 4.092 0 01.8 8.582v-.05a4.119 4.119 0 001.853.522A4.099 4.099 0 01.812 5.847c0-.02 0-.042.002-.062a11.653 11.653 0 008.457 4.287A4.62 4.62 0 0122 5.924a8.215 8.215 0 002.018-.559 4.108 4.108 0 01-1.803 2.268 8.233 8.233 0 002.368-.648 8.897 8.897 0 01-2.062 2.112z" />
              </svg>
            </a>
            <a
              href="https://github.com/MortadhaHouch"
              aria-label="GitHub"
              className="transition hover:text-foreground"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .29a12 12 0 00-3.797 23.401c.6.11.82-.26.82-.577v-2.17c-3.338.726-4.042-1.415-4.042-1.415-.546-1.387-1.332-1.756-1.332-1.756-1.09-.744.084-.729.084-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.809 1.306 3.495.999.106-.775.418-1.307.76-1.608-2.665-.301-5.466-1.332-5.466-5.933 0-1.31.469-2.381 1.236-3.222-.123-.303-.535-1.523.117-3.176 0 0 1.007-.322 3.301 1.23a11.502 11.502 0 016.002 0c2.292-1.552 3.297-1.23 3.297-1.23.654 1.653.242 2.873.119 3.176.77.841 1.235 1.912 1.235 3.222 0 4.61-2.805 5.629-5.476 5.925.429.369.813 1.096.813 2.211v3.285c0 .32.217.694.825.576A12 12 0 0012 .29"></path>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/mortadha-houch-73b232225/"
              aria-label="LinkedIn"
              className="transition hover:text-foreground"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5v-14a5 5 0 00-5-5zm-11 19h-3v-9h3zm-1.5-10.268a1.752 1.752 0 110-3.505 1.752 1.752 0 010 3.505zm15.5 10.268h-3v-4.5c0-1.07-.02-2.450-1.492-2.450-1.495 0-1.725 1.166-1.725 2.372v4.578h-3v-9h2.88v1.23h.04a3.157 3.157 0 012.847-1.568c3.042 0 3.605 2.003 3.605 4.612v4.726z" />
              </svg>
            </a>
          </div>
        </div>
        <nav className="flex flex-col gap-9 w-full text-center md:w-auto md:flex-row md:justify-end md:text-left">
          <div>
            <div className="mb-3 text-xs font-semibold tracking-widest text-purple-400 uppercase">
              Product
            </div>
            <ul className="space-y-2">
              <li>
                <NavLink to="#" className="text-foreground/70">
                  Features
                </NavLink>
              </li>
              <li>
                <NavLink to="#" className="text-foreground/70">
                  Pricing
                </NavLink>
              </li>
              <li>
                <NavLink to="#" className="text-foreground/70">
                  Integrations
                </NavLink>
              </li>
              <li>
                <NavLink to="#" className="text-foreground/70">
                  Updates
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <div className="mb-3 text-xs font-semibold tracking-widest text-purple-400 uppercase">
              Company
            </div>
            <ul className="space-y-2">
              <li>
                <NavLink to="/about" className="text-foreground/70">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/blog" className="text-foreground/70">
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-foreground/70">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <div className="mb-3 text-xs font-semibold tracking-widest text-purple-400 uppercase">
              Resources
            </div>
            <ul className="space-y-2">
              <li>
                <NavLink to="#" className="text-foreground/70">
                  Docs
                </NavLink>
              </li>
              <li>
                <NavLink to="/community" className="text-foreground/70">
                  Community
                </NavLink>
              </li>
              <li>
                <NavLink to="/support" className="text-foreground/70">
                  Support
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="relative z-10 mt-10 text-xs text-center text-foreground">
        <span>&copy; 2025 TaskVortex. All rights reserved.</span>
      </div>
    </footer>
  );
}
 
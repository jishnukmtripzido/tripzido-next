// "use client";

// import Link from "next/link";
// import { useState, useEffect, useRef, useTransition } from "react";
// import { useRouter } from "next/navigation";
// import MobileDrawer from "./MobileDrawer";
// import LoginModal from "@/components/features/auth/LoginModal";
// import { logoutAction } from "@/actions/auth.actions";

// type HeaderClientProps = {
//   logoWidth?: number;
//   logoHeight?: number;
//   logoTextSize?: string;
//   linkIconsSize?: number;
//   headerLgScreenMx?: string;
//   headerValues?: string;
//   isLoggedIn?: boolean;
//   userName?: string | null;
// };

// export default function HeaderClient({
//   logoWidth,
//   logoHeight,
//   logoTextSize,
//   linkIconsSize,
//   headerLgScreenMx,
//   headerValues,
//   isLoggedIn = false,
//   userName,
// }: HeaderClientProps) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [loginOpen, setLoginOpen] = useState(false);
//   const [initialMode, setInitialMode] = useState<"login" | "register">("login");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [logoutError, setLogoutError] = useState<string | null>(null);
//   const [isPending, startTransition] = useTransition();
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const router = useRouter();

//   /* close body scroll when mobile menu is open */
//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [menuOpen]);

//   /* close dropdown on outside click */
//   useEffect(() => {
//     if (!dropdownOpen) return;
//     const handleClick = (e: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(e.target as Node)
//       ) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClick);
//     return () => document.removeEventListener("mousedown", handleClick);
//   }, [dropdownOpen]);

//   const closeMenu = () => setMenuOpen(false);

//   const openModal = (mode: "login" | "register") => {
//     setInitialMode(mode);
//     setLoginOpen(true);
//   };

//   /* ── logout ── */
//   const handleLogout = () => {
//     setLogoutError(null);
//     startTransition(async () => {
//       const result = await logoutAction();
//       setDropdownOpen(false);
//       if (result.success) {
//         router.refresh();
//         router.push("/");
//       } else {
//         setLogoutError(result.message);
//         setTimeout(() => {
//           setLogoutError(null);
//           router.refresh();
//           router.push("/");
//         }, 3000);
//       }
//     });
//   };

//   const navLinks = [
//     {
//       href: "#",
//       label: "Bikes",
//       icon: (
//         <svg
//           className="w-5 h-5"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//           />
//           <path
//             d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//           />
//         </svg>
//       ),
//     },
//     {
//       href: "#",
//       label: "Destinations",
//       icon: (
//         <svg
//           className="w-5 h-5"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//           />
//         </svg>
//       ),
//     },
//     {
//       href: "#",
//       label: "How it works",
//       icon: (
//         <svg
//           className="w-5 h-5"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//           />
//         </svg>
//       ),
//     },
//     {
//       href: "#",
//       label: "Offers",
//       icon: (
//         <svg
//           className="w-5 h-5"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12z"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//           />
//         </svg>
//       ),
//     },
//   ];

//   return (
//     <>
//       {/* ── Error toast ── */}
//       {logoutError && (
//         <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-3 rounded-xl shadow-lg animate-toast-fade-in">
//           <svg
//             className="w-4 h-4 shrink-0"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//             />
//           </svg>
//           {logoutError}
//         </div>
//       )}

//       <header
//         className={
//           headerValues || "w-full px-0 py-2 border-b border-gray-100 shadow-sm"
//         }
//       >
//         <div
//           className={`mx-auto px-4 lg:px-8 py-2 flex items-center justify-between ${headerLgScreenMx || "xl:mx-[121.5px] xl:px-0"}`}
//         >
//           {/* Left: Logo + Nav */}
//           <div className="flex items-center space-x-12">
//             <Link href="/">
//               <div className="flex items-center space-x-2">
//                 <div className="bg-brand-yellow p-1.5 rounded-lg">
//                   <svg
//                     className={`w-${logoWidth || 5} h-${logoHeight || 5} text-white`}
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       d="M13 10V3L4 14h7v7l9-11h-7z"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                     />
//                   </svg>
//                 </div>
//                 <span
//                   className={`text-${logoTextSize || "2xl"} font-extrabold tracking-tight`}
//                 >
//                   tripzido
//                 </span>
//               </div>
//             </Link>

//             <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.label}
//                   href={link.href}
//                   className="flex items-center space-x-2 hover:text-black"
//                 >
//                   <div className="flex items-center space-x-2">
//                     {link.icon}
//                     <span>{link.label}</span>
//                   </div>
//                 </Link>
//               ))}
//             </nav>
//           </div>

//           {/* Right */}
//           <div className="flex items-center space-x-3 text-sm font-medium">
//             {/* Indian flag */}
//             <div className="w-6 h-4 overflow-hidden rounded-sm cursor-pointer border border-gray-300 hidden sm:block">
//               <div className="h-1/3 bg-[#FF9933]" />
//               <div className="h-1/3 bg-white flex items-center justify-center">
//                 <div className="w-1 h-1 rounded-full bg-blue-800" />
//               </div>
//               <div className="h-1/3 bg-[#138808]" />
//             </div>

//             {/* Help */}
//             <div className="text-gray-500 cursor-pointer hidden md:block">
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                 />
//               </svg>
//             </div>

//             {/* ── AUTH ── */}
//             {isLoggedIn ? (
//               <div className="relative hidden md:block" ref={dropdownRef}>
//                 <button
//                   onClick={() => setDropdownOpen((prev) => !prev)}
//                   className="flex items-center space-x-2 cursor-pointer focus:outline-none group"
//                   aria-expanded={dropdownOpen}
//                   aria-haspopup="true"
//                 >
//                   <div className="w-8 h-8 rounded-full bg-brand-yellow flex items-center justify-center text-white font-bold ring-2 ring-transparent group-hover:ring-amber-200 transition-all">
//                     {userName ? userName.charAt(0).toUpperCase() : "U"}
//                   </div>
//                   <span className="hidden sm:block text-sm font-bold text-gray-700 group-hover:text-black">
//                     Your account
//                   </span>
//                   <svg
//                     className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       d="M19 9l-7 7-7-7"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                     />
//                   </svg>
//                 </button>

//                 {/* Dropdown panel */}
//                 <div
//                   className={`absolute right-0 mt-2.5 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50
//                     transition-all duration-200 origin-top-right
//                     ${
//                       dropdownOpen
//                         ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
//                         : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
//                     }`}
//                 >
//                   <div className="px-4 py-3 bg-amber-50 border-b border-amber-100">
//                     <p className="text-xs text-gray-500">Signed in as</p>
//                     <p className="text-sm font-bold text-gray-800 truncate">
//                       {userName && userName.trim() ? userName : "User"}
//                     </p>
//                   </div>

//                   <div className="py-1.5">
//                     <Link
//                       href="/profile"
//                       onClick={() => setDropdownOpen(false)}
//                       className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
//                     >
//                       <svg
//                         className="w-4 h-4 text-gray-400"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                         />
//                       </svg>
//                       Profile
//                     </Link>
//                     <Link
//                       href="/profile"
//                       onClick={() => setDropdownOpen(false)}
//                       className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
//                     >
//                       <svg
//                         className="w-4 h-4 text-gray-400"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                         />
//                       </svg>
//                       My Trips
//                     </Link>
//                   </div>

//                   <div className="border-t border-gray-100 py-1.5">
//                     <button
//                       onClick={handleLogout}
//                       disabled={isPending}
//                       className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {isPending ? (
//                         <>
//                           <svg
//                             className="w-4 h-4 animate-spin"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                           >
//                             <circle
//                               className="opacity-25"
//                               cx="12"
//                               cy="12"
//                               r="10"
//                               stroke="currentColor"
//                               strokeWidth="4"
//                             />
//                             <path
//                               className="opacity-75"
//                               fill="currentColor"
//                               d="M4 12a8 8 0 018-8v8H4z"
//                             />
//                           </svg>
//                           Signing out…
//                         </>
//                       ) : (
//                         <>
//                           <svg
//                             className="w-4 h-4"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                             />
//                           </svg>
//                           Sign out
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               /* ── Logged-out auth buttons ── */
//               <div className="hidden md:flex items-center space-x-2">
//                 <button
//                   onClick={() => openModal("register")}
//                   className="px-4 py-2 text-sm font-semibold text-gray-900 border-none rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Register
//                 </button>
//                 <button
//                   onClick={() => openModal("login")}
//                   className="px-4 py-2 cursor-pointer text-sm font-semibold bg-brand-yellow rounded-lg hover:bg-[#e6ac00] transition-colors"
//                 >
//                   Sign in
//                 </button>
//               </div>
//             )}

//             {/* Hamburger */}
//             <button
//               onClick={() => setMenuOpen(true)}
//               className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors"
//               aria-label="Open menu"
//             >
//               <svg
//                 className="w-8 h-8 text-gray-700"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   d="M4 6h16M4 12h16M4 18h16"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Mobile drawer backdrop */}
//       {menuOpen && (
//         <div
//           onClick={closeMenu}
//           className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
//         />
//       )}

//       <MobileDrawer
//         isOpen={menuOpen}
//         onClose={closeMenu}
//         navLinks={navLinks}
//         userName={userName ?? null}
//         isLoggedIn={isLoggedIn}
//         onLoginClick={() => {
//           closeMenu();
//           openModal("login");
//         }}
//         onRegisterClick={() => {
//           closeMenu();
//           openModal("register");
//         }}
//         onLogout={handleLogout}
//         isLoggingOut={isPending}
//       />

//       <LoginModal
//         isOpen={loginOpen}
//         onClose={() => setLoginOpen(false)}
//         initialMode={initialMode}
//       />

//       <style jsx global>{`
//         @keyframes toast-fade-in {
//           from {
//             opacity: 0;
//             transform: translateX(-50%) translateY(-8px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(-50%) translateY(0);
//           }
//         }
//         .animate-toast-fade-in {
//           animation: toast-fade-in 0.2s ease-out both;
//         }

//         @keyframes fade-in {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }
//         .animate-fade-in {
//           animation: fade-in 0.15s ease-out both;
//         }
//       `}</style>
//     </>
//   );
// }

"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import MobileDrawer from "./MobileDrawer";
import LoginModal from "@/components/features/auth/LoginModal";
import { logoutAction } from "@/actions/auth.actions";

type HeaderClientProps = {
  logoWidth?: number;
  logoHeight?: number;
  logoTextSize?: string;
  linkIconsSize?: number;
  headerLgScreenMx?: string;
  headerValues?: string;
  isLoggedIn?: boolean;
  userName?: string | null;
};

export default function HeaderClient({
  logoWidth,
  logoHeight,
  logoTextSize,
  linkIconsSize,
  headerLgScreenMx,
  headerValues,
  isLoggedIn = false,
  userName,
}: HeaderClientProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [initialMode, setInitialMode] = useState<"login" | "register">("login");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  /* close body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* close dropdown on outside click */
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  const closeMenu = () => setMenuOpen(false);

  const openModal = (mode: "login" | "register") => {
    setInitialMode(mode);
    setLoginOpen(true);
  };

  /* ── logout ── */
  const handleLogout = () => {
    setLogoutError(null);
    startTransition(async () => {
      const result = await logoutAction();
      setDropdownOpen(false);
      if (result.success) {
        router.refresh();
        router.push("/");
      } else {
        setLogoutError(result.message);
        setTimeout(() => {
          setLogoutError(null);
          router.refresh();
          router.push("/");
        }, 3000);
      }
    });
  };

  const navLinks = [
    {
      href: "#",
      label: "Bikes",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    {
      href: "#",
      label: "Destinations",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    {
      href: "#",
      label: "How it works",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    {
      href: "#",
      label: "Offers",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* ── Error toast ── */}
      {logoutError && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-3 rounded-xl shadow-lg animate-toast-fade-in">
          <svg
            className="w-4 h-4 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          {logoutError}
        </div>
      )}

      <header
        className={
          headerValues || "w-full px-0 py-2 border-b border-gray-100 shadow-sm"
        }
      >
        <div
          className={`mx-auto px-4 lg:px-8 py-2 flex items-center justify-between ${headerLgScreenMx || "xl:mx-[121.5px] xl:px-0"}`}
        >
          {/* Left: Logo + Nav */}
          <div className="flex items-center space-x-12">
            <Link href="/">
              <div className="flex items-center space-x-2">
                <div className="bg-brand-yellow p-1.5 rounded-lg">
                  <svg
                    className={`w-${logoWidth || 5} h-${logoHeight || 5} text-white`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <span
                  className={`text-${logoTextSize || "2xl"} font-extrabold tracking-tight`}
                >
                  tripzido
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center space-x-2 hover:text-black"
                >
                  <div className="flex items-center space-x-2">
                    {link.icon}
                    <span>{link.label}</span>
                  </div>
                </Link>
              ))}
            </nav>
          </div>

          {/* Right */}
          <div className="flex items-center space-x-3 text-sm font-medium">
            {/* Indian flag */}
            <div className="w-6 h-4 overflow-hidden rounded-sm cursor-pointer border border-gray-300 hidden sm:block">
              <div className="h-1/3 bg-[#FF9933]" />
              <div className="h-1/3 bg-white flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-800" />
              </div>
              <div className="h-1/3 bg-[#138808]" />
            </div>

            {/* Help */}
            <div className="text-gray-500 cursor-pointer hidden md:block">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* ── AUTH (desktop only) ── */}
            {isLoggedIn ? (
              <div className="relative hidden md:block" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center space-x-2 cursor-pointer focus:outline-none group"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-yellow flex items-center justify-center text-white font-bold ring-2 ring-transparent group-hover:ring-amber-200 transition-all">
                    {userName ? userName.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="hidden sm:block text-sm font-bold text-gray-700 group-hover:text-black">
                    Your account
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M19 9l-7 7-7-7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </button>

                {/* Dropdown panel */}
                <div
                  className={`absolute right-0 mt-2.5 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50
                    transition-all duration-200 origin-top-right
                    ${
                      dropdownOpen
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`}
                >
                  <div className="px-4 py-3 bg-amber-50 border-b border-amber-100">
                    <p className="text-xs text-gray-500">Signed in as</p>
                    <p className="text-sm font-bold text-gray-800 truncate">
                      {userName && userName.trim() ? userName : "User"}
                    </p>
                  </div>

                  <div className="py-1.5">
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                      Profile
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                      My Trips
                    </Link>
                  </div>

                  <div className="border-t border-gray-100 py-1.5">
                    <button
                      onClick={handleLogout}
                      disabled={isPending}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPending ? (
                        <>
                          <svg
                            className="w-4 h-4 animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8H4z"
                            />
                          </svg>
                          Signing out…
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            />
                          </svg>
                          Sign out
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* ── Logged-out auth buttons (desktop only) ── */
              <div className="hidden md:flex items-center space-x-2">
                <button
                  onClick={() => openModal("register")}
                  className="px-4 py-2 text-sm font-semibold text-gray-900 border-none rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Register
                </button>
                <button
                  onClick={() => openModal("login")}
                  className="px-4 py-2 cursor-pointer text-sm font-semibold bg-brand-yellow rounded-lg hover:bg-[#e6ac00] transition-colors"
                >
                  Sign in
                </button>
              </div>
            )}

            {/* ── Mobile: user avatar (logged in) or person icon (logged out) ── */}
            {isLoggedIn ? (
              <Link
                href="/profile"
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-brand-yellow text-white font-bold text-sm flex-shrink-0"
                aria-label="Go to profile"
              >
                {userName ? userName.charAt(0).toUpperCase() : "U"}
              </Link>
            ) : (
              <button
                onClick={() => openModal("login")}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                aria-label="Sign in"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </button>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Open menu"
            >
              <svg
                className="w-8 h-8 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer backdrop */}
      {menuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
        />
      )}

      <MobileDrawer
        isOpen={menuOpen}
        onClose={closeMenu}
        navLinks={navLinks}
        userName={userName ?? null}
        isLoggedIn={isLoggedIn}
        onLoginClick={() => {
          closeMenu();
          openModal("login");
        }}
        onRegisterClick={() => {
          closeMenu();
          openModal("register");
        }}
        onLogout={handleLogout}
        isLoggingOut={isPending}
      />

      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        initialMode={initialMode}
      />

      <style jsx global>{`
        @keyframes toast-fade-in {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        .animate-toast-fade-in {
          animation: toast-fade-in 0.2s ease-out both;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.15s ease-out both;
        }
      `}</style>
    </>
  );
}

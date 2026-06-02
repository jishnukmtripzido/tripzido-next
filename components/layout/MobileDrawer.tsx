// "use client";

// import Link from "next/link";

// type NavLink = {
//   href: string;
//   label: string;
//   icon: React.ReactNode;
// };

// type MobileDrawerProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   navLinks: NavLink[];
//   userNameFirstLetter?: string;
// };

// export default function MobileDrawer({
//   isOpen,
//   onClose,
//   navLinks,
//   userNameFirstLetter,
// }: MobileDrawerProps) {
//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         onClick={onClose}
//         className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
//           isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
//         }`}
//       />

//       {/* Drawer panel */}
//       <div
//         className={`fixed top-0 right-0 h-full w-[300px] z-50 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
//           <div className="flex items-center space-x-2">
//             <div className="bg-[#ffc107] p-1 rounded-lg">
//               <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//               </svg>
//             </div>
//             <span className="text-xl font-semibold tracking-tight">tripzido</span>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
//             aria-label="Close menu"
//           >
//             <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//             </svg>
//           </button>
//         </div>

//         {/* User info strip */}
//         <div className="flex items-center gap-3 px-5 py-4 bg-amber-50 border-b border-amber-100">
//           <div className="w-10 h-10 rounded-full bg-[#ffc107] flex items-center justify-center text-white font-bold text-base shrink-0">
//             {userNameFirstLetter || "J"}
//           </div>
//           <div>
//             <p className="text-sm font-bold text-gray-800">Your account</p>
//             <p className="text-xs text-gray-500">Manage your trips & profile</p>
//           </div>
//         </div>

//         {/* Auth buttons */}
//         <div className="flex gap-3 px-5 py-4 border-b border-gray-100">
//           <Link
//             href="#"
//             onClick={onClose}
//             className="flex-1 text-center text-sm font-semibold bg-[#ffc107] text-white py-2.5 rounded-xl hover:bg-[#e6ab00] transition-colors"
//           >
//             Sign In
//           </Link>
//           <Link
//             href="#"
//             onClick={onClose}
//             className="flex-1 text-center text-sm font-semibold border border-[#ffc107] text-[#ffc107] py-2.5 rounded-xl hover:bg-amber-50 transition-colors"
//           >
//             Register
//           </Link>
//         </div>

//         {/* Nav links */}
//         <nav className="flex-1 overflow-y-auto px-3 py-3">
//           <p className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
//             Explore
//           </p>
//           <ul className="space-y-0.5">
//             {navLinks.map((link) => (
//               <li key={link.label}>
//                 <Link
//                   href={link.href}
//                   onClick={onClose}
//                   className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-amber-50 hover:text-black transition-colors"
//                 >
//                   <span className="text-[#ffc107]">{link.icon}</span>
//                   {link.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           <div className="mt-5 mb-2">
//             <p className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
//               Support
//             </p>
//             <Link
//               href="#"
//               onClick={onClose}
//               className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-amber-50 hover:text-black transition-colors"
//             >
//               <span className="text-[#ffc107]">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//                 </svg>
//               </span>
//               Help & Support
//             </Link>
//           </div>
//         </nav>

      
//       </div>
//     </>
//   );
// }


"use client";

import Link from "next/link";

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

type MobileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  userNameFirstLetter?: string;
  isLoggedIn?: boolean;
  onLoginClick?: () => void;
};

export default function MobileDrawer({
  isOpen,
  onClose,
  navLinks,
  userNameFirstLetter,
  isLoggedIn = false,
  onLoginClick,
}: MobileDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] z-50 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="bg-[#ffc107] p-1 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
            <span className="text-xl font-semibold tracking-tight">tripzido</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* ── AUTH SECTION ── */}
        {isLoggedIn ? (
          /* Logged-in: account info strip */
          <div className="flex items-center gap-3 px-5 py-4 bg-amber-50 border-b border-amber-100">
            <div className="w-10 h-10 rounded-full bg-[#ffc107] flex items-center justify-center text-white font-bold text-base shrink-0">
              {userNameFirstLetter || "J"}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">Your account</p>
              <p className="text-xs text-gray-500">Manage your trips &amp; profile</p>
            </div>
          </div>
        ) : (
          /* Logged-out: Sign In + Register buttons */
          <div className="flex gap-3 px-5 py-4 border-b border-gray-100">
            
            <Link
              href="/register"
              onClick={onClose}
              className="flex-1 cursor-pointer text-center text-sm font-semibold border border-[#ffc107] text-[#ffc107] py-2.5 rounded-xl hover:bg-amber-50 transition-colors"
            >
              Register
            </Link>
            <button
              onClick={() => { onClose(); onLoginClick?.(); }}
              className="flex-1 cursor-pointer text-center text-sm font-semibold bg-[#ffc107] text-white py-2.5 rounded-xl hover:bg-[#e6ab00] transition-colors"
            >
              Sign In
            </button>
          </div>
        )}

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          <p className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            Explore
          </p>
          <ul className="space-y-0.5">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-amber-50 hover:text-black transition-colors"
                >
                  <span className="text-[#ffc107]">{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-5 mb-2">
            <p className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
              Support
            </p>
            <Link
              href="#"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-amber-50 hover:text-black transition-colors"
            >
              <span className="text-[#ffc107]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </span>
              Help &amp; Support
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
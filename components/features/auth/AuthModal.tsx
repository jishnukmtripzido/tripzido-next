// "use client";

// import { useEffect, useState } from "react";

// type Page = "login" | "register";
// type Status = "idle" | "loading" | "sent";

// const COUNTRY_CODES = [
//   { flag: "🇮🇳", code: "+91", country: "IN" },
//   { flag: "🇺🇸", code: "+1", country: "US" },
//   { flag: "🇬🇧", code: "+44", country: "GB" },
//   { flag: "🇩🇪", code: "+49", country: "DE" },
//   { flag: "🇫🇷", code: "+33", country: "FR" },
//   { flag: "🇧🇷", code: "+55", country: "BR" },
//   { flag: "🇦🇺", code: "+61", country: "AU" },
//   { flag: "🇯🇵", code: "+81", country: "JP" },
// ];

// export default function PhoneAuth() {
//   const [page, setPage] = useState<Page>("login");
//   const [phone, setPhone] = useState("");
//   const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0]);
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [status, setStatus] = useState<Status>("idle");
//   const [error, setError] = useState("");

//   const resetState = (nextPage: Page) => {
//     setPage(nextPage);
//     setPhone("");
//     setFirstName("");
//     setLastName("");
//     setStatus("idle");
//     setError("");
//   };

//   const validate = () => {
//     if (!phone || phone.replace(/\D/g, "").length < 7) {
//       setError("Please enter a valid phone number.");
//       return false;
//     }
//     if (page === "register" && !firstName.trim()) {
//       setError("First name is required.");
//       return false;
//     }
//     return true;
//   };

//   const handleSendOtp = async () => {
//     setError("");
//     if (!validate()) return;
//     setStatus("loading");
//     await new Promise((r) => setTimeout(r, 1200));
//     setStatus("sent");
//   };

//   // Pressing Enter in any of the form fields triggers the same action
//   // as clicking the "Send OTP" button.
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       if (status !== "loading") {
//         handleSendOtp();
//       }
//     }
//   };

//   const formatPhone = (val: string) => val.replace(/\D/g, "").slice(0, 12);

//   const RESEND_COOLDOWN = 60;
//   const [resendSeconds, setResendSeconds] = useState(0);
//   useEffect(() => {
//     if (resendSeconds <= 0) return;

//     const timer = window.setInterval(() => {
//       setResendSeconds((seconds) => Math.max(0, seconds - 1));
//     }, 1000);

//     return () => window.clearInterval(timer);
//   }, [resendSeconds]);

//   return (
//     <div className="  flex items-center justify-center px-4 py-5 font-sans relative overflow-hidden">
//       {/* Decorative blobs */}
//       {/* <div className="pointer-events-none absolute -top-36 -right-24 w-96 h-96 rounded-full bg-brand-yellow opacity-[0.15] blur-3xl" /> */}
//       {/* <div className="pointer-events-none absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-brand-yellow opacity-[0.10] blur-3xl" /> */}

//       <div className="w-full max-w-sm relative z-10">
//         {/* Logo */}
//         {/* <div className="flex items-center justify-center gap-2.5 mb-7">
//           <div className="w-9 h-9 rounded-lg bg-brand-yellow flex items-center justify-center flex-shrink-0">
//             <svg width="17" height="17" viewBox="0 0 24 24" fill="#1a1a1a" aria-hidden="true">
//               <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
//             </svg>
//           </div>
//           <span className="text-xl font-bold text-[#1a1a1a] tracking-tight font-heading">
//             tripzido
//           </span>
//         </div> */}

//         {/* Card */}
//         <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
//           {/* Tab switcher */}
//           <div className="flex bg-[#fff8e1] rounded-xl p-1 mb-7 gap-1">
//             {(["login", "register"] as Page[]).map((p) => (
//               <button
//                 key={p}
//                 onClick={() => resetState(p)}
//                 className={`flex-1 py-2 text-sm rounded-lg transition-all duration-150 font-medium
//                   ${
//                     page === p
//                       ? "bg-white text-[#1a1a1a] font-semibold shadow-sm"
//                       : "text-gray-400 hover:text-gray-600"
//                   }`}
//               >
//                 {p === "login" ? "Sign in" : "Register"}
//               </button>
//             ))}
//           </div>

//           {/* Heading */}
//           <div className="mb-6">
//             <h1 className="text-[22px] font-bold text-[#1a1a1a] tracking-tight font-heading mb-1.5">
//               {page === "login" ? "Welcome back" : "Create account"}
//             </h1>
//             <p className="text-sm text-gray-500 leading-relaxed">
//               {page === "login"
//                 ? "Enter your number to receive a one-time password"
//                 : "Sign up in seconds — just your phone number"}
//             </p>
//           </div>

//           {/* Success state */}
//           {status === "sent" ? (
//             <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4 mb-5">
//               <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
//                 <svg
//                   width="17"
//                   height="17"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="#166534"
//                   strokeWidth="2.5"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="M20 6L9 17l-5-5" />
//                 </svg>
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-semibold text-green-800">
//                   OTP sent!
//                 </p>
//                 <p className="text-xs text-green-700 truncate">
//                   Check your messages at {countryCode.code} {phone}
//                 </p>
//               </div>
//               <button
//                 onClick={() => setStatus("idle")}
//                 className="flex-shrink-0 text-xs font-semibold text-[#92400e] bg-[#fff8e1] border border-[#f0e8c8] rounded-md px-2.5 py-1.5 hover:bg-brand-yellow/20 transition-colors"
//               >
//                 Resend
//               </button>
//             </div>
//           ) : (
//             <>
//               {/* Name row — register only */}
//               {page === "register" && (
//                 <div className=" mb-5">
//                   <input
//                     type="text"
//                     placeholder="First name"
//                     value={firstName}
//                     onChange={(e) => {
//                       setFirstName(e.target.value);
//                       setError("");
//                     }}
//                     onKeyDown={handleKeyDown}
//                     autoComplete="given-name"
//                     className="w-full mb-5 h-11 border border-gray-300 rounded-xl px-3 text-sm text-[#1a1a1a] placeholder-gray-400 outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 transition"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Last name"
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                     onKeyDown={handleKeyDown}
//                     autoComplete="family-name"
//                     className="w-full h-11 border border-gray-300 rounded-xl px-3 text-sm text-[#1a1a1a] placeholder-gray-400 outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 transition"
//                   />
//                 </div>
//               )}

//               {/* Phone field */}
//               <div className="mb-5">
//                 <label className="block text-xs font-medium text-gray-600 mb-1.5">
//                   Phone number
//                 </label>
//                 <div className="flex gap-2">
//                   <select
//                     value={countryCode.code}
//                     onChange={(e) =>
//                       setCountryCode(
//                         COUNTRY_CODES.find((c) => c.code === e.target.value) ||
//                           COUNTRY_CODES[0],
//                       )
//                     }
//                     aria-label="Country code"
//                     className="w-24 h-[46px] flex-shrink-0 border border-gray-300 rounded-xl bg-gray-50 text-sm text-[#1a1a1a] px-2 outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 transition cursor-pointer"
//                   >
//                     {COUNTRY_CODES.map((c) => (
//                       <option key={c.country} value={c.code}>
//                         {c.flag} {c.code}
//                       </option>
//                     ))}
//                   </select>
//                   <input
//                     type="tel"
//                     placeholder="000 000 0000"
//                     value={phone}
//                     onChange={(e) => {
//                       setPhone(formatPhone(e.target.value));
//                       setError("");
//                     }}
//                     onKeyDown={handleKeyDown}
//                     inputMode="numeric"
//                     autoComplete="tel-national"
//                     aria-label="Phone number"
//                     className={`flex-1 h-[46px] border rounded-xl px-3.5 text-[15px] text-[#1a1a1a] placeholder-gray-400 outline-none transition
//                       ${
//                         error
//                           ? "border-red-400 ring-2 ring-red-200"
//                           : "border-gray-300 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20"
//                       }`}
//                   />
//                 </div>
//                 {error && (
//                   <p className="text-xs text-red-500 mt-1.5">{error}</p>
//                 )}
//               </div>

//               {/* CTA */}
//               <button
//                 onClick={handleSendOtp}
//                 disabled={status === "loading"}
//                 className={`w-full h-[46px] rounded-xl text-[15px] font-bold flex items-center justify-center gap-2 transition-all mb-5
//                   ${
//                     status === "loading"
//                       ? "bg-[#e6a800] cursor-not-allowed"
//                       : "bg-brand-yellow hover:bg-[#e6a800] active:scale-[0.98]"
//                   } text-[#1a1a1a]`}
//               >
//                 {status === "loading" ? (
//                   <span className="w-[18px] h-[18px] border-2 border-black/15 border-t-black/70 rounded-full animate-spin" />
//                 ) : (
//                   <>
//                     <svg
//                       width="15"
//                       height="15"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       aria-hidden="true"
//                     >
//                       <line x1="22" y1="2" x2="11" y2="13" />
//                       <polygon points="22 2 15 22 11 13 2 9 22 2" />
//                     </svg>
//                     Send OTP
//                   </>
//                 )}
//               </button>
//             </>
//           )}

//           {/* Footer toggle */}
//           <p className="text-center text-sm text-gray-500 mb-3">
//             {page === "login" ? (
//               <>
//                 No account?{" "}
//                 <span
//                   onClick={() => resetState("register")}
//                   className="text-[#92400e] font-semibold cursor-pointer hover:underline"
//                 >
//                   Register
//                 </span>
//               </>
//             ) : (
//               <>
//                 Already registered?{" "}
//                 <span
//                   onClick={() => resetState("login")}
//                   className="text-[#92400e] font-semibold cursor-pointer hover:underline"
//                 >
//                   Sign in
//                 </span>
//               </>
//             )}
//           </p>

//           {page === "register" && status !== "sent" && (
//             <p className="text-center text-xs text-gray-400 leading-relaxed">
//               By continuing you agree to our{" "}
//               <a href="#" className="text-[#92400e] hover:underline">
//                 Terms
//               </a>{" "}
//               &amp;{" "}
//               <a href="#" className="text-[#92400e] hover:underline">
//                 Privacy Policy
//               </a>
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyOtpAndLogin, registerAndLogin } from "@/actions/auth.actions";
import { sendOtpApi, registerSendOtpApi } from "@/services/auth.service";
import { useTurnstile } from "@/hooks/useTurnstile";
import { useOtpInput } from "@/hooks/useOtpInput";
import { SpinnerIcon, CloseButton } from "@/components/ui/icons";
import type { LoginModalProps } from "@/types/auth.types";

type ModalMode = "login" | "register";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 60;

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = "login",
}: LoginModalProps & { initialMode?: ModalMode }) {
  const router = useRouter();

  const [mode, setMode] = useState<ModalMode>(initialMode);
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);
  const [resendSeconds, setResendSeconds] = useState(0);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const {
    token: turnstileToken,
    tokenRef,
    reset: resetTurnstile,
  } = useTurnstile(isOpen && !otpSent, mode);

  const {
    otp,
    refs: otpRefs,
    handleChange: handleOtpChange,
    handleKeyDown: handleOtpKeyDown,
    reset: resetOtp,
  } = useOtpInput(otpSent);

  useEffect(() => {
    if (resendSeconds <= 0) return;

    const timer = window.setInterval(() => {
      setResendSeconds((seconds) => Math.max(0, seconds - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [resendSeconds]);

  const fullReset = () => {
    setPhone("");
    setOtpSent(false);
    setResendSeconds(0);
    setLoading(false);
    setOtpError(null);
    setSendError(null);
    setFirstName("");
    setLastName("");
    setEmail("");
    setFieldErrors({});
    resetOtp();
    resetTurnstile();
  };

  const handleClose = () => {
    onClose();
    fullReset();

    window.setTimeout(() => {
      setMode("login");
    }, 300);
  };

  const switchMode = (next: ModalMode) => {
    fullReset();
    setMode(next);
  };

  const validateRegisterFields = (): boolean => {
    const errors: Record<string, string> = {};

    if (!firstName.trim()) {
      errors.firstName = "First name is required.";
    }

    if (phone.length !== 10) {
      errors.phone = "Enter a valid 10-digit number.";
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email address.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const startOtpCooldown = () => {
    setResendSeconds(RESEND_COOLDOWN_SECONDS);
  };

  const handleSendLoginOTP = async () => {
    setSendError(null);

    if (resendSeconds > 0) {
      return;
    }

    const token = tokenRef.current;

    if (phone.length !== 10 || !token) {
      return;
    }

    setLoading(true);

    try {
      const data = await sendOtpApi(`+91${phone}`, token);

      if (!data.success) {
        setSendError(data.message || "Failed to send OTP. Please try again.");
        resetTurnstile();
        return;
      }

      setOtpSent(true);
      setOtpError(null);
      resetOtp();
      startOtpCooldown();
    } catch (error) {
      setSendError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
      resetTurnstile();
    } finally {
      setLoading(false);
    }
  };

  const handleSendRegisterOTP = async () => {
    setSendError(null);

    if (resendSeconds > 0) {
      return;
    }

    if (!validateRegisterFields()) {
      return;
    }

    const token = tokenRef.current;

    if (!token) {
      return;
    }

    setLoading(true);

    try {
      const data = await registerSendOtpApi({
        phone_number: `+91${phone}`,
        first_name: firstName.trim(),
        last_name: lastName.trim() || undefined,
        email: email.trim() || undefined,
        turnstile_token: token,
      });

      if (!data.success) {
        setSendError(data.message || "Could not send OTP. Please try again.");
        resetTurnstile();
        return;
      }

      setOtpSent(true);
      setOtpError(null);
      resetOtp();
      startOtpCooldown();
    } catch (error) {
      setSendError(
        error instanceof Error
          ? error.message
          : "Could not send OTP. Please try again.",
      );
      resetTurnstile();
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyLoginOTP = async () => {
    const code = otp.join("");

    if (code.length !== OTP_LENGTH || loading) {
      return;
    }

    setLoading(true);
    setOtpError(null);

    try {
      const result = await verifyOtpAndLogin(phone, code);

      if (!result.success) {
        setOtpError(result.message || "Invalid OTP. Please try again.");
        resetOtp();
        return;
      }

      handleClose();
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyRegisterOTP = async () => {
    const code = otp.join("");

    if (code.length !== OTP_LENGTH || loading) {
      return;
    }

    setLoading(true);
    setOtpError(null);

    try {
      const result = await registerAndLogin(`+91${phone}`, code);

      if (!result.success) {
        setOtpError(result.message || "Invalid OTP. Please try again.");
        resetOtp();
        return;
      }

      handleClose();
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    if (resendSeconds > 0 || loading) {
      return;
    }

    setOtpSent(false);
    setOtpError(null);
    setSendError(null);
    resetOtp();
    resetTurnstile();
  };

  const handleChangeNumber = () => {
    setOtpSent(false);
    setResendSeconds(0);
    setOtpError(null);
    setSendError(null);
    resetOtp();
    resetTurnstile();
  };

  if (!isOpen) {
    return null;
  }

  const isRegister = mode === "register";

  const canSendOtp =
    phone.length === 10 &&
    !!turnstileToken &&
    !loading &&
    resendSeconds === 0 &&
    (!isRegister || !!firstName.trim());

  return (
    <>
      <div
        onClick={handleClose}
        className="animate-fade-in fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={isRegister ? "Create your account" : "Sign in to Tripzido"}
        className="fixed z-50 bg-white overflow-hidden animate-slide-up sm:animate-scale-in inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[600px] md:px-10 md:max-h-[90vh] md:overflow-y-auto md:rounded-2xl md:shadow-2xl [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200"
      >
        <div className="flex flex-col p-6 md:p-10 relative">
          <CloseButton
            onClick={handleClose}
            className="absolute top-4 right-4"
          />

          <div className="flex items-center space-x-2 mb-8">
            <BrandLogo />
          </div>

          <div className="w-full">
            {!otpSent && (
              <div className="flex bg-gray-100 rounded-xl p-1 mb-6 gap-1">
                {(["login", "register"] as ModalMode[]).map((item) => (
                  <button
                    key={item}
                    onClick={() => switchMode(item)}
                    className={`flex-1 py-2 text-sm rounded-lg font-medium transition-all duration-150 ${
                      mode === item
                        ? "bg-white text-gray-900 font-semibold shadow-sm"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {item === "login" ? "Sign in" : "Register"}
                  </button>
                ))}
              </div>
            )}

            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1">
              {otpSent
                ? "Enter OTP"
                : isRegister
                  ? "Create account"
                  : "Welcome back"}
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              {otpSent
                ? `We've sent a 6-digit OTP to +91 ${phone}`
                : isRegister
                  ? "Join in seconds — name and mobile number required"
                  : "Commuting made Easy, Affordable and Quick"}
            </p>

            {!otpSent && sendError && (
              <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5 text-sm text-red-700">
                <svg
                  className="w-4 h-4 mt-0.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>

                <span>{sendError}</span>
              </div>
            )}

            {!otpSent ? (
              isRegister ? (
                <RegisterStep
                  firstName={firstName}
                  setFirstName={setFirstName}
                  lastName={lastName}
                  setLastName={setLastName}
                  email={email}
                  setEmail={setEmail}
                  phone={phone}
                  setPhone={setPhone}
                  fieldErrors={fieldErrors}
                  setFieldErrors={setFieldErrors}
                  loading={loading}
                  turnstileToken={turnstileToken}
                  resendSeconds={resendSeconds}
                  canSend={canSendOtp}
                  onSend={handleSendRegisterOTP}
                  onSwitchToLogin={() => switchMode("login")}
                />
              ) : (
                <PhoneStep
                  phone={phone}
                  setPhone={setPhone}
                  loading={loading}
                  turnstileToken={turnstileToken}
                  resendSeconds={resendSeconds}
                  onSend={handleSendLoginOTP}
                  onSwitchToRegister={() => switchMode("register")}
                />
              )
            ) : (
              <OtpStep
                otp={otp}
                otpRefs={otpRefs}
                otpError={otpError}
                loading={loading}
                resendSeconds={resendSeconds}
                onChange={handleOtpChange}
                onKeyDown={handleOtpKeyDown}
                onVerify={
                  isRegister ? handleVerifyRegisterOTP : handleVerifyLoginOTP
                }
                onChangeNumber={handleChangeNumber}
                onResend={handleResend}
                verifyLabel={
                  isRegister ? "Verify & Create Account" : "Verify & Sign In"
                }
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function BrandLogo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="bg-brand-yellow p-1.5 rounded-lg">
        <svg
          className="w-5 h-5 text-white"
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

      <span className="text-xl font-extrabold tracking-tight">tripzido</span>
    </div>
  );
}

function PhoneStep({
  phone,
  setPhone,
  loading,
  turnstileToken,
  resendSeconds,
  onSend,
  onSwitchToRegister,
}: {
  phone: string;
  setPhone: (value: string) => void;
  loading: boolean;
  turnstileToken: string | null;
  resendSeconds: number;
  onSend: () => void;
  onSwitchToRegister: () => void;
}) {
  const canSend = phone.length === 10 && !!turnstileToken && !loading;

  return (
    <>
      <div className="flex items-center border-2 border-brand-yellow rounded-xl overflow-hidden mb-4 focus-within:ring-2 focus-within:ring-[#ffc10740]">
        <IndiaPrefixBadge />

        <input
          type="tel"
          inputMode="numeric"
          maxLength={10}
          value={phone}
          onChange={(event) =>
            setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))
          }
          placeholder="Phone Number"
          className="flex-1 px-4 py-3 text-sm outline-none bg-white placeholder-gray-400"
        />
      </div>

      <div id="cf-turnstile-container" className="mb-4 flex justify-center" />

      <SendOtpButton
        loading={loading}
        canSend={canSend && resendSeconds === 0}
        onSend={onSend}
        label={
          resendSeconds > 0
            ? `Resend available in ${resendSeconds}s`
            : "Send OTP"
        }
      />

      <p className="text-xs text-black text-center mt-4">
        By continuing, you agree to our{" "}
        <a
          href="/terms"
          className="text-brand-yellow hover:underline font-medium"
        >
          Terms of Service
        </a>{" "}
        &amp;{" "}
        <a
          href="/privacy"
          className="text-brand-yellow hover:underline font-medium"
        >
          Privacy Policy
        </a>
      </p>

      <div className="mt-6 pt-6 border-t border-gray-100 text-center">
        <p className="text-sm text-black">
          Don&apos;t have an account?{" "}
          <button
            onClick={onSwitchToRegister}
            className="font-semibold text-brand-yellow hover:underline"
          >
            Register now
          </button>
        </p>
      </div>
    </>
  );
}

function RegisterStep({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phone,
  setPhone,
  fieldErrors,
  setFieldErrors,
  loading,
  turnstileToken,
  resendSeconds,
  canSend,
  onSend,
  onSwitchToLogin,
}: {
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  fieldErrors: Record<string, string>;
  setFieldErrors: (errors: Record<string, string>) => void;
  loading: boolean;
  turnstileToken: string | null;
  resendSeconds: number;
  canSend: boolean;
  onSend: () => void;
  onSwitchToLogin: () => void;
}) {
  const clearError = (key: string) => {
    setFieldErrors({
      ...fieldErrors,
      [key]: "",
    });
  };

  return (
    <>
      <div className="md:grid md:grid-cols-2 md:gap-3">
        <div className="mb-3">
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            First name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
              clearError("firstName");
            }}
            autoComplete="given-name"
            className={inputCls(!!fieldErrors.firstName)}
          />

          <FieldError msg={fieldErrors.firstName} />
        </div>

        <div className="mb-3">
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Last name{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>

          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            autoComplete="family-name"
            className={inputCls(false)}
          />
        </div>
      </div>

      <div className="mb-3 hidden">
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          Email <span className="text-gray-400 font-normal">(optional)</span>
        </label>

        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            clearError("email");
          }}
          autoComplete="email"
          className={inputCls(!!fieldErrors.email)}
        />

        <FieldError msg={fieldErrors.email} />
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          Mobile number <span className="text-red-500">*</span>
        </label>

        <div
          className={`flex items-center border-2 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#ffc10740] ${
            fieldErrors.phone ? "border-red-400" : "border-brand-yellow"
          }`}
        >
          <IndiaPrefixBadge />

          <input
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value.replace(/\D/g, "").slice(0, 10));
              clearError("phone");
            }}
            placeholder="Phone Number"
            className="flex-1 px-4 py-3 text-sm outline-none bg-white placeholder-gray-400"
          />
        </div>

        <FieldError msg={fieldErrors.phone} />
      </div>

      <div id="cf-turnstile-container" className="mb-4 flex justify-center" />

      <SendOtpButton
        loading={loading}
        canSend={canSend && !!turnstileToken && resendSeconds === 0}
        onSend={onSend}
        label={
          resendSeconds > 0
            ? `Resend available in ${resendSeconds}s`
            : "Send OTP"
        }
      />

      <p className="text-xs text-black text-center mt-4">
        By continuing, you agree to our{" "}
        <a
          href="/terms"
          className="text-brand-yellow hover:underline font-medium"
        >
          Terms of Service
        </a>{" "}
        &amp;{" "}
        <a
          href="/privacy"
          className="text-brand-yellow hover:underline font-medium"
        >
          Privacy Policy
        </a>
      </p>

      <div className="mt-6 pt-6 border-t border-gray-100 text-center">
        <p className="text-sm text-black">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="font-semibold text-brand-yellow hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </>
  );
}

function OtpStep({
  otp,
  otpRefs,
  otpError,
  loading,
  resendSeconds,
  onChange,
  onKeyDown,
  onVerify,
  onChangeNumber,
  onResend,
  verifyLabel,
}: {
  otp: string[];
  otpRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  otpError: string | null;
  loading: boolean;
  resendSeconds: number;
  onChange: (index: number, value: string) => void;
  onKeyDown: (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => void;
  onVerify: () => void;
  onChangeNumber: () => void;
  onResend: () => void;
  verifyLabel: string;
}) {
  const canVerify = otp.join("").length === OTP_LENGTH && !loading;
  const canResend = resendSeconds === 0 && !loading;

  const handleBoxKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (canVerify) {
        onVerify();
      }

      return;
    }

    onKeyDown(index, event);
  };

  return (
    <>
      <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
        Enter 6-digit OTP
      </label>

      <p className="text-xs text-gray-400 mb-3">OTP is valid for 5 minutes</p>

      <div className="flex gap-2 mb-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              otpRefs.current[index] = element;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(event) => onChange(index, event.target.value)}
            onKeyDown={(event) => handleBoxKeyDown(index, event)}
            aria-label={`OTP digit ${index + 1}`}
            className={`w-11 h-12 text-center text-lg font-bold rounded-xl border-2 outline-none transition-all ${
              otpError
                ? "border-red-400 bg-red-50"
                : digit
                  ? "border-brand-yellow bg-[#fffbea]"
                  : "border-gray-200 bg-gray-50"
            } focus:border-brand-yellow focus:ring-2 focus:ring-[#ffc10730]`}
          />
        ))}
      </div>

      {otpError ? (
        <p className="text-xs text-red-500 mb-4 flex items-center gap-1">
          <svg
            className="w-3.5 h-3.5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>

          {otpError}
        </p>
      ) : (
        <div className="mb-4" />
      )}

      <button
        onClick={onVerify}
        disabled={!canVerify}
        className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all ${
          canVerify
            ? "bg-brand-yellow text-white hover:bg-[#e6ac00] shadow-md"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center space-x-2">
            <SpinnerIcon />
            <span>Verifying...</span>
          </span>
        ) : (
          verifyLabel
        )}
      </button>

      <button
        onClick={onChangeNumber}
        className="w-full mt-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
      >
        &larr; Change number
      </button>

      <p className="text-xs text-gray-400 text-center mt-4">
        Didn&apos;t receive an OTP?{" "}
        <button
          onClick={onResend}
          disabled={!canResend}
          className={`font-semibold ${
            canResend
              ? "text-brand-yellow hover:underline"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          {resendSeconds > 0 ? `Resend in ${resendSeconds}s` : "Resend"}
        </button>
      </p>
    </>
  );
}

function IndiaPrefixBadge() {
  return (
    <div className="flex items-center space-x-1.5 px-3 py-3 border-r border-gray-200 bg-gray-50 select-none">
      <div className="w-5 h-3.5 overflow-hidden rounded-sm border border-gray-200 flex-shrink-0">
        <div className="h-1/3 bg-[#FF9933]" />
        <div className="h-1/3 bg-white" />
        <div className="h-1/3 bg-[#138808]" />
      </div>

      <span className="text-sm font-semibold text-gray-700">+91</span>
    </div>
  );
}

function SendOtpButton({
  loading,
  canSend,
  onSend,
  label,
}: {
  loading: boolean;
  canSend: boolean;
  onSend: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onSend}
      disabled={!canSend}
      className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all ${
        canSend
          ? "bg-brand-yellow text-white hover:bg-[#e6ac00] shadow-md"
          : "bg-gray-200 text-gray-400 cursor-not-allowed"
      }`}
    >
      {loading ? (
        <span className="flex items-center justify-center space-x-2">
          <SpinnerIcon />
          <span>Sending...</span>
        </span>
      ) : (
        label
      )}
    </button>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;

  return <p className="text-xs text-red-500 mt-1">{msg}</p>;
}

function inputCls(hasError: boolean) {
  return `w-full h-11 border-2 rounded-xl px-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all ${
    hasError
      ? "border-red-400 focus:ring-2 focus:ring-red-200"
      : "border-gray-200 focus:border-brand-yellow focus:ring-2 focus:ring-[#ffc10740]"
  }`;
}

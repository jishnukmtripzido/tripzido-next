"use client";

import { useState, useEffect, useRef } from "react";

/**
 * LoginModal
 *
 * Structure mirrors GoWheelo's modal:
 *  - Left panel: decorative / brand illustration (hidden on mobile)
 *  - Right panel: phone OTP form
 *
 * Colors: Tripzido amber/yellow (#ffc107) on white
 * Mobile: full-screen modal (no rounded corners, fills entire viewport)
 *
 * Cloudflare Turnstile:
 *  - The widget mounts in #cf-turnstile-container once the modal opens.
 *  - On success, turnstileToken state is populated.
 *  - Include the Turnstile script in your root layout:
 *      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
 *  - Pass the token to your /api/send-otp endpoint and verify server-side.
 */

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

// Cities shown in the circular illustration (GoWheelo-style)
const CITIES = [
  { name: "Delhi", top: "8%", left: "50%" },
  { name: "Goa", top: "22%", left: "78%" },
  { name: "Manali", top: "48%", left: "88%" },
  { name: "Jaipur", top: "74%", left: "78%" },
  { name: "Mysuru", top: "88%", left: "50%" },
  { name: "Mumbai", top: "74%", left: "22%" },
  { name: "Wayanad", top: "48%", left: "12%" },
  { name: "Coorg", top: "22%", left: "22%" },
];

const STATS = [
  { value: "50+", label: "Cities" },
  { value: "1,20,000+", label: "Happy Customers" },
  { value: "6000+", label: "Vehicles" },
  { value: "4.8/5 ⭐", label: "1200+ reviews" },
];

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Mount Turnstile widget when modal opens
  useEffect(() => {
    if (!isOpen) return;

    const mountTurnstile = () => {
      const container = document.getElementById("cf-turnstile-container");
      if (!container || !window.turnstile) return;

      // Clear any previous widget
      container.innerHTML = "";

      turnstileWidgetId.current = window.turnstile.render(container, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "YOUR_TURNSTILE_SITE_KEY",
        callback: (token: string) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(null),
        "error-callback": () => setTurnstileToken(null),
        theme: "light",
        size: "normal",
      });
    };

    // Delay slightly to allow modal DOM to render
    const timer = setTimeout(mountTurnstile, 300);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Cleanup Turnstile on close
  useEffect(() => {
    if (!isOpen && turnstileWidgetId.current && window.turnstile) {
      window.turnstile.remove(turnstileWidgetId.current);
      turnstileWidgetId.current = null;
      setTurnstileToken(null);
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    setPhone("");
    setOtpSent(false);
    setOtp(["", "", "", "", "", ""]);
    setLoading(false);
  };

  const handleSendOTP = async () => {
    if (phone.length !== 10) return;
    setLoading(true);
    try {
      // Replace with your actual API call
      // await fetch("/api/send-otp", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ phone, turnstileToken }),
      // });
      await new Promise((r) => setTimeout(r, 800)); // simulate
      setOtpSent(true);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const code = otp.join("");
    if (code.length !== 6) return;
    setLoading(true);
    try {
      // Replace with your actual API call
      // await fetch("/api/verify-otp", { ... });
      await new Promise((r) => setTimeout(r, 800));
      handleClose();
      // router.refresh() or update auth context here
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="animate-fade-in fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Sign in to Tripzido"
        className={`
          fixed z-50 bg-white overflow-hidden animate-slide-up sm:animate-scale-in
          /* Mobile: full screen */
          inset-0
          /* md+: centered card */
          md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
          md:w-[880px] md:max-h-[90vh] md:rounded-2xl md:shadow-2xl
        `}
      >
        <div className="flex h-full md:h-auto">

          {/* ── LEFT PANEL (hidden on mobile) ── */}
          <div className="hidden md:flex flex-col justify-between w-[340px] bg-[#fffbea] p-8 shrink-0">
            {/* Brand */}
            <div className="flex items-center space-x-2">
              <div className="bg-[#ffc107] p-1.5 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-tight">tripzido</span>
            </div>

            {/* Circular city illustration */}
            <div className="relative w-56 h-56 mx-auto my-6">
              {/* Orbit rings */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 224 224">
                <circle cx="112" cy="112" r="100" fill="none" stroke="#ffc10730" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx="112" cy="112" r="72" fill="none" stroke="#ffc10740" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx="112" cy="112" r="44" fill="none" stroke="#ffc10750" strokeWidth="1.5" />
              </svg>

              {/* Center logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#ffc107] flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>

              {/* City dots */}
              {CITIES.map((city, i) => (
                <div
                  key={i}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ top: city.top, left: city.left }}
                >
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-[#ffc107] flex items-center justify-center shadow-sm">
                    <span className="text-[7px] font-bold text-gray-700 text-center leading-tight px-0.5">{city.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-sm font-extrabold text-gray-900">{s.value}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="flex flex-col flex-1 p-6 md:p-10 relative">

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>

            {/* Mobile-only brand header */}
            <div className="flex items-center space-x-2 mb-8 md:hidden">
              <div className="bg-[#ffc107] p-1.5 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-tight">tripzido</span>
            </div>

            <div className="flex flex-col justify-center flex-1 max-w-sm mx-auto w-full">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1">
                {otpSent ? "Enter OTP" : "Welcome to"}{" "}
                {!otpSent && <span className="text-[#ffc107]">Tripzido</span>}
              </h2>
              <p className="text-sm text-gray-500 mb-8">
                {otpSent
                  ? `We've sent a 6-digit OTP to +91 ${phone}`
                  : "Commuting made Easy, Affordable and Quick"}
              </p>

              {!otpSent ? (
                /* ── Phone step ── */
                <>
                  {/* Phone input */}
                  {/* <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                    Mobile Number
                  </label> */}
                  <div className="flex items-center border-2 border-[#ffc107] rounded-xl overflow-hidden mb-4 focus-within:ring-2 focus-within:ring-[#ffc10740]">
                    {/* Country selector */}
                    <div className="flex items-center space-x-1.5 px-3 py-3 border-r border-gray-200 bg-gray-50 cursor-pointer select-none">
                      <div className="w-5 h-3.5 overflow-hidden rounded-sm border border-gray-200 flex-shrink-0">
                        <div className="h-1/3 bg-[#FF9933]" />
                        <div className="h-1/3 bg-white" />
                        <div className="h-1/3 bg-[#138808]" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">+91</span>
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="Phone Number"
                      className="flex-1 px-4 py-3 text-sm outline-none bg-white placeholder-gray-400"
                    />
                  </div>

                  {/* Cloudflare Turnstile widget */}
                  <div id="cf-turnstile-container" className="mb-4" />

                  {/* CTA */}
                  <button
                    onClick={handleSendOTP}
                    disabled={phone.length !== 10 || loading || !turnstileToken}
                    className={`
                      w-full py-3.5 rounded-xl text-sm font-bold transition-all
                      ${phone.length === 10 && turnstileToken && !loading
                        ? "bg-[#ffc107] text-white hover:bg-[#e6ac00] shadow-md hover:shadow-lg"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }
                    `}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center space-x-2">
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <span>Sending...</span>
                      </span>
                    ) : "Send OTP"}
                  </button>

                  <p className="text-xs text-black text-center mt-4">
                    By continuing, you agree to our{" "}
                    <a href="/terms" className="text-[#ffc107] hover:underline font-medium">Terms of Service</a>{" "}
                    &amp;{" "}
                    <a href="/privacy" className="text-[#ffc107] hover:underline font-medium">Privacy Policy</a>
                  </p>

                  <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                    <p className="text-sm text-black">
                      Don&apos;t have an account?{" "}
                      <a href="/register" className="font-semibold text-[#ffc107] hover:underline">
                        Register now
                      </a>
                    </p>
                  </div>
                </>
              ) : (
                /* ── OTP step ── */
                <>
                  <label className="block text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">
                    Enter 6-digit OTP
                  </label>

                  {/* OTP boxes */}
                  <div className="flex space-x-2 mb-6">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => { otpRefs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        className={`
                          w-11 h-12 text-center text-lg font-bold rounded-xl border-2 outline-none transition-all
                          ${digit ? "border-[#ffc107] bg-[#fffbea]" : "border-gray-200 bg-gray-50"}
                          focus:border-[#ffc107] focus:ring-2 focus:ring-[#ffc10730]
                        `}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleVerifyOTP}
                    disabled={otp.join("").length !== 6 || loading}
                    className={`
                      w-full py-3.5 rounded-xl text-sm font-bold transition-all
                      ${otp.join("").length === 6 && !loading
                        ? "bg-[#ffc107] text-white hover:bg-[#e6ac00] shadow-md hover:shadow-lg"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }
                    `}
                  >
                    {loading ? "Verifying..." : "Verify & Sign In"}
                  </button>

                  <button
                    onClick={() => { setOtpSent(false); setOtp(["", "", "", "", "", ""]); }}
                    className="w-full mt-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    ← Change number
                  </button>

                  <p className="text-xs text-gray-400 text-center mt-4">
                    Didn&apos;t receive an OTP?{" "}
                    <button
                      onClick={handleSendOTP}
                      className="text-[#ffc107] font-semibold hover:underline"
                    >
                      Resend
                    </button>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
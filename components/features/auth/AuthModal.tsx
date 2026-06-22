"use client";

import { useState } from "react";

type Page = "login" | "register";
type Status = "idle" | "loading" | "sent";

const COUNTRY_CODES = [
  { flag: "🇮🇳", code: "+91", country: "IN" },
  { flag: "🇺🇸", code: "+1", country: "US" },
  { flag: "🇬🇧", code: "+44", country: "GB" },
  { flag: "🇩🇪", code: "+49", country: "DE" },
  { flag: "🇫🇷", code: "+33", country: "FR" },
  { flag: "🇧🇷", code: "+55", country: "BR" },
  { flag: "🇦🇺", code: "+61", country: "AU" },
  { flag: "🇯🇵", code: "+81", country: "JP" },
];

export default function PhoneAuth() {
  const [page, setPage] = useState<Page>("login");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const resetState = (nextPage: Page) => {
    setPage(nextPage);
    setPhone("");
    setFirstName("");
    setLastName("");
    setStatus("idle");
    setError("");
  };

  const validate = () => {
    if (!phone || phone.replace(/\D/g, "").length < 7) {
      setError("Please enter a valid phone number.");
      return false;
    }
    if (page === "register" && !firstName.trim()) {
      setError("First name is required.");
      return false;
    }
    return true;
  };

  const handleSendOtp = async () => {
    setError("");
    if (!validate()) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
  };

  const formatPhone = (val: string) => val.replace(/\D/g, "").slice(0, 12);

  return (
    <div className="  flex items-center justify-center px-4 py-5 font-sans relative overflow-hidden">
      {/* Decorative blobs */}
      {/* <div className="pointer-events-none absolute -top-36 -right-24 w-96 h-96 rounded-full bg-brand-yellow opacity-[0.15] blur-3xl" /> */}
      {/* <div className="pointer-events-none absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-brand-yellow opacity-[0.10] blur-3xl" /> */}

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        {/* <div className="flex items-center justify-center gap-2.5 mb-7">
          <div className="w-9 h-9 rounded-lg bg-brand-yellow flex items-center justify-center flex-shrink-0">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="#1a1a1a" aria-hidden="true">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <span className="text-xl font-bold text-[#1a1a1a] tracking-tight font-heading">
            tripzido
          </span>
        </div> */}

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
          {/* Tab switcher */}
          <div className="flex bg-[#fff8e1] rounded-xl p-1 mb-7 gap-1">
            {(["login", "register"] as Page[]).map((p) => (
              <button
                key={p}
                onClick={() => resetState(p)}
                className={`flex-1 py-2 text-sm rounded-lg transition-all duration-150 font-medium
                  ${
                    page === p
                      ? "bg-white text-[#1a1a1a] font-semibold shadow-sm"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
              >
                {p === "login" ? "Sign in" : "Register"}
              </button>
            ))}
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-[22px] font-bold text-[#1a1a1a] tracking-tight font-heading mb-1.5">
              {page === "login" ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              {page === "login"
                ? "Enter your number to receive a one-time password"
                : "Sign up in seconds — just your phone number"}
            </p>
          </div>

          {/* Success state */}
          {status === "sent" ? (
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4 mb-5">
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#166534"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-green-800">
                  OTP sent!
                </p>
                <p className="text-xs text-green-700 truncate">
                  Check your messages at {countryCode.code} {phone}
                </p>
              </div>
              <button
                onClick={() => setStatus("idle")}
                className="flex-shrink-0 text-xs font-semibold text-[#92400e] bg-[#fff8e1] border border-[#f0e8c8] rounded-md px-2.5 py-1.5 hover:bg-brand-yellow/20 transition-colors"
              >
                Resend
              </button>
            </div>
          ) : (
            <>
              {/* Name row — register only */}
              {page === "register" && (
                <div className=" mb-5">
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setError("");
                    }}
                    autoComplete="given-name"
                    className="w-full mb-5 h-11 border border-gray-300 rounded-xl px-3 text-sm text-[#1a1a1a] placeholder-gray-400 outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 transition"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="family-name"
                    className="w-full h-11 border border-gray-300 rounded-xl px-3 text-sm text-[#1a1a1a] placeholder-gray-400 outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 transition"
                  />
                </div>
              )}

              {/* Phone field */}
              <div className="mb-5">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Phone number
                </label>
                <div className="flex gap-2">
                  <select
                    value={countryCode.code}
                    onChange={(e) =>
                      setCountryCode(
                        COUNTRY_CODES.find((c) => c.code === e.target.value) ||
                          COUNTRY_CODES[0],
                      )
                    }
                    aria-label="Country code"
                    className="w-24 h-[46px] flex-shrink-0 border border-gray-300 rounded-xl bg-gray-50 text-sm text-[#1a1a1a] px-2 outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 transition cursor-pointer"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.country} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    placeholder="000 000 0000"
                    value={phone}
                    onChange={(e) => {
                      setPhone(formatPhone(e.target.value));
                      setError("");
                    }}
                    inputMode="numeric"
                    autoComplete="tel-national"
                    aria-label="Phone number"
                    className={`flex-1 h-[46px] border rounded-xl px-3.5 text-[15px] text-[#1a1a1a] placeholder-gray-400 outline-none transition
                      ${
                        error
                          ? "border-red-400 ring-2 ring-red-200"
                          : "border-gray-300 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20"
                      }`}
                  />
                </div>
                {error && (
                  <p className="text-xs text-red-500 mt-1.5">{error}</p>
                )}
              </div>

              {/* CTA */}
              <button
                onClick={handleSendOtp}
                disabled={status === "loading"}
                className={`w-full h-[46px] rounded-xl text-[15px] font-bold flex items-center justify-center gap-2 transition-all mb-5
                  ${
                    status === "loading"
                      ? "bg-[#e6a800] cursor-not-allowed"
                      : "bg-brand-yellow hover:bg-[#e6a800] active:scale-[0.98]"
                  } text-[#1a1a1a]`}
              >
                {status === "loading" ? (
                  <span className="w-[18px] h-[18px] border-2 border-black/15 border-t-black/70 rounded-full animate-spin" />
                ) : (
                  <>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Send OTP
                  </>
                )}
              </button>
            </>
          )}

          {/* Footer toggle */}
          <p className="text-center text-sm text-gray-500 mb-3">
            {page === "login" ? (
              <>
                No account?{" "}
                <span
                  onClick={() => resetState("register")}
                  className="text-[#92400e] font-semibold cursor-pointer hover:underline"
                >
                  Register
                </span>
              </>
            ) : (
              <>
                Already registered?{" "}
                <span
                  onClick={() => resetState("login")}
                  className="text-[#92400e] font-semibold cursor-pointer hover:underline"
                >
                  Sign in
                </span>
              </>
            )}
          </p>

          {page === "register" && status !== "sent" && (
            <p className="text-center text-xs text-gray-400 leading-relaxed">
              By continuing you agree to our{" "}
              <a href="#" className="text-[#92400e] hover:underline">
                Terms
              </a>{" "}
              &amp;{" "}
              <a href="#" className="text-[#92400e] hover:underline">
                Privacy Policy
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

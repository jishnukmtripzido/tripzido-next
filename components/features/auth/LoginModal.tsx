"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { verifyOtpAndLogin, registerAndLogin } from "@/actions/auth.actions";
import { sendOtpApi, registerSendOtpApi } from "@/services/auth.service";
import { useTurnstile } from "@/hooks/useTurnstile";
import { useOtpInput } from "@/hooks/useOtpInput";
import { LOGIN_MODAL_CITIES, LOGIN_MODAL_STATS } from "@/lib/constants";
import { SpinnerIcon, CloseButton } from "@/components/ui/icons";
import type { LoginModalProps } from "@/types/auth.types";

type ModalMode = "login" | "register";

export default function LoginModal({
  isOpen,
  onClose,
  initialMode = "login",
}: LoginModalProps & { initialMode?: ModalMode }) {
  const router = useRouter();

  const [mode, setMode] = useState<ModalMode>(initialMode);

  useEffect(() => {
    if (isOpen) setMode(initialMode);
  }, [isOpen, initialMode]);

  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const {
    token: turnstileToken,
    tokenRef,
    reset: resetTurnstile,
  } = useTurnstile(isOpen && !otpSent);

  const {
    otp,
    refs: otpRefs,
    handleChange: handleOtpChange,
    handleKeyDown: handleOtpKeyDown,
    reset: resetOtp,
  } = useOtpInput(otpSent);

  const fullReset = () => {
    setPhone("");
    setOtpSent(false);
    resetOtp();
    setLoading(false);
    setOtpError(null);
    setFirstName("");
    setLastName("");
    setEmail("");
    setFieldErrors({});
  };

  const handleClose = () => {
    onClose();
    fullReset();
    setTimeout(() => setMode("login"), 300);
  };

  const switchMode = (next: ModalMode) => {
    fullReset();
    setMode(next);
  };

  const validateRegisterFields = (): boolean => {
    const errors: Record<string, string> = {};
    if (!firstName.trim()) errors.firstName = "First name is required.";
    if (phone.length !== 10) errors.phone = "Enter a valid 10-digit number.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Enter a valid email address.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSendLoginOTP = async () => {
    const token = tokenRef.current;
    if (phone.length !== 10 || !token) return;
    setLoading(true);
    try {
      const data = await sendOtpApi(phone, token);
      if (!data.success) throw new Error(data.message || "Failed to send OTP");
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      resetTurnstile();
    } finally {
      setLoading(false);
    }
  };

  const handleSendRegisterOTP = async () => {
    if (!validateRegisterFields()) return;
    const token = tokenRef.current;
    if (!token) return;
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
        setFieldErrors({ phone: data.message || "Could not send OTP." });
        resetTurnstile();
        return;
      }
      setOtpSent(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Could not send OTP. Try again.";
      setFieldErrors({ phone: msg });
      resetTurnstile();
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyLoginOTP = async () => {
    const code = otp.join("");
    if (code.length !== 4) return;
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
    if (code.length !== 4) return;
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
    setOtpSent(false);
    resetOtp();
    setOtpError(null);
  };

  if (!isOpen) return null;

  const isRegister = mode === "register";
  const canSendOtp =
    phone.length === 10 &&
    !!turnstileToken &&
    !loading &&
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
        className="fixed z-50 bg-white overflow-hidden animate-slide-up sm:animate-scale-in inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[880px] md:max-h-[90vh] md:overflow-y-auto md:rounded-2xl md:shadow-2xl"
      >
        <div className="flex h-full md:h-auto">
          {/* ── Left decorative panel ── */}
          <div className="hidden md:flex flex-col justify-between w-[340px] bg-[#fffbea] p-8 shrink-0">
            <BrandLogo />
            <CityRing cities={LOGIN_MODAL_CITIES} />
            <StatsGrid stats={LOGIN_MODAL_STATS} />
          </div>

          {/* ── Right content panel ── */}
          <div className="flex flex-col flex-1 p-6 md:p-10 relative overflow-y-auto">
            <CloseButton
              onClick={handleClose}
              className="absolute top-4 right-4"
            />

            <div className="flex items-center space-x-2 mb-8 md:hidden">
              <BrandLogo />
            </div>

            <div className="flex flex-col justify-center flex-1 max-w-sm mx-auto w-full">
              {!otpSent && (
                <div className="flex bg-gray-100 rounded-xl p-1 mb-6 gap-1">
                  {(["login", "register"] as ModalMode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => switchMode(m)}
                      className={`flex-1 py-2 text-sm rounded-lg font-medium transition-all duration-150 ${
                        mode === m
                          ? "bg-white text-gray-900 font-semibold shadow-sm"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      {m === "login" ? "Sign in" : "Register"}
                    </button>
                  ))}
                </div>
              )}

              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1">
                {otpSent
                  ? "Enter OTP"
                  : isRegister
                    ? "Create account"
                    : "Welcome to"}{" "}
                {!otpSent && !isRegister && (
                  <span className="text-brand-yellow">Tripzido</span>
                )}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                {otpSent
                  ? `We've sent a 4-digit OTP to +91 ${phone}`
                  : isRegister
                    ? "Join in seconds — first name and mobile required"
                    : "Commuting made Easy, Affordable and Quick"}
              </p>

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
                  onChange={handleOtpChange}
                  onKeyDown={handleOtpKeyDown}
                  onVerify={
                    isRegister ? handleVerifyRegisterOTP : handleVerifyLoginOTP
                  }
                  onChangeNumber={() => {
                    setOtpSent(false);
                    resetOtp();
                    setOtpError(null);
                  }}
                  onResend={handleResend}
                  verifyLabel={
                    isRegister ? "Verify & Create Account" : "Verify & Sign In"
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────

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

function CityRing({ cities }: { cities: typeof LOGIN_MODAL_CITIES }) {
  return (
    <div className="relative w-56 h-56 mx-auto my-6">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 224 224">
        <circle
          cx="112"
          cy="112"
          r="100"
          fill="none"
          stroke="#ffc10730"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <circle
          cx="112"
          cy="112"
          r="72"
          fill="none"
          stroke="#ffc10740"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <circle
          cx="112"
          cy="112"
          r="44"
          fill="none"
          stroke="#ffc10750"
          strokeWidth="1.5"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-brand-yellow flex items-center justify-center shadow-lg">
          <svg
            className="w-8 h-8 text-white"
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
      </div>
      {cities.map((city, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ top: city.top, left: city.left }}
        >
          <div className="w-8 h-8 rounded-full bg-white border-2 border-brand-yellow flex items-center justify-center shadow-sm">
            <span className="text-[7px] font-bold text-gray-700 text-center leading-tight px-0.5">
              {city.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function StatsGrid({ stats }: { stats: typeof LOGIN_MODAL_STATS }) {
  return (
    <div className="grid grid-cols-2 gap-3 mt-2">
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <div className="text-sm font-extrabold text-gray-900">{s.value}</div>
          <div className="text-[10px] text-gray-500 mt-0.5">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// ── PhoneStep (login) ──────────────────────────────────────────────────────

function PhoneStep({
  phone,
  setPhone,
  loading,
  turnstileToken,
  onSend,
  onSwitchToRegister,
}: {
  phone: string;
  setPhone: (v: string) => void;
  loading: boolean;
  turnstileToken: string | null;
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
          onChange={(e) =>
            setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
          }
          placeholder="Phone Number"
          className="flex-1 px-4 py-3 text-sm outline-none bg-white placeholder-gray-400"
        />
      </div>

      <div id="cf-turnstile-container" className="mb-4" />

      <SendOtpButton
        loading={loading}
        canSend={canSend}
        onSend={onSend}
        label="Send OTP"
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

// ── RegisterStep ───────────────────────────────────────────────────────────

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
  canSend,
  onSend,
  onSwitchToLogin,
}: {
  firstName: string;
  setFirstName: (v: string) => void;
  lastName: string;
  setLastName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  fieldErrors: Record<string, string>;
  setFieldErrors: (e: Record<string, string>) => void;
  loading: boolean;
  turnstileToken: string | null;
  canSend: boolean;
  onSend: () => void;
  onSwitchToLogin: () => void;
}) {
  const clearError = (key: string) =>
    setFieldErrors({ ...fieldErrors, [key]: "" });

  return (
    <>
      {/* First name + Last name: stacked on mobile, side-by-side on md+ */}
      <div className="md:grid md:grid-cols-2 md:gap-3">
        <div className="mb-3">
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            First name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
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
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="family-name"
            className={inputCls(false)}
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          Email <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearError("email");
          }}
          autoComplete="email"
          className={inputCls(!!fieldErrors.email)}
        />
        <FieldError msg={fieldErrors.email} />
      </div>

      {/* Phone */}
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
            onChange={(e) => {
              setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
              clearError("phone");
            }}
            placeholder="Phone Number"
            className="flex-1 px-4 py-3 text-sm outline-none bg-white placeholder-gray-400"
          />
        </div>
        <FieldError msg={fieldErrors.phone} />
      </div>

      <div id="cf-turnstile-container" className="mb-4" />

      <SendOtpButton
        loading={loading}
        canSend={canSend}
        onSend={onSend}
        label="Send OTP"
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

// ── OtpStep ────────────────────────────────────────────────────────────────

function OtpStep({
  otp,
  otpRefs,
  otpError,
  loading,
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
  onChange: (i: number, v: string) => void;
  onKeyDown: (i: number, e: React.KeyboardEvent) => void;
  onVerify: () => void;
  onChangeNumber: () => void;
  onResend: () => void;
  verifyLabel: string;
}) {
  const canVerify = otp.join("").length === 4 && !loading;
  return (
    <>
      <label className="block text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">
        Enter 4-digit OTP
      </label>

      <div className="flex gap-2 mb-2">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              otpRefs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => onChange(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
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
        ← Change number
      </button>

      <p className="text-xs text-gray-400 text-center mt-4">
        Didn&apos;t receive an OTP?{" "}
        <button
          onClick={onResend}
          className="text-brand-yellow font-semibold hover:underline"
        >
          Resend
        </button>
      </p>
    </>
  );
}

// ── Shared micro-components ────────────────────────────────────────────────

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

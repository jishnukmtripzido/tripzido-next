interface LoginBannerProps {
  onLoginClick?: () => void;
}

export default function LoginBanner({ onLoginClick }: LoginBannerProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl px-5 py-4 bg-[#1a1a2e]">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 min-w-[44px] rounded-full bg-white/10 flex items-center justify-center text-xl">
          🎁
        </div>
        <div>
          <p className="m-0 text-[15px] font-bold text-white">
            Log-in and get exclusive discounts!
          </p>
          <p className="m-0 text-[13px] text-white/70">
            Log in and unlock all the exclusive offers and use wallet etc
          </p>
        </div>
      </div>

      <button
        onClick={onLoginClick}
        className="shrink-0 bg-brand-yellow text-[#1a1a2e] font-bold text-[13px] tracking-wide px-5 py-2 rounded-full border-2 border-brand-yellow hover:bg-brand-yellow-lg hover:border-brand-yellow-lg transition-colors duration-200 cursor-pointer"
      >
        LOGIN NOW
      </button>
    </div>
  );
}

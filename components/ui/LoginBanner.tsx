interface LoginBannerProps {
  onLoginClick?: () => void;
}

export default function LoginBanner({ onLoginClick }: LoginBannerProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 rounded-xl px-4 sm:px-5 py-4 bg-brand-secondary border border-teal-600/40 shadow-sm">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 overflow-hidden flex items-center justify-center">
          <img
            src="/bike.jpg"
            alt="Unlock Offers"
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
          />
        </div>
        <div>
          <p className="m-0 text-[14px] sm:text-[15px] font-bold text-white">
            Log-in and get exclusive discounts!
          </p>
          <p className="m-0 text-[12px] sm:text-[13px] text-white/70 font-medium">
            Log in and unlock all the exclusive offers and use wallet etc
          </p>
        </div>
      </div>

      <button
        onClick={onLoginClick}
        className="shrink-0 self-start sm:self-auto bg-brand-yellow text-[#133e45] font-bold text-[13px] tracking-wide px-5 py-2 rounded-full hover:brightness-105 transition-all duration-200 cursor-pointer"
      >
        LOGIN NOW
      </button>
    </div>
  );
}

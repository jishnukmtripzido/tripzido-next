export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden h-[55vw] min-h-[200px] max-h-[420px] md:h-[42vh] md:max-h-none">
      {/* Background Image + Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Motorcycle in scenic location"
          className="w-full h-full object-cover object-center"
          src="https://media.publit.io/file/ChatGPT-Image-May-1-2026-11-35-56-AM.png"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.85)_35%,rgba(255,255,255,0)_72%)] md:bg-[linear-gradient(90deg,rgba(255,255,255,0.75)_25%,rgba(255,255,255,0)_65%)]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-4 lg:px-8 pt-8 pb-20 flex items-center mx-auto xl:mx-[121.5px] xl:px-0">
        <div className="max-w-2xl">
          <h1 className="text-[6.5vw] sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-2 text-gray-800">
            <span className="block mb-1 md:mb-0">Bike rentals for</span>
            <span className="block">every adventure</span>
          </h1>
          {/* <h1 className="text-[7.5vw] sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-gray-900 mb-3">
            Bike rentals for
            <span className="block text-yellow-500">every adventure</span>
          </h1> */}
          <p className="text-[3.7vw] sm:text-sm md:text-base text-gray-500 font-medium">
            Great bikes at great prices from
            <br />
            trusted rental partners
          </p>
          {/* <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-4">
            Great bikes at great prices from <br className="hidden sm:block" />
            trusted rental partners across India.
          </p> */}
        </div>
      </div>
    </section>
  );
}

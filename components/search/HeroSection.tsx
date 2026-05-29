// export default function HeroSection() {
//   return (
//     <section className="relative w-full overflow-hidden h-[55vw] min-h-[200px] max-h-[420px] md:h-[42vh] md:min-h-[270px] md:max-h-none">
//       {/* Background Image + Gradient */}
//       <div className="absolute inset-0 z-0">
//         <img
//           alt="Motorcycle in scenic location"
//           className="w-full h-full object-cover object-center"
//           src="https://media.publit.io/file/ChatGPT-Image-May-1-2026-11-35-56-AM.png"
//         />
//         <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.85)_35%,rgba(255,255,255,0)_72%)] md:bg-[linear-gradient(90deg,rgba(255,255,255,0.75)_25%,rgba(255,255,255,0)_65%)]" />
//       </div>

//       {/* Hero Content */}
//       <div className="relative z-10 px-4 lg:px-8 pt-8 pb-20 flex items-center mx-auto xl:mx-[121.5px] xl:px-0">
//         <div className="max-w-2xl">
//           <h1 className="text-[6.5vw] sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-2 text-gray-800">
//             <span className="block mb-1 md:mb-0">Bike rentals for</span>
//             <span className="block">every adventure</span>
//           </h1>
        
//           <p className="text-[3.7vw] sm:text-sm md:text-base text-gray-500 font-medium">
//             Great bikes at great prices from
//             <br />
//             trusted rental partners
//           </p>
     
//         </div>
//       </div>
//     </section>
//   );
// }



// export default function HeroSection() {
//   return (
//     <section className="relative w-full overflow-hidden h-[55vw] min-h-[200px] max-h-[420px] md:h-[44vh] md:min-h-[270px] md:max-h-none">
//       {/* Background Image + Gradient */}
//       <div className="absolute inset-0 z-0">
//         <img
//           alt="Motorcycle in scenic location"
//           className="w-full h-full object-cover object-center"
//           // src="https://media.publit.io/file/ChatGPT-Image-May-1-2026-11-35-56-AM.png"
//         src="hero.png"
//         />
//         {/* <div className="absolute inset-0 bg-gradient-to-r from-black via-black/10 to-transparent" /> */}
//         {/* <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.85)_35%,rgba(255,255,255,0)_72%)] md:bg-[linear-gradient(90deg,rgba(255,255,255,0.75)_25%,rgba(255,255,255,0)_65%)]" /> */}
//       </div>

//       {/* Hero Content */}
//       <div className="relative z-10 px-4 lg:px-8 pt-8 pb-20 flex items-center mx-auto xl:mx-[121.5px] xl:px-0">
//         <div className="max-w-2xl">
//           <h1 className="text-[6.5vw] sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-2 text-white">
//             <span className="block mb-1 md:mb-0">Bike rentals for</span>
//             <span className="block">every adventure</span>
//           </h1>
        
//           <p className="text-[3.7vw] sm:text-sm md:text-base text-white font-medium">
//             Great bikes at great prices from
//             <br />
//             trusted rental partners
//           </p>
     
//         </div>
//       </div>
//     </section>
//   );
// }


export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden h-[55vw] min-h-[200px] max-h-[420px] md:h-[44vh] md:min-h-[270px] md:max-h-none">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Motorcycle in scenic location"
          className="w-full h-full object-cover object-center"
          src="hero.png"
        />
        {/* Left-to-right dark gradient — darkens left where text sits, fades out toward bike */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.15)_45%,rgba(0,0,0,0)_70%)]" />
        {/* Bottom fade so search widget area blends naturally */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0)_40%)]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-4 lg:px-8 pt-8 pb-20 flex items-center mx-auto xl:mx-[121.5px] xl:px-0">
        <div className="max-w-2xl">
          <h1 className="text-[6.5vw] sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-2 text-white">
            <span className="block mb-1 md:mb-0">Bike rentals for</span>
            <span className="block">every adventure</span>
          </h1>

          <p className="text-[3.7vw] sm:text-sm md:text-base text-white font-medium">
            Great bikes at great prices from
            <br />
            trusted rental partners
          </p>
        </div>
      </div>
    </section>
  );
}

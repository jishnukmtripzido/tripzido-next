import Image from "next/image";
import heroMob from "@/public/hero/hero-mob.png";
import heroLg from "@/public/hero/hero-lg.png";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden h-[55vw] min-h-[200px] max-h-[420px] md:h-[42vh] md:min-h-[270px] md:max-h-none">
      <div className="absolute inset-0 z-0">
        {/* Mobile image — hidden on md+ */}
        <Image
          src={heroMob}
          alt="Motorcycle in scenic location"
          fill
          priority
          quality={80}
          sizes="(max-width: 768px) 100vw, 0vw"
          placeholder="blur"
          className="object-cover object-center md:hidden"
        />
        {/* Desktop image — hidden below md */}
        <Image
          src={heroLg}
          alt="Motorcycle in scenic location"
          fill
          priority
          quality={80}
          sizes="(max-width: 768px) 0vw, 100vw"
          placeholder="blur"
          className="object-cover object-center hidden md:block"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-4 lg:px-8 pt-8 pb-20 flex items-center mx-auto xl:mx-[121.5px] xl:px-0" />
    </section>
  );
}

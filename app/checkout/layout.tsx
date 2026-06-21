import "../globals.css";
import Header from "@/components/layout/Header";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header
        logoWidth={4}
        logoHeight={4}
        logoTextSize="xl"
        linkIconsSize={4}
        headerLgScreenMx="xl:mx-[80.5px] xl:px-0"
        headerValues=" w-full bg-white py-2 border-b border-gray-100 text-gray-900"
      />
      {children}
    </>
  );
}

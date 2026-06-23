import "../globals.css";
import Header from "@/components/layout/Header";

export default function SearchResultLayout({
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
        headerLgScreenMx=" xl:px-5"
        headerValues=" w-full  py-2 border-b border-gray-100 text-gray-900 shadow-sm md:shadow-none"
      />
      {children}
    </>
  );
}

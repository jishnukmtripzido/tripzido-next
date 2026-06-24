export default function OfferBanner() {
  return (
    <div className="hidden md:block bg-brand-yellow px-6 py-2.5">
      <div className="text-center ">
        <p className="text-[10px] md:text-sm font-normal text-black">
          Limited time offer — Get{" "}
          <strong className="text-black">10% off</strong> on your first booking!
          Use code{" "}
          <span className="text-black">
            {" "}
            <strong>TRIP10</strong>
          </span>{" "}
          at checkout.
        </p>
        {/* <span className="shrink-0 text-[10px] md:text-[12.8px] font-thin bg-black text-brand-yellow px-3 py-1 rounded-full whitespace-nowrap">
          ⏰ Ends soon
        </span> */}
      </div>
    </div>
  );
}

// export default function OfferBanner() {
//   return (
//     <div className="hidden md:block bg-[#fed250] px-6 py-2.5">
//       <div className="text-center ">
//         <p className="text-[10px] md:text-[12.8px] font-thin text-[#3a2c00]">
//           🎉 Limited time offer — Get <strong className="text-black">10% off</strong> on your first booking!
//         </p>
//       </div>
//     </div>
//   );
// }

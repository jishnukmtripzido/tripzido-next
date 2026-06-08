export default function VehicleHeader() {
  return (
    <div className="bg-gray-50 rounded-md p-8 border border-gray-200 flex flex-col items-center relative mb-8">
      <div className="absolute top-4 left-4 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
        7 Bikes Available
      </div>
      <img
        src="https://gowheelo.com/_next/image?url=https%3A%2F%2Fstatic.gowheelo.com%2Fuploads%2Fold%2Fbike%2FYamaha-Fascino.png&w=640&q=75"
        alt="Yamaha Fascino"
        className="w-full max-w-md h-auto mix-blend-multiply mb-6 p-5"
      />
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Yamaha Fascino
        </h1>
        <p className="text-gray-500 text-sm">Make Year: 2023</p>
        <p className="text-xs text-gray-400 mt-4">
          *Images are for representation purposes only.
        </p>
      </div>
    </div>
  );
}

import BikeCard from "@/components/search/BikeCard";
import { Bike } from "@/types";

const BIKES: Bike[] = [
  {
    id: "1",
    name: "Royal Enfield Himalayan",
    specs: "411cc · Adventure · Manual",
    imageUrl: "https://media.publit.io/file/bike-T.png",
    price: 1299,
    badge: { label: "Most booked", variant: "yellow" },
    tags: ["Free helmet", "Fuel included"],
  },
  {
    id: "2",
    name: "Honda Activa 6G",
    specs: "110cc · Scooter · Automatic",
    imageUrl: "https://media.publit.io/file/bike-T.png",
    price: 499,
    badge: { label: "Best value", variant: "green" },
    tags: ["Free helmet", "Storage box"],
  },
  {
    id: "3",
    name: "Royal Enfield Classic",
    specs: "349cc · Cruiser · Manual",
    imageUrl: "https://media.publit.io/file/bike-T.png",
    price: 999,
    tags: ["Free helmet", "Iconic ride"],
  },
  {
    id: "4",
    name: "TVS Ntorq 125",
    specs: "125cc · Scooter · Automatic",
    imageUrl: "https://media.publit.io/file/bike-T.png",
    price: 649,
    tags: ["Free helmet", "Sporty"],
  },
  {
    id: "5",
    name: "Bajaj Pulsar NS200",
    specs: "199cc · Street · Manual",
    imageUrl: "https://media.publit.io/file/bike-T.png",
    price: 849,
    tags: ["Free helmet", "ABS brakes"],
    rating: 4.4,
    reviewCount: 31,
  },
  {
    id: "6",
    name: "Yamaha MT-15 V2",
    specs: "155cc · Naked · Manual",
    imageUrl: "https://media.publit.io/file/bike-T.png",
    price: 899,
    tags: ["Free helmet", "VVA tech"],
    rating: 4.6,
    reviewCount: 58,
  },
];

interface SearchPageProps {
  searchParams: {
    city?: string;
    from?: string;
    to?: string;
  };
}

async function getBikes(
  searchParams: SearchPageProps["searchParams"]
): Promise<Bike[]> {
  // Replace with your real API call
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bikes/?city=${searchParams.city}`)
  // return res.json()

  return BIKES;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const bikes = await getBikes(searchParams);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bike Rental Search Results</h1>

      {bikes.length === 0 ? (
        <p className="text-gray-500">No bikes found for your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      )}
    </div>
  );
}
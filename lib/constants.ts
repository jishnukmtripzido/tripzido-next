// ── Auth ─────────────────────────────────────────────────────────────
export const COUNTRY_CODES = [
  { flag: "🇮🇳", code: "+91", country: "IN" },
  { flag: "🇺🇸", code: "+1", country: "US" },
  { flag: "🇬🇧", code: "+44", country: "GB" },
  { flag: "🇩🇪", code: "+49", country: "DE" },
  { flag: "🇫🇷", code: "+33", country: "FR" },
  { flag: "🇧🇷", code: "+55", country: "BR" },
  { flag: "🇦🇺", code: "+61", country: "AU" },
  { flag: "🇯🇵", code: "+81", country: "JP" },
];

// ── Login modal ───────────────────────────────────────────────────────
export const LOGIN_MODAL_CITIES = [
  { name: "Delhi", top: "8%", left: "50%" },
  { name: "Goa", top: "22%", left: "78%" },
  { name: "Manali", top: "48%", left: "88%" },
  { name: "Jaipur", top: "74%", left: "78%" },
  { name: "Mysuru", top: "88%", left: "50%" },
  { name: "Mumbai", top: "74%", left: "22%" },
  { name: "Wayanad", top: "48%", left: "12%" },
  { name: "Coorg", top: "22%", left: "22%" },
];

export const LOGIN_MODAL_STATS = [
  { value: "50+", label: "Cities" },
  { value: "1,20,000+", label: "Happy Customers" },
  { value: "6000+", label: "Vehicles" },
  { value: "4.8/5 ⭐", label: "1200+ reviews" },
];

// ── Search ────────────────────────────────────────────────────────────
export const SORT_OPTIONS = [
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

export const POPULAR_BIKE_FILTER_TABS = [
  "All bikes",
  "Scooters",
  "Adventure",
  "Cruisers",
  "Electric",
  "Sports",
];

// ── Home page static data ─────────────────────────────────────────────
export const OFFERS = [
  {
    id: "1",
    featured: true,
    title: "Get Flat Rs. 100 OFF",
    description: "Get Flat Rs. 100 OFF on orders above Rs. 2,000",
  },
  {
    id: "2",
    title: "Get Flat Rs. 50 OFF",
    description: "Get Flat Rs. 50 off on orders above Rs. 1,000",
  },
  {
    id: "3",
    title: "Get Flat Rs. 200 OFF",
    description: "Get Flat Rs. 200 off on orders above Rs. 5,000",
  },
  {
    id: "4",
    title: "Get Flat Rs. 500 OFF",
    description: "Get Flat Rs. 500 off on orders above Rs. 10,000",
  },
  {
    id: "5",
    title: "Free Ride Voucher",
    description: "Refer a friend and earn a free 1-day ride voucher",
  },
];

export const TOP_DESTINATIONS = [
  {
    name: "New Delhi",
    imageUrl:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
    flag: "🇮🇳",
  },
  {
    name: "Bangalore",
    imageUrl:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=80",
    flag: "🇮🇳",
  },
];

export const BOTTOM_DESTINATIONS = [
  {
    name: "Mumbai",
    imageUrl:
      "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=600&q=80",
    flag: "🇮🇳",
  },
  {
    name: "Chennai",
    imageUrl:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80",
    flag: "🇮🇳",
  },
  {
    name: "Varanasi",
    imageUrl:
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=600&q=80",
    flag: "🇮🇳",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Find your Ride",
    description:
      "Enter your city, pick-up and drop date & time to choose from available two-wheelers at your desired go-hub.",
    active: true,
  },
  {
    step: 2,
    title: "Book your Ride",
    description:
      "Select your package and choose from the available payment options. Instant confirmation, no waiting.",
  },
  {
    step: 3,
    title: "Get Ready to Ride",
    description:
      "Receive ride details via SMS & email. Reach the pick-up point on time, pay the security deposit (if applicable), and enjoy every moment.",
  },
  {
    step: 4,
    title: "End your Ride",
    description:
      "Drop the vehicle at the pick-up point. Security deposit is refunded after checking for damages and challans, if any.",
  },
];

export const FAQ_LEFT = [
  {
    question: "Why should I rent a bike with Tripzido?",
    answer:
      "Tripzido partners with verified local rental vendors across popular destinations in India. You get transparent pricing, no hidden fees, and the freedom to explore at your own pace on a well-maintained bike.",
  },
  {
    question: "What documents do I need to rent a bike?",
    answer:
      "You'll need a valid driving licence (with two-wheeler endorsement), a government-issued photo ID (Aadhaar, Passport, or Voter ID), and a security deposit. International riders may need an IDP along with their home licence.",
  },
  {
    question: "Am I old enough to rent a bike?",
    answer:
      "The minimum age to rent a bike through Tripzido is 18 years. For larger engine capacity bikes (above 250cc), some vendors may require you to be at least 21 years old.",
  },
];

export const FAQ_RIGHT = [
  {
    question: "Can I book a bike for someone else?",
    answer:
      "Yes, you can book on behalf of someone else. However, the person picking up the bike must carry their own valid driving licence and ID proof.",
  },
  {
    question: "Any tips for picking the right bike?",
    answer:
      "For hilly or off-road terrain like Wayanad or Coorg, go for a 200–250cc bike. For city or coastal rides, a 100–150cc scooter or commuter works great.",
  },
  {
    question: "Are all fees included in the rental price?",
    answer:
      "The price shown includes the base rental and applicable taxes. Fuel, helmet (in some cases), and any extra-distance charges may be billed separately by the vendor at pick-up.",
  },
];

export const POPULAR_BIKES = [
  {
    id: "1",
    name: "Royal Enfield Himalayan",
    specs: "411cc · Adventure · Manual",
    imageUrl: "https://media.publit.io/file/bike-T.png",
    price: 1299,

    tags: ["Free helmet", "Fuel included"],
  },
  {
    id: "2",
    name: "Honda Activa 6G",
    specs: "110cc · Scooter · Automatic",
    imageUrl: "https://media.publit.io/file/bike-T.png",
    price: 499,

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

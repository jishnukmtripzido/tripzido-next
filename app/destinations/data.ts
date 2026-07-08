export interface DestinationBlogSection {
  heading: string;
  content: string;
}

export interface Destination {
  id: number;
  slug: string;
  name: string;
  state: string;
  emoji: string;
  image: string;
  gradient: string;
  tag: string;
  tagColor: string;
  bikes: number;
  desc: string;
  highlights: string[];
  bestFor: string;
  distance: string;
  blog: {
    intro: string;
    sections: DestinationBlogSection[];
    bestTimeToVisit: string;
    ridingTips: string[];
  };
}

export const destinations: Destination[] = [
  {
    id: 1,
    slug: "wayanad",
    name: "Wayanad",
    state: "Kerala",
    emoji: "🌿",
    image: "/destinations/wayanad.jpg",
    gradient: "from-green-400 to-emerald-600",
    tag: "Trending",
    tagColor: "bg-green-100 text-green-700",
    bikes: 18,
    desc: "Misty hills, coffee estates, and wildlife sanctuaries. Perfect for a scenic two-wheel escape.",
    highlights: ["Chembra Peak", "Edakkal Caves", "Pookode Lake"],
    bestFor: "Nature lovers",
    distance: "270 km from Bangalore",
    blog: {
      intro:
        "Wayanad sits high in the Western Ghats, where the air is cooler, the roads twist through coffee and spice plantations, and the mist rolls in most mornings. It's one of the few places in Kerala where you ride uphill instead of along the coast — and the change of pace shows in every hairpin bend.",
      sections: [
        {
          heading: "The ride in",
          content:
            "The approach from Kozhikode or Sulthan Bathery is where Wayanad earns its reputation. Roads climb steadily through the Western Ghats, cutting between dense forest cover and terraced plantations. Expect switchbacks, the occasional langur crossing the road, and viewpoints that appear with no warning — pull over when you see one.",
        },
        {
          heading: "What to see once you're there",
          content:
            "Chembra Peak's heart-shaped lake is the trek most people come for, but you'll need an early start and a forest permit. Edakkal Caves has some of the oldest petroglyphs in India, carved into a natural cleft in the rock. Pookode Lake is a calmer, easier stop — good for an early evening ride if you've spent the day on the trail.",
        },
        {
          heading: "Where the coffee comes from",
          content:
            "Wayanad is one of Kerala's biggest coffee-growing regions, and a lot of the estates open their gates to visitors. Riding through them at first light, with mist still sitting on the bushes, is a completely different Wayanad than the one you'll see at noon.",
        },
      ],
      bestTimeToVisit:
        "October to May. The monsoon (June–September) turns the ghat roads beautiful but genuinely hazardous for two-wheelers — landslides and heavy fog are common, so it's best avoided on a bike.",
      ridingTips: [
        "Ghat roads have limited visibility on blind curves — keep your speed down and use your horn on bends.",
        "Fuel up before you start climbing; stations thin out once you're deep in the hills.",
        "Early mornings mean cold air at altitude — carry a light jacket even in summer.",
      ],
    },
  },
  {
    id: 2,
    slug: "varkala",
    name: "Varkala",
    state: "Kerala",
    emoji: "🏝️",
    image: "/destinations/varkala.jpg",
    gradient: "from-sky-400 to-cyan-600",
    tag: "Popular",
    tagColor: "bg-amber-100 text-amber-700",
    bikes: 22,
    desc: "Dramatic red cliffs meeting the Arabian Sea, with cafes perched right on the edge. A rare mix of beach and highland views.",
    highlights: ["Varkala Cliff", "Papanasam Beach"],
    bestFor: "Weekend riders",
    distance: "50 km from Trivandrum",
    blog: {
      intro:
        "Varkala is the one stretch of Kerala coastline where the land doesn't slope gently into the sea — it drops in a sheer red cliff, with the Arabian Sea crashing against the base and a row of cafes lining the top. It's compact enough to see properly in a single weekend, which makes it one of the easiest rides to plan on short notice.",
      sections: [
        {
          heading: "The cliff walk",
          content:
            "The main cliff stretch is a paved promenade lined with cafes, shops, and lookout points — walkable in twenty minutes, but worth taking slowly. Time your ride to arrive in the late afternoon and you'll catch the sunset from one of the cliffside cafes without needing a table reservation.",
        },
        {
          heading: "Papanasam Beach",
          content:
            "Directly below the cliff, Papanasam is considered a holy bathing spot as much as a beach — it's not unusual to see a temple ritual happening at one end and surfers paddling out at the other. Steps connect the cliff to the beach at a few points; parking your bike near the north cliff entrance is usually easiest.",
        },
        {
          heading: "Beyond the cliff",
          content:
            "Most visitors don't venture past the cliff area, but the backwaters just inland and the quieter Odayam beach a short ride north are both worth the detour if you have an extra half-day.",
        },
      ],
      bestTimeToVisit:
        "November to March for the clearest skies and calmest sea. April–May gets hot; the monsoon months bring rough surf that closes most of the beach for swimming.",
      ridingTips: [
        "The cliff-top lanes get crowded and narrow in peak season evenings — park early if you want a spot near the main viewpoint.",
        "Roads down to Papanasam Beach are steep and can be slick after rain — go slow on the descent.",
        "Carry cash; some of the smaller cliffside cafes and shops don't take cards reliably.",
      ],
    },
  },
  {
    id: 3,
    slug: "goa",
    name: "Goa",
    state: "Goa",
    emoji: "🏖️",
    image: "/destinations/goa.jpg",
    gradient: "from-cyan-400 to-blue-500",
    tag: "Beach Vibes",
    tagColor: "bg-blue-100 text-blue-700",
    bikes: 35,
    desc: "Sun, sand and coastal roads. Bikes are the best way to hop between Goa's legendary beaches.",
    highlights: ["Baga Beach", "Old Goa Church", "Dudhsagar Falls"],
    bestFor: "Beach lovers",
    distance: "600 km from Bangalore",
    blog: {
      intro:
        "Goa is built for two wheels in a way few Indian destinations are — beaches are close together, roads are flat and well-paved by Indian standards, and almost everything worth seeing is within an hour's ride of almost everything else. The real advantage of a bike here isn't reaching any single beach, it's how easily you can string several together in one day.",
      sections: [
        {
          heading: "North vs. South",
          content:
            "North Goa (Baga, Calangute, Anjuna) is louder, busier, and better for nightlife and beach shacks. South Goa (Palolem, Agonda, Colva) is quieter and better for actually relaxing on the sand without a crowd. A bike makes it realistic to base yourself in one and day-trip into the other.",
        },
        {
          heading: "Old Goa's churches",
          content:
            "Away from the beaches, Old Goa holds some of the oldest colonial-era churches in Asia, including the Basilica of Bom Jesus, a UNESCO World Heritage Site. It's a completely different pace from the coast — worth a half-day detour inland.",
        },
        {
          heading: "Dudhsagar Falls",
          content:
            "One of India's tallest waterfalls sits on the Goa–Karnataka border, inside Bhagwan Mahavir Wildlife Sanctuary. The last stretch to the base usually requires a jeep safari rather than a bike, so plan to park and switch transport for that leg.",
        },
      ],
      bestTimeToVisit:
        "November to February for cool, dry weather and the full range of beach shacks open. March–May gets hot and humid; the monsoon (June–September) closes most water activities but turns the state a striking green.",
      ridingTips: [
        "Traffic gets dense around Calangute and Baga in peak season evenings — plan around it if you're just passing through.",
        "Fuel stations are plentiful, but many beach roads have single-lane sections — watch for oncoming traffic on blind bends.",
        "Helmet enforcement is active in Goa; carry one even for short rides between beaches.",
      ],
    },
  },
  {
    id: 4,
    slug: "alleppey",
    name: "Alleppey",
    state: "Kerala",
    emoji: "🛶",
    image: "/destinations/alappuzha.jpg",
    gradient: "from-emerald-500 to-teal-600",
    tag: "Backwaters",
    tagColor: "bg-emerald-100 text-emerald-700",
    bikes: 19,
    desc: "The Venice of the East — ride alongside palm-fringed canals, paddy fields and houseboats drifting through the backwaters.",
    highlights: ["Alleppey Backwaters", "Marari Beach", "Punnamada Lake"],
    bestFor: "Backwater explorers",
    distance: "155 km from Kochi",
    blog: {
      intro:
        "Alleppey is flat, which sounds like a small detail until you're actually riding it — no ghats, no hairpins, just long straight roads running alongside canals, with palm trees leaning in from both sides and the occasional houseboat drifting past at walking pace. It's one of the most relaxed rides in Kerala, and one of the only places where the scenery keeps up with you the entire way.",
      sections: [
        {
          heading: "Riding the canal roads",
          content:
            "Much of Alleppey's charm is in the small canal-side roads that connect the villages — narrow, quiet, and often shaded by coconut palms. These aren't the roads that show up on a typical map search; ask locally or follow the water and you'll find them.",
        },
        {
          heading: "Punnamada Lake",
          content:
            "Home to the Nehru Trophy Boat Race, one of Kerala's biggest annual events. Outside race season, it's a calm stretch of water good for an early morning ride along its banks before the day heats up.",
        },
        {
          heading: "Marari Beach",
          content:
            "A quieter, less commercial beach than most of Kerala's coastline — a short ride from the main backwater area, and a good stop if you want sand and sea after a day of canals and paddy fields.",
        },
      ],
      bestTimeToVisit:
        "November to February for the coolest, driest weather. August is when the Nehru Trophy Boat Race happens, if you want to time a visit around it — expect crowds.",
      ridingTips: [
        "Canal-side roads are narrow with no real shoulder — a fall here often means a fall into water, so keep speeds low.",
        "Roads flood quickly in the monsoon; check conditions before riding the backwater routes June–September.",
        "Houseboat traffic on the water doesn't affect road riding, but jetty areas get crowded with parked vehicles — plan parking ahead if visiting during boat race season.",
      ],
    },
  },
  {
    id: 5,
    slug: "kochi",
    name: "Kochi",
    state: "Kerala",
    emoji: "⚓",
    image: "/destinations/kochi.jpg",
    gradient: "from-teal-500 to-blue-600",
    tag: "Heritage",
    tagColor: "bg-teal-100 text-teal-700",
    bikes: 20,
    desc: "A port city where Dutch, Portuguese and Chinese influences meet — ride past colonial streets, backwaters and Chinese fishing nets.",
    highlights: ["Fort Kochi", "Chinese Fishing Nets", "Mattancherry Palace"],
    bestFor: "Culture explorers",
    distance: "220 km from Trivandrum",
    blog: {
      intro:
        "Kochi has been a trading port for centuries, and it shows — Portuguese churches sit a few streets from Dutch-era warehouses, a synagogue built by Jewish traders, and Chinese fishing nets that have worked the harbor mouth since the 14th century. It's a city best explored slowly, on a bike, where you can stop at whatever catches your eye without hunting for parking.",
      sections: [
        {
          heading: "Fort Kochi's streets",
          content:
            "Fort Kochi is small enough to ride end-to-end in twenty minutes, but every side street has something worth stopping for — colonial-era bungalows, art galleries, small cafes in converted warehouses. This is a place to ride slow, not fast.",
        },
        {
          heading: "The Chinese fishing nets",
          content:
            "Installed by traders from the court of Kublai Khan, these giant cantilevered nets still operate along the harbor front at sunset — one of the few working pieces of 14th-century engineering you'll see still in daily use.",
        },
        {
          heading: "Mattancherry Palace and the Jew Town",
          content:
            "A short ride from Fort Kochi, Mattancherry Palace holds Kerala mural art dating back centuries, and the neighboring Jew Town is home to one of India's oldest active synagogues, alongside antique shops and spice traders that have operated for generations.",
        },
      ],
      bestTimeToVisit:
        "October to March for pleasant, walkable weather. The city is humid year-round, so early morning or evening rides are more comfortable than midday.",
      ridingTips: [
        "Fort Kochi's streets are narrow and pedestrian-heavy — go slow, especially near the fishing nets at sunset when crowds gather.",
        "Ferries connect Fort Kochi to Ernakulam and Vypin — some carry two-wheelers, which is a good way to see the harbor from the water.",
        "Parking is tight in the old town core; look for designated bike parking near the main jetty rather than circling for street parking.",
      ],
    },
  },
  {
    id: 6,
    slug: "munnar",
    name: "Munnar",
    state: "Kerala",
    emoji: "🍃",
    image: "/destinations/munnar.jpg",
    gradient: "from-lime-500 to-green-600",
    tag: "Scenic",
    tagColor: "bg-lime-100 text-lime-700",
    bikes: 16,
    desc: "Rolling tea gardens and cool mountain roads through Kerala's highest ranges.",
    highlights: ["Top Station", "Eravikulam NP", "Mattupetty Dam"],
    bestFor: "Scenic riders",
    distance: "130 km from Kochi",
    blog: {
      intro:
        "Munnar sits at altitude in the Western Ghats, surrounded by tea estates that stretch further than you can see in any direction. The ride up is the whole point — steady climbs, sharp switchbacks, and a temperature drop that's noticeable the moment you cross into the higher elevations.",
      sections: [
        {
          heading: "The climb up",
          content:
            "The road from Adimali to Munnar is where most of the elevation gain happens — a steady series of hairpins cutting through forest, with tea gardens taking over as you get higher. Give yourself extra time here; it's not a road to rush.",
        },
        {
          heading: "Top Station",
          content:
            "One of the highest points accessible by road in the area, sitting right on the Kerala–Tamil Nadu border. On a clear day the valley views stretch for miles — worth the ride even if you don't stop anywhere else.",
        },
        {
          heading: "Eravikulam and the Nilgiri Tahr",
          content:
            "Eravikulam National Park is one of the few places you can reliably spot the Nilgiri Tahr, an endangered mountain goat found only in this stretch of the Western Ghats. The park has restricted vehicle access inside, so plan to park and walk in.",
        },
      ],
      bestTimeToVisit:
        "September to May. The monsoon brings heavy fog and landslide risk on the ghat roads, making the climb genuinely risky on two wheels during that stretch.",
      ridingTips: [
        "Temperatures drop fast with altitude — pack a proper jacket even if it's warm at the base.",
        "Fog rolls in with little warning at higher elevations; use your headlight and slow down rather than push through low visibility.",
        "Tea estate roads can be shared with estate vehicles and workers — keep speeds down through plantation stretches.",
      ],
    },
  },
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export const stats = [
  { value: "5+", label: "Cities" },
  { value: "500+", label: "Bikes" },
  { value: "50K+", label: "Happy Riders" },
  { value: "4.8★", label: "Avg Rating" },
];

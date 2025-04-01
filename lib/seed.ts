import { ID } from "react-native-appwrite";
import { databases, config } from "./appwrite";

// Define image URLs directly in this file instead of importing
const agentImages = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3"
];

const reviewImages = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3", 
  "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1546456073-6712f79251bb?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1563237023-b1e970526dcb?ixlib=rb-4.0.3"
];

const propertiesImages = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3", // House
  "https://images.unsplash.com/photo-1623298317883-6b70254edf31?ixlib=rb-4.0.3", // Villa
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3", // Condo
  "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3", // Townhouse
  "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3", // House
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3", // Condo
  "https://images.unsplash.com/photo-1615529182904-14819c35db37?ixlib=rb-4.0.3", // Duplex
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3", // Studio
  "https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?ixlib=rb-4.0.3", // Villa
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3", // Apartment
  "https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?ixlib=rb-4.0.3", // House
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3", // Townhouse
  "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-4.0.3", // Studio
  "https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?ixlib=rb-4.0.3", // Duplex
  "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3", // House
  "https://images.unsplash.com/photo-1551361415-69c87624334f?ixlib=rb-4.0.3", // Condo
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3", // Other
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3", // Apartment
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3", // Other
  "https://images.unsplash.com/photo-1592595896616-c37162298647?ixlib=rb-4.0.3"  // House
];

const galleryImages = [
  // Living rooms
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1616137466211-f939a420be84?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1618219740975-d40b0d694292?ixlib=rb-4.0.3",
  
  // Kitchens
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1604709177225-055f99402ea3?ixlib=rb-4.0.3",
  
  // Bedrooms
  "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1617325710236-4a36d42c9d8e?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1616137466211-f939a420be84?ixlib=rb-4.0.3",
  
  // Bathrooms
  "https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3",
  
  // Exteriors
  "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3",
  
  // Amenities
  "https://images.unsplash.com/photo-1622866306940-90eb28f93e3a?ixlib=rb-4.0.3", // Pool
  "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?ixlib=rb-4.0.3", // Gym
  "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?ixlib=rb-4.0.3", // Garden
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3"  // Balcony
];

const COLLECTIONS = {
  AGENT: config.agentsCollectionId,
  REVIEWS: config.reviewsCollectionId,
  GALLERY: config.galleriesCollectionId,
  PROPERTY: config.propertiesCollectionId,
};

// Property types with guaranteed distribution
const propertyTypes = [
  "House",
  "Townhouse",
  "Condo",
  "Duplex",
  "Studio",
  "Villa",
  "Apartment",
  "Other",
];

// Facilities staying the same as original
const facilities = [
  "Laundry",
  "Parking",
  "Sports-center",
  "Cutlery",
  "Gym",
  "Swimming-pool",
  "Wifi",
  "Pet-friendly",
];

// Agent data with real names and details
const agentData = [
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@realestategroup.com",
  },
  {
    name: "Michael Chen",
    email: "michael.chen@realestategroup.com",
  },
  {
    name: "Olivia Rodriguez",
    email: "olivia.rodriguez@realestategroup.com",
  },
  {
    name: "James Wilson",
    email: "james.wilson@realestategroup.com",
  },
  {
    name: "Aisha Patel",
    email: "aisha.patel@realestategroup.com",
  },
];

// Property data with realistic names and descriptions for rental properties
const propertyData = [
  {
    name: "Oakwood Estates",
    type: "House",
    description: "A stunning 4-bedroom family home nestled in a quiet cul-de-sac with mature oak trees and beautifully landscaped gardens. Features a gourmet kitchen, home office, and expansive deck perfect for entertaining.",
    address: "127 Oakwood Drive, Maplewood Hills",
    price: 3200, // Monthly rent
    area: 2800,
    bedrooms: 4,
    bathrooms: 3,
  },
  {
    name: "Riverside Retreat",
    type: "Villa",
    description: "Luxury waterfront villa with panoramic river views, private dock, and infinity pool. This architectural masterpiece offers indoor-outdoor living at its finest.",
    address: "8 Riverside Lane, Harbor Heights",
    price: 5500, // Monthly rent
    area: 4200,
    bedrooms: 5,
    bathrooms: 4,
  },
  {
    name: "Urban Loft",
    type: "Condo",
    description: "Industrial-chic loft in the heart of downtown, featuring exposed brick walls, soaring ceilings, and floor-to-ceiling windows. Recently renovated with top-of-the-line appliances.",
    address: "501 Metro Avenue, Downtown District",
    price: 2100, // Monthly rent
    area: 1250,
    bedrooms: 2,
    bathrooms: 2,
  },
  {
    name: "Sunset Terrace",
    type: "Townhouse",
    description: "Modern townhouse in a gated community with stunning sunset views. End unit with extra windows, updated kitchen, and premium fixtures throughout.",
    address: "23 Hillcrest Road, Sunset Valley",
    price: 2600, // Monthly rent
    area: 1900,
    bedrooms: 3,
    bathrooms: 2,
  },
  {
    name: "The Pines Cottage",
    type: "House",
    description: "Charming cottage surrounded by pine trees with a cozy fireplace, reading nook, and chef's kitchen. Large backyard with vegetable garden and fire pit.",
    address: "45 Pine Needle Lane, Forest Grove",
    price: 1800, // Monthly rent
    area: 1700,
    bedrooms: 2,
    bathrooms: 2,
  },
  {
    name: "Skyline Penthouse",
    type: "Condo",
    description: "Luxurious penthouse with 360-degree city views, private elevator, and wraparound terrace. Building amenities include concierge, spa, and rooftop lounge.",
    address: "1200 Tower Place, Unit PH3, City Center",
    price: 6500, // Monthly rent
    area: 3200,
    bedrooms: 3,
    bathrooms: 3,
  },
  {
    name: "Meadow Brook Duplex",
    type: "Duplex",
    description: "Spacious duplex beside Meadow Brook with recent updates including new flooring and modern kitchen. Great investment opportunity with strong rental history.",
    address: "78 Brook Street, Meadowlands",
    price: 2400, // Monthly rent
    area: 2500,
    bedrooms: 4,
    bathrooms: 2,
  },
  {
    name: "Harborview Studio",
    type: "Studio",
    description: "Compact but efficiently designed studio apartment with harbor views, built-in storage solutions, and balcony. Perfect for young professionals.",
    address: "303 Marina Way, Unit 12, Harbor District",
    price: 1200, // Monthly rent
    area: 550,
    bedrooms: 0,
    bathrooms: 1,
  },
  {
    name: "Palm Springs Villa",
    type: "Villa",
    description: "Mid-century modern villa with private pool, desert landscaping, and mountain views. Fully renovated with retro-inspired luxury finishes.",
    address: "66 Desert Palm Road, Palm Springs",
    price: 4500, // Monthly rent
    area: 2800,
    bedrooms: 3,
    bathrooms: 3,
  },
  {
    name: "Brookside Apartment",
    type: "Apartment",
    description: "Light-filled apartment overlooking a peaceful brook with updated kitchen, in-unit laundry, and generous storage. Building offers fitness center and co-working space.",
    address: "189 Brookside Avenue, Apt 3B, Riverdale",
    price: 1650, // Monthly rent
    area: 1000,
    bedrooms: 2,
    bathrooms: 1,
  },
  {
    name: "Heritage Homestead",
    type: "House",
    description: "Historic farmhouse lovingly preserved with original hardwood floors and woodwork, combined with modern amenities. Set on 2 acres with barn and fruit trees.",
    address: "1842 Heritage Lane, Old Town",
    price: 2950, // Monthly rent
    area: 2600,
    bedrooms: 4,
    bathrooms: 2,
  },
  {
    name: "The Savoy Townhouse",
    type: "Townhouse",
    description: "Elegant three-story townhouse with rooftop deck, wine cellar, and designer finishes throughout. Walking distance to shops and restaurants.",
    address: "52 Savoy Boulevard, Highpoint",
    price: 3100, // Monthly rent
    area: 2300,
    bedrooms: 3,
    bathrooms: 3,
  },
  {
    name: "Metro Microloft",
    type: "Studio",
    description: "Innovative micro-studio with transformable furniture and smart home features. Amazing location with all city amenities at your doorstep.",
    address: "721 Urban Street, Unit 8G, Downtown",
    price: 950, // Monthly rent
    area: 400,
    bedrooms: 0,
    bathrooms: 1,
  },
  {
    name: "Lakeside Duplex",
    type: "Duplex",
    description: "Waterfront duplex with private dock and separate entrances. Both units recently renovated with lake views from all major rooms.",
    address: "33 Lakeshore Drive, Crystal Lake",
    price: 3800, // Monthly rent
    area: 3000,
    bedrooms: 5,
    bathrooms: 3,
  },
  {
    name: "Eco Modern House",
    type: "House",
    description: "Net-zero energy smart home with solar panels, rainwater harvesting, and sustainable materials throughout. Open floor plan with abundant natural light.",
    address: "17 Green Valley Road, Eco Village",
    price: 3400, // Monthly rent
    area: 2400,
    bedrooms: 3,
    bathrooms: 2,
  },
  {
    name: "The Residence Condo",
    type: "Condo",
    description: "Luxury high-rise condo with floor-to-ceiling windows, gourmet kitchen, and marble bathrooms. Building offers 24/7 security, valet parking, and infinity pool.",
    address: "888 Prestige Boulevard, Unit 2104, Uptown",
    price: 3700, // Monthly rent
    area: 1900,
    bedrooms: 2,
    bathrooms: 2,
  },
  {
    name: "Mountain View Cabin",
    type: "Other",
    description: "Custom-built log cabin with breathtaking mountain views, stone fireplace, and wrap-around porch. Perfect as a vacation rental.",
    address: "457 Alpine Trail, Mountain Retreat",
    price: 1950, // Monthly rent
    area: 1500,
    bedrooms: 2,
    bathrooms: 1,
  },
  {
    name: "City Center Apartment",
    type: "Apartment",
    description: "Contemporary apartment in vibrant central location with high-end finishes, built-in sound system, and city views. Steps from transit, dining, and shopping.",
    address: "505 Central Avenue, Apt 1703, Midtown",
    price: 2200, // Monthly rent
    area: 1150,
    bedrooms: 2,
    bathrooms: 2,
  },
  {
    name: "Coastal Hideaway",
    type: "Other",
    description: "Unique beachfront property with private beach access, open concept living, and expansive decks. Floor-to-ceiling windows showcase spectacular ocean views.",
    address: "12 Shoreline Drive, Coastal Bluffs",
    price: 5800, // Monthly rent
    area: 2300,
    bedrooms: 3,
    bathrooms: 2,
  },
  {
    name: "Willow Creek House",
    type: "House",
    description: "Charming family home on Willow Creek with beautiful gardens, updated kitchen, and finished basement. Quiet neighborhood close to top-rated schools.",
    address: "232 Willow Street, Creekside",
    price: 2700, // Monthly rent
    area: 2200,
    bedrooms: 4,
    bathrooms: 2,
  },
];

// Reviewer data with real names and specific ratings for rental properties
const reviewerData = [
  {
    name: "David Thompson",
    review: "We couldn't be happier with our rental! The location is perfect and the property exceeded our expectations. Our agent was incredibly helpful throughout the entire process.",
    rating: 5,
  },
  {
    name: "Jennifer Lopez",
    review: "Great experience overall. The property matched the listing description perfectly. Only giving 4 stars because the move-in date was delayed by a week.",
    rating: 4,
  },
  {
    name: "Robert Kim",
    review: "This rental is exactly what we were looking for. The neighborhood is fantastic and we love the layout. The agent's attention to detail was impressive.",
    rating: 5,
  },
  {
    name: "Emily Mitchell",
    review: "We've been renting this property for three months now and couldn't be happier. The unit is even better than we thought it would be!",
    rating: 5,
  },
  {
    name: "Carlos Mendez",
    review: "Some minor issues with the appliances that weren't disclosed initially, but the agent worked with us to resolve them. Overall satisfied with the rental.",
    rating: 3,
  },
  {
    name: "Sophia Williams",
    review: "The virtual tour didn't do this place justice! It's absolutely stunning in person. The open floor plan and natural light are exactly what we wanted.",
    rating: 5,
  },
  {
    name: "Brandon Taylor",
    review: "Property is good but overpriced for what you get. Location is excellent though. Agent was responsive but pushed us to decide quickly.",
    rating: 3,
  },
  {
    name: "Lina Ahmed",
    review: "Excellent rental property! The amenities are exactly as described and the unit was in great condition. Very pleased with our decision to rent here.",
    rating: 4,
  },
  {
    name: "Mark Johnson",
    review: "The property features are amazing. We particularly love the kitchen and master bathroom. Great value for the monthly rent!",
    rating: 5,
  },
  {
    name: "Priya Patel",
    review: "We had some concerns about the age of the building, but everything is well-maintained. Very happy with our decision to rent this apartment.",
    rating: 4,
  },
  {
    name: "Thomas Wright",
    review: "The rental process was smooth from start to finish. The property is exactly as advertised and the neighborhood is even better than expected.",
    rating: 5,
  },
  {
    name: "Hannah Garcia",
    review: "Beautiful property with great potential. Needed some minor cleaning before move-in but worth it. The large balcony was a major selling point for us.",
    rating: 4,
  },
  {
    name: "William Chen",
    review: "Absolutely love our new place! The building amenities are top-notch and the unit is perfectly sized for us. Great value in this location.",
    rating: 5,
  },
  {
    name: "Zoe Miller",
    review: "This rental exceeded our expectations. The natural light throughout the day is wonderful, and the layout is perfect for our family.",
    rating: 4,
  },
  {
    name: "Jamal Washington",
    review: "Had some reservations about the neighborhood at first, but it's been wonderful. The rental unit itself is exactly what we were looking for.",
    rating: 4,
  },
  {
    name: "Olivia Brown",
    review: "The property was not as well-maintained as the photos suggested. The property manager helped address some issues, which improved the situation.",
    rating: 2,
  },
  {
    name: "Alexander Davis",
    review: "Perfect rental for our family. The school district is excellent and the community is welcoming. We're very satisfied with our choice.",
    rating: 5,
  },
  {
    name: "Grace Wilson",
    review: "The unique architecture of this apartment is what sold us. It's stylish yet comfortable and we feel lucky to call it home for now.",
    rating: 5,
  },
  {
    name: "Samuel Lee",
    review: "Good property overall, but we've had some issues with the HVAC system. Landlord has been responsive in sending maintenance staff to fix it.",
    rating: 3,
  },
  {
    name: "Natalie Martin",
    review: "We were looking for a smaller place and this rental perfectly met our needs. The amenities nearby are convenient and the property is easy to maintain.",
    rating: 4,
  },
];

function getRandomSubset<T>(
  array: T[],
  minItems: number,
  maxItems: number
): T[] {
  if (minItems > maxItems) {
    throw new Error("minItems cannot be greater than maxItems");
  }
  if (minItems < 0 || maxItems > array.length) {
    throw new Error(
      "minItems or maxItems are out of valid range for the array"
    );
  }

  // Generate a random size for the subset within the range [minItems, maxItems]
  const subsetSize =
    Math.floor(Math.random() * (maxItems - minItems + 1)) + minItems;

  // Create a copy of the array to avoid modifying the original
  const arrayCopy = [...array];

  // Shuffle the array copy using Fisher-Yates algorithm
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[randomIndex]] = [
      arrayCopy[randomIndex],
      arrayCopy[i],
    ];
  }

  // Return the first `subsetSize` elements of the shuffled array
  return arrayCopy.slice(0, subsetSize);
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function seed() {
  try {
    // Clear existing data from all collections
    for (const key in COLLECTIONS) {
      const collectionId = COLLECTIONS[key as keyof typeof COLLECTIONS];
      const documents = await databases.listDocuments(
        config.databaseId!,
        collectionId!
      );
      for (const doc of documents.documents) {
        await databases.deleteDocument(
          config.databaseId!,
          collectionId!,
          doc.$id
        );
      }
    }

    console.log("Cleared all existing data.");

    // Seed Agents
    const agents = [];
    for (let i = 0; i < agentData.length; i++) {
      const agent = await databases.createDocument(
        config.databaseId!,
        COLLECTIONS.AGENT!,
        ID.unique(),
        {
          name: agentData[i].name,
          email: agentData[i].email,
          avatar: agentImages[i % agentImages.length], // Ensure each agent gets a unique avatar if possible
        }
      );
      agents.push(agent);
    }
    console.log(`Seeded ${agents.length} agents.`);

    // Seed Reviews
    const reviews = [];
    for (let i = 0; i < reviewerData.length; i++) {
      const review = await databases.createDocument(
        config.databaseId!,
        COLLECTIONS.REVIEWS!,
        ID.unique(),
        {
          name: reviewerData[i].name,
          avatar: reviewImages[i % reviewImages.length],
          review: reviewerData[i].review,
          rating: reviewerData[i].rating
        }
      );
      reviews.push(review);
    }
    console.log(`Seeded ${reviews.length} reviews.`);

    // Seed Galleries - ensure we have enough gallery images
    const galleries = [];
    for (const image of galleryImages) {
      const gallery = await databases.createDocument(
        config.databaseId!,
        COLLECTIONS.GALLERY!,
        ID.unique(),
        { image }
      );
      galleries.push(gallery);
    }
    console.log(`Seeded ${galleries.length} galleries.`);

    // Seed Properties
    for (let i = 0; i < propertyData.length; i++) {
      const propertyInfo = propertyData[i];
      
      // Ensure even distribution of agents
      const assignedAgent = agents[i % agents.length];

      // Ensure each property has a good number of reviews
      const assignedReviews = getRandomSubset(reviews, 5, Math.min(8, reviews.length));
      
      // Ensure each property has multiple gallery images
      const assignedGalleries = getRandomSubset(galleries, 5, Math.min(10, galleries.length));
      
      // Ensure each property has a reasonable number of facilities
      const selectedFacilities = getRandomSubset(facilities, 3, 6);

      // Ensure each property has a main image
      const image = i < propertiesImages.length
        ? propertiesImages[i]
        : propertiesImages[i % propertiesImages.length];

      // Generate property price and area within the defined ranges
      const propertyPrice = propertyInfo.price;
      
      const propertyArea = propertyInfo.area;

      // Create the property with all the assigned data
      const property = await databases.createDocument(
        config.databaseId!,
        COLLECTIONS.PROPERTY!,
        ID.unique(),
        {
          name: propertyInfo.name,
          type: propertyInfo.type,
          description: propertyInfo.description,
          address: propertyInfo.address,
          geolocation: `${44 + Math.random() * 10}, ${-122 - Math.random() * 10}`, // Realistic geolocation
          price: propertyPrice,
          area: propertyArea,
          bedrooms: propertyInfo.bedrooms,
          bathrooms: propertyInfo.bathrooms,
          rating: getRandomNumber(3, 5), // Property ratings between 3-5
          facilities: selectedFacilities,
          image: image,
          agent: assignedAgent.$id,
          reviews: assignedReviews.map((review) => review.$id),
          gallery: assignedGalleries.map((gallery) => gallery.$id),
        }
      );

      console.log(`Seeded property: ${property.name}`);
    }

    console.log("Data seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

export default seed;
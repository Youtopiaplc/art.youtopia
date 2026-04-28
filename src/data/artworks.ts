// No imports needed — using direct paths to public/images/

export type Orientation = "PORTRAIT" | "LANDSCAPE";
export type Category =
  | "Portraits"
  | "Landscapes"
  | "Mixed Media"
  | "Commissioned";
export type ArtworkStatus = "Available" | "Sold" | "Reserved" | "Archived";

export interface Artwork {
  id: string;
  number: number;
  title: string;
  year: string;
  medium: string;
  size: string;
  description: string;
  image: string;
  orientation: Orientation;
  category: Category;
  collection?: string;
  status: ArtworkStatus;
  price: string;
  printEdition?: string;
  secondaryImages?: string[];
}

export const artworks: Artwork[] = [
  {
    id: "falling",
    number: 1,
    title: "Falling",
    year: "",
    medium: "Acrylic on Canvas",
    size: "",
    description: "",
    image: "/images/falling.JPG",
    orientation: "PORTRAIT",
    category: "Portraits",
    collection: "Inner States",
    status: "Available",
    price: "$2,900 USD",
    printEdition: "10 prints",
  },
  {
    id: "framed-narrative",
    number: 2,
    title: "Framed Narrative",
    year: "2022",
    medium: "Acrylic on Canvas",
    size: "60 x 80 cm",
    description:
      "A geometric exploration of the architecture of storytelling and the layers of human history. In this work, narration is not treated as a linear path, but as a series of nested structures, frames within frames, that protect and preserve a central truth. The bold, sharp edged forms and high contrast palette of ochre and crimson evoke the feeling of ancient blueprints or sacred glyphs. Each geometric portal represents a different perspective or a different generation's version of a story. By abstracting the human presence into these solid, unwavering shapes, Framed Narrative interrogates how we house our memories and how the frame we choose to look through ultimately defines the story we see.",
    image: "/images/Framed Narrative.JPG",
    orientation: "LANDSCAPE",
    category: "Landscapes",
    collection: "Geometry of Memory",
    status: "Available",
    price: "$100 USD",
    printEdition: "10 prints",
  },
  {
    id: "exhaust",
    number: 3,
    title: "Exhaust",
    year: "2020",
    medium: "Acrylic and Charcoal on Canvas",
    size: "41 x 58 cm",
    description:
      "A visceral study of the final stages of burnout. Through a heavy integration of charcoal and acrylic, the work captures the gritty, tactile reality of emotional and physical depletion. The smudged, dark tones of the charcoal represent the residue of a spirit pushed beyond its limits, a visual manifestation of the smoke left behind when the internal fire has finally gone out.",
    image: "/images/Exhaust.JPG",
    orientation: "PORTRAIT",
    category: "Portraits",
    collection: "Inner States",
    status: "Sold",
    price: "$100 USD",
    printEdition: "10 prints",
  },
  {
    id: "snoring",
    number: 4,
    title: "Snoring",
    year: "2021",
    medium: "Acrylic on Canvas",
    size: "",
    description: "",
    image: "/images/Snoring.JPG",
    orientation: "PORTRAIT",
    category: "Portraits",
    collection: "Inner States",
    status: "Available",
    price: "$1,800 USD",
    printEdition: "10 prints",
  },
  {
    id: "the-unasked-arrival",
    number: 5,
    title: "The Unasked Arrival",
    year: "",
    medium: "Mixed Media",
    size: "",
    description:
      "A profound interrogation of existential consent. This work explores the unsettling realization that human existence is a journey we are forced to take without our choosing. It poses the ultimate what if: what if we had the agency to decline our own birth. Through a layering of materials, the piece captures the weight of being cast into reality, questioning the fundamental nature of a life that was never requested.",
    image: "/images/The Unasked Arrival.JPG",
    orientation: "PORTRAIT",
    category: "Mixed Media",
    collection: "Geometry of Memory",
    status: "Reserved",
    price: "$2,400 USD",
    printEdition: "10 prints",
  },
  {
    id: "ethiopian-coffee-ceremony",
    number: 6,
    title: "Ethiopian Coffee Ceremony",
    year: "2024",
    medium: "Acrylic on Canvas",
    size: "50 x 50 cm",
    description:
      "A tribute to the sacred ritual of the Ethiopian coffee ceremony. The composition centers a luminous figure in white, pouring rich coffee in a ceremonial gesture that has been repeated for generations. The work celebrates community, hospitality, and the slow, patient rhythms that bind a people together over a single shared cup.",
    image: "/images/Ethiopian coffee ceremony.JPG",
    orientation: "PORTRAIT",
    category: "Portraits",
    collection: "Ethiopian Reverie",
    status: "Available",
    price: "$2,200 USD",
    printEdition: "10 prints",
  },
  {
    id: "adrift",
    number: 7,
    title: "Adrift",
    year: "2022",
    medium: "Acrylic on Canvas",
    size: "40 x 60 cm",
    description:
      "A striking exploration of surrender and weightlessness. The composition focuses on a pair of weathered feet suspended in a vibrant, swirling expanse of water. While the water moves with a chaotic, rhythmic energy in shades of blue and gold, the feet remain still, caught in a moment of absolute release. It is a visual meditation on letting go and allowing oneself to be carried by the currents of life, finding a rare peace in the act of simply floating.",
    image: "/images/Adrift.JPG",
    orientation: "PORTRAIT",
    category: "Portraits",
    collection: "Mixed Reflections",
    status: "Available",
    price: "$1,950 USD",
    printEdition: "10 prints",
  },
  {
    id: "flawed-beauty",
    number: 8,
    title: "Flawed Beauty",
    year: "2020",
    medium: "Acrylic on Canvas",
    size: "30 x 40 cm",
    description:
      "A raw, vertical study of the duality inherent in the female experience. This portrait dissects a single life into two opposing realities: the vibrant, golden facade of a smile and the cold, blue depths of internal struggle. The central boundary serves as a psychic fault line, exploring the tension between the version of ourselves we offer to the world and the shadow self we carry in private. It is a celebration of the flaw, the essential human complexity that makes a person whole.",
    image: "/images/Flawed Beauty.JPG",
    orientation: "PORTRAIT",
    category: "Portraits",
    collection: "Inner States",
    status: "Reserved",
    price: "$1,200 USD",
    printEdition: "10 prints",
  },
  {
    id: "holding-the-left-ones",
    number: 9,
    title: "Holding the Left Ones",
    year: "",
    medium: "Acrylic on Canvas",
    size: "",
    description:
      "A study of the forsaken and the architecture of loneliness. This piece shifts the gaze toward those who stay, exploring the depth of their isolation and their refusal to be erased. It challenges the viewer to acknowledge the presence of those we often overlook, manifesting the deep seated human instinct to seek companionship over the cold reality of being left behind.",
    image: "/images/Holding the Left Ones.JPG",
    orientation: "PORTRAIT",
    category: "Portraits",
    collection: "Inner States",
    status: "Sold",
    price: "$1,600 USD",
    printEdition: "10 prints",
  },
  {
    id: "untitled-10",
    number: 10,
    title: "Untitled",
    year: "2024",
    medium: "Acrylic on Canvas",
    size: "30 x 40 cm",
    description:
      "A haunting portrait emerging from a stained, blood toned ground. The figure is half formed, half consumed, suggesting a soul caught in the act of becoming or dissolving. Untitled by intention, the work invites the viewer to project their own grief, memory, or recognition onto the silent face.",
    image: "/images/10  Title untitled.JPG",
    orientation: "PORTRAIT",
    category: "Portraits",
    collection: "Geometry of Memory",
    status: "Available",
    price: "$1,100 USD",
    printEdition: "10 prints",
  },
  {
    id: "untitled-11",
    number: 11,
    title: "Untitled (Freedom / No Trespassing)",
    year: "2023-2024",
    medium: "Acrylic on Canvas Board",
    size: "Dimensions Variable",
    description:
      "A confrontational mixed canvas piece that pairs the word FREEDOM crowning a raised figure with a bloodied NO TRESPASSING placard at its feet. The contradiction lays bare the violence of a freedom that comes with conditions, the lines drawn around bodies and the borders drawn around hope.",
    image: "/images/11.untitled.png",
    orientation: "PORTRAIT",
    category: "Mixed Media",
    collection: "Mixed Reflections",
    status: "Available",
    price: "$3,500 USD",
    printEdition: "10 prints",
  },
  {
    id: "longevity",
    number: 12,
    title: "Longevity",
    year: "2014 to 2022",
    medium: "Acrylic on Canvas",
    size: "",
    description:
      "An intense psychological study of the endurance required to survive the routine trap of modern existence. The figure is fragmented into horizontal strata, representing the repetitive cycles of a life lived in motion yet going nowhere. The duality of the human spirit is captured in the eyes: one eye is clouded with the heavy fog of exhaustion and fear, while the other remains sharp, piercing the viewer with a defiant question of why or when will this end. Below, the muscular, weathered feet are rooted in a state of perpetual forward motion, suggesting a soul that continues to walk long after it has been spiritually depleted. Longevity is not a celebration of time, but a meditation on the heavy toll of simply lasting.",
    image: "/images/Longevity.JPG",
    orientation: "PORTRAIT",
    category: "Portraits",
    collection: "Inner States",
    status: "Available",
    price: "$2,800 USD",
    printEdition: "10 prints",
  },
  {
    id: "untitled-13",
    number: 13,
    title: "Untitled (Mosaic Forest)",
    year: "2023",
    medium: "Oil and Acrylic on Canvas",
    size: "30 x 100 cm",
    description:
      "A horizontal landscape that fractures the natural world into a luminous mosaic. The lone tree stands as a still vertical anchor while the surrounding foliage erupts into shards of green, ochre and crimson, like stained glass lit from behind. It is a meditation on how the eye assembles wholeness from fragments.",
    image: "/images/13  title untitled.JPG",
    orientation: "LANDSCAPE",
    category: "Landscapes",
    collection: "Ethiopian Reverie",
    status: "Sold",
    price: "$2,400 USD",
    printEdition: "10 prints",
  },
  {
    id: "untitled-14",
    number: 14,
    title: "Untitled (Inherit Light)",
    year: "2023",
    medium: "Acrylic on Canvas",
    size: "70 x 120 cm",
    description:
      "A visceral exploration of the contrast between the external shell and the internal essence. The composition is framed by a dark, fractured boundary, reminiscent of cooling volcanic rock or parched earth, which yields to a radiant, liquid interior. At the center, a silhouetted figure cradles a glowing, golden orb, suggesting a hidden source of warmth and vitality protected by a harsh exterior. By leaving this work untitled, the artist invites the viewer to step into the void and name what they find inside.",
    image: "/images/14.Untitled.JPG",
    orientation: "PORTRAIT",
    category: "Portraits",
    collection: "Inner States",
    status: "Available",
    price: "$4,200 USD",
    printEdition: "10 prints",
  },
  {
    id: "hinged-to-the-ghost",
    number: 15,
    title: "Hinged to the Ghost",
    year: "",
    medium: "Mixed Media",
    size: "",
    description:
      "This mixed media piece examines the psychological stuckness of the human condition. It portrays the tragedy of those who define themselves so deeply through their struggle that they cannot survive the peace that follows. Like a retired worker who passes away shortly after leaving their post, the figure here is a ghost of effort, still physically connected to a mechanism that no longer moves. It is a study of memory and penance, an acknowledgment that while others may forgive us, the hinge that ties us to our past does not always release.",
    image: "/images/Hinged to the Ghost.png",
    orientation: "PORTRAIT",
    category: "Mixed Media",
    collection: "Mixed Reflections",
    status: "Available",
    price: "$3,600 USD",
    printEdition: "10 prints",
  },
  {
    id: "eight-decades",
    number: 16,
    title:
      "Eight Decades of Elevation: A Legacy of Family, More Than a Company",
    year: "2026",
    medium: "Acrylic on Canvas",
    size: "150 x 160 cm",
    description:
      "A monumental work commissioned to celebrate the 80th anniversary of Ethiopian Airlines. The composition centers on a powerful, joyful father figure, representing the strength and reliability of the carrier, lifting a child onto his shoulders. The child's arms reach out in an expansive gesture of freedom and potential, spanning the horizon. Framing this central bond are four symbolic portals into the airline's soul: The Visionary, representing strategic leadership; The Foundation, a tribute to the dedicated employees; The Fleet, honoring the aircraft that bridge the world; and The Journey, dedicated to the passengers who are the heart of every flight. While the surrounding brushwork suggests the complexities of aviation, from shifting weather to global economics, the central figures embody a simple, tireless promise: to carry the next generation further than they ever imagined possible.",
    image: "/images/eight-decades.JPG",
    orientation: "PORTRAIT",
    category: "Commissioned",
    collection: "Ethiopian Reverie",
    status: "Archived",
    price: "N/A (Commissioned)",
    printEdition: "10 prints",
  },
  {
    id: "vertical-silence",
    number: 17,
    title: "Vertical Silence",
    year: "",
    medium: "Acrylic on Canvas",
    size: "",
    description:
      "An immersive study of the forest from a perspective of total surrender. By looking directly upward from the forest floor, the artist captures the rhythmic crown shyness of the trees, the delicate, glowing channels of sky that weave between the branches. The work is a visual manifestation of a calm that words cannot fully reach; it is the feeling of being small beneath a grand, natural architecture that is constantly reaching for the light.",
    image: "/images/Vertical Silence.JPG",
    orientation: "LANDSCAPE",
    category: "Landscapes",
    collection: "Ethiopian Reverie",
    status: "Available",
    price: "3,400 birr",
    printEdition: "10 prints",
  },
  {
    id: "untitled-18",
    number: 18,
    title: "Untitled (The Watcher)",
    year: "2024",
    medium: "Acrylic on Canvas",
    size: "52 x 92 cm",
    description:
      "A solitary figure emerges from a wall of darkness, the face glowing in molten oranges and yellows above a draped robe. The work radiates the quiet authority of an elder or a witness, someone who has seen much and carries it without speaking.",
    image: "/images/18  title untitled.JPG",
    orientation: "PORTRAIT",
    category: "Portraits",
    collection: "Geometry of Memory",
    status: "Available",
    price: "$2,600 USD",
    printEdition: "10 prints",
  },
  {
    id: "dream-and-daily-routine",
    number: 19,
    title: "Dream and Daily Routine",
    year: "2022",
    medium: "Acrylic on Canvas",
    size: "Dimensions Variable",
    description:
      "An exploration of reverse deja vu, the experience of daily reality manifesting within the dream state, rather than a dream predicting the future. The work fans outward like a fragmented memory board, tiny dancing figures at the top giving way to spiraling fingerprints, blank screens, and a crowd at the bottom marching toward an unknown horizon.",
    image: "/images/Dream and Daily Routine.png",
    orientation: "LANDSCAPE",
    category: "Mixed Media",
    collection: "Mixed Reflections",
    status: "Available",
    price: "$3,800 USD",
    printEdition: "10 prints",
  },
  {
    id: "indecisive",
    number: 20,
    title: "Indecisive",
    year: "",
    medium: "Acrylic on Canvas",
    size: "",
    description:
      "This piece reflects the weight of unanswered questions and the shifting nature of the self. Using the motif of bubble heads, it illustrates the fragile transition between states of mind; as one identity bursts like a soap bubble, another immediately takes its place, highlighting the perpetual cycle of internal indecision.",
    image: "/images/Indecisive.png",
    orientation: "PORTRAIT",
    category: "Portraits",
    collection: "Inner States",
    status: "Available",
    price: "$2,200 USD",
    printEdition: "10 prints",
  },
  {
    id: "unfolding-battle",
    number: 21,
    title: "Unfolding Battle",
    year: "",
    medium: "Acrylic on Canvas",
    size: "",
    description:
      "Set against a shared horizon, this work depicts a fundamental struggle between two groups bound by the same environment but divided by their vision. It examines the tragedy of shared space without shared understanding. The conflict unfolds not over resources, but through the lens of perspective, illustrating how the simple act of seeing can become a site of profound disagreement.",
    image: "/images/Unfolding Battle.JPG",
    orientation: "LANDSCAPE",
    category: "Landscapes",
    collection: "Geometry of Memory",
    status: "Available",
    price: "$5,500 USD",
    printEdition: "10 prints",
  },
  {
    id: "yearning",
    number: 22,
    title: "Yearning",
    year: "",
    medium: "Acrylic on Canvas",
    size: "",
    description:
      "This work is born from a single day spent in confinement, an experience that revealed a heartbreaking cycle of hope and disillusionment. I watched as prisoners crowded toward tiny windows, desperate for a glimpse of the outside. But when I stood where they stood, I saw no horizon, only another wall, another barred door, a cell within a cell. Yearning is a meditation on that moment of profound disappointment.",
    image: "/images/Yearning.JPG",
    orientation: "PORTRAIT",
    category: "Portraits",
    collection: "Inner States",
    status: "Available",
    price: "$4,800 USD",
    printEdition: "10 prints",
  },
  {
    id: "after",
    number: 23,
    title: "After",
    year: "2023-2024",
    medium: "Acrylic on Canvas",
    size: "90 x 120 cm",
    description:
      "Whether it is the historical trauma of a nation or the private struggle of an addiction, the end of colonization is not the end of the conflict. This piece explores the paralyzing after, the moment when the chains are gone, but the mind remains occupied. It captures the disorientation of a person who is full of color and potential, yet held back by the gray weight of their own thoughts. They are free, but they are lost; their vision is boxed in by the very structures that once contained them.",
    image: "/images/After.JPG",
    orientation: "PORTRAIT",
    category: "Portraits",
    collection: "Inner States",
    status: "Available",
    price: "$4,500 USD",
    printEdition: "10 prints",
  },
  {
    id: "demanding",
    number: 24,
    title: "Demanding",
    year: "2023-2024",
    medium: "Acrylic on Canvas",
    size: "70 x 120 cm",
    description:
      "This work is a critique of the human ego and its refusal to yield to reality. Inspired by observations in my own community, Demanding portrays the paradox of those who remain trapped in a cycle of stagnation and hunger, yet insist on being treated with the highest reverence. The figure represents a person hollowed out by their circumstances, depressed and physically empty, yet their hand remains outstretched, demanding to be kissed. It explores the unearned respect many claim by clinging to the past while ignoring the reality of their current state. By emphasizing the massive, looming hand against a frail, malnourished body, the painting highlights the absurdity of an ego that continues to demand worship even as the person crumbles.",
    image: "/images/Demanding.JPG",
    orientation: "PORTRAIT",
    category: "Portraits",
    collection: "Geometry of Memory",
    status: "Available",
    price: "$4,200 USD",
    printEdition: "10 prints",
  },
  {
    id: "threshold",
    number: 25,
    title: "Threshold",
    year: "",
    medium: "Acrylic on Canvas",
    size: "",
    description:
      "An exploration of the silent witness, this work depicts a figure peering from behind a threshold, present yet intentionally detached. It examines the boundary between observation and participation. While many rush to speak, this subject remains in the shadows, possessing a depth of knowledge that far exceeds those who occupy the spotlight. The single, focused eye represents a choice: the decision to witness history and human stories without becoming entangled in them, highlighting the quiet power of those who know much but say little.",
    image: "/images/Threshold.JPG",
    orientation: "PORTRAIT",
    category: "Portraits",
    collection: "Geometry of Memory",
    status: "Available",
    price: "$2,500 USD",
    printEdition: "10 prints",
  },
  {
    id: "choosing",
    number: 26,
    title: "Choosing",
    year: "2022",
    medium: "Mixed Media (Clay, Nails, Thread, and Acrylic on Panel)",
    size: "20 x 50 cm",
    description:
      "A visceral exploration of the fractured psyche and the agonizing pressure of indecision. In this mixed media work, a vibrant yellow face is literally split in two, representing the many conflicting versions of a divided mind. A single nail is driven into the center, acting as a painful anchor for a web of red thread that radiates outward like a nervous system or a trap. Choosing captures the sensation of being spiritually pinned by one's own thoughts. The thread creates a cage of entanglement, illustrating how a desperate person can feel constricted by the very paths they are trying to choose. It is a raw, physical manifestation of the internal tension that occurs when a soul is pulled between two worlds, unable to move forward.",
    image: "/images/Choosing.JPG",
    orientation: "PORTRAIT",
    category: "Mixed Media",
    collection: "Mixed Reflections",
    status: "Sold",
    price: "$3,200 USD",
    secondaryImages: ["/images/Choosing2.png"],
    printEdition: "10 prints",
  },
  {
    id: "the-carrying-mind",
    number: 27,
    title: "The Carrying Mind",
    year: "",
    medium: "Acrylic on Canvas",
    size: "",
    description: "",
    image: "/images/The Carrying Mind.jpg",
    orientation: "PORTRAIT",
    category: "Portraits",
    collection: "Inner States",
    status: "Available",
    price: "$8,500 USD",
  },
];

export interface ArtistProfile {
  name: string;
  born: string;
  bio: string[];
  email: string;
  phone: string;
  location: string;
  social: {
    instagram: string;
    facebook: string;
    behance: string;
  };
  image: string;
}

export const defaultArtist: ArtistProfile = {
  name: "Mikiyas Assefa",
  born: "Born in Addis Ababa, 1992",
  bio: [
    "Mikiyas Assefa's artistic journey began in the shadow of the lens, growing up as the son of a photographer. This early exposure to framing, light, and the captured moment sparked a lifelong obsession with how we see the world.",
    "Though a self taught artist with no formal training, Mikiyas has spent over a decade cultivating a deeply philosophical and visceral style. By day, he serves as a professional Aircraft Technician, a role defined by mechanical precision and the weight of engineering. By night, he retreats to his canvas to explore a different kind of structure: the architecture of the human soul.",
    "His work is a study in contrasts. From the massive, agonizing isolation of his sculptures and psychological portraits, Mikiyas interrogates the internal colonization of the mind. He explores themes of existential consent, the split nature of identity, and the lingering shadows left behind by trauma and routine.",
    "Mikiyas's art does not just show a face; it shows the boxed in gaze of the prisoner and the weightless journey of the spirit. He is an artist of the breath time, finding in every spare moment a way to translate the heavy, silent experiences of life into a vibrant, visual language.",
  ],
  email: "mikiyas.assefa@example.com",
  phone: "+251 911 000 000",
  location: "Addis Ababa, Ethiopia",
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    behance: "https://behance.net/",
  },
  image: "/images/miki.jpg",
};

// Export artistImage for components that need it
export const artistImage = defaultArtist.image;

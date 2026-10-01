/* ─────────────────────────────────────────────────────────────
   RESCO STAR — site content
   All imagery in /public/gallery and /public/video is real
   project photography from the Resco Star workshop and Dubai
   sites (web-optimised copies of /public/IMAGES).
   ───────────────────────────────────────────────────────────── */

export const siteMeta = {
  name: 'Resco Star',
  fullName: 'Resco Star Interiors Works LLC',
  tagline: 'Joinery · Furniture · Fit-Out',
  description:
    'A Dubai design-and-build joinery studio. We design, manufacture and install bespoke walk-in wardrobes, media walls, kitchens and custom furniture — then deliver the complete interior fit-out from concept to handover.',
  headquarters: 'Dubai, United Arab Emirates',
  hours: { days: 'Sat — Thu', time: '08:00 — 18:00' },
  mapUrl: 'https://maps.google.com/?q=Dubai+Investment+Park,+Dubai',
  coords: "24°59'N 55°10'E",
  offices: [
    {
      city: 'Workshop & Head Office',
      address: 'Dubai Investment Park (DIP), Dubai, UAE',
      phone: '+971 4 345 8890',
      email: 'info@rescostarinteriors.ae',
    },
    {
      city: 'Design Studio',
      address: 'Business Bay, Dubai, UAE',
      phone: '+971 50 123 4567',
      email: 'projects@rescostarinteriors.ae',
    },
  ],
  whatsappNumbers: [
    { label: 'Project enquiries', number: '971501234567' },
    { label: 'General enquiries', number: '' },
  ],
  whatsappMessage: 'Hello Resco Star, I would like to discuss a joinery / interior project in Dubai.',
  social: [
    { label: 'Instagram', href: 'https://instagram.com', short: 'IG' },
    { label: 'Facebook', href: 'https://facebook.com', short: 'FB' },
    { label: 'LinkedIn', href: 'https://linkedin.com', short: 'IN' },
  ],
};

export const navLinks = [
  { label: 'Home', href: '#top' },
  { label: 'Studio', href: '#studio' },
  { label: 'Services', href: '#services' },
  { label: 'Our Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Why Us', href: '#why' },
  { label: 'Contact', href: '#contact' },
];

export function whatsappUrl(message, number) {
  const text = message || siteMeta.whatsappMessage;
  const targetNumber = number || siteMeta.whatsappNumbers.find((item) => item.number)?.number || '';
  return `https://wa.me/${targetNumber}?text=${encodeURIComponent(text)}`;
}

/* ── HERO (Aurora-style overlay + living-room carousel) ───── */
export const heroContent = {
  title: 'Resco Star — bespoke joinery, custom furniture and interior fit-out in Dubai',
  headline: ['Crafted for living', 'Made in Dubai'],
  subhead:
    'We design, manufacture and install walk-in wardrobes, media walls and complete interiors from our own workshop in Dubai.',
  interval: 6500,
  proof: {
    value: '85+',
    label: 'Happy Clients',
    faces: [
      '/gallery/walkin-curved-04-sm.jpg',
      '/gallery/bedroom-01-sm.jpg',
      '/gallery/media-wall-02-sm.jpg',
      '/gallery/furniture-02-sm.jpg',
    ],
  },
  slides: [
    {
      src: '/hero-bg.png',
      alt: 'Double-height penthouse lounge with millwork, marble and the Dubai skyline',
      title: 'Skyline Penthouse Lounge',
      place: 'Downtown · Dubai',
      blurb: 'A refined living space where millwork, marble and the Dubai skyline meet.',
    },
    {
      src: '/proj-living-room.png',
      alt: 'Bright oak living room with sectional sofa and a built-in media wall',
      title: 'Haven Residence',
      place: 'Marina · Dubai',
      blurb: 'A refined living space where minimalism meets warmth and functionality.',
    },
    {
      src: '/hero/media.png',
      alt: 'Taupe panelled living room media wall with floating walnut console',
      title: 'Panelled Media Wall',
      place: 'Villa · Dubai',
      blurb: 'Warm panelling, a floating walnut console and lighting designed for evening living.',
    },
  ],
};

/* ── WORK STAGE (Noozi-style tilted graphic cards) ─────────── */
export const workShowcase = {
  ghost: 'Work',
  kicker: 'Selected projects',
  cta: 'Check out our work',
  interval: 4200,
  cards: [
    { src: '/gallery/walkin-curved-01.jpg', title: 'Walk-in wardrobes', rotate: -11 },
    { src: '/hero/media.png', title: 'Media walls', rotate: 5 },
    { src: '/hero/furniture.png', title: 'Custom furniture', rotate: 12 },
    { src: '/work/dining.png', title: 'Dining collection', rotate: -4 },
    { src: '/hero/corridor.png', title: 'Oak corridors', rotate: 8 },
    { src: '/hero/bedroom.png', title: 'Bedroom joinery', rotate: -8 },
  ],
};

/* ── TRUST STRIP ───────────────────────────────────────────── */
export const trustItems = [
  'Dubai Municipality',
  'Civil Defence Compliant',
  'DEWA Partners',
  'DIP Workshop',
  'Italian Hardware',
  'Villas · Penthouses · Offices',
  'Design → Make → Install',
  'Snag-Free Handover',
];

/* ── MANIFESTO (Ojas-style cinematic statement) ────────────── */
export const manifesto = {
  small: 'Resco Star',
  lineA: 'Made by hand',
  caps: 'In our own Dubai workshop',
  lineB: 'Built to last',
  copy: 'A design-and-build joinery studio where the people who draw the wardrobe also cut the veneer, wire the light and hang the last door.',
  image: '/gallery/corridor-01.jpg',
};

/* ── STUDIO / ABOUT ────────────────────────────────────────── */
export const studioContent = {
  kicker: 'The studio',
  headline: ['Design, factory', 'and site —', 'one team.'],
  copy: [
    'Resco Star Interiors Works LLC is a Dubai-based design-and-build joinery company. Nothing is outsourced: concept, 3D, manufacturing and installation all happen under one roof in Dubai Investment Park.',
    'Our work lives in private villas, penthouses and family homes across Dubai, as well as boutique offices and majlis lounges. Light oak, walnut, fluted panels, curved carcasses and integrated lighting are our signature language.',
  ],
  imageA: '/gallery/walkin-curved-03.jpg',
  imageB: '/gallery/furniture-01.jpg',
  imageC: '/gallery/workshop-shelving.jpg',
};

export const statsData = [
  { value: 85, suffix: '+', label: 'Projects delivered' },
  { value: 100, suffix: '%', label: 'Made in our workshop' },
  { value: 6, suffix: '', label: 'Joinery disciplines' },
  { value: 24, suffix: 'h', label: 'Enquiry response' },
];

/* ── SERVICES (Noozi-style numbered grid) ──────────────────── */
export const servicesData = [
  {
    id: 'wardrobes',
    number: '01',
    icon: 'wardrobe',
    title: 'Walk-In Wardrobes',
    short: 'Curved and linear dressing rooms with integrated LED, drawer banks and glass display.',
    desc:
      'Fully bespoke walk-in wardrobes designed around how you dress. Curved oak carcasses, open hanging bays, illuminated shelving, soft-close drawers and mirrored display niches — all manufactured in our DIP workshop.',
    image: '/gallery/walkin-curved-02.jpg',
    meta: '4 – 6 weeks',
    points: ['Curved & linear carcasses', 'Integrated LED profiles', 'Italian soft-close hardware', 'Veneer, lacquer or laminate'],
  },
  {
    id: 'media-walls',
    number: '02',
    icon: 'tv',
    title: 'Media Walls & Panelling',
    short: 'TV feature walls, fluted panels, backlit onyx and floating consoles.',
    desc:
      'Living-room and majlis feature walls that hide every cable. Fluted timber, leather-look panels, backlit onyx niches, floating walnut consoles and concealed storage — engineered to millimetre tolerances.',
    image: '/gallery/media-wall-01.jpg',
    meta: '3 – 5 weeks',
    points: ['Cable-free TV walls', 'Backlit onyx & stone', 'Fluted & slatted panels', 'Floating consoles'],
  },
  {
    id: 'bedroom',
    number: '03',
    icon: 'bed',
    title: 'Bedroom Joinery',
    short: 'Fitted wardrobes, arched niches, vanities and headboard walls.',
    desc:
      'Fitted wardrobes with handle-less doors, arched TV niches, dressing tables and headboard walls made as one continuous composition — installed with perfect shadow gaps against your ceiling and floor.',
    image: '/gallery/bedroom-03.jpg',
    meta: '3 – 5 weeks',
    points: ['Handle-less push doors', 'Arched display niches', 'Headboard & vanity units', 'Shadow-gap installation'],
  },
  {
    id: 'furniture',
    number: '04',
    icon: 'chair',
    title: 'Custom Furniture',
    short: 'Sculptural chairs, curved dining tables, consoles and upholstery.',
    desc:
      'One-off statement furniture: sculptural walnut chairs, curved white dining sets, radius-edge consoles and upholstered benches. Each piece is prototyped in our workshop before final production.',
    image: '/gallery/furniture-02.jpg',
    meta: '4 – 8 weeks',
    points: ['Solid wood & veneer', 'CNC-shaped forms', 'In-house upholstery', 'Prototype before production'],
  },
  {
    id: 'kitchens',
    number: '05',
    icon: 'kitchen',
    title: 'Kitchens & Vanities',
    short: 'Kitchen cabinetry, laundry cupboards and stone-topped vanities.',
    desc:
      'Practical joinery that still looks like furniture: kitchen cabinetry, laundry and utility cupboards built around your appliances, and stone-topped bathroom vanities with concealed storage.',
    image: '/gallery/laundry-01.jpg',
    meta: '3 – 6 weeks',
    points: ['Appliance-integrated design', 'Moisture-resistant boards', 'Stone & quartz tops', 'Concealed storage'],
  },
  {
    id: 'fitout',
    number: '06',
    icon: 'building',
    title: 'Turnkey Fit-Out',
    short: 'Design, approvals, MEP, ceilings, flooring and joinery under one contract.',
    desc:
      'For complete villa, apartment or office interiors we manage the whole project: concept and 3D, authority approvals, gypsum ceilings, flooring, MEP coordination and all joinery — delivered snag-free with a single point of contact.',
    image: '/gallery/site-fitout-01.jpg',
    meta: '8 – 16 weeks',
    points: ['Concept & 3D visuals', 'DM / DCD approvals', 'Ceilings, flooring & MEP', 'Single point of contact'],
  },
];

/* ── PROJECTS (Noozi-style numbered index) ─────────────────── */
export const projectFilters = ['All', 'Wardrobes', 'Media Walls', 'Bedrooms', 'Furniture', 'Fit-Out'];

export const projectsData = [
  {
    id: 'curved-walk-in',
    title: 'Curved Walk-In Dressing Suite',
    category: 'Wardrobes',
    location: 'Private Villa · Dubai',
    year: '2026',
    size: 'large',
    cover: '/gallery/walkin-curved-01.jpg',
    gallery: [
      '/gallery/walkin-curved-01.jpg',
      '/gallery/walkin-curved-02.jpg',
      '/gallery/walkin-curved-03.jpg',
      '/gallery/walkin-curved-04.jpg',
      '/gallery/walkin-curved-05.jpg',
      '/gallery/walkin-curved-06.jpg',
    ],
    description:
      'A full-room dressing suite in light oak veneer with radius-curved end towers, illuminated open shelving, a central drawer island and hanging bays lit by continuous LED profiles. Every carcass was CNC-cut and pre-assembled in our workshop for a two-day site installation.',
    specs: ['Light oak veneer', 'Curved end towers', 'Continuous LED profiles', 'Soft-close drawer banks'],
  },
  {
    id: 'oak-gallery-corridor',
    title: 'Sculpted Oak Gallery Corridor',
    category: 'Wardrobes',
    location: 'Penthouse · Dubai',
    year: '2026',
    size: 'tall',
    cover: '/hero/corridor.png',
    gallery: ['/gallery/corridor-01.jpg', '/gallery/corridor-02.jpg', '/gallery/corridor-03.jpg', '/gallery/corridor-04.jpg', '/gallery/corridor-05.jpg'],
    description:
      'Floor-to-ceiling oak panelling wraps a curved corridor, with recessed, backlit display columns flanking the doorway. Handle-less doors conceal wardrobe storage behind a seamless timber skin.',
    specs: ['Curved oak panelling', 'Backlit display columns', 'Handle-less push doors', 'Seamless ceiling detail'],
  },
  {
    id: 'light-oak-closet',
    title: 'Light Oak Walk-In Closet',
    category: 'Wardrobes',
    location: 'Family Villa · Dubai',
    year: '2026',
    size: 'standard',
    cover: '/gallery/closet-oak-01.jpg',
    gallery: ['/gallery/closet-oak-01.jpg', '/gallery/closet-oak-02.jpg', '/gallery/closet-oak-03.jpg', '/gallery/closet-oak-04.jpg'],
    description:
      'An L-shaped walk-in closet with open shelving, double hanging and a bank of drawers, finished in a pale oak laminate with warm LED shelf lighting for an airy, hotel-like feel.',
    specs: ['Pale oak finish', 'Open shelving & hanging', 'Shelf-edge LED', 'Drawer island'],
  },
  {
    id: 'bedroom-arch',
    title: 'Master Bedroom Wardrobes & Arched Niche',
    category: 'Bedrooms',
    location: 'Villa · Dubai',
    year: '2026',
    size: 'standard',
    cover: '/hero/bedroom.png',
    gallery: ['/gallery/bedroom-03.jpg', '/gallery/bedroom-01.jpg', '/gallery/bedroom-02.jpg', '/gallery/bedroom-04.jpg', '/gallery/bedroom-05.jpg', '/gallery/bedroom-06.jpg'],
    description:
      'A wall of handle-less fitted wardrobes continues into an arched TV niche with open display shelving and a floating console — one uninterrupted composition in light oak.',
    specs: ['Fitted handle-less wardrobes', 'Arched TV niche', 'Floating console', 'Light oak veneer'],
  },
  {
    id: 'walnut-media-wall',
    title: 'Walnut & Panelled Living Room Media Wall',
    category: 'Media Walls',
    location: 'Villa · Dubai',
    year: '2025',
    size: 'wide',
    cover: '/hero/media.png',
    gallery: ['/gallery/media-wall-01.jpg', '/gallery/media-wall-02.jpg', '/gallery/media-wall-03.jpg', '/gallery/media-wall-04.jpg'],
    description:
      'A full-width panelled feature wall in warm taupe with a floating walnut media console and open walnut display shelves — every cable concealed behind the panels.',
    specs: ['Full-width panelling', 'Floating walnut console', 'Concealed cabling', 'Open display shelves'],
  },
  {
    id: 'onyx-majlis',
    title: 'Backlit Onyx Majlis Lounge',
    category: 'Media Walls',
    location: 'Majlis · Dubai',
    year: '2025',
    size: 'standard',
    gallery: ['/gallery/majlis-01.jpg', '/gallery/majlis-02.jpg', '/gallery/majlis-03.jpg', '/gallery/majlis-04.jpg'],
    description:
      'A white classical media wall with illuminated display niches and a glowing backlit onyx fireplace panel, paired with sculptural walnut seating and a crystal chandelier.',
    specs: ['Backlit onyx panel', 'Illuminated niches', 'Classical panel mouldings', 'Sculptural walnut seating'],
  },
  {
    id: 'sculptural-furniture',
    title: 'Sculptural Walnut Furniture',
    category: 'Furniture',
    location: 'Executive Office · Dubai',
    year: '2025',
    size: 'tall',
    cover: '/hero/furniture.png',
    gallery: ['/gallery/furniture-01.jpg', '/gallery/furniture-02.jpg'],
    description:
      'Twisting, ribbed walnut chairs and a matching desk base made from stacked, CNC-cut profiles — a study in flowing timber form for an executive office.',
    specs: ['Stacked walnut profiles', 'CNC-shaped forms', 'Hand-finished oil', 'Glass-top desk'],
  },
  {
    id: 'curved-dining',
    title: 'Curved Dining Collection',
    category: 'Furniture',
    location: 'Apartment · Dubai',
    year: '2026',
    size: 'standard',
    cover: '/work/dining.png',
    gallery: ['/gallery/dining-01.jpg', '/gallery/dining-02.jpg', '/gallery/dining-03.jpg', '/gallery/dining-04.jpg'],
    description:
      'A soft-white oval dining table on sculpted legs with matching curved-back chairs in bouclé and walnut — designed and made for a compact family dining space.',
    specs: ['Oval table, sculpted base', 'Bouclé upholstery', 'Walnut chair legs', 'Matte lacquer finish'],
  },
  {
    id: 'oak-media-unit',
    title: 'Oak Media Unit & Display',
    category: 'Media Walls',
    location: 'Apartment · Dubai',
    year: '2026',
    size: 'standard',
    cover: '/gallery/media-unit-02.jpg',
    gallery: ['/gallery/media-unit-02.jpg', '/gallery/media-unit-01.jpg'],
    description:
      'A wall-hung media composition in light oak with open display towers, a floating drawer console and a panelled back board that hides all wiring.',
    specs: ['Light oak laminate', 'Wall-hung console', 'Display towers', 'Concealed wiring board'],
  },
  {
    id: 'utility-joinery',
    title: 'Utility, Console & Vanity Pieces',
    category: 'Fit-Out',
    location: 'Various · Dubai',
    year: '2025',
    size: 'standard',
    gallery: ['/gallery/laundry-01.jpg', '/gallery/console-01.jpg', '/gallery/console-02.jpg', '/gallery/vanity-01.jpg'],
    description:
      'The practical side of joinery: a laundry cupboard built around stacked machines, a radius-edge storage console and a marble vanity with twin round mirrors.',
    specs: ['Appliance-fit laundry unit', 'Radius-edge console', 'Marble vanity', 'Moisture-resistant boards'],
  },
  {
    id: 'villa-fitout',
    title: 'Villa Fit-Out in Progress',
    category: 'Fit-Out',
    location: 'Villa · Dubai',
    year: '2025',
    size: 'wide',
    gallery: ['/gallery/site-fitout-02.jpg', '/gallery/site-fitout-01.jpg', '/gallery/site-fluted-install.jpg'],
    description:
      'Behind the scenes on a turnkey villa: fitted storage carcasses, fluted wall-panel installation and ceiling works coordinated by our own site team.',
    specs: ['Turnkey coordination', 'Fluted panel install', 'Fitted storage', 'Ceiling & MEP works'],
  },
];

/* ── WORKSHOP BAND (Noozi "WORK" band) ─────────────────────── */
export const workshopContent = {
  ghost: 'Craft',
  kicker: 'Inside the workshop',
  title: ['Drawn in the studio.', 'Cut in our factory.', 'Fitted by the same hands.'],
  copy:
    'Owning our production means no middlemen, no lost details and honest lead times. From raw board to lacquered door, every stage happens under one roof in Dubai Investment Park.',
  cards: [
    { src: '/gallery/workshop-console.jpg', alt: 'Console in production', rotate: -7 },
    { src: '/gallery/workshop-upholstery-01.jpg', alt: 'Upholstery bench', rotate: 3 },
    { src: '/gallery/workshop-shelving.jpg', alt: 'Shelving unit assembly', rotate: 8 },
  ],
  video: '/video/furniture-loop.mp4',
  facts: [
    { value: 'CNC', label: 'Precision cutting' },
    { value: 'In-house', label: 'Veneer & lacquer' },
    { value: 'Own team', label: 'Site installation' },
  ],
};

/* ── PROCESS (Noozi numbered cards) ────────────────────────── */
export const processSteps = [
  {
    number: '01',
    title: 'Consultation',
    subtitle: 'We listen first, then measure everything.',
    detail:
      'A design consultation at your home or office to understand how you live and what you need to store, followed by a precise laser survey of the space.',
    image: '/gallery/site-fitout-01.jpg',
    icon: 'message',
  },
  {
    number: '02',
    title: 'Concept & 3D',
    subtitle: 'See it before we build it.',
    detail:
      'Layouts, elevations and photorealistic 3D renders with real material samples — oak, walnut, lacquer, stone — so every decision is made with confidence.',
    image: '/gallery/bedroom-02.jpg',
    icon: 'cube',
  },
  {
    number: '03',
    title: 'Production',
    subtitle: 'Made in our own Dubai factory.',
    detail:
      'CNC cutting, edge-banding, veneering, lacquering and upholstery all happen in-house at DIP. Pieces are dry-assembled and inspected before they leave.',
    image: '/gallery/workshop-shelving.jpg',
    icon: 'factory',
  },
  {
    number: '04',
    title: 'Installation',
    subtitle: 'Our factory team installs what they built.',
    detail:
      'The same craftsmen who made your joinery install it — scribing to walls, aligning shadow gaps and wiring lighting for a seamless finish.',
    image: '/gallery/site-fluted-install.jpg',
    icon: 'hammer',
  },
  {
    number: '05',
    title: 'Handover',
    subtitle: 'Snag-free, cleaned and ready to use.',
    detail:
      'A joint walk-through, adjustments on the spot, deep clean and handover — with our team a phone call away for aftercare.',
    image: '/gallery/walkin-curved-05.jpg',
    icon: 'key',
  },
];

/* ── WHY US (Ojas sticky cards) ────────────────────────────── */
export const whyUs = [
  {
    number: '01',
    icon: 'layers',
    title: 'One team, start to finish',
    copy:
      'Designer, factory and installer are the same company — so what you approve in 3D is exactly what arrives on site. No hand-offs, no lost details, one accountable point of contact from the first sketch to the final snag list.',
    tone: 'sand',
  },
  {
    number: '02',
    icon: 'factory',
    title: 'Our own workshop in Dubai',
    copy:
      'Local manufacturing in Dubai Investment Park means faster lead times, easier revisions and quality checks at every stage — not just at the end. You are welcome to visit while your joinery is being built.',
    tone: 'cream',
  },
  {
    number: '03',
    icon: 'leaf',
    title: 'Materials chosen by hand',
    copy:
      'Real oak and walnut veneers, Italian soft-close hardware, matte lacquers and stone tops — specified for Dubai humidity and daily family use, and sampled with you before anything is cut.',
    tone: 'sage',
  },
  {
    number: '04',
    icon: 'sparkle',
    title: 'Honest timelines & fixed pricing',
    copy:
      'A clear scope, an itemised quotation and a realistic programme — with progress photos from the workshop while we build, so you always know where your project stands.',
    tone: 'dark',
  },
];

/* ── TESTIMONIALS ──────────────────────────────────────────── */
export const testimonials = [
  {
    quote:
      'The walk-in wardrobe is better than the render. Curved corners, lighting on every shelf, and the installers finished in two days without a mark on the walls.',
    name: 'Villa Owner',
    role: 'Walk-in dressing suite',
    location: 'Dubai Hills',
    image: '/gallery/walkin-curved-04-sm.jpg',
  },
  {
    quote:
      'Resco Star built our whole master bedroom — wardrobes, the arched TV niche and the console. One team, one quotation, no surprises.',
    name: 'Homeowner',
    role: 'Bedroom joinery',
    location: 'Arabian Ranches',
    image: '/gallery/bedroom-01-sm.jpg',
  },
  {
    quote:
      'They hid every cable behind the panelling and the floating walnut console looks like it grew out of the wall. Guests always ask who made it.',
    name: 'Private Client',
    role: 'Living room media wall',
    location: 'Jumeirah',
    image: '/gallery/media-wall-02-sm.jpg',
  },
  {
    quote:
      'The sculptural walnut chairs were a bold idea and they made it real — prototyped first, then finished beautifully. Craftsmanship you can feel.',
    name: 'Managing Director',
    role: 'Executive office furniture',
    location: 'Business Bay',
    image: '/gallery/furniture-02-sm.jpg',
  },
];

/* ── CONTACT ───────────────────────────────────────────────── */
export const contactTypes = ['Walk-in wardrobe', 'Media wall', 'Bedroom joinery', 'Kitchen / vanity', 'Custom furniture', 'Full fit-out'];

export const faqs = [
  { q: 'Do you manufacture in Dubai?', a: 'Yes. All joinery and furniture is produced in our own workshop in Dubai Investment Park and installed by our team.' },
  { q: 'Can you work from my designer’s drawings?', a: 'Absolutely. We regularly manufacture and install for interior designers and contractors, or we can design in-house for you.' },
  { q: 'What is a typical lead time?', a: 'Most wardrobe and media-wall projects take 3–6 weeks from approved drawings to installation. Full fit-outs are programmed individually.' },
];

import { StudioInfo, ServiceItem } from '../types/project';

export const STUDIO_INFO: StudioInfo = {
  name: "SANA ARCHITECTS",
  tagline: "Architecture • Interior • 3D Visualisation",
  address: "51 B, Gandhi Salai, Pattanam Road",
  landmark: "Opp. to Vijayalakshmi Theatre",
  city: "Rasipuram",
  state: "Tamil Nadu",
  pincode: "637408",
  phone: "+91 95854 68266",
  email: "sanaarchitects22@gmail.com",
  leadArchitect: "S. Sakthivel",
  hours: "Monday – Saturday: 9:30 AM – 7:30 PM",
  coordinates: {
    lat: 11.4582,
    lng: 78.1746
  },
  offices: [
    {
      id: "rasipuram-head-office",
      name: "Rasipuram Studio (Head Office)",
      type: "Head Office",
      building: "51 B, Gandhi Salai, Pattanam Road",
      street: "Pattanam Road",
      landmark: "Opp. to Vijayalakshmi Theatre",
      city: "Rasipuram",
      state: "Tamil Nadu",
      pincode: "637408",
      phone: "+91 95854 68266",
      email: "sanaarchitects22@gmail.com",
      mapQuery: "SANA Architects 51B Gandhi Salai Rasipuram",
      mapEmbedUrl: "https://maps.google.com/maps?q=51+B+Gandhi+Salai+Rasipuram+Tamil+Nadu&t=&z=15&ie=UTF8&iwloc=&output=embed"
    },
    {
      id: "salem-city-office",
      name: "Salem City Studio",
      type: "City Office",
      building: "KPR Complex, Ground Floor",
      street: "Cherry Road, Hasthampatti",
      city: "Salem",
      state: "Tamil Nadu",
      pincode: "636 007",
      phone: "+91 95854 68266",
      email: "sanaarchitects22@gmail.com",
      mapQuery: "KPR Complex Cherry Road Hasthampatti Salem 636007",
      mapEmbedUrl: "https://maps.google.com/maps?q=KPR+Complex+Cherry+Road+Hasthampatti+Salem+636007&t=&z=15&ie=UTF8&iwloc=&output=embed"
    }
  ]
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "architectural-elevation-design",
    number: "01",
    title: "Architectural & Elevation Design",
    subtitle: "Contextual Facades & Residential Structures",
    description: "Designing modern, climatically responsive architectural envelopes and residential elevations. We synthesize traditional materials—like wire-cut brick, terracotta breeze blocks (jaali), and rough-cut stone—with clean contemporary geometries and composite louvers.",
    deliverables: [
      "Custom Residential 3D Elevation Design",
      "Structural & Floor Plan Drafting",
      "Material Specification & Texture Palettes",
      "Exterior Lighting Schemes & Pergolas"
    ],
    image: "/images/projects/page_022.jpg"
  },
  {
    id: "3d-visualization-walkthroughs",
    number: "02",
    title: "3D Architectural Visualization",
    subtitle: "Photorealistic Day & Twilight Renders",
    description: "High-fidelity digital visualization translating architectural blueprints into lifelike imagery. We produce hyper-realistic day and evening lighting studies, spatial depth renderings, and immersive exterior perspectives.",
    deliverables: [
      "Photorealistic Exterior Renders (Day & Twilight)",
      "3D Architectural Walkthrough Video Animations",
      "Volumetric & Shadow Studies",
      "Commercial Building Facade Simulations"
    ],
    image: "/images/projects/page_009.jpg"
  },
  {
    id: "interior-architecture-space-planning",
    number: "03",
    title: "Interior Architecture & Space Planning",
    subtitle: "Tailored Living, Sleeping & Sacred Spaces",
    description: "Holistic interior design optimizing spatial circulation, natural light, and bespoke joinery. From high-gloss modular kitchens and acoustic living lounges to intricately carved traditional pooja mandirs and Scandinavian bedrooms.",
    deliverables: [
      "Modular Kitchen Design with Built-in Appliances",
      "Living Hall Acoustic & TV Feature Wall Paneling",
      "Master Bedroom Suites & Custom Wardrobe Joinery",
      "Traditional Teakwood & Backlit Pooja Room Sanctums"
    ],
    image: "/images/projects/page_035.jpg"
  },
  {
    id: "commercial-retail-design",
    number: "04",
    title: "Commercial & Retail Architecture",
    subtitle: "Showrooms, Boutiques & Complexes",
    description: "Impactful commercial architecture and high-conversion retail environments. Proven expertise in luxury jewellery showrooms (ornate ceilings, velvet counters) and fashion boutiques (terrazzo flooring, brass rail systems, arched display niches).",
    deliverables: [
      "Flagship Jewellery & Boutique Interior Architecture",
      "Commercial Complex Facade Design (GB Complex)",
      "Customer Circulation & Display Optimization",
      "Branded Reception & Billing Counter Joinery"
    ],
    image: "/images/projects/page_012.jpg"
  },
  {
    id: "turnkey-execution-consulting",
    number: "05",
    title: "Execution & Site Consultation",
    subtitle: "Precision Translation from Render to Reality",
    description: "Bridging the gap between 3D visualization and on-site physical craftsmanship. We oversee masonry, gypsum false ceiling installation, specialized electrical cove illumination, stone cladding, and custom woodwork execution in Rasipuram and across Tamil Nadu.",
    deliverables: [
      "On-site Architectural Supervision",
      "Material Sourcing (Natural Slate, Teak, Composite Louvers)",
      "Joinery & Custom Furniture Fabrication Oversight",
      "Final Quality Inspection & Handover"
    ],
    image: "/images/projects/page_083.jpg"
  }
];

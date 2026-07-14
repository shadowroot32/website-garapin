export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "company-1",
    title: "PT Maju Jaya Abadi",
    category: "company",
    description: "Company profile website for a construction company. Modern design with project gallery and client testimonials.",
    image: "/portfolio/company-1.jpg",
    tags: ["Company Profile", "Responsive", "CMS"],
  },
  {
    id: "landing-1",
    title: "LaunchPad Marketing",
    category: "landing",
    description: "High-converting landing page for a product launch campaign. Integrated analytics and A/B testing.",
    image: "/portfolio/landing-1.jpg",
    tags: ["Landing Page", "Marketing", "Analytics"],
  },
  {
    id: "ecommerce-1",
    title: "Batik Nusantara Store",
    category: "ecommerce",
    description: "Full e-commerce platform for batik products. Payment gateway integration and inventory management.",
    image: "/portfolio/ecommerce-1.jpg",
    tags: ["E-Commerce", "Payment", "Inventory"],
  },
  {
    id: "dashboard-1",
    title: "EduTrack Dashboard",
    category: "dashboard",
    description: "Interactive analytics dashboard for a school management system. Real-time data visualization.",
    image: "/portfolio/dashboard-1.jpg",
    tags: ["Dashboard", "Analytics", "Education"],
  },
  {
    id: "company-2",
    title: "RS Sehat Sentosa",
    category: "company",
    description: "Hospital profile website with doctor directory, service listings, and online appointment booking.",
    image: "/portfolio/company-2.jpg",
    tags: ["Company Profile", "Healthcare", "Booking"],
  },
  {
    id: "system-1",
    title: "Siakad Plus",
    category: "system",
    description: "Academic information system for universities. Student portal, grade management, and reporting.",
    image: "/portfolio/system-1.jpg",
    tags: ["System", "Education", "Portal"],
  },
];
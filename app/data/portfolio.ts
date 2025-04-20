// data/portfolio.ts

export interface Project {
  title: string;
  year: number;
  description: string;
  fullDescription: string;  // Menambahkan properti fullDescription
  image: string;
  slug: string;
  externalLink: string;
}

const projects: Project[] = [
  {
    title: "Website E-Commerce",
    year: 2025,
    description: "Membangun website e-commerce toko gelang.",
    fullDescription: "Gelang yang dijual di toko ini anti karatan gusyy",
    image: "/gelang.png",
    slug: "ecommerce-gelang",  // hanya untuk routing
    externalLink: "https://github.com/akunmu/ecommerce-project",
  },
  {
    title: "Website E-Commerce 2",
    year: 2024,
    description: "Membuat website toko kue.",
    fullDescription: "Toko kue yang menjual kue-kue Lezat",
    image: "/tokokue.jpg",
    slug: "website-toko-kue",  // hanya untuk routing
    externalLink: "https://github.com/akunmu/data-management",
  },
  {
    title: "Aplikasi Inventory",
    year: 2024,
    description: "Membuat aplikasi menggunakan netbeans untuk monitoring stok barang.",
    fullDescription: "website dibuat untuk memudahkan monitoring stok barang.",
    image: "/stokbarang.jpeg",
    slug: "stok-inventory",  // hanya untuk routing
    externalLink: "https://github.com/akunmu/mobile-inventory",
  },
];

export default projects;

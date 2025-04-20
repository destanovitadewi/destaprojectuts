import { notFound } from "next/navigation";
import projects from "@/app/data/portfolio";
import Image from "next/image";
import Link from "next/link";

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) return notFound();

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        <p className="text-gray-400">{project.year}</p>
        <div className="my-6">
          <Image
            src={project.image}
            alt={project.title}
            width={600}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>
        <p className="text-lg">{project.description}</p>
        <div className="mt-8">
          <a
            href={project.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            View GitHub →
          </a>
        </div>
        <div className="mt-6">
          <Link href="/portfolio" className="text-gray-400 hover:underline">
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}

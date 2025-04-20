import { useState } from "react";
import Image from "next/image";
import projects, { Project } from "@/app/data/portfolio"; // Pastikan mengimpor Project

export default function PortfolioPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">My Portfolio Timeline</h1>
      <div className="space-y-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}

// Tambahkan tipe untuk props 'project'
const ProjectCard = ({ project }: { project: Project }) => { // Menambahkan tipe untuk project
  const [showMore, setShowMore] = useState(false); // State to handle the description toggle

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      {/* Container for image with symmetric frame */}
      <div className="flex justify-center items-center mb-4">
        <div className="w-40 h-40 overflow-hidden rounded-md border-2 border-gray-600">
          <Image
            src={project.image}
            alt={project.title}
            width={160} // Set explicit width
            height={160} // Set explicit height
            className="w-full h-full object-cover transform hover:scale-105 transition-all duration-300 ease-in-out"
          />
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-center">{project.title}</h2>
      <p className="text-gray-400 text-center">{project.year}</p>
      <p className="mt-2 text-center">{project.description}</p>

      {/* Toggle the visibility of detailed description */}
      <div className="text-center mt-4">
        <button
          onClick={() => setShowMore(!showMore)} // Toggle the 'showMore' state
          className="text-blue-400 hover:underline"
        >
          {showMore ? "Show Less" : "Read More →"}
        </button>
        {showMore && (
          <p className="mt-4 text-gray-300">{project.fullDescription}</p> // Show full description
        )}
      </div>
    </div>
  );
};

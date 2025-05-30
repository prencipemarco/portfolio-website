import { useState, useEffect, useRef } from "react";

const projectsData = [
  {
    title: "2D Game in Java",
    description:
      "Un gioco retro-style 2D singleplayer con grafica pixel art, power-ups e livelli precaricati.",
    tech: ["Java", "LaTeX", "Doxygen", "Adobe Photoshop", "Adobe Illustrator"],
    images: [
      "/assets/java1.png",
      "/assets/java2.png",
      "/assets/java3.png",
    ],
    github: "https://github.com/prencipemarco/Progetto-Java",
  },
  {
    title: "Sito per una Pizzeria Locale",
    description:
      "Un sito web responsive per una pizzeria locale, completo di menu e galleria in due versioni: desktop e mobile.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "GitHub Pages"],
    images: [
      "/assets/web1.png",
      "/assets/web2.png",
      "/assets/web3.png",
    ],
    github: "https://github.com/prencipemarco/deroma-website",
  },
];

function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-20 bg-[#0e0e0e]"
    >
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map(({ title, description, tech, images, github }) => (
            <ProjectCard
              key={title}
              title={title}
              description={description}
              tech={tech}
              images={images}
              github={github}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const ProjectCard = ({ title, description, tech, images, github }) => {
  const [hovered, setHovered] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (hovered) {
      intervalRef.current = setInterval(() => {
        setActiveImageIndex((prev) => (prev + 1) % images.length);
      }, 2000);
    } else {
      clearInterval(intervalRef.current);
      setActiveImageIndex(0);
    }
    return () => clearInterval(intervalRef.current);
  }, [hovered, images.length]);

  return (
    <div
      className="relative h-96 rounded-xl border border-white/10 bg-black cursor-pointer overflow-hidden shadow-lg transition-transform hover:scale-[1.015]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => window.open(github, "_blank")}
    >
      {/* Slider immagini sullo sfondo */}
      <div className="absolute inset-0 z-0">
        <div
          className="flex h-full w-full transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${(activeImageIndex * 100) / images.length}%)`,
            width: `${images.length * 100}%`,
          }}
        >
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${title} preview ${i + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
              draggable={false}
            />
          ))}
        </div>
        {/* Filtro scuro per testo leggibile */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
      </div>

      {/* Contenuto testuale sopra immagini */}
      <div className="relative z-20 p-6 flex flex-col justify-end h-full text-white">
        <h3 className="text-2xl font-bold mb-1">{title}</h3>
        <p className="text-gray-300 text-sm mb-3">{description}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {tech.map((t) => (
            <span
              key={t}
              className="bg-blue-500/20 text-blue-300 py-1 px-3 rounded-full text-xs"
            >
              {t}
            </span>
          ))}
        </div>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-sm text-blue-400 hover:text-blue-300 transition"
        >
          View Project →
        </a>
      </div>
    </div>
  );
};

export default Projects;

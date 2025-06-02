import { useState, useEffect, useRef, useCallback } from "react";

// Dati progetti spostati in una struttura più robusta
const projectsData = [
  {
    id: "java-game",
    title: "2D Game in Java",
    description: "Un gioco retro-style 2D singleplayer con grafica pixel art, power-ups e livelli precaricati.",
    tech: ["Java", "LaTeX", "Doxygen", "Adobe Photoshop", "Adobe Illustrator"],
    images: [
      { src: "/assets/java1.png", alt: "Schermata principale del gioco Java" },
      { src: "/assets/java2.png", alt: "Gameplay del gioco Java" },
      { src: "/assets/java3.png", alt: "Menu del gioco Java" }
    ],
    github: "https://github.com/prencipemarco/Progetto-Java",
    documentation: "https://github.com/prencipemarco/Progetto-Java/wiki",
  },
  {
    id: "pizzeria-website",
    title: "Sito per una Pizzeria Locale",
    description: "Un sito web responsive per una pizzeria locale, completo di menu e galleria in due versioni: desktop e mobile.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "GitHub Pages"],
    images: [
      { src: "/assets/web1.png", alt: "Homepage del sito pizzeria" },
      { src: "/assets/web2.png", alt: "Menu della pizzeria" },
      { src: "/assets/web3.png", alt: "Galleria della pizzeria" }
    ],
    github: "https://github.com/prencipemarco/deroma-website",
    documentation: "",
  },
];

// Hook personalizzato per rilevare dispositivi mobili
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
};

export const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-20 bg-[#0e0e0e]"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-5xl mx-auto px-4">
        <h2 
          id="projects-heading"
          className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center"
        >
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ id, title, description, tech, images, github, documentation }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [imageErrors, setImageErrors] = useState({});
  const [isPressed, setIsPressed] = useState(false);
  const intervalRef = useRef(null);
  const isMobile = useIsMobile();

  // Su mobile, mostra sempre le immagini
  const shouldShowImages = isMobile || isHovered;

  // Gestione del carosello automatico
  useEffect(() => {
    if (shouldShowImages && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setActiveImageIndex((prev) => (prev + 1) % images.length);
      }, 3000); // Più lento per migliore UX
    } else {
      clearInterval(intervalRef.current);
      if (!shouldShowImages) {
        setActiveImageIndex(0);
      }
    }
    return () => clearInterval(intervalRef.current);
  }, [shouldShowImages, images.length]);

  // Gestione click/keyboard
  const handleActivation = useCallback((e) => {
    e.preventDefault();
    if (github) {
      window.open(github, "_blank", "noopener,noreferrer");
    }
  }, [github]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsPressed(true);
      handleActivation(e);
    }
  }, [handleActivation]);

  const handleKeyUp = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setIsPressed(false);
    }
  }, []);

  // Gestione caricamento immagini
  const handleImageLoad = useCallback((index) => {
    setImagesLoaded(prev => ({ ...prev, [index]: true }));
  }, []);

  const handleImageError = useCallback((index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  }, []);

  return (
    <article
      className={`relative h-96 rounded-xl border border-white/10 bg-black cursor-pointer overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.015] focus:scale-[1.015] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black ${
        isPressed ? 'scale-[0.98]' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleActivation}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      tabIndex={0}
      role="button"
      aria-label={`Apri progetto ${title} su GitHub`}
      aria-describedby={`${id}-description`}
    >
      {/* Contenitore immagini con lazy loading */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-500 ease-in-out ${
          shouldShowImages ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <div
          className="flex h-full w-full"
          style={{
            transform: `translateX(-${(activeImageIndex * 100) / images.length}%)`,
            width: `${images.length * 100}%`,
            transition: "transform 0.7s ease-in-out",
          }}
        >
          {images.map((image, i) => (
            <div key={i} className="w-full h-full flex-shrink-0 relative">
              {/* Skeleton loader */}
              {!imagesLoaded[i] && !imageErrors[i] && (
                <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              
              {/* Immagine vera */}
              {!imageErrors[i] && (
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`w-full h-full object-cover select-none transition-opacity duration-300 ${
                    imagesLoaded[i] ? 'opacity-100' : 'opacity-0'
                  }`}
                  draggable={false}
                  loading="lazy"
                  onLoad={() => handleImageLoad(i)}
                  onError={() => handleImageError(i)}
                />
              )}
              
              {/* Fallback per errori */}
              {imageErrors[i] && (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🖼️</div>
                    <div className="text-sm">Immagine non disponibile</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
      </div>

      {/* Contenuto testuale */}
      <div className="relative z-20 p-6 flex flex-col justify-between h-full text-white">
        <div>
          <h3 className="text-2xl font-bold mb-2 leading-tight">{title}</h3>
          <p 
            id={`${id}-description`}
            className="text-gray-300 text-sm mb-3 leading-relaxed"
          >
            {description}
          </p>
        </div>

        <div>
          {/* Tags tecnologie */}
          <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Tecnologie utilizzate">
            {tech.map((technology) => (
              <span
                key={technology}
                role="listitem"
                className="bg-blue-500/20 text-blue-300 py-1 px-3 rounded-full text-xs font-medium border border-blue-500/30"
              >
                {technology}
              </span>
            ))}
          </div>
          
          {/* Link azioni */}
          <div className="flex gap-6">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium focus:outline-none focus:underline"
              aria-label={`Visita il repository GitHub di ${title}`}
            >
              View Project →
            </a>
            {documentation && documentation.trim() !== "" && (
              <a
                href="/assets/Documentazione.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-sm text-green-400 hover:text-green-300 transition-colors duration-200 font-medium focus:outline-none focus:underline"
                aria-label={`Leggi la documentazione di ${title}`}
              >
                Documentation 📄
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Indicatori carosello posizionati sotto la card */}
      {images.length > 1 && shouldShowImages && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeImageIndex 
                  ? 'bg-blue-400 scale-125 shadow-lg shadow-blue-400/50' 
                  : 'bg-gray-500 hover:bg-gray-400'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex(i);
              }}
              aria-label={`Vai all'immagine ${i + 1}`}
            />
          ))}
        </div>
      )}
    </article>
  );
};
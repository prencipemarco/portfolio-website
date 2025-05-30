import { RevealOnScroll } from "./RevealOnScroll.jsx";

export const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative"
    >
      <RevealOnScroll>
        <div className="text-center z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-bold mt -10 mb-10 bg-gradient-to-r from-[rgb(69,85,115)] to-[rgb(38,47,64)] bg-clip-text text-transparent leading-right">
            Io sono Marco Prencipe
          </h1>

          <p className="tex-gray-400 text-lg mb-10 max-w-lg mx-auto">
            un ragazzo di 25 anni, studente di Informatica all'Università di Bari appassionato di programmazione e tecnologia, al passo con le ultime tendenze del settore. Sono sempre alla ricerca di nuove sfide e opportunità per crescere come sviluppatore e come persona. La mia curiosità mi spinge a esplorare nuove tecnologie e a migliorare le mie competenze, con l'obiettivo di creare soluzioni innovative e di alta qualità.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="#projects"
              className="bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59, 130, 246, 0.4)]"
            >
              Vedi i miei progetti
            </a>

            <a
              href="#contact"
              className="border border-blue-500/50 text-blue-500 py-3 px-6 rounded font-medium transition-all duration-200 
             hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59, 130, 246, 0.2)] hover:bg-blue-500/10"
            >
              Contami
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
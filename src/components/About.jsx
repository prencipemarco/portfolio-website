import { RevealOnScroll } from "./RevealOnScroll.jsx";

export const About = () => {
  const competenzeSoftware = [
    "Office",
    "Excel",
    "PowerPoint",
    "Windows",
    "Linux",


  ];

  const programmingSkills = [
    "Node.js", 
    "Python", 
    "SQL",
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "React",
    "C",
    "C++",
    "Java",
    "Git",
    "GitHub",
  ];

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            {" "}
            Su di me
          </h2>

          <div className="rounded-xl p-8 border-white/10 border hover:-translate-y-1 transition-all">
            <p className="text-gray-300 mb-6">
              un ragazzo di 25 anni, studente di Informatica all'Università di Bari appassionato di programmazione e tecnologia, al passo con le ultime tendenze del settore. Sono sempre alla ricerca di nuove sfide e opportunità per crescere come sviluppatore e come persona. La mia curiosità mi spinge a esplorare nuove tecnologie e a migliorare le mie competenze, con l'obiettivo di creare soluzioni innovative e di alta qualità.

            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4"> Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {competenzeSoftware.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                    hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition
                    "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4"> Backend</h3>
                <div className="flex flex-wrap gap-2">
                  {programmingSkills.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                    hover:shadow-[0_2px_8px_rgba(59,130,2246,0.2)] transition
                    "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 rounded-xl border-white/10 border hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-bold mb-4"> 🏫 Studi </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>
                  <strong>Studente presso l'Università degli studi di bari "Aldo Moro"</strong> - Corso di Laurea Triennale in Informatica (2020 - Presente)
                </li>
                <li>
                  <strong> Diploma indirizzo Informatico </strong> - I.T. "Luigi di Maggio" - San Giovanni Rotondo (FG)
                  (2015-2020)
                </li>
                
              </ul>
            </div>
            <div className="p-6 rounded-xl border-white/10 border hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-bold mb-4"> 💼 Esperienze di Lavoro </h3>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h4 className="font-semibold">
                    {" "}
                    Servizio Civile Digitale presso Comune di Mattinata (2023 - 2024){" "}
                  </h4>
                  <p>
                    Assistenza HW e SW all'utenza, gestione e configurazione
                    dispositivi, gestione e configurazione reti stampanti e PC ufficio
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
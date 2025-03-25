import { useState, useEffect, useCallback } from 'react';

// --- Data for Principles ---
interface Principle {
  id: number;
  title: string;
  description: string;
  page: string;
  details: string;
}

const principles: Principle[] = [
  { id: 1, title: 'Ethical Foundation', description: 'Integrity & Transparency', page: '/ethics', details: 'Explore how our operations are built on a strong ethical framework, ensuring fairness and trust in every interaction.' },
  { id: 2, title: 'Privacy by Design', description: 'Your Data, Your Control', page: '/privacy', details: 'Discover our commitment to embedding privacy in every solution, safeguarding your information from the ground up.' },
  { id: 3, title: 'Ironclad Security', description: 'Multi-Layered Protection', page: '/security', details: 'Learn about the robust, cutting-edge security measures we implement to protect your valuable digital assets.' },
];

// --- Icon Placeholder ---
const IconPlaceholder = ({ className = "w-8 h-8", gradient = "from-purple-500/20 to-purple-800/20" }: { className?: string, gradient?: string }) => (
    <div className={`relative flex-shrink-0 ${className}`}> 
        <div className={`absolute inset-0 ${gradient} border border-purple-400/30 rounded-full transition-all duration-500 ease-out group-hover:border-purple-300 group-hover:scale-110 group-hover:rotate-[10deg]`}></div>
        <div className={`absolute inset-1.5 bg-gray-900 rounded-full`}></div>
        <div className={`absolute inset-2.5 bg-purple-600/30 rounded-full transition-all duration-300 ease-out group-hover:bg-purple-500/50 scale-50 group-hover:scale-80 opacity-0 group-hover:opacity-100 blur-sm`}></div>
    </div>
);

// --- Typing Effect Hook ---
const useTypingEffect = (words: string[], typeSpeed = 80, deleteSpeed = 40, delay = 1800) => {
    const [taglineIndex, setTaglineIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        if (!words || words.length === 0) return;
        const currentWord = words[taglineIndex];
        let timeoutId: NodeJS.Timeout;

        if (isDeleting) {
            if (subIndex > 0) {
                timeoutId = setTimeout(() => {
                    setDisplayedText(currentWord.substring(0, subIndex - 1));
                    setSubIndex(subIndex - 1);
                }, deleteSpeed);
            } else {
                setIsDeleting(false);
                setTaglineIndex((prev) => (prev + 1) % words.length);
            }
        } else {
            if (subIndex < currentWord.length) {
                timeoutId = setTimeout(() => {
                    setDisplayedText(currentWord.substring(0, subIndex + 1));
                    setSubIndex(subIndex + 1);
                }, typeSpeed);
            } else {
                timeoutId = setTimeout(() => setIsDeleting(true), delay);
            }
        }
        return () => clearTimeout(timeoutId);
    }, [subIndex, isDeleting, taglineIndex, words, typeSpeed, deleteSpeed, delay]);

    return displayedText;
};

// --- Blinking Cursor ---
const BlinkingCursor = () => <span className="inline-block w-0.5 h-5 bg-purple-400 animate-blink ml-1"></span>;

// --- Main Component ---
const taglines = [
    "Unlock Your Virtual Freedom.",
    "Ethical Tech for a Secure Future.",
    "Privacy-Powered Operations.",
    "Your Digital World, Reimagined."
];

export default function MakerTooLandingPage() {
    const displayedTagline = useTypingEffect(taglines);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedPrinciple, setSelectedPrinciple] = useState<Principle | null>(null);

    const openPopup = (principle: Principle) => {
        setSelectedPrinciple(principle);
        setIsPopupOpen(true);
    };
    const closePopup = useCallback(() => {
        setIsPopupOpen(false);
        setTimeout(() => setSelectedPrinciple(null), 300);
    }, []);

    // Embedded CSS for animations
    const embeddedStyles = `
        @keyframes slow-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes subtle-pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.03); }
        }
        @keyframes subtle-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes blink {
          from, to { opacity: 1 }
          50% { opacity: 0 }
        }
        .animate-slow-spin { animation: slow-spin 35s linear infinite; }
        .animate-subtle-pulse { animation: subtle-pulse 5s ease-in-out infinite; }
        .animate-subtle-float { animation: subtle-float 6s ease-in-out infinite; }
        .animate-blink { animation: blink 1s step-end infinite; }
    `;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 font-sans">
            <style>{embeddedStyles}</style>
            {/* Mobile Frame */}
            <div className="relative w-[375px] h-[812px] bg-black rounded-[40px] shadow-2xl shadow-purple-900/50 overflow-hidden border-4 border-gray-800 flex flex-col">
                <div className="flex-grow overflow-y-auto no-scrollbar text-white px-5 pt-6">
                    {/* Header/Hero */}
                    <header className="pt-8 pb-10 text-center min-h-[180px] flex flex-col justify-center">
                        <h1 className="text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">
                            MakerToo
                        </h1>
                        <div className="h-6 text-purple-300/90 text-base font-medium leading-relaxed whitespace-nowrap overflow-hidden text-ellipsis mb-3">
                            <span>{displayedTagline}</span>
                            <BlinkingCursor />
                        </div>
                        <p className="text-gray-400 text-sm max-w-xs mx-auto leading-relaxed">
                            We empower your business with ethical, secure, and private operational solutions, giving you true <span className="text-purple-400 font-medium">Virtual Freedom</span>.
                        </p>
                    </header>

                    {/* "Virtual Freedom" Visual Section */}
                    <section className="my-10 flex flex-col items-center text-center group">
                        <div className="relative w-48 h-48 mb-5">
                            {/* Dynamic Background Elements */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-700 via-fuchsia-800 to-purple-900 blur-xl opacity-50 animate-subtle-pulse"></div>
                            <div className="absolute inset-8 rounded-full border-2 border-purple-500/30 animate-slow-spin opacity-60"></div>
                            <div className="absolute inset-12 rounded-full bg-gradient-to-tl from-gray-900 to-black opacity-80 flex items-center justify-center animate-subtle-float">
                                <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-fuchsia-400 transform group-hover:scale-110 transition-transform duration-500">VF</span>
                            </div>
                        </div>
                        <h2 className="text-2xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">Experience Virtual Freedom</h2>
                        <p className="text-gray-400 text-sm max-w-[280px] mx-auto leading-relaxed">Operate, connect, and grow without compromise. Your digital space, secured and private, by design.</p>
                    </section>

                    {/* Core Principles */}
                    <section className="mb-10">
                        <h2 className="text-xl font-semibold mb-5 text-center text-purple-300/80">Our Pillars</h2>
                        <div className="space-y-3.5">
                            {principles.map((principle) => (
                                <button
                                    key={principle.id}
                                    onClick={() => openPopup(principle)}
                                    className="group w-full bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-3.5 rounded-xl shadow-lg border border-gray-700/60 flex items-center space-x-3 transition-all duration-300 ease-out hover:bg-gray-800/80 hover:shadow-xl hover:shadow-purple-700/20 hover:border-purple-600/50 hover:scale-[1.02] text-left focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
                                >
                                    <IconPlaceholder className="w-8 h-8" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-sm text-white">{principle.title}</h3>
                                        <p className="text-gray-400 text-xs transition-colors duration-300 group-hover:text-gray-300">{principle.description}</p>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400/60 group-hover:text-purple-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* How We Empower You (Features) */}
                    <section className="mb-10">
                        <h2 className="text-xl font-semibold mb-5 text-center text-purple-300/80">Empowerment Tools</h2>
                        <div className="grid grid-cols-2 gap-3.5">
                            {[{t:"Secure Infra", i:"shield"}, {t:"Private Comms", i:"lock"}, {t:"Ethical Data", i:"leaf"}, {t:"Open Solutions", i:"code"}].map(f => (
                            <div key={f.t} className="group bg-gray-800/60 p-3 rounded-lg border border-gray-700/50 text-center transition-all hover:bg-gray-700/70 hover:border-purple-600/40">
                                <div className="flex justify-center mb-1.5">
                                    <IconPlaceholder className="w-7 h-7" gradient="bg-gradient-to-br from-purple-600/30 to-fuchsia-700/30" />
                                </div>
                                <p className="text-xs font-medium text-gray-300 group-hover:text-white">{f.t}</p>
                            </div>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-4 text-center">Leveraging <span className="text-purple-400/80">Open Source</span> for transparency and trust.</p>
                    </section>

                    {/* Testimonial Placeholder */}
                    <section className="mb-12 px-4">
                        <div className="border-l-4 border-purple-600 pl-4 py-2 bg-gray-800/40 rounded-r-lg">
                            <p className="text-sm italic text-gray-300">"MakerToo transformed how we operate, giving us peace of mind about our data and ethics."</p>
                            <p className="text-xs text-gray-500 mt-1">- A Valued Partner (Placeholder)</p>
                        </div>
                    </section>

                    {/* Immersive Call to Action */}
                    <section className="text-center pb-8 pt-0">
                        <button className="relative inline-flex items-center justify-center px-10 py-3.5 overflow-hidden font-bold text-white transition-all duration-500 ease-out bg-gradient-to-r from-purple-600 to-fuchsia-700 rounded-lg shadow-lg group hover:shadow-purple-500/60 focus:outline-none focus:ring-4 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-black active:scale-95">
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500 via-fuchsia-600 to-purple-800 opacity-0 transition-opacity duration-500 group-hover:opacity-100 scale-150 group-hover:scale-100"></span>
                            <span className="relative text-base transition-transform duration-300 group-hover:scale-105">
                                Claim Your Freedom
                            </span>
                            <span className="absolute top-0 left-0 w-full h-full transition-all duration-500 ease-out transform -translate-x-full bg-white opacity-10 group-hover:translate-x-full group-hover:skew-x-12"></span>
                        </button>
                    </section>

                </div>
                {/* Footer Area */}
                <footer className="p-3.5 text-center text-xs text-gray-600 border-t border-gray-800/50">
                    © {new Date().getFullYear()} MakerToo. Ethical Tech. Virtual Freedom.
                </footer>

                {/* --- Pop-up --- */}
                {isPopupOpen && selectedPrinciple && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center p-5" aria-labelledby="popup-title" role="dialog" aria-modal="true">
                        <div className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 ease-out ${isPopupOpen ? 'opacity-100' : 'opacity-0'}`} onClick={closePopup}></div>
                        <div className={`relative bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-purple-600/60 rounded-2xl shadow-2xl shadow-purple-900/40 p-6 w-full max-w-xs transition-all duration-300 ease-out ${isPopupOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}> 
                            <h3 id="popup-title" className="text-lg font-semibold text-purple-300 mb-3 text-center">{selectedPrinciple.title}</h3>
                            <p className="text-gray-300 text-sm mb-5 text-center leading-relaxed">{selectedPrinciple.details}</p>
                            <div className="flex flex-col space-y-2.5">
                                <button
                                    onClick={closePopup}
                                    className="w-full relative inline-flex items-center justify-center px-5 py-2 overflow-hidden font-medium text-purple-200 transition-all duration-300 bg-gradient-to-r from-purple-600 to-fuchsia-700 rounded-lg shadow-md group hover:from-purple-500 hover:to-fuchsia-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 active:scale-95"
                                >
                                    <span className="relative text-sm">Explore {selectedPrinciple.page}</span>
                                    <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white/20 rounded-full group-hover:w-24 group-hover:h-24 opacity-10"></span>
                                </button>
                                <button
                                    onClick={closePopup}
                                    className="w-full px-5 py-2 text-xs font-medium text-gray-400 bg-gray-700/60 rounded-lg hover:bg-gray-600/80 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 active:scale-95"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

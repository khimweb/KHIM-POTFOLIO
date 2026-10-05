import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ParticleBackground } from './components/three/ParticleBackground';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Education } from './components/sections/Education';
import { Contact } from './components/sections/Contact';
import { useLenis } from './hooks/useLenis';

function App() {
  useLenis(); // Initialize smooth scrolling

  return (
    <div className="relative w-full min-h-screen text-gray-300 selection:bg-primary/30 selection:text-white overflow-x-hidden">
      <ParticleBackground />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;

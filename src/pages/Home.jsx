import Hero from '../components/pages/home/Hero';
import About from '../components/pages/home/About';
import Picks from '../components/pages/home/Picks';
import Testimonials from '../components/pages/home/Testimonials';
import Contact from '../components/pages/home/Contact';

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <About />
      <Picks />
      <Testimonials />
      <Contact />
    </main>
  );
}

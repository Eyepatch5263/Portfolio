import Header from '../components/header/Header';
import Home from '../components/home/Home';
import About from '../components/about/About';
import Skills from '../components/skills/Skills';
import Services from '../components/services/Services';
import Qualification from '../components/qualification/Qualification';
import Testimonial from '../components/testimonials/Testimonial';
import Contact from '../components/contact/Contact';
import Footer from '../components/footer/Footer';
import Scrollup from '../components/scrollup/Scrollup';
import Work from '../components/work/Work';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className='main'>
        <Home />
        <About />
        <Skills />
        <Services />
        <Qualification />
        <Work />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
      <Scrollup />
    </>
  );
}


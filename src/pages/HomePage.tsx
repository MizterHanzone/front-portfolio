import Header from '../components/header-component/Header';
import Hero from '../components/hero-component/Hero';
import AboutSection from '../components/about-component/AboutSection';
import PortfolioSection from '../components/portfolio-component/PortfolioSection';
import ServicesSection from '../components/services-component/ServicesSection';
import BlogSection from '../components/blog-component/BlogSection';
import CTA from '../components/cta-component/CTA';
import Footer from '../components/footer-component/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <PortfolioSection />
        <ServicesSection />
        <BlogSection />
        <div id="content" />
      </main>
      <CTA />
      <Footer />
    </>
  );
}

import Header from '../components/header-component/Header';
import Hero from '../components/hero-component/Hero';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div id="content" />
      </main>
    </>
  );
}

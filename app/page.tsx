import HeroSection from "./components/HeroSection";
import CategorySection from "./components/CategorySection";
import AboutContactSection from "./components/AboutContactSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div id="home">
        <HeroSection />
      </div>
      <div id="shop">
        <CategorySection />
      </div>
      <div id="about">
        <AboutContactSection />
      </div>
    </main>
  );
}

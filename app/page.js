import HeroPage from "../components/HeroPage";
import TeamPage from "../components/TeamPage";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroPage />
      <TeamPage />
        <Footer />
    </div>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import HowItWorks from "./HowItWorks";
import CTASection from "./CTASection";

export default function UdaanLandingPage() {
  return (
    <div className="min-h-screen flex flex-col text-slate-900 bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      {/* Navbar */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Features */}
      <FeaturesSection />

      {/* How it Works */}
      <HowItWorks />

      {/* CTA */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

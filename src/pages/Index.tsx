import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Hero from "@/components/Home/Hero";
import WhatWeDo from "@/components/Home/WhatWeDo";
import Services from "@/components/Home/Services";
import Founder from "@/components/Home/Founder";
import GetInvolved from "@/components/Home/GetInvolved";
import FAQ from "@/components/Home/FAQ";
import { BookCallButton } from "@/components/ui/book-call-button";
import { CookieConsent } from "@/components/ui/cookie-consent";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <WhatWeDo />
        <Services />
        <Founder />
        <GetInvolved />
        <FAQ />
      </main>
      <Footer />
      <BookCallButton />
      <CookieConsent />
    </div>
  );
};

export default Index;

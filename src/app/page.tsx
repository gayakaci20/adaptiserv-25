"use client";

import SpotlightCard from "@/components/card/SpotlightCard";
import { MobileNav, Navbar, NavBody, NavItems, NavbarLogo, MobileNavItems } from "@/components/ui/resizable-navbar"
import { BatteryChargingIcon, UserIcon } from "lucide-react";
import { GlobeIcon } from "lucide-react";
import { PrinterIcon } from "lucide-react";
import SplitText from "@/components/text/SplitText";
import FooterSection from "@/components/sections/footer/default";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] relative">
      {/* Bottom Fade Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: "20px 30px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
        }}
      />
      {/* Navbar */}
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={[{ name: "Accueil", link: "/" }, { name: "Contact", link: "/contact" }]} />
        </NavBody>
        <MobileNav>
          <MobileNavItems items={[{ name: "Accueil", link: "/" }, { name: "Contact", link: "/contact" }]} />
        </MobileNav>
      </Navbar>
      
      <div className="container mx-auto px-4 py-8 max-w-4xl mt-30"> 
        <SplitText className="text-6xl font-bold mb-4 text-left mb-10 text-gray-900" text="Solutions  professionnelles  pour  entreprises." />
        <SplitText className="text-left text-gray-600" text="adaptiserv  accompagne  les  professionnels  avec  des  services  sur-mesure  :  optimisation  d'énergie,  création  web,  impression  &  design,  et  externalisation  commerciale." />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl mt-30"> 
        <div className="text-center mb-10">
          <SplitText className="text-6xl font-bold text-gray-900" text="Nos services" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SpotlightCard>
            <div className="flex flex-col items-center justify-center p-6 h-64 cursor-pointer hover:scale-105 transition-transform duration-200" onClick={() => router.push("/contact")}>
              <div className="mb-6">
                <BatteryChargingIcon className="w-6 h-6 text-gray-700" />
              </div>
              <h2 className="text-xl font-bold text-gray-700 text-center mb-4">Courtage en Energie</h2>
              <p className="text-gray-400 text-sm text-center leading-relaxed">Optimisation gratuite de vos contrats d'électricité et de gaz.</p>
            </div>
          </SpotlightCard>

          <SpotlightCard>
            <div className="flex flex-col items-center justify-center p-6 h-64 cursor-pointer hover:scale-105 transition-transform duration-200" onClick={() => router.push("/contact")}>
              <div className="mb-6">
                <GlobeIcon className="w-6 h-6 text-gray-700" />
              </div>
              <h2 className="text-xl font-bold text-gray-700 text-center mb-4">Services Digitaux</h2>
              <p className="text-gray-400 text-sm text-center leading-relaxed">Laissez-nous gérer votre présence digitale et concrétiser vos rêves.</p>
            </div>
          </SpotlightCard>

          <SpotlightCard>
            <div className="flex flex-col items-center justify-center p-6 h-64 cursor-pointer hover:scale-105 transition-transform duration-200" onClick={() => router.push("/contact")}>
              <div className="mb-6">
                <PrinterIcon className="w-6 h-6 text-gray-700" />
              </div>
              <h2 className="text-xl font-bold text-gray-700 text-center mb-4">Sérigraphie & Impressions</h2>
              <p className="text-gray-400 text-sm text-center leading-relaxed">Faites-vous remarquer sur le terrain et éclipsez vos concurrents.</p>
            </div>
          </SpotlightCard>

          <SpotlightCard>
            <div className="flex flex-col items-center justify-center p-6 h-64 cursor-pointer hover:scale-105 transition-transform duration-200" onClick={() => router.push("/contact")}>
              <div className="mb-6">
                <UserIcon className="w-6 h-6 text-gray-700" />
              </div>
              <h2 className="text-xl font-bold text-gray-700 text-center mb-4">Agents Commerciaux</h2>
              <p className="text-gray-400 text-sm text-center leading-relaxed">Plus de soucis : nos agents s'occupent de tout ! À vous de découvrir la tranquillité.</p>
            </div>
          </SpotlightCard>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-6xl mt-30"> 
        <div className="text-center mb-10">
          <SplitText className="text-6xl font-bold text-gray-900" text="À propos de nous" />
        </div>
        <SplitText className="text-center text-gray-600" text="adaptiserv est une entreprise de services professionnels qui offre des solutions sur-mesure pour les entreprises. Nous sommes spécialisés dans le courtage en énergie, les services digitaux, la sérigraphie et les agents commerciaux." />
      </div>
      <div className="relative z-10 mt-30">
        <FooterSection />
      </div>
    </div>
  )
}
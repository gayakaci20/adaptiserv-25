"use client";

import EmailInput from "@/components/input/email-input"
import NameInputComponent from "@/components/input/name-input"
import Name2InputComponent from "@/components/input/name2-input"
import PhoneInputComponent from "@/components/input/phone-input"
import MessageInputComponent from "@/components/input/message-input"
import SiretInputComponent from "@/components/input/siret-input"
import DateInputComponent from "@/components/input/date-input"
import TimeInputComponent from "@/components/input/time-input"
import ServiceInputComponent from "@/components/input/service-input"
import { MobileNav, Navbar, NavBody, NavItems, NavbarLogo, MobileNavItems } from "@/components/ui/resizable-navbar"
import LoadingButton from "@/components/button/loading-button"
import SplitText from "@/components/text/SplitText"
import StarBorder from "@/components/button/StarBorder"

export default function ContactPage() {
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
      
      
      <div className="container mx-auto px-4 py-8 max-w-4xl mt-30 relative z-20"> 
        <SplitText className="text-6xl font-bold mb-4 text-center mb-10 text-gray-900" text="Contact" />
        <form className="space-y-6">
          {/* Prénom et Nom */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NameInputComponent />
            <Name2InputComponent />
          </div>

          {/* Email et SIRET/SIREN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EmailInput />
            <SiretInputComponent />
          </div>

          {/* Numéro de téléphone */}
          <div className="w-full">
            <PhoneInputComponent />
          </div>

          {/* Préférences de contact */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
              Préférences de contact
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <DateInputComponent />
              <TimeInputComponent />
              <div className="space-y-2">
                <div className="relative">
                    <ServiceInputComponent />
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="w-full">
            <MessageInputComponent />
          </div>
          <div className="w-full">
            <LoadingButton  />   
          </div>
        </form>
      </div>
    </div>
  )
}


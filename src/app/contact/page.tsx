"use client";

import { useState } from "react"
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
import FooterSection from "@/components/sections/footer/default"

interface FormData {
  name: string;
  name2: string;
  email: string;
  siret: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    name2: '',
    email: '',
    siret: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({
          type: 'success',
          message: result.message || 'Votre message a été envoyé avec succès!'
        });
        // Reset form
        setFormData({
          name: '',
          name2: '',
          email: '',
          siret: '',
          phone: '',
          date: '',
          time: '',
          service: '',
          message: ''
        });
      } else {
        setStatus({
          type: 'error',
          message: result.error || 'Une erreur s\'est produite lors de l\'envoi.'
        });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Une erreur réseau s\'est produite. Veuillez réessayer.'
      });
    } finally {
      setIsLoading(false);
    }
  };

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
        
        {/* Status Messages */}
        {status.type && (
          <div className={`mb-6 p-4 rounded-lg border ${
            status.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Prénom et Nom */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NameInputComponent 
              value={formData.name}
              onChange={(value: string) => handleInputChange('name', value)}
            />
            <Name2InputComponent 
              value={formData.name2}
              onChange={(value: string) => handleInputChange('name2', value)}
            />
          </div>

          {/* Email et SIRET/SIREN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EmailInput 
              value={formData.email}
              onChange={(value: string) => handleInputChange('email', value)}
            />
            <SiretInputComponent 
              value={formData.siret}
              onChange={(value: string) => handleInputChange('siret', value)}
            />
          </div>

          {/* Numéro de téléphone */}
          <div className="w-full">
            <PhoneInputComponent 
              value={formData.phone}
              onChange={(value: string) => handleInputChange('phone', value)}
            />
          </div>

          {/* Préférences de contact */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
              Préférences de contact
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <DateInputComponent 
                value={formData.date}
                onChange={(value: string) => handleInputChange('date', value)}
              />
              <TimeInputComponent 
                value={formData.time}
                onChange={(value: string) => handleInputChange('time', value)}
              />
              <div className="space-y-2">
                <div className="relative">
                  <ServiceInputComponent 
                    value={formData.service}
                    onChange={(value: string) => handleInputChange('service', value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="w-full">
            <MessageInputComponent 
              value={formData.message}
              onChange={(value: string) => handleInputChange('message', value)}
            />
          </div>
          <div className="w-full">
            <LoadingButton 
              isLoading={isLoading}
              disabled={isLoading}
              type="submit"
            />   
          </div>
        </form>
      </div>
      <div className="relative z-10 mt-30">
        <FooterSection />
      </div>
    </div>
  )
}


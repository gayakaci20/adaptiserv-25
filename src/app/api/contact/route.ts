import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

interface ContactFormData {
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

const validateFormData = (data: unknown): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data || typeof data !== 'object') {
    errors.push('Données invalides');
    return { isValid: false, errors };
  }

  const formData = data as Record<string, unknown>;

  if (!formData.name || typeof formData.name !== 'string' || formData.name.trim().length === 0) {
    errors.push('Le prénom est requis');
  }

  if (!formData.name2 || typeof formData.name2 !== 'string' || formData.name2.trim().length === 0) {
    errors.push('Le nom est requis');
  }

  if (!formData.email || typeof formData.email !== 'string') {
    errors.push('L\'email est requis');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.push('L\'email n\'est pas valide');
    }
  }

  if (!formData.phone || typeof formData.phone !== 'string' || formData.phone.trim().length === 0) {
    errors.push('Le numéro de téléphone est requis');
  }

  if (!formData.message || typeof formData.message !== 'string' || formData.message.trim().length === 0) {
    errors.push('Le message est requis');
  }

  if (!formData.service || typeof formData.service !== 'string' || formData.service.trim().length === 0) {
    errors.push('Le service est requis');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validation = validateFormData(body);
    
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Données invalides', 
          details: validation.errors 
        },
        { status: 400 }
      );
    }

    const formData: ContactFormData = {
      name: body.name.trim(),
      name2: body.name2.trim(),
      email: body.email.trim().toLowerCase(),
      siret: body.siret?.trim() || '',
      phone: body.phone.trim(),
      date: body.date?.trim() || '',
      time: body.time?.trim() || '',
      service: body.service.trim(),
      message: body.message.trim(),
    };

    const emailResult = await sendContactEmail(formData);

    if (!emailResult.success) {
      console.error('Failed to send email:', emailResult.error);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Erreur lors de l\'envoi de l\'email. Veuillez réessayer plus tard.' 
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Une erreur interne s\'est produite. Veuillez réessayer plus tard.' 
      },
      { status: 500 }
    );
  }
}

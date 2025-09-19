import nodemailer from 'nodemailer';

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

const createTransporter = () => {
  const port = parseInt(process.env.EMAIL_PORT || '465');
  const isSecure = process.env.EMAIL_SECURE !== 'false' && port === 465;
  
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: port,
    secure: isSecure,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
    debug: true,
    logger: true,
  });
};

const generateEmailTemplate = (data: ContactFormData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nouveau message de contact - adaptiserv</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
          Nouveau message de contact - adaptiserv
        </h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #374151;">Informations du contact</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 150px;">Prénom:</td>
              <td style="padding: 8px 0;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Nom:</td>
              <td style="padding: 8px 0;">${data.name2}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">SIRET/SIREN:</td>
              <td style="padding: 8px 0;">${data.siret}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Téléphone:</td>
              <td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #2563eb;">${data.phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Service:</td>
              <td style="padding: 8px 0;">${data.service}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Date souhaitée:</td>
              <td style="padding: 8px 0;">${data.date}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Heure souhaitée:</td>
              <td style="padding: 8px 0;">${data.time}</td>
            </tr>
          </table>
        </div>
        
        <div style="background-color: #fff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h3 style="margin-top: 0; color: #374151;">Message</h3>
          <p style="white-space: pre-wrap; margin: 0;">${data.message}</p>
        </div>  
        
        <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-radius: 8px; font-size: 14px; color: #6b7280;">
          <p style="margin: 0;">Ce message a été envoyé depuis le formulaire de contact du site web adaptiserv.</p>
          <p style="margin: 5px 0 0 0;">Date d'envoi: ${new Date().toLocaleString('fr-FR')}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const sendContactEmail = async (data: ContactFormData): Promise<{ success: boolean; error?: string }> => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"${data.name} ${data.name2}" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      replyTo: data.email,
      subject: `Nouveau contact - ${data.service} - ${data.name} ${data.name2}`,
      html: generateEmailTemplate(data),
      text: `
Nouveau message de contact adaptiserv

Informations du contact:
- Prénom: ${data.name}
- Nom: ${data.name2}
- Email: ${data.email}
- SIRET/SIREN: ${data.siret}
- Téléphone: ${data.phone}
- Service: ${data.service}
- Date souhaitée: ${data.date}
- Heure souhaitée: ${data.time}

Message:
${data.message}

---
Ce message a été envoyé depuis le formulaire de contact du site web adaptiserv.
Date d'envoi: ${new Date().toLocaleString('fr-FR')}
      `.trim(),
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Une erreur inconnue s\'est produite' 
    };
  }
};

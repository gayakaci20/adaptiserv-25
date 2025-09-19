import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
  try {
    const port = parseInt(process.env.EMAIL_PORT || '465');
    const isSecure = process.env.EMAIL_SECURE !== 'false' && port === 465;
    
    const transporter = nodemailer.createTransport({
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

    await transporter.verify();

    return NextResponse.json({
      success: true,
      message: 'SMTP connection successful',
      config: {
        host: process.env.EMAIL_HOST,
        port: port,
        secure: isSecure,
        user: process.env.EMAIL_USER,
      }
    });

  } catch (error) {
    console.error('SMTP Connection Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        config: {
          host: process.env.EMAIL_HOST,
          port: parseInt(process.env.EMAIL_PORT || '465'),
          user: process.env.EMAIL_USER,
        }
      },
      { status: 500 }
    );
  }
}

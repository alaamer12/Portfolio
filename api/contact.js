import { Resend } from 'resend';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get API key from environment or fallback for development
  const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_cua1PdH9_6AxroFpkaXVMQE7f5at2Xecp';
  
  // Debug environment variables
  console.log('Environment check:', {
    hasResendKey: !!RESEND_API_KEY,
    keyLength: RESEND_API_KEY?.length || 0,
    contactEmail: process.env.CONTACT_EMAIL || 'amrmuhamed86@gmail.com',
    fromEmail: process.env.FROM_EMAIL || 'onboarding@resend.dev'
  });

  // Check if API key is configured
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY environment variable is not set');
    return res.status(500).json({
      success: false,
      error: 'Server configuration error',
      message: 'Email service is not properly configured.'
    });
  }

  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        message: 'Name, email, and message are required.' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format',
        message: 'Please provide a valid email address.' 
      });
    }

    // Validate message length
    if (message.length > 5000) {
      return res.status(400).json({ 
        error: 'Message too long',
        message: 'Message must be less than 5000 characters.' 
      });
    }

    // Initialize Resend with API key
    const resend = new Resend(RESEND_API_KEY);

    // Configuration from environment variables with fallbacks
    const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'ahmedmuhmmed239@gmail.com';
    const SECONDARY_EMAIL = process.env.SECONDARY_EMAIL || 'amrmuhamed86@gmail.com';
    const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';

    // Email template for the contact form
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #3B82F6; margin-bottom: 20px; border-bottom: 2px solid #3B82F6; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #333; margin-bottom: 10px;">Contact Details:</h3>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #3B82F6;">
              <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>This email was sent from your portfolio contact form.</p>
            <p>Sent on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    `;

    // Auto-reply template
    const autoReplyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #3B82F6; margin-bottom: 20px;">
            Thank you for reaching out!
          </h2>
          
          <p style="margin-bottom: 15px;">Hi ${name},</p>
          
          <p style="margin-bottom: 15px; line-height: 1.6;">
            Thank you for contacting me through my portfolio website. I've received your message and will get back to you as soon as possible, usually within 24-48 hours.
          </p>
          
          <p style="margin-bottom: 15px; line-height: 1.6;">
            In the meantime, feel free to check out my latest projects on 
            <a href="https://github.com/alaamer12" style="color: #3B82F6; text-decoration: none;">GitHub</a> 
            or connect with me on 
            <a href="https://www.linkedin.com/in/al-aamer-0b0709265/" style="color: #3B82F6; text-decoration: none;">LinkedIn</a>.
          </p>
          
          <div style="margin: 30px 0; padding: 20px; background-color: #f8f9fa; border-radius: 5px; border-left: 4px solid #3B82F6;">
            <p style="margin: 0; font-style: italic; color: #666;">
              "Building scalable web applications and architecting complex backend systems is my passion. Let's create something amazing together!"
            </p>
          </div>
          
          <p style="margin-bottom: 15px;">
            Best regards,<br>
            <strong>Amr Muhamed</strong><br>
            Full Stack Developer
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>This is an automated response. Please do not reply to this email.</p>
          </div>
        </div>
      </div>
    `;

    console.log('📧 Attempting to send emails...');
    console.log('From:', FROM_EMAIL);
    console.log('To (main):', CONTACT_EMAIL);
    console.log('To (secondary):', SECONDARY_EMAIL);
    console.log('To (auto-reply):', email);

    // Send the main contact email to primary address
    console.log('Sending main contact email...');
    const emailResponse = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      subject: `Portfolio Contact: Message from ${name}`,
      html: emailHtml,
      replyTo: email
    });
    
    console.log('Main email response:', JSON.stringify(emailResponse, null, 2));

    // Send copy to secondary email if it's different and we have a production key
    let secondaryEmailResponse = null;
    if (SECONDARY_EMAIL !== CONTACT_EMAIL) {
      try {
        console.log('Sending copy to secondary email...');
        secondaryEmailResponse = await resend.emails.send({
          from: FROM_EMAIL,
          to: SECONDARY_EMAIL,
          subject: `[COPY] Portfolio Contact: Message from ${name}`,
          html: `
            <div style="background: #f0f9ff; padding: 10px; margin-bottom: 20px; border-left: 4px solid #3b82f6; border-radius: 4px;">
              <p style="margin: 0; color: #1e40af; font-weight: 600;">📧 This is a copy of the contact form submission</p>
            </div>
            ${emailHtml}
          `,
          replyTo: email
        });
        console.log('Secondary email response:', JSON.stringify(secondaryEmailResponse, null, 2));
      } catch (secondaryError) {
        console.log('Secondary email failed (this is expected with testing API key):', secondaryError.message);
      }
    }
    
    console.log('Main email response:', JSON.stringify(emailResponse, null, 2));

    // Send auto-reply
    console.log('Sending auto-reply email...');
    const autoReplyResponse = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Thank you for contacting me - Amr Muhamed',
      html: autoReplyHtml
    });
    
    console.log('Auto-reply response:', JSON.stringify(autoReplyResponse, null, 2));

    return res.status(200).json({
      success: true,
      message: 'Emails sent successfully!',
      emailId: emailResponse.data?.id,
      autoReplyId: autoReplyResponse.data?.id,
      debug: {
        mainEmailId: emailResponse.data?.id,
        secondaryEmailId: secondaryEmailResponse?.data?.id,
        autoReplyId: autoReplyResponse.data?.id,
        timestamp: new Date().toISOString(),
        sentTo: {
          primary: CONTACT_EMAIL,
          secondary: SECONDARY_EMAIL !== CONTACT_EMAIL ? SECONDARY_EMAIL : null
        }
      }
    });

  } catch (error) {
    console.error('Email sending failed:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Failed to send email',
      message: 'An error occurred while sending your message. Please try again later.'
    });
  }
}
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
    const { name, email, message, company, service, budget, otherService } = req.body;

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

    // Determine if this is an advanced form submission
    const isAdvancedForm = !!(company || service || budget || otherService);

    // Create email templates based on form type
    const emailHtml = isAdvancedForm ? createAdvancedEmailTemplate({
      name, email, message, company, service, budget, otherService
    }) : createSimpleEmailTemplate({ name, email, message });

    const autoReplyHtml = isAdvancedForm ? createAdvancedAutoReplyTemplate({
      name, email, company, service, budget, otherService
    }) : createSimpleAutoReplyTemplate({ name });

    // Determine subject line based on form type
    const subjectLine = isAdvancedForm 
      ? `Business Inquiry: ${service?.label || 'Project Consultation'} - ${name}${company ? ` (${company})` : ''}`
      : `Portfolio Contact: Message from ${name}`;

    console.log('📧 Attempting to send emails...');
    console.log('Form Type:', isAdvancedForm ? 'Advanced Business Form' : 'Simple Contact Form');
    console.log('From:', FROM_EMAIL);
    console.log('To (main):', CONTACT_EMAIL);
    console.log('To (secondary):', SECONDARY_EMAIL);
    console.log('To (auto-reply):', email);

    // Send the main contact email to primary address
    console.log('Sending main contact email...');
    const emailResponse = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      subject: subjectLine,
      html: emailHtml,
      replyTo: email
    });
    
    console.log('Main email response:', JSON.stringify(emailResponse, null, 2));

    // Send copy to secondary email if it's different
    let secondaryEmailResponse = null;
    if (SECONDARY_EMAIL !== CONTACT_EMAIL) {
      try {
        console.log('Sending copy to secondary email...');
        secondaryEmailResponse = await resend.emails.send({
          from: FROM_EMAIL,
          to: SECONDARY_EMAIL,
          subject: `[COPY] ${subjectLine}`,
          html: `
            <div style="background: #f0f9ff; padding: 15px; margin-bottom: 25px; border-left: 4px solid #3b82f6; border-radius: 8px;">
              <p style="margin: 0; color: #1e40af; font-weight: 600; font-size: 14px;">📧 This is a copy of the ${isAdvancedForm ? 'business inquiry' : 'contact form'} submission</p>
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

    // Send auto-reply with appropriate template
    console.log('Sending auto-reply email...');
    const autoReplyResponse = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: isAdvancedForm 
        ? `Thank you for your business inquiry - Amr Muhamed` 
        : 'Thank you for contacting me - Amr Muhamed',
      html: autoReplyHtml
    });
    
    console.log('Auto-reply response:', JSON.stringify(autoReplyResponse, null, 2));

    return res.status(200).json({
      success: true,
      message: 'Emails sent successfully!',
      formType: isAdvancedForm ? 'advanced' : 'simple',
      emailId: emailResponse.data?.id,
      autoReplyId: autoReplyResponse.data?.id,
      debug: {
        mainEmailId: emailResponse.data?.id,
        secondaryEmailId: secondaryEmailResponse?.data?.id,
        autoReplyId: autoReplyResponse.data?.id,
        timestamp: new Date().toISOString(),
        formType: isAdvancedForm ? 'advanced' : 'simple',
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


// Simple contact form email template
function createSimpleEmailTemplate({ name, email, message }) {
  return `
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
}

// Advanced business form email template
function createAdvancedEmailTemplate({ name, email, message, company, service, budget, otherService }) {
  const serviceLabel = service?.value === 'other' && otherService ? otherService : service?.label || 'Not specified';
  const budgetLabel = budget?.label || 'Not specified';

  return `
    <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
      <div style="background-color: white; padding: 35px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
        
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #3B82F6;">
          <h1 style="color: #1e40af; margin: 0; font-size: 28px; font-weight: bold;">Business Inquiry</h1>
          <p style="color: #64748b; margin: 8px 0 0 0; font-size: 16px;">New project consultation request</p>
        </div>

        <!-- Contact Information Section -->
        <div style="margin-bottom: 30px; background-color: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
          <h2 style="color: #065f46; margin: 0 0 15px 0; font-size: 20px; display: flex; align-items: center;">
            <span style="background-color: #10b981; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 14px; margin-right: 10px;">👤</span>
            Contact Information
          </h2>
          <div style="display: grid; gap: 8px;">
            <p style="margin: 0; display: flex;"><strong style="color: #374151; min-width: 80px;">Name:</strong> <span style="color: #1f2937;">${name}</span></p>
            <p style="margin: 0; display: flex;"><strong style="color: #374151; min-width: 80px;">Email:</strong> <span style="color: #1f2937;">${email}</span></p>
            ${company ? `<p style="margin: 0; display: flex;"><strong style="color: #374151; min-width: 80px;">Company:</strong> <span style="color: #1f2937;">${company}</span></p>` : ''}
          </div>
        </div>

        <!-- Service Requirements Section -->
        <div style="margin-bottom: 30px; background-color: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
          <h2 style="color: #92400e; margin: 0 0 15px 0; font-size: 20px; display: flex; align-items: center;">
            <span style="background-color: #f59e0b; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 14px; margin-right: 10px;">🎯</span>
            Service Requirements
          </h2>
          <div style="display: grid; gap: 8px;">
            <p style="margin: 0; display: flex; align-items: flex-start;"><strong style="color: #374151; min-width: 120px;">Service Type:</strong> <span style="color: #1f2937;">${serviceLabel}</span></p>
            <p style="margin: 0; display: flex;"><strong style="color: #374151; min-width: 120px;">Project Budget:</strong> <span style="color: #1f2937;">${budgetLabel}</span></p>
          </div>
        </div>

        <!-- Project Details Section -->
        <div style="margin-bottom: 30px; background-color: #ede9fe; padding: 20px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
          <h2 style="color: #5b21b6; margin: 0 0 15px 0; font-size: 20px; display: flex; align-items: center;">
            <span style="background-color: #8b5cf6; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 14px; margin-right: 10px;">💼</span>
            Project Details
          </h2>
          <div style="background-color: white; padding: 16px; border-radius: 6px; border: 1px solid #d1d5db;">
            <p style="margin: 0; line-height: 1.7; color: #374151; white-space: pre-wrap; font-size: 15px;">${message}</p>
          </div>
        </div>

        <!-- Next Steps Section -->
        <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin-bottom: 25px;">
          <h3 style="color: #065f46; margin: 0 0 12px 0; font-size: 18px; display: flex; align-items: center;">
            <span style="background-color: #10b981; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 14px; margin-right: 10px;">🚀</span>
            Next Steps
          </h3>
          <ul style="margin: 0; padding-left: 20px; color: #374151; line-height: 1.6;">
            <li>Review project requirements and scope</li>
            <li>Prepare initial consultation and project estimate</li>
            <li>Schedule discovery call within 24-48 hours</li>
            <li>Discuss timeline, deliverables, and technical approach</li>
          </ul>
        </div>

        <!-- Footer -->
        <div style="margin-top: 35px; padding-top: 25px; border-top: 2px solid #e5e7eb; color: #6b7280; font-size: 13px; text-align: center;">
          <p style="margin: 0 0 5px 0;">This business inquiry was submitted through your portfolio website.</p>
          <p style="margin: 0; font-weight: 600;">Submitted on: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  `;
}

// Simple auto-reply template
function createSimpleAutoReplyTemplate({ name }) {
  return `
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
          <a href="www.linkedin.com/in/amr-muhamed" style="color: #3B82F6; text-decoration: none;">LinkedIn</a>.
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
}

// Advanced auto-reply template for business inquiries
function createAdvancedAutoReplyTemplate({ name, company, service, budget, otherService }) {
  const serviceLabel = service?.value === 'other' && otherService ? otherService : service?.label || 'your project';
  const budgetLabel = budget?.label || 'not specified';

  return `
    <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
      <div style="background-color: white; padding: 35px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
        
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #3B82F6;">
          <h1 style="color: #1e40af; margin: 0; font-size: 26px;">Thank You for Your Business Inquiry!</h1>
          <p style="color: #64748b; margin: 8px 0 0 0;">Professional consultation acknowledgment</p>
        </div>

        <!-- Greeting -->
        <div style="margin-bottom: 25px;">
          <p style="margin-bottom: 15px; font-size: 16px; color: #374151;">
            Dear ${name}${company ? ` from ${company}` : ''},
          </p>
          
          <p style="margin-bottom: 20px; line-height: 1.7; color: #374151;">
            Thank you for reaching out regarding <strong style="color: #1e40af;">${serviceLabel}</strong>. 
            I've received your business inquiry and am excited about the potential opportunity to collaborate on your project.
          </p>
        </div>

        <!-- Inquiry Summary -->
        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #3b82f6;">
          <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">📋 Your Inquiry Summary</h3>
          <ul style="margin: 0; padding-left: 20px; color: #374151; line-height: 1.6;">
            <li><strong>Service Interest:</strong> ${serviceLabel}</li>
            <li><strong>Budget Range:</strong> ${budgetLabel}</li>
            ${company ? `<li><strong>Organization:</strong> ${company}</li>` : ''}
            <li><strong>Inquiry Date:</strong> ${new Date().toLocaleDateString()}</li>
          </ul>
        </div>

        <!-- Next Steps -->
        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #10b981;">
          <h3 style="color: #065f46; margin: 0 0 15px 0; font-size: 18px;">🚀 What Happens Next</h3>
          <ol style="margin: 0; padding-left: 20px; color: #374151; line-height: 1.7;">
            <li><strong>Initial Review</strong> - I'll carefully review your project requirements (within 24 hours)</li>
            <li><strong>Consultation Call</strong> - We'll schedule a discovery call to discuss your needs in detail</li>
            <li><strong>Project Proposal</strong> - You'll receive a comprehensive proposal with timeline and pricing</li>
            <li><strong>Kickoff</strong> - Once approved, we'll begin bringing your vision to life</li>
          </ol>
        </div>

        <!-- Professional Links -->
        <div style="background-color: #fefbf2; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #f59e0b;">
          <h3 style="color: #92400e; margin: 0 0 15px 0; font-size: 18px;">🔗 Meanwhile, Explore My Work</h3>
          <p style="margin-bottom: 15px; line-height: 1.6; color: #374151;">
            While I prepare your consultation, feel free to review my recent projects and technical expertise:
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 15px;">
            <a href="https://github.com/alaamer12" style="color: #f59e0b; text-decoration: none; font-weight: 600; padding: 8px 16px; background-color: white; border-radius: 6px; border: 2px solid #f59e0b; display: inline-block;">
              GitHub Portfolio →
            </a>
            <a href="www.linkedin.com/in/amr-muhamed" style="color: #f59e0b; text-decoration: none; font-weight: 600; padding: 8px 16px; background-color: white; border-radius: 6px; border: 2px solid #f59e0b; display: inline-block;">
              LinkedIn Profile →
            </a>
          </div>
        </div>

        <!-- Professional Quote -->
        <div style="background-color: #fdf4ff; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #8b5cf6;">
          <blockquote style="margin: 0; font-style: italic; color: #5b21b6; font-size: 16px; line-height: 1.7; text-align: center;">
            "Every great project starts with understanding the unique challenges and goals. 
            I'm committed to delivering solutions that not only meet your technical requirements 
            but also drive meaningful business results."
          </blockquote>
          <p style="text-align: center; margin: 15px 0 0 0; color: #5b21b6; font-weight: 600;">
            - Amr Muhamed, Full Stack Developer
          </p>
        </div>

        <!-- Contact Information -->
        <div style="text-align: center; padding: 20px 0; border-top: 2px solid #e5e7eb;">
          <p style="margin: 0 0 10px 0; color: #374151;">
            <strong>Amr Muhamed</strong><br>
            Full Stack Developer & Data Engineer<br>
            <a href="mailto:amrmuhamed86@gmail.com" style="color: #3b82f6; text-decoration: none;">amrmuhamed86@gmail.com</a>
          </p>
          <p style="margin: 15px 0 0 0; color: #6b7280; font-size: 12px;">
            This is an automated professional response. I'll personally follow up with you soon.
          </p>
        </div>
      </div>
    </div>
  `;
}
import { supabase } from '@/integrations/supabase/client';

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export interface EmailTemplateData {
  eventName: string;
  applicantName: string;
  message: string;
  eventDate?: string;
  eventVenue?: string;
}

export class EmailService {
  static async sendEmail(options: EmailOptions) {
    try {
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: options.to,
          subject: options.subject,
          html: options.html,
          from: options.from,
        },
      });

      if (error) {
        console.error('Error sending email:', error);
        throw new Error(`Failed to send email: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Email service error:', error);
      throw error;
    }
  }

  static generateEventEmailTemplate(data: EmailTemplateData & { subject?: string }): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.subject || 'Event Update'}</title>
  <style>
    /* Brand Fonts */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@600;700&display=swap');

    body {
      font-family: 'Inter', sans-serif;
      line-height: 1.6;
      color: #2E2E2E; /* NAMESPACE Black */
      max-width: 640px;
      margin: 0 auto;
      padding: 0;
      background: #F4F4F6;
    }

    .container {
      background: #FFFFFF;
      border-radius: 12px;
      overflow: hidden;
      margin: 30px 16px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    }

    .header {
      background: linear-gradient(135deg, #8100C4 0%, #A240E6 100%);
      color: #E6E6E6; /* NAMESPACE White */
      padding: 40px 24px;
      text-align: center;
    }
    .header h1 {
      font-family: 'Sora', sans-serif;
      font-size: 28px;
      margin: 0;
      letter-spacing: -0.5px;
    }

    .content {
      padding: 32px 28px;
      background: #FFFFFF;
    }

    .content h2 {
      font-family: 'Sora', sans-serif;
      font-size: 20px;
      margin-bottom: 16px;
      color: #8100C4;
    }

    .event-info {
      background: #F9F5FF;
      padding: 20px;
      border-radius: 10px;
      margin: 20px 0;
      border-left: 5px solid #8100C4;
    }
    .event-info h3 {
      font-family: 'Sora', sans-serif;
      font-size: 18px;
      margin-top: 0;
      margin-bottom: 8px;
      color: #2E2E2E;
    }
    .event-info p {
      margin: 6px 0;
      font-size: 15px;
    }

    .message {
      background: #FDFDFE;
      border: 1px solid #EEE;
      padding: 20px;
      border-radius: 10px;
      margin: 24px 0;
      font-size: 15px;
      line-height: 1.6;
    }

    .signature {
      margin-top: 28px;
      font-size: 15px;
      font-weight: 500;
    }

    .footer {
      text-align: center;
      padding: 20px;
      color: #666;
      font-size: 13px;
      background: #F9F9FB;
      border-top: 1px solid #EEE;
    }

    .footer p {
      margin: 6px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>NAMESPACE Ecosystem</h1>
    </div>

    <div class="content">
      <h2>Hello ${data.applicantName},</h2>

      <div class="event-info">
        <h3>${data.eventName}</h3>
        ${data.eventDate ? `<p><strong>Date:</strong> ${data.eventDate}</p>` : ''}
        ${data.eventVenue ? `<p><strong>Venue:</strong> ${data.eventVenue}</p>` : ''}
      </div>

      <div class="message">
        ${data.message}
      </div>

      <p class="signature">Best regards,<br>Team NAMESPACE</p>
    </div>

    <div class="footer">
      <p>You are receiving this email because you registered for an event on NAMESPACE.</p>
      <p>If you have any questions, please contact our support team.</p>
    </div>
  </div>
</body>
</html>
    `;
  }

  static async sendBulkEmails(
    recipients: Array<{ email: string; name: string }>,
    subject: string,
    htmlTemplate: string,
    from?: string
  ) {
    try {
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          recipients,
          subject,
          htmlTemplate,
          from,
        },
      });

      if (error) {
        console.error('Error sending bulk emails:', error);
        throw new Error(`Failed to send bulk emails: ${error.message}`);
      }

      return data.results;
    } catch (error) {
      console.error('Bulk email service error:', error);
      throw error;
    }
  }
}

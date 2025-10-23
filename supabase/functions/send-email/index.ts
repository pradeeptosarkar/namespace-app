import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};

const handler = async (req) => {
  console.log(`Received ${req.method} request to send-email function`);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log('Request body:', JSON.stringify(body, null, 2));

    if (body.recipients) {
      const { recipients, subject, htmlTemplate, from } = body;
      console.log(`Sending email to ${recipients.length} recipients`);

      const results = [];
      for (const recipient of recipients) {
        try {
          const personalizedHtml = htmlTemplate
            .replace(/\$\{data\.applicantName\}/g, recipient.name)
            .replace(/{{name}}/g, recipient.name)
            .replace(/{{email}}/g, recipient.email);

          const emailResponse = await resend.emails.send({
            from: from || 'NAMESPACE <contact@namespacecomm.in>',
            to: recipient.email,
            subject,
            html: personalizedHtml,
          });

          results.push({
            email: recipient.email,
            status: 'success',
            data: emailResponse
          });
        } catch (error) {
          console.error(`Error sending email to ${recipient.email}:`, error);
          results.push({
            email: recipient.email,
            status: 'error',
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
        // Wait to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      return new Response(JSON.stringify({ results }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    } else {
      const { to, subject, html, from } = body;
      const emailResponse = await resend.emails.send({
        from: from || 'NAMESPACE <contact@namespacecomm.in>',
        to,
        subject,
        html
      });

      return new Response(JSON.stringify(emailResponse), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }
  } catch (error) {
    console.error("Error in send-email function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }
};

serve(handler);

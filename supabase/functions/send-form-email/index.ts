import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface FormSubmission {
  type: 'book_call' | 'volunteer' | 'investor';
  data: any;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data }: FormSubmission = await req.json();

    let emailSubject = '';
    let emailHtml = '';

    switch (type) {
      case 'book_call':
        emailSubject = `New Book Call Request from ${data.name}`;
        emailHtml = `
          <h2>New Book Call Request</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Contact Number:</strong> ${data.contact_number}</p>
          <p><strong>Available Time:</strong> ${data.available_time}</p>
          <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
        `;
        break;
      
      case 'volunteer':
        emailSubject = `New Volunteer Application from ${data.full_name}`;
        emailHtml = `
          <h2>New Volunteer Application</h2>
          <p><strong>Name:</strong> ${data.full_name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>How they heard about us:</strong> ${data.hear_about_us}</p>
          <p><strong>Interests:</strong> ${data.interests?.join(', ')}</p>
          <p><strong>Skills:</strong> ${data.skills}</p>
          <p><strong>Availability (2-5 hours/week):</strong> ${data.availability}</p>
          <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
        `;
        break;
      
      case 'investor':
        emailSubject = `New Partnership Proposal from ${data.full_name}`;
        emailHtml = `
          <h2>New Partnership Proposal</h2>
          <p><strong>Name:</strong> ${data.full_name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Organization:</strong> ${data.organization}</p>
          <p><strong>Website:</strong> ${data.website || 'Not provided'}</p>
          <p><strong>Role/Title:</strong> ${data.role}</p>
          <p><strong>Nature of Interest:</strong> ${data.nature_of_interest}</p>
          <p><strong>Interested Verticals:</strong> ${data.verticals?.join(', ')}</p>
          <p><strong>Proposal:</strong> ${data.proposal}</p>
          <p><strong>Contact Method:</strong> ${data.contact_method}</p>
          <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
        `;
        break;
      
      default:
        throw new Error('Invalid form type');
    }

    const emailResponse = await resend.emails.send({
      from: "Yashray Foundation <onboarding@resend.dev>",
      to: ["Team@Yashray.in"],
      subject: emailSubject,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-form-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
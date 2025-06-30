
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AppointmentData {
  full_name: string;
  email: string;
  phone: string;
  treatment_type: string;
  preferred_date: string;
  preferred_time: string;
  special_requests?: string;
  booking_reference: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const appointmentData: AppointmentData = await req.json();

    // Send email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "Niramaya Wellness <bookings@resend.dev>",
      to: [appointmentData.email],
      subject: "🌿 Appointment Confirmation - Niramaya Wellness",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #10b981, #059669); padding: 40px 20px; border-radius: 20px;">
          <div style="background: white; padding: 40px; border-radius: 15px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #059669; font-size: 32px; margin: 0; font-weight: 700;">🌿 Niramaya</h1>
              <p style="color: #6b7280; font-size: 16px; margin: 5px 0 0 0;">Holistic Wellness Center</p>
            </div>
            
            <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 20px; text-align: center;">Your Appointment is Confirmed!</h2>
            
            <div style="background: linear-gradient(135deg, #f0fdf4, #ecfdf5); padding: 25px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #10b981;">
              <h3 style="color: #059669; margin-top: 0; font-size: 18px;">Appointment Details</h3>
              <p style="margin: 8px 0; color: #374151;"><strong>Name:</strong> ${appointmentData.full_name}</p>
              <p style="margin: 8px 0; color: #374151;"><strong>Treatment:</strong> ${appointmentData.treatment_type}</p>
              <p style="margin: 8px 0; color: #374151;"><strong>Date:</strong> ${appointmentData.preferred_date}</p>
              <p style="margin: 8px 0; color: #374151;"><strong>Time:</strong> ${appointmentData.preferred_time}</p>
              <p style="margin: 8px 0; color: #374151;"><strong>Phone:</strong> ${appointmentData.phone}</p>
              <p style="margin: 8px 0; color: #374151;"><strong>Booking Reference:</strong> <span style="background: #10b981; color: white; padding: 4px 8px; border-radius: 6px; font-weight: bold;">${appointmentData.booking_reference}</span></p>
              ${appointmentData.special_requests ? `<p style="margin: 8px 0; color: #374151;"><strong>Special Requests:</strong> ${appointmentData.special_requests}</p>` : ''}
            </div>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 10px; margin-bottom: 25px; border-left: 4px solid #f59e0b;">
              <h4 style="color: #92400e; margin-top: 0; font-size: 16px;">📋 What to Expect</h4>
              <ul style="color: #78350f; margin: 0; padding-left: 20px;">
                <li>Please arrive 15 minutes early for check-in</li>
                <li>Bring comfortable clothing</li>
                <li>Avoid heavy meals 2 hours before your appointment</li>
                <li>Stay hydrated throughout the day</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #6b7280; font-size: 14px; margin-bottom: 20px;">Need to reschedule or have questions?</p>
              <p style="color: #6b7280; font-size: 14px;">📞 +91 98765 43210 | 📧 hello@niramaya.com</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                Thank you for choosing Niramaya Wellness<br>
                Your journey to wellness begins here 🙏
              </p>
            </div>
          </div>
        </div>
      `,
    });

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "Niramaya Bookings <bookings@resend.dev>",
      to: ["adityaraj1613@gmail.com"],
      subject: `🔔 New Appointment Booking - ${appointmentData.booking_reference}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #1f2937; padding: 40px 20px; border-radius: 20px;">
          <div style="background: white; padding: 40px; border-radius: 15px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #dc2626; font-size: 28px; margin: 0;">🔔 New Appointment Alert</h1>
              <p style="color: #6b7280; font-size: 16px;">Niramaya Wellness Center</p>
            </div>
            
            <div style="background: #fef2f2; padding: 25px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #dc2626;">
              <h3 style="color: #dc2626; margin-top: 0;">Customer Details</h3>
              <p><strong>Name:</strong> ${appointmentData.full_name}</p>
              <p><strong>Email:</strong> ${appointmentData.email}</p>
              <p><strong>Phone:</strong> ${appointmentData.phone}</p>
              <p><strong>Treatment:</strong> ${appointmentData.treatment_type}</p>
              <p><strong>Date:</strong> ${appointmentData.preferred_date}</p>
              <p><strong>Time:</strong> ${appointmentData.preferred_time}</p>
              <p><strong>Booking Reference:</strong> <strong>${appointmentData.booking_reference}</strong></p>
              ${appointmentData.special_requests ? `<p><strong>Special Requests:</strong> ${appointmentData.special_requests}</p>` : ''}
            </div>
            
            <div style="text-align: center; background: #f3f4f6; padding: 20px; border-radius: 10px;">
              <p style="margin: 0; color: #374151; font-weight: 600;">Please confirm this appointment in your system</p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Emails sent successfully:", { customerEmailResponse, adminEmailResponse });

    return new Response(JSON.stringify({ 
      success: true, 
      customerEmailResponse, 
      adminEmailResponse 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-appointment-email function:", error);
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

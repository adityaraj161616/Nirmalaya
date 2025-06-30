
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { CheckCircle, Calendar, Download, Printer, Home, Mail, Phone, MapPin, Clock, User } from 'lucide-react';

const BookingSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [bookingReference, setBookingReference] = useState<string>('');
  const [appointmentData, setAppointmentData] = useState<any>(null);

  useEffect(() => {
    // Get booking data from navigation state
    if (location.state?.bookingReference) {
      setBookingReference(location.state.bookingReference);
      setAppointmentData(location.state.appointmentData);
    } else {
      // If no booking reference, redirect to home
      navigate('/');
      return;
    }

    // GSAP Animations
    const ctx = gsap.context(() => {
      gsap.fromTo('.success-container', 
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
      );
      
      gsap.fromTo('.success-card', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1, 
          delay: 0.3,
          ease: 'power2.out' 
        }
      );

      // Floating animation for icons
      gsap.to('.floating-icon', {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.3
      });
    });

    return () => ctx.revert();
  }, [location.state, navigate]);

  const generateAppointmentSlip = () => {
    if (!appointmentData) return;

    const slipContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Appointment Slip - Niramaya Wellness</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; }
          .slip { background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { text-align: center; border-bottom: 3px solid #10b981; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { color: #10b981; font-size: 32px; font-weight: bold; margin-bottom: 5px; }
          .subtitle { color: #6b7280; font-size: 16px; }
          .section { margin-bottom: 25px; padding: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; border-left: 4px solid #10b981; }
          .section h3 { color: #1e293b; margin-top: 0; font-size: 18px; margin-bottom: 15px; }
          .detail { margin: 10px 0; color: #334155; font-size: 15px; }
          .detail strong { color: #1e293b; }
          .reference { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 10px 20px; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 18px; }
          .instructions { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 20px; margin-top: 20px; }
          .instructions h4 { color: #92400e; margin-top: 0; }
          .instructions ul { color: #78350f; margin: 0; padding-left: 20px; }
          .instructions li { margin: 5px 0; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #e2e8f0; color: #6b7280; font-size: 14px; }
          .qr-placeholder { width: 100px; height: 100px; background: #e2e8f0; border: 2px dashed #94a3b8; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin: 20px auto; color: #64748b; font-size: 12px; text-align: center; }
          @media print { 
            body { margin: 0; background: white; } 
            .slip { box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <div class="slip">
          <div class="header">
            <div class="logo">🌿 Niramaya</div>
            <div class="subtitle">Holistic Wellness Center</div>
            <h2 style="color: #1e293b; margin-top: 20px; font-size: 24px;">Appointment Confirmation Slip</h2>
          </div>
          
          <div style="text-align: center; margin-bottom: 30px;">
            <div class="reference">${appointmentData.booking_reference}</div>
            <p style="margin-top: 10px; color: #6b7280; font-size: 14px;">Please keep this reference number for your records</p>
          </div>
          
          <div class="section">
            <h3>👤 Patient Information</h3>
            <div class="detail"><strong>Name:</strong> ${appointmentData.full_name}</div>
            <div class="detail"><strong>Email:</strong> ${appointmentData.email}</div>
            <div class="detail"><strong>Phone:</strong> ${appointmentData.phone}</div>
          </div>
          
          <div class="section">
            <h3>🌿 Treatment Details</h3>
            <div class="detail"><strong>Treatment:</strong> ${appointmentData.treatment_type}</div>
            <div class="detail"><strong>Date:</strong> ${new Date(appointmentData.preferred_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
            <div class="detail"><strong>Time:</strong> ${appointmentData.preferred_time}</div>
            ${appointmentData.special_requests ? `<div class="detail"><strong>Special Notes:</strong> ${appointmentData.special_requests}</div>` : ''}
          </div>
          
          <div class="section">
            <h3>📍 Location & Contact</h3>
            <div class="detail"><strong>Address:</strong> 123 Wellness Street, Mumbai, Maharashtra 400001</div>
            <div class="detail"><strong>Phone:</strong> +91 98765 43210</div>
            <div class="detail"><strong>Email:</strong> hello@niramaya.com</div>
            <div class="detail"><strong>Website:</strong> www.niramaya.com</div>
          </div>
          
          <div class="instructions">
            <h4>📋 Important Instructions</h4>
            <ul>
              <li><strong>Arrival:</strong> Please arrive 15 minutes early for check-in and preparation</li>
              <li><strong>Clothing:</strong> Wear comfortable, loose-fitting clothes suitable for your treatment</li>
              <li><strong>Food:</strong> Avoid heavy meals 2-3 hours before your appointment</li>
              <li><strong>Hydration:</strong> Stay well-hydrated throughout the day</li>
              <li><strong>Documentation:</strong> Bring this slip and a valid ID for verification</li>
              <li><strong>Cancellation:</strong> Please call at least 24 hours in advance for cancellations</li>
            </ul>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-top: 30px;">
            <div>
              <h4 style="color: #1e293b; margin-bottom: 10px;">Booking Status</h4>
              <div style="background: #dcfce7; color: #166534; padding: 8px 16px; border-radius: 6px; font-weight: bold;">CONFIRMED</div>
            </div>
            <div class="qr-placeholder">
              QR Code<br>
              (For Digital<br>
              Check-in)
            </div>
          </div>
          
          <div class="footer">
            <p><strong>Thank you for choosing Niramaya Wellness Center</strong></p>
            <p>Your journey to holistic wellness begins here 🙏</p>
            <p style="margin-top: 15px; font-size: 12px;">Generated on: ${new Date().toLocaleString()}</p>
            <p style="font-size: 12px;">This is a computer-generated slip and does not require a signature</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(slipContent);
      printWindow.document.close();
      printWindow.focus();
    }
  };

  const downloadAppointmentSlip = () => {
    if (!appointmentData) return;

    const slipContent = `
NIRAMAYA WELLNESS CENTER
🌿 Holistic Wellness Center
========================

APPOINTMENT CONFIRMATION SLIP
============================

Booking Reference: ${appointmentData.booking_reference}

PATIENT INFORMATION
==================
Name: ${appointmentData.full_name}
Email: ${appointmentData.email}
Phone: ${appointmentData.phone}

TREATMENT DETAILS
================
Treatment: ${appointmentData.treatment_type}
Date: ${new Date(appointmentData.preferred_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
Time: ${appointmentData.preferred_time}
${appointmentData.special_requests ? `Special Notes: ${appointmentData.special_requests}` : ''}

LOCATION & CONTACT
==================
Address: 123 Wellness Street, Mumbai, Maharashtra 400001
Phone: +91 98765 43210
Email: hello@niramaya.com
Website: www.niramaya.com

IMPORTANT INSTRUCTIONS
======================
• ARRIVAL: Please arrive 15 minutes early for check-in
• CLOTHING: Wear comfortable, loose-fitting clothes
• FOOD: Avoid heavy meals 2-3 hours before appointment
• HYDRATION: Stay well-hydrated throughout the day
• DOCUMENTATION: Bring this slip and valid ID
• CANCELLATION: Call at least 24 hours in advance

STATUS: CONFIRMED ✓

Thank you for choosing Niramaya Wellness Center
Your journey to holistic wellness begins here 🙏

Generated on: ${new Date().toLocaleString()}
This is a computer-generated slip and does not require a signature.
    `;

    const blob = new Blob([slipContent], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Niramaya_Appointment_${appointmentData.booking_reference}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (!bookingReference) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 py-12">
      <div ref={containerRef} className="success-container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="floating-icon inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your wellness journey is about to begin. We've sent a confirmation email with all the details.
          </p>
        </div>

        {/* Booking Reference */}
        <div className="success-card bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Booking Reference</h2>
          <div className="text-4xl font-black tracking-wider bg-white/20 rounded-xl py-4 px-6 inline-block">
            {bookingReference}
          </div>
          <p className="mt-4 text-green-100">
            Please save this reference number for your records
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="success-card bg-white rounded-2xl p-8 shadow-xl border border-green-100">
            <div className="floating-icon inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <Printer className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Print Appointment Slip</h3>
            <p className="text-gray-600 mb-6">
              Generate a detailed appointment slip with all your booking information and important instructions.
            </p>
            <button
              onClick={generateAppointmentSlip}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 inline-flex items-center justify-center"
            >
              <Printer className="h-5 w-5 mr-2" />
              Print Slip
            </button>
          </div>

          <div className="success-card bg-white rounded-2xl p-8 shadow-xl border border-green-100">
            <div className="floating-icon inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
              <Download className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Download Slip</h3>
            <p className="text-gray-600 mb-6">
              Download your appointment details as a text file that you can save or share easily.
            </p>
            <button
              onClick={downloadAppointmentSlip}
              className="w-full bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors duration-300 inline-flex items-center justify-center"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Slip
            </button>
          </div>
        </div>

        {/* Appointment Details Summary */}
        {appointmentData && (
          <div className="success-card bg-white rounded-2xl p-8 shadow-xl border border-green-100 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calendar className="h-6 w-6 text-green-600 mr-3" />
              Appointment Summary
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <span className="text-sm text-gray-500">Patient Name</span>
                    <p className="font-semibold text-gray-900">{appointmentData.full_name}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <span className="text-sm text-gray-500">Email</span>
                    <p className="font-semibold text-gray-900">{appointmentData.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <span className="text-sm text-gray-500">Phone</span>
                    <p className="font-semibold text-gray-900">{appointmentData.phone}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <span className="text-sm text-gray-500">Treatment</span>
                    <p className="font-semibold text-gray-900">{appointmentData.treatment_type}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <span className="text-sm text-gray-500">Date</span>
                    <p className="font-semibold text-gray-900">
                      {new Date(appointmentData.preferred_date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <span className="text-sm text-gray-500">Time</span>
                    <p className="font-semibold text-gray-900">{appointmentData.preferred_time}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="success-card bg-amber-50 rounded-2xl p-8 border border-amber-200 mb-12">
          <h3 className="text-2xl font-bold text-amber-900 mb-6">What's Next?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-4">
                <Mail className="h-6 w-6 text-amber-600" />
              </div>
              <h4 className="font-semibold text-amber-900 mb-2">Check Your Email</h4>
              <p className="text-amber-700 text-sm">We've sent detailed instructions and preparation guidelines</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-4">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <h4 className="font-semibold text-amber-900 mb-2">Arrive Early</h4>
              <p className="text-amber-700 text-sm">Please arrive 15 minutes before your appointment time</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-amber-600" />
              </div>
              <h4 className="font-semibold text-amber-900 mb-2">Find Us</h4>
              <p className="text-amber-700 text-sm">123 Wellness Street, Mumbai, Maharashtra 400001</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <Link
            to="/"
            className="inline-flex items-center bg-green-600 text-white px-12 py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition-colors duration-300"
          >
            <Home className="h-5 w-5 mr-3" />
            Return to Home
          </Link>
          <p className="text-gray-500 text-sm">
            Need help? Contact us at +91 98765 43210 or hello@niramaya.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;

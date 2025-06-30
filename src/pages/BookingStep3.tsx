import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowLeft, CheckCircle, User, Calendar, Clock, Stethoscope, CreditCard, Loader, Download, Printer } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface BookingSummary {
  patientInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    age: string;
    gender: string;
  };
  treatmentInfo: {
    treatment: string;
    doctor: string;
    date: string;
    time: string;
  };
}

const BookingStep3 = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [bookingData, setBookingData] = useState<BookingSummary | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingReference, setBookingReference] = useState<string>('');

  const treatments = {
    panchakarma: { name: 'Panchakarma Detox', price: 14400, duration: '90 min' },
    abhyanga: { name: 'Abhyanga Massage', price: 9600, duration: '60 min' },
    shirodhara: { name: 'Shirodhara Therapy', price: 12000, duration: '45 min' },
    consultation: { name: 'Herbal Consultation', price: 6400, duration: '30 min' }
  };

  const doctors = {
    'dr-sharma': 'Dr. Priya Sharma',
    'dr-patel': 'Dr. Arjun Patel',
    'dr-krishna': 'Dr. Maya Krishna'
  };

  useEffect(() => {
    // Check if user completed previous steps
    const savedData = localStorage.getItem('ayursoothe-booking');
    if (!savedData) {
      navigate('/book/step-1');
      return;
    }

    const parsedData = JSON.parse(savedData);
    if (!parsedData.patientInfo || !parsedData.treatmentInfo) {
      navigate('/book/step-1');
      return;
    }

    setBookingData(parsedData);

    // GSAP Animation
    const ctx = gsap.context(() => {
      gsap.fromTo('.confirmation-container', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
      
      gsap.fromTo('.summary-card', 
        { opacity: 0, x: -30 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.6, 
          stagger: 0.1, 
          delay: 0.3,
          ease: 'power2.out' 
        }
      );

      // Add magnetic effect to submit button
      const submitButton = document.querySelector('.submit-button');
      if (submitButton) {
        submitButton.addEventListener('mousemove', (e: any) => {
          const rect = submitButton.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(submitButton, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        submitButton.addEventListener('mouseleave', () => {
          gsap.to(submitButton, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      }
    });

    return () => ctx.revert();
  }, [navigate]);

  const generateAppointmentSlip = (appointmentData: any) => {
    const slipContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Appointment Slip - Niramaya Wellness</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; border-bottom: 2px solid #10b981; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { color: #10b981; font-size: 28px; font-weight: bold; margin-bottom: 5px; }
          .subtitle { color: #6b7280; font-size: 14px; }
          .section { margin-bottom: 25px; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; }
          .section h3 { color: #1f2937; margin-top: 0; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px; }
          .detail { margin: 8px 0; }
          .reference { background: #10b981; color: white; padding: 8px 16px; border-radius: 6px; display: inline-block; font-weight: bold; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🌿 Niramaya</div>
          <div class="subtitle">Holistic Wellness Center</div>
          <h2 style="color: #1f2937; margin-top: 20px;">Appointment Confirmation Slip</h2>
        </div>
        
        <div class="section">
          <h3>📋 Appointment Details</h3>
          <div class="detail"><strong>Booking Reference:</strong> <span class="reference">${appointmentData.booking_reference}</span></div>
          <div class="detail"><strong>Patient Name:</strong> ${appointmentData.full_name}</div>
          <div class="detail"><strong>Treatment:</strong> ${appointmentData.treatment_type}</div>
          <div class="detail"><strong>Date:</strong> ${appointmentData.preferred_date}</div>
          <div class="detail"><strong>Time:</strong> ${appointmentData.preferred_time}</div>
          <div class="detail"><strong>Phone:</strong> ${appointmentData.phone}</div>
          <div class="detail"><strong>Email:</strong> ${appointmentData.email}</div>
          ${appointmentData.special_requests ? `<div class="detail"><strong>Special Requests:</strong> ${appointmentData.special_requests}</div>` : ''}
        </div>
        
        <div class="section">
          <h3>📍 Location & Contact</h3>
          <div class="detail"><strong>Address:</strong> 123 Wellness Street, Mumbai, Maharashtra 400001</div>
          <div class="detail"><strong>Phone:</strong> +91 98765 43210</div>
          <div class="detail"><strong>Email:</strong> hello@niramaya.com</div>
        </div>
        
        <div class="section">
          <h3>ℹ️ Important Instructions</h3>
          <ul>
            <li>Please arrive 15 minutes early for check-in</li>
            <li>Bring comfortable clothing suitable for your treatment</li>
            <li>Avoid heavy meals 2 hours before your appointment</li>
            <li>Stay hydrated throughout the day</li>
            <li>Bring this slip and a valid ID for verification</li>
          </ul>
        </div>
        
        <div class="footer">
          <p>Thank you for choosing Niramaya Wellness Center</p>
          <p>Your journey to wellness begins here 🙏</p>
          <p>Generated on: ${new Date().toLocaleString()}</p>
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
      printWindow.print();
    }
  };

  const downloadAppointmentSlip = (appointmentData: any) => {
    const slipContent = `
NIRAMAYA WELLNESS CENTER
🌿 Holistic Wellness Center
========================

APPOINTMENT CONFIRMATION SLIP
============================

Booking Reference: ${appointmentData.booking_reference}
Patient Name: ${appointmentData.full_name}
Treatment: ${appointmentData.treatment_type}
Date: ${appointmentData.preferred_date}
Time: ${appointmentData.preferred_time}
Phone: ${appointmentData.phone}
Email: ${appointmentData.email}
${appointmentData.special_requests ? `Special Requests: ${appointmentData.special_requests}` : ''}

LOCATION & CONTACT
==================
Address: 123 Wellness Street, Mumbai, Maharashtra 400001
Phone: +91 98765 43210
Email: hello@niramaya.com

IMPORTANT INSTRUCTIONS
======================
• Please arrive 15 minutes early for check-in
• Bring comfortable clothing suitable for your treatment
• Avoid heavy meals 2 hours before your appointment
• Stay hydrated throughout the day
• Bring this slip and a valid ID for verification

Thank you for choosing Niramaya Wellness Center
Your journey to wellness begins here 🙏

Generated on: ${new Date().toLocaleString()}
    `;

    const blob = new Blob([slipContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Niramaya_Appointment_${appointmentData.booking_reference}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleConfirmBooking = async () => {
    if (!bookingData) return;

    setIsSubmitting(true);

    try {
      // Prepare appointment data for Supabase
      const appointmentData = {
        full_name: `${bookingData.patientInfo.firstName} ${bookingData.patientInfo.lastName}`,
        email: bookingData.patientInfo.email,
        phone: bookingData.patientInfo.phone,
        treatment_type: treatments[bookingData.treatmentInfo.treatment as keyof typeof treatments].name,
        preferred_date: bookingData.treatmentInfo.date,
        preferred_time: bookingData.treatmentInfo.time,
        special_requests: `Age: ${bookingData.patientInfo.age}, Gender: ${bookingData.patientInfo.gender}, Doctor: ${doctors[bookingData.treatmentInfo.doctor as keyof typeof doctors]}`
      };

      // Insert appointment into Supabase
      const { data: insertedData, error: insertError } = await supabase
        .from('appointments')
        .insert([appointmentData])
        .select()
        .single();

      if (insertError) {
        throw new Error(`Database error: ${insertError.message}`);
      }

      console.log('Appointment saved to database:', insertedData);
      setBookingReference(insertedData.booking_reference);

      // Send email notification
      const emailResponse = await fetch('/functions/v1/send-appointment-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...appointmentData,
          booking_reference: insertedData.booking_reference
        })
      });

      if (!emailResponse.ok) {
        console.warn('Email sending failed, but appointment was saved');
      } else {
        console.log('Email notifications sent successfully');
      }

      // Show success animation
      gsap.to('.confirmation-container', {
        scale: 0.95,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          setShowSuccess(true);
          gsap.fromTo('.success-animation', 
            { scale: 0, opacity: 0 },
            { 
              scale: 1, 
              opacity: 1, 
              duration: 0.6, 
              ease: 'back.out(1.7)',
              onComplete: () => {
                // Clear localStorage
                localStorage.removeItem('ayursoothe-booking');
                
                // Navigate to success page after showing success
                setTimeout(() => {
                  navigate('/booking-success', { 
                    state: { 
                      bookingReference: insertedData.booking_reference,
                      appointmentData: { ...appointmentData, booking_reference: insertedData.booking_reference }
                    }
                  });
                }, 3000);
              }
            }
          );
        }
      });
    } catch (error) {
      console.error('Booking error:', error);
      alert(`Booking failed: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
      setIsSubmitting(false);
    }
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  const selectedTreatment = bookingData && treatments[bookingData.treatmentInfo.treatment as keyof typeof treatments];
  const selectedDoctor = bookingData && doctors[bookingData.treatmentInfo.doctor as keyof typeof doctors];

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 flex items-center justify-center">
        <div className="success-animation text-center max-w-md mx-auto px-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-4">
            Your appointment has been successfully booked.
          </p>
          <p className="text-green-600 font-semibold mb-8">
            Booking Reference: {bookingReference}
          </p>
          <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-gray-500 mt-4">Redirecting to confirmation page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 py-8">
      {/* Navigation */}
      <nav className="mb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/book/step-2')}
            className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Treatment Selection
          </button>
        </div>
      </nav>

      {/* Progress Indicator */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 opacity-50">
            <div className="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full font-semibold">
              ✓
            </div>
            <span className="text-green-600 font-semibold">Patient Information</span>
          </div>
          <div className="flex items-center space-x-4 opacity-50">
            <div className="w-20 h-1 bg-green-600 rounded"></div>
            <div className="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full font-semibold">
              ✓
            </div>
            <span className="text-green-600 font-semibold">Treatment Selection</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-1 bg-green-600 rounded"></div>
            <div className="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full font-semibold">
              3
            </div>
            <span className="text-green-600 font-semibold">Confirmation</span>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="confirmation-container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Confirm Your Booking</h2>
          <p className="text-xl text-gray-600">Please review your appointment details below</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Patient Information */}
          <div className="summary-card bg-white rounded-2xl p-6 shadow-xl border border-green-100">
            <div className="flex items-center mb-4">
              <User className="h-6 w-6 text-green-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Patient Information</h3>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Name</span>
                <p className="font-medium text-gray-900">
                  {bookingData?.patientInfo.firstName} {bookingData?.patientInfo.lastName}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Email</span>
                <p className="font-medium text-gray-900">{bookingData?.patientInfo.email}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Phone</span>
                <p className="font-medium text-gray-900">{bookingData?.patientInfo.phone}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Age</span>
                  <p className="font-medium text-gray-900">{bookingData?.patientInfo.age}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Gender</span>
                  <p className="font-medium text-gray-900 capitalize">{bookingData?.patientInfo.gender}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Treatment Details */}
          <div className="summary-card bg-white rounded-2xl p-6 shadow-xl border border-green-100">
            <div className="flex items-center mb-4">
              <Stethoscope className="h-6 w-6 text-green-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Treatment Details</h3>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Treatment</span>
                <p className="font-medium text-gray-900">{bookingData && treatments[bookingData.treatmentInfo.treatment as keyof typeof treatments].name}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Doctor</span>
                <p className="font-medium text-gray-900">{bookingData && doctors[bookingData.treatmentInfo.doctor as keyof typeof doctors]}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Duration</span>
                <p className="font-medium text-gray-900">{bookingData && treatments[bookingData.treatmentInfo.treatment as keyof typeof treatments].duration}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Price</span>
                <p className="font-medium text-green-600 text-xl">₹{bookingData && treatments[bookingData.treatmentInfo.treatment as keyof typeof treatments].price.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>

          {/* Appointment Schedule */}
          <div className="summary-card bg-white rounded-2xl p-6 shadow-xl border border-green-100">
            <div className="flex items-center mb-4">
              <Calendar className="h-6 w-6 text-green-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Appointment Schedule</h3>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Date</span>
                <p className="font-medium text-gray-900">
                  {bookingData && new Date(bookingData.treatmentInfo.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Time</span>
                <p className="font-medium text-gray-900">{bookingData?.treatmentInfo.time}</p>
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700">
                  Please arrive 10 minutes early for your appointment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-xl border border-green-100">
          <div className="flex items-center mb-4">
            <CreditCard className="h-6 w-6 text-green-600 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">Payment Summary</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{bookingData && treatments[bookingData.treatmentInfo.treatment as keyof typeof treatments].name}</span>
              <span className="font-medium text-gray-900">₹{bookingData && treatments[bookingData.treatmentInfo.treatment as keyof typeof treatments].price.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Booking Fee</span>
              <span className="font-medium text-gray-900">Free</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-green-600">₹{bookingData && treatments[bookingData.treatmentInfo.treatment as keyof typeof treatments].price.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleConfirmBooking}
            disabled={isSubmitting}
            className="submit-button bg-green-600 text-white px-12 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none inline-flex items-center"
          >
            {isSubmitting ? (
              <>
                <Loader className="h-5 w-5 animate-spin mr-3" />
                Confirming Booking...
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5 mr-3" />
                Confirm Booking
              </>
            )}
          </button>
          <p className="text-sm text-gray-500 mt-4">
            You will receive email confirmation and can generate your appointment slip after booking
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingStep3;

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowLeft, CheckCircle, User, Calendar, Clock, Stethoscope, CreditCard, Loader } from 'lucide-react';

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

  const handleConfirmBooking = async () => {
    if (!bookingData) return;

    setIsSubmitting(true);

    // Prepare booking data
    const bookingPayload = {
      patientInfo: bookingData.patientInfo,
      treatmentInfo: bookingData.treatmentInfo,
      timestamp: new Date().toISOString(),
      totalAmount: treatments[bookingData.treatmentInfo.treatment as keyof typeof treatments].price,
      bookingId: `AYU-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    };

    try {
      // Mock API call - simulate booking submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Log booking for demo purposes
      console.log('Booking submitted:', bookingPayload);
      
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
                
                // Navigate to success page after 2 seconds
                setTimeout(() => {
                  navigate('/booking-success');
                }, 2000);
              }
            }
          );
        }
      });
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
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
          <p className="text-gray-600 mb-8">
            Your appointment has been successfully booked. You will receive a confirmation email shortly.
          </p>
          <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
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
            Payment will be collected at the time of your appointment
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingStep3;

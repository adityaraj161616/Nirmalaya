
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { CheckCircle, Calendar, Home, Phone, Mail } from 'lucide-react';

const BookingSuccess = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.success-container', 
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.8, 
          ease: 'back.out(1.7)' 
        }
      );
      
      gsap.fromTo('.success-content > *', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1, 
          delay: 0.4,
          ease: 'power2.out' 
        }
      );

      // Floating animation for the check icon
      gsap.to('.floating-check', {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 flex items-center justify-center py-8">
      <div ref={containerRef} className="success-container max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="success-content bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-green-100">
          {/* Success Icon */}
          <div className="floating-check inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-8">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Booking Confirmed!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Your Ayurvedic treatment appointment has been successfully booked. 
            We're excited to help you on your wellness journey!
          </p>

          {/* What's Next */}
          <div className="bg-green-50 rounded-2xl p-6 mb-8 text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 text-green-600 mr-2" />
              What happens next?
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                You'll receive a confirmation email with all appointment details
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Our team will call you 24 hours before your appointment
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Please arrive 10 minutes early for your consultation
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Bring any relevant medical records or medications
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-4 mb-8 text-left">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <Phone className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-semibold text-gray-900">Call Us</span>
              </div>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <Mail className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-semibold text-gray-900">Email Us</span>
              </div>
              <p className="text-gray-600">info@ayursoothe.com</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/"
              className="inline-flex items-center justify-center bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
            >
              <Home className="h-5 w-5 mr-2" />
              Return to Home
            </Link>
            <Link 
              to="/book/step-1"
              className="inline-flex items-center justify-center border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Book Another Appointment
            </Link>
          </div>

          {/* Preparation Tips */}
          <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <h4 className="font-semibold text-amber-800 mb-2">💡 Preparation Tips</h4>
            <p className="text-sm text-amber-700">
              For the best treatment experience, avoid heavy meals 2 hours before your appointment 
              and wear comfortable, loose-fitting clothing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowRight, ArrowLeft, Clock, Star, Calendar, User } from 'lucide-react';

interface Treatment {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  icon: string;
}

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  availability: string[];
  image: string;
}

interface BookingData {
  treatment: string;
  doctor: string;
  date: string;
  time: string;
}

const BookingStep2 = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [bookingData, setBookingData] = useState<BookingData>({
    treatment: '',
    doctor: '',
    date: '',
    time: ''
  });
  const [errors, setErrors] = useState<Partial<BookingData>>({});
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  const treatments: Treatment[] = [
    {
      id: 'panchakarma',
      name: 'Panchakarma Detox',
      description: 'Complete body purification and rejuvenation therapy',
      duration: '90 min',
      price: '₹14,400',
      icon: '🌿'
    },
    {
      id: 'abhyanga',
      name: 'Abhyanga Massage',
      description: 'Full body oil massage for deep relaxation',
      duration: '60 min',
      price: '₹9,600',
      icon: '💆‍♀️'
    },
    {
      id: 'shirodhara',
      name: 'Shirodhara Therapy',
      description: 'Continuous oil pouring for mental clarity',
      duration: '45 min',
      price: '₹12,000',
      icon: '🧘‍♂️'
    },
    {
      id: 'consultation',
      name: 'Herbal Consultation',
      description: 'Personalized Ayurvedic health assessment',
      duration: '30 min',
      price: '₹6,400',
      icon: '🌱'
    }
  ];

  const doctors: Doctor[] = [
    {
      id: 'dr-patel',
      name: 'Dr. Arjun Patel',
      specialization: 'Mind & Spirit Wellness',
      experience: '12 years',
      rating: 4.9,
      availability: ['shirodhara', 'consultation'],
      image: 'https://plus.unsplash.com/premium_photo-1661686321968-98fc885d00b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGRyfGVufDB8fDB8fHww'
    },
    {
      id: 'dr-sharma',
      name: 'Dr. Priya Sharma',
      specialization: 'Panchakarma & Detox',
      experience: '15 years',
      rating: 4.9,
      availability: ['panchakarma', 'abhyanga'],
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
    },
    {
      id: 'dr-krishna',
      name: 'Dr. Maya Krishna',
      specialization: 'General Ayurvedic Practice',
      experience: '10 years',
      rating: 4.7,
      availability: ['abhyanga', 'consultation', 'panchakarma'],
      image: 'https://plus.unsplash.com/premium_photo-1661341423936-40b48564a5bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGRyfGVufDB8fDB8fHww'
    }
  ];

  useEffect(() => {
    // Check if user completed step 1
    const savedData = localStorage.getItem('ayursoothe-booking');
    if (!savedData) {
      navigate('/book/step-1');
      return;
    }

    const parsedData = JSON.parse(savedData);
    if (parsedData.treatmentInfo) {
      setBookingData(parsedData.treatmentInfo);
    }

    // GSAP Animation
    const ctx = gsap.context(() => {
      gsap.fromTo('.step-container', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
      
      gsap.fromTo('.treatment-card', 
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.6, 
          stagger: 0.1, 
          delay: 0.3,
          ease: 'back.out(1.7)' 
        }
      );

      // Add magnetic effect to buttons
      const magneticButtons = document.querySelectorAll('.magnetic-button');
      magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e: any) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(button, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });
    });

    return () => ctx.revert();
  }, [navigate]);

  useEffect(() => {
    if (bookingData.treatment && bookingData.doctor && bookingData.date) {
      // Generate available times based on selected date
      const times = [
        '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
      ];
      setAvailableTimes(times);
    }
  }, [bookingData.treatment, bookingData.doctor, bookingData.date]);

  const handleTreatmentSelect = (treatmentId: string) => {
    setBookingData(prev => ({ ...prev, treatment: treatmentId, doctor: '', date: '', time: '' }));
    setErrors(prev => ({ ...prev, treatment: '' }));
    
    // Animate selection
    gsap.to('.treatment-card', {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
    
    gsap.to(`.treatment-card[data-id="${treatmentId}"]`, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleDoctorSelect = (doctorId: string) => {
    const doctor = doctors.find(d => d.id === doctorId);
    setSelectedDoctor(doctor || null);
    setBookingData(prev => ({ ...prev, doctor: doctorId, date: '', time: '' }));
    setErrors(prev => ({ ...prev, doctor: '' }));
  };

  const handleDateChange = (date: string) => {
    setBookingData(prev => ({ ...prev, date, time: '' }));
    setErrors(prev => ({ ...prev, date: '' }));
  };

  const handleTimeSelect = (time: string) => {
    setBookingData(prev => ({ ...prev, time }));
    setErrors(prev => ({ ...prev, time: '' }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<BookingData> = {};

    if (!bookingData.treatment) {
      newErrors.treatment = 'Please select a treatment';
    }

    if (!bookingData.doctor) {
      newErrors.doctor = 'Please select a doctor';
    }

    if (!bookingData.date) {
      newErrors.date = 'Please select a date';
    }

    if (!bookingData.time) {
      newErrors.time = 'Please select a time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    // Save to localStorage
    const savedData = JSON.parse(localStorage.getItem('ayursoothe-booking') || '{}');
    const updatedData = {
      ...savedData,
      treatmentInfo: bookingData,
      currentStep: 2
    };
    localStorage.setItem('ayursoothe-booking', JSON.stringify(updatedData));

    navigate('/book/step-3');
  };

  const availableDoctors = doctors.filter(doctor => 
    doctor.availability.includes(bookingData.treatment)
  );

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 py-8">
      {/* Navigation */}
      <nav className="mb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/book/step-1')}
            className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Patient Info
          </button>
        </div>
      </nav>

      {/* Progress Indicator */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 opacity-50">
            <div className="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full font-semibold">
              ✓
            </div>
            <span className="text-green-600 font-semibold">Patient Information</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-1 bg-green-600 rounded"></div>
            <div className="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full font-semibold">
              2
            </div>
            <span className="text-green-600 font-semibold">Treatment Selection</span>
          </div>
          <div className="flex items-center space-x-4 opacity-50">
            <div className="w-20 h-1 bg-gray-200 rounded"></div>
            <div className="flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-500 rounded-full font-semibold">
              3
            </div>
            <span className="text-gray-500">Confirmation</span>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="step-container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Treatment Selection */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Your Treatment</h2>
          <p className="text-gray-600 mb-8">Choose the Ayurvedic treatment that best suits your needs</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {treatments.map((treatment) => (
              <div
                key={treatment.id}
                data-id={treatment.id}
                onClick={() => handleTreatmentSelect(treatment.id)}
                className={`treatment-card cursor-pointer bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 magnetic-button ${
                  bookingData.treatment === treatment.id 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-100 hover:border-green-300'
                }`}
              >
                <div className="text-4xl mb-4">{treatment.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{treatment.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{treatment.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {treatment.duration}
                  </span>
                  <span className="font-semibold text-green-600">{treatment.price}</span>
                </div>
              </div>
            ))}
          </div>
          {errors.treatment && (
            <p className="mt-2 text-red-600">{errors.treatment}</p>
          )}
        </div>

        {/* Doctor Selection */}
        {bookingData.treatment && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Doctor</h2>
            <p className="text-gray-600 mb-8">Select from our experienced Ayurvedic practitioners</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  onClick={() => handleDoctorSelect(doctor.id)}
                  className={`cursor-pointer bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 magnetic-button ${
                    bookingData.doctor === doctor.id 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-100 hover:border-green-300'
                  }`}
                >
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{doctor.name}</h3>
                    <p className="text-green-600 font-medium mb-2">{doctor.specialization}</p>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-2">
                      <span>{doctor.experience}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        {doctor.rating}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {errors.doctor && (
              <p className="mt-2 text-red-600">{errors.doctor}</p>
            )}
          </div>
        )}

        {/* Date and Time Selection */}
        {bookingData.doctor && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Select Date & Time</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Date Selection */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  <Calendar className="inline h-5 w-5 mr-2" />
                  Choose Date
                </label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => handleDateChange(e.target.value)}
                  min={getTomorrowDate()}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
                    errors.date 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-green-500'
                  }`}
                />
                {errors.date && (
                  <p className="mt-1 text-red-600">{errors.date}</p>
                )}
              </div>

              {/* Time Selection */}
              {bookingData.date && (
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    <Clock className="inline h-5 w-5 mr-2" />
                    Available Times
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={`px-4 py-3 rounded-lg border-2 transition-all duration-300 font-medium magnetic-button ${
                          bookingData.time === time
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-green-300 text-gray-700'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  {errors.time && (
                    <p className="mt-2 text-red-600">{errors.time}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Continue Button */}
        {bookingData.treatment && bookingData.doctor && bookingData.date && bookingData.time && (
          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 inline-flex items-center magnetic-button"
            >
              Continue to Confirmation
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingStep2;

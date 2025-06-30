import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, Users, Leaf, Star, ArrowRight, Phone, Mail, MapPin, Instagram, Twitter, Facebook, Youtube, Heart, Award, Shield, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const treatmentsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation for hero title
      const splitText = (element: Element, className: string) => {
        const text = element.textContent || '';
        element.innerHTML = text.split('').map(char =>
          `<span class="${className}">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
      };

      document.querySelectorAll('.split-text').forEach(el => splitText(el, 'char'));

      // Hero Animations - More advanced
      gsap.fromTo('.char',
        { opacity: 0, y: 100, rotationX: 90 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.02,
          ease: 'back.out(1.7)',
          delay: 0.5
        }
      );

      // Liquid morphing animation
      gsap.fromTo('.liquid-hero',
        {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          scale: 0.8,
          opacity: 0
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scale: 1,
          opacity: 1,
          duration: 1.5,
          delay: 0.8,
          ease: 'power3.out'
        }
      );

      // Advanced blob morphing
      if (blobRef.current) {
        gsap.to(blobRef.current, {
          duration: 15,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          attr: {
            d: 'M60,0.5C93.1,0.5 120,27.4 120,60.5C120,93.6 93.1,120.5 60,120.5C26.9,120.5 0,93.6 0,60.5C0,27.4 26.9,0.5 60,0.5Z'
          },
          transformOrigin: 'center center'
        });
      }

      // Scroll-triggered reveals with more sophisticated timing
      const revealElements = gsap.utils.toArray('.reveal-element');
      revealElements.forEach((element: any, index) => {
        gsap.fromTo(element,
          {
            y: 100,
            opacity: 0,
            scale: 0.8,
            rotationY: 45
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse',
              onEnter: () => {
                gsap.to(element, {
                  boxShadow: '0 25px 50px rgba(34, 197, 94, 0.2)',
                  duration: 0.5
                });
              }
            }
          }
        );
      });

      // Infinite scroll text animation
      gsap.to('.infinite-scroll', {
        xPercent: -100,
        repeat: -1,
        duration: 20,
        ease: 'none'
      });

      // Treatment cards with advanced hover animations
      document.querySelectorAll('.advanced-card').forEach(card => {
        const tl = gsap.timeline({ paused: true });

        tl.to(card, {
          y: -20,
          scale: 1.05,
          rotationY: 5,
          boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
          duration: 0.4,
          ease: 'power2.out'
        });

        card.addEventListener('mouseenter', () => tl.play());
        card.addEventListener('mouseleave', () => tl.reverse());
      });

      // Staggered stats animation
      gsap.fromTo('.stat-number',
        { innerHTML: 0 },
        {
          innerHTML: (i, target) => target.dataset.value,
          duration: 2,
          ease: 'power2.out',
          snap: { innerHTML: 1 },
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.stats-section',
            start: 'top 80%',
          }
        }
      );

      // Image parallax effects
      gsap.utils.toArray('.parallax-image').forEach((img: any) => {
        gsap.fromTo(img,
          { y: -50, scale: 1.1 },
          {
            y: 50,
            scrollTrigger: {
              trigger: img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      });

      // Page transitions
      gsap.set('.page-transition', { scaleX: 0 });

      document.querySelectorAll('a[href^="/"]').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const href = (e.target as HTMLAnchorElement).getAttribute('href');

          gsap.to('.page-transition', {
            scaleX: 1,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: () => {
              window.location.href = href || '/';
            }
          });
        });
      });

    });

    return () => ctx.revert();
  }, []);

  const treatments = [
    {
      name: 'Panchakarma Detox',
      description: 'Complete body purification and rejuvenation therapy',
      duration: '90 min',
      price: '₹14,400',
      icon: '🌿',
      gradient: 'from-emerald-400 to-teal-600'
    },
    {
      name: 'Abhyanga Massage',
      description: 'Full body oil massage for deep relaxation',
      duration: '60 min',
      price: '₹9,600',
      icon: '💆‍♀️',
      gradient: 'from-blue-400 to-indigo-600'
    },
    {
      name: 'Shirodhara Therapy',
      description: 'Continuous oil pouring for mental clarity',
      duration: '45 min',
      price: '₹12,000',
      icon: '🧘‍♂️',
      gradient: 'from-purple-400 to-pink-600'
    },
    {
      name: 'Herbal Consultation',
      description: 'Personalized Ayurvedic health assessment',
      duration: '30 min',
      price: '₹6,400',
      icon: '🌱',
      gradient: 'from-amber-400 to-orange-600'
    }
  ];

  const animatedNavigate = (to: string) => {
    gsap.to('.page-transition', {
      scaleX: 1,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        navigate(to);
        setTimeout(() => {
          gsap.set('.page-transition', { scaleX: 0 });
        }, 300);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden font-inter">
      {/* Page Transition Overlay */}
      <div className="page-transition fixed inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 z-50 origin-left" />

      {/* Infinite Scroll Text */}
      <div className="overflow-hidden whitespace-nowrap bg-emerald-600 text-white py-3 text-sm font-medium tracking-wider">
        <div className="infinite-scroll inline-block">
          ✨ Ancient Wisdom • Modern Healing • Natural Wellness • Ayurvedic Excellence • Mind Body Soul •
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-40 shadow-sm border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Leaf className="h-12 w-12 text-emerald-600" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse" />
              </div>
              <div>
                <span className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent tracking-tight">Niramaya</span>
                <div className="text-sm text-emerald-600 font-medium tracking-wide -mt-1">Holistic Wellness</div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-10">
              <a href="#treatments" className="relative text-gray-700 hover:text-emerald-600 transition-colors group font-medium text-lg tracking-wide">
                Treatments
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all group-hover:w-full" />
              </a>
              <a href="#about" className="relative text-gray-700 hover:text-emerald-600 transition-colors group font-medium text-lg tracking-wide">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all group-hover:w-full" />
              </a>
              <a href="#contact" className="relative text-gray-700 hover:text-emerald-600 transition-colors group font-medium text-lg tracking-wide">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all group-hover:w-full" />
              </a>
              <button
                type="button"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 py-4 rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group font-bold text-lg tracking-wide"
                onClick={() => animatedNavigate('/book/step-1')}
              >
                <span className="relative z-10">Book Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-24 overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800">
            <defs>
              <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path
              ref={blobRef}
              d="M60,0.5C93.1,0.5 120,27.4 120,60.5C120,93.6 93.1,120.5 60,120.5C26.9,120.5 0,93.6 0,60.5C0,27.4 26.9,0.5 60,0.5Z"
              fill="url(#blobGradient)"
              transform="scale(8) translate(50, 30)"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="liquid-hero">
                <h1 className="text-7xl lg:text-9xl font-black text-gray-900 leading-none tracking-tighter">
                  <span className="split-text block">Heal</span>
                  <span className="split-text block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Naturally</span>
                </h1>
              </div>

              <div className="reveal-element">
                <p className="text-2xl text-gray-600 leading-relaxed max-w-xl font-light tracking-wide">
                  Experience the transformative power of ancient Ayurvedic wisdom combined with modern wellness practices. Your journey to holistic health starts here.
                </p>
              </div>

              <div className="reveal-element flex flex-col sm:flex-row gap-8">
                <button
                  type="button"
                  className="group relative inline-flex items-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-12 py-6 rounded-2xl text-xl font-bold hover:shadow-2xl transition-all duration-500 overflow-hidden tracking-wide"
                  onClick={() => animatedNavigate('/book/step-1')}
                >
                  <span className="relative z-10 flex items-center">
                    Begin Your Journey
                    <ArrowRight className="ml-4 h-7 w-7 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>

                <Link
                  to="/discover-more"
                  className="group inline-flex items-center border-2 border-emerald-600 text-emerald-600 px-12 py-6 rounded-2xl text-xl font-bold hover:bg-emerald-50 transition-all duration-300 tracking-wide"
                >
                  <Heart className="mr-4 h-7 w-7 group-hover:scale-110 transition-transform" />
                  Discover More
                </Link>
              </div>
            </div>

            <div className="reveal-element relative">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
                <img
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                  alt="Ayurvedic Treatment"
                  className="parallax-image relative rounded-3xl shadow-2xl w-full h-96 object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-8 shadow-xl">
                  <div className="flex items-center space-x-4">
                    <Star className="h-10 w-10 text-yellow-500" />
                    <div>
                      <div className="font-black text-gray-900 text-2xl">4.9/5</div>
                      <div className="text-lg text-gray-600 font-medium">1000+ Reviews</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-32 bg-gradient-to-br from-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="reveal-element">
              <h2 className="text-6xl lg:text-7xl font-black text-gray-900 mb-8 tracking-tighter leading-none">
                Experience <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Tranquility</span>
              </h2>
              <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed tracking-wide">
                Immerse yourself in our serene wellness environment designed for complete relaxation and healing
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="reveal-element group">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                  alt="Ayurvedic Herbs"
                  className="parallax-image w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xl font-bold">Pure Herbs</h3>
                  <p className="text-sm">Organic & Natural</p>
                </div>
              </div>
            </div>

            <div className="reveal-element group">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                  alt="Meditation Space"
                  className="parallax-image w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xl font-bold">Peaceful Setting</h3>
                  <p className="text-sm">Mindful Meditation</p>
                </div>
              </div>
            </div>

            <div className="reveal-element group">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                  alt="Natural Therapy"
                  className="parallax-image w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xl font-bold">Natural Healing</h3>
                  <p className="text-sm">Ancient Wisdom</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-24 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="reveal-element text-center">
              <div className="stat-number text-6xl lg:text-7xl font-black mb-4 tracking-tighter" data-value="2500">0</div>
              <div className="text-emerald-100 font-medium text-xl tracking-widest uppercase">Happy Clients</div>
            </div>
            <div className="reveal-element text-center">
              <div className="stat-number text-6xl lg:text-7xl font-black mb-4 tracking-tighter" data-value="15">0</div>
              <div className="text-emerald-100 font-medium text-xl tracking-widest uppercase">Years Experience</div>
            </div>
            <div className="reveal-element text-center">
              <div className="stat-number text-6xl lg:text-7xl font-black mb-4 tracking-tighter" data-value="50">0</div>
              <div className="text-emerald-100 font-medium text-xl tracking-widest uppercase">Treatments</div>
            </div>
            <div className="reveal-element text-center">
              <div className="stat-number text-6xl lg:text-7xl font-black mb-4 tracking-tighter" data-value="98">0</div>
              <div className="text-emerald-100 font-medium text-xl tracking-widest uppercase">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments Section */}
      <section id="treatments" ref={treatmentsRef} className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="reveal-element">
              <h2 className="text-6xl lg:text-7xl font-black text-gray-900 mb-8 tracking-tighter leading-none">
                Our <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Treatments</span>
              </h2>
              <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light tracking-wide">
                Discover our comprehensive range of authentic Ayurvedic treatments, each designed to restore your natural balance and vitality.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {treatments.map((treatment, index) => (
              <div key={index} className={`advanced-card reveal-element group bg-gradient-to-br ${treatment.gradient} rounded-3xl p-10 text-white relative overflow-hidden cursor-pointer`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="relative z-10">
                  <div className="text-6xl mb-8 group-hover:scale-110 transition-transform duration-300">
                    {treatment.icon}
                  </div>
                  <h3 className="text-3xl font-black mb-6 tracking-tight leading-tight">{treatment.name}</h3>
                  <p className="text-white/90 mb-8 leading-relaxed text-lg font-light tracking-wide">{treatment.description}</p>
                  <div className="flex items-center justify-between mb-8">
                    <span className="flex items-center text-white/80 text-lg font-medium">
                      <Clock className="h-6 w-6 mr-3" />
                      {treatment.duration}
                    </span>
                    <span className="font-black text-3xl tracking-tight">{treatment.price}</span>
                  </div>
                  <Link
                    to="/book/step-1"
                    className="w-full bg-white/20 backdrop-blur-sm text-white py-5 px-8 rounded-xl hover:bg-white/30 transition-all duration-300 text-center block font-bold text-lg group-hover:transform group-hover:scale-105 tracking-wide"
                  >
                    Book Treatment
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-32 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="about-content space-y-10 reveal-element">
              <h2 className="text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter leading-tight">
                Ancient Wisdom for
                <span className="block text-emerald-600">Modern Wellness</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed font-light tracking-wide">
                At Niramaya, we bridge the gap between traditional Ayurvedic practices and contemporary wellness needs. Our certified practitioners bring decades of experience in authentic healing methods.
              </p>
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <Star className="h-8 w-8 text-emerald-600 mt-2" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-2xl mb-3 tracking-tight">Personalized Treatment Plans</h4>
                    <p className="text-gray-600 text-lg font-light leading-relaxed">Every treatment is customized based on your unique constitution and health goals.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <Users className="h-8 w-8 text-emerald-600 mt-2" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-2xl mb-3 tracking-tight">Expert Practitioners</h4>
                    <p className="text-gray-600 text-lg font-light leading-relaxed">Our team consists of certified Ayurvedic doctors and experienced therapists.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <Leaf className="h-8 w-8 text-emerald-600 mt-2" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-2xl mb-3 tracking-tight">Natural & Organic</h4>
                    <p className="text-gray-600 text-lg font-light leading-relaxed">We use only premium, organic herbs and oils in all our treatments.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative reveal-element">
              <img
                src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt="Mountain Serenity"
                className="parallax-image rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-32 bg-gradient-to-r from-emerald-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="cta-content space-y-12 reveal-element">
            <h2 className="text-5xl lg:text-6xl font-black text-white tracking-tighter leading-tight">
              Ready to Begin Your
              <span className="block">Healing Journey?</span>
            </h2>
            <p className="text-2xl text-green-100 leading-relaxed max-w-3xl mx-auto font-light tracking-wide">
              Take the first step towards natural wellness. Book your consultation today and discover the transformative power of Ayurveda.
            </p>
            <Link
              to="/book/step-1"
              className="inline-flex items-center bg-white text-green-600 px-12 py-6 rounded-full text-xl font-bold hover:bg-green-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl tracking-wide"
            >
              <Calendar className="mr-4 h-7 w-7" />
              Book Your Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* Advanced Footer */}
      <footer id="contact" className="bg-gray-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 opacity-50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main Footer Content */}
          <div className="py-20 grid lg:grid-cols-4 md:grid-cols-2 gap-16">
            {/* Brand Section */}
            <div className="reveal-element space-y-8">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Leaf className="h-14 w-14 text-emerald-400" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse" />
                </div>
                <div>
                  <h3 className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent tracking-tight">Niramaya</h3>
                  <p className="text-emerald-400 text-lg font-medium tracking-wide">Holistic Wellness</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg font-light tracking-wide">
                Transforming lives through ancient Ayurvedic wisdom and modern wellness practices. Your journey to complete well-being starts here.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://instagram.com" className="group bg-gradient-to-r from-pink-500 to-rose-500 p-3 rounded-xl hover:scale-110 transition-all duration-300 border border-pink-400/20 flex items-center justify-center">
                  <Instagram className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                </a>
                <a href="https://facebook.com" className="group bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-xl hover:scale-110 transition-all duration-300 border border-blue-400/20 flex items-center justify-center">
                  <Facebook className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                </a>
                <a href="https://twitter.com" className="group bg-gradient-to-r from-sky-400 to-blue-500 p-3 rounded-xl hover:scale-110 transition-all duration-300 border border-sky-400/20 flex items-center justify-center">
                  <Twitter className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                </a>
                <a href="https://youtube.com" className="group bg-gradient-to-r from-red-500 to-red-600 p-3 rounded-xl hover:scale-110 transition-all duration-300 border border-red-400/20 flex items-center justify-center">
                  <Youtube className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="reveal-element">
              <h4 className="text-2xl font-black mb-10 text-emerald-400 border-b border-emerald-400/20 pb-4 tracking-tight text-center">Quick Links</h4>
              <ul className="space-y-6">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'About Us', href: '#about' },
                  { name: 'Treatments', href: '#treatments' },
                  { name: 'Contact', href: '#contact' }
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 flex items-center group py-3 px-4 rounded-lg hover:bg-emerald-400/10 border border-transparent hover:border-emerald-400/20 text-lg font-medium tracking-wide"
                    >
                      <ArrowRight className="h-5 w-5 mr-3 group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100" />
                      {link.name}
                    </a>
                  </li>
                ))}
                <li>
                  <Link
                    to="/book/step-1"
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 flex items-center group py-3 px-4 rounded-lg hover:bg-emerald-400/10 border border-transparent hover:border-emerald-400/20 text-lg font-medium tracking-wide"
                  >
                    <Calendar className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                    Book Appointment
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="reveal-element">
              <h4 className="text-2xl font-black mb-10 text-emerald-400 border-b border-emerald-400/20 pb-4 tracking-tight text-center">Our Services</h4>
              <ul className="space-y-6">
                {[
                  'Panchakarma Detox',
                  'Abhyanga Massage',
                  'Shirodhara Therapy',
                  'Herbal Consultation',
                  'Yoga & Meditation'
                ].map((service, index) => (
                  <li key={index}>
                    <Link
                      to="/book/step-1"
                      className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 flex items-center group py-3 px-4 rounded-lg hover:bg-emerald-400/10 border border-transparent hover:border-emerald-400/20 text-lg font-medium tracking-wide"
                    >
                      <Leaf className="h-5 w-5 mr-3 text-emerald-400 group-hover:rotate-12 transition-transform" />
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="reveal-element">
              <h4 className="text-2xl font-black mb-10 text-emerald-400 border-b border-emerald-400/20 pb-4 tracking-tight text-center">Get in Touch</h4>
              <div className="space-y-8">
                <div className="flex items-start space-x-5 p-5 rounded-lg bg-emerald-400/5 border border-emerald-400/20">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-lg">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-lg font-medium">123 Wellness Street</p>
                    <p className="text-gray-300 text-lg font-medium">Mumbai, Maharashtra 400001</p>
                  </div>
                </div>

                <a href="tel:+919876543210" className="flex items-center space-x-5 group hover:text-emerald-400 transition-colors p-5 rounded-lg hover:bg-emerald-400/5 border border-transparent hover:border-emerald-400/20">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-lg group-hover:scale-110 transition-transform">
                    <Phone className="h-6 w-6" />
                  </div>
                  <span className="text-lg font-medium tracking-wide">+91 98765 43210</span>
                </a>

                <a href="mailto:hello@niramaya.com" className="flex items-center space-x-5 group hover:text-emerald-400 transition-colors p-5 rounded-lg hover:bg-emerald-400/5 border border-transparent hover:border-emerald-400/20">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-lg group-hover:scale-110 transition-transform">
                    <Mail className="h-6 w-6" />
                  </div>
                  <span className="text-lg font-medium tracking-wide">hii@niramaya.com</span>
                </a>

                <div className=" text-center mt-10">
                  <Link
                    to="/book/step-1"
                    className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all duration-300 group border border-emerald-400/20 text-lg tracking-wide"
                  >
                    <Calendar className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="bg-gradient-to-r from-emerald-800/50 to-teal-800/50 backdrop-blur-sm rounded-2xl p-12 mb-16 border border-emerald-400/20">
            <div className="text-center">
              <h4 className="text-3xl font-black mb-6 text-emerald-400 tracking-tight">Stay Connected</h4>
              <p className="text-gray-300 mb-10 text-xl font-light tracking-wide">Get wellness tips and exclusive offers delivered to your inbox</p>
              <div className="flex flex-col sm:flex-row gap-6 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-lg font-medium"
                />
                <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-4 rounded-xl font-bold hover:scale-105 transition-all duration-300 border border-emerald-400/20 text-lg tracking-wide">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 py-10">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div className="flex items-center space-x-8">
                <p className="text-gray-400 text-lg font-medium tracking-wide">© 2024 Niramaya. All rights reserved.</p>
                <div className="flex items-center space-x-6 text-lg">
                  <a href="/privacy" className="text-gray-400 hover:text-emerald-400 transition-colors py-3 px-4 rounded-lg hover:bg-emerald-400/10 border border-transparent hover:border-emerald-400/20 font-medium">Privacy Policy</a>
                  <span className="text-gray-600">•</span>
                  <a href="/terms" className="text-gray-400 hover:text-emerald-400 transition-colors py-3 px-4 rounded-lg hover:bg-emerald-400/10 border border-transparent hover:border-emerald-400/20 font-medium">Terms of Service</a>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-3 text-gray-400 py-3 px-5 rounded-lg bg-emerald-400/5 border border-emerald-400/20">
                  <Shield className="h-5 w-5 text-emerald-400" />
                  <span className="text-lg font-medium">SSL Secured</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 py-3 px-5 rounded-lg bg-emerald-400/5 border border-emerald-400/20">
                  <Award className="h-5 w-5 text-emerald-400" />
                  <span className="text-lg font-medium">Certified</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 py-3 px-5 rounded-lg bg-emerald-400/5 border border-emerald-400/20">
                  <Globe className="h-5 w-5 text-emerald-400" />
                  <span className="text-lg font-medium">India Wide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;


import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Sparkles, Zap, Heart, Star, Play, Calendar, ArrowRight, Globe, Award, Users, Clock, Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DiscoverMore = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      gsap.fromTo('.hero-title', 
        { 
          opacity: 0, 
          y: 100,
          rotationX: 90,
          transformPerspective: 1000
        },
        { 
          opacity: 1, 
          y: 0,
          rotationX: 0,
          duration: 1.2,
          ease: 'back.out(1.7)',
          stagger: 0.2
        }
      );

      // Floating elements animation
      gsap.to('.floating-element', {
        y: -20,
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.5
      });

      // Section reveal animations
      gsap.utils.toArray('.section-reveal').forEach((section: any, index) => {
        gsap.fromTo(section,
          {
            opacity: 0,
            y: 100,
            scale: 0.8,
            filter: 'blur(10px)'
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
              onEnter: () => setCurrentSection(index)
            }
          }
        );
      });

      // Glitch effect for titles
      const glitchElements = document.querySelectorAll('.glitch-text');
      glitchElements.forEach(element => {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
        tl.to(element, {
          skewX: 5,
          duration: 0.1,
          ease: 'power2.inOut'
        })
        .to(element, {
          skewX: -5,
          scaleX: 1.02,
          duration: 0.1,
          ease: 'power2.inOut'
        })
        .to(element, {
          skewX: 0,
          scaleX: 1,
          duration: 0.1,
          ease: 'power2.inOut'
        });
      });

      // Particle system simulation
      const particles = document.querySelectorAll('.particle');
      particles.forEach((particle, i) => {
        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        });
        
        gsap.to(particle, {
          x: `+=${Math.random() * 200 - 100}`,
          y: `+=${Math.random() * 200 - 100}`,
          duration: Math.random() * 5 + 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      });

      // Interactive hover effects
      document.querySelectorAll('.interactive-card').forEach(card => {
        const tl = gsap.timeline({ paused: true });
        tl.to(card, {
          y: -20,
          rotationY: 10,
          rotationX: 5,
          scale: 1.05,
          boxShadow: '0 30px 60px rgba(34, 197, 94, 0.3)',
          duration: 0.4,
          ease: 'power2.out'
        });

        card.addEventListener('mouseenter', () => tl.play());
        card.addEventListener('mouseleave', () => tl.reverse());
      });

    });

    return () => ctx.revert();
  }, []);

  const sections = [
    {
      title: "Revolutionary Healing",
      subtitle: "Ancient meets Future",
      description: "Experience the fusion of 5000-year-old Ayurvedic wisdom with cutting-edge wellness technology.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      gradient: "from-emerald-500 via-green-500 to-teal-600"
    },
    {
      title: "Mindful Transformation",
      subtitle: "Elevate Your Being",
      description: "Unlock your potential through personalized treatments designed for the modern soul seeker.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      gradient: "from-teal-400 via-emerald-500 to-green-600"
    },
    {
      title: "Natural Euphoria",
      subtitle: "Pure Bliss State",
      description: "Discover treatments that transport you to a state of natural euphoria and deep healing.",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      gradient: "from-green-400 via-emerald-500 to-teal-600"
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-emerald-900/20 text-white overflow-hidden relative">
      {/* Animated Background Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle absolute w-2 h-2 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full opacity-30"
        />
      ))}

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-emerald-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center text-emerald-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </button>
            <div className="flex items-center space-x-4">
              <Leaf className="h-8 w-8 text-emerald-400" />
              <div>
                <span className="text-xl font-black bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent glitch-text">
                  DISCOVER
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Morphing Background Shapes */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#059669" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#047857" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            className="morph-shape"
            d="M60,0.5C93.1,0.5 120,27.4 120,60.5C120,93.6 93.1,120.5 60,120.5C26.9,120.5 0,93.6 0,60.5C0,27.4 26.9,0.5 60,0.5Z"
            fill="url(#morphGradient)"
            transform="scale(12) translate(50, 20)"
          />
        </svg>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <div className="hero-title space-y-8">
            <h1 className="text-8xl lg:text-9xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent leading-none tracking-tighter glitch-text">
              DISCOVER
            </h1>
            <div className="hero-title">
              <h2 className="text-6xl lg:text-7xl font-bold text-white/90 tracking-wide">
                The Future of
              </h2>
            </div>
            <div className="hero-title">
              <h3 className="text-5xl lg:text-6xl font-light bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Wellness
              </h3>
            </div>
          </div>

          <div className="hero-title mt-12">
            <p className="text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light">
              Step into a realm where ancient healing meets tomorrow's technology. 
              Your transformation begins here.
            </p>
          </div>

          <div className="hero-title mt-16 flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Link 
              to="/book/step-1"
              className="group relative inline-flex items-center bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white px-12 py-6 rounded-full text-xl font-bold hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <Calendar className="mr-4 h-6 w-6" />
                Begin Your Journey
                <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-green-600 to-emerald-600 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </Link>
            
            <button className="group inline-flex items-center border-2 border-emerald-400 text-emerald-400 px-12 py-6 rounded-full text-xl font-bold hover:bg-emerald-400/10 transition-all duration-300">
              <Play className="mr-4 h-6 w-6 group-hover:scale-110 transition-transform" />
              Watch Story
            </button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="floating-element absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full opacity-20 blur-xl" />
        <div className="floating-element absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full opacity-15 blur-2xl" />
        <div className="floating-element absolute bottom-1/4 left-1/3 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-25 blur-lg" />
      </section>

      {/* Dynamic Sections */}
      {sections.map((section, index) => (
        <section key={index} className="section-reveal relative py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <div className={`grid lg:grid-cols-2 gap-20 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              <div className={`space-y-10 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="space-y-6">
                  <h2 className="text-6xl lg:text-7xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent leading-tight glitch-text">
                    {section.title}
                  </h2>
                  <h3 className={`text-4xl font-bold bg-gradient-to-r ${section.gradient} bg-clip-text text-transparent`}>
                    {section.subtitle}
                  </h3>
                  <p className="text-xl text-white/70 leading-relaxed font-light max-w-xl">
                    {section.description}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6">
                  <Link 
                    to="/book/step-1"
                    className={`interactive-card group bg-gradient-to-r ${section.gradient} text-white px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300 inline-flex items-center`}
                  >
                    <Sparkles className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Start Journey
                  </Link>
                  <button className="interactive-card group border-2 border-emerald-400/50 text-emerald-400 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-400/10 transition-all duration-300 inline-flex items-center">
                    <Zap className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Learn More
                  </button>
                </div>
              </div>

              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-r ${section.gradient} rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />
                  <img 
                    src={section.image}
                    alt={section.title}
                    className="interactive-card relative rounded-3xl shadow-2xl w-full h-96 object-cover border-2 border-emerald-400/20"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-black/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-400/20">
                    <div className="flex items-center space-x-4">
                      <Star className="h-8 w-8 text-yellow-400" />
                      <div>
                        <div className="font-bold text-white text-xl">4.9/5</div>
                        <div className="text-white/60 text-sm">Experience Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Stats Section */}
      <section className="section-reveal py-32 bg-gradient-to-r from-emerald-900/40 via-green-900/40 to-teal-900/40 border-y border-emerald-400/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black text-white mb-6 glitch-text">
              By The Numbers
            </h2>
            <p className="text-2xl text-white/70 font-light">
              Real impact, real transformation
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { number: "10K+", label: "Lives Transformed", icon: Heart },
              { number: "98%", label: "Satisfaction Rate", icon: Star },
              { number: "25+", label: "Years Experience", icon: Award },
              { number: "50+", label: "Global Locations", icon: Globe }
            ].map((stat, index) => (
              <div key={index} className="interactive-card text-center p-8 rounded-3xl bg-emerald-400/5 backdrop-blur-sm border border-emerald-400/20">
                <stat.icon className="h-12 w-12 mx-auto mb-6 text-emerald-400" />
                <div className="text-5xl font-black text-white mb-4">{stat.number}</div>
                <div className="text-white/70 font-medium text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-reveal py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-green-600/20 to-teal-600/20" />
        <div className="relative max-w-5xl mx-auto text-center px-4">
          <h2 className="text-6xl lg:text-7xl font-black text-white mb-12 glitch-text">
            Ready to 
            <span className="block bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
              Transform?
            </span>
          </h2>
          <p className="text-2xl text-white/70 mb-16 max-w-3xl mx-auto leading-relaxed font-light">
            Your journey to ultimate wellness starts with a single click. 
            Join thousands who've already discovered their best selves.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link 
              to="/book/step-1"
              className="group relative inline-flex items-center bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white px-16 py-8 rounded-full text-2xl font-bold hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <Calendar className="mr-4 h-8 w-8" />
                Book Your Transformation
                <ArrowRight className="ml-4 h-8 w-8 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-green-600 to-emerald-600 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiscoverMore;

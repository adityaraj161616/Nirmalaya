
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CheckCircle, X } from 'lucide-react';

interface AnimatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info';
}

const AnimatedModal = ({ isOpen, onClose, title, message, type = 'success' }: AnimatedModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current && backdropRef.current) {
      // Animate modal entrance
      gsap.fromTo(backdropRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      
      gsap.fromTo(modalRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: 'back.out(1.7)',
          delay: 0.1
        }
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    if (modalRef.current && backdropRef.current) {
      gsap.to(modalRef.current, {
        scale: 0.8,
        opacity: 0,
        y: 50,
        duration: 0.3,
        ease: 'power2.in'
      });
      
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: onClose
      });
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-16 w-16 text-green-600" />;
      case 'error':
        return <X className="h-16 w-16 text-red-600" />;
      default:
        return <CheckCircle className="h-16 w-16 text-blue-600" />;
    }
  };

  const getIconBg = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100';
      case 'error':
        return 'bg-red-100';
      default:
        return 'bg-blue-100';
    }
  };

  return (
    <div 
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`inline-flex items-center justify-center w-20 h-20 ${getIconBg()} rounded-full mb-6`}>
          {getIcon()}
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-gray-600 mb-8">{message}</p>
        
        <button
          onClick={handleClose}
          className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AnimatedModal;

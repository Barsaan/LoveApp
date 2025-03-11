import React, { useState, useRef, useEffect } from 'react';
import ConfettiEffect from './ConfettiEffect.tsx';
import { Heart, Frown, Star, Sparkles, PartyPopper, GiftIcon, Music, Sparkle } from 'lucide-react';
import '../Styles/LoveQuestion.css';

const LoveQuestion: React.FC = () => {
  const [celebrating, setCelebrating] = useState(false);
  const [yesSize, setYesSize] = useState(1);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [clickCount, setClickCount] = useState(0);
  const [noClickCount, setNoClickCount] = useState(0);
  const [message, setMessage] = useState('');
  const [showBalloons, setShowBalloons] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const MAX_YES_SIZE = 4; // Increased max size
  
  const isMaxSizeReached = yesSize >= MAX_YES_SIZE;
  
  
  useEffect(() => {
    if (isMaxSizeReached && !celebrating) {
      setCelebrating(true);
      setShowBalloons(true);
      setShowSparkles(true);
      setMessage("I knew it! thankyouuuu ❤️");
    }
  }, [yesSize, celebrating]);
  
  const increaseYesSize = () => {
    setYesSize(prev => Math.min(prev + 0.25, MAX_YES_SIZE));
  };
  
  const handleYesClick = () => {
    increaseYesSize();
    setClickCount(prev => prev + 1);
    setShowSparkles(true);
    
    if (clickCount === 0) {
      setMessage("Aww, I'm so happy! 💕");
    } else if (clickCount === 1) {
      setMessage("You're making my heart flutter! 💓");
    } else if (clickCount === 2) {
      setMessage("Keep going! I love seeing how much you care! 💗");
    }
    
    setTimeout(() => setShowSparkles(false), 1500);
  };

  const noMessages = [
    { text: "Are you sure? 💖", icon: <Heart className="icon-small icon-love-light" /> },
    { text: "Try again! ✨", icon: <Sparkles className="icon-small icon-yellow" /> },
    { text: "Give me a chance! 🌟", icon: <Star className="icon-small icon-yellow" /> },
    { text: "Still no? 🥺", icon: <Frown className="icon-small icon-love-light" /> },
    { text: "Okay, but I'm not giving up! 🎉", icon: <PartyPopper className="icon-small icon-love" /> },
    { text: "Last chance! 💕", icon: <Heart className="icon-small icon-love" /> },
  ];
  
  const handleNoClick = () => {
    if (isMaxSizeReached) return;
    
    setNoClickCount(prev => prev + 1);
    
    if (noClickCount === noMessages.length - 1) {
      setShowBalloons(true);
    }

    if (noClickCount < noMessages.length) {
      setMessage(noMessages[noClickCount].text);
    }
    
    moveNoButtonRandomly();
    
    increaseYesSize();
  };
  
  const moveNoButtonRandomly = () => {
    const distance = 70 + Math.random() * 90;
    const angle = Math.random() * Math.PI * 2; 
    
    const deltaX = Math.cos(angle) * distance;
    const deltaY = Math.sin(angle) * distance;
    
    setNoPosition(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));
    
    setTimeout(() => {
      if (noButtonRef.current) {
        const rect = noButtonRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        if (rect.right < 0 || rect.left > viewportWidth || 
            rect.bottom < 0 || rect.top > viewportHeight) {
          setNoPosition({ x: 0, y: 0 });
        }
      }
    }, 100);
  };
  
  useEffect(() => {
    if (celebrating) {
      document.body.classList.add('animate-pulse-gentle');
      return () => {
        document.body.classList.remove('animate-pulse-gentle');
      };
    }
  }, [celebrating]);
  
  const getNoButtonClass = () => {
    const baseClass = "no-button";
    
    if (isMaxSizeReached) {
      return `${baseClass} hidden`;
    }
    
    return baseClass;
  };
  
  const yesButtonStyles = {
    transform: `scale(${yesSize})`,
    transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    zIndex: 10,
  };
  
  const noButtonStyles: React.CSSProperties = {
    transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
    transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    opacity: isMaxSizeReached ? 0 : 1,
    pointerEvents: isMaxSizeReached ? 'none' as const : 'auto' as const,
    zIndex: 20,
  };
  
  return (
    <div className="love-question-container">
      <div className={`love-header ${celebrating ? 'celebrating' : ''}`}>
        <h1 className="love-title">Hi! madamji</h1>
        <h1 className="love-title">will you go on date with me?</h1>
        
        {message && (
          <p className={`love-message ${noClickCount < noMessages.length && noClickCount >= 0 ? 'with-icon' : ''}`}>
            {message}
            {noClickCount < noMessages.length && noClickCount >= 0 && noMessages[noClickCount].icon}
          </p>
        )}
      </div>
      
      <div className="button-container">
        <button
          className="yes-button"
          onClick={handleYesClick}
          style={yesButtonStyles}
        >
          <span className="button-text">
            <Heart className={`button-icon ${celebrating ? 'pulse' : ''}`} />
            Yes
          </span>
        </button>
        
        <button
          ref={noButtonRef}
          className={getNoButtonClass()}
          onClick={handleNoClick}
          style={noButtonStyles}
        >
          <span className="no-button-text">
            No
          </span>
        </button>
      </div>
      
      {showSparkles && (
        <div className="sparkles-container">
          {Array.from({ length: 15 }).map((_, i) => (
            <div 
              key={i}
              className="sparkle"
              style={{
                left: `${40 + Math.random() * 20}%`, 
                top: `${50 + Math.random() * 20}%`,
                opacity: Math.random() * 0.7 + 0.3,
                animationDuration: `${0.5 + Math.random() * 1}s`,
              }}
            >
              <Sparkles 
                size={10 + Math.floor(Math.random() * 20)} 
                className="sparkle-icon"
              />
            </div>
          ))}
        </div>
      )}
      
      <ConfettiEffect active={celebrating} />
      
      {showBalloons && (
        <div className="balloon-container">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="balloon"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '-50px',
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            >
              <Heart 
                size={32 + Math.floor(Math.random() * 48)} 
                className={`balloon-heart-${Math.floor(Math.random() * 5)}`}
                fill={Math.random() > 0.5 ? 'currentColor' : 'none'} 
              />
            </div>
          ))}
        </div>
      )}
      
      <div className="background-hearts">
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i}
            className="background-heart"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 1.5})`,
            }}
          >
            <Heart 
              size={100 + Math.floor(Math.random() * 150)} 
              className="heart-icon"
              fill="currentColor" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoveQuestion;

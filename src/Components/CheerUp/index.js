import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Pause, Heart, MapPin } from 'lucide-react';
import Button from '../ui/button';

// Import images
import img1 from '../../assets/images/IMG_7650.JPG';
import img2 from '../../assets/images/IMG_7585.jpg';
import img3 from '../../assets/images/IMG_7491.PNG';
import img4 from '../../assets/images/IMG_7489.PNG';
import img5 from '../../assets/images/IMG_7421.PNG';
import img6 from '../../assets/images/IMG_7413.PNG';

// Import memory images
import memoryImg1 from '../../assets/images/IMG_7362.PNG';
import memoryImg2 from '../../assets/images/IMG_7263.PNG';
import memoryImg3 from '../../assets/images/3773a5c8-1d69-4388-ac2a-4c4e85b2a2cc.JPG';
import memoryImg4 from '../../assets/images/632fa989-b522-4fe1-8ca4-066e229928f9.JPG';

// Import videos
import video1 from '../../assets/images/IMG_7356.MOV';
import video2 from '../../assets/images/IMG_7340.MOV';

// Add global styles for gradient animation
const gradientStyles = `
  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .gradient-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -10;
    background: linear-gradient(-45deg, #e74c3c, #c0392b, #e84393, #fd79a8, #e056fd);
    background-size: 400% 400%;
    animation: gradientAnimation 15s ease infinite;
  }

  /* Add responsive collage styles */
  .collage-container {
    position: relative;
    width: 100%;
    padding-bottom: 60%; /* Reduced height for collage */
    max-height: 100vh; /* Reduced max height */
    margin: 40 auto;
  }

  .collage-item {
    position: absolute;
    overflow: hidden;
    border-radius: 1rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, z-index 0.3s ease;
  }

  .collage-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.95) contrast(1.05);
  }

  /* Memory images container */
  .memory-container {
    position: relative;
    width: 100%;
    height: 400px;
    margin: 0 auto;
  }

  .memory-item {
    position: absolute;
    overflow: hidden;
    border-radius: 1rem;
    box-shadow: 0 10px 15px -5px rgba(0, 0, 0, 0.2);
    max-width: 200px;
    max-height: 200px;
  }

  /* Media queries for responsive collage */
  @media (max-width: 768px) {
    .collage-container {
      padding-bottom: 100%;
    }
    
    .memory-container {
      height: 300px;
    }
    
    .memory-item {
      max-width: 150px;
      max-height: 150px;
    }
  }
`;

// Main images for the grid
const images = [
  { src: img1, alt: 'Special moment 1' },
  { src: img2, alt: 'Special moment 2' },
  { src: img3, alt: 'Special moment 3' },
  { src: img4, alt: 'Special moment 4' },
  { src: img5, alt: 'Special moment 5' },
  { src: img6, alt: 'Special moment 6' },
];

// Memory images section
const memoryImages = [
  { src: memoryImg1, title: 'Our First Date' },
  { src: memoryImg2, title: 'Beach Day' },
  { src: memoryImg3, title: 'Birthday Celebration' },
  { src: memoryImg4, title: 'Road Trip' },
];

// Video elements
const videos = [{ src: video1, aspectRatio: '9/16' }];

const songSrc = '/song.mp3'; // Audio path

export default function CheerUp() {
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  const { scrollY } = useScroll();
  const scrollHeartsOpacity = useTransform(scrollY, [0, 300], [0, 1]);

  const firstSectionRef = useRef(null);
  const messageSectionRef = useRef(null);
  const memorySectionRef = useRef(null);
  const secondMessageSectionRef = useRef(null);
  const videosSectionRef = useRef(null);
  const thirdMessageSectionRef = useRef(null);
  const youtubeSectionRef = useRef(null);
  const collageContainerRef = useRef(null);

  // Window resize effect - safely handle window access
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    updateSize();

    // Add event listener
    window.addEventListener('resize', updateSize);

    // Cleanup
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Audio setup effect
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    if (typeof Audio === 'undefined') return;

    const newAudio = new Audio(songSrc);
    setAudio(newAudio);

    return () => {
      newAudio.pause();
      newAudio.src = '';
    };
  }, []);

  // Simplified confetti effect and timer
  useEffect(() => {
    let mounted = true;

    // Hide confetti and enable scrolling after 5 seconds
    const timer = setTimeout(() => {
      if (mounted) {
        setShowConfetti(false);
        setAnimationCompleted(true);

        // Enable scrolling
        if (typeof document !== 'undefined') {
          document.body.style.overflow = 'auto';
        }

        // Scroll to first section after animation completes
        setTimeout(() => {
          if (firstSectionRef.current && mounted) {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }
        }, 300);
      }
    }, 5000);

    // Disable scroll during initial animation
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      mounted = false;
      clearTimeout(timer);

      // Always ensure scroll is enabled when component unmounts
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'auto';
      }
    };
  }, []);

  // Function to get user's current location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({
          latitude,
          longitude,
          timestamp: new Date().toISOString(),
        });

        // Store location in localStorage
        localStorage.setItem(
          'userLocation',
          JSON.stringify({
            latitude,
            longitude,
            timestamp: new Date().toISOString(),
          })
        );
      },
      (error) => {
        setLocationError(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  // Request location on component mount
  useEffect(() => {
    getUserLocation();
  }, []);

  // Audio toggle function
  const togglePlay = () => {
    if (!audio) return;

    if (playing) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
    setPlaying(!playing);
  };

  // Heart Confetti component - simplified
  const HeartConfetti = () => {
    return (
      <div className='fixed inset-0 pointer-events-none z-50'>
        {/* Center name animation */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <motion.div
            className='text-white'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.5,
              ease: 'easeOut',
              delay: 0.5,
            }}
          >
            <h2
              className='text-6xl md:text-8xl font-bold'
              style={{ textShadow: '0 0 15px rgba(255,255,255,0.8)' }}
            >
              To Dimple,
            </h2>
          </motion.div>
        </div>

        {/* Hearts animation - reduced count for better performance */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className='absolute text-3xl'
            style={{
              left: `${Math.random() * 100}%`,
              top: `-50px`,
              color:
                i % 5 === 0
                  ? '#ff6b6b'
                  : i % 5 === 1
                  ? '#48dbfb'
                  : i % 5 === 2
                  ? '#feca57'
                  : i % 5 === 3
                  ? '#1dd1a1'
                  : '#ff9ff3',
            }}
            animate={{
              top: [`-50px`, `${windowSize.height + 50}px`],
              left: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              rotate: [0, 360],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              ease: 'linear',
              repeat: 0,
              delay: Math.random() * 0.2,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>
    );
  };

  // Floating hearts animation - reduced complexity
  const FloatingHearts = () => {
    return (
      <motion.div
        className='fixed left-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-40'
        style={{ opacity: scrollHeartsOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className='text-3xl mb-6'
            style={{
              color:
                i % 5 === 0
                  ? '#ff6b6b'
                  : i % 5 === 1
                  ? '#48dbfb'
                  : i % 5 === 2
                  ? '#feca57'
                  : i % 5 === 3
                  ? '#1dd1a1'
                  : '#ff9ff3',
            }}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 2 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ❤️
          </motion.div>
        ))}
      </motion.div>
    );
  };

  // Right side floating hearts - reduced complexity
  const RightFloatingHearts = () => {
    return (
      <motion.div
        className='fixed right-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-40'
        style={{ opacity: scrollHeartsOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className='text-3xl mb-6'
            style={{
              color:
                i % 5 === 0
                  ? '#ff6b6b'
                  : i % 5 === 1
                  ? '#48dbfb'
                  : i % 5 === 2
                  ? '#feca57'
                  : i % 5 === 3
                  ? '#1dd1a1'
                  : '#ff9ff3',
            }}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 2 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </motion.div>
    );
  };

  // Section heart indicator - simplified
  const SectionHearts = ({ sectionRef }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      if (typeof IntersectionObserver === 'undefined') return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { threshold: 0.2 }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }, [sectionRef]);

    return (
      <motion.div
        className='absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-30'
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className='text-2xl mb-4'
            style={{
              color:
                i % 3 === 0 ? '#ff6b6b' : i % 3 === 1 ? '#feca57' : '#ff9ff3',
            }}
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </motion.div>
    );
  };

  // Calculate responsive collage positions - reduced sizes
  const getCollagePositions = () => {
    // Base positions that adapt to different screen sizes
    const basePositions = [
      {
        // Top left
        top: '5%',
        left: '5%',
        width: windowSize.width < 768 ? '35%' : '25%',
        height: 'auto',
        aspectRatio: '3/4',
        zIndex: 3,
        rotate: -8,
      },
      {
        // Top right
        top: '3%',
        left: windowSize.width < 768 ? '55%' : '65%',
        width: windowSize.width < 768 ? '35%' : '25%',
        height: 'auto',
        aspectRatio: '3/4',
        zIndex: 2,
        rotate: 5,
      },
      {
        // Middle left
        top: windowSize.width < 768 ? '28%' : '30%',
        left: '15%',
        width: windowSize.width < 768 ? '30%' : '25%',
        height: 'auto',
        aspectRatio: '1/2',
        zIndex: 1,
        rotate: -3,
      },
      {
        // Middle
        top: windowSize.width < 768 ? '25%' : '25%',
        left: windowSize.width < 768 ? '45%' : '45%',
        width: windowSize.width < 768 ? '45%' : '35%',
        height: 'auto',
        aspectRatio: '3/4',
        zIndex: 4,
        rotate: 6,
      },
      {
        // Bottom left
        top: windowSize.width < 768 ? '55%' : '55%',
        left: '5%',
        width: windowSize.width < 768 ? '35%' : '25%',
        height: 'auto',
        aspectRatio: '1/2',
        zIndex: 2,
        rotate: -5,
      },
      {
        // Bottom right
        top: windowSize.width < 768 ? '50%' : '50%',
        left: windowSize.width < 768 ? '50%' : '60%',
        width: windowSize.width < 768 ? '40%' : '30%',
        height: 'auto',
        aspectRatio: '1/2',
        zIndex: 1,
        rotate: 3,
      },
    ];

    return basePositions;
  };

  // Calculate memory collage positions - smaller and positioned better
  const getMemoryPositions = () => {
    const memoryPositions = [
      {
        // Top left
        top: '10%',
        left: '10%',
        width: windowSize.width < 768 ? '35%' : '25%',
        height: 'auto',
        aspectRatio: '4/3',
        zIndex: 3,
        rotate: -4,
      },
      {
        // Top right
        top: '5%',
        left: windowSize.width < 768 ? '55%' : '60%',
        width: windowSize.width < 768 ? '35%' : '25%',
        height: 'auto',
        aspectRatio: '4/3',
        zIndex: 2,
        rotate: 3,
      },
      {
        // Bottom left
        top: windowSize.width < 768 ? '50%' : '55%',
        left: '15%',
        width: windowSize.width < 768 ? '35%' : '25%',
        height: 'auto',
        aspectRatio: '4/3',
        zIndex: 1,
        rotate: -2,
      },
      {
        // Bottom right
        top: windowSize.width < 768 ? '45%' : '50%',
        left: windowSize.width < 768 ? '50%' : '55%',
        width: windowSize.width < 768 ? '40%' : '30%',
        height: 'auto',
        aspectRatio: '4/3',
        zIndex: 4,
        rotate: 4,
      },
    ];

    return memoryPositions;
  };

  return (
    <div className='min-h-screen w-full overflow-x-hidden text-white relative'>
      {/* Add global styles */}
      <style jsx global>
        {gradientStyles}
      </style>

      {/* Gradient background */}
      <div className='gradient-bg'></div>

      {/* Location display at the top */}
      <motion.div
        className='fixed top-4 left-4 right-4 z-50 flex justify-between items-center'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='flex items-center space-x-2 bg-white/20 backdrop-blur-sm p-3 rounded-lg text-sm'>
          <MapPin size={16} />
          {userLocation ? (
            <div>
              <p>Lat: {userLocation.latitude.toFixed(4)}</p>
              <p>Lng: {userLocation.longitude.toFixed(4)}</p>
            </div>
          ) : locationError ? (
            <p className='text-red-200'>Location access denied</p>
          ) : (
            <p>Getting location...</p>
          )}
        </div>
      </motion.div>

      {/* Show heart confetti only when needed */}
      {showConfetti && <HeartConfetti />}

      {/* Show floating hearts on scroll */}
      {!showConfetti && <FloatingHearts />}
      {!showConfetti && <RightFloatingHearts />}

      {/* Main content - simplified animation structure */}
      <div className='w-full'>
        {/* Hero Section with improved image collage */}
        <section
          ref={firstSectionRef}
          className='w-full flex flex-col items-center justify-center px-4 py-16 relative max-h-full'
        >
          <SectionHearts sectionRef={firstSectionRef} />
          <div className='container mx-auto max-w-6xl flex flex-col items-center'>
            <motion.h1
              className='text-5xl md:text-7xl lg:text-8xl font-bold text-center text-white mb-32'
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Hey MomoMonster, Cutu ❤️
            </motion.h1>
            <div className='collage-container w-full' ref={collageContainerRef}>
              {images.map((img, index) => {
                const positions = getCollagePositions();
                const position = positions[index];

                return (
                  <motion.div
                    key={index}
                    className='collage-item'
                    style={{
                      top: position.top,
                      left: position.left,
                      width: position.width,
                      height: position.height,
                      aspectRatio: position.aspectRatio,
                      zIndex: position.zIndex,
                      transform: `rotate(${position.rotate}deg)`,
                    }}
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                      rotate: position.rotate,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: position.rotate,
                    }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.15,
                      ease: 'easeOut',
                    }}
                    whileHover={{
                      scale: 1.05,
                      rotate: 0,
                      zIndex: 10,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <div className='w-full h-full relative'>
                      <img
                        src={img.src}
                        alt={img.alt}
                        className='w-full h-full object-cover'
                        style={{
                          filter: 'brightness(0.95) contrast(1.05)',
                        }}
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300'></div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* First Message Section */}
        <section
          ref={messageSectionRef}
          className='w-full bg-black/20 backdrop-blur-sm py-20 relative'
          style={{
            marginTop: '350px',
            paddingLeft: '50px',
            paddingRight: '50px',
          }}
        >
          <SectionHearts sectionRef={messageSectionRef} />
          <div className='container mx-auto max-w-4xl px-4'>
            <motion.div
              className='bg-white/10 backdrop-blur-md rounded-2xl p-10 shadow-2xl'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              {/* <motion.div
                className='flex items-center justify-center mb-8'
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                viewport={{ once: true }}
              >
                <Heart size={48} className='text-pink-400' />
              </motion.div> */}

              <motion.p
                className='text-2xl md:text-3xl text-center leading-relaxed font-light px-4 py-2'
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                You have no idea how special you are to me. You don't know how
                much I love you and trust you. I know sometimes things can be
                hard, and that's when we truly see who stands beside us. No
                matter what happens, just know that I am here for you, always.
                Also, I'm sorry for not being able to be there for you when you
                need me like today, yrr tu smjh m ye kyo kr rha hu, just becoz
                somethings can not be said tere aage m yaha bolunga, tujhe meri
                kasam h agr tune aaj ke baad kbhi kbhi kisi or ka socha toh, m
                bohot cautious hoke chlta hu ke terko koi issue na, hurt na ho,
                but in the end tu hi sbse jyada hurt hojati h, pta ni kya h but
                aisa hi hota h, and sbne terko judge ni kiya tha unhone mere
                liye bola tha na ki tere liye becoz m chutiya hu m ni smjhta hu
                koi baat and m unki bhi ni smjhunga sirf teri, pta ni almost hrr
                roj lgta h merko ke m jyada chep ho rha hu ya ni and tbh merko
                hr ek sec ke liye lgta h but this all my brain thinks then dil
                aajata h and sb clear ho jata h, mene bola tha ke m kuch bhi kr
                skta hu and ye sch aapke liye m kuch bhi kr skta hu, and tbh
                merko pta ni kyo m krne kuch or jata ho kuch or jata h and
                regarding the ke what will happen to us, m yhi hu litteraly, khi
                ni jaunga no matter what happens and yrr pta ni terko aaj dekh
                ke mera schi dil tut gya i want me to be your happy place but
                merko aisa lgta h kbhi kbhi ke m hi tere saare stress and issues
                ka core bnta ja rha hu, really sorry for that. and also ye
                tutunga m toh kya hoga and all mt soch know that that if i have
                said ill be there for you ill be there no matter what and i have
                already given you tan, man, dhan this is i have never said to
                any one but i am saying to you i dont what future holds for us
                whether we will something one day or not but ik one thing for
                sure that jo bhi ho ill be there for you, bss promise me one
                thing ke mere aage ni roo jana kbhi meri saari strength hi khtm
                ho jati vo sb dekh ke, just know one thing you are the most
                special, kind hearted, loving, adorable person i have came
                across in my life and would like to keep you with me forever ❤️
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Memory Cards Section - improved layout */}
        <section ref={memorySectionRef} className='w-full py-16 relative'>
          <SectionHearts sectionRef={memorySectionRef} />
          <div className='container mx-auto max-w-6xl px-4'>
            <motion.h2
              className='text-3xl md:text-4xl font-bold text-center mb-10 text-white'
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Unforgettable Moments
            </motion.h2>

            {/* Memory images with improved responsive layout */}
            <div className='memory-container relative mx-auto'>
              {memoryImages.map((img, idx) => {
                const positions = getMemoryPositions();
                const position = positions[idx];

                return (
                  <motion.div
                    key={idx}
                    className='memory-item bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl absolute'
                    style={{
                      top: position.top,
                      left: position.left,
                      // width: position.width,
                      // aspectRatio: position.aspectRatio,
                      zIndex: position.zIndex,
                      transform: `rotate(${position.rotate}deg)`,
                    }}
                    initial={{
                      scale: 0.8,
                      opacity: 0,
                      rotate: position.rotate,
                    }}
                    whileInView={{
                      scale: 1,
                      opacity: 1,
                      rotate: position.rotate,
                    }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    // viewport={{ once: true, margin: '-100px' }}
                    whileHover={{
                      y: -10,
                      rotate: 0,
                      zIndex: 10,
                      transition: { duration: 0.3 },
                    }}
                  >
                    {/* <div className='w-full h-full relative'> */}
                    <img
                      src={img.src}
                      alt={img.title}
                      // className='w-full h-full object-cover'
                      style={{
                        height: '300px',
                        width: '350px',
                        objectFit: 'contain',
                        filter: 'brightness(0.95) contrast(1.05)',
                      }}
                    />
                    {/* <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent'></div> */}
                    {/* </div> */}
                    <div className='absolute bottom-0 left-0 right-0 p-2 bg-black/30 backdrop-blur-sm'>
                      <h3 className='text-sm font-semibold text-center text-white'>
                        {img.title}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Second Message Section */}
        <section
          ref={secondMessageSectionRef}
          className='w-full bg-black/20 backdrop-blur-sm py-20 relative'
        >
          <SectionHearts sectionRef={secondMessageSectionRef} />
          <div className='container mx-auto max-w-4xl px-4'>
            <motion.div
              className='bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <motion.p
                className='text-xl md:text-2xl text-center leading-relaxed font-light'
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Just wanted to send you some sunshine today. I know things might
                be a bit tough right now, but please remember how strong and
                wonderful you are. You have such a bright light inside you.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Videos Section - fixed layout with side-by-side videos */}
        <section ref={videosSectionRef} className='w-full py-16 relative'>
          <SectionHearts sectionRef={videosSectionRef} />
          <div className='container mx-auto max-w-6xl px-4'>
            <motion.h2
              className='text-3xl md:text-4xl font-bold text-center mb-10 text-white'
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Special Moments
            </motion.h2>

            <motion.div
              className='grid grid-cols-1 md:grid-cols-2 gap-6'
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {videos.map((video, index) => (
                <motion.div
                  key={index}
                  className='rounded-xl overflow-hidden shadow-2xl bg-black/30 relative h-full'
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className='w-full h-full flex items-center justify-center'>
                    <video
                      src={video.src}
                      controls
                      className='w-full h-auto'
                      style={{
                        aspectRatio: video.aspectRatio,
                        maxHeight: '300px', // Limit video height
                      }}
                      playsInline
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Third Message Section */}
        <section
          ref={thirdMessageSectionRef}
          className='w-full bg-black/20 backdrop-blur-sm py-20 relative'
        >
          <SectionHearts sectionRef={thirdMessageSectionRef} />
          <div className='container mx-auto max-w-4xl px-4'>
            <motion.div
              className='bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <motion.div
                className='space-y-6 text-xl md:text-2xl text-center leading-relaxed font-light'
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <p>
                  No matter what you're feeling, or what comes next, please know
                  that I'm right here with you. Whether you feel those feelings
                  soon, later, or not at all, it's okay. I'm still standing
                  right here with you.
                </p>

                <p>
                  I'm with you always, I'm always on your side, and I'll be
                  right there next to you, no matter what. I'd even fall down
                  for myself, but never for you. You mean so much to me, and I
                  really believe in you.
                </p>

                <p>
                  Sending you a big, warm hug and all my love. Remember how
                  amazing you are.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* YouTube Section */}
        <section ref={youtubeSectionRef} className='w-full py-16 relative'>
          <SectionHearts sectionRef={youtubeSectionRef} />
          <div className='container mx-auto max-w-4xl px-4'>
            <motion.h2
              className='text-3xl md:text-4xl font-bold text-center mb-10 text-white'
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Only for you
            </motion.h2>

            <motion.div
              className='w-full rounded-xl overflow-hidden shadow-2xl'
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className='aspect-w-16 aspect-h-9'>
                {/* YouTube embed would go here */}
                <iframe
                  className='w-full'
                  style={{ maxHeight: '400px', height: '300px' }}
                  src='https://www.youtube.com/embed/EZh7my_RASk'
                  title='Our Special Song'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className='w-full pb-12 pt-8 border-t border-white/20'>
          <div className='container mx-auto max-w-4xl px-4'>
            <motion.div
              className='text-center text-xl text-white'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <p>Made with love, for you ❤️</p>
            </motion.div>
          </div>
        </footer>
      </div>

      {/* Add location button */}
      <motion.div
        className='fixed bottom-4 right-4 z-50'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <Button
          className='flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-4 py-2 rounded-full text-sm shadow-lg'
          onClick={getUserLocation}
        >
          <span>Get Location</span>
        </Button>
      </motion.div>

      {/* Display location info */}
      {userLocation && (
        <motion.div
          className='fixed bottom-4 left-4 z-50 bg-white/20 backdrop-blur-sm p-3 rounded-lg text-sm'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p>Latitude: {userLocation.latitude.toFixed(4)}</p>
          <p>Longitude: {userLocation.longitude.toFixed(4)}</p>
          <p className='text-xs opacity-70'>
            Last updated: {new Date(userLocation.timestamp).toLocaleString()}
          </p>
        </motion.div>
      )}

      {/* Display error if any */}
      {locationError && (
        <motion.div
          className='fixed bottom-4 left-4 z-50 bg-red-500/20 backdrop-blur-sm p-3 rounded-lg text-sm text-red-200'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p>Error: {locationError}</p>
        </motion.div>
      )}
    </div>
  );
}

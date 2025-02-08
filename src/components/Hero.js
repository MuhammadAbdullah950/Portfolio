import React from "react";

function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen bg-zinc-900 bg-cover bg-center relative flex items-center"
    >
      {/* Improved overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b"></div>

      <div className="container mx-auto flex items-center justify-center relative z-10 px-4 sm:px-6 py-8 sm:py-0">
        <div className="text-center max-w-screen-sm">
          {/* Decorative element */}
          <div className="inline-block mb-3 sm:mb-4 px-4 sm:px-6 py-1.5 sm:py-2 border border-gray-400/30 rounded-full backdrop-blur-sm">
            <span className="text-green-400 text-sm sm:text-base">Welcome to my portfolio</span>
          </div>

          {/* Main heading with enhanced animation */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 transform transition-all duration-500 ease-in-out hover:scale-105">
            Hi, I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              Abdullah
            </span>
          </h1>

          {/* Typewriter-style role description */}
          <p className="mt-3 sm:mt-4 text-lg sm:text-xl text-gray-200 leading-relaxed">
            Specializing in building cutting-edge technologies to transform 
            businesses and drive innovation.
          </p>

          {/* CTA Buttons with better mobile spacing */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center mb-16 sm:mb-0">
            <a
              href="#about"
              className="px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              Learn More
            </a>
            <a
              href="#contact"
              className="px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white border-2 border-white/20 rounded-full hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator - repositioned and only visible on larger screens */}
      <div className="hidden md:block absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 sm:w-8 h-10 sm:h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/60 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
'use client';

export default function Leaders({ setIsHovering }) {
  const leaders = [
    {
      name: "Mr. Vikas Tiwari",
      description: "President, MP- AVGC-XR Association",
      color: "#FFC107",
      image: "/Vikas.png"
    },
    {
      name: "Mr. Sanjay Khimsera",
      description: "President, Asifa",
      color: "#F44336",
      image: "/Sanjay.png"
    },
  ];

  return (
    <section id="Leaders" className="relative bg-[#3c0052] py-8 overflow-hidden flex items-center justify-center mt-0 mb-0">
      {/* Background Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[#3c0052] via-[#3c0052] to-[#3c0052] rounded-full mix-blend-multiply filter blur-[160px] opacity-30 animate-blob-one animation-delay-500 pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-[#3c0052] via-[#3c0052] to-[#3c0052] rounded-full mix-blend-multiply filter blur-[160px] opacity-30 animate-blob-two animation-delay-1500 pointer-events-none" />
      
      {/* Section Content */}
      <div className="relative z-10 container mx-auto px-6 py-10 sm:py-12 md:py-14 pt-0 mt-0 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
          Jury
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 justify-center items-center">
          {leaders.map((zone, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-xl bg-white/10 transition-all duration-300"
              style={{
                backgroundColor: `${zone.color}20`,
                minHeight: '350px',
                height: 'auto',
                padding: '1rem',
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Inner Content */}
              <div className="relative z-10 p-6 flex flex-col justify-between rounded-xl border border-white/20">
                {/* Icon Container - Flex to center the image */}
                <div className="aspect-square rounded-lg mb-4 overflow-hidden bg-gradient-to-br from-white/10 to-white/20 flex justify-center items-center">
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={zone.image}
                      alt={zone.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-white">{zone.name}</h3>
                <p className="text-gray-300 text-sm leading-relaxed" style={{ maxHeight: '100px', overflow: 'hidden' }}>
                  {zone.description}
                </p>
              </div>
              
              {/* Bottom Accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-300"
                style={{ backgroundColor: zone.color }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob-one {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes blob-two {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(-30px, 50px) scale(1.1); }
          66% { transform: translate(20px, -20px) scale(0.9); }
        }
        
        .animate-blob-one {
          animation: blob-one 7s infinite;
        }
        
        .animate-blob-two {
          animation: blob-two 7s infinite;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
      `}</style>
    </section>
  );
}
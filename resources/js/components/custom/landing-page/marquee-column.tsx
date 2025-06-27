interface MarqueeColumnProps {
    images: string[];
    direction: 'up' | 'down';
    speed?: string;
}

export default function MarqueeColumn({ images, direction, speed = '30s' }: MarqueeColumnProps) {
    const animationClass = direction === 'up' ? 'animate-marquee-up' : 'animate-marquee-down';
    return (
        <div className="flex flex-col space-y-4 overflow-hidden h-full">
      <div 
        className={`flex flex-col space-y-4 ${animationClass}`}
        style={{ animationDuration: speed }}
      >
        {/* First set of images */}
        {images.map((image, index) => (
          <div 
            key={`first-${index}`}
            className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
          >
            <img 
              src={image} 
              alt={`Property ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {images.map((image, index) => (
          <div 
            key={`second-${index}`}
            className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
          >
            <img 
              src={image} 
              alt={`Property ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
    );
}
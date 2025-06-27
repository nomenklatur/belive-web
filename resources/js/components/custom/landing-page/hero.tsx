import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import MarqueeColumn from "./marquee-column";

export default function LandingPageHero() {
    const leftColumnImages = [
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    ];

    const rightColumnImages = [
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",

    ];
    return (
        <section id="hero" className="min-h-screen">
            <div className="container mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left side - Text content */}
                <div className="space-y-8 animate-fade-in-up">
                    <div className="space-y-4">
                    
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                        Find Your
                        <span className="bg-gradient-to-r from-[#5843bf] to-[#ff9375] text-transparent bg-clip-text block w-fit">Dream Home</span>
                        Today
                    </h1>
                    
                    <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                        Discover premium properties in the most desirable locations. 
                        Our expert team helps you find the perfect home that matches your lifestyle and budget.
                    </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg" className="bg-primary px-8 py-3 text-lg cursor-pointer">
                        <Link href={route('login')}>
                            Browse Properties
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-accent cursor-pointer text-accent hover:text-accent-foreground px-8 py-3 text-lg">
                        <a href="https://www.linkedin.com/in/masdimasekaputra/" target="_blank" rel="noopener noreferrer">
                            Schedule Viewing
                        </a>
                    </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                    <div>
                        <div className="text-3xl font-bold text-gray-900">1000+</div>
                        <div className="text-sm text-gray-600">Properties Listed</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-gray-900">500+</div>
                        <div className="text-sm text-gray-600">Happy Clients</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-gray-900">50+</div>
                        <div className="text-sm text-gray-600">Expert Agents</div>
                    </div>
                    </div>
                </div>

                {/* Right side - Image marquee */}
                <div className="relative h-[600px] lg:h-[700px]">
                    <div className="grid grid-cols-2 gap-4 h-full">
                    <div className="relative overflow-hidden">
                        <MarqueeColumn images={leftColumnImages} direction="up" speed="50s" />
                    </div>
                    <div className="relative overflow-hidden">
                        <MarqueeColumn images={rightColumnImages} direction="down" speed="50s" />
                    </div>
                    </div>
                    
                    {/* Gradient overlays for smooth fade effect */}
                    <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-slate-50 to-transparent pointer-events-none z-10" />
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-50 to-transparent pointer-events-none z-10" />
                </div>
                </div>
            </div>
            </section>
    )
}
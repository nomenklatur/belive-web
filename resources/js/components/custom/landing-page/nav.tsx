import { Mail } from "lucide-react";
import { type SharedData } from "@/types";
import { usePage, Link } from "@inertiajs/react";

export default function LandingPageNavigation() {
    const { auth } = usePage<SharedData>().props;
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <img src="/logo.svg" alt="" className='h-8 w-8' />
                    <span className="text-2xl font-bold text-gray-900 font-manrope">Belive</span>
                </div>
                
                {/* <nav className="hidden md:flex items-center space-x-8">
                    <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Properties</a>
                    <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
                    <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Services</a>
                    <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
                </nav> */}
                
                <div className="flex items-center space-x-4">
                <div className="hidden lg:flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>info@dimaseka.my.id</span>
                    </div>
                </div>
                {/* <Button className="bg-blue-600 hover:bg-blue-700">
                    Get Started
                </Button> */}
                {auth.user ? (
                    <Link
                        href={route('dashboard')}
                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a]"
                    >
                        Dashboard
                    </Link>
                ) : (
                    <>
                        <Link
                            href={route('login')}
                            className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035]"
                        >
                            Log in
                        </Link>
                        <Link
                            href={route('register')}
                            className="inline-block rounded-sm border bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-1.5 text-sm leading-normal"
                        >
                            Register
                        </Link>
                    </>
                )}
                </div>
            </div>
        </header>
    );
}
export default function LandingPageEarlyAccess() {
    return (
        <section className="py-20 bg-gradient-to-r from-primary to-accent text-white rounded-xl">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
                <h2 className="text-4xl font-light mb-6">
                Become an<br />
                early Beliver
                </h2>
                <p className="mb-8 opacity-90">
                Get exclusive access to new locations, special pricing, and priority booking. Join our waitlist to be among the first to experience borderless living.
                </p>
                <div className="flex space-x-4">
                
                </div>
            </div>
            <div className="relative">
                <div className="transform rotate-12">
                <div className="bg-black rounded-3xl p-6 shadow-2xl">
                    <div className="w-64 h-96 rounded-2xl" style={{ backgroundImage: 'url("/screenshot.jpeg")', backgroundSize: 'cover', backgroundPosition: 'center 190px' }}></div>
                </div>
                </div>
            </div>
            </div>
      </section>
    )
}
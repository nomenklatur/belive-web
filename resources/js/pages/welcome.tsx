import { Head } from '@inertiajs/react';
import LandingPageNavigation from '@/components/custom/landing-page/nav';
import LandingPageHero from '@/components/custom/landing-page/hero';
import LandingPageStays from '@/components/custom/landing-page/stays';

export default function Welcome() {

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center p-6 lg:justify-center lg:p-8">
                <LandingPageNavigation />
                <LandingPageHero />
                <LandingPageStays />
            </div>
        </>
    );
}

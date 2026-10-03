import BottomBar from "@/components/partials/bottombar";
import Header from "@/components/partials/header";
import AncientAtmosphere from "@/components/sketchbook/AncientAtmosphere";
import BackgroundAudio from "@/components/common/BackgroundAudio";
import getLocalData  from "@/lib/getLocalData";
import { Common } from "@/shared/types/common";
import { getLocale } from "next-intl/server";

export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    const locale = await getLocale();
    const common: Common = await getLocalData("common", locale);

    return (
        <div className='relative min-h-screen w-full flex flex-col overflow-x-hidden'>
            <AncientAtmosphere />
            <BackgroundAudio />

            {/* ── Decorative Bloom Flowers (visible on all screen sizes) ── */}
            {/* Bottom-left large bloom */}
            <div
                className="fixed bottom-0 left-0 w-40 sm:w-56 md:w-72 pointer-events-none z-0 select-none"
                style={{ opacity: 0.16, mixBlendMode: "multiply" }}
                aria-hidden="true"
            >
                <img src="/sketchbook/bloom.png" alt="" className="w-full h-auto object-contain rotate-12" />
            </div>
            {/* Top-right bloom */}
            <div
                className="fixed top-0 right-0 w-32 sm:w-48 md:w-60 pointer-events-none z-0 select-none"
                style={{ opacity: 0.12, mixBlendMode: "multiply" }}
                aria-hidden="true"
            >
                <img src="/sketchbook/bloom.png" alt="" className="w-full h-auto object-contain -scale-x-100 -rotate-6" />
            </div>
            {/* Bottom-right smaller bloom */}
            <div
                className="fixed bottom-16 right-0 w-24 sm:w-36 md:w-44 pointer-events-none z-0 select-none"
                style={{ opacity: 0.10, mixBlendMode: "multiply", filter: "sepia(0.3) hue-rotate(20deg)" }}
                aria-hidden="true"
            >
                <img src="/sketchbook/bloom.png" alt="" className="w-full h-auto object-contain -scale-x-100" />
            </div>
            {/* Top-left smaller bloom */}
            <div
                className="fixed top-8 left-0 w-20 sm:w-28 md:w-36 pointer-events-none z-0 select-none"
                style={{ opacity: 0.09, mixBlendMode: "multiply", filter: "sepia(0.2) hue-rotate(-10deg)" }}
                aria-hidden="true"
            >
                <img src="/sketchbook/bloom.png" alt="" className="w-full h-auto object-contain -rotate-15" />
            </div>

            <Header data={common} />
            <div className='flex-1 overflow-y-auto'>
                <div className='max-w-[1220px] mx-auto min-h-full px-2 md:px-5'>
                    <div className='pb-16 md:pb-5'>
                        <main className='pb-6 md:pb-0'>
                            {children}
                        </main>
                    </div>
                </div>
            </div>

            <BottomBar />
        </div>
    );
}
'use client';

import { cn } from '@/lib/utils';
import { Contacts as ContactsType } from '@/shared/types/contacts';
import { PersonalInfo } from '@/shared/types/info';
import * as motion from "framer-motion/client";
import Image from 'next/image';
import Contacts from '../contacts';
import RealPaperBook from '@/components/sketchbook/RealPaperBook';
import PhotoGallery from '@/components/common/PhotoGallery';
import { useState } from 'react';
import { Camera, Sparkles } from 'lucide-react';

import LotusIcon from '@/components/icons/LotusIcon';

interface InfoProps {
    data: PersonalInfo;
    contacts: ContactsType;
    locale?: string;
}

export default function Info({ data, contacts, locale = 'en' }: InfoProps) {
    const [galleryOpen, setGalleryOpen] = useState(false);

    return (
        <motion.div
            variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
            }}
            initial='hidden'
            whileInView='visible'
            className='max-w-[1020px] mx-auto w-full'
        >
            <div className='flex items-start max-md:flex-col max-md:items-center max-md:space-y-8 md:space-x-12 lg:space-x-16'>
                {/* Left Column: Profile Photo + Visual Journal Trigger + Contacts directly below */}
                <div className='flex flex-col items-center flex-shrink-0 relative z-10'>
                    <div className='relative size-44 md:size-60 lg:size-64 group'>
                        {/* Ambient Breathing Luxury Aura (subtle and compact on mobile) */}
                        <div
                            className={cn(
                                'absolute -inset-1 sm:-inset-1.5 md:-inset-2.5 rounded-full pointer-events-none z-0',
                                'bg-gradient-to-tr from-ochre/20 via-coral/15 to-moonstone/20 dark:from-ochre/15 dark:via-coral/10 dark:to-moonstone/15 md:from-ochre/35 md:via-coral/25 md:to-moonstone/35',
                                'blur-sm md:blur-md opacity-35 sm:opacity-50 md:opacity-60 group-hover:opacity-100 group-hover:scale-105',
                                'transition-all duration-700 ease-out profile-luxury-aura'
                            )}
                            aria-hidden="true"
                        />

                        {/* Circular Profile Photo Frame — interactive trigger with clear visual feedback */}
                        <button
                            onClick={() => setGalleryOpen(true)}
                            aria-label={locale === 'kh' ? 'មើលកម្រងរូបភាព' : 'View visual journal'}
                            title={locale === 'kh' ? 'ចុចដើម្បីមើលកម្រងរូបភាព' : 'Click to explore visual journal'}
                            className={cn(
                                'relative z-10 w-full h-full rounded-full overflow-hidden',
                                'border-[2px] md:border-[2.5px] border-[#8d7c65]/60 dark:border-white/20',
                                'bg-main-mid dark:bg-alter-mid shadow-[0_4px_14px_-2px_rgba(0,0,0,0.12)] md:shadow-[0_12px_32px_-6px_rgba(0,0,0,0.25)]',
                                'cursor-pointer select-none',
                                'transition-all duration-500 ease-out',
                                'group-hover:scale-[1.03] group-hover:border-ochre dark:group-hover:border-ochre/90',
                                'focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre focus-visible:ring-offset-2'
                            )}
                        >
                            <Image
                                src={`/assets/images/${data.image}`}
                                alt={data.name || "Huo Menglang"}
                                fill
                                unoptimized
                                className='object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110'
                                priority
                            />

                            {/* Diagonal Shimmer Sweep on Hover */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                            {/* Subtle Ambient Vignette on Hover */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 pointer-events-none" />

                            {/* Hover Reveal: Glass Badge with Lotus and Prompt */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-3 text-center">
                                <div className={cn(
                                    'py-2 px-3.5 rounded-2xl bg-black/70 backdrop-blur-md text-white',
                                    'flex flex-col items-center gap-1 shadow-2xl border border-white/20',
                                    'opacity-0 scale-85 group-hover:opacity-100 group-hover:scale-100',
                                    'transition-all duration-300 ease-out'
                                )}>
                                    <div className="flex items-center gap-1.5 text-ochre-light">
                                        <LotusIcon className="w-5 h-5 text-ochre animate-pulse" />
                                        <Camera className="w-4 h-4 text-white/90" />
                                    </div>
                                    <span className={cn("text-[11px] font-medium tracking-wide text-neutral-100", locale === 'kh' ? 'font-hanuman' : 'font-antique')}>
                                        {locale === 'kh' ? 'កម្រងរូបភាព' : 'Explore Journal'}
                                    </span>
                                    <span className="text-[9px] font-mono text-neutral-300 uppercase tracking-widest">
                                        {locale === 'kh' ? '២៣ រូបថត' : '23 Photos'}
                                    </span>
                                </div>
                            </div>
                        </button>

                        {/* Interactive Floating Pill Badge at Bottom of Avatar */}
                        <button
                            onClick={() => setGalleryOpen(true)}
                            aria-label={locale === 'kh' ? 'បើកកម្រងរូបភាព' : 'Visual Journal'}
                            className={cn(
                                'absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 cursor-pointer',
                                'backdrop-blur-md bg-main-light/95 dark:bg-alter/95',
                                'border border-[#8d7c65]/50 dark:border-white/25',
                                'py-1.5 px-3.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.10)] md:shadow-[0_4px_16px_rgba(0,0,0,0.18)]',
                                'flex items-center gap-2',
                                'transition-all duration-300 ease-out',
                                'hover:scale-105 hover:border-ochre hover:shadow-ochre/25',
                                'group-hover:border-ochre'
                            )}
                        >
                            <LotusIcon className="w-4 h-4 text-ochre flex-shrink-0 animate-pulse" />
                            <span className={cn("text-[11px] font-semibold text-alter dark:text-main tracking-tight whitespace-nowrap", locale === 'kh' && 'font-hanuman')}>
                                {locale === 'kh' ? '២៣ អនុស្សាវរីយ៍' : '23 Moments'}
                            </span>
                            <span className="inline-block size-1.5 rounded-full bg-ochre animate-ping" />
                        </button>
                    </div>

                    {/* Title directly below profile picture on all viewports */}
                    <h1 className={cn(
                        'mt-5 sm:mt-6 text-lg sm:text-2xl md:text-3xl font-bold text-center text-alter dark:text-main tracking-tight',
                        locale === 'kh' ? 'font-hanuman' : 'font-antique'
                    )}>
                        {data.title}
                    </h1>

                    {/* GitHub, LinkedIn, Hire Me icons directly below title */}
                    <div className='mt-4 w-full flex justify-center'>
                        <Contacts contacts={contacts} />
                    </div>

                    {/* Explore Collections CTA Button — always visible, high affordance */}
                    <div className='mt-3.5 w-full flex justify-center'>
                        <button
                            onClick={() => setGalleryOpen(true)}
                            aria-label={locale === 'kh' ? 'មើលកម្រងរូបភាព' : 'Preview Collections'}
                            className={cn(
                                'group/cta relative overflow-hidden cursor-pointer',
                                'px-5 py-2.5 rounded-2xl',
                                'bg-gradient-to-r from-ochre/15 via-ochre/10 to-coral/15 dark:from-ochre/20 dark:via-ochre/15 dark:to-coral/20',
                                'border border-ochre/40 dark:border-ochre/30',
                                'shadow-[0_4px_16px_-2px_rgba(217,119,6,0.15)] hover:shadow-[0_8px_24px_-4px_rgba(217,119,6,0.3)]',
                                'transition-all duration-300 ease-out',
                                'hover:scale-[1.03] hover:border-ochre/60 active:scale-[0.98]',
                                'flex items-center gap-2.5'
                            )}
                        >
                            <LotusIcon className="w-[18px] h-[18px] text-ochre group-hover/cta:rotate-12 transition-transform duration-300" />
                            <span className={cn(
                                'text-sm font-semibold tracking-wide text-alter/85 dark:text-main/85',
                                locale === 'kh' ? 'font-hanuman' : 'font-antique'
                            )}>
                                {locale === 'kh' ? 'មើលកម្រងរូបភាព' : 'Preview Collections'}
                            </span>
                            <Camera className="w-4 h-4 text-ochre/70 group-hover/cta:translate-x-0.5 transition-transform duration-300" />

                            {/* Shimmer sweep on hover */}
                            <div className="absolute inset-0 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                        </button>
                    </div>
                </div>

                {/* Right Column: Real Paper Book */}
                <div className='flex-1 w-[85%] max-w-[640px] flex flex-col items-center md:items-start justify-center mx-auto md:mx-0 md:w-full'>
                    {/* Real Book showing 1 page with 3D flip & sub-paper stack */}
                    <div className='w-full'>
                        <RealPaperBook locale={locale} />
                    </div>
                </div>
            </div>

            {/* Photo Gallery Modal */}
            <PhotoGallery open={galleryOpen} onOpenChange={setGalleryOpen} locale={locale} />
        </motion.div>
    );
}

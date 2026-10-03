import { cn } from '@/lib/utils';
import { Contacts as ContactsType } from '@/shared/types/contacts';
import { PersonalInfo } from '@/shared/types/info';
import * as motion from "framer-motion/client";
import Image from 'next/image';
import Contacts from '../contacts';
import RealPaperBook from '@/components/sketchbook/RealPaperBook';

interface InfoProps {
    data: PersonalInfo;
    contacts: ContactsType;
    locale?: string;
}

export default function Info({ data, contacts, locale = 'en' }: InfoProps) {
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
                {/* Left Column: Profile Photo + Status Badge + Contacts directly below */}
                <div className='flex flex-col items-center flex-shrink-0 relative z-50'>
                    <div className='relative size-44 md:size-60 lg:size-64'>
                        {/* Circular Profile Photo Frame */}
                        <div className='w-full h-full rounded-full overflow-hidden border-2 border-main-dark dark:border-alter-light bg-main-mid dark:bg-alter-mid shadow-lg relative'>
                            <Image
                                src={`/assets/images/${data.image}`}
                                alt={data.name || "Huo Menglang"}
                                fill
                                unoptimized
                                className='object-cover object-center'
                                priority
                            />
                        </div>

                        {/* Status Badge in Top Right of Avatar */}
                        <div className='absolute -top-2 md:top-2 right-0 translate-x-1/6 z-10'>
                            <div className={cn(
                                'backdrop-blur-md bg-main-mid/90 dark:bg-alter-mid/90 py-1.5 px-3 rounded-2xl text-xs md:text-sm font-medium',
                                'border-2 border-main-dark dark:border-alter-light shadow-md text-alter dark:text-main whitespace-nowrap'
                            )}>
                                {data.status || "👨 Enjoy the Moment"}
                            </div>
                        </div>
                    </div>

                    {/* Title directly below profile picture on all viewports */}
                    <h1 className='mt-4 text-2xl sm:text-3xl md:text-3xl font-bold text-center text-alter dark:text-main'>
                        {data.title}
                    </h1>

                    {/* GitHub, LinkedIn, Hire Me icons directly below title */}
                    <div className='mt-4 w-full flex justify-center'>
                        <Contacts contacts={contacts} />
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
        </motion.div>
    );
}

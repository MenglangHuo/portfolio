import * as motion from 'framer-motion/client'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { Skills as SkillsType, SkillItem } from '@/shared/types/skills'

interface SkillCategoryItemProps {
    category: SkillsType
    id: number
    isKh: boolean
}

const SkillCategoryItem: React.FC<SkillCategoryItemProps> = ({ category, id, isKh }) => {
    return (
        <motion.div
            className='relative w-full pl-8'
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        delay: id * 0.15,
                        once: true,
                    },
                },
            }}
            viewport={{ once: true }}
            initial='hidden'
            animate='visible'
        >
            {/* Timeline Branch Node */}
            <div className='flex items-center absolute top-3.5 -left-[3.5px] -translate-y-1/2'>
                <div className='size-3 bg-main dark:bg-alter rounded-full border-2 border-main-dark dark:border-alter-light border-solid z-10'></div>
                <div className='w-5 border-2 border-main-mid dark:border-alter-light border-solid rounded-r-full -ml-1'></div>
            </div>

            {/* Category Header */}
            <div>
                <h2 className={`text-xl md:text-2xl font-bold text-alter dark:text-main ${isKh ? 'font-hanuman' : 'font-antique'}`}>
                    {category.title}
                </h2>
                <p className='text-xs md:text-sm text-alter-light/70 dark:text-main-light/60 mt-0.5 mb-4'>
                    {category.folder === 'backend'
                        ? (isKh ? 'ស្ថាបត្យកម្មប្រព័ន្ធកម្រិតខ្ពស់ Backend & Frontend' : 'Enterprise architecture, distributed microservices & modern web')
                        : (isKh ? 'ដំណើរការគ្រប់គ្រងម៉ាស៊ីនមេ និងពពក' : 'Cloud orchestration, containerization & infrastructure')}
                </p>

                {/* Interactive Listing (No cards, no boxes) */}
                <div className='flex flex-col divide-y divide-main-dark/10 dark:divide-alter-light/10'>
                    {category.stack.map((item: SkillItem, index: number) => (
                        <motion.div
                            key={index}
                            whileHover={{ x: 6 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                            className='group flex items-center justify-between py-3 px-2 rounded-lg transition-colors hover:bg-main-mid/25 dark:hover:bg-alter-mid/20 cursor-default'
                        >
                            <div className='flex items-center gap-3.5'>
                                <div className='size-8 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-115 group-hover:rotate-3'>
                                    {item.altIcon ? (
                                        <>
                                            <Image
                                                src={`/assets/icons/${category.folder}/${item.icon}`}
                                                alt={item.title}
                                                width={28}
                                                height={28}
                                                unoptimized
                                                className='dark:hidden object-contain'
                                            />
                                            <Image
                                                src={`/assets/icons/${category.folder}/${item.altIcon}`}
                                                alt={item.title}
                                                width={28}
                                                height={28}
                                                unoptimized
                                                className='hidden dark:block object-contain'
                                            />
                                        </>
                                    ) : (
                                        <Image
                                            src={`/assets/icons/${category.folder}/${item.icon}`}
                                            alt={item.title}
                                            width={28}
                                            height={28}
                                            unoptimized
                                            className='object-contain'
                                        />
                                    )}
                                </div>
                                <span className='text-sm sm:text-base font-medium text-alter/90 dark:text-main/90 group-hover:text-alter dark:group-hover:text-main transition-colors'>
                                    {item.title}
                                </span>
                            </div>

                            <div className='flex items-center gap-1.5 text-xs text-alter-light/60 dark:text-main-light/50 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                                <span className='hidden sm:inline'>{isKh ? 'ជំនាញស្នូល' : 'Core Tech'}</span>
                                <span className='text-[#a8743d] dark:text-[#d1a36a]'>✦</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default function Skills({ data }: { data: SkillsType[] }) {
    const t = useTranslations('about.skills')
    const locale = useLocale()
    const isKh = locale === 'kh'

    return (
        <div className='py-4 md:py-8'>
            <h1 className={`text-2xl md:text-3xl font-bold text-center mb-10 ${isKh ? 'font-hanuman' : 'font-antique'}`}>
                {t('title')}
            </h1>

            <div className='relative max-w-[700px] mx-auto pl-3'>
                {/* Vertical Timeline Bar */}
                <div className='absolute top-0 left-3 h-full border-2 border-main-mid dark:border-alter-light border-solid rounded-full'>
                    {/* Top Marker */}
                    <div className='absolute -top-2.5 -left-2.5 flex items-center gap-3'>
                        <div className='size-5 bg-main dark:bg-alter rounded-full border-4 border-main-dark dark:border-alter-light border-solid'></div>
                        <div className='text-alter/60 dark:text-main text-xs sm:text-sm font-semibold whitespace-nowrap'>
                            {isKh ? 'បច្ចេកវិទ្យាស្នូល' : 'Tech Stack'}
                        </div>
                    </div>
                    {/* Bottom Marker */}
                    <div className='absolute -bottom-2.5 -left-2.5 flex items-center gap-3'>
                        <div className='size-5 bg-main dark:bg-alter rounded-full border-4 border-main-dark dark:border-alter-light border-solid'></div>
                        <div className='text-alter/60 dark:text-main text-xs sm:text-sm font-semibold whitespace-nowrap'>
                            {isKh ? 'ការសិក្សាជាប្រចាំ' : 'Continuous Learning'}
                        </div>
                    </div>
                </div>

                {/* Timeline Category Listing */}
                <div className='py-12 space-y-14'>
                    {data.map((category, index) => (
                        <SkillCategoryItem
                            key={index}
                            category={category}
                            id={index}
                            isKh={isKh}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
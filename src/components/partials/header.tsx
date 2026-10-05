'use client'

import LangSwitcher from './lang-switcher'
import LotusIcon from '@/components/icons/LotusIcon'
import { Link, usePathname } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import 'next/navigation'

import { links } from '@/shared/constants/nav-links'
import { Common } from '@/shared/types/common'

export default function Header({ data }: { data: Common }) {
    const pathname = usePathname()
    const t = useTranslations('navigation')

    // const { isLoggedIn, checkAuth } = useAuth()

    const currentPath = pathname?.split('/')[1]

    return (
        <header className='sticky top-0 left-0 w-full z-40 pointer-events-none'>
            {/* Mobile: Lotus icon on the left, lang switcher on the right */}
            <div className='md:hidden flex items-center justify-between px-3.5 py-2 pointer-events-auto'>
                <Link
                    href='/'
                    className='flex items-center justify-center size-9 rounded-xl transition-all touch-manipulation bg-main-mid-light/80 dark:bg-alter-light/60 backdrop-blur-md hover:bg-main dark:hover:bg-alter-light border border-main-dark/20 dark:border-alter-light/40 text-ochre active:scale-95 shadow-sm'
                    aria-label='Home'
                >
                    <LotusIcon className='w-5 h-5 text-ochre' />
                </Link>
                <LangSwitcher />
            </div>

            {/* Desktop: full navbar */}
            <div className='hidden md:block h-full max-w-[1220px] mx-auto px-5 py-2 pointer-events-auto'>
                <div className='px-3 py-2 rounded-2xl backdrop-blur-lg bg-main-light/80 dark:bg-alter-mid-light/80 border border-main-dark/15 dark:border-alter-light/25 shadow-sm'>
                    <div className='flex items-center justify-between'>
                        {/* Logo + Status */}
                        <div className='flex items-center gap-2'>
                            <Link
                                href='/'
                                className='flex items-center gap-2 group'
                                aria-label='Home'
                            >
                                <span className='p-1.5 rounded-xl bg-ochre/15 dark:bg-ochre/25 text-ochre border border-ochre/30 group-hover:bg-ochre/25 group-hover:border-ochre/50 shadow-sm transition-all duration-300'>
                                    <LotusIcon className='w-5 h-5 text-ochre transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6' />
                                </span>
                                <span className='text-ochre text-lg font-semibold transition-colors group-hover:text-ochre-dark'>
                                    {data.logo.text}
                                </span>
                            </Link>
                            <div className='flex items-center gap-1.5 ml-2 pl-2 border-l border-main-dark/15 dark:border-alter-light/20'>
                                <span className='relative flex size-1.5'>
                                    <span
                                        className={cn(
                                            'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
                                            data.available ? 'bg-green-400' : 'bg-red-400'
                                        )}
                                    ></span>
                                    <span
                                        className={cn(
                                            'relative inline-flex rounded-full size-1.5',
                                            data.available ? 'bg-green-500' : 'bg-red-500'
                                        )}
                                    ></span>
                                </span>
                                <p className='text-[11px] text-alter/60 dark:text-main/60'>
                                    {data.status} / {data.workType}
                                </p>
                            </div>
                        </div>

                        {/* Nav Links */}
                        <nav aria-label='Global'>
                            <ul className='flex items-center gap-1'>
                                {links.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            href={link.href}
                                            className={cn(
                                                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                                                'hover:bg-main-mid/70 dark:hover:bg-alter-light/50',
                                                'text-alter/70 dark:text-main/70',
                                                currentPath === link.path &&
                                                    'bg-main-mid dark:bg-alter-light text-ochre dark:text-ochre font-semibold'
                                            )}
                                        >
                                            <link.icon className='w-3.5 h-3.5' />
                                            {t(link.label)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Lang Switcher */}
                        <LangSwitcher />
                    </div>
                </div>
            </div>
        </header>
    )
}

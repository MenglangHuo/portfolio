"use client"

import { Locale, routing, usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { useState, useRef, useEffect } from "react";

const FLAGS: Record<string, { flag: string; label: string }> = {
  en: { flag: "🇺🇸", label: "English" },
  kh: { flag: "🇰🇭", label: "ខ្មែរ" },
};

export default function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const locales = routing.locales;

  // Close dropdown on outside click or touch
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleChangeLang = (code: Locale) => {
    setOpen(false);
    router.replace(pathname, {
      locale: code,
      scroll: false,
    });
  };

  const current = FLAGS[locale] || FLAGS.en;

  return (
    <div ref={dropdownRef} className="relative z-50">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition-all touch-manipulation",
          "bg-main-mid-light/80 dark:bg-alter-light/60",
          "hover:bg-main dark:hover:bg-alter-light",
          "border border-main-dark/20 dark:border-alter-light/40",
          "text-sm cursor-pointer select-none active:scale-95"
        )}
        aria-label="Switch language"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <svg
          className={cn(
            "w-3 h-3 text-alter/60 dark:text-main/60 transition-transform",
            open && "rotate-180"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className={cn(
            "absolute right-0 top-full mt-1.5 z-[60] min-w-[145px]",
            "rounded-xl overflow-hidden shadow-xl",
            "bg-main-light/95 dark:bg-alter-mid-light/95 backdrop-blur-md",
            "border border-main-dark/20 dark:border-alter-light/40",
            "animate-in fade-in-0 zoom-in-95 duration-150"
          )}
        >
          {locales.map((code) => {
            const item = FLAGS[code] || { flag: code, label: code };
            const isActive = locale === code;
            return (
              <button
                key={code}
                type="button"
                onClick={() => handleChangeLang(code)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3.5 py-3 sm:py-2.5 text-sm transition-colors cursor-pointer touch-manipulation",
                  "text-alter dark:text-main text-left",
                  "hover:bg-main-mid dark:hover:bg-alter-light active:bg-main-mid/90",
                  isActive && "bg-main-mid/70 dark:bg-alter-light/50 font-semibold"
                )}
              >
                <span className="text-base leading-none">{item.flag}</span>
                <span className={cn("font-medium", code === 'kh' && "font-hanuman")}>{item.label}</span>
                {isActive && (
                  <svg className="w-3.5 h-3.5 ml-auto text-alter/70 dark:text-main/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    Maximize2,
    Pause,
    Play,
    X,
    ZoomIn,
    ZoomOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Dialog,
    DialogContent,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
} from '@/components/ui/dialog';
import LotusIcon from '@/components/icons/LotusIcon';

/* =====================================================================
   GALLERY DATA (23 MOMENTS)
   ===================================================================== */

export interface GalleryItem {
    id: string;
    src: string;
    titleEn: string;
    titleKh: string;
    captionEn: string;
    captionKh: string;
    width: number;
    height: number;
    ratio: number;
    orientation: 'portrait' | 'landscape' | 'square';
    tagEn: string;
    tagKh: string;
    dateEn: string;
    dateKh: string;
    rotation: number;
    tapeColor?: string;
}

const GALLERY_COLLECTION: GalleryItem[] = [
    {
        id: 'collection-1',
        src: '/assets/about-me/collection-1.jpg',
        titleEn: 'Dojo Meditation & Focus',
        titleKh: 'សមាធិ និងការផ្ចង់ស្មារតីលើកម្រាលគុន',
        captionEn: 'Embracing discipline, stillness, and inner calm in the karate dojo',
        captionKh: 'ការហ្វឹកហាត់ផ្ចង់ស្មារតី វិន័យ និងភាពស្ងប់ក្នុងចិត្តលើកម្រាលការ៉ាតេដូ',
        width: 2964,
        height: 2460,
        ratio: 1.2,
        orientation: 'landscape',
        tagEn: 'Martial Arts',
        tagKh: 'ក្បាច់គុន',
        dateEn: 'Black Belt Journey',
        dateKh: 'មាគ៌ាខ្សែក្រវាត់ខ្មៅ',
        rotation: -1.8,
        tapeColor: 'linear-gradient(135deg, rgba(217,119,6,0.45) 0%, rgba(245,230,211,0.65) 100%)',
    },
    {
        id: 'collection-2',
        src: '/assets/about-me/collection-2.jpg',
        titleEn: 'Graduation with Sensei',
        titleKh: 'ពិធីទទួលសញ្ញាបត្រជាមួយលោកគ្រូ',
        captionEn: 'Celebrating milestone belt promotions and certificates alongside master and peers',
        captionKh: 'ការអបអរសាទរជោគជ័យនៃការដំឡើងកម្រិតខ្សែក្រវាត់ និងវិញ្ញាបនបត្រជាមួយលោកគ្រូ និងមិត្តរួមថ្នាក់',
        width: 3463,
        height: 2309,
        ratio: 1.5,
        orientation: 'landscape',
        tagEn: 'Graduation',
        tagKh: 'សញ្ញាបត្រ',
        dateEn: 'Dojo Ceremony',
        dateKh: 'ពិធីប្រគល់សញ្ញាបត្រ',
        rotation: 1.5,
        tapeColor: 'linear-gradient(135deg, rgba(180,83,9,0.4) 0%, rgba(254,243,199,0.6) 100%)',
    },
    {
        id: 'collection-3',
        src: '/assets/about-me/collection-3.jpg',
        titleEn: 'National Games Podium',
        titleKh: 'វេទិកាជ័យលាភីកីឡាជាតិ',
        captionEn: 'Standing proud on the podium at the National Games with coaches and officials',
        captionKh: 'មោទនភាពឈរលើវេទិកាជ័យលាភីក្នុងការប្រកួតកីឡាជាតិ រួមជាមួយលោកគ្រូបង្វឹកនិងមិត្តរួមក្រុម',
        width: 1080,
        height: 720,
        ratio: 1.5,
        orientation: 'landscape',
        tagEn: 'Championship',
        tagKh: 'ជើងឯក',
        dateEn: 'National Games',
        dateKh: 'កីឡាជាតិ',
        rotation: -2.2,
        tapeColor: 'linear-gradient(135deg, rgba(153,80,30,0.4) 0%, rgba(245,225,200,0.6) 100%)',
    },
    {
        id: 'collection-4',
        src: '/assets/about-me/collection-4.jpg',
        titleEn: 'Shared Victory & Medal',
        titleKh: 'ជ័យជម្នះ និងមេដាយជាមួយសិស្សច្បង',
        captionEn: 'Holding the tournament medal together, a testament to shared dedication',
        captionKh: 'កាន់មេដាយជ័យលាភីជាមួយមិត្តភក្តិ ជាសក្ខីភាពនៃការខិតខំហ្វឹកហាត់រួមគ្នា',
        width: 2449,
        height: 3265,
        ratio: 0.75,
        orientation: 'portrait',
        tagEn: 'Achievement',
        tagKh: 'សមិទ្ធផល',
        dateEn: 'Medal Moment',
        dateKh: 'វេលាមេដាយ',
        rotation: 2.0,
        tapeColor: 'linear-gradient(135deg, rgba(101,130,85,0.4) 0%, rgba(230,240,225,0.6) 100%)',
    },
    {
        id: 'collection-5',
        src: '/assets/about-me/collection-5.jpg',
        titleEn: 'Honor & Brotherhood',
        titleKh: 'កិត្តិយស និងភាពកីឡាជាមួយសិស្សច្បង',
        captionEn: 'Standing with mentor and brother who supported every round of the competition',
        captionKh: 'ឈរជាមួយគ្រូបង្វឹកនិងរៀមច្បងដែលតែងតែគាំទ្រគ្រប់ការប្រកួតនិងការហ្វឹកហាត់',
        width: 2449,
        height: 3265,
        ratio: 0.75,
        orientation: 'portrait',
        tagEn: 'Fellowship',
        tagKh: 'ភាតរភាព',
        dateEn: 'Tournament Day',
        dateKh: 'ថ្ងៃប្រកួត',
        rotation: -1.4,
        tapeColor: 'linear-gradient(135deg, rgba(140,110,80,0.4) 0%, rgba(240,230,215,0.6) 100%)',
    },
    {
        id: 'collection-6',
        src: '/assets/about-me/collection-6.jpg',
        titleEn: 'Old School Karate Friend',
        titleKh: 'មិត្តចាស់ក្នុងក្លឹបកីឡាការ៉ាតេដូ',
        captionEn: 'Proudly representing the Ministry of Economy and Finance Karate Club',
        captionKh: 'មោទនភាពតំណាងឱ្យក្លឹបកីឡាការ៉ាតេដូ ក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុ',
        width: 4000,
        height: 3000,
        ratio: 1.33,
        orientation: 'landscape',
        tagEn: 'Club Spirit',
        tagKh: 'ស្មារតីក្លឹប',
        dateEn: 'MEF Tournament',
        dateKh: 'ការប្រកួតក្លឹប',
        rotation: 1.6,
        tapeColor: 'linear-gradient(135deg, rgba(70,120,150,0.4) 0%, rgba(220,235,245,0.6) 100%)',
    },
    {
        id: 'collection-7',
        src: '/assets/about-me/collection-7.jpg',
        titleEn: 'Belt Grading & Respect',
        titleKh: 'ការគោរពក្នុងពិធីប្តូរខ្សែក្រវាត់',
        captionEn: 'Bowing with utmost respect while receiving the advanced rank belt from Sensei',
        captionKh: 'លំឱនកាយដោយការគោរពយ៉ាងជ្រាលជ្រៅពេលទទួលខ្សែក្រវាត់កម្រិតខ្ពស់ពីលោកគ្រូ',
        width: 1280,
        height: 960,
        ratio: 1.33,
        orientation: 'landscape',
        tagEn: 'Respect',
        tagKh: 'ការគោរព',
        dateEn: 'Belt Grading',
        dateKh: 'ការប្រឡងឡើងកម្រិត',
        rotation: -1.7,
        tapeColor: 'linear-gradient(135deg, rgba(200,120,50,0.4) 0%, rgba(250,235,220,0.6) 100%)',
    },
    {
        id: 'collection-8',
        src: '/assets/about-me/collection-8.jpg',
        titleEn: 'Dojo Training Sweat & Smiles',
        titleKh: 'ស្នាមញញឹមក្រោោយការហ្វឹកហាត់',
        captionEn: 'Smiles and sweat with training brothers after an intense session in the dojo',
        captionKh: 'ស្នាមញញឹមនិងញើសហូរស្រក់ជាមួយបងប្អូនរួមសង្វៀន បន្ទាប់ពីការហ្វឹកហាត់យ៉ាងស្វិតស្វាញ',
        width: 4032,
        height: 3024,
        ratio: 1.33,
        orientation: 'landscape',
        tagEn: 'Teammates',
        tagKh: 'មិត្តរួមក្រុម',
        dateEn: 'Training Memoir',
        dateKh: 'អនុស្សាវរីយ៍ហ្វឹកហាត់',
        rotation: 2.1,
        tapeColor: 'linear-gradient(135deg, rgba(90,140,100,0.4) 0%, rgba(230,245,235,0.6) 100%)',
    },
    {
        id: 'collection-9',
        src: '/assets/about-me/collection-9.jpg',
        titleEn: 'Youthful Days at the Temple',
        titleKh: 'អនុស្សាវរីយ៍វ័យក្មេងនៅប្រាសាទបុរាណ',
        captionEn: 'Three good friends resting together by ancient sandstone temple walls, 2018',
        captionKh: 'មិត្តភក្តិ ៣ នាក់អង្គុយសម្រាកក្បែរកំផែងថ្មប្រាសាទបុរាណ នាដើមឆ្នាំ ២០១៨',
        width: 1080,
        height: 810,
        ratio: 1.33,
        orientation: 'landscape',
        tagEn: 'Nostalgia',
        tagKh: 'អនុស្សាវរីយ៍',
        dateEn: 'January 2018',
        dateKh: 'មករា ២០១៨',
        rotation: -2.0,
        tapeColor: 'linear-gradient(135deg, rgba(160,110,60,0.4) 0%, rgba(245,230,215,0.6) 100%)',
    },
    {
        id: 'collection-10',
        src: '/assets/about-me/collection-10.jpg',
        titleEn: 'Ancient Temple Expedition',
        titleKh: 'ដំណើរកម្សាន្តប្រាសាទបុរាណ',
        captionEn: 'Exploring ancient Khmer heritage and stone wonders with close companions',
        captionKh: 'ដើរកម្សាន្តស្វែងយល់ពីបេតិកភណ្ឌប្រាសាទបុរាណខ្មែរជាមួយមិត្តភក្តិជិតស្និទ្ធ',
        width: 1280,
        height: 960,
        ratio: 1.33,
        orientation: 'landscape',
        tagEn: 'Heritage',
        tagKh: 'បេតិកភណ្ឌ',
        dateEn: 'Temple Walk',
        dateKh: 'ដំណើរទស្សនកិច្ច',
        rotation: 1.3,
        tapeColor: 'linear-gradient(135deg, rgba(180,90,40,0.4) 0%, rgba(250,225,205,0.6) 100%)',
    },
    {
        id: 'collection-11',
        src: '/assets/about-me/collection-11.jpg',
        titleEn: 'Arena Comrades & Team Spirit',
        titleKh: 'សិស្សរួមគ្រូ និងស្មារតីក្រុមលើកម្រាលប្រកួត',
        captionEn: 'Standing shoulder to shoulder with good companions ready for tournament trials',
        captionKh: 'ឈរប្រកៀកស្មាជាមួយមិត្តភក្តិដ៏ស្មោះត្រង់ ត្រៀមខ្លួនសម្រាប់រាល់ការប្រកួតប្រជែង',
        width: 1440,
        height: 1080,
        ratio: 1.33,
        orientation: 'landscape',
        tagEn: 'Team Spirit',
        tagKh: 'ស្មារតីក្រុម',
        dateEn: 'Competition Day',
        dateKh: 'ថ្ងៃប្រកួតប្រជែង',
        rotation: -1.5,
        tapeColor: 'linear-gradient(135deg, rgba(140,90,150,0.35) 0%, rgba(240,225,245,0.6) 100%)',
    },
    {
        id: 'collection-12',
        src: '/assets/about-me/collection-12.jpg',
        titleEn: 'Tournament Medals & Certificates',
        titleKh: 'ជ័យលាភីកាតាក្រុមក',
        captionEn: 'Proudly showcasing tournament medals and certificates with training brothers',
        captionKh: 'បង្ហាញមេដាយនិងសញ្ញាបត្រជ័យលាភីយ៉ាងមានមោទនភាពជាមួយបងប្អូនរួមក្រុម',
        width: 810,
        height: 810,
        ratio: 1.0,
        orientation: 'square',
        tagEn: 'Victory',
        tagKh: 'ជ័យជម្នះ',
        dateEn: 'Award Day',
        dateKh: 'ថ្ងៃទទួលរង្វាន់',
        rotation: 1.8,
        tapeColor: 'linear-gradient(135deg, rgba(110,130,90,0.4) 0%, rgba(235,245,230,0.6) 100%)',
    },
    {
        id: 'collection-13',
        src: '/assets/about-me/collection-13.jpg',
        titleEn: 'Countryside Horse Cart Journey',
        titleKh: 'រទេះសេះនៅល្អាងភ្នំកំពង់ត្រាច',
        captionEn: 'Riding a horse cart beneath towering limestone cliffs, embracing rustic charm',
        captionKh: 'ជិះរទេះសេះកាត់ជើងភ្នំថ្មកំបោរ ស្រូបយកបរិយាកាសដ៏ស្ងប់ស្ងាត់នៃស្រុកស្រែជនបទ',
        width: 3468,
        height: 4624,
        ratio: 0.75,
        orientation: 'portrait',
        tagEn: 'Rural Life',
        tagKh: 'ជីវិតជនបទ',
        dateEn: 'Country Trail',
        dateKh: 'ដំណើរស្រុកស្រែ',
        rotation: -1.9,
        tapeColor: 'linear-gradient(135deg, rgba(200,140,40,0.45) 0%, rgba(255,240,210,0.6) 100%)',
    },
    {
        id: 'collection-14',
        src: '/assets/about-me/collection-14.jpg',
        titleEn: 'Gate of Angkor Thom',
        titleKh: 'ខ្លោងទ្វារអង្គរធំ',
        captionEn: 'Standing before the legendary stone face gate guarding the ancient royal capital',
        captionKh: 'ឈរនៅមុខខ្លោងទ្វារថ្មមុខបួនដ៏អស្ចារ្យដែលការពាររាជធានីបុរាណអង្គរធំ',
        width: 3456,
        height: 3456,
        ratio: 1.0,
        orientation: 'square',
        tagEn: 'Angkor',
        tagKh: 'អង្គរ',
        dateEn: 'Angkor Thom',
        dateKh: 'អង្គរធំ',
        rotation: 1.4,
        tapeColor: 'linear-gradient(135deg, rgba(160,120,70,0.4) 0%, rgba(245,235,220,0.6) 100%)',
    },
    {
        id: 'collection-15',
        src: '/assets/about-me/collection-15.jpg',
        titleEn: 'Golden Pagoda Blessing',
        titleKh: 'ការគោរពសក្ការៈនៅទីសក្ការបូជា',
        captionEn: 'Offering respectful prayer before the shimmering golden stupa',
        captionKh: 'លើកដៃសំពះបួងសួងសុំសេចក្តីសុខនៅមុខព្រះចេតិយមាសដ៏ឧត្តុង្គឧត្តម',
        width: 960,
        height: 1280,
        ratio: 0.75,
        orientation: 'portrait',
        tagEn: 'Spiritual',
        tagKh: 'សេចក្តីស្ងប់',
        dateEn: 'Temple Visit',
        dateKh: 'ដំណើរទៅវត្ត',
        rotation: -2.3,
        tapeColor: 'linear-gradient(135deg, rgba(95,135,80,0.4) 0%, rgba(230,245,225,0.6) 100%)',
    },
    {
        id: 'collection-16',
        src: '/assets/about-me/collection-16.jpg',
        titleEn: 'Oudong Mountain Pilgrimage',
        titleKh: 'ដំណើរឡើងភ្នំឧដុង្គ',
        captionEn: 'Reaching the grand royal stupa at sacred Oudong mountain under sunny skies',
        captionKh: 'ឡើងដល់កំពូលភ្នំព្រះរាជទ្រព្យ (ភ្នំឧដុង្គ) ថតរូបអនុស្សាវរីយ៍មុខព្រះចេតិយបុរាណ',
        width: 1280,
        height: 960,
        ratio: 1.33,
        orientation: 'landscape',
        tagEn: 'Pilgrimage',
        tagKh: 'ធម្មយាត្រា',
        dateEn: 'Oudong Trip',
        dateKh: 'ដំណើរទៅឧដុង្គ',
        rotation: 1.9,
        tapeColor: 'linear-gradient(135deg, rgba(80,115,145,0.4) 0%, rgba(225,235,245,0.6) 100%)',
    },
    {
        id: 'collection-17',
        src: '/assets/about-me/collection-17.jpg',
        titleEn: 'In Presence of Jayavarman VII',
        titleKh: 'សារមន្ទីរជាតិកម្ពុជា និងរូបសំណាកព្រះបាទជ័យវរ្ម័នទី ៧',
        captionEn: 'Admiring masterpieces of ancient Khmer sculpture at the National Museum of Cambodia',
        captionKh: 'ទស្សនាផ្ទាំងចម្លាក់បដិមាក្នុងសារមន្ទីរជាតិកម្ពុជា នៅចំពោះរូបសំណាកព្រះបាទជ័យវរ្ម័នទី ៧',
        width: 3265,
        height: 2449,
        ratio: 1.33,
        orientation: 'landscape',
        tagEn: 'Museum',
        tagKh: 'សារមន្ទីរ',
        dateEn: 'National Museum',
        dateKh: 'សារមន្ទីរជាតិ',
        rotation: -1.3,
        tapeColor: 'linear-gradient(135deg, rgba(210,140,50,0.4) 0%, rgba(255,245,225,0.6) 100%)',
    },
    {
        id: 'collection-18',
        src: '/assets/about-me/collection-18.jpeg',
        titleEn: 'Tournament Fellowship',
        titleKh: 'ភាតរភាពលើសង្វៀនប្រកួត',
        captionEn: 'Celebrating victorious matches together on the championship tatami',
        captionKh: 'អបអរជ័យជម្នះរួមគ្នាលើកម្រាលប្រកួត បន្ទាប់ពីការតស៊ូយ៉ាងស្វិតស្វាញ',
        width: 2000,
        height: 1500,
        ratio: 1.33,
        orientation: 'landscape',
        tagEn: 'Tournament',
        tagKh: 'ការប្រកួត',
        dateEn: 'Championship',
        dateKh: 'ជើងឯក',
        rotation: 2.2,
        tapeColor: 'linear-gradient(135deg, rgba(65,130,145,0.4) 0%, rgba(220,240,245,0.6) 100%)',
    },
    {
        id: 'collection-19',
        src: '/assets/about-me/collection-19.jpeg',
        titleEn: 'Mekong River Joy',
        titleKh: 'ភាពសប្បាយរីករាយនៅមាត់ទន្លេ',
        captionEn: 'Splashing into the refreshing river waters with close friends',
        captionKh: 'លេងទឹកទន្លេមេគង្គយ៉ាងសប្បាយរីករាយ និងស្រស់ស្រាយជាមួយមិត្តភក្តិ',
        width: 2048,
        height: 1536,
        ratio: 1.33,
        orientation: 'landscape',
        tagEn: 'River Joy',
        tagKh: 'មាត់ទឹក',
        dateEn: 'River Days',
        dateKh: 'អនុស្សាវរីយ៍មាត់ទឹក',
        rotation: -1.6,
        tapeColor: 'linear-gradient(135deg, rgba(90,140,90,0.4) 0%, rgba(230,245,230,0.6) 100%)',
    },
    {
        id: 'collection-20',
        src: '/assets/about-me/collection-20.jpg',
        titleEn: 'Ascending Angkor Wat',
        titleKh: 'ដំណើរឡើងប្រាសាទអង្គរវត្ត',
        captionEn: 'Climbing the grand sandstone steps of the world-renowned Angkor Wat temple',
        captionKh: 'ឈានជើងឡើងតាមជណ្តើរថ្មភក់បុរាណនៃមហាប្រាសាទអង្គរវត្តដ៏អស្ចារ្យ',
        width: 1280,
        height: 960,
        ratio: 1.33,
        orientation: 'landscape',
        tagEn: 'Angkor Wat',
        tagKh: 'អង្គរវត្ត',
        dateEn: 'Temple Steps',
        dateKh: 'ជណ្តើរប្រាសាទ',
        rotation: 1.5,
        tapeColor: 'linear-gradient(135deg, rgba(60,110,130,0.4) 0%, rgba(215,230,240,0.6) 100%)',
    },
    {
        id: 'collection-21',
        src: '/assets/about-me/collection-21.jpg',
        titleEn: 'Enjoying Cave Walks at Kampong Trach',
        titleKh: 'រីករាយនឹងការដើររូងភ្នំកំពង់ត្រាច',
        captionEn: 'Discovering hidden caverns and towering limestone cliff walls together',
        captionKh: 'រុករកអាថ៌កំបាំងរូងភ្នំធម្មជាតិ និងជញ្ជាំងថ្មកំបោរដ៏ខ្ពស់ជាមួយមិត្តភក្តិ',
        width: 960,
        height: 1280,
        ratio: 0.75,
        orientation: 'portrait',
        tagEn: 'Cave Walk',
        tagKh: 'រូងភ្នំ',
        dateEn: 'Mountain Cave',
        dateKh: 'ភ្នំធម្មជាតិ',
        rotation: -2.1,
        tapeColor: 'linear-gradient(135deg, rgba(120,135,90,0.4) 0%, rgba(235,245,225,0.6) 100%)',
    },
    {
        id: 'collection-22',
        src: '/assets/about-me/collection-22.jpg',
        titleEn: 'Brothers at Ancient Gates',
        titleKh: 'ដៃគូដៃកង់តាំងពីវិទ្យាល័យ',
        captionEn: 'Standing together in matching red before ancient temple sanctuaries',
        captionKh: 'ឈរជាមួយគ្នាក្នុងឯកសណ្ឋានអាវក្រហម នៅមុខខ្លោងទ្វារប្រាសាទបុរាណដ៏ស្កឹមស្កៃ',
        width: 1280,
        height: 960,
        ratio: 1.33,
        orientation: 'landscape',
        tagEn: 'Friendship',
        tagKh: 'មិត្តភាព',
        dateEn: 'Temple Journey',
        dateKh: 'ដំណើរប្រាសាទ',
        rotation: 1.7,
        tapeColor: 'linear-gradient(135deg, rgba(200,95,45,0.4) 0%, rgba(255,230,215,0.6) 100%)',
    },
    {
        id: 'collection-23',
        src: '/assets/about-me/collection-23.jpg',
        titleEn: 'Eden Garden With Teacher & Friends',
        titleKh: 'រាត្រីជួបជុំនៅ ជាមួយគ្រូ និងមិត្តភក្តិ',
        captionEn: 'Strolling beneath the colorful canopy of umbrellas with friends in Phnom Penh',
        captionKh: 'ដើរកម្សាន្តក្រោមឆ័ត្រចម្រុះពណ៌ដ៏ស្រស់ស្អាតជាមួយមិត្តភក្តិនៅ Eden Garden ភ្នំពេញ',
        width: 720,
        height: 960,
        ratio: 0.75,
        orientation: 'portrait',
        tagEn: 'Night Life',
        tagKh: 'រាត្រីជួបជុំ',
        dateEn: 'Phnom Penh Night',
        dateKh: 'រាត្រីភ្នំពេញ',
        rotation: -1.2,
        tapeColor: 'linear-gradient(135deg, rgba(135,90,140,0.4) 0%, rgba(240,230,245,0.6) 100%)',
    },
];

interface PhotoGalleryProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    locale?: string;
}

const KHMER_DIGITS = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
const toKhmerNum = (n: number) =>
    String(n)
        .split('')
        .map((d) => KHMER_DIGITS[parseInt(d)] || d)
        .join('');

export default function PhotoGallery({ open, onOpenChange, locale = 'en' }: PhotoGalleryProps) {
    const isKh = locale === 'kh';
    const fontClass = isKh ? 'font-hanuman' : 'font-antique';

    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [slideProgress, setSlideProgress] = useState(0);
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
    const lightboxThumbnailRef = useRef<HTMLDivElement>(null);

    const lightboxOpen = lightboxIndex !== null;

    const activeImage = useMemo(() => {
        if (lightboxIndex !== null) {
            return GALLERY_COLLECTION[lightboxIndex] || GALLERY_COLLECTION[0];
        }
        return GALLERY_COLLECTION[0];
    }, [lightboxIndex]);

    const closeLightbox = useCallback(() => {
        setIsPlaying(false);
        setLightboxIndex(null);
        setIsZoomed(false);
        setSlideProgress(0);
    }, []);

    const goNext = useCallback(() => {
        setDirection(1);
        setLightboxIndex((prev) => {
            if (prev === null) return null;
            return (prev + 1) % GALLERY_COLLECTION.length;
        });
        setIsZoomed(false);
        setSlideProgress(0);
    }, []);

    const goPrev = useCallback(() => {
        setDirection(-1);
        setLightboxIndex((prev) => {
            if (prev === null) return null;
            return (prev - 1 + GALLERY_COLLECTION.length) % GALLERY_COLLECTION.length;
        });
        setIsZoomed(false);
        setSlideProgress(0);
    }, []);

    const startSlideshow = useCallback(() => {
        if (lightboxIndex === null) {
            setLightboxIndex(0);
        }
        setIsPlaying(true);
        setIsZoomed(false);
        setSlideProgress(0);
    }, [lightboxIndex]);

    // Active Slideshow Engine with Live Visual Progress Bar
    useEffect(() => {
        if (!isPlaying || lightboxIndex === null) {
            setSlideProgress(0);
            return;
        }

        const SLIDE_DURATION = 3200; // 3.2 seconds per slide
        const TICK_INTERVAL = 40; // 40ms update tick
        let accumulatedTime = 0;

        const timer = setInterval(() => {
            accumulatedTime += TICK_INTERVAL;
            const percent = (accumulatedTime / SLIDE_DURATION) * 100;

            if (percent >= 100) {
                accumulatedTime = 0;
                setSlideProgress(0);
                goNext();
            } else {
                setSlideProgress(Math.min(100, percent));
            }
        }, TICK_INTERVAL);

        return () => clearInterval(timer);
    }, [isPlaying, lightboxIndex, goNext]);

    // Keyboard navigation
    useEffect(() => {
        if (!lightboxOpen) return;

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                goNext();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                goPrev();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                closeLightbox();
            } else if (e.key === ' ') {
                e.preventDefault();
                setIsPlaying((p) => !p);
            }
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [lightboxOpen, goNext, goPrev, closeLightbox]);

    // Auto-scroll active thumbnail in lightbox
    useEffect(() => {
        if (lightboxIndex !== null && lightboxThumbnailRef.current) {
            const container = lightboxThumbnailRef.current;
            const target = container.children[lightboxIndex] as HTMLElement;
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, [lightboxIndex]);

    // Reset when modal closes
    useEffect(() => {
        if (!open) {
            setLightboxIndex(null);
            setIsZoomed(false);
            setIsPlaying(false);
            setSlideProgress(0);
        }
    }, [open]);

    // Anti-download handler (blocks context menu / right click on all photos)
    const handleShieldContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogPortal>
                {/* Immersive backdrop with tactile grain and blur */}
                <DialogOverlay className="fixed inset-0 z-50 bg-black/80 dark:bg-black/88 backdrop-blur-md transition-opacity duration-300" />
                <DialogContent
                    className={cn(
                        'fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]',
                        'w-[96vw] max-w-[1240px] h-[92vh] max-h-[920px]',
                        // Tactile parchment in light mode, deep obsidian in dark
                        'bg-[#F8F4EA] dark:bg-[#121315] text-foreground',
                        'border-2 border-[#8d7c65]/35 dark:border-white/10',
                        'rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.55)]',
                        'p-0 flex flex-col overflow-hidden select-none',
                        'data-[state=open]:animate-in data-[state=closed]:animate-out',
                        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                        'duration-300',
                        fontClass
                    )}
                    onContextMenu={handleShieldContextMenu}
                >
                    {/* Decorative Parchment Texture Overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none rounded-2xl opacity-10 dark:opacity-5"
                        style={{
                            backgroundImage:
                                'radial-gradient(#8d7c65 0.75px, transparent 0.75px)',
                            backgroundSize: '16px 16px',
                        }}
                    />

                    {/* =========================================================
                        GALLERY HEADER (Bilingual Khmer / English, Lotus Emblem & Slideshow Trigger)
                        ========================================================= */}
                    <div className="relative z-10 flex items-center justify-between gap-2 sm:gap-4 px-3.5 sm:px-7 py-3 sm:py-3.5 border-b border-[#8d7c65]/20 dark:border-white/10 bg-inherit/90 backdrop-blur-md flex-nowrap">
                        {/* Title and Lotus Emblem */}
                        <div className="flex items-center space-x-2.5 sm:space-x-3.5 min-w-0 flex-1 mr-1 sm:mr-2">
                            <div className="size-8 sm:size-10 rounded-xl bg-ochre/15 dark:bg-ochre/25 flex items-center justify-center text-ochre border border-ochre/30 shadow-inner flex-shrink-0">
                                <LotusIcon className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse text-ochre" />
                            </div>
                            <div className="min-w-0">
                                <DialogTitle className={cn(
                                    "text-sm sm:text-lg font-bold dark:text-main leading-tight truncate",
                                    fontClass
                                )}>
                                    {isKh
                                        ? 'កម្រងអនុស្សាវរីយ៍'
                                        : 'Visual Journal'}
                                </DialogTitle>
                                <p className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400 font-sans truncate">
                                    {isKh
                                        ? `ការចងក្រងនូវរូបអនុស្សាវរីយ៍ល្អៗ`
                                        : `Curated memories & moments`}
                                </p>
                            </div>
                        </div>

                        {/* Right: Slideshow Trigger & Close Button (Always on same row, never wraps) */}
                        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
                            {/* Play Slideshow Button */}
                            <button
                                type="button"
                                onClick={startSlideshow}
                                aria-label={isKh ? 'ចាក់ស្លាយរូបថត' : 'Play Slideshow'}
                                title={isKh ? 'ចាក់ស្លាយរូបថតស្វ័យប្រវត្តិ' : 'Play Fullscreen Slideshow'}
                                className={cn(
                                    'p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer touch-manipulation',
                                    'bg-ochre hover:bg-ochre-light text-white shadow-md hover:scale-105 active:scale-95'
                                )}
                            >
                                <Play className="w-4 h-4 fill-white text-white" />
                                <span className="hidden sm:inline">{isKh ? 'ស្លាយ' : 'Play'}</span>
                            </button>

                            <span className="text-[11px] font-mono text-neutral-500 hidden lg:inline">
                                {isKh ? 'ចុចលើរូបថតដើម្បីពង្រីក' : 'Click any photo to enlarge'}
                            </span>

                            {/* Close Button */}
                            <button
                                type="button"
                                onClick={() => onOpenChange(false)}
                                aria-label={isKh ? 'បិទ' : 'Close Gallery'}
                                title={isKh ? 'បិទ' : 'Close'}
                                className={cn(
                                    'p-2 rounded-xl transition-all duration-200 cursor-pointer touch-manipulation',
                                    'bg-neutral-200/50 hover:bg-neutral-300/70 dark:bg-white/5 dark:hover:bg-white/10',
                                    'text-neutral-700 dark:text-neutral-200 hover:rotate-90 hover:scale-105 active:scale-95',
                                    'border border-neutral-300/60 dark:border-white/10'
                                )}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* =========================================================
                        GALLERY BODY: ARTISAN POLAROID SCRAPBOOK (Default & Protected)
                        ========================================================= */}
                    <div className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-8 gallery-scroll">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-7 sm:gap-8 pb-8">
                            {GALLERY_COLLECTION.map((img, index) => {
                                const rot = img.rotation || ((index % 5) - 2) * 1.5;
                                const title = isKh ? img.titleKh : img.titleEn;
                                const date = isKh ? img.dateKh : img.dateEn;
                                const tag = isKh ? img.tagKh : img.tagEn;
                                const numStr = isKh ? toKhmerNum(index + 1) : String(index + 1).padStart(2, '0');

                                return (
                                    <motion.div
                                        key={img.id}
                                        initial={{ opacity: 0, scale: 0.9, rotate: rot }}
                                        animate={{ opacity: 1, scale: 1, rotate: rot }}
                                        whileHover={{
                                            scale: 1.05,
                                            rotate: 0,
                                            zIndex: 30,
                                            transition: { duration: 0.25, ease: 'easeOut' },
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            delay: Math.min(index * 0.035, 0.45),
                                        }}
                                        onClick={() => setLightboxIndex(index)}
                                        className="cursor-pointer group select-none"
                                        onContextMenu={handleShieldContextMenu}
                                    >
                                        {/* Authentic Polaroid Scrapbook Card */}
                                        <div
                                            className={cn(
                                                'relative p-3 pb-5 rounded-sm',
                                                'bg-[#FFFCF6] dark:bg-[#1C1C1E]',
                                                'border border-[#D4C8B5] dark:border-neutral-700/80',
                                                'shadow-[0_8px_22px_-5px_rgba(45,30,15,0.18)] dark:shadow-[0_10px_24px_rgba(0,0,0,0.5)]',
                                                'group-hover:shadow-[0_22px_45px_-8px_rgba(45,30,15,0.32)] dark:group-hover:shadow-[0_22px_45px_-8px_rgba(0,0,0,0.8)]',
                                                'transition-all duration-300'
                                            )}
                                        >
                                            {/* Top Washi Tape Accent with serrated character */}
                                            <div
                                                className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 h-5.5 rounded-[1px] pointer-events-none select-none z-20 backdrop-blur-[1px]"
                                                style={{
                                                    background: img.tapeColor || 'linear-gradient(135deg, rgba(217,119,6,0.45) 0%, rgba(245,230,211,0.65) 100%)',
                                                    boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
                                                    transform: `rotate(${((index % 3) - 1) * 3.5}deg)`,
                                                }}
                                            />

                                            {/* Photo container with Transparent Shield against downloads */}
                                            <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-neutral-200 dark:bg-neutral-800 rounded-[1px] shadow-inner select-none">
                                                <Image
                                                    src={img.src}
                                                    alt={title}
                                                    fill
                                                    unoptimized
                                                    draggable={false}
                                                    onDragStart={(e) => e.preventDefault()}
                                                    className="object-cover transition-transform duration-500 group-hover:scale-106 select-none pointer-events-none"
                                                />

                                                {/* Transparent Anti-Download Shield */}
                                                <div
                                                    className="absolute inset-0 z-10 select-none cursor-pointer"
                                                    onContextMenu={handleShieldContextMenu}
                                                    onDragStart={(e) => e.preventDefault()}
                                                />

                                                {/* Gloss & Shimmer Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none z-15" />

                                                {/* Hover Action Badge */}
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center z-20 pointer-events-none">
                                                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 bg-black/75 backdrop-blur-md text-white py-1.5 px-3 rounded-full text-[11px] font-medium flex items-center gap-1.5 shadow-lg border border-white/20">
                                                        <Maximize2 className="w-3.5 h-3.5 text-ochre-light" />
                                                        <span>{isKh ? 'ពង្រីក' : 'Enlarge'}</span>
                                                    </div>
                                                </div>

                                                {/* Corner Tag */}
                                                <div className="absolute top-2 right-2 z-20 pointer-events-none">
                                                    <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white/90">
                                                        #{tag}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Handwritten style bottom chin */}
                                            <div className="mt-3 px-1 text-center">
                                                <p className={cn(
                                                    "text-sm sm:text-base font-semibold text-alter/95 dark:text-main/95 italic truncate",
                                                    fontClass
                                                )}>
                                                    "{title}"
                                                </p>
                                                <div className="flex items-center justify-between mt-1 px-1 text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                                                    <span>{date}</span>
                                                    <span className="text-ochre/80 font-bold">
                                                        № {numStr}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </DialogContent>
            </DialogPortal>

            {/* =========================================================
                LIGHTBOX MASTER VIEWER (PROTECTED PHOTOGRAPHY THEATER & SLIDESHOW)
                ========================================================= */}
            <DialogPortal>
                <AnimatePresence>
                    {lightboxOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className={cn(
                                "fixed inset-0 z-[150] flex flex-col justify-between bg-black/95 backdrop-blur-2xl text-white select-none pointer-events-auto",
                                fontClass
                            )}
                            onClick={closeLightbox}
                            onContextMenu={handleShieldContextMenu}
                        >
                            {/* Live Slideshow Timer Progress Bar — cinematic gradient glow */}
                            {isPlaying && (
                                <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-30 overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-ochre via-amber-400 to-ochre shadow-[0_0_12px_2px_rgba(217,119,6,0.6)]"
                                        style={{ width: `${slideProgress}%` }}
                                        transition={{ duration: 0.04, ease: 'linear' }}
                                    />
                                </div>
                            )}

                            {/* Top Utility Bar */}
                            <div
                                className="relative z-30 flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-b from-black/90 via-black/50 to-transparent"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Left: Minimal, Clean Info (No clutter description) */}
                                <div className="flex items-center gap-2.5 sm:gap-3">
                                    <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-white/10 text-ochre border border-white/10 select-none">
                                        {isKh
                                            ? `${toKhmerNum(lightboxIndex! + 1)} / ${toKhmerNum(GALLERY_COLLECTION.length)}`
                                            : `${String(lightboxIndex! + 1).padStart(2, '0')} / ${String(GALLERY_COLLECTION.length).padStart(2, '0')}`}
                                    </span>
                                    <h3 className={cn("text-sm sm:text-base font-bold leading-tight text-white/95 truncate max-w-[170px] sm:max-w-md", fontClass)}>
                                        {isKh ? activeImage.titleKh : activeImage.titleEn}
                                    </h3>
                                </div>

                                {/* Right: Actions (Play, Zoom, Close) */}
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    {/* Slideshow Play / Pause Button */}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsPlaying((p) => !p);
                                            setSlideProgress(0);
                                        }}
                                        title={isPlaying ? (isKh ? 'ផ្អាកស្លាយ (Space)' : 'Pause Slideshow') : (isKh ? 'ស្លាយ' : 'Play')}
                                        className={cn(
                                            'px-2.5 sm:px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-medium transition-all shadow-md cursor-pointer touch-manipulation',
                                            isPlaying
                                                ? 'bg-ochre text-white shadow-ochre/30 scale-105'
                                                : 'bg-white/10 hover:bg-white/20 text-white/80'
                                        )}
                                    >
                                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                                        <span className="hidden xs:inline">
                                            {isPlaying
                                                ? (isKh ? 'ផ្អាក' : 'Pause')
                                                : (isKh ? 'ស្លាយ' : 'Play')}
                                        </span>
                                    </button>

                                    {/* Zoom Toggle */}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsZoomed((z) => !z);
                                        }}
                                        aria-label={isZoomed ? (isKh ? 'បង្រួម' : 'Zoom Out') : (isKh ? 'ពង្រីក' : 'Zoom In')}
                                        title={isKh ? 'ពង្រីក / បង្រួម' : 'Toggle Zoom'}
                                        className={cn(
                                            "p-2 rounded-lg transition-all cursor-pointer touch-manipulation active:scale-95",
                                            isZoomed ? "bg-ochre text-white shadow-md shadow-ochre/30" : "bg-white/10 hover:bg-white/20 text-white/80"
                                        )}
                                    >
                                        {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                                    </button>

                                    {/* Close Button */}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            closeLightbox();
                                        }}
                                        onTouchEnd={(e) => {
                                            e.stopPropagation();
                                            closeLightbox();
                                        }}
                                        aria-label={isKh ? 'បិទ' : 'Close (Esc)'}
                                        title={isKh ? 'បិទ (Esc)' : 'Close (Esc)'}
                                        className="p-2 rounded-lg bg-white/15 hover:bg-white/25 active:scale-95 text-white transition-all hover:rotate-90 ml-1 cursor-pointer touch-manipulation z-30"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                        {/* Center Stage: Photo with Transparent Anti-Download Shield */}
                        <div
                            className="relative flex-1 flex items-center justify-center p-3 sm:p-6 overflow-hidden select-none"
                            onClick={(e) => {
                                if (e.target === e.currentTarget) closeLightbox();
                            }}
                            onContextMenu={handleShieldContextMenu}
                        >
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={lightboxIndex}
                                    custom={direction}
                                    variants={{
                                        enter: (dir: number) => ({
                                            opacity: 0,
                                            x: dir * 60,
                                            scale: 0.92,
                                            filter: 'blur(8px)',
                                        }),
                                        center: {
                                            opacity: 1,
                                            x: 0,
                                            scale: 1,
                                            filter: 'blur(0px)',
                                        },
                                        zoomed: {
                                            opacity: 1,
                                            x: 0,
                                            scale: 1.5,
                                            filter: 'blur(0px)',
                                        },
                                        exit: (dir: number) => ({
                                            opacity: 0,
                                            x: -dir * 60,
                                            scale: 0.96,
                                            filter: 'blur(6px)',
                                        }),
                                    }}
                                    initial="enter"
                                    animate={isZoomed ? "zoomed" : "center"}
                                    exit="exit"
                                    transition={{
                                        x: { duration: 0.45, ease: [0.32, 0.72, 0, 1] },
                                        opacity: { duration: 0.35, ease: 'easeInOut' },
                                        scale: { duration: 0.35, ease: [0.32, 0.72, 0, 1] },
                                        filter: { duration: 0.3, ease: 'easeOut' },
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsZoomed((z) => !z);
                                    }}
                                    className={cn(
                                        'relative max-w-[92vw] max-h-[72vh] flex items-center justify-center cursor-zoom-in select-none',
                                        isZoomed && 'cursor-zoom-out'
                                    )}
                                >
                                    {/* Ken Burns subtle drift wrapper — active during slideshow */}
                                    <motion.div
                                        animate={
                                            isPlaying && !isZoomed
                                                ? {
                                                      scale: [1, 1.04],
                                                      x: [0, lightboxIndex! % 2 === 0 ? 8 : -8],
                                                      y: [0, lightboxIndex! % 3 === 0 ? 5 : -5],
                                                  }
                                                : { scale: 1, x: 0, y: 0 }
                                        }
                                        transition={
                                            isPlaying && !isZoomed
                                                ? { duration: 3.2, ease: 'easeInOut' }
                                                : { duration: 0.3 }
                                        }
                                        className="relative"
                                    >
                                        <Image
                                            src={activeImage.src}
                                            alt={isKh ? activeImage.titleKh : activeImage.titleEn}
                                            width={activeImage.width}
                                            height={activeImage.height}
                                            unoptimized
                                            draggable={false}
                                            onDragStart={(e) => e.preventDefault()}
                                            className="max-w-full max-h-[72vh] w-auto h-auto object-contain rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.85)] pointer-events-none select-none"
                                        />
                                    </motion.div>

                                    {/* Transparent Protective Shield on Lightbox Image */}
                                    <div
                                        className="absolute inset-0 z-10 cursor-pointer select-none"
                                        onContextMenu={handleShieldContextMenu}
                                        onDragStart={(e) => e.preventDefault()}
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Previous Arrow Button */}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goPrev();
                                }}
                                aria-label={isKh ? 'រូបថតមុន' : 'Previous Photo'}
                                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 backdrop-blur-md text-white transition-all hover:scale-110 shadow-xl z-20 cursor-pointer touch-manipulation"
                            >
                                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
                            </button>

                            {/* Next Arrow Button */}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goNext();
                                }}
                                aria-label={isKh ? 'រូបថតបន្ទាប់' : 'Next Photo'}
                                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 backdrop-blur-md text-white transition-all hover:scale-110 shadow-xl z-20 cursor-pointer touch-manipulation"
                            >
                                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
                            </button>
                        </div>

                        {/* Bottom Lightbox Thumbnail Strip Bar */}
                        <div
                            className="relative z-20 px-4 py-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent select-none"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div
                                ref={lightboxThumbnailRef}
                                className="flex items-center justify-center gap-2 max-w-4xl mx-auto overflow-x-auto gallery-scroll py-1 select-none"
                            >
                                {GALLERY_COLLECTION.map((item, idx) => {
                                    const isCurrent = idx === lightboxIndex;
                                    return (
                                        <button
                                            type="button"
                                            key={`thumb-${item.id}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setLightboxIndex(idx);
                                                setSlideProgress(0);
                                            }}
                                            className={cn(
                                                'relative flex-shrink-0 h-12 w-16 sm:h-14 sm:w-20 rounded-md overflow-hidden transition-all duration-200 select-none cursor-pointer',
                                                isCurrent
                                                    ? 'ring-2 ring-ochre scale-110 opacity-100 shadow-md'
                                                    : 'opacity-40 hover:opacity-85 hover:scale-105'
                                            )}
                                        >
                                            <Image
                                                src={item.src}
                                                alt={isKh ? item.titleKh : item.titleEn}
                                                fill
                                                unoptimized
                                                draggable={false}
                                                onDragStart={(e) => e.preventDefault()}
                                                className="object-cover pointer-events-none select-none"
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </DialogPortal>
    </Dialog>
    );
}

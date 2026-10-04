"use client";

import React, { useState, useCallback } from "react";

/* ================================================================
   DATA: Each chapter contains pages, each page has exactly 2 paragraphs.
   Content is bilingual (EN / KH).
   ================================================================ */

interface BookPage {
  paragraphsEn: string[];
  paragraphsKh: string[];
}

interface Chapter {
  chapterEn: string;
  chapterKh: string;
  titleEn: string;
  titleKh: string;
  attributionEn: string;
  attributionKh: string;
  pages: BookPage[];
}

const CHAPTERS: Chapter[] = [
  {
    chapterEn: "Chapter I",
    chapterKh: "ជំពូកទី ១",
    titleEn: "My Journey With Cdoing",
    titleKh: "ដំំណើរជីវិតជាមួយការសរសេរកូដ",
    attributionEn: "HUO MENGLANG",
    attributionKh: "ហួ ម៉េងឡាង",
    pages: [
      {
        paragraphsEn: [
          "Building resilient systems where modern logic meets timeless form. Over three years mastering fullstack engineering, designing scalable backends in Spring Boot and Next.js.",
          "From distributed microservices to relational depths in PostgreSQL, turning complex paradigms into seamless, dependable solutions — step by step, line by line, code written with care, systems built to endure.",
        ],
        paragraphsKh: [
          "បង្កើតប្រព័ន្ធ backend ដ៏រឹងមាំ និងកម្មវិធី modern web ដ៏រលូន។ បទពិសោធន៍ជាង ៣ ឆ្នាំក្នុងការអភិវឌ្ឍ fullstack រចនាស្ថាបត្យកម្ម scalable ជាមួយ Spring Boot និង Next.js។",
          "ពី Microservices ដំណើរការជាមួយនឹងប្រព័ន្ធគ្រប់គ្រងទិន្នន័យ PostgreSQL — ប្រែក្លាយបញ្ហាប្រឈម ទៅជាដំណោះស្រាយជាក់ស្តែង និងគួរជាទីទុកចិត្ត។ ជំហានម្ដងមួយៗ បន្ទាត់កូដនីមួយៗ សរសេរដោយការយកចិត្តទុកដាក់។",
        ],
      },
      {
        paragraphsEn: [
          "Managing servers also my Interesting topic learning and testing like Docker and orchestrated by Kubernetes and Foundations clouds of AWS ",
          "Always exploring, expanding depth into distributed architecture, DevOps automation, Big Data, and intelligent AI workflows — driven as an autonomous problem-solver, thriving as a loyal, collaborative teammate.",
        ],
        paragraphsKh: [
          "ការគ្រប់គ្រង ប្រព័ន្ធមេ ក៌ជាអ្វីដែលខ្ញុំតែងតែរៀននិងស្វែងយល់បន្ថែមពីដំណើរការទាំងមូលនៃប្រព័ន្ធធ្វើការជាមួយគ្នា ដូចជា Docker Kubernetes និង AWS",
          "បន្តស្វែងយល់ និងពង្រីកចំណេះដឹងលើ distributed architecture, DevOps automation, Big Data និង AI workflows — ដោះស្រាយបញ្ហាប្រកបដោយឯករាជ្យភាព និងសហការយ៉ាងស្និទ្ធស្នាលជាមួយក្រុមការងារ។",
        ],
      },
    ],
  },
  {
    chapterEn: "Chapter II",
    chapterKh: "ជំពូកទី ២",
    titleEn: "MIND & DISCIPLINE",
    titleKh: "ស្មារតី និង វិន័យ",
    attributionEn: "HUO MENGLANG",
    attributionKh: "ហួ ម៉េងឡាង",
    pages: [
      {
        paragraphsEn: [
          "Beginning each sunrise with stillness, clarity, and purpose. Entertainments are part of my life like Listent to music adventure and Sports, Karate-Do is one of my favourite sport that anchors the spirit, instilling mental fortitude, physical endurance, and calm focus.",
          "For true engineering mirrors the martial art — patience in every posture, precision in every movement. Constantly refining what is within, striving for harmony in mind, body, and work.",
        ],
        paragraphsKh: [
          "ចាប់ផ្តើមថ្ងៃថ្មីនីមួយៗដោយភាពស្ងប់ស្ងាត់ និងទិសដៅច្បាស់លាស់។ ការកម្សាន្តជាផ្នែកមួយធ្វើអោយជីវិតមានភាពរីករាយដូចជាការស្តាប់ចម្រៀង ទៅកន្លែងដែលចង់ទៅ និងការលេងជាដើម។​ កីឡាការ៉ាតេដូជាផ្នែកមួយនៃការកម្សាន្ត ជួយពង្រឹងស្មារតី បណ្តុះនូវការអត់ធ្មត់ ភាពធន់នៃរាងកាយ និងការផ្ដោតអារម្មណ៍។",
          "ព្រោះការបង្កើតកម្មវិធី ក៏ប្រៀបដូចជាក្បាច់គុន — អត់ធ្មត់គ្រប់កាលៈទេសៈ ហ្មត់ចត់គ្រប់ចលនា។ កែលម្អខ្លួនជាប្រចាំ ដើម្បីភាពចុះសម្រុងរវាងចិត្ត កាយ និងការងារ។",
        ],
      },
    ],
  },
  {
    chapterEn: "Chapter III",
    chapterKh: "ជំពូកទី ៣",
    titleEn: "LOVING-KINDNESS",
    titleKh: "មេត្តាធម៌",
    attributionEn: "HUO MENGLANG",
    attributionKh: "ហួ ម៉េងឡាង",
    pages: [
      {
        paragraphsEn: [
          "Having loving-kindness in the heart is a charm that radiates from within. When you genuinely wish for others to find true happiness — not out of greed or desire to possess — the energy of that goodwill naturally makes your face radiant and attractive.",
          "This is not a superficial beauty, but an inner light that draws people toward you. Loving-kindness transforms not only how others see you, but how you experience the world around you.",
        ],
        paragraphsKh: [
          "ការមាន «មេត្តា» ក្នុងចិត្ត គឺជាមន្តស្នេហ៍ដែលចេញពីខាងក្នុង៖ នៅពេលអ្នកមានចិត្តប្រាថ្នាឱ្យអ្នកដទៃមានក្តីសុខពិតប្រាកដ មិនមែនលោភលន់ចង់បានអ្នកដទៃមកធ្វើជារបស់ខ្លួន។",
          "ថាមពលនៃក្តីមេត្តានេះនឹងធ្វើឱ្យទឹកមុខរបស់អ្នកស្រស់ថ្លា និងមានភាពទាក់ទាញតាមបែបធម្មជាតិ។ នេះមិនមែនជាសម្រស់ខាងក្រៅទេ ប៉ុន្តែជាពន្លឺខាងក្នុងដែលទាក់ទាញមនុស្សមកកាន់អ្នក។",
        ],
      },
    ],
  },
  {
    chapterEn: "Chapter IV",
    chapterKh: "ជំពូកទី ៤",
    titleEn: "MINDFULNESS & AWARENESS",
    titleKh: "សតិ សម្បជញ្ញៈ",
    attributionEn: "HUO MENGLANG",
    attributionKh: "ហួ ម៉េងឡាង",
    pages: [
      {
        paragraphsEn: [
          "Mindfulness and clear comprehension are the most beneficial virtues in Buddhist teachings. These two qualities always walk hand in hand — like a pair of eyes or two hands — neither can function without the other.",
          "Mindfulness (Sati) is the nature of self-awareness, not forgetting oneself, not being careless. It pulls our mind back to the present moment, preventing it from drifting to the past or future.",
        ],
        paragraphsKh: [
          "ពាក្យថា «សតិ សម្បជញ្ញៈ» គឺជាធម៌ដ៏មានគុណូបការៈច្រើនបំផុតនៅក្នុងព្រះពុទ្ធសាសនា។ ធម៌ទាំងពីរមុខនេះតែងតែដើរទន្ទឹមគ្នាជានិច្ច ប្រៀបដូចជាភ្នែកទាំងគូ ឬដៃទាំងពីរ ដែលខ្វះមួយណាជួយមិនបានឡើយ។",
          "សតិ គឺជានិយាមនៃការដឹងខ្លួន មិនភ្លេចខ្លួន មិនភ្លាត់ភ្លាំង។ វាជាតួដែលទាញចិត្តរបស់យើងឱ្យត្រឡប់មកនៅជាមួយបច្ចុប្បន្នកាល មិនឱ្យចិត្តអណ្ដែតអណ្ដូងទៅរកអតីតកាល ឬអនាគតកាលឡើយ។",
        ],
      },
      {
        paragraphsEn: [
          "For example, when you are angry and you instantly realize: 'Oh! I am angry!' — that immediate self-awareness is Sati. It is the first flash of recognition that brings you back.",
          "Clear Comprehension (Sampajañña) then enters to discern clearly: is what we are doing, thinking, or saying beneficial or harmful? Right or wrong? Should we continue or stop? Together, Sati and Sampajañña form the foundation of wise living.",
        ],
        paragraphsKh: [
          "ឧទាហរណ៍៖ ពេលដែលអ្នកកំពុងតែខឹង ហើយអ្នកដឹងខ្លួនភ្លាមថា «អូ! ខ្ញុំកំពុងតែខឹងហើយតើ» — ការដឹងខ្លួនភ្លាមៗនេះហើយហៅថា សតិ។ វាជាចំណុចទីមួយនៃការសំគាល់ដែលនាំអ្នកមកវិញ។",
          "សម្បជញ្ញៈ គឺជាតួបញ្ញាដែលចូលមកពិចារណាដឹងច្បាស់ថា អ្វីដែលយើងកំពុងធ្វើ គិត ឬនិយាយនោះ មានប្រយោជន៍ ឬអត់? ត្រឹមត្រូវ ឬខុសឆ្គង? គួរធ្វើ ឬមិនគួរ? សតិ និង សម្បជញ្ញៈ រួមគ្នាជាគ្រឹះនៃជីវិតដ៏ល្អ។",
        ],
      },
    ],
  },
  {
    chapterEn: "Chapter V",
    chapterKh: "ជំពូកទី ៥",
    titleEn: "THE FOUR BONDS OF KINDNESS",
    titleKh: "សង្គហធម៌ ៤ យ៉ាង",
    attributionEn: "HUO MENGLANG",
    attributionKh: "ហួ ម៉េងឡាង",
    pages: [
      {
        paragraphsEn: [
          "These are the most effective teachings the Buddha gave for winning the hearts of others: Generosity (Dāna) — sharing materials, relieving suffering, or giving knowledge. Those who give are always surrounded by love and respect.",
          "Kind Speech (Piyavācā) — speaking words that are true, gentle, beneficial, and bring happiness. Good speech is a powerful charm that makes listeners feel warmth toward you.",
        ],
        paragraphsKh: [
          "នេះគឺជា «មន្តស្នេហ៍» ដ៏មានប្រសិទ្ធភាពបំផុតដែលព្រះពុទ្ធបានបង្រៀន៖ ទាន (ការឱ្យ) — ការចេះចែករំលែក មិនថាជាសម្ភារៈ ការជួយសម្រាលទុក្ខ ឬការឱ្យចំណេះដឹង។ មនុស្សដែលចេះឱ្យ តែងតែមានអ្នកស្រឡាញ់រាប់អានច្រើន។",
          "បិយវាចា (ពាក្យសម្ដីពីរោះ) — ការនិយាយពាក្យពិត ពាក្យទន់ភ្លន់ ពាក្យមានប្រយោជន៍ និងពាក្យដែលនាំមកនូវសេចក្តីសុខ។ ការនិយាយស្តីល្អ គឺជាមន្តស្នេហ៍ដ៏ខ្លាំងក្លាដែលធ្វើឱ្យអ្នកស្តាប់មានអារម្មណ៍ល្អចំពោះអ្នក។",
        ],
      },
      {
        paragraphsEn: [
          "Beneficial Action (Atthacariyā) — helping others with various tasks for their benefit. Those who love to help others always carry a natural charm in the eyes of everyone around them.",
          "Impartiality (Samānattatā) — not being arrogant, respecting others, and maintaining sincerity in relationships. These four virtues together form the most powerful way to build genuine, lasting bonds with others.",
        ],
        paragraphsKh: [
          "អត្ថចរិយា (ការប្រប្រព្រឹត្តខ្លួនឱ្យមានប្រយោជន៍) — ការជួយធ្វើកិច្ចការងារផ្សេងៗ ដើម្បីជាប្រយោជន៍ដល់អ្នកដទៃ។ មនុស្សដែលចូលចិត្តជួយអ្នកដទៃ តែងតែមាន «មន្តស្នេហ៍» នៅក្នុងក្រសែភ្នែកអ្នកជុំវិញ។",
          "សមានត្តតា (ការដាក់ខ្លួន និងភាពស្មើគ្នា) — ការមិនប្រកាន់ខ្លួន ការចេះគោរពអ្នកដទៃ និងមានភាពស្មោះត្រង់ក្នុងទំនាក់ទំនង។ ធម៌ទាំង ៤ នេះរួមគ្នាជាមធ្យោបាយដ៏មានប្រសិទ្ធភាពបំផុតក្នុងការកសាងចំណងមិត្តភាពយូរអង្វែង។",
        ],
      },
    ],
  },
  {
    chapterEn: "Chapter VI",
    chapterKh: "ជំពូកទី ៦",
    titleEn: "ACCEPTING LIFE'S TRUTH",
    titleKh: "ការទទួលយកការពិតនៃជីវិត",
    attributionEn: "HUO MENGLANG",
    attributionKh: "ហួ ម៉េងឡាង",
    pages: [
      {
        paragraphsEn: [
          "Worrying cannot change anything. Life has both what we wish for and what we do not — this is a natural truth we must understand. Excessive worry about the past or baseless anxiety about the future only robs us of peace in the present moment.",
          "Stop struggling over things beyond your ability, and learn to adapt to circumstances. Treat every experience as a lesson for growth. When life changes, adjust your strategy; when hardship arrives, use it as an opportunity to strengthen your resolve.",
        ],
        paragraphsKh: [
          "ការព្រួយបារម្ភមិនអាចផ្លាស់ប្តូរអ្វីបានឡើយ។ ជីវិតមានទាំងរឿងដែលដូចបំណង និងរឿងដែលមិនដូចបំណង — នេះជាធម្មជាតិដែលយើងត្រូវយល់។ ការខ្វល់ខ្វាយខ្លាំងពេកពីអតីតកាល ឬកង្វល់គ្មានហេតុផលពីអនាគត គឺគ្រាន់តែជាការបាត់បង់សន្តិភាពក្នុងពេលបច្ចុប្បន្នតែប៉ុណ្ណោះ។",
          "ចូរឈប់រែកពន់រឿងដែលហួសពីសមត្ថភាពរបស់អ្នក ហើយរៀនសម្របខ្លួនតាមហេតុការណ៍ រួចចាត់ទុកគ្រប់បទពិសោធន៍ជាមេរៀនដើម្បីអភិវឌ្ឍខ្លួនអោយរីកចម្រើន។ នៅពេលជីវិតប្រែប្រួល ចូរអ្នកកែសម្រួលយុទ្ធសាស្ត្រ ហើយនៅពេលការលំបាកមកដល់ ចូរប្រើវាជាឱកាសដើម្បីពង្រឹងចិត្ត។",
        ],
      },
      {
        paragraphsEn: [
          "True happiness begins when you stop fighting against reality and start accepting life with wisdom. Acceptance is not surrender — it is knowing how to direct your energy toward what you can change, and letting go of what you cannot control.",
          "Remember that no storm lasts forever, and darkness will fade at dawn. In any circumstance, continue the journey of life with patience, courage, and a peaceful heart.",
        ],
        paragraphsKh: [
          "សេចក្តីសុខពិតប្រាកដ ចាប់ផ្តើមនៅពេលអ្នកឈប់តស៊ូប្រឆាំងនឹងការពិត ហើយចាប់ផ្តើមទទួលយកជីវិតពិតដោយបញ្ញា។ ការទទួលយកមិនមែនជាការចុះចាញ់ទេ តែគឺជាការចេះប្រើថាមពលទៅលើអ្វីដែលអ្នកអាចធ្វើបាន ហើយលះបង់អ្វីដែលអ្នកគ្រប់គ្រងមិនបាន។",
          "ត្រូវចាំថា គ្មានព្យុះណាដែលបោកបក់ជារៀងរហូត ហើយភាពងងឹតក៏នឹងរលាយបាត់ទៅនៅពេលព្រឹកព្រលឹមផងដែរ។ ទោះក្នុងកាលៈទេសៈណា ក៏សូមបន្តដំណើរជីវិតដោយក្តីអត់ធ្មត់ ភាពក្លាហាន និងចិត្តដែលស្ងប់ស្ងាត់។",
        ],
      },
    ],
  },
  {
    chapterEn: "Chapter VII",
    chapterKh: "ជំពូកទី ៧",
    titleEn: "RIGHT EFFORT",
    titleKh: "ការព្យាយាមដ៏ត្រឹមត្រូវ",
    attributionEn: "HUO MENGLANG",
    attributionKh: "ហួ ម៉េងឡាង",
    pages: [
      {
        paragraphsEn: [
          "No results yet — keep trying. Good results — keep trying. Bad results — keep trying. In Buddhist teaching, right effort does not mean blindly struggling for desired outcomes. Rather, it is striving with wisdom and patience in a wholesome direction.",
          "We must not lose heart in failure, nor lose ourselves in success. Simply continue doing good and abandoning unwholesome actions. When results haven't appeared, use patience. When you succeed, stay humble. When you fail, remember the lesson and keep going.",
        ],
        paragraphsKh: [
          "គ្មានលទ្ធផល ក៏ត្រូវព្យាយាមបន្តទៀត។ បានលទ្ធផលល្អ ក៏ត្រូវព្យាយាមបន្តទៀត។ បានលទ្ធផលមិនល្អ ក៏ត្រូវព្យាយាមបន្តទៀត។ ក្នុងព្រះពុទ្ធសាសនា ការព្យាយាមដ៏ត្រឹមត្រូវ មិនមែនមានន័យថាការប្រឹងប្រែងទាំងងងឹតងងុលដើម្បីឱ្យបានលទ្ធផលតាមចិត្តចង់នោះទេ។",
          "យើងមិនត្រូវបាក់ទឹកចិត្តនៅពេលបរាជ័យ ហើយក៏មិនត្រូវវង្វេងខ្លួននៅពេលជោគជ័យដែរ។ យើងគ្រាន់តែបន្តធ្វើកិច្ចការល្អ និងលះបង់ចោលនូវអំពើអាក្រក់ជាប្រចាំ។ ពេលមិនទាន់ឃើញលទ្ធផល ត្រូវប្រើភាពអត់ធ្មត់។ ពេលទទួលបានជោគជ័យ ត្រូវប្រើភាពរាបទាប។",
        ],
      },
      {
        paragraphsEn: [
          "The value of effort is not measured merely by today's results, but by the quality of our intention in doing the work. Results, fame, praise, or criticism — all are natural phenomena that arise and pass away. What matters most is the habit of perseverance with mindfulness.",
          "Right effort is not fighting against reality. It is cultivating good thoughts and improving ourselves each day. Do not cling to outcomes. Do not yield to obstacles. Do not forget yourself in success. Keep practicing, keep growing, keep walking the right path.",
        ],
        paragraphsKh: [
          "តម្លៃនៃការប្រឹងប្រែង មិនមែនវាស់វែងត្រឹមតែលទ្ធផលនៅថ្ងៃនេះទេ ប៉ុន្តែវាស់វែងដោយ «ចិត្តគំនិត» របស់យើងក្នុងការធ្វើកិច្ចការនោះ។ លទ្ធផល លាភយស ការសរសើរ ឬការរិះគន់ សុទ្ធតែជាធម្មជាតិដែលកើតឡើង និងបាត់បង់ទៅជាធម្មតា។",
          "ការប្រឹងប្រែងដ៏ត្រឹមត្រូវ មិនមែនជាការតស៊ូប្រឆាំងនឹងការពិតនោះទេ ប៉ុន្តែវាគឺជាការបណ្តុះនូវគំនិតល្អ និងការកែប្រែខ្លួនឱ្យកាន់តែល្អប្រសើរជារៀងរាល់ថ្ងៃ។ កុំបណ្តោយឱ្យចិត្តជាប់ជំពាក់នឹងលទ្ធផលពេក។ កុំចុះចាញ់នឹងឧបសគ្គ។ ចូរព្យាយាមអនុវត្ត បន្តអភិវឌ្ឍខ្លួន។",
        ],
      },
    ],
  },
  {
    chapterEn: "Chapter VIII",
    chapterKh: "ជំពូកទី ៨",
    titleEn: "BEING A GOOD PERSON",
    titleKh: "ការធ្វើជាមនុស្សល្អ",
    attributionEn: "HUO MENGLANG",
    attributionKh: "ហួ ម៉េងឡាង",
    pages: [
      {
        paragraphsEn: [
          "In this world, if we are not fortunate enough to meet good people, we must make ourselves into good people so others are fortunate to meet us. The Buddha taught that wanting goodness means learning to become good, to be a worthy friend with wholesome virtues.",
          "A person of good character possesses five qualities: Mettā — having good morals, a sincere heart, genuine love, and conducting oneself with loving-kindness in body, speech, and mind toward oneself and others.",
        ],
        paragraphsKh: [
          "នៅក្នុងលោកនេះបើយើងគ្មានសំណាងបានជួបមនុស្សល្អទេ យើងត្រូវតែធ្វើខ្លួនយើង ជាមនុស្សល្អឱ្យគេមានសំណាងបានជួបយើង។ ព្រះពុទ្ធមានដីកាថា ចង់បានល្អត្រូវរៀនធ្វើជាមនុស្សល្អ ជាកល្យាណមិត្តល្អ។",
          "មនុស្សល្អ មានកល្យាណធម៌ ៥ យ៉ាង៖ មេត្តា — ជាបុគ្គលមានសីលធម៌ល្អ មានទឹកចិត្តស្មោះត្រង់ មានសេចក្តីអាណិត ស្រឡាញ់ពិត ប្រព្រឹត្តតែអំពើល្អ តាមផ្លូវ កាយ វាចា ចិត្ត ប្រកបដោយមេត្តា។",
        ],
      },
      {
        paragraphsEn: [
          "Right Livelihood — earning a living through honest, upright, and blameless means. Contentment — having a good disposition, knowing how to give, living with good manners, and caring for one's family with generosity and love.",
          "Truthfulness — being sincere, loving justice and truth, never boasting or being arrogant. Mindfulness — having wisdom, reflection, reason, doing beneficial work without negligence. This is a good person — whoever meets them is fortunate and finds happiness.",
        ],
        paragraphsKh: [
          "សម្មាអាជីវៈ — ជាអ្នកប្រកបមុខរបរ ការងារចិញ្ចឹមជីវិត ត្រឹមត្រូវ សុចរិត ទៀងត្រង់។ សទារសន្តោសៈ — ជាអ្នកមានសន្តានចិត្តល្អ ចេះធ្វើបុណ្យ ឱ្យទាន រស់នៅមានសុជីវធម៌ល្អ គ្រប់គ្រង ថែរក្សា ក្រុមគ្រួសារ។",
          "សច្ចៈ — ជាអ្នកមានចរិតលក្ខណៈ ទៀងត្រង់ ស្រឡាញ់ យុត្តិធម៌ មិនចូលចិត្តអួតអាង។ សតិ — ជាអ្នកមាន បញ្ញា ស្មារតី ត្រិះរិះ ពិចារណា មានហេតុផល។ នេះជាមនុស្សល្អ អ្នកណាបានជួបមានសំណាង បានសុខ ចម្រើន។",
        ],
      },
    ],
  },
];

/* ================================================================
   Build flat page list from chapters for navigation.
   Each flat page knows its chapter index and page-within-chapter index.
   ================================================================ */
interface FlatPage {
  chapterIdx: number;
  pageIdx: number;
  isFirstPageOfChapter: boolean;
}

function buildFlatPages(): FlatPage[] {
  const flat: FlatPage[] = [];
  CHAPTERS.forEach((ch, ci) => {
    ch.pages.forEach((_, pi) => {
      flat.push({ chapterIdx: ci, pageIdx: pi, isFirstPageOfChapter: pi === 0 });
    });
  });
  return flat;
}

const FLAT_PAGES = buildFlatPages();

/* ================================================================
   COMPONENT
   ================================================================ */
export default function RealPaperBook({ locale = "en" }: { locale?: string }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [flippingPage, setFlippingPage] = useState<number | null>(null);
  const [flipProgress, setFlipProgress] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [turnDirection, setTurnDirection] = useState<"next" | "prev">("next");
  const isKh = locale === "kh";
  const totalPages = FLAT_PAGES.length;

  const fontClass = isKh ? "font-hanuman" : "font-antique";

  const triggerFlip = useCallback(
    (targetPage: number, dir: "next" | "prev") => {
      if (isAnimating) return;
      setIsAnimating(true);
      setTurnDirection(dir);
      // Next flips the current page forward to the left.
      // Prev flips the target (previous) page forward from the left spine to the right.
      setFlippingPage(dir === "next" ? currentPage : targetPage);

      const startTime = performance.now();
      const duration = 580;

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        // Realistic ease with gentle deceleration at the end
        const eased =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        setFlipProgress(eased);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setCurrentPage(targetPage);
          setFlippingPage(null);
          setFlipProgress(0);
          setIsAnimating(false);
        }
      };

      requestAnimationFrame(step);
    },
    [currentPage, isAnimating]
  );

  const nextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      triggerFlip(currentPage + 1, "next");
    }
  }, [currentPage, totalPages, triggerFlip]);

  const prevPage = useCallback(() => {
    if (currentPage > 0) {
      triggerFlip(currentPage - 1, "prev");
    }
  }, [currentPage, triggerFlip]);

  const handleSheetClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if (clickX < rect.width * 0.35) {
      prevPage();
    } else {
      nextPage();
    }
  };

  /* ================================================================
     Render a single page sheet
     ================================================================ */
  const renderPageSheet = (flatIdx: number) => {
    const fp = FLAT_PAGES[flatIdx];
    const chapter = CHAPTERS[fp.chapterIdx];
    const page = chapter.pages[fp.pageIdx];
    const isOddPage = flatIdx % 2 === 0; // 0-indexed, so 0=odd(page1), 1=even(page2)

    const chapterLabel = isKh ? chapter.chapterKh : chapter.chapterEn;
    const title = isKh ? chapter.titleKh : chapter.titleEn;
    const paragraphs = isKh ? page.paragraphsKh : page.paragraphsEn;
    const attribution = isKh ? chapter.attributionKh : chapter.attributionEn;

    const hasNext = flatIdx < totalPages - 1;
    const hasPrev = flatIdx > 0;

    // Khmer page numbers
    const khmerDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
    const toKhmerNum = (n: number) =>
      String(n).split("").map((d) => khmerDigits[parseInt(d)] || d).join("");

    return (
      <div className={`relative w-full h-full flex flex-col px-4 pt-3.5 pb-2.5 sm:px-6 sm:pt-4 sm:pb-3 select-none overflow-hidden ${fontClass}`}>
        {/* Parchment Fiber Background */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[2px]"
          style={{
            backgroundImage:
              "radial-gradient(#ab987e 0.5px, transparent 0.5px), radial-gradient(#ab987e 0.5px, transparent 0.5px)",
            backgroundSize: "16px 16px",
            backgroundPosition: "0 0, 8px 8px",
            opacity: 0.12,
          }}
        />

        {/* Aged Edge Patina Vignette */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[2px]"
          style={{
            boxShadow:
              "inset 0 0 50px rgba(165, 134, 94, 0.24), inset 0 0 14px rgba(130, 102, 68, 0.16)",
          }}
        />

        {/* Left Spine Gutter Shade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-7 sm:w-9 pointer-events-none z-20"
          style={{
            background:
              "linear-gradient(90deg, rgba(46,34,18,0.22) 0%, rgba(46,34,18,0.06) 45%, transparent 100%)",
          }}
        />

        {/* Binding Stitch Guide */}
        <div className="absolute left-2.5 top-3 bottom-3 w-[1px] border-l border-dashed border-[#8d7c65]/30 pointer-events-none z-20" />

        {/* Right Page Edge */}
        <div
          className="absolute right-0 top-0 bottom-0 w-5 pointer-events-none z-20"
          style={{
            background: "linear-gradient(270deg, rgba(80,55,30,0.12) 0%, transparent 100%)",
          }}
        />

        {/* Victorian Double Border Frame - fully encircling all content */}
        <div className="absolute inset-1.5 sm:inset-2 md:inset-2.5 pointer-events-none z-15 select-none">
          <div className="absolute inset-0 border border-[#6b523c]/85 rounded-[1px]" />
          <div className="absolute inset-[2px] border border-[#6b523c]/60 rounded-[1px]" />

          {/* 4 Corner Filigrees */}
          {[
            { pos: "top-0 right-0", scale: "" },
            { pos: "top-0 left-0", scale: "-scale-x-100" },
            { pos: "bottom-0 right-0", scale: "-scale-y-100" },
            { pos: "bottom-0 left-0", scale: "-scale-x-100 -scale-y-100" },
          ].map((corner, i) => (
            <div key={i} className={`absolute ${corner.pos} w-[22px] h-[22px] sm:w-[26px] sm:h-[26px]`}>
              <img
                src="/sketchbook/vintage-corner.png"
                alt=""
                aria-hidden="true"
                className={`w-full h-full object-contain ${corner.scale}`}
                style={{ mixBlendMode: "multiply", opacity: 0.9 }}
              />
            </div>
          ))}
        </div>

        {/* ============ FLOWER ACCENT ============ */}
        {isOddPage ? (
          /* Odd pages: bottom-left */
          <div
            className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-16 sm:w-24 md:w-28 pointer-events-none select-none z-10"
            style={{ opacity: 0.35, mixBlendMode: "multiply", filter: "sepia(0.2) contrast(1.05)" }}
          >
            <img src="/sketchbook/bloom.png" alt="" aria-hidden="true" className="w-full h-auto object-contain rotate-6" />
          </div>
        ) : (
          /* Even pages: top-right, flipped */
          <div
            className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-16 sm:w-24 md:w-28 pointer-events-none select-none z-10"
            style={{ opacity: 0.32, mixBlendMode: "multiply", filter: "sepia(0.3) hue-rotate(15deg) contrast(1.05)" }}
          >
            <img src="/sketchbook/bloom.png" alt="" aria-hidden="true" className="w-full h-auto object-contain -scale-x-100 -rotate-12" />
          </div>
        )}

        {/* ============ CHAPTER TITLE (on first page of chapter) ============ */}
        {fp.isFirstPageOfChapter && (
          <div className="relative z-20 pt-0.5 sm:pt-1 text-center space-y-0.5">
            <p className="text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.28em] text-[#7a6650] font-medium">
              {chapterLabel}
            </p>
            <h2 className="text-xs sm:text-sm md:text-base font-bold tracking-[0.1em] text-[#3a2a1a] uppercase leading-tight">
              {title}
            </h2>
            <div className="w-[65%] max-w-[200px] h-[0.75px] bg-[#6b523c]/60 mx-auto mt-0.5" />
          </div>
        )}

        {/* If NOT first page, show a running header */}
        {!fp.isFirstPageOfChapter && (
          <div className="relative z-20 pt-0.5 text-center">
            <p className="italic text-[8.5px] sm:text-[9.5px] tracking-[0.2em] text-[#7a6650]">
              {title}
            </p>
            <div className="w-[45%] max-w-[150px] h-[0.5px] bg-[#6b523c]/40 mx-auto mt-0.5" />
          </div>
        )}

        {/* ============ PARAGRAPHS ============ */}
        <div className="relative z-20 flex-1 flex flex-col justify-center space-y-2 sm:space-y-2.5 py-1.5 sm:py-2">
          {paragraphs.map((text, idx) => (
            <p
              key={idx}
              className="text-[9.5px] sm:text-[11px] md:text-[12px] leading-[1.65] sm:leading-[1.75] text-[#2c241c] text-justify px-1 sm:px-1.5"
            >
              {text}
            </p>
          ))}
        </div>

        {/* ============ DIVIDER ============ */}
        <div className="relative z-20 flex items-center justify-center gap-2 text-[#9a8166]/50 my-0.5">
          <span className="w-5 sm:w-8 h-[0.5px] bg-[#9a8166]/25" />
          <span className="text-[9px] select-none leading-none">❧</span>
          <span className="w-5 sm:w-8 h-[0.5px] bg-[#9a8166]/25" />
        </div>

        {/* ============ BOTTOM: Attribution + Nav + Page Number ============ */}
        <div className="relative z-20 pt-0.5 pb-0.5 space-y-0.5 mt-auto">
          {/* Attribution on last page of chapter */}
          {fp.pageIdx === chapter.pages.length - 1 && (
            <div className="text-right pr-2 sm:pr-3">
              <span className="text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.18em] text-[#4d3a2b] font-semibold">
                — {attribution}
              </span>
            </div>
          )}

          {/* Navigation: Prev Page / Next Page */}
          <div className={`flex items-center justify-between px-1 sm:px-2 ${fontClass}`}>
            <span
              className={`text-[8.5px] sm:text-[9.5px] tracking-wider select-none font-medium ${
                hasPrev ? "text-[#6b523c]/75 hover:text-[#3a2515]" : "text-transparent"
              }`}
            >
              {isKh ? "‹ ទំព័រមុន" : "‹ Prev Page"}
            </span>
            <span className="italic text-[8.5px] sm:text-[9.5px] tracking-widest text-[#726250]/60 select-none">
              — {isKh ? toKhmerNum(flatIdx + 1) : flatIdx + 1} —
            </span>
            <span
              className={`text-[8.5px] sm:text-[9.5px] tracking-wider select-none font-medium ${
                hasNext ? "text-[#6b523c]/75 hover:text-[#3a2515]" : "text-transparent"
              }`}
            >
              {isKh ? "ទំព័របន្ទាប់ ›" : "Next Page ›"}
            </span>
          </div>
        </div>

        {/* Dog-Ear Corner */}
        <div
          className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none rounded-br-[2px] z-20"
          style={{
            background:
              "linear-gradient(135deg, transparent 55%, rgba(145,108,68,0.25) 55%, rgba(145,108,68,0.10) 100%)",
          }}
        />
      </div>
    );
  };

  const nextTargetPage = Math.min(currentPage + 1, totalPages - 1);
  const prevTargetPage = Math.max(currentPage - 1, 0);
  const targetPageIdx = turnDirection === "next" ? nextTargetPage : prevTargetPage;

  return (
    <div className="relative w-full max-w-[380px] sm:max-w-[420px] md:max-w-[440px] select-none py-1 px-1">
      {/* Book Block */}
      <div className="relative w-full">
        {/* Back Hardcover Board Lip */}
        <div
          className="absolute -right-3.5 sm:-right-4.5 -top-1 -bottom-1 w-6 sm:w-8 pointer-events-none z-5 rounded-r-[6px]"
          style={{
            background: "linear-gradient(135deg, #3a2515 0%, #201309 100%)",
            boxShadow: "5px 8px 18px rgba(0,0,0,0.45)",
          }}
          aria-hidden="true"
        />

        {/* Sub-paper Stack (4 layers for depth) */}
        {[
          { inset: "inset-y-2 left-2 -right-3", bg: "#dbd0b6", border: "#bfaf94", z: "z-[6]", rot: "0.7deg" },
          { inset: "inset-y-1.5 left-1.5 -right-2.5", bg: "#e3d8c0", border: "#c8b89e", z: "z-[7]", rot: "0.5deg" },
          { inset: "inset-y-1 left-1 -right-2", bg: "#eadfc9", border: "#d2c2a7", z: "z-[8]", rot: "0.3deg" },
          { inset: "inset-y-0.5 left-0.5 -right-1", bg: "#f2e7d3", border: "#dcceb7", z: "z-[9]", rot: "-0.2deg" },
        ].map((layer, i) => (
          <div
            key={i}
            className={`absolute ${layer.inset} rounded-[2px] pointer-events-none ${layer.z}`}
            style={{
              backgroundColor: layer.bg,
              border: `1px solid ${layer.border}`,
              transform: `rotate(${layer.rot})`,
              transformOrigin: "left center",
            }}
            aria-hidden="true"
          />
        ))}

        {/* Fore-edge */}
        <div
          className="absolute -right-3 sm:-right-4 top-1 bottom-1 w-5 sm:w-6 pointer-events-none z-25 select-none rounded-r-[4px] overflow-hidden"
          style={{
            boxShadow:
              "inset 0 1px 3px rgba(50,30,15,0.4), inset 0 -1px 3px rgba(50,30,15,0.4), 3px 2px 8px rgba(45,30,15,0.35)",
          }}
          aria-hidden="true"
        >
          <img src="/sketchbook/book-fore-edge.png" alt="" className="w-full h-full object-fill" />
        </div>

        {/* Left Spine Hinge */}
        <div
          className="absolute -left-1.5 top-0 bottom-0 w-2 pointer-events-none z-25 rounded-l-[3px]"
          style={{
            background: "linear-gradient(90deg, #2b1b10 0%, #3e2918 60%, rgba(62,41,24,0) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Bookmark Ribbon */}
        <div
          className="absolute right-10 sm:right-12 -top-3 w-3.5 h-8 bg-red-800 shadow-md pointer-events-none z-40 rounded-b-[2px]"
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)",
          }}
        />

        {/* Book Stage & Page Container */}
        <div
          onClick={handleSheetClick}
          className="relative z-20 w-full min-h-[380px] sm:min-h-[410px] md:min-h-[430px] rounded-l-[2px] rounded-r-[1px] cursor-pointer shadow-lg overflow-hidden"
          style={{
            perspective: "1600px",
            background: "linear-gradient(145deg, #f7efe1 0%, #eee3cc 50%, #e5d5ba 100%)",
            border: "1px solid #dcd1bb",
          }}
        >
          {/* Base Sheet */}
          <div className="absolute inset-0 z-10">
            {renderPageSheet(
              isAnimating
                ? turnDirection === "next"
                  ? targetPageIdx
                  : currentPage
                : currentPage
            )}
          </div>

          {/* Dynamic Shadow during flip */}
          {isAnimating && (
            <div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                background:
                  turnDirection === "next"
                    ? `linear-gradient(90deg, rgba(0,0,0,${Math.sin(flipProgress * Math.PI) * 0.24}) 0%, transparent 65%)`
                    : `linear-gradient(270deg, rgba(0,0,0,${Math.sin(flipProgress * Math.PI) * 0.24}) 0%, transparent 65%)`,
              }}
            />
          )}

          {/* 3D Turning Page Leaf */}
          {isAnimating && flippingPage !== null && (
            <div
              className="absolute inset-0 z-30 pointer-events-none rounded-[2px]"
              style={{
                transformOrigin: "left center",
                transform:
                  turnDirection === "next"
                    ? `rotateY(${-flipProgress * 180}deg)`
                    : `rotateY(${-(1 - flipProgress) * 180}deg)`,
                transformStyle: "preserve-3d",
                boxShadow:
                  flipProgress > 0.05 && flipProgress < 0.95
                    ? "0 18px 30px -8px rgba(0,0,0,0.28)"
                    : "none",
              }}
            >
              {/* Front Face: shows the flipping page */}
              <div
                className="absolute inset-0 rounded-[2px] overflow-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  background: "linear-gradient(145deg, #f7efe1 0%, #eee3cc 50%, #e5d5ba 100%)",
                  border: "1px solid #dcd1bb",
                }}
              >
                {renderPageSheet(flippingPage)}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      turnDirection === "next"
                        ? `linear-gradient(90deg, rgba(0,0,0,${flipProgress * 0.28}) 0%, transparent 80%)`
                        : `linear-gradient(90deg, rgba(0,0,0,${(1 - flipProgress) * 0.28}) 0%, transparent 80%)`,
                  }}
                />
              </div>

              {/* Back Face: shows the back of the parchment */}
              <div
                className="absolute inset-0 rounded-[2px] overflow-hidden"
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                  background: "linear-gradient(225deg, #f6efe0 0%, #ede3cf 50%, #e7dcbe 100%)",
                  border: "1px solid #dcd0b8",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      turnDirection === "next"
                        ? `linear-gradient(270deg, rgba(0,0,0,${(1 - flipProgress) * 0.28}) 0%, transparent 80%)`
                        : `linear-gradient(270deg, rgba(0,0,0,${flipProgress * 0.28}) 0%, transparent 80%)`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

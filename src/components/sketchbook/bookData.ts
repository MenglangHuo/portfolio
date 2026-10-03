export interface BookSectionItem {
  headingEn: string;
  headingKh: string;
  bodyEn: string;
  bodyKh: string;
}

export interface BookPageData {
  number: string;
  categoryEn: string;
  categoryKh: string;
  titleEn: string;
  titleKh: string;
  subtitleEn: string;
  subtitleKh: string;
  taglineEn?: string;
  taglineKh?: string;
  sections: BookSectionItem[];
  tags: string[];
  illustrationType: 'engineering' | 'cloud' | 'vitality' | 'philosophy';
}

export const BOOK_PAGES: BookPageData[] = [
  {
    number: "01",
    categoryEn: "PROFESSIONAL BACKGROUND",
    categoryKh: "ប្រវត្តិវិជ្ជាជីវៈ",
    titleEn: "Engineering Core",
    titleKh: "ស្នូលវិស្វកម្ម",
    subtitleEn: "Architecting Resilient Distributed Systems",
    subtitleKh: "ការកសាងប្រព័ន្ធចែកចាយដែលរឹងមាំ",
    taglineEn: "Building resilient backend systems and responsive modern web applications.",
    taglineKh: "កសាងប្រព័ន្ធ backend ដែលរឹងមាំ និងកម្មវិធី modern web ប្រកបដោយភាពរលូន។",
    sections: [
      {
        headingEn: "Tagline",
        headingKh: "ទិសដៅចម្បង",
        bodyEn: "Building resilient backend systems and responsive modern web applications.",
        bodyKh: "កសាងប្រព័ន្ធ backend ដែលរឹងមាំ និងកម្មវិធី modern web ប្រកបដោយភាពរលូន។"
      },
      {
        headingEn: "Engineering Core",
        headingKh: "បទពិសោធន៍វិស្វកម្ម",
        bodyEn: "Over 3 years in fullstack development and nearly 2 years designing system-level architecture. Specialized in high-performance microservices, RESTful APIs, and scalable web solutions using Spring Boot, Next.js, and PostgreSQL.",
        bodyKh: "បទពិសោធន៍ជាង ៣ ឆ្នាំក្នុងការអភិវឌ្ឍន៍ fullstack និងជិត ២ ឆ្នាំក្នុងការរចនាស្ថាបត្យកម្មកម្រិតប្រព័ន្ធ។ ជំនាញលើ high-performance microservices, RESTful APIs, និង scalable web solutions ដោយប្រើ Spring Boot, Next.js, និង PostgreSQL។"
      }
    ],
    tags: ["Spring Boot", "Next.js", "PostgreSQL", "Microservices", "REST APIs"],
    illustrationType: "engineering"
  },
  {
    number: "02",
    categoryEn: "INFRASTRUCTURE & METHODOLOGY",
    categoryKh: "ហេដ្ឋារចនាសម្ព័ន្ធ និង វិធីសាស្ត្រ",
    titleEn: "Cloud & Evolution",
    titleKh: "Cloud និង ការអភិវឌ្ឍន៍",
    subtitleEn: "Automated Deployments & Distributed Pipelines",
    subtitleKh: "ការដាក់ដំណើរការស្វ័យប្រវត្តិ និង Distributed Pipelines",
    sections: [
      {
        headingEn: "Infrastructure & Cloud",
        headingKh: "ហេដ្ឋារចនាសម្ព័ន្ធ និង Cloud",
        bodyEn: "Hands-on experience containerizing and orchestrating services with Docker and Kubernetes, backed by foundational cloud deployments on AWS.",
        bodyKh: "បទពិសោធន៍ជាក់ស្តែងក្នុងការ containerize និង orchestrate សេវាកម្មជាមួយ Docker និង Kubernetes ព្រមទាំងការដាក់ដំណើរការ Cloud នៅលើ AWS។"
      },
      {
        headingEn: "Continuous Growth",
        headingKh: "ការរៀនសូត្រជាបន្តបន្ទាប់",
        bodyEn: "Quick to adopt new paradigms, actively expanding depth in distributed system architecture, modern DevOps automation, and emerging Big Data & AI workflows.",
        bodyKh: "ឆាប់ចាប់យកចំណេះដឹង និងបច្ចេកវិទ្យាថ្មីៗ កំពុងពង្រីកការយល់ដឹងលើ distributed system architecture, DevOps automation, និង AI & Big Data workflows។"
      },
      {
        headingEn: "Work Style",
        headingKh: "របៀបធ្វើការងារ",
        bodyEn: "Driven both as an autonomous problem-solver and as a collaborative, cross-functional team contributor.",
        bodyKh: "ជាអ្នកដោះស្រាយបញ្ហាប្រកបដោយឯករាជ្យ និងសហការយ៉ាងសកម្មជាមួយក្រុមចម្រុះ។"
      }
    ],
    tags: ["Docker", "Kubernetes", "AWS", "DevOps", "Big Data & AI", "System Arch"],
    illustrationType: "cloud"
  },
  {
    number: "03",
    categoryEn: "BEYOND THE CODE",
    categoryKh: "លើសពីការសរសេរកូដ",
    titleEn: "Mind & Vitality",
    titleKh: "ចិត្ត និង ថាមពល",
    subtitleEn: "Cultivating Inner Discipline & Daily Reflection",
    subtitleKh: "ការបណ្ដុះវិន័យក្នុងខ្លួន និងការឆ្លុះបញ្ចាំងប្រចាំថ្ងៃ",
    sections: [
      {
        headingEn: "Mindfulness & Learning",
        headingKh: "ការរៀនសូត្រ និង ស្មារតីភ្ញាក់រលឹក",
        bodyEn: "Early mornings are dedicated to reading and mindful reflection—starting each day with focus and perspective.",
        bodyKh: "ពេលវេលាពេលព្រឹកព្រលឹមត្រូវបានបម្រុងទុកសម្រាប់ការអានសៀវភៅ និងការឆ្លុះបញ្ចាំងដោយស្ងប់ចិត្ត—ចាប់ផ្តើមថ្ងៃថ្មីនីមួយៗដោយការផ្ដោតអារម្មណ៍ និងទស្សនវិស័យច្បាស់លាស់។"
      },
      {
        headingEn: "Discipline & Vitality",
        headingKh: "វិន័យ និង ភាពរឹងមាំ",
        bodyEn: "Practicing Karate-Do anchors my weekly habits, instilling mental clarity, physical endurance, and consistency.",
        bodyKh: "ការហ្វឹកហាត់ Karate-Do គឺជាចំណុចស្នូលនៃទម្លាប់ប្រចាំសប្តាហ៍ ដែលជួយបណ្តុះនូវការគិតច្បាស់លាស់ ភាពធន់នៃរាងកាយ និងភាពខ្ជាប់ខ្ជួន។"
      }
    ],
    tags: ["Karate-Do", "Mindfulness", "Daily Reflection", "Focus", "Consistency"],
    illustrationType: "vitality"
  },
  {
    number: "04",
    categoryEn: "COMMUNITY & PHILOSOPHY",
    categoryKh: "សហគមន៍ និង ទស្សនវិជ្ជា",
    titleEn: "Purpose & Giving",
    titleKh: "គោលបំណង និង ការលះបង់",
    subtitleEn: "Intentional Dialogue & Quiet Contribution",
    subtitleKh: "ការសន្ទនាប្រកបដោយអត្ថន័យ និងការរួមចំណែកដោយស្ងៀមស្ងាត់",
    sections: [
      {
        headingEn: "Community & Connection",
        headingKh: "សហគមន៍ និង ការតភ្ជាប់",
        bodyEn: "Weekends are for intentional conversations—sharing perspectives on life, technology, and mutual growth, while finding practical ways to be better together.",
        bodyKh: "ចុងសប្តាហ៍គឺជាពេលវេលាសម្រាប់ការសន្ទនាប្រកបដោយអត្ថន័យ—ចែករំលែកទស្សនៈលើជីវិត បច្ចេកវិទ្យា និងការរីកចម្រើនរួមគ្នា ព្រមទាំងស្វែងរកវិធីជាក់ស្តែងដើម្បីប្រសើរឡើងជាមួយគ្នា។"
      },
      {
        headingEn: "Philosophy",
        headingKh: "ទស្សនវិជ្ជាស្នូល",
        bodyEn: "I believe genuine fulfillment comes from giving without expecting returns, quietly supporting the happiness of those around me.",
        bodyKh: "ខ្ញុំជឿជាក់ថា ការបំពេញចិត្តពិតប្រាកដកើតចេញពីការលះបង់ដោយមិនរំពឹងផលតបស្នង និងគាំទ្រសុភមង្គលរបស់អ្នកជុំវិញខ្លួនដោយស្ងៀមស្ងាត់។"
      }
    ],
    tags: ["Giving", "Intentional Growth", "Empathy", "Community", "Truth"],
    illustrationType: "philosophy"
  }
];

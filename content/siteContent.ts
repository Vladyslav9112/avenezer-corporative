// content/siteContent.ts

export type NavItem = {
  label: string;
  href: string;
};

export type BulletBlock = {
  title?: string;
  bullets: string[];
};

export type Section = {
  id: string;
  title: string;
  subtitle?: string;
  paragraphs?: string[];
  bulletBlocks?: BulletBlock[];
};

export type PageContent = {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
  };
  sections: Section[];
};

export const SITE = {
  brand: "AvenEzer",
  tagline: "Цифрова платформа для бізнесів i користувачів",
  domain: "www.avenezer.ink",
  email: "info@avenezer.ink",
};

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Platform", href: "/platform" },
  { label: "Avers", href: "/avers" },
  { label: "Connectia", href: "/connectia" },
  { label: "Contact", href: "/contact" },
];

export const PAGES: Record<
  "home" | "about" | "platform" | "avers" | "connectia" | "contact",
  PageContent
> = {
  home: {
    meta: {
      title: "AvenEzer — Головна",
      description:
        "AvenEzer — міжнародна цифрова платформа для представлення бізнесів, сервісів i професійних послуг та зручної навігації користувачів у різних містах i країнах.",
    },
    hero: {
      eyebrow: "HOME / ГОЛОВНА",
      title: "AvenEzer",
      subtitle:
        "AvenEzer — це міжнародна цифрова платформа, створена для представлення бізнесів, сервісів i професійних послуг, а також для зручної навігації користувачів у різних містах i країнах.\n\nПлатформа поєднує технології, структуровану екосистему та спільноту учасників, які беруть участь у її розвитку.",
    },
    sections: [
      {
        id: "platform-today",
        title: "Платформа сьогодні",
        paragraphs: [
          "На даний момент AvenEzer працює у форматі MVP веб-платформи.",
          "MVP дозволяє:",
        ],
        bulletBlocks: [
          {
            bullets: [
              "створювати та переглядати бізнес-профілі,",
              "знайомитися з функціоналом платформи,",
              "долучатися до екосистеми на ранньому етапі,",
              "тестувати підходи та структуру майбутнього продукту.",
            ],
          },
        ],
      },
      {
        id: "mvp-note",
        title: "Примітка щодо MVP",
        paragraphs: [
          "MVP є початковою версією платформи та може змінюватися в процесі розвитку.",
        ],
      },
      {
        id: "next-stage",
        title: "Наступний етап",
        paragraphs: [
          "Наступним етапом розвитку AvenEzer є мобільний додаток, який розширить доступ до платформи та зробить користування зручнішим для бізнесів i користувачів.",
          "Мобільний додаток перебуває на стадії планування та розробки. Функціонал i терміни запуску формуються поступово.",
        ],
      },
      {
        id: "for-whom",
        title: "Для кого створена платформа",
        bulletBlocks: [
          {
            title: "Бізнесам",
            bullets: [
              "цифрова присутність i видимість,",
              "представлення послуг i компаній,",
              "структурована подача інформації,",
              "доступ до нової аудиторії.",
            ],
          },
          {
            title: "Користувачам",
            bullets: [
              "пошук бізнесів i сервісів,",
              "навігація за категоріями та локаціями,",
              "зручний доступ до актуальної інформації.",
            ],
          },
        ],
      },
    ],
  },

  about: {
    meta: {
      title: "AvenEzer — Про нас",
      description:
        "Про компанію AvenEzer, місія та підхід до розвитку міжнародної цифрової екосистеми.",
    },
    hero: {
      eyebrow: "ABOUT / ПРО AvenEzer",
      title: "Про компанію",
      subtitle:
        "AvenEzer — це незалежна платформа, яка розвивається як міжнародна цифрова екосистема.",
    },
    sections: [
      {
        id: "about-company",
        title: "Про компанію",
        paragraphs: [
          "Компанія працює над створенням технологічного середовища, що об’єднує бізнеси, користувачів та незалежних учасників у межах єдиної структури з чіткими правилами взаємодії.",
        ],
      },
      {
        id: "mission",
        title: "Місія AvenEzer",
        paragraphs: [
          "Наша місія — створити сучасну цифрову платформу, яка спрощує взаємодію між бізнесами та користувачами i формує новий стандарт онлайн-навігації та присутності.",
        ],
      },
      {
        id: "approach",
        title: "Підхід до розвитку",
        paragraphs: ["AvenEzer розвивається поетапно, з фокусом на:"],
        bulletBlocks: [
          {
            bullets: [
              "стабільну архітектуру,",
              "зрозумілу логіку користування,",
              "масштабованість,",
              "довгострокову цінність для учасників.",
            ],
          },
        ],
      },
    ],
  },

  platform: {
    meta: {
      title: "AvenEzer — MVP платформа",
      description:
        "Опис MVP веб-платформи AvenEzer: призначення, тестування, структура та правила користування.",
    },
    hero: {
      eyebrow: "PLATFORM / MVP ПЛАТФОРМА",
      title: "MVP веб-платформа AvenEzer",
      subtitle:
        "MVP — це перша робоча версія платформи AvenEzer, яка використовується для тестування функціоналу, формування структури платформи, збору зворотного звʼязку та підготовки до наступних етапів розвитку.",
    },
    sections: [
      {
        id: "mvp-purpose",
        title: "Призначення MVP",
        paragraphs: ["Функціонал MVP може змінюватися або доповнюватися."],
      },
      {
        id: "how-to-use",
        title: "Як користуватися платформою",
        paragraphs: [
          "Платформа доступна для бізнесів i користувачів, які бажають:",
        ],
        bulletBlocks: [
          {
            bullets: [
              "ознайомитися з можливостями AvenEzer,",
              "створити профіль (за наявності відповідного функціоналу),",
              "користуватися платформою відповідно до встановлених правил.",
            ],
          },
        ],
      },
    ],
  },

  avers: {
    meta: {
      title: "AvenEzer — Avers",
      description:
        "Хто такі Avers, їх роль у екосистемі AvenEzer, а також AvenEzer School як внутрішня школа навчання.",
    },
    hero: {
      eyebrow: "AVERS / АВЕРИ",
      title: "Хто такі Avers",
      subtitle:
        "Aver — це незалежний учасник екосистеми AvenEzer, який бере участь у розвитку платформи, допомагає бізнесам i користувачам орієнтуватися в системі та працює з інструментами платформи.",
    },
    sections: [
      {
        id: "avers-role",
        title: "Роль Avers",
        paragraphs: [
          "Avers діють самостійно та взаємодіють з платформою відповідно до внутрішніх правил i умов участі.",
        ],
      },
      {
        id: "school",
        title: "AvenEzer School",
        paragraphs: [
          "AvenEzer School — це внутрішня школа навчання для Avers.",
        ],
        bulletBlocks: [
          {
            title: "Школа створена для",
            bullets: [
              "підготовки Avers до роботи з платформою,",
              "пояснення структури та правил екосистеми,",
              "формування стандартів комунікації та взаємодії.",
            ],
          },
        ],
      },
      {
        id: "school-note",
        title: "Формат навчання",
        paragraphs: [
          "Формат навчання та наповнення програм визначаються компанією та можуть змінюватися.",
        ],
      },
    ],
  },

  connectia: {
    meta: {
      title: "AvenEzer — Connectia Business Club",
      description:
        "Connectia Business Club — бізнес-спільнота в межах екосистеми AvenEzer для професійного спілкування та побудови ділових зв’язків.",
    },
    hero: {
      eyebrow: "CONNECTIA BUSINESS CLUB",
      title: "Connectia Business Club",
      subtitle:
        "Connectia Business Club — це бізнес-спільнота в межах екосистеми AvenEzer, створена для професійного спілкування, обміну досвідом та побудови ділових зв’язків.",
    },
    sections: [
      {
        id: "connectia-part",
        title: "Частина екосистеми",
        paragraphs: [
          "Клуб є частиною екосистеми AvenEzer i розвивається як окремий напрям.",
        ],
      },
    ],
  },

  contact: {
    meta: {
      title: "AvenEzer — Контакти",
      description:
        "Контактна інформація AvenEzer для загальних питань та партнерських запитів.",
    },
    hero: {
      eyebrow: "CONTACT / КОНТАКТИ",
      title: "Контактна інформація",
      subtitle:
        "Загальні питання, партнерські запити та звернення щодо платформи:",
    },
    sections: [
      {
        id: "contact-details",
        title: "Звʼязок",
        bulletBlocks: [
          {
            bullets: [`Email: info@avenezer.ink`, `Website: www.avenezer.ink`],
          },
        ],
      },
    ],
  },
};

// Facts for the homepage. Source: veon/client.json (ids in comments). Nothing here is invented.

export const SOON = "Розділ у розробці";

export interface Center {
  id: string;
  district: string;
  city: string;
  address: string;
  hours: { days: string; time: string }[];
  phone: string;
  phoneDisplay: string;
  mapQuery: string;
  postal: { locality: string; street: string };
  openingHours: string[];
}

// company.contacts.phones / addresses (+ note = hours). Chornovola — «67б» (C-011).
export const centers: Center[] = [
  {
    id: "chornovola",
    district: "Чорновола",
    city: "Львів",
    address: "просп. Чорновола, 67б",
    hours: [
      { days: "пн–пт", time: "08:00–20:00" },
      { days: "сб", time: "10:00–14:00" },
    ],
    phone: "+380673732414",
    phoneDisplay: "067 373 24 14",
    mapQuery: "Львів, проспект Чорновола, 67б",
    postal: { locality: "Львів", street: "просп. Чорновола, 67б" },
    openingHours: ["Mo-Fr 08:00-20:00", "Sa 10:00-14:00"],
  },
  {
    id: "stryiska",
    district: "Стрийська",
    city: "Львів",
    address: "вул. Стрийська, 7",
    hours: [{ days: "пн–пт", time: "09:00–20:00" }],
    phone: "+380676731454",
    phoneDisplay: "067 673 14 54",
    mapQuery: "Львів, вулиця Стрийська, 7",
    postal: { locality: "Львів", street: "вул. Стрийська, 7" },
    openingHours: ["Mo-Fr 09:00-20:00"],
  },
  {
    id: "novoiavorivsk",
    district: "Новояворівськ",
    city: "Новояворівськ",
    address: "вул. Шевченка, 8г, ТЦ «Янтар», 2 поверх",
    hours: [
      { days: "пн–пт", time: "10:00–20:00" },
      { days: "сб", time: "12:00–14:00" },
    ],
    phone: "+380675054365",
    phoneDisplay: "067 505 43 65",
    mapQuery: "Новояворівськ, вулиця Шевченка, 8г, ТЦ Янтар",
    postal: { locality: "Новояворівськ", street: "вул. Шевченка, 8г (ТЦ «Янтар», 2 поверх)" },
    openingHours: ["Mo-Fr 10:00-20:00", "Sa 12:00-14:00"],
  },
];

export const email = "info@babyclub.ua"; // company.contacts.emails

// socials, status confirmed
export const socials = [
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/babyclub.ua" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/baby_club_ukraine/" },
  { id: "youtube", label: "YouTube", href: "https://www.youtube.com/channel/UCQfDrXvtaFr8SLVVlZXQVNQ" },
] as const;

export const mapHref = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

// Age steps: site menu 1–2 … 6–7 (C-004), catalogue 1–10 (W-F005) → «7+».
// Segment colours are taken from the KiDS letters of logo.webp (concept §5: exact HEX from the logo file).
export const ages = [
  { id: "1-2", label: "1–2", long: "1–2 роки" },
  { id: "2-3", label: "2–3", long: "2–3 роки" },
  { id: "3-4", label: "3–4", long: "3–4 роки" },
  { id: "4-5", label: "4–5", long: "4–5 років" },
  { id: "5-6", label: "5–6", long: "5–6 років" },
  { id: "6-7", label: "6–7", long: "6–7 років" },
  { id: "7", label: "7+", long: "7 років і старше" },
] as const;

export type AgeId = (typeof ages)[number]["id"];
export const allAges: AgeId[] = ages.map((a) => a.id);

export interface Program {
  title: string;
  text?: string;
  /** confirmed ages; undefined = age not confirmed in the data */
  ages?: AgeId[];
  ageText: string;
  /** internal anchor on this page; otherwise «Детальніше» is a FutureLink */
  anchor?: string;
}

export interface ProgramGroup {
  title: string;
  items: Program[];
}

export const programGroups: ProgramGroup[] = [
  {
    title: "Розвиток і школа",
    items: [
      {
        // products_services[0], C-008
        title: "Розвивальні заняття",
        text: "Комплекс занять «забавлянка», «наука», «майстерня», «руханка» в мінігрупах до 8 дітей.",
        ages: allAges,
        ageText: "1–10 років",
      },
      {
        // products_services[1], C-005, audit/facts.json (mini-sadok description: 1–6)
        title: "Мінісадок",
        text: "Режим дня, заняття, прогулянки, екскурсії і ланч.",
        ages: ["1-2", "2-3", "3-4", "4-5", "5-6"],
        ageText: "1–6 років",
        anchor: "#mini-sadok",
      },
      {
        // products_services[2]
        title: "Підготовка до школи",
        text: "Читання, письмо, пізнання світу, самоорганізація.",
        ageText: "вік — в адміністратора центру",
      },
      {
        // products_services[3]
        title: "Ментальна арифметика",
        // C-015
        text: "Заняття на абакусі раз на тиждень.",
        ages: ["4-5", "5-6", "6-7", "7"],
        ageText: "4,5–12 років",
      },
      {
        // products_services[5], C-001 (Brighter ART)
        title: "Малювання",
        // C-016
        text: "Арт-заняття Brighter ART.",
        ages: ["3-4", "4-5", "5-6", "6-7", "7"],
        ageText: "від 3 років",
      },
      {
        // products_services[4]
        title: "Англійська Brighter English",
        text: "Мінігрупи до 6 осіб, групи 3–6, 6–12, 12+ років і дорослі.",
        ages: ["3-4", "4-5", "5-6", "6-7", "7"],
        ageText: "від 3 років і дорослі",
        anchor: "#english",
      },
    ],
  },
  {
    title: "Спеціалісти",
    items: [
      // products_services[6]
      // C-017
      { title: "Логопед", text: "Індивідуальні заняття.", ages: ["2-3", "3-4", "4-5", "5-6", "6-7", "7"], ageText: "від 2 років" },
      { title: "Дитячий психолог", ageText: "вік — в адміністратора центру" },
      { title: "Приватний репетитор", ageText: "вік — в адміністратора центру" },
    ],
  },
  {
    title: "Свята і майстер-класи",
    items: [
      {
        // products_services[7], business_lines[5]
        title: "Майстер-класи, свята, квести",
        text: "Дитяче дозвілля.",
        ageText: "вік — в адміністратора центру",
      },
    ],
  },
];

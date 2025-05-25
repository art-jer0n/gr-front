import { NewsItem } from 'interfaces/news-item'
import { Country } from './interfaces/country'
import { Embassy } from './interfaces/embassy'
import { Organization } from './interfaces/organization'
import { CalendarEvent } from 'interfaces/calendar-event';
import { APIOptions } from 'primereact/api';
import { TradeMissionDocument } from 'interfaces/trade-mission-document';
import { TradeMission } from 'interfaces/trade-mission';

export const EMPTY_MESSAGE: string = "Нет данных для отображения";

export const EMPTY_SHORT_MESSAGE: string = "н/д"

export const PRIME_REACT_PROVIDER_OPTIONS: Partial<APIOptions> = {
  pt: {
    card: {
      root: { className: "card_root" },
    },
    dropdown: {
      clearIcon: { className: "dropdown_clear_icon" }
    }
  }
}

export const DEFAULT_EVENT: CalendarEvent = {
  id: 0,
  beginDate: null,
  endDate: null,
  content: "",
}

export const DEFAULT_NEWS_ITEM: NewsItem = {
  id: 0,
  title: "",
  content: "",
  date: null,
  order: 0
}

export const DEFAULT_COUNTRY: Country = {
  id: 0,
  name: '',
  flagUrl: '',
}

export const DEFAULT_EMBASSY: Embassy = {
  countryId: 0,
  id: 0,
  embassyName: '',
  embassyAddress: '',
  embassyPhone: '',
  embassyFax: '',
  embassyWorkHours: '',
  embassyWebsite: '',
  embassyEmail: '',
  embassyPhotoUrl: '',
  ambassadorName: '',
  ambassadorJobTitle: '',
  ambassadorPhotoUrl: '',
}

export const DEFAULT_OGRANIZATION: Organization = {
  id: 0,
  shortName: '',
  name: '',
  logoUrl: '',
  pdfUrl: '',
  pptxUrl: '',
}

export const EMBASSIES: Embassy[] = [
  {
    countryId: 31,
    id: 1,
    embassyName: 'Посольство Российской Федерации в Австрии',
    embassyAddress: 'Reisnerstrasse 45-47, 1030, Wien, Österreich',
    embassyPhone: '+43-1-712-12-29, +43-1-713-86-22',
    embassyFax: '+43-1-712-33-88',
    embassyWorkHours: 'с 8:30 до 17:30 с понедельника по пятницу',
    embassyWebsite: 'https://austria.mid.ru',
    embassyEmail: 'embrf@mail.ru',
    embassyPhotoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Wien_-_Palais_Nassau_bzw._russ._Botschaft_%28a%29.JPG/1920px-Wien_-_Palais_Nassau_bzw._russ._Botschaft_%28a%29.JPG',
    ambassadorName: 'ЛЮБИНСКИЙ Дмитрий Евгеньевич',
    ambassadorJobTitle: 'Чрезвычайный и Полномочный Посол',
    ambassadorPhotoUrl:
      'https://www.goldtrezzini.ru/wp-content/uploads/2018/07/Liubinskii.jpg',
  },
  {
    countryId: 31,
    id: 2,
    embassyName: 'Посольство Австрии в Российской Федерации',
    embassyAddress: '115127, Москва, Староконюшенный переулок, 1',
    embassyPhone: '(+7 495) 780 60 66',
    embassyFax: '(+7 495) 937 42 69',
    embassyWorkHours: 'с 09.00 до 13.00 с понедельника по пятницу',
    embassyWebsite: 'https://picsum.photos/600/800',
    embassyEmail: 'moskau-ob@bmeia.gv.at',
    embassyPhotoUrl:
      'https://avatars.mds.yandex.net/get-altay/1001354/2a0000016288077bc9f37e33f43d6e7e7e65/XXXL',
    ambassadorName: 'АЛЬМХОФЕР Вернер',
    ambassadorJobTitle: 'Чрезвычайный и Полномочный Посол',
    ambassadorPhotoUrl:
      'https://s0.rbk.ru/v6_top_pics/resized/590xH/media/img/9/77/756503766355779.jpg',
  },
]

export const COUNTRIES: Country[] = [
  { id: 1, name: 'Россия', flagUrl: 'https://flagcdn.com/w320/ru.png' },
  { id: 2, name: 'США', flagUrl: 'https://flagcdn.com/w320/us.png' },
  { id: 3, name: 'Китай', flagUrl: 'https://flagcdn.com/w320/cn.png' },
  { id: 4, name: 'Германия', flagUrl: 'https://flagcdn.com/w320/de.png' },
  { id: 5, name: 'Франция', flagUrl: 'https://flagcdn.com/w320/fr.png' },
  { id: 6, name: 'Индия', flagUrl: 'https://flagcdn.com/w320/in.png' },
  { id: 7, name: 'Бразилия', flagUrl: 'https://flagcdn.com/w320/br.png' },
  { id: 8, name: 'Япония', flagUrl: 'https://flagcdn.com/w320/jp.png' },
  { id: 9, name: 'Канада', flagUrl: 'https://flagcdn.com/w320/ca.png' },
  { id: 10, name: 'Австралия', flagUrl: 'https://flagcdn.com/w320/au.png' },
  {
    id: 11,
    name: 'Великобритания',
    flagUrl: 'https://flagcdn.com/w320/gb.png',
  },
  { id: 12, name: 'Италия', flagUrl: 'https://flagcdn.com/w320/it.png' },
  { id: 13, name: 'Испания', flagUrl: 'https://flagcdn.com/w320/es.png' },
  { id: 14, name: 'Мексика', flagUrl: 'https://flagcdn.com/w320/mx.png' },
  { id: 15, name: 'Индонезия', flagUrl: 'https://flagcdn.com/w320/id.png' },
  { id: 16, name: 'Турция', flagUrl: 'https://flagcdn.com/w320/tr.png' },
  {
    id: 17,
    name: 'Саудовская Аравия',
    flagUrl: 'https://flagcdn.com/w320/sa.png',
  },
  { id: 18, name: 'Южная Корея', flagUrl: 'https://flagcdn.com/w320/kr.png' },
  { id: 19, name: 'Аргентина', flagUrl: 'https://flagcdn.com/w320/ar.png' },
  { id: 20, name: 'Южная Африка', flagUrl: 'https://flagcdn.com/w320/za.png' },
  { id: 21, name: 'Нигерия', flagUrl: 'https://flagcdn.com/w320/ng.png' },
  { id: 22, name: 'Египет', flagUrl: 'https://flagcdn.com/w320/eg.png' },
  { id: 23, name: 'Польша', flagUrl: 'https://flagcdn.com/w320/pl.png' },
  { id: 24, name: 'Нидерланды', flagUrl: 'https://flagcdn.com/w320/nl.png' },
  { id: 25, name: 'Бельгия', flagUrl: 'https://flagcdn.com/w320/be.png' },
  { id: 26, name: 'Швеция', flagUrl: 'https://flagcdn.com/w320/se.png' },
  { id: 27, name: 'Норвегия', flagUrl: 'https://flagcdn.com/w320/no.png' },
  { id: 28, name: 'Дания', flagUrl: 'https://flagcdn.com/w320/dk.png' },
  { id: 29, name: 'Финляндия', flagUrl: 'https://flagcdn.com/w320/fi.png' },
  { id: 30, name: 'Швейцария', flagUrl: 'https://flagcdn.com/w320/ch.png' },
  { id: 31, name: 'Австрия', flagUrl: 'https://flagcdn.com/w320/at.png' },
  { id: 32, name: 'Греция', flagUrl: 'https://flagcdn.com/w320/gr.png' },
  { id: 33, name: 'Португалия', flagUrl: 'https://flagcdn.com/w320/pt.png' },
  { id: 34, name: 'Ирландия', flagUrl: 'https://flagcdn.com/w320/ie.png' },
  {
    id: 35,
    name: 'Новая Зеландия',
    flagUrl: 'https://flagcdn.com/w320/nz.png',
  },
  { id: 36, name: 'Сингапур', flagUrl: 'https://flagcdn.com/w320/sg.png' },
  { id: 37, name: 'Малайзия', flagUrl: 'https://flagcdn.com/w320/my.png' },
  { id: 38, name: 'Таиланд', flagUrl: 'https://flagcdn.com/w320/th.png' },
  { id: 39, name: 'Вьетнам', flagUrl: 'https://flagcdn.com/w320/vn.png' },
  { id: 40, name: 'Израиль', flagUrl: 'https://flagcdn.com/w320/il.png' },
  { id: 41, name: 'Чехия', flagUrl: 'https://flagcdn.com/w320/cz.png' },
  { id: 42, name: 'Венгрия', flagUrl: 'https://flagcdn.com/w320/hu.png' },
  { id: 43, name: 'Румыния', flagUrl: 'https://flagcdn.com/w320/ro.png' },
  { id: 44, name: 'Болгария', flagUrl: 'https://flagcdn.com/w320/bg.png' },
  { id: 45, name: 'Украина', flagUrl: 'https://flagcdn.com/w320/ua.png' },
  { id: 46, name: 'Чили', flagUrl: 'https://flagcdn.com/w320/cl.png' },
  { id: 47, name: 'Колумбия', flagUrl: 'https://flagcdn.com/w320/co.png' },
  { id: 48, name: 'Перу', flagUrl: 'https://flagcdn.com/w320/pe.png' },
  { id: 49, name: 'Пакистан', flagUrl: 'https://flagcdn.com/w320/pk.png' },
  { id: 50, name: 'Кения', flagUrl: 'https://flagcdn.com/w320/ke.png' },
]

export const ORGANIZATIONS: Organization[] = [
  {
    id: 1,
    name: 'World Energy Council',
    shortName: 'WEC',
    logoUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeoF3KXpYQ1CL6HgTa1u9bE2UEMF19EtaOdA&s',
    pdfUrl: '',
    pptxUrl: '',
  },
  {
    id: 2,
    name: 'World Petroleum Council',
    shortName: 'WPC',
    logoUrl:
      'https://www.petroleum.gov.eg/ar-eg/international-relations/cooperation-with-national-organizations/PublishingImages/Pages/world-petroleum-council/5.png',
    pdfUrl: '',
    pptxUrl: '',
  },
  {
    id: 3,
    name: 'Eurasian Economic Union',
    shortName: 'EAEU',
    logoUrl:
      'https://www.eurasian-research.org/wp-content/uploads/2020/10/f4249977fda833ef3b0310c5fe7073f0.jpg',
    pdfUrl: '',
    pptxUrl: '',
  },
  {
    id: 4,
    name: 'Gas Exporting Countries Forum',
    shortName: 'GECF',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/b/bb/GECF_Logo.jpg',
    pdfUrl: '',
    pptxUrl: '',
  },
  {
    id: 5,
    name: 'OPEC',
    shortName: 'OPEC',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Flag_of_OPEC.svg/1200px-Flag_of_OPEC.svg.png',
    pdfUrl: '',
    pptxUrl: '',
  },
  {
    id: 6,
    name: 'World Trade Organization',
    shortName: 'WTO',
    logoUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTblgRBJ_Rlfmdf465XFjyCM_th6Csyf69anA&s',
    pdfUrl: '',
    pptxUrl: '',
  },
]

export const NEWS: NewsItem[] = [
  {
    id: 1,
    title: 'Мировые лидеры подписали новое соглашение о сотрудничестве',
    content: 'Сегодня в Женеве состоялась встреча глав государств, на которой было подписано историческое соглашениеa о расширении экономического сотрудничества и укреплении экологической безопасности.',
    date: new Date(2025, 1, 6),
    order: 0
  },
  {
    id: 2,
    title: 'Новые санкции против государства X усилены',
    content: 'Международное сообщество объявило о введении дополнительных санкций против государства X в ответ на нарушение международных обязательств, что может существенно сказаться на глобальной торговле.',
    date: new Date(2024, 3, 2),
    order: 0
  },
  {
    id: 3,
    title: 'Расширяется экономическое сотрудничество между странами',
    content: 'В нескольких ключевых экономиках мира достигнута договорённость о новом пакете мер по увеличению двусторонних инвестиций, что, по прогнозам аналитиков, приведёт к росту мировой экономики.',
    date: new Date(2024, 1, 12),
    order: 0
  },
  {
    id: 4,
    title: 'Переговоры о мирном соглашении продолжаются',
    content: 'В Стокгольме лидеры конфликтующих сторон встретились для обсуждения мирного соглашения, направленного на прекращение долгосрочного противостояния и установление стабильности в регионе.',
    date: new Date(2025, 11, 1),
    order: 0
  },
  {
    id: 5,
    title: 'Международный саммит по вопросам безопасности',
    content: 'На международном саммите, прошедшем в Берлине, мировые лидеры обсудили меры по усилению глобальной безопасности, включая вопросы кибербезопасности и борьбы с терроризмом.',
    date: new Date(2025, 5, 2),
    order: 0
  },
];

export const EVENTS: CalendarEvent[] = [
  {
    id: 1,
    beginDate: new Date(2025, 3, 1),
    content: 'Запуск нового маркетингового проекта. Обсуждение стратегии продвижения на квартал.',
    endDate: null
  },
  {
    id: 2,
    beginDate: new Date(2025, 3, 5),
    content: 'Техническое обслуживание серверов. Запланированный даунтайм с 02:00 до 05:00 по московскому времени.',
    endDate: null
  },
  {
    id: 3,
    beginDate: new Date(2025, 3, 10),
    content: 'Ежеквартальное собрание акционеров. Повестка: финансовые результаты, новые назначения.',
    endDate: null
  },
  {
    id: 4,
    beginDate: new Date(2025, 3, 12),
    content: 'Корпоративное обучение: "Эффективное управление проектами". Тренер: Иван Петров.',
    endDate: new Date(2025, 3, 14),
  },
  {
    id: 5,
    beginDate: new Date(2025, 3, 15),
    content: 'Выпуск новой версии продукта. Основные изменения: обновленный интерфейс, улучшенная безопасность.',
    endDate: new Date(2025, 3, 17),
  },
  {
    id: 6,
    beginDate: new Date(2025, 3, 18),
    content: 'Встреча с ключевыми клиентами. Обсуждение новых требований к функционалу платформы.',
    endDate: null
  },
  {
    id: 7,
    beginDate: new Date(2025, 3, 6),
    content: 'День рождения компании (10 лет). Торжественное мероприятие в главном офисе с 15:00.',
    endDate: new Date(2025, 3, 7),
  },
  {
    id: 8,
    beginDate: new Date(2025, 3, 20),
    content: 'Презентация нового отдела разработки. Знакомство с новыми сотрудниками и их проектами.',
    endDate: null
  },
  {
    id: 9,
    beginDate: new Date(2025, 3, 22),
    content: 'Хакатон для разработчиков. Тема: "Инновационные решения в области искусственного интеллекта".',
    endDate: null
  },
  {
    id: 10,
    beginDate: new Date(2025, 3, 19),
    content: 'Воркшоп по UX/UI дизайну. Разбор кейсов и лучших практик современного дизайна интерфейсов.',
    endDate: new Date(2025, 3, 21),
  },
  {
    id: 11,
    beginDate: new Date(2025, 3, 28),
    content: 'Финал внутреннего конкурса инновационных проектов. Награждение победителей.',
    endDate: null
  },
  {
    id: 12,
    beginDate: new Date(2025, 3, 30),
    content: 'Подготовка к майским праздникам. Короткий день до 15:00, техподдержка работает в обычном режиме.',
    endDate: null
  }
];

export const LOCALE_RU = {
  firstDayOfWeek: 1,
  dayNames: [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ],
  dayNamesShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  monthNames: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
  monthNamesShort: [
    "Янв",
    "Фев",
    "Мар",
    "Апр",
    "Май",
    "Июн",
    "Июл",
    "Авг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек",
  ],
  today: "Сегодня",
  clear: "Очистить",
};

export const TRADE_MISSION_DOCUMENTS: TradeMissionDocument[] = [
  {
    id: 1,
    url: "https://testingcenter.spbu.ru/images/files/TRKI-3.pdf",
    name: "TRKI-3.pdf",
    date: new Date("2024-12-31"),
    countryId: 7,
  },
  {
    id: 2,
    url: "/docs/Регламент работы.docx",
    name: "Регламент работы.docx",
    date: new Date("2025-11-15"),
    countryId: 7,
  },
  {
    id: 3,
    url: "/docs/Инструкция по приёму делегаций.pdf",
    name: "Инструкция по приёму делегаций.pdf",
    date: new Date("2024-10-01"),
    countryId: 7,
  },
  {
    id: 4,
    url: "/docs/Договор о сотрудничестве.docx",
    name: "Договор о сотрудничестве.docx",
    date: new Date("2023-06-20"),
    countryId: 7,
  },
  {
    id: 5,
    url: "/docs/plan.xlsx",
    name: "План мероприятий.xlsx",
    date: new Date("2025-01-10"),
    countryId: 7,
  },
];

export const TRADE_MISSIONS: TradeMission[] = [
  {
    id: 10,
    name: "ТОРГОВОЕ ПРЕДСТАВИТЕЛЬСТВО РОССИЙСКОЙ ФЕДЕРАЦИИ В ФЕДЕРАТИВНОЙ РЕСПУБЛИКЕ БРАЗИЛИИ",
    representative: "Шереметкер Виктор Вадимович",
    address: "SHIS QI 5, Chacara 12, Lago Sul, Brasilia - DF, Brasil, CEP 71600 - 520",
    phone: "+55(61) 3248-0766",
    fax: "+55(61) 3248 -0962",
    website: "https://bra.minpromtorg.gov.ru",
    email: "brasilia@minprom.gov.ru",
    countryId: 7
  },
  {
    id: 11,
    name: "ОТДЕЛЕНИЕ ТОРГОВОГО ПРЕДСТАВИТЕЛЬСТВА РОССИЙСКОЙ ФЕДЕРАЦИИ В ФЕДЕРАТИВНОЙ РЕСПУБЛИКЕ БРАЗИЛИЯ В Г.САН - ПАУЛУ",
    representative: "Торговый представитель Российской Федерации",
    address: "Rua Traipu, 831, Perdizes, Sao Paulo, Brasil, CEP 01235-000",
    phone: null,
    fax: null,
    website: "https://bra.minpromtorg.gov.ru",
    email: null,
    countryId: 7
  },
  {
    id: 12,
    name: "ОТДЕЛЕНИЕ ТОРГОВОГО ПРЕДСТАВИТЕЛЬСТВА РОССИЙСКОЙ ФЕДЕРАЦИИ В ФЕДЕРАТИВНОЙ РЕСПУБЛИКЕ БРАЗИЛИЯ В Г.САН - ПАУЛУ",
    representative: "Торговый представитель Российской Федерации",
    address: "Rua Traipu, 831, Perdizes, Sao Paulo, Brasil, CEP 01235-000",
    phone: null,
    fax: null,
    website: null,
    email: null,
    countryId: 7
  },
  {
    id: 12,
    name: "ОТДЕЛЕНИЕ ТОРГОВОГО ПРЕДСТАВИТЕЛЬСТВА РОССИЙСКОЙ ФЕДЕРАЦИИ В ФЕДЕРАТИВНОЙ РЕСПУБЛИКЕ БРАЗИЛИЯ В Г.САН - ПАУЛУ",
    representative: "Торговый представитель Российской Федерации",
    address: "Rua Traipu, 831, Perdizes, Sao Paulo, Brasil, CEP 01235-000",
    phone: null,
    fax: null,
    website: null,
    email: null,
    countryId: 1
  },
];

export const DEFAULT_TRADE_MISSION: TradeMission =
{
  id: 0,
  name: null,
  representative: null,
  address: null,
  phone: null,
  fax: null,
  website: null,
  email: null,
  countryId: 0,
}
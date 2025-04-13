import { News } from 'interfaces/news'
import { Country } from './interfaces/country'
import { Embassy } from './interfaces/embassy'
import { Organization } from './interfaces/organization'

export const EMPTY_MESSAGE = "Нет данных для отображения";

export const EMPTY_SHORT_MESSAGE = "Н/Д"

export const DEFAULT_COUNTRY: Country = {
  id: 0,
  name: '',
  flagUrl: '',
}

export const DEFAULT_EMBASSY: Embassy = {
  countryId: 0,
  embassyId: 0,
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
    embassyId: 1,
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
    embassyId: 2,
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

export const NEWS: News[] = [
  {
    id: 1,
    title: 'Мировые лидеры подписали новое соглашение о сотрудничестве',
    content:
      'Сегодня в Женеве состоялась встреча глав государств, на которой было подписано историческое соглашениеaS DAs dAS Das dAS D Asd ASD as dAS D asd AS Das dAS D asd AS Das dAS Da sd ASD as dASD asd AS FadsdfsADSad ASD as daS DD as dAS Das dAS Das dAS о расширении экономического сотрудничества и укреплении экологической безопасности.',
    date: '2025-03-31',
  },
  {
    id: 2,
    title: 'Новые санкции против государства X усилены',
    content:
      'Международное сообщество объявило о введении дополнительных санкций против государства X в ответ на нарушение международных обязательств, что может существенно сказаться на глобальной торговле.',
    date: '2025-03-30',
  },
  {
    id: 3,
    title: 'Расширяется экономическое сотрудничество между странами',
    content:
      'В нескольких ключевых экономиках мира достигнута договорённость о новом пакете мер по увеличению двусторонних инвестиций, что, по прогнозам аналитиков, приведёт к росту мировой экономики.',
    date: '2025-03-29',
  },
  {
    id: 4,
    title: 'Переговоры о мирном соглашении продолжаются',
    content:
      'В Стокгольме лидеры конфликтующих сторон встретились для обсуждения мирного соглашения, направленного на прекращение долгосрочного противостояния и установление стабильности в регионе.',
    date: '2025-03-28',
  },
  {
    id: 5,
    title: 'Международный саммит по вопросам безопасности',
    content:
      'На международном саммите, прошедшем в Берлине, мировые лидеры обсудили меры по усилению глобальной безопасности, включая вопросы кибербезопасности и борьбы с терроризмом.',
    date: '2025-03-27',
  },
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


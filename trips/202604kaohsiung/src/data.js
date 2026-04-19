// 2026/4 高雄小旅行 — data.js (SSOT)
// Edit this file to update the site. Re-run `npm test` from repo root.

const TRIP = {
  title: "2026/4 高雄小旅行",
  subtitle: "兩天一夜・自駕・高雄萬豪",
  heroTitle: "高雄萬豪小度假",
  heroDesc: "自駕從台北南下，入住高雄萬豪，隔天中午悠閒回程",
  dates: { start: "2026-04-24", end: "2026-04-25" },
  people: 2,
  country: "TW",
  origin: "台北",
  destinations: ["高雄"],
  hotel: {
    name: "高雄萬豪酒店",
    area: "鼓山・愛河灣",
    address: "高雄市鼓山區中華一路 168 號",
    note: "Check-in 15:00 起 ／ Check-out 12:00 前。飯店附設地下停車場（房客專用，每日優惠價；valet parking 可用）。抵達後可先寄放行李＋停好車再出門。",
    walking: [
      { to: "輕軌「鼓山區公所」站", minutes: 5 },
      { to: "愛河愛之船碼頭", minutes: 12 },
    ],
  },
  flights: [],
  budget: null,
  extraCards: [],
};

const DAYS = [
  {
    day: 1,
    date: "2026-04-24",
    dow: "五",
    city: "高雄",
    theme: "自駕南下・入住萬豪",
    summary: "一早自駕台北出發，南下高雄，下午 check-in 後到愛河周邊散步。",
    level: "💰💰",
    timeline: [
      { time: "07:00", event: "台北出發（建議走國道3號，車少好開）" },
      { time: "~09:30", event: "西湖服務區 or 西螺服務區 休息＋早午餐" },
      { time: "~12:00", event: "抵達高雄市區，先到飯店寄放行李／停車" },
      { time: "午餐", event: "飯店周邊或鹽埕區覓食" },
      { time: "15:00", event: "高雄萬豪 check-in（正式入住＋行李上樓）" },
      { time: "16:00", event: "愛河散步 ／ 駁二藝術特區 ／ 鹽埕埔（可搭輕軌或開車）" },
      { time: "晚餐", event: "鹽埕區或瑞豐夜市覓食" },
    ],
    meals: [
      { type: "午餐", title: "待填", note: "抵達後在市區或飯店附近吃" },
      { type: "晚餐", title: "待填", note: "鹽埕區老店或夜市" },
    ],
    categories: [],
  },
  {
    day: 2,
    date: "2026-04-25",
    dow: "六",
    city: "高雄",
    theme: "早午餐・自駕回程",
    summary: "享用飯店早餐，悠閒逛一逛，中午退房自駕北上。",
    level: "💰",
    timeline: [
      { time: "08:00–10:00", event: "飯店早餐" },
      { time: "10:00–11:30", event: "愛河灣散步 ／ 附近咖啡廳" },
      { time: "12:00", event: "Check-out ＋ 取車" },
      { time: "12:30", event: "高雄出發（國道3號／國道1號，看即時路況）" },
      { time: "~14:30", event: "西螺或泰安服務區 休息＋午餐" },
      { time: "~17:30", event: "抵達台北（避開週六下午回程尖峰可再早 1h 出發）" },
    ],
    meals: [
      { type: "早餐", title: "高雄萬豪早餐 buffet", note: "含在房價內；豐富海鮮" },
    ],
    categories: [],
  },
];

const CATEGORIES = {
  local: { label: "在地美食", icon: "🍽️" },
};

const RESTAURANTS = [];

const TRANSPORT = {
  sections: [
    {
      icon: "🚗",
      title: "台北 ↔ 高雄（自駕）",
      type: "table",
      items: [
        { route: "國道3號（北二高／福高）", path: "台北 → 高雄", time: "4h30m～5h", fare: "ETC 約 NT$420",
          note: "推薦去程：車流較少、路線順，接國10進高雄市區" },
        { route: "國道1號（中山高）", path: "台北 → 高雄", time: "4h30m～5h30m", fare: "ETC 約 NT$430",
          note: "回程選項：經台中都會區較擠；但接高雄市區較直接" },
      ],
      note: "週五早上南下、週六下午北上；避開週日晚的回程塞車尖峰。總油＋過路費單程粗估 NT$1,500–2,000。",
    },
    {
      icon: "🛣️",
      title: "建議休息站",
      type: "options",
      items: [
        { name: "西湖服務區（國3，苗栗）", time: "出發後 ~1.5h", fare: "—",
          note: "南下第一個大站，早餐／咖啡補給" },
        { name: "西螺服務區（國1，雲林）", time: "出發後 ~3h", fare: "—",
          note: "腹地大、小吃多，適合午餐；國1回程也在這休息" },
        { name: "東山服務區（國1，台南）", time: "出發後 ~3.5h", fare: "—",
          note: "鴨頭、咖啡出名，離高雄約 1h" },
      ],
      note: "單趟建議中途休息 1–2 次，每次 15–20 分，避免疲勞駕駛。",
    },
    {
      icon: "🅿️",
      title: "飯店停車",
      type: "info-rows",
      items: [
        { key: "高雄萬豪", val: "附設地下停車場，房客優惠價；Valet 服務可用" },
        { key: "市區景點", val: "駁二／愛河附近有公有停車場（時數計費）" },
        { key: "備援 App", val: "USPACE、iParking 可查即時車位" },
      ],
      note: "建議入住期間車就停飯店，市區移動搭輕軌或 Uber 更輕鬆。",
    },
    {
      icon: "🚇",
      title: "高雄市區交通（備用）",
      type: "options",
      items: [
        { name: "輕軌（環狀）", time: "每 10–15 分一班", fare: "NT$30",
          note: "飯店步行 5 分到「鼓山區公所」站；可到駁二、大港橋" },
        { name: "捷運紅線／橘線", time: "每 6–8 分一班", fare: "NT$20–60",
          note: "若車停飯店，搭捷運去美麗島、六合夜市最省事" },
      ],
      note: "建議備一張一卡通，搭車 8 折。",
    },
  ],
};

const TIPS = {
  sections: [
    {
      icon: "☀️",
      title: "四月底高雄天氣",
      type: "info-rows",
      items: [
        { key: "氣溫", val: "22–29°C" },
        { key: "體感", val: "舒服，偶有午後悶熱" },
        { key: "降雨", val: "乾季尾聲，雨機率低" },
        { key: "UV 指數", val: "8–9（強），需防曬" },
      ],
      note: "建議穿短袖＋薄外套（飯店冷氣強），帶墨鏡、防曬乳。",
    },
    {
      icon: "🎒",
      title: "打包提醒",
      type: "checklist",
      items: [
        "身分證（飯店 check-in）",
        "駕照＋行照（自駕必備）",
        "ETC 卡／確認餘額足夠（單趟過路費約 NT$420）",
        "信用卡＋少量現金（夜市、老店、停車場）",
        "一卡通或悠遊卡（搭輕軌／捷運備用）",
        "換洗衣物（兩天一夜，輕便）",
        "防曬乳＋墨鏡＋帽子",
        "萬豪常客號（若有，升等／早餐優先）",
      ],
    },
    {
      icon: "🚗",
      title: "自駕提醒",
      type: "checklist",
      items: [
        "出發前檢查：胎壓、機油、雨刷水、備胎",
        "油箱加滿再上國道（國道加油站價格較高）",
        "Google Maps 下載高雄離線地圖",
        "建議副駕輪流開車，每 2h 換手或停服務區",
        "ETC 餘額 < NT$500 先儲值（遠通電收 App）",
        "回程避開週日 15:00–21:00 國道塞車尖峰",
      ],
    },
  ],
};

const SIGHTS = [
  {
    name: "駁二藝術特區",
    city: "高雄",
    day: 1,
    time: "下午",
    note: "鹽埕區舊倉庫改造，展覽＋文創＋輕軌站旁，適合下午散步。",
    address: "高雄市鹽埕區大勇路 1 號",
  },
  {
    name: "愛河灣",
    city: "高雄",
    day: 1,
    time: "傍晚",
    note: "日落後點燈特別美，飯店步行可達。",
    address: "高雄市鼓山區愛河灣",
  },
  {
    name: "大港橋",
    city: "高雄",
    day: 2,
    time: "上午",
    note: "亞洲首座水平旋轉橋，每日 15:00 旋轉開合。",
    address: "高雄市鹽埕區蓬萊路 17 號",
  },
];

window.TRIP_DATA = { TRIP, DAYS, CATEGORIES, RESTAURANTS, TRANSPORT, TIPS, SIGHTS };

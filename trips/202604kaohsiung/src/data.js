// 2026/4 高雄小旅行 — data.js (SSOT)
// Edit this file to update the site. Re-run `npm test` from repo root.

const TRIP = {
  title: "2026/4 高雄小旅行",
  subtitle: "兩天一夜・高雄萬豪",
  heroTitle: "高雄萬豪小度假",
  heroDesc: "清晨從台北出發，入住高雄萬豪，隔天中午悠閒回程",
  dates: { start: "2026-04-24", end: "2026-04-25" },
  people: 2,
  country: "TW",
  origin: "台北",
  destinations: ["高雄"],
  hotel: {
    name: "高雄萬豪酒店",
    area: "鼓山・愛河灣",
    address: "高雄市鼓山區中華一路 168 號",
    note: "Check-in 15:00 起 ／ Check-out 12:00 前。週五入住人潮較多，建議抵達後先寄放行李再出門。",
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
    theme: "抵達・入住萬豪",
    summary: "一早搭高鐵南下，下午 check-in 後到愛河周邊散步。",
    level: "💰💰",
    timeline: [
      { time: "07:00", event: "台北出發（高鐵南港或台北站）" },
      { time: "~08:40", event: "抵達左營站（搭最快班次約 1h34m）" },
      { time: "09:00", event: "搭捷運紅線或台鐵到市區／飯店寄放行李" },
      { time: "15:00", event: "高雄萬豪 check-in" },
      { time: "16:00", event: "愛河散步 ／ 駁二藝術特區 ／ 鹽埕埔" },
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
    theme: "早午餐・回程",
    summary: "享用飯店早餐，悠閒逛一逛，中午退房北上。",
    level: "💰",
    timeline: [
      { time: "08:00–10:00", event: "飯店早餐" },
      { time: "10:00–11:30", event: "愛河灣散步 ／ 附近咖啡廳" },
      { time: "12:00", event: "Check-out" },
      { time: "~13:00", event: "左營站搭高鐵回台北" },
      { time: "~14:30", event: "抵達台北" },
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
      icon: "🚄",
      title: "台北 ↔ 左營（高鐵）",
      type: "table",
      items: [
        { route: "高鐵直達", path: "台北 → 左營", time: "1h34m", fare: "NT$1,490（標準車廂）",
          note: "07:00 左右最早班次；建議前一天訂票" },
        { route: "高鐵（停靠站多）", path: "台北 → 左營", time: "2h～2h15m", fare: "NT$1,490",
          note: "班距密集，離峰時段 2–3 班/時" },
      ],
      note: "左營站有捷運紅線直通高雄市區。高雄萬豪距離「鼓山區公所」輕軌站 5 分鐘。",
    },
    {
      icon: "🚇",
      title: "高雄市區交通",
      type: "options",
      items: [
        { name: "捷運紅線／橘線", time: "每 6–8 分一班", fare: "NT$20–60",
          note: "紅線南北縱貫，連左營站；橘線東西向" },
        { name: "輕軌（環狀）", time: "每 10–15 分一班", fare: "NT$30",
          note: "觀光景點沿線：駁二、愛河灣、大港橋、哈瑪星" },
      ],
      note: "建議使用一卡通，搭車 8 折，便利商店也可小額消費。",
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
        "身分證（國內線高鐵／飯店 check-in）",
        "信用卡＋少量現金（夜市、老店）",
        "一卡通或悠遊卡",
        "換洗衣物（兩天一夜，輕便）",
        "防曬乳＋墨鏡＋帽子",
        "萬豪常客號（若有，升等／早餐優先）",
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

// 2026/6 關西優雅美食之旅 — data.js (SSOT)
// Edit this file to update the site. Re-run `npm test` from repo root.

const TRIP = {
  title: "2026/6 關西優雅美食之旅",
  emoji: "🍣",
  subtitle: "六天五夜・大阪 × 神戶・四人美食精選",
  heroTitle: "🍣 關西優雅美食之旅 — 大阪 × 神戶",
  heroDesc: "六天五夜・四人・大阪帝國飯店為據點。Day 2 黑門市場早餐＋夜晚割烹／河豚、Day 3 壽司 omakase ＋ 鰻魚雙料，Day 4 神戶牛鐵板燒午餐（此行味蕾高潮），Day 5 大阪燒老舖＋和牛燒肉收官。",
  dates: { start: "2026-06-23", end: "2026-06-28" },
  people: 4,
  country: "JP",
  origin: "桃園 TPE",
  destinations: ["大阪", "神戶"],
  occasion: "六天五夜美食精選旅",
  hotel: {
    name: "大阪帝國飯店",
    area: "西心齋橋",
    address: "大阪市中央区西心齋橋 2-8-17",
    note: "check-in 時需補繳 2 人房差 ¥33,000（約 NT$7,260，可刷卡）。位於西心齋橋，步行 3 分到道頓堀、5 分到心齋橋筋商店街、10 分到黑門市場，本趟所有大阪美食點都在腳程範圍內。",
    walking: [
      { to: "道頓堀", minutes: 3 },
      { to: "心齋橋筋商店街", minutes: 5 },
      { to: "難波站（南海・地鐵）", minutes: 8 },
      { to: "黑門市場", minutes: 10 },
    ],
  },
  flights: [
    { label: "去程", code: "Peach MM24", from: "桃園 TPE", to: "關西 KIX", departure: "09:30", arrival: "13:20", date: "2026-06-23" },
    { label: "回程", code: "Peach", from: "關西 KIX", to: "桃園 TPE", departure: "15:15", arrival: "17:30", date: "2026-06-28" },
  ],
  budget: {
    fx: "¥1 ≈ NT$0.22",
    fixed: { currency: "NT$", total: 80418 },
    local: { currency: "NT$", min: 63700, max: 108800 },
    perPerson: { currency: "NT$", min: 36000, max: 47300 },
    note: "Fixed 為四人機票＋住宿合計（已付）；Local 為四人六天現地花費估算（含餐飲、交通、門票、伴手禮）。Day 4 神戶牛鐵板燒午餐為高峰花費，午間套餐 ¥8,000–18,000/人。",
  },
  extraCards: [
    {
      icon: "🎯",
      title: "本趟主題",
      body: "梅雨季優雅吃透關西。以大阪帝國飯店為據點，四個美食重點：① Day 2 黑門市場 + 割烹／河豚 ② Day 3 壽司／鰻魚／串炸三料 ③ Day 4 神戶牛鐵板燒午餐（提前 2 週訂位） ④ Day 5 大阪燒名店 + 和牛燒肉。Day 1、Day 6 留白給道頓堀小吃與早午餐告別。",
    },
    {
      icon: "🔒",
      title: "提前預約清單",
      rows: [
        { key: "神戶牛鐵板燒 6/26 午", val: "出發前 2–3 週", wrap: true },
        { key: "壽司 omakase 6/25 午", val: "出發前 2–3 週（四人桌比兩人搶手）", wrap: true },
        { key: "蘭城晶英級別割烹／河豚 6/24 晚", val: "出發前 2 週", wrap: true },
        { key: "鰻魚名店「鰻 にしはら」", val: "電話預約困難，建議到當地請飯店代撥", wrap: true },
        { key: "燒肉うしごろ 6/27 晚", val: "TableCheck / OZmall / 一休", wrap: true },
      ],
    },
  ],
};

const DAYS = [
  {
    day: 1,
    date: "2026-06-23",
    dow: "二",
    city: "大阪",
    theme: "抵達・道頓堀小吃巡禮",
    summary: "落地後不趕景點，在飯店旁邊的道頓堀開吃。章魚燒、串炸、拉麵三大庶民代表一次到位。",
    level: "💰",
    timeline: [
      { time: "13:20", event: "抵達關西機場 KIX，入境＋領行李（約 30–45 分鐘）" },
      { time: "14:15", event: "搭南海特急ラピート前往難波（38 分鐘）" },
      { time: "15:00", event: "抵達難波，步行到飯店 check-in（補繳 2 人房差 ¥33,000）" },
      { time: "16:00", event: "稍作休息，出門散步" },
      { time: "17:00", event: "道頓堀・心齋橋散步，沿路吃小吃", refs: ["wanaka", "kukuru", "akaoni"] },
      { time: "19:00", event: "🍢 串炸晚餐：元祖串かつ だるま 道頓堀店（醬汁二度漬け禁止！）", refs: ["daruma-dotonbori"] },
      { time: "21:00", event: "🍜 拉麵收尾：金久右衛門「大阪ブラック」漆黑醬油湯頭", refs: ["kingemon"] },
    ],
    meals: [
      { type: "午餐", title: "機上或抵達後隨意", note: "不用特別安排，把胃留給道頓堀。" },
      { type: "小吃", title: "章魚燒巡禮", note: "わなか（必比登）＋くくる（巨大章魚招牌）＋赤鬼（純粹派）三家比較吃", refs: ["wanaka", "kukuru", "akaoni"] },
      { type: "晚餐", title: "元祖串かつ だるま 道頓堀店", note: "1929 創業，大阪串炸始祖。獨門醬汁＋細緻麵衣＋清爽炸油。可順吃飯店附近的拉麵收尾。", star: 1, refs: ["daruma-dotonbori"] },
      { type: "宵夜", title: "金久右衛門 道頓堀店", note: "Tabelog 大阪拉麵連續三年第一。招牌大阪ブラック，外觀漆黑但口味清爽。深夜營業到翌 08:00。", refs: ["kingemon"] },
    ],
    categories: ["takoyaki", "kushikatsu", "ramen"],
    tips: "Peach 是廉航，行李限制嚴格；上機前確認手提＋託運重量。KIX → 難波建議買 ICOCA 或開通 Digital ICOCA，後續整趟通用。",
  },
  {
    day: 2,
    date: "2026-06-24",
    dow: "三",
    city: "大阪",
    theme: "黑門市場・割烹或河豚",
    summary: "早上逛「大阪的廚房」黑門市場邊走邊吃，下午散步＋午休，晚上體驗正統割烹吧台或河豚套餐。",
    level: "💰💰💰",
    timeline: [
      { time: "09:30", event: "步行到黑門市場（約 10 分鐘），邊走邊吃" },
      { time: "10:00", event: "🦐 黑門市場早午餐：鮪魚生魚片＋帝王蟹腳＋飯蛸串＋鮮榨果汁", refs: ["maguroya", "torepichi", "shinuoei", "daiwa"] },
      { time: "12:30", event: "回飯店午休 / 中之島散步 / 心齋橋商店街" },
      { time: "15:00", event: "梅田空中庭園（雨天備案：心齋橋筋拱廊）" },
      { time: "17:30", event: "🎎 晚餐：割烹或河豚二選一（已預約）", refs: ["benkei", "hakataro", "guenpin", "mitsutomi"] },
      { time: "21:00", event: "回飯店或法善寺横丁夜景散步" },
    ],
    meals: [
      { type: "早午餐", title: "黑門市場巡禮", note: "現切生魚片、炙烤和牛串、帝王蟹腳、鰻魚飯⋯每人 ¥2,000–4,000。日本廚房，必試まぐろや黒銀（鮪魚專門）、新魚栄（飯蛸串）、ダイワ果園鮮榨果汁。", refs: ["maguroya", "torepichi", "shinuoei", "daiwa", "iseya"] },
      { type: "晚餐", title: "割烹料理 ／ 河豚套餐", note: "🔒 **本趟主題晚餐**。割烹推「日本料理 弁慶」（御堂筋銀杏景）或「博多廊 法善寺」（九州食材）；河豚推「玄品 法善寺総本店」（虎河豚連鎖旗艦，¥6,000–10,000）或「美津富」（頂級野生 ¥16,500）。**提前 2 週訂位**。", star: 2, refs: ["benkei", "hakataro", "guenpin", "mitsutomi"] },
    ],
    categories: ["market", "kappo", "fugu"],
    tips: "黑門市場現切海鮮多為立食，攜帶手帕擦手。晚餐若選玄品河豚，套餐含てっちり火鍋＋てっさ＋雑炊＋甜點，可加 ¥2,000 含ひれ酒暢飲。",
  },
  {
    day: 3,
    date: "2026-06-25",
    dow: "四",
    city: "大阪",
    theme: "大阪美食深度日・壽司＋鰻魚＋串炸",
    summary: "不出遠門，用一整天好好探索大阪的美食實力。午餐壽司／鰻魚二選一，晚餐回新世界吃串炸＋壽喜燒。",
    level: "💰💰",
    timeline: [
      { time: "08:00", event: "睡到自然醒，飯店附近輕食早餐" },
      { time: "10:00", event: "阿倍野 HARUKAS 展望台 / 中之島 / 心齋橋・美國村", refs: ["阿倍野 HARUKAS 300"] },
      { time: "12:00", event: "🍣 午餐：壽司 omakase 或鰻魚飯（已預約）", refs: ["isseki", "aomi", "iwashi", "nishihara", "unagiya", "yoshitora"] },
      { time: "14:00", event: "🍳 飯後甜點：北極星西心齋橋本店（蛋包飯發祥地）", refs: ["hokkyokusei"] },
      { time: "16:00", event: "新世界・通天閣散步" },
      { time: "18:00", event: "🍢 晚餐：新世界串炸 + 壽喜燒老舖", refs: ["daruma-shinsekai", "yaekatsu", "harijyu", "kitamura"] },
      { time: "21:00", event: "回道頓堀夜景散步" },
    ],
    meals: [
      { type: "早餐", title: "咖啡廳或連鎖定食", note: "輕鬆吃，松屋／すき家／なか卯 ¥400–600；把胃留給午晚餐。" },
      { type: "午餐", title: "壽司 omakase 或鰻魚飯", note: "🔒 壽司首選「鮨 青海 北新地」午餐 ¥4,000–9,000、性價比首選「いわ志 本店」每貫 ¥100；鰻魚六月當季，關東風「鰻 にしはら」蓬鬆柔軟 vs 關西風「鰻家」備長炭地焼。", star: 2, refs: ["aomi", "iwashi", "nishihara", "unagiya"] },
      { type: "晚餐", title: "新世界串炸 + 壽喜燒", note: "新世界串炸便宜量大（八重勝、いっとく、だるま本店），或回道頓堀吃壽喜燒老舖（はり重 1919 / 北むら 1881）人均 ¥10,000+", star: 1, refs: ["daruma-shinsekai", "yaekatsu", "ittoku", "harijyu", "kitamura"] },
    ],
    categories: ["sushi", "unagi", "kushikatsu", "sukiyaki", "omurice"],
    tips: "壽司 omakase 與壽喜燒老舖都需提前訂位。蛋包飯發祥店「北極星」就在飯店步行 2–3 分，飯後可順吃當下午茶。",
  },
  {
    day: 4,
    date: "2026-06-26",
    dow: "五",
    city: "神戶",
    theme: "神戶一日・神戶牛鐵板燒",
    summary: "此行的味蕾高潮——午間的 A5 神戶牛鐵板燒。早上散步北野異人館，午餐主菜，下午走神戶港，傍晚明石燒輕食收尾。",
    level: "💰💰💰",
    timeline: [
      { time: "09:30", event: "出發，搭 JR 新快速或阪急特急前往神戶三宮" },
      { time: "10:10", event: "抵達三宮站" },
      { time: "10:15", event: "🏛️ 散步北野異人館街（餐前散步、爬坡開胃）", refs: ["北野異人館"] },
      { time: "11:30", event: "🥩 神戶牛鐵板燒午餐（已預約）⭐⭐⭐", refs: ["kawamura", "mouriya", "steakland"] },
      { time: "14:00", event: "🚶 飽餐後慢慢走到神戶港區（Harborland / Mosaic）", refs: ["神戶港區（Harborland / Meriken Park）"] },
      { time: "15:30", event: "BE KOBE 紀念碑拍照、神戶港塔觀景" },
      { time: "16:30", event: "自由逛街、咖啡廳休息" },
      { time: "17:00", event: "🥚 輕食晚餐：明石燒（蛋液豐富，附高湯沾食）", refs: ["tachibana", "tsukasa"] },
      { time: "18:00", event: "🍛 或洋食小館：神戶牛炸牛排／神戶牛蛋包飯", refs: ["ippei", "asahi", "amona"] },
      { time: "18:30", event: "搭 JR 回大阪（21 分鐘）" },
    ],
    meals: [
      { type: "午餐", title: "神戶牛鐵板燒", note: "🔒 **本趟味蕾高潮**。午間套餐約 ¥8,000–18,000/人，比晚間省 30–50%。冠軍級「カワムラ 三宮本店」、140 年老店「モーリヤ」六面燒、最平價「ステーキランド」¥3,180 起。**提前 2 週預約**。", star: 3, refs: ["kawamura", "mouriya", "steakland"] },
      { type: "晚餐", title: "明石燒 ＋ 洋食小點", note: "中午吃太飽的話傍晚輕食。明石燒推「たちばな」（三宮最知名，週四休）、洋食推「グリル一平」（炸牛排傳統多明格拉斯醬）或「アモナ」（神戶牛舒芙蕾蛋包飯）。", refs: ["tachibana", "tsukasa", "ippei", "asahi", "amona"] },
    ],
    categories: ["kobe", "akashiyaki", "yoshoku"],
    tips: "高級鐵板燒午間套餐比晚間便宜 30–50%，內容同樣精緻。請至少提前 2 週預約，四人桌會比兩人桌搶手。",
  },
  {
    day: 5,
    date: "2026-06-27",
    dow: "六",
    city: "大阪 / 近郊",
    theme: "自由日・大阪燒與燒肉",
    summary: "旅途最後一個完整日，不出遠門，在大阪好好吃。午餐大阪燒名店巡禮，晚餐和牛燒肉收官。",
    level: "💰💰",
    timeline: [
      { time: "09:00", event: "自選半日：奈良（近鐵 35 分）／阿倍野 HARUKAS／美國村・堀江／心齋橋購物", refs: ["奈良公園", "阿倍野 HARUKAS 300", "美國村／堀江"] },
      { time: "12:00", event: "🥞 午餐：大阪燒名店（きじ / 美津の / 福太郎 三選一）", refs: ["kiji", "mizuno", "fukutaro"] },
      { time: "14:00", event: "🍳 下午茶：北極星西心齋橋本店（若 Day 3 沒吃）", refs: ["hokkyokusei"] },
      { time: "15:00", event: "心齋橋／梅田自由購物" },
      { time: "18:00", event: "🥩 晚餐：和牛燒肉（已預約）", refs: ["ushigoro", "manryo", "nunogami"] },
      { time: "21:00", event: "道頓堀夜景告別散步" },
    ],
    meals: [
      { type: "午餐", title: "大阪燒（お好み焼き）", note: "梅田「きじ」蓬鬆蛋液モダン焼 vs 道頓堀「美津の」山藥麵糊 vs 千日前「福太郎」三色お好み焼。三家都是米其林必比登＋百名店 2025。", refs: ["kiji", "mizuno", "fukutaro", "yamamoto"] },
      { type: "晚餐", title: "和牛燒肉", note: "🔒 **此行最後一頓大餐**。約 ¥8,000–15,000/人。推「焼肉うしごろ 梅田店」（2025/3 新開，A5 黑毛和牛コース ¥8,800–15,800，半包廂專人代烤）、「万両 南森町店」（一頭買進、幻カルビ ¥980）、「布上 本店」（雌牛、幻盛り ¥5,980/2 人）。", star: 2, refs: ["ushigoro", "manryo", "nunogami"] },
    ],
    categories: ["okonomiyaki", "yakiniku", "omurice"],
    tips: "若想加碼半日奈良，9:00 從近鐵難波出發，35 分到近鐵奈良，下午 16:00 前回大阪剛好接燒肉晚餐。",
  },
  {
    day: 6,
    date: "2026-06-28",
    dow: "日",
    city: "回程",
    theme: "早午餐・回程",
    summary: "最後一個早上，優雅告別關西。心齋橋早午餐 + 11:00 退房 + 15:15 班機。",
    level: "💰",
    timeline: [
      { time: "08:00", event: "起床，整理行李" },
      { time: "09:00", event: "☕ 早午餐：心齋橋／難波周邊咖啡廳", refs: ["unreal", "morningbox", "mondial", "tables", "elk"] },
      { time: "10:30", event: "退房（11:00 前）" },
      { time: "11:00", event: "步行到難波站，coin locker 寄放伴手禮" },
      { time: "11:15", event: "搭南海特急ラピート前往關西機場（38 分鐘）" },
      { time: "12:00", event: "抵達關西機場，辦理報到、逛免稅店" },
      { time: "15:15", event: "Peach 班機 MM23 起飛" },
      { time: "17:30", event: "抵達桃園機場" },
    ],
    meals: [
      { type: "早午餐", title: "心齋橋／難波咖啡廳", note: "離飯店最近的「UNREAL」可俯瞰道頓堀河；「Café Morning Box」班尼迪克蛋；「MONDIAL KAFFEE 328」¥600 早餐套餐；「elk」舒芙蕾厚鬆餅 10:00 起，適合多睡一會。", refs: ["unreal", "morningbox", "mondial", "tables", "elk"] },
    ],
    categories: ["brunch"],
    tips: "Peach 廉航行李限制嚴格，伴手禮多時可考慮加購行李。退房後伴手禮可寄 coin locker（難波站 ¥600/天）省力。",
  },
];

const CATEGORIES = {
  takoyaki:   { label: "章魚燒",       icon: "🐙" },
  kushikatsu: { label: "串炸",         icon: "🍢" },
  ramen:      { label: "拉麵",         icon: "🍜" },
  market:     { label: "黑門市場",     icon: "🦐" },
  kappo:      { label: "割烹",         icon: "🎎" },
  fugu:       { label: "河豚",         icon: "🐡" },
  sushi:      { label: "壽司",         icon: "🍣" },
  unagi:      { label: "鰻魚",         icon: "🔥" },
  sukiyaki:   { label: "壽喜燒",       icon: "🍲" },
  kobe:       { label: "神戶牛鐵板燒", icon: "🥩" },
  akashiyaki: { label: "明石燒",       icon: "🥚" },
  yoshoku:    { label: "洋食",         icon: "🍛" },
  okonomiyaki:{ label: "大阪燒",       icon: "🥞" },
  yakiniku:   { label: "和牛燒肉",     icon: "🔥" },
  omurice:    { label: "蛋包飯",       icon: "🍳" },
  brunch:     { label: "早午餐",       icon: "☕" },
};

const RESTAURANTS = [
  // === 章魚燒 ===
  {
    id: "wanaka", name: "たこ焼き道楽 わなか 道頓堀店", category: "takoyaki", city: "大阪", area: "道頓堀", days: [1],
    address: "大阪市中央区道頓堀 1-6-7", tabelog: 3.49, price: "¥650–700",
    highlight: "米其林必比登推薦",
    note: "銅板高溫燒烤，外酥內軟。招牌「おいり」四味拼盤（醬汁／醬油／鹽／明太子美乃滋）。「釜炊き塩」突顯高湯底蘊。",
    hours: "約 23:00 止",
  },
  {
    id: "kukuru", name: "たこ家道頓堀くくる 本店", category: "takoyaki", city: "大阪", area: "道頓堀", days: [1],
    address: "大阪市中央区道頓堀 1-10-5 白亜ビル 1F", tabelog: 3.35, price: "¥1,000–1,999",
    note: "超過 30 年歷史，門口巨大章魚招牌為道頓堀地標。章魚塊特別大顆，麵糊極軟。",
    hours: "平日 11:00–21:00／假日 10:00–21:00",
  },
  {
    id: "kougaryu", name: "大阪アメリカ村 甲賀流 本店", category: "takoyaki", city: "大阪", area: "美國村", days: [1, 3, 5],
    address: "大阪市中央区西心斎橋 2-18-4 甲賀ビル 1F", tabelog: 3.47, price: "¥600 / 10 顆",
    highlight: "米其林必比登 2018・離飯店步行 5 分鐘",
    note: "1974 年創業。發明「網掛け美乃滋」。使用 7 種高湯（昆布、小魚乾等）加山藥製作麵糊。",
    hours: "約 10:00–21:00",
  },
  {
    id: "akaoni", name: "道頓堀 赤鬼", category: "takoyaki", city: "大阪", area: "道頓堀", days: [1],
    address: "大阪市中央区難波 1-2-3", tabelog: 3.50, price: "¥720 / 8 顆",
    highlight: "米其林必比登連續三年",
    note: "純粹主義風格：不加紅薑、蔥花、美乃滋，只用醬汁或鹽。招牌「ちゃぷちゃぷ」為章魚燒浸在溫熱高湯中享用。",
    hours: "11:00–22:00",
  },

  // === 串炸 ===
  {
    id: "daruma-dotonbori", name: "元祖串かつ だるま 道頓堀店", category: "kushikatsu", city: "大阪", area: "道頓堀", days: [1, 3],
    address: "大阪市中央区道頓堀 1-6-8", tabelog: 3.40, price: "¥1,000–3,000",
    highlight: "大阪串炸始祖・1929 創業",
    note: "三大秘訣：獨門醬汁、超細緻麵衣、清爽炸油。經典名言「ソースの二度漬け禁止！」",
    reservation: "06-6213-8101（平日 18:00 前，2 人以上）",
    hours: "平日 11:00–22:30／假日 10:30–22:30",
  },
  {
    id: "rokkakutei", name: "六覺燈（ろっかくてい）", category: "kushikatsu", city: "大阪", area: "法善寺／難波", days: [3],
    address: "法善寺附近，難波站步行 3 分", tabelog: 3.70, price: "¥5,000–10,000+",
    highlight: "米其林星級・高級串揚",
    note: "1946 年創業，創意串揚。提供季節性おまかせ套餐，搭配葡萄酒。",
    reservation: "電話或 Tabelog 預約",
  },
  {
    id: "yoneya", name: "串カツの店 ヨネヤ 難波ミナミ店", category: "kushikatsu", city: "大阪", area: "難波", days: [1, 3],
    address: "難波ウォーク地下街 1-4", price: "¥1,000–2,000",
    note: "立食風格串炸老舖。每人獨立醬碟（可二次沾醬）。牛カツ ¥160、海老 ¥240。附飲品「まるとくセット」¥980。現金限定。",
  },
  {
    id: "daruma-shinsekai", name: "串カツだるま 新世界総本店", category: "kushikatsu", city: "大阪", area: "新世界", days: [3],
    address: "大阪市浪速区恵美須東 2-3-9", price: "¥1,000–2,000",
    highlight: "串炸發源地・1929 創業",
    note: "甜而濃郁的獨門醬汁。使用獨特「頭油」讓油炸更清爽。通天閣步行 1 分。免預約。",
  },
  {
    id: "yaekatsu", name: "八重勝（Yaekatsu）", category: "kushikatsu", city: "大阪", area: "新世界・ジャンジャン横丁", days: [3],
    address: "ジャンジャン横丁，動物園前駅步行 5 分", price: "¥1,000–2,000（單串 ¥110 起）",
    highlight: "在地人最愛・週四休",
    note: "永遠在排隊。每串現點現炸，約 40–50 種。僅吧台座位，週轉快。",
  },
  {
    id: "ittoku", name: "新世界串カツ いっとく 総本店", category: "kushikatsu", city: "大阪", area: "新世界", days: [3],
    address: "新世界區域（4 間分店）", price: "10 本盛 ¥2,068／15 本盛 ¥2,948",
    note: "「黃金串カツ」輕薄酥脆的麵衣，深受女性歡迎。40 種以上可選，含大阪名物紅薑天婦羅。另有吃到飽方案。",
  },

  // === 拉麵 ===
  {
    id: "kingemon", name: "金久右衛門 道頓堀店", category: "ramen", city: "大阪", area: "道頓堀", days: [1],
    address: "大阪市中央区道頓堀 1-4-17", tabelog: 3.39, price: "¥900–1,000",
    highlight: "Tabelog 大阪拉麵連續三年第一",
    note: "醬油拉麵專門店。招牌「大阪ブラック」漆黑醬油湯頭，外觀驚人但口味意外清爽不鹹。",
    hours: "平日 11:00–翌 08:00／週末近 24 小時",
  },
  {
    id: "kamukura", name: "どうとんぼり神座 道頓堀店", category: "ramen", city: "大阪", area: "道頓堀", days: [1],
    address: "道頓堀，多家分店", tabelog: 3.40, price: "¥900–1,210",
    note: "前法國餐廳主廚創立，清澈醬油系湯頭搭配大量白菜。「おいしいラーメン」經典招牌。口味清爽。",
  },
  {
    id: "kusooyaji", name: "くそオヤジ最後のひとふり なんば店", category: "ramen", city: "大阪", area: "難波", days: [1],
    address: "難波地區", tabelog: 3.60, price: "¥900–1,200",
    note: "貝類高湯（貝だし）拉麵名店。蛤蜊與貝類熬製的深層鮮味極為獨特。",
  },

  // === 黑門市場 ===
  {
    id: "maguroya", name: "まぐろや黒銀（Maguroya Kurogin）", category: "market", city: "大阪", area: "黑門市場", days: [2],
    address: "黑門市場",
    highlight: "鮪魚專門店",
    note: "新鮮生魚片、握壽司、三色丼。黑門市場最知名的海鮮攤位之一。",
  },
  {
    id: "torepichi", name: "黒門とれぴち市場 南黒門店", category: "market", city: "大阪", area: "黑門市場", days: [2],
    address: "黑門市場",
    note: "海鮮燒烤與牛排，烤蟹腳、烤干貝。",
    hours: "8:00–18:00，全年無休",
  },
  {
    id: "shinuoei", name: "新魚栄（Shin-uoei）", category: "market", city: "大阪", area: "黑門市場", days: [2],
    address: "黑門市場",
    note: "創業 70 年以上的淡水魚專門店，必試飯蛸串（ベビーオクトパス串燒）。",
    hours: "9:00–17:00",
  },
  {
    id: "daiwa", name: "ダイワ果園", category: "market", city: "大阪", area: "黑門市場", days: [2],
    address: "黑門市場",
    note: "1948 年創業的高級水果店，鮮榨果汁與當季水果。",
  },
  {
    id: "iseya", name: "伊勢屋本店", category: "market", city: "大阪", area: "黑門市場", days: [2],
    address: "黑門市場",
    note: "明治 30 年創業的漬物（醃菜）老舖。",
    hours: "8:30–18:00，全年無休",
  },

  // === 割烹 ===
  {
    id: "benkei", name: "日本料理 弁慶（ホテル日航大阪内）", category: "kappo", city: "大阪", area: "心齋橋", days: [2],
    address: "Hotel Nikko Osaka 內・心斎橋駅 8 號出口直結", tabelog: 3.50, price: "午 ¥5,000 起／晚 ¥8,000–15,000",
    note: "可眺望御堂筋銀杏大道。設包廂。季節性懷石料理。",
    reservation: "一休.com / Tabelog / 電話",
  },
  {
    id: "hakataro", name: "博多廊 法善寺", category: "kappo", city: "大阪", area: "法善寺", days: [2],
    address: "法善寺橫丁，難波站步行 2 分", tabelog: 3.40, price: "套餐 ¥6,500 起（含暢飲 ¥8,000）",
    note: "四層樓割烹。1F 吧台、2–3F 包廂、4F 需預約私人沙龍。專攻九州食材的現代日本料理。",
    reservation: "OZmall / Tabelog / 電話",
  },
  {
    id: "hanagoyomi", name: "花暦（はなごよみ）", category: "kappo", city: "大阪", area: "難波", days: [2],
    address: "Swissôtel Nankai Osaka 內・難波站直結", tabelog: 3.50, price: "¥10,000–20,000",
    highlight: "附日本庭園景觀",
    note: "高級飯店割烹，附壽司吧台。適合特殊慶祝場合。",
    reservation: "一休.com 或飯店直接預約",
  },

  // === 河豚 ===
  {
    id: "guenpin", name: "玄品 法善寺 総本店", category: "fugu", city: "大阪", area: "難波", days: [2],
    address: "大阪市中央区難波 1-1-13", tabelog: 3.20, price: "套餐 ¥6,000–10,000",
    highlight: "大阪發跡的虎河豚連鎖・旗艦店",
    note: "冬楽コース ¥6,000（てっちり火鍋＋てっさ＋雑炊＋甜點）。加 ¥2,000 可無限暢飲（含ひれ酒）。務必提前預約。",
    reservation: "06-6213-9444 / tettiri.com",
    hours: "平日 12:00–22:30／假日 11:30–22:30",
  },
  {
    id: "mitsutomi", name: "天然ふぐ・はも 美津富", category: "fugu", city: "大阪", area: "千日前", days: [2],
    address: "大阪市中央区千日前 1-4-22", tabelog: 3.09, price: "天然河豚 ¥16,500／高級 ¥25,000",
    highlight: "頂級天然虎河豚・高級選項",
    note: "堅持最高品質野生河豚，新鮮到「還在動」。師傅的鱧魚骨切技術出神入化。夏季另有鱧魚套餐。週日休。",
    reservation: "06-6211-3038（電話預約制）",
  },

  // === 壽司 ===
  {
    id: "isseki", name: "産直鮨 一石三鳥", category: "sushi", city: "大阪", area: "大阪車站", days: [3],
    address: "JR 大阪駅直結 イノゲート大阪", price: "午餐 ¥5,800 / ¥7,800 / ¥9,800",
    note: "使用赤酢醋飯，產地直送鮮魚。「珊瑚」¥5,800（9 貫握壽司＋卷物＋2 品＋湯＋甜點）。",
    reservation: "線上或現場候位",
  },
  {
    id: "aomi", name: "鮨 青海 北新地", category: "sushi", city: "大阪", area: "北新地", days: [3],
    address: "北新地，JR 北新地駅步行 5 分", price: "午 ¥4,000–9,000／晚 ¥11,000–15,000",
    note: "優雅吧台與包廂座位。午餐試吃握壽司 ¥4,000（10 貫）、上握 ¥6,000、特上握 ¥9,000。",
    reservation: "電話或 Tabelog",
  },
  {
    id: "iwashi", name: "いわ志 本店", category: "sushi", city: "大阪", area: "福島", days: [3],
    address: "大阪市福島区，JR 福島駅步行 2 分（大樓 4 樓無電梯）", price: "¥1,500–2,500",
    highlight: "超高 CP 值・每貫僅 ¥100",
    note: "午餐 15 貫 ¥1,500、21 貫 ¥2,500（含海膽、喉黑、鮪魚卷）。附茶碗蒸、赤出汁、甜點。",
    reservation: "完全予約制・平日 2–3 週、週六 2 個月以上",
  },

  // === 鰻魚 ===
  {
    id: "nishihara", name: "鰻 にしはら", category: "unagi", city: "大阪", area: "谷町", days: [3],
    address: "大阪市中央区北新町 4-12", tabelog: 3.72, price: "午 ¥2,000–2,999／晚 ¥3,000–3,999",
    highlight: "Tabelog 百名店 2024",
    note: "關東風（蒸し焼き），口感蓬鬆柔軟到可用湯匙切開。うな丼（大）¥5,800（1.5 條鰻魚）。活鰻現殺，需等 30 分。週一休。",
    reservation: "電話預約困難",
  },
  {
    id: "unagiya", name: "鰻家（Unagiya）", category: "unagi", city: "大阪", area: "新大阪", days: [3],
    address: "大阪市淀川区西中島 4-5-22 第 3 新大阪ビル 1F", tabelog: 3.84, price: "午 ¥6,000–7,999／晚 ¥8,000–9,999",
    highlight: "Tabelog 百名店 2024・大阪第一地焼鰻",
    note: "關西風地焼き（不蒸直接炭火燒烤），備長炭。眼前活鰻現殺現烤。店內禁止拍照。週一、日、假日休。",
  },
  {
    id: "yoshitora", name: "吉寅（Yoshitora）", category: "unagi", city: "大阪", area: "本町", days: [3],
    address: "大阪市中央区（本町）", tabelog: 3.61, price: "午 ¥5,000–5,999／晚 ¥10,000–14,999",
    highlight: "Tabelog 百名店 2024",
    note: "江戶前風格，80 年以上歷史的料亭氛圍，附坪庭園。鰻魚肥厚、口感軟嫩。鰻重 ¥4,000 起。",
  },

  // === 壽喜燒 ===
  {
    id: "harijyu", name: "はり重 道頓堀本店", category: "sukiyaki", city: "大阪", area: "道頓堀", days: [3],
    address: "大阪市中央区道頓堀 1 丁目", price: "¥10,000–15,000 起",
    highlight: "1919 創業・僅用黑毛和牛雌牛",
    note: "關西風加微量關東割下。專人服務的塌塌米包廂。1948 年純和風木造建築，16 間包廂。另附設洋食グリル（¥1,500–3,000）與咖哩店（¥880）。",
    reservation: "06-6211-7777 / Tabelog / 一休",
  },
  {
    id: "kitamura", name: "すき焼 北むら", category: "sukiyaki", city: "大阪", area: "東心齋橋", days: [3],
    address: "大阪市中央区東心斎橋", price: "¥15,000–25,000",
    highlight: "1881 創業・超過 140 年",
    note: "純關西風——不用割下，先將肉與砂糖煎烤再調味。數寄屋造建築。小學以下兒童可能無法接待。",
    reservation: "06-6245-4129",
  },
  {
    id: "sekiguchi", name: "純関西風すき焼き 本 せきぐち", category: "sukiyaki", city: "大阪", area: "難波", days: [3],
    address: "難波地區", price: "柏 ¥12,000／プレミアム ¥16,000（税別）",
    note: "純關西風壽喜燒專門店，另提供涮涮鍋。柏コース為黑毛和牛，プレミアム 為最高級神戶牛。",
    reservation: "2 人需電話預約，多人可線上預約",
  },

  // === 蛋包飯 ===
  {
    id: "hokkyokusei", name: "北極星 心齋橋本店", category: "omurice", city: "大阪", area: "西心齋橋", days: [3, 5],
    address: "大阪市中央区西心斎橋 2-7-27", price: "¥1,000–2,000",
    highlight: "1922 創業・蛋包飯發祥店・米其林必比登",
    note: "大正時代中国料理店「パンヤ」發明蛋包飯的店。招牌為雞肉蛋包飯搭配特製番茄醬（熬煮多日的トマトソース）。和式老屋、塌塌米包廂氛圍極佳。離飯店步行約 2–3 分鐘。不接受電話預約，現場候位。",
    hours: "11:30–22:00（L.O.21:30）",
  },

  // === 神戶牛鐵板燒 ===
  {
    id: "kawamura", name: "ビフテキのカワムラ 三宮本店", category: "kobe", city: "神戶", area: "三宮", days: [4],
    address: "神戸市中央区，JR 三ノ宮駅步行 2 分", price: "午 ¥2,200–21,000／晚 ¥8,000–30,000",
    highlight: "冠軍級神戶牛・週一休",
    note: "使用最優秀賞チャンピオン神戶牛。神戶牛ハンバーグ ¥2,200 即可體驗。所有脂肪修整至「純淨重量」紅肉。磚牆內裝，設包廂。",
    reservation: "Hot Pepper 或電話",
    hours: "11:30–15:30 / 17:00–22:00",
  },
  {
    id: "mouriya", name: "神戸牛ステーキレストラン モーリヤ 三宮店", category: "kobe", city: "神戶", area: "三宮", days: [4],
    address: "神戸市中央区下山手通 2-1-17", price: "午 ¥5,000–15,000／晚 ¥10,000–25,000",
    highlight: "1885 創業・140 年以上",
    note: "獨創「六面燒」技法，A4-5 等級。有本店與凜（Rin）分店。",
    reservation: "官網 / TableCheck / Tabelog / Hot Pepper / 電話",
  },
  {
    id: "steakland", name: "ステーキランド神戸館", category: "kobe", city: "神戶", area: "三宮", days: [4],
    address: "神戸市中央区，JR 三ノ宮駅步行 3 分", price: "午 ¥3,180 起／晚 ¥5,000–10,000",
    highlight: "三宮最平價神戶牛鐵板燒",
    note: "廚師在眼前現煎。免預約但常大排長龍。",
    hours: "11:00–14:00 / 17:00–22:00",
  },

  // === 明石燒 ===
  {
    id: "tachibana", name: "たちばな センター街店", category: "akashiyaki", city: "神戶", area: "三宮", days: [4],
    address: "神戸市中央区三宮町 3-9-4", tabelog: 3.49, price: "¥700 / 10 顆",
    highlight: "三宮最知名明石燒・週四休",
    note: "蛋液豐富的金黃色麵糊，蓬鬆軟嫩。附高湯與三葉芹沾食。店內禁止非食物拍攝。必排隊。",
    hours: "11:00–18:30",
  },
  {
    id: "tsukasa", name: "明石焼き 司", category: "akashiyaki", city: "神戶", area: "三宮", days: [4],
    address: "神戸市中央区中山手通 1-3-10", price: "¥600–800",
    note: "夜間明石燒專門店（18:00 開始）。另有關東煮。吧台限定，氣氛親密。週日休。",
  },

  // === 洋食 ===
  {
    id: "ippei", name: "グリル一平", category: "yoshoku", city: "神戶", area: "元町", days: [4],
    address: "多家分店（元町本店等）", price: "¥1,200–2,500",
    highlight: "1952 創業・四代傳承",
    note: "招牌ビフカツ（炸牛排）搭配傳統多明格拉斯醬。使用兵庫縣コシヒカリ米。常大排長龍。",
  },
  {
    id: "asahi", name: "洋食の朝日", category: "yoshoku", city: "神戶", area: "元町", days: [4],
    address: "元町商店街西端", price: "¥1,500–2,500",
    highlight: "1961 創業",
    note: "招牌厚切ビーフカツ，切面呈美麗玫瑰色，薄脆麵衣。特製酸甜多明格拉斯醬（熬煮 3 天）。",
  },
  {
    id: "amona", name: "神戸牛洋食 アモナ", category: "yoshoku", city: "神戶", area: "三宮", days: [4],
    address: "三宮", price: "¥2,000–4,000",
    note: "招牌「神戶牛スフレオムライス ステーキのせ」——A5 神戶牛以親民洋食形式呈現。",
  },

  // === 大阪燒 ===
  {
    id: "kiji", name: "お好み焼 きじ 本店", category: "okonomiyaki", city: "大阪", area: "梅田", days: [5],
    address: "大阪市北区角田町 9-20 新梅田食道街 1F・2F", tabelog: 3.67, price: "¥1,000–1,999",
    highlight: "米其林必比登・百名店 2025・週日休",
    note: "雞骨高湯製作的蓬鬆蛋液式麵糊，招牌モダン焼き（夾入炒麵）口感如歐姆蛋。無法預約，需排隊。",
    hours: "11:30–21:30",
  },
  {
    id: "mizuno", name: "美津の（Mizuno）", category: "okonomiyaki", city: "大阪", area: "道頓堀", days: [5],
    address: "大阪市中央区道頓堀 1-4-15", tabelog: 3.55, price: "午 ¥1,000–1,999／晚 ¥2,000–2,999",
    highlight: "米其林必比登連續四年・百名店 2025・週四休",
    note: "1945 創業。招牌山芋焼麵糊 90% 為山藥。美津の焼含豬、花枝、蝦、干貝、章魚、特製肉末 6 種食材。提供素食與無麩質選項。排隊時即可點餐。",
    reservation: "06-6212-6360",
    hours: "11:00–22:00",
  },
  {
    id: "fukutaro", name: "福太郎 本店", category: "okonomiyaki", city: "大阪", area: "千日前", days: [5],
    address: "大阪市中央区千日前 2-3-17", tabelog: 3.78, price: "¥1,000–2,000",
    highlight: "米其林必比登・難波地區最高分大阪燒",
    note: "招牌トリプルお好み焼き（豬肉＋花枝＋蝦）。ねぎ焼き搭配自家醬油醬汁。麵糊加鰹魚高湯。現場登記排隊。全年無休。",
    reservation: "06-6634-2951",
    hours: "平日 17:00–24:00／假日 12:00–24:00",
  },
  {
    id: "yamamoto", name: "ねぎ焼 やまもと 梅田エスト店", category: "okonomiyaki", city: "大阪", area: "梅田", days: [5],
    address: "大阪市北区角田町 3-25 EST E27", price: "¥1,000–2,000",
    highlight: "蔥燒發源地・1965 創業",
    note: "招牌すじねぎ焼き（牛筋蔥燒）搭配自家醬油醬汁。阪急梅田駅步行 4 分。",
  },

  // === 燒肉 ===
  {
    id: "ushigoro", name: "焼肉うしごろ 梅田店", category: "yakiniku", city: "大阪", area: "梅田", days: [5],
    address: "大阪市北区大深町 5-1 うめきたグリーンプレイス 3F", tabelog: 3.64, price: "午 ¥3,000–5,000／晚 ¥10,000–14,999",
    highlight: "焼肉 WEST 百名店 2025・2025/3 新開",
    note: "專用 A5 黑毛和牛。招牌「黒タン」與衛生認證生肉料理。うしごろコース ¥8,800（14 道）／たべごろ ¥11,000／極み ¥15,800。專人代烤，半包廂。",
    reservation: "TableCheck / OZmall / 一休 / 06-6372-1129",
  },
  {
    id: "manryo", name: "万両 南森町店", category: "yakiniku", city: "大阪", area: "南森町", days: [5],
    address: "大阪市北区南森町 1-2-14 ロイヤルハイツ 1F", tabelog: 3.73, price: "¥5,000–10,000",
    highlight: "焼肉 WEST 百名店",
    note: "A5 黑毛和牛，一頭買進確保新鮮。傳說級幻カルビ ¥980、上ハラミ ¥1,180、衛生認證ユッケ ¥1,298。炭火燒烤。",
    hours: "12:00–00:00",
  },
  {
    id: "nunogami", name: "和牛焼肉 布上 本店", category: "yakiniku", city: "大阪", area: "福島", days: [5],
    address: "大阪市福島区福島 4-2-69 グレースコート堂島 1F", tabelog: 3.51, price: "¥5,980 / 2 人起",
    highlight: "A5 黑毛和牛雌牛・週二休",
    note: "雌牛脂肪融點低、味道甜。招牌幻盛り ¥5,980/2 人份。另有衛生認證生レバー。",
    reservation: "06-6444-1129 / Tabelog",
  },

  // === 早午餐 ===
  {
    id: "unreal", name: "UNREAL（アンリアル）", category: "brunch", city: "大阪", area: "西心齋橋", days: [6],
    address: "大阪市中央区西心斎橋 2-6-7 S-front Dotonbori 2F", price: "¥1,000–2,000",
    highlight: "離飯店最近・俯瞰道頓堀河",
    note: "2025/9 開幕新店。豪華貝果三明治與華麗吐司。難波駅 25 番出口步行 4 分。有英文菜單。",
    hours: "8:00–15:00（L.O.14:00）",
  },
  {
    id: "morningbox", name: "Café Morning Box", category: "brunch", city: "大阪", area: "東心齋橋", days: [6],
    address: "大阪市中央区東心斎橋 1-10-3 ホテルモーニングボックス 1F", price: "¥1,200–1,800",
    note: "班尼迪克蛋 ¥1,600（含飲品）、酪梨吐司、紅豆奶油吐司。素食與無麩質選項。復古家具、大量植物、黑膠唱片。",
    hours: "8:00–11:00",
  },
  {
    id: "mondial", name: "MONDIAL KAFFEE 328", category: "brunch", city: "大阪", area: "四ツ橋", days: [6],
    address: "四ツ橋駅出口旁", price: "¥600–1,200",
    note: "モーニングセット ¥600（法式先生／雞蛋熱壓三明治＋沙拉＋咖啡）。世界級咖啡師駐店，Slayer 義式咖啡機。戶外露台座位。",
    hours: "8:30 起",
  },
  {
    id: "tables", name: "TABLES CAFE／クロスホテル大阪 1F", category: "brunch", city: "大阪", area: "心齋橋", days: [6],
    address: "Cross Hotel Osaka 1F", price: "¥1,000–1,800",
    note: "早午餐 9:00 起供應。所有餐點含免費飲品吧＋沙拉吧。班尼迪克蛋、法式吐司、鬆餅、義大利麵、三明治。全年無休。",
  },
  {
    id: "elk", name: "elk 心斎橋本店", category: "brunch", city: "大阪", area: "美國村", days: [6],
    address: "Amerikamura 附近，心斎橋駅步行 7 分", price: "¥1,000–2,000",
    note: "招牌舒芙蕾厚鬆餅（現點現做），外酥內綿。Instagram 風的時尚內裝。適合多睡一會的旅客。",
    hours: "10:00 起",
  },
];

const TRANSPORT = {
  sections: [
    {
      icon: "✈️",
      title: "關西機場 KIX ↔ 難波（南海電鐵）",
      type: "options",
      items: [
        { name: "南海特急ラピート（Rapi:t）β", time: "37–42 分", fare: "¥1,560（関空トク割）／ Super Seat ¥1,740",
          note: "全車指定席，寬敞，每 30 分鐘一班。落地後想優雅入城首選。" },
        { name: "南海空港急行", time: "44–50 分", fare: "¥970",
          note: "比 Rapi:t 便宜近 40%，只慢 10 分鐘，預算首選。" },
      ],
      note: "回程 Day 6 從難波出發，建議至少抵達機場前 2 小時。Peach 為廉航，行李限制嚴格，伴手禮多需加購行李。",
    },
    {
      icon: "🚇",
      title: "大阪市內地鐵（御堂筋／堺筋／千日前線）",
      type: "info-rows",
      items: [
        { key: "御堂筋線 M（紅）", val: "新大阪 M13 → 梅田 M16 → 心齋橋 M19 → 難波 M20 → 天王寺 M23（此行幾乎每天使用）", wrap: true },
        { key: "堺筋線 K（棕）", val: "日本橋 K17 → 恵美須町 K18（前往黑門市場、新世界／通天閣）", wrap: true },
        { key: "千日前線 S（粉）", val: "難波 S16 → 日本橋 S17 → 鶴橋 S18（轉近鐵／JR）", wrap: true },
        { key: "票價", val: "單程 ¥190（3km 內）／¥240（7km）／¥290（13km）", wrap: true },
      ],
      note: "刷 ICOCA 最方便。Enjoy Eco Card 一日券：平日 ¥820／假日 ¥620，當日地鐵 3 趟以上回本。",
    },
    {
      icon: "🚆",
      title: "大阪 → 神戶（Day 4）",
      type: "table",
      items: [
        { route: "JR 新快速", path: "大阪駅 → 三ノ宮駅", time: "21 分", fare: "¥420", note: "最快，但擁擠" },
        { route: "阪急特急", path: "大阪梅田 → 神戸三宮", time: "27 分", fare: "¥330", note: "最佳性價比（特急免費）" },
        { route: "阪神特急", path: "大阪梅田 → 神戸三宮", time: "31 分", fare: "¥330", note: "可從難波直達（阪神なんば線）" },
      ],
      note: "推薦阪急特急或阪神特急（同價 ¥330），時間差距小。早上 09:00 後可避開通勤尖峰。",
    },
    {
      icon: "🦌",
      title: "大阪 → 奈良（Day 5 自選半日）",
      type: "table",
      items: [
        { route: "近鐵快速急行 ⭐", path: "大阪難波 → 近鐵奈良", time: "35–40 分", fare: "¥680", note: "免加價，每 10 分鐘一班，首選" },
        { route: "近鐵特急", path: "大阪難波 → 近鐵奈良", time: "30–35 分", fare: "¥1,200", note: "指定席，短程不太需要" },
      ],
      note: "若 Day 5 排奈良半日：9:00 從難波出發、12:00 看完奈良公園 + 東大寺、13:00 回程，16:00 前回大阪有充裕時間吃燒肉。",
    },
    {
      icon: "💳",
      title: "ICOCA 交通 IC 卡",
      type: "info-rows",
      items: [
        { key: "起購", val: "初次 ¥2,000（¥500 押金＋¥1,500 餘額）", wrap: true },
        { key: "餘額上限", val: "¥20,000" },
        { key: "適用範圍", val: "全日本 JR、私鐵、地鐵、巴士、便利商店等 100 萬處通用", wrap: true },
        { key: "iPhone 開通", val: "iPhone 8+／iOS 16+，MasterCard 或 Amex（Visa 不支援）；可加入 Apple Pay 的 Digital ICOCA", wrap: true },
        { key: "不適用", val: "新幹線（需另購車票）" },
      ],
      note: "若全家都用 iPhone，直接 Apple Pay 開通 Digital ICOCA 最方便，免實體卡押金。",
    },
    {
      icon: "🎫",
      title: "每日票券策略",
      type: "info-rows",
      items: [
        { key: "Day 1 抵達日", val: "南海空港急行 ¥970 或 ラピート ¥1,560 + ICOCA", wrap: true },
        { key: "Day 2 黑門市場日", val: "ICOCA 或步行（飯店到黑門市場 10 分）", wrap: true },
        { key: "Day 3 大阪美食日", val: "ICOCA 或 Enjoy Eco Card（3 趟以上：平日 ¥820／假日 ¥620）", wrap: true },
        { key: "Day 4 神戶一日", val: "ICOCA 搭阪急 / 阪神 ¥330 單程", wrap: true },
        { key: "Day 5 自由日", val: "若加碼奈良：近鐵快速急行 ¥680 單程；否則 ICOCA", wrap: true },
        { key: "Day 6 離開日", val: "南海空港急行 ¥970 或 ラピート ¥1,560", wrap: true },
      ],
      note: "大阪周遊パス 1 日券 ¥3,500（含交通＋約 40 景點免費），但本趟以美食為主、不衝景點，所以不買比較划算。",
    },
  ],
};

const TIPS = {
  sections: [
    {
      icon: "🌧️",
      title: "六月底大阪天氣（梅雨季核心）",
      type: "info-rows",
      items: [
        { key: "季節", val: "梅雨季核心期" },
        { key: "高溫", val: "28–29°C" },
        { key: "低溫", val: "20–21°C" },
        { key: "濕度", val: "70–80%+" },
        { key: "紫外線", val: "高至非常高（6–9）" },
      ],
      note: "預期頻繁降雨、陰天，但通常為間歇性而非連續豪雨。**折疊雨傘必備**。",
    },
    {
      icon: "🎒",
      title: "打包清單",
      type: "checklist",
      items: [
        "輕薄透氣衣物（棉質或排汗材質）",
        "折疊雨傘、輕便雨衣",
        "防水鞋或可淋濕的涼鞋",
        "薄外套（室內冷氣強）",
        "防曬乳 SPF30+（陰天仍需防曬）",
        "遮陽帽、太陽眼鏡",
        "隨身手帕擦汗",
        "現金 ¥30,000–50,000／人（老舖和市場多收現金）",
        "ICOCA 卡或 iPhone 已開通 Digital ICOCA",
        "護照、信用卡、ETC 不需要",
      ],
    },
    {
      icon: "🔔",
      title: "出發前提醒",
      type: "reminders",
      items: [
        { title: "提前預約餐廳（最重要）", body: "神戶牛鐵板燒（6/26 午餐）與壽司 omakase（6/25 中午）請在出發前 3–4 週預約；割烹／河豚（6/24）2 週前訂位；和牛燒肉（6/27）TableCheck 即可。四人座比兩人搶手。可請飯店代訂。" },
        { title: "飯店 check-in 補繳", body: "到達飯店時需補繳 2 人房差 ¥33,000（約 NT$7,260），可刷信用卡。" },
        { title: "交通 IC 卡", body: "在關西機場買 ICOCA，或用 iPhone Wallet 開通 Digital ICOCA。全程刷卡搭車最方便。" },
        { title: "現金準備", body: "部分老舖和市場攤位只收現金，建議每人帶 ¥30,000–50,000。機場或難波 ATM（7-11、Lawson）可提領。" },
        { title: "回程行李注意", body: "Peach 是廉航，行李限制較嚴格。伴手禮多可能需加購行李。退房後可寄放難波站 coin locker（¥600/天）。" },
        { title: "乘車 App", body: "Google Maps 或 Yahoo!乗換案内，輸入起終點即可查最佳路線。離線地圖記得先下載。" },
      ],
    },
    {
      icon: "☂️",
      title: "雨天備案（梅雨季必備）",
      type: "checklist",
      items: [
        "有頂拱廊商店街：心齋橋筋、黑門市場（兩條都離飯店步行 10 分內）",
        "阿倍野 HARUKAS 展望台（300m 高，¥2,000）",
        "大阪海遊館、難波 Parks（屋頂花園有遮）",
        "地下街：なんばウォーク、ホワイティうめだ",
        "百貨公司地下美食街（デパ地下）",
        "神戶港塔、umie 購物（Day 4 雨備）",
        "奈良國立博物館、東大寺大佛殿（室內巨大）",
      ],
    },
    {
      icon: "🥐",
      title: "早餐選項（飯店附近）",
      type: "breakfast",
      items: [
        { type: "日式連鎖定食", place: "松屋、すき家、なか卯", price: "¥400–600", note: "味噌湯＋白飯＋主菜，最方便快速" },
        { type: "咖啡廳早餐", place: "Komeda 珈琲、星乃珈琲", price: "¥600–1,000", note: "點飲料送吐司（Komeda）或厚鬆餅套餐" },
        { type: "便利商店", place: "7-11、Lawson、FamilyMart", price: "¥300–500", note: "飯糰＋咖啡最輕便" },
        { type: "麵包店", place: "心齋橋周邊獨立烘焙坊", price: "¥500–800", note: "日本麵包水準很高" },
        { type: "市場早餐", place: "黑門市場（Day 2）", price: "¥2,000–4,000", note: "早午餐合併，邊走邊吃海鮮" },
      ],
    },
  ],
};

const SIGHTS = [
  {
    name: "北野異人館",
    city: "神戶",
    day: 4,
    time: "上午（2–3 小時）",
    note: "從三宮站往北步行約 15 分鐘（上坡），或搭 City Loop 巴士至「北野異人館」站。ラインの館免費入門推薦；風見鶏＋萌黄 2 館共通券 ¥650；うろこグループ 7 館＋展望 プレミアムパス ¥3,000。神戶牛鐵板燒午餐前的散步開胃首選。",
    address: "神戸市中央区北野町",
  },
  {
    name: "神戶港區（Harborland / Meriken Park）",
    city: "神戶",
    day: 4,
    time: "下午（1–2 小時）",
    note: "從三宮搭 JR 至神戶站（2 站，3 分鐘）。BE KOBE 紀念碑免費 24 小時開放。神戶港塔觀景 ¥1,000／觀景＋天台 ¥1,200。Mosaic 購物中心面海、咖啡廳多。",
    address: "神戸市中央区波止場町",
  },
  {
    name: "奈良公園",
    city: "奈良",
    day: 5,
    time: "上午（3–5 小時）",
    note: "從近鐵奈良站東口步行 5 分。鹿仙貝攤 ¥200/束、機台 ¥500/盒。東大寺大佛殿 ¥800、興福寺國寶館 ¥700、春日大社參拜免費。Day 5 自選半日加碼。",
    address: "奈良県奈良市雑司町",
  },
  {
    name: "阿倍野 HARUKAS 300",
    city: "大阪",
    day: 3,
    time: "上午（1–2 小時）",
    note: "日本最高建築 300m／60F。觀景台成人 ¥2,000（2026/7/22 前）。6 月下旬日落約 19:00，可欣賞日景過渡夜景。16F 空中花園免費。",
    address: "大阪市阿倍野区阿倍野筋 1-1-43",
  },
  {
    name: "美國村／堀江",
    city: "大阪",
    day: 5,
    time: "下午（2–3 小時）",
    note: "從心齋橋站往西南步行 3 分。「西之原宿」風格。古著、球鞋、唱片行。南堀江有時尚家具與家居店。離飯店步行 5 分。",
    address: "大阪市中央区西心斎橋 2 丁目",
  },
];

window.TRIP_DATA = { TRIP, DAYS, CATEGORIES, RESTAURANTS, TRANSPORT, TIPS, SIGHTS };

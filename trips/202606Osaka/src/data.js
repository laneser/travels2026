// 2026/6 關西優雅美食之旅 — data.js (SSOT)
// Edit this file to update the site. Re-run `npm test` from repo root.

const TRIP = {
  title: "2026/6 關西優雅美食之旅",
  emoji: "🍣",
  subtitle: "六天五夜・大阪 × 神戶・四人美食精選",
  heroTitle: "🍣 關西優雅美食之旅 — 大阪 × 神戶",
  heroDesc: "六天五夜・四人・大阪帝國飯店為據點。Day 2 黑門市場早餐＋夜晚割烹／河豚、Day 3 壽司 omakase ＋ 鰻魚雙料，Day 4 神戶牛鐵板燒午餐（已訂プロペラ 11:00，此行味蕾高潮），Day 5 大阪燒老舖＋和牛燒肉收官。",
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
    { label: "回程", code: "Peach MM23", from: "關西 KIX", to: "桃園 TPE", departure: "15:15", arrival: "17:30", date: "2026-06-28" },
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
      body: "梅雨季優雅吃透關西。以大阪帝國飯店為據點，四個美食重點：① Day 2 黑門市場 + 割烹／河豚 ② Day 3 壽司／鰻魚／串炸三料 ③ Day 4 神戶牛鐵板燒午餐（✅ 已訂：プロペラ 11:00） ④ Day 5 大阪燒名店 + 和牛燒肉。Day 1、Day 6 走輕鬆路線：道頓堀小吃巡禮＋心齋橋早午餐告別。購物：心齋橋筋掃鬼塚虎 Onitsuka Tiger，回程日可加碼關西機場旁 outlet（見「購物」分頁）。",
    },
    {
      icon: "🔒",
      title: "提前預約清單",
      rows: [
        { key: "神戶牛鐵板燒 6/26 午", val: "✅ 已訂：神戸ステーキ プロペラ 11:00・4 人", wrap: true },
        { key: "壽司 omakase 6/25 午", val: "⚠️ 已逾建議時程（原 2–3 週前）——立即線上訂或請飯店代訂；いわ志為完全予約制", wrap: true },
        { key: "蘭城晶英級別割烹／河豚 6/24 晚", val: "⚠️ 已逾建議時程（原 2 週前）——立即訂位，玄品河豚連鎖較易有位", wrap: true },
        { key: "鰻魚名店「鰻 にしはら」", val: "電話預約困難，建議到當地請飯店代撥", wrap: true },
        { key: "燒肉うしごろ 6/27 晚", val: "TableCheck / OZmall / 一休 線上仍可訂——本週內完成", wrap: true },
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
      { time: "05:30", event: "台北起床，最後檢查行李（Peach 廉航秤重嚴格：手提＋託運都要確認）" },
      { time: "06:00", event: "🚗 搭 Uber 從台北出發前往桃園機場第一航廈（T1）（不塞車約 40 分鐘；平日清晨國道順暢，仍預留緩衝）" },
      { time: "06:45", event: "抵達桃園機場第一航廈（T1），前往 Peach 報到櫃台排隊（07:00 開櫃＝起飛前 150 分鐘；⚠️ 08:40 關櫃＝起飛前 50 分鐘）" },
      { time: "07:30", event: "完成報到託運＋安檢出境，吃早餐、逛免稅店" },
      { time: "09:00", event: "前往登機門準備登機" },
      { time: "09:30", event: "✈️ Peach MM24 起飛" },
      { time: "13:20", event: "抵達關西機場第 2 航廈（T2，Peach 專用），入境＋領行李（預留 45–60 分）後搭免費連絡巴士到 T1 側的南海関西空港站（約 10 分）" },
      { time: "14:30", event: "搭南海特急ラピート或空港急行前往難波（37–50 分；各約每 30 分一班，趕不上就搭下一班，不用急）" },
      { time: "15:30", event: "抵達難波，步行到飯店 check-in（補繳 2 人房差 ¥33,000）" },
      { time: "16:30", event: "稍作休息，出門散步" },
      { time: "17:00", event: "道頓堀・心齋橋散步，沿路吃小吃（順路逛 Onitsuka Tiger 道頓堀店比款，營業到 20:00；りくろーおじさん現烤起司蛋糕、551蓬莱豚まん 都在腳程內）", refs: ["wanaka", "kukuru", "akaoni", "Onitsuka Tiger 道頓堀店（NAMBA）", "rikuro-namba", "horai-551"] },
      { time: "19:00", event: "🍢 串炸晚餐：元祖串かつ だるま 道頓堀店（醬汁二度漬け禁止！）", refs: ["daruma-dotonbori"] },
      { time: "21:00", event: "🍜 拉麵收尾：金久右衛門「大阪ブラック」or 花丸軒巨大叉燒拉麵", refs: ["kingemon", "hanamaruken"] },
    ],
    meals: [
      { type: "午餐", title: "機上或抵達後隨意", note: "不用特別安排，把胃留給道頓堀。" },
      { type: "小吃", title: "章魚燒巡禮", note: "わなか（必比登）＋くくる（巨大章魚招牌）＋赤鬼（純粹派）＋甲賀流（飯店步行 5 分・Kiki 推薦）四家比較吃", refs: ["wanaka", "kukuru", "akaoni", "kougaryu"] },
      { type: "晚餐", title: "元祖串かつ だるま 道頓堀店", note: "1929 創業，大阪串炸始祖。獨門醬汁＋細緻麵衣＋清爽炸油。可順吃飯店附近的拉麵收尾。", star: 1, refs: ["daruma-dotonbori"] },
      { type: "宵夜", title: "拉麵收尾三選一", note: "金久右衛門（Tabelog 大阪第一・大阪ブラック）／花丸軒（Kiki 推薦巨大叉燒）／らぁ麺はやし田 道頓堀（痛風老饕推薦東京名店）", refs: ["kingemon", "hanamaruken", "hayashita-dotonbori"] },
    ],
    categories: ["takoyaki", "kushikatsu", "ramen", "sweets"],
    tips: "Peach 是廉航，行李限制嚴格；上機前確認手提＋託運重量。⚠️ Peach 在關西機場使用第 2 航廈（T2），南海電鐵車站在 T1 側，入境後要搭免費連絡巴士（約 10 分）才能搭車進市區。KIX → 難波建議買 ICOCA 或開通 Digital ICOCA，後續整趟通用。",
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
      { time: "10:00", event: "🦐 黑門市場早午餐：鮪魚生魚片＋帝王蟹腳＋飯蛸串＋鮮榨果汁（痛風老饕點名 4 攤＋原本路線 4 攤）", refs: ["maguroya", "torepichi", "shinuoei", "daiwa", "mansai-market", "uofuku-market", "ishibashi-market", "uojin-market"] },
      { time: "12:30", event: "回飯店午休 / 中之島散步 / 心齋橋商店街" },
      { time: "15:00", event: "梅田空中庭園（雨天備案：心齋橋筋拱廊）" },
      { time: "17:30", event: "🎎 晚餐：割烹或河豚二選一（⚠️ 訂位待確認——已逾原建議 2 週時程，請立即訂位或請飯店代訂）", refs: ["benkei", "hakataro", "guenpin", "mitsutomi", "hanagoyomi"] },
      { time: "21:00", event: "回飯店或法善寺横丁夜景散步" },
    ],
    meals: [
      { type: "早午餐", title: "黑門市場巡禮", note: "現切生魚片、炙烤和牛串、帝王蟹腳、鰻魚飯⋯每人 ¥2,000–4,000。痛風老饕海鮮市場攻略點名 4 攤：萬彩（炸物）／魚福（烤生蠔）／石橋食品（豆腐豆漿）／魚仁（生魚片＋海膽）；另推鮪魚攤まぐろや黒銀。⚠️ 魚福 6/24 適逢週三公休，烤生蠔當天吃不到——可改其他鮮魚攤，或把市場行程挪到 6/25（四）早上。", refs: ["maguroya", "torepichi", "shinuoei", "daiwa", "iseya", "mansai-market", "uofuku-market", "ishibashi-market", "uojin-market"] },
      { type: "晚餐", title: "割烹料理 ／ 河豚套餐", note: "🔒 **本趟主題晚餐**。割烹推「日本料理 弁慶」（御堂筋銀杏景）或「博多廊 法善寺」（九州食材）；河豚推「玄品 法善寺総本店」（虎河豚連鎖旗艦，¥6,000–10,000）或「美津富」（頂級野生 ¥16,500）。**⚠️ 訂位狀態待確認——已逾原建議 2 週時程，請立即處理（可請飯店代訂）**。", star: 2, refs: ["benkei", "hakataro", "guenpin", "mitsutomi", "hanagoyomi"] },
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
      { time: "08:00", event: "睡到自然醒，飯店附近輕食早餐（推薦丸福珈琲店 千日前本店：昭和老喫茶モーニング，平日 8:00–11:00 限定）", refs: ["marufuku-coffee"] },
      { time: "10:00", event: "阿倍野 HARUKAS 展望台 / 中之島 / 心齋橋・美國村", refs: ["阿倍野 HARUKAS 300"] },
      { time: "12:00", event: "🍣 午餐：壽司 omakase 或鰻魚飯（⚠️ 訂位待確認——已逾原建議 2–3 週時程，請立即處理）／ Kiki 推薦春駒、魚伊備選", refs: ["isseki", "aomi", "iwashi", "nishihara", "unagiya", "yoshitora", "haruko-honten", "uo-i-unagi"] },
      { time: "14:00", event: "🍳 飯後甜點：北極星西心齋橋本店（蛋包飯發祥地）", refs: ["hokkyokusei"] },
      { time: "16:00", event: "新世界・通天閣散步" },
      { time: "18:00", event: "🍢 晚餐：新世界串炸 + 壽喜燒老舖 ／ 松葉屋／天狗／六覺燈串炸 加碼（⚠️ 八重勝 6/25 週四公休，改だるま総本店／いっとく）", refs: ["daruma-shinsekai", "rokkakutei", "harijyu", "kitamura", "matsubaya-kushikatsu", "tengu-kushikatsu", "higekatsu-kushikatsu"] },
      { time: "21:00", event: "回道頓堀夜景散步" },
    ],
    meals: [
      { type: "早餐", title: "咖啡廳或連鎖定食", note: "想吃有大阪風情的：丸福珈琲店 千日前本店（1934 創業，深焙咖啡＋厚鬆餅，モーニング平日 8:00–11:00，¥800–1,500）；想省的：松屋／すき家／なか卯 ¥400–600。把胃留給午晚餐。", refs: ["marufuku-coffee"] },
      { type: "午餐", title: "壽司 omakase 或鰻魚飯", note: "🔒 壽司首選「鮨 青海 北新地」午餐 ¥4,000–9,000、性價比首選「いわ志 本店」每貫 ¥100；鰻魚六月當季，關東風「鰻 にしはら」蓬鬆柔軟 vs 關西風「鰻家」備長炭地焼。", star: 2, refs: ["aomi", "iwashi", "nishihara", "unagiya"] },
      { type: "晚餐", title: "新世界串炸 + 壽喜燒", note: "新世界串炸便宜量大（⚠️ 八重勝週四休、6/25 吃不到，改いっとく、だるま総本店），或回道頓堀吃壽喜燒老舖（はり重 1919 / 北むら 1881 / せきぐち）人均 ¥10,000+", star: 1, refs: ["daruma-shinsekai", "ittoku", "harijyu", "kitamura", "sekiguchi"] },
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
    summary: "此行的味蕾高潮——✅ 已確定預訂「神戸ステーキ プロペラ」神戶牛鐵板燒午餐（週五 11:00・4 人）。上午直達三宮、準時赴約吃主菜，下午再上北野異人館＋神戶港，傍晚明石燒輕食收尾。",
    level: "💰💰💰",
    timeline: [
      { time: "09:30", event: "出發：步行至大阪難波站（8 分），搭阪神なんば線快速急行直達神戸三宮（41–42 分、¥420、免轉乘・住難波首選）" },
      { time: "10:30", event: "抵達三宮站，往磯上通方向慢慢散步（東南側步行約 8 分），提早在餐廳附近晃晃" },
      { time: "11:00", event: "🥩 神戶牛鐵板燒午餐：神戸ステーキ プロペラ（✅ 已確定預訂・4 人；逾時座位可能釋出，務必準時）⭐⭐⭐", refs: ["propeller-kobesteak"] },
      { time: "14:00", event: "🏛️ 飽餐後散步北野異人館街（三宮站北側上坡 10–15 分；風見鶏の館 2025/7 整修重開，9:00–17:00、6/26 週五有開）", refs: ["北野異人館"] },
      { time: "15:45", event: "🚶 下山前往神戶港區（Harborland / Mosaic）", refs: ["神戶港區（Harborland / Meriken Park）"] },
      { time: "16:30", event: "BE KOBE 紀念碑拍照、神戶港塔觀景、咖啡廳休息" },
      { time: "17:30", event: "🥚 輕食晚餐：明石燒たちばな（蛋液豐富，附高湯沾食；營業至 18:30 請勿太晚）", refs: ["tachibana"] },
      { time: "18:00", event: "🍛 或洋食小館：神戶牛炸牛排／神戶牛蛋包飯／百年老店伊藤グリル／夜間明石燒「司」18:00 開店", refs: ["ippei", "asahi", "amona", "ito-grill-kobe", "tsukasa"] },
      { time: "19:00", event: "搭阪神なんば線快速急行直達回大阪難波（41 分），或 JR 經大阪站轉乘" },
    ],
    meals: [
      { type: "午餐", title: "神戸ステーキ プロペラ（Kobesteak Propeller）", note: "✅ **已確定預訂：6/26（五）11:00・4 人**。本趟味蕾高潮。心甜 Christy 推薦的三宮口袋名單，入口即化等級評價極高。午間套餐比晚間省 30–50%。請準時抵達——鐵板燒為廚師現場排程，逾時座位可能釋出。原備案（已不需預約）：カワムラ／モーリヤ／ステーキランド／和黒。", star: 3, refs: ["propeller-kobesteak", "kawamura", "mouriya", "steakland", "wako-kitano"] },
      { type: "晚餐", title: "明石燒 ＋ 洋食小點", note: "中午吃太飽的話傍晚輕食。明石燒推「たちばな」（三宮最知名，週四休）；洋食推「グリル一平」（炸牛排傳統多明格拉斯醬）、「アモナ」（神戶牛舒芙蕾蛋包飯）、或 1923 創業百年老店「伊藤グリル」（心甜推薦）。", refs: ["tachibana", "tsukasa", "ippei", "asahi", "amona", "ito-grill-kobe"] },
    ],
    categories: ["kobe", "akashiyaki", "yoshoku"],
    tips: "午餐已確定預訂神戸ステーキ プロペラ（11:00・4 人），店在磯上通（三宮站東南步行約 8 分）。交通首選阪神なんば線快速急行：大阪難波→神戸三宮 41–42 分、¥420 免轉乘（經梅田轉 JR/阪急要先搭地鐵 ¥240，門到門時間差不多）。北野異人館排在飯後 14:00（自三宮上坡 10–15 分）：風見鶏の館＋萌黄の館 2 館共通券 ¥800（2026/4 起調漲），時間有限可只看外觀。高級鐵板燒午間套餐比晚間便宜 30–50%，內容同樣精緻。",
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
      { time: "09:00", event: "自選半日（B 案・與 12:00 午餐互斥）：奈良（近鐵 35 分，13:00 從奈良回程、午餐順延到 14:00）／阿倍野 HARUKAS／美國村・堀江／心齋橋購物", refs: ["奈良公園", "阿倍野 HARUKAS 300", "美國村／堀江"] },
      { time: "12:00", event: "🥞 午餐（A 案 12:00；B 案奈良回來約 14:00）：大阪燒名店（きじ / 美津の / 福太郎 三選一；福太郎週六 12:00 開門）", refs: ["kiji", "mizuno", "fukutaro"] },
      { time: "14:00", event: "🍳 下午茶：北極星西心齋橋本店（若 Day 3 沒吃）", refs: ["hokkyokusei"] },
      { time: "15:00", event: "🛍️ 心齋橋自由購物：Onitsuka Tiger 鬼塚虎旗艦店掃鞋（MEXICO 66／帶護照退稅），順逛心齋橋筋球鞋一條街；伴手禮順路掃ドンキ道頓堀（24h 免稅）、高島屋 B1 デパ地下、りくろー＆551", refs: ["Onitsuka Tiger 大阪心斎橋（關西旗艦店）", "心齋橋筋商店街（掃鞋一條街）", "ドン・キホーテ 道頓堀店", "高島屋大阪店 B1 デパ地下", "rikuro-namba", "horai-551"] },
      { time: "16:30", event: "🖋️ ハンズ心斎橋（心斎橋PARCO 11F 文具）買 Shachihata 朱肉：一般款文具區就有；高級練朱肉「鯱旗印肉」請店員查庫存；同棟 2F 順逛 THE ONITSUKA 高端副線", refs: ["ハンズ心斎橋店（Shachihata 朱肉／鯱旗印肉）", "THE ONITSUKA（ジ・オニツカ）心斎橋PARCO"] },
      { time: "18:00", event: "🥩 晚餐：和牛燒肉（⚠️ 訂位待確認——うしごろ TableCheck 線上仍可訂，本週內完成）／痛風老饕＋肥波＋Kiki 多家加碼", refs: ["ushigoro", "manryo", "nunogami", "rikimaru-dotonbori", "mansen-yakiniku", "nan-ichien-yakiniku", "aburi-bokujou-osaka", "itto-yakiniku"] },
      { time: "21:00", event: "道頓堀夜景告別散步" },
    ],
    meals: [
      { type: "午餐", title: "大阪燒（お好み焼き）", note: "梅田「きじ」蓬鬆蛋液モダン焼 vs 道頓堀「美津の」山藥麵糊 vs 千日前「福太郎」三色お好み焼。三家都是米其林必比登＋百名店 2025。", refs: ["kiji", "mizuno", "fukutaro", "yamamoto"] },
      { type: "晚餐", title: "和牛燒肉", note: "🔒 **此行最後一頓大餐**。約 ¥8,000–15,000/人。Tabelog 百名店組：「焼肉うしごろ 梅田店」（2025/3 新開、半包廂代烤）／「万両 南森町店」（幻カルビ ¥980）／「布上 本店」（雌牛幻盛り）／「焼肉ホルモン 万千」（肥波 6/5 想二刷）。痛風老饕＋Kiki 加碼選項：「燒肉力丸 道頓堀」「南一園燒肉」「板前燒肉 一斗」「神戶あぶり牧場」。", star: 2, refs: ["ushigoro", "manryo", "nunogami", "mansen-yakiniku", "rikimaru-dotonbori", "nan-ichien-yakiniku", "itto-yakiniku", "aburi-bokujou-osaka"] },
    ],
    categories: ["okonomiyaki", "yakiniku", "omurice", "sweets"],
    tips: "若走 B 案半日奈良：9:00 從近鐵難波出發（快速急行 35 分），13:00 從奈良回程、14:00 接大阪燒午餐，購物壓縮為約 1 小時，16:00 前回到心齋橋仍接得上 18:00 燒肉晚餐。",
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
      { time: "08:30", event: "☕ 早午餐：心齋橋／難波周邊咖啡廳（衝 outlet 的話 08:30 開吃；elk 10:00 才開店、僅適合不衝 outlet 的悠閒版）", refs: ["unreal", "morningbox", "mondial", "tables", "elk"] },
      { time: "10:15", event: "退房（衝 outlet：10:15 前；不衝：11:00 前即可）" },
      { time: "10:30", event: "🛍️（加碼選項）衝鬼塚虎 outlet：搭南海空港急行至りんくうタウン站（約 35 分、¥820），11:20 起實逛約 70 分鐘，⚠️ 12:40 強制收手（週日人潮＋退稅排隊會吃時間；下雨或行李超過每人一件建議放棄、走悠閒版）", refs: ["Onitsuka Tiger アウトレット（りんくうプレミアム・アウトレット）"] },
      { time: "11:00", event: "（不衝 outlet 的話）步行到難波站，coin locker 寄放伴手禮" },
      { time: "11:15", event: "（不衝 outlet 的話）搭南海特急ラピート前往關西機場（38 分鐘；ラピート也停りんくうタウン）" },
      { time: "12:00", event: "抵達南海関西空港站（T1 側）→ 搭免費連絡巴士到第 2 航廈 T2（約 10 分）→ Peach 櫃台報到、逛免稅店（outlet 案：12:50 搭車、13:30 前務必站上櫃台）" },
      { time: "14:25", event: "⚠️ Peach 關櫃（起飛前 50 分）——一切行程以此為死線回推" },
      { time: "15:15", event: "Peach 班機 MM23 起飛" },
      { time: "17:30", event: "抵達桃園機場" },
    ],
    meals: [
      { type: "早午餐", title: "心齋橋／難波咖啡廳", note: "離飯店最近的「UNREAL」可俯瞰道頓堀河；「Café Morning Box」班尼迪克蛋；「MONDIAL KAFFEE 328」¥600 早餐套餐；「elk」舒芙蕾厚鬆餅 10:00 起，適合多睡一會。", refs: ["unreal", "morningbox", "mondial", "tables", "elk"] },
    ],
    categories: ["brunch"],
    tips: "Peach 廉航行李限制嚴格，伴手禮多時可考慮加購行李。⚠️ Peach 在 KIX 第 2 航廈（T2），南海関西空港站在 T1 側、需轉免費連絡巴士約 10 分，真正死線是 14:25 關櫃（起飛前 50 分）。若加碼りんくう outlet：10:15 前退房、10:30 從難波出發（空港急行 ¥820、約 35 分），實逛約 70 分、12:40 強制收手，搭南海 1 站（¥370、6 分）到関西空港站再轉巴士到 T2，13:30 前抵櫃台——緩衝不到 1 小時，任一段出包就骨牌倒，⚠️ 回程勿等 Sky Shuttle（中午約 1 小時僅 1 班）。outlet 路線交通合計 ¥1,190/人（比直達 ¥970 多 ¥220）。",
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
  sweets:     { label: "甜點伴手禮",   icon: "🧀" },
};

const RESTAURANTS = [
  // === 章魚燒 ===
  {
    id: "wanaka", name: "たこ焼き道楽 わなか 道頓堀店", category: "takoyaki", city: "大阪", area: "道頓堀", days: [1],
    address: "大阪市中央区道頓堀 1-6-7", tabelog: 3.49, price: "¥650–700",
    highlight: "米其林必比登推薦",
    note: "銅板高溫燒烤，外酥內軟。招牌「おいり」四味拼盤（醬汁／醬油／鹽／明太子美乃滋）。「釜炊き塩」突顯高湯底蘊。同一品牌 千日前店（Sennichimae）地址 11-19 難波千日前，痛風老饕去的是 Sennichimae 分店。",
    hours: "約 23:00 止",
    youtube: [
      { id: "hPXEoK2C68E", time: "08:31", creator: "痛風老饕" },
    ],
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
    note: "1974 年創業。發明「網掛け美乃滋」。使用 7 種高湯（昆布、小魚乾等）加山藥製作麵糊。Kiki 1 天 10 家爆吃大阪首站推薦。",
    hours: "約 10:00–21:00",
    youtube: [
      { id: "WGEUyFK68cM", time: "01:06", creator: "Kiki" },
    ],
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
    note: "永遠在排隊。每串現點現炸，約 40–50 種。僅吧台座位，週轉快。⚠️ 本行程新世界日 Day 3（6/25）適逢週四公休，僅供他日參考。",
  },
  {
    id: "ittoku", name: "新世界串カツ いっとく 総本店", category: "kushikatsu", city: "大阪", area: "新世界", days: [3],
    address: "新世界區域（4 間分店）", price: "10 本盛 ¥2,068／15 本盛 ¥2,948",
    note: "「黃金串カツ」輕薄酥脆的麵衣，深受女性歡迎。40 種以上可選，含大阪名物紅薑天婦羅。另有吃到飽方案。",
  },
  {
    id: "matsubaya-kushikatsu", name: "松葉屋", category: "kushikatsu", city: "大阪", area: "南船場", days: [3],
    address: "大阪市中央区南船場 3-8-1",
    price: "¥1,500–3,000",
    highlight: "痛風老饕大阪萬博推薦・店員傳承文化",
    note: "南船場區域的老派串炸店，週日公休。痛風老饕大阪萬博 12:25 直接到訪，特別推薦店主傳承文化。",
    hours: "11:00–18:00（週日公休）",
    youtube: [
      { id: "a6soGgc02MA", time: "12:25", creator: "痛風老饕" },
      { id: "hPXEoK2C68E", time: "24:27", creator: "痛風老饕" },
    ],
  },
  {
    id: "tengu-kushikatsu", name: "天狗串炸（天狗）", category: "kushikatsu", city: "大阪", area: "新世界", days: [3],
    address: "大阪市浪速区恵美須東 3-4-12",
    price: "¥1,000–2,000",
    highlight: "痛風老饕大阪萬博推薦・新世界在地老店",
    note: "新世界區內的串炸老店，與だるま、いっとく形成新世界串炸三巨頭。價格實在、份量大。週一公休。",
    hours: "10:30–20:00（週一公休）",
    youtube: [
      { id: "a6soGgc02MA", time: "15:16", creator: "痛風老饕" },
      { id: "hPXEoK2C68E", time: "24:54", creator: "痛風老饕" },
    ],
  },
  {
    id: "higekatsu-kushikatsu", name: "串かつ ひげ勝", category: "kushikatsu", city: "大阪", area: "梅田", days: [3],
    address: "大阪市北区曽根崎 2 丁目（梅田周邊）", tabelog: 3.63,
    price: "爽吃 20 串 ¥6,000",
    highlight: "Tabelog 百名店・肥波 5/5 想二刷",
    note: "肥波開吃啦 72 小時大阪推薦的高分串炸百名店——20 串套餐 ¥6,000 性價比高。Tabelog 3.63、肥波給「很想二刷指數 5/5」。",
    youtube: [
      { id: "9aARBMYZ9OI", time: "02:18", creator: "肥波" },
    ],
  },
  {
    id: "kadoya-shokudo", name: "中華そば カドヤ食堂 総本店", category: "ramen", city: "大阪", area: "西長堀", days: [1, 3],
    address: "大阪市西区西長堀（西長堀駅周邊）", tabelog: 3.78,
    price: "豬腳沾麵 ¥3,870",
    highlight: "Tabelog 拉麵百名店 2025・肥波推薦",
    note: "中華そば（中華麵）形式介於拉麵與沾麵。豬腳沾麵是肥波 72 小時大阪推薦的隱藏項目，Tabelog 3.78 高分。可排 Day 1 拉麵巡禮或 Day 3 大阪美食深度日。",
    youtube: [
      { id: "9aARBMYZ9OI", time: "19:09", creator: "肥波" },
    ],
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
  {
    id: "hanamaruken", name: "花丸軒 法善寺総本店", category: "ramen", city: "大阪", area: "法善寺横丁", days: [1],
    address: "大阪市中央区難波 1-2-23 法善寺横丁",
    price: "¥800–1,200",
    highlight: "Kiki 1 天 10 家爆吃大阪結尾的拉麵",
    note: "招牌「幸福豚拉麵」配上巨大叉燒蓋滿整個碗面，視覺先吃為敬。法善寺横丁老店氛圍。Kiki 影片末段壓軸推薦。",
    hours: "11:00–04:00",
    youtube: [
      { id: "WGEUyFK68cM", time: "18:03", creator: "Kiki" },
    ],
  },
  {
    id: "hayashita-dotonbori", name: "らぁ麺 はやし田 道頓堀店", category: "ramen", city: "大阪", area: "道頓堀", days: [1],
    address: "大阪市中央区道頓堀 1-10-1 道頓堀観光ビル 地下 1 階",
    price: "¥1,000–1,500",
    highlight: "東京名店進駐大阪・痛風老饕極推",
    note: "東京中野的話題拉麵店「らぁ麺はやし田」道頓堀分店。清湯醬油系，雞清湯為主、配赤味噌、奶油+醬油「黑松露香」拉麵。痛風老饕京阪 9 天 EP2 直奔。",
    hours: "11:00–23:00",
    youtube: [
      { id: "EtLqhO0sSCc", time: "09:12", creator: "痛風老饕" },
    ],
  },

  // === 黑門市場 ===
  {
    id: "maguroya", name: "まぐろや黒銀（Maguroya Kurogin）", category: "market", city: "大阪", area: "黑門市場", days: [2],
    address: "大阪市中央区日本橋 2-11-1（黑門市場内）",
    highlight: "鮪魚專門店・痛風老饕點名「黑銀」",
    note: "新鮮生魚片、握壽司、三色丼。黑門市場最知名的海鮮攤位之一。痛風老饕大阪海鮮市場全攻略 19:54 直奔此攤。",
    hours: "9:00–16:00",
    youtube: [
      { id: "yVcCiLsvefc", time: "19:54", creator: "痛風老饕" },
    ],
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
  {
    id: "mansai-market", name: "萬彩", category: "market", city: "大阪", area: "黑門市場", days: [2],
    address: "大阪市中央区日本橋 1-17-4（黑門市場内）",
    highlight: "痛風老饕黑門必逛 1：天婦羅炸物",
    note: "黑門市場入口附近的炸物攤位，現炸天婦羅、可樂餅、炸蝦串、炸花枝。痛風老饕海鮮市場攻略 16:18 開場介紹。",
    hours: "10:00–17:30",
    youtube: [
      { id: "yVcCiLsvefc", time: "16:18", creator: "痛風老饕" },
    ],
  },
  {
    id: "uofuku-market", name: "魚福", category: "market", city: "大阪", area: "黑門市場", days: [2],
    address: "大阪市中央区日本橋 2-3-7（黑門市場内）",
    highlight: "痛風老饕黑門必逛 2：烤生蠔",
    note: "黑門市場以巨無霸烤生蠔聞名，現點現烤、淋檸檬汁。痛風老饕推。⚠️ 週三公休——本行程黑門市場日 6/24 正逢週三吃不到；烤生蠔可改其他鮮魚攤，或把市場行程挪到 6/25（四）早上。",
    hours: "10:00–16:00（週三公休）",
    youtube: [
      { id: "yVcCiLsvefc", time: "18:13", creator: "痛風老饕" },
    ],
  },
  {
    id: "ishibashi-market", name: "石橋食品", category: "market", city: "大阪", area: "黑門市場", days: [2],
    address: "大阪市中央区日本橋 2-2-20（黑門市場内）",
    highlight: "痛風老饕黑門必逛 3：豆製品老店",
    note: "創業多年的豆腐、豆漿、油揚老舖。現做嫩豆腐與豆漿可現場喝。週日公休。",
    hours: "9:00–17:00（週日公休）",
    youtube: [
      { id: "yVcCiLsvefc", time: "21:41", creator: "痛風老饕" },
    ],
  },
  {
    id: "uojin-market", name: "魚仁", category: "market", city: "大阪", area: "黑門市場", days: [2],
    address: "大阪市中央区日本橋 2-2-19（黑門市場内）",
    highlight: "痛風老饕黑門必逛 4：生魚片＋海膽",
    note: "黑門市場的另一間鮮魚攤，現切生魚片＋海膽軍艦。份量大、價格實在。痛風老饕收尾推薦。",
    hours: "9:00–18:00",
    youtube: [
      { id: "yVcCiLsvefc", time: "23:19", creator: "痛風老饕" },
    ],
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
  {
    id: "haruko-honten", name: "春駒 本店", category: "sushi", city: "大阪", area: "鶴橋", days: [3],
    address: "大阪市天王寺区下味原町 6-12",
    price: "¥1,500–2,500",
    highlight: "Kiki 大阪 10 家爆吃推薦・鶴橋庶民壽司王道",
    note: "鶴橋人氣壽司老店，鮪魚大腹、海膽、北寄貝等握壽司價格平實，常排 1–2 小時。Kiki 1 天 10 家爆吃大阪第 7 站，CP 值代表。週二公休。",
    hours: "11:00–22:30（週二公休）",
    youtube: [
      { id: "WGEUyFK68cM", time: "11:54", creator: "Kiki" },
    ],
  },
  {
    id: "daiki-suisan-dotonbori", name: "大起水産迴轉壽司 道頓堀店", category: "sushi", city: "大阪", area: "道頓堀", days: [3],
    address: "大阪市中央区道頓堀 1-7-24 道頓堀ビル 1F 四海樓",
    price: "¥1,500–3,000",
    highlight: "痛風老饕 2025 大阪萬博收尾的迴轉壽司",
    note: "大阪有名的水產直營迴轉壽司連鎖，道頓堀店面河景觀位置佳。痛風老饕大阪萬博吃什麼 18:37 直送現場推薦——回到迴轉壽司發源地大阪。",
    hours: "11:00–23:00",
    youtube: [
      { id: "a6soGgc02MA", time: "18:37", creator: "痛風老饕" },
    ],
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
  {
    id: "uo-i-unagi", name: "魚伊 鰻魚飯本店", category: "unagi", city: "大阪", area: "天王寺", days: [3],
    address: "大阪市阿倍野区阪南町 1-50-22",
    price: "¥2,500–4,500",
    highlight: "Kiki 大阪 10 家爆吃推薦・大阪老字號鰻屋",
    note: "創業百年的鰻魚飯老店，關西風地焼き炭火烤。Kiki 1 天 10 家爆吃大阪第 6 站「神級鰻魚飯」。",
    hours: "11:00–14:00 / 16:00–20:00（週三公休）",
    youtube: [
      { id: "WGEUyFK68cM", time: "10:00", creator: "Kiki" },
    ],
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
  {
    id: "wako-kitano", name: "和黒 北野坂本店", category: "kobe", city: "神戶", area: "北野坂", days: [4],
    address: "神戸市中央区中山手通 1-22-13 ヒルサイドテラス 1F",
    price: "午 ¥6,000–12,000／晚 ¥15,000–25,000",
    highlight: "Kiki & May 推薦・北野異人館街內鐵板燒",
    note: "北野坂上鐵板燒名店，午餐套餐相對親民。可從異人館散步路上順道訪。Kiki & May 神戶 2 日 1 夜 影片中的 A5 神戶牛鐵板燒主場。",
    hours: "12:00–15:00 / 17:00–21:00",
    reservation: "電話 / Tabelog",
    youtube: [
      { id: "0b4vXOGa8zs", creator: "Kiki & May" },
    ],
  },
  {
    id: "propeller-kobesteak", name: "神戸ステーキ プロペラ（Kobesteak Propeller）", category: "kobe", city: "神戶", area: "三宮", days: [4],
    address: "神戸市中央区磯上通 8-1-14",
    price: "午 ¥8,000–15,000／晚 ¥12,000–25,000",
    highlight: "✅ 已確定預訂 6/26（五）11:00・4 人",
    note: "三宮磯上通的神戶牛鐵板燒，入口即化等級評價極高。心甜 Christy 神戶 72 小時必吃 6 間之一。✅ 已確定預訂：6/26（五）上午 11:00、4 人。三宮站東南步行約 8 分，請準時抵達。",
    hours: "午 11:00–15:30（L.O.14:30）／晚 17:00–22:30（官方標示無休）",
    reservation: "✅ 已完成（4 人・6/26 11:00）｜店家電話 078-862-3972（遲到、人數變動時聯絡）",
    youtube: [
      { id: "XunWPojzPWI", creator: "心甜" },
    ],
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
  {
    id: "ito-grill-kobe", name: "伊藤グリル（Itō Grill）", category: "yoshoku", city: "神戶", area: "元町", days: [4],
    address: "兵庫県神戸市中央区元町通 1-6-6",
    price: "¥3,000–8,000",
    highlight: "心甜推薦・百年洋食餐廳",
    note: "1923 創業、神戶老字號洋食店。經典招牌牛排、燉牛肉、奶油可樂餅。氛圍復古優雅。心甜 Christy 神戶 72 小時必吃 6 間之一。",
    hours: "11:30–14:30 / 17:00–21:00（週一、二公休）",
    youtube: [
      { id: "XunWPojzPWI", creator: "心甜" },
    ],
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
    highlight: "米其林必比登連續四年・百名店 2025・無休（2026/2 起取消週四休）",
    note: "1945 創業。⚠️ 6 月有不定期維護休業（日期未公布），出發前致電 06-6212-6360 確認。招牌山芋焼麵糊 90% 為山藥。美津の焼含豬、花枝、蝦、干貝、章魚、特製肉末 6 種食材。提供素食與無麩質選項。排隊時即可點餐。Kiki 1 天 10 家爆吃大阪同樣推薦。",
    reservation: "06-6212-6360",
    hours: "11:00–22:00",
    youtube: [
      { id: "WGEUyFK68cM", time: "04:18", creator: "Kiki" },
    ],
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
  {
    id: "rikimaru-dotonbori", name: "焼肉力丸 難波道頓堀店", category: "yakiniku", city: "大阪", area: "道頓堀", days: [5],
    address: "大阪市中央区道頓堀 1-9-1 ベルスードビル 5F",
    price: "¥3,000–6,000",
    highlight: "痛風老饕京阪 9 天 EP2 開場推薦・道頓堀夜景燒肉",
    note: "和牛吃到飽連鎖「燒肉力丸」道頓堀分店——CP 值高、種類多。痛風老饕京阪 9 天 EP2 開場第一集就吃這間。週一 16:00 才營業。",
    hours: "11:30–01:00（週一 16:00 營業）",
    youtube: [
      { id: "EtLqhO0sSCc", time: "00:51", creator: "痛風老饕" },
    ],
  },
  {
    id: "mansen-yakiniku", name: "焼肉 ホルモン 万千", category: "yakiniku", city: "大阪", area: "梅田", days: [5],
    address: "大阪市北区曽根崎周邊（梅田區域）", tabelog: 3.71,
    price: "¥4,000–8,000",
    highlight: "Tabelog 日式燒肉百名店 2025・肥波 6/5 想二刷",
    note: "肥波 72 小時大阪「最想二刷」的燒肉店——蔥鹽牛舌 ¥1,760、鹽味牛五花 ¥1,760、鹽味牛肋肉 ¥1,870、醬燒橫隔膜 ¥1,870。Tabelog 3.71、肥波給滿分以上 6/5 評價。",
    youtube: [
      { id: "9aARBMYZ9OI", time: "23:19", creator: "肥波" },
    ],
  },
  {
    id: "nan-ichien-yakiniku", name: "南一園燒肉", category: "yakiniku", city: "大阪", area: "難波", days: [5],
    address: "大阪市中央区難波 3-3-2",
    price: "¥3,000–6,000",
    highlight: "痛風老饕大阪萬博開場推薦・難波在地燒肉",
    note: "難波區域在地燒肉店，週末 12:00 開、平日 15:00 開、週一休。痛風老饕大阪萬博 1:00 開場直奔。",
    hours: "平日 15:00–21:30／週末 12:00–21:30（週一公休）",
    youtube: [
      { id: "a6soGgc02MA", time: "01:00", creator: "痛風老饕" },
      { id: "hPXEoK2C68E", time: "22:53", creator: "痛風老饕" },
    ],
  },
  {
    id: "aburi-bokujou-osaka", name: "燒肉 神戶あぶり牧場 道頓堀店", category: "yakiniku", city: "大阪", area: "道頓堀", days: [5],
    address: "大阪市中央区道頓堀 1 丁目（道頓堀區域）",
    price: "¥3,000–6,000",
    highlight: "Kiki 推薦・¥1,000 神戶牛 CP 值代表",
    note: "「神戶炙燒牧場」——以平實價格供應神戶牛、A5 和牛單片定食的人氣店。Kiki 大阪 10 家爆吃第 8 站「千元神戶牛」。",
    youtube: [
      { id: "WGEUyFK68cM", time: "14:25", creator: "Kiki" },
    ],
  },
  {
    id: "itto-yakiniku", name: "板前燒肉 一斗", category: "yakiniku", city: "大阪", area: "東心齋橋", days: [5],
    address: "大阪市中央区東心斎橋 1-16-26 一斗ビル",
    price: "¥5,000–10,000",
    highlight: "痛風老饕京阪 EP1 推薦・吧台割烹式燒肉",
    note: "東心齋橋區域，吧台割烹式燒肉。師傅在面前切肉、烤肉，省去自己烤的繁瑣。週三公休。",
    hours: "17:00–00:00（週三公休）",
    youtube: [
      { id: "hPXEoK2C68E", time: "02:41", creator: "痛風老饕" },
    ],
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
    note: "招牌舒芙蕾厚鬆餅（現點現做），外酥內綿。Instagram 風的時尚內裝。適合多睡一會的旅客。⚠️ 10:00 才開店，Day 6 衝 outlet 的話來不及，僅適合悠閒版。",
    hours: "10:00 起",
  },
  {
    id: "marufuku-coffee", name: "丸福珈琲店 千日前本店", category: "brunch", city: "大阪", area: "千日前", days: [3],
    address: "大阪市中央区千日前 1-9-1", price: "¥800–1,500",
    highlight: "1934 創業昭和老喫茶・モーニング平日限定",
    note: "大阪喫茶文化代表，深焙濃苦咖啡＋厚鬆餅（ホットケーキ）聞名。モーニングセット限平日 8:00–11:00——6/24（三）、6/25（四）、6/26（五）三個平日早晨都用得上。飯店步行約 8 分，梅雨季室內雨備佳。",
    hours: "8:00–23:00（無休；年末年始可能變動）",
  },

  // === 甜點伴手禮 ===
  {
    id: "rikuro-namba", name: "りくろーおじさんの店 なんば本店", category: "sweets", city: "大阪", area: "難波", days: [1, 5],
    address: "大阪市中央区難波 3-2-28", price: "現烤起司蛋糕 ¥1,095/整顆（2026/6 起調價）",
    highlight: "大阪名物現烤起司蛋糕・出爐搖鈴名場面",
    note: "戎橋筋商店街內、飯店步行圈。輕盈舒芙蕾口感、底層葡萄乾，剛出爐會搖鈴，四人分食一顆剛好。1F 店舖外帶，2F 喫茶（11:00–17:30）可內用現烤+飲料。",
    hours: "9:00–20:00（2F 喫茶 11:00–17:30）",
  },
  {
    id: "horai-551", name: "551蓬莱 戎橋本店", category: "sweets", city: "大阪", area: "難波", days: [1, 5],
    address: "大阪市中央区難波 3-6-3", price: "豚まん ¥230/個",
    highlight: "大阪伴手禮之王・現蒸豚まん",
    note: "現蒸豚まん熱買熱吃，燒賣、甜點也齊。每月第 1・3 週二休——6/23 為第 4 個週二，本行程期間每天營業。回程日不用扛：KIX 機場內也有分店可現買（注意保冷與航班規定）。",
    hours: "外帶 10:00–21:30／2F 餐廳 11:00–21:30",
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
          note: "全車指定席，寬敞，每 30 分鐘一班。落地後想優雅入城首選。最便宜買法：南海官網『ラピートデジタルきっぷ』一般席 ¥1,410（手機出示 QR）；Klook/KKday 售 ¥1,560 已與站內同價。⚠️ 2026/4 起車內補票加收 ¥300，務必上車前購票。" },
        { name: "南海空港急行", time: "44–50 分", fare: "¥970",
          note: "比 Rapi:t 便宜近 40%，只慢 10 分鐘，預算首選。" },
      ],
      note: "⚠️ Peach 使用 KIX 第 2 航廈（T2），南海関西空港站在 T1 側，T2↔車站需搭免費連絡巴士約 10 分，去回程都要把這段算進去。回程 Day 6 真正死線是 14:25 關櫃（起飛前 50 分）。Peach 為廉航，行李限制嚴格，伴手禮多需加購行李。",
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
        { route: "阪神なんば線快速急行 ⭐", path: "大阪難波 → 神戸三宮", time: "41–42 分", fare: "¥420", note: "免轉乘・住難波首選（白天每小時 3 班）" },
        { route: "JR 新快速", path: "大阪駅 → 三ノ宮駅", time: "21 分", fare: "¥420", note: "車程最快但擁擠，且需先地鐵到梅田（+¥240）" },
        { route: "阪急特急", path: "大阪梅田 → 神戸三宮", time: "27 分", fare: "¥330", note: "梅田出發（需先地鐵 +¥240）" },
        { route: "阪神特急", path: "大阪梅田 → 神戸三宮", time: "31 分", fare: "¥330", note: "梅田出發（需先地鐵 +¥240）" },
      ],
      note: "住西心齋橋／難波，首選阪神なんば線快速急行直達（¥420、41–42 分）；經梅田各線票面便宜但加上地鐵 ¥240 與轉乘，門到門時間差不多、還更貴。早上 09:00 後可避開通勤尖峰。",
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
        { key: "iPhone 開通", val: "iPhone 8+／iOS 16+；Visa／Mastercard／JCB／Amex 均可加值（台灣卡偶有 Visa 被風控擋，備 Mastercard/JCB 較穩，先開啟國外線上交易）", wrap: true },
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
        { key: "Day 4 神戶一日", val: "ICOCA 搭阪神なんば線快速急行 難波直達 ¥420（經梅田阪急/阪神 ¥330＋地鐵 ¥240 反而較貴）", wrap: true },
        { key: "Day 5 自由日", val: "若加碼奈良：近鐵快速急行 ¥680 單程；否則 ICOCA", wrap: true },
        { key: "Day 6 離開日", val: "南海空港急行 ¥970 或 ラピート ¥1,560（官網デジタルきっぷ ¥1,410）；衝 outlet：難波→りんくう ¥820＋りんくう→機場 ¥370", wrap: true },
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
        { title: "提前預約餐廳（最重要）", body: "✅ 神戶牛鐵板燒已確定預訂：神戸ステーキ プロペラ 6/26（五）11:00・4 人。⚠️ 其餘三餐已逾原建議訂位時程（距出發約 10 天）：壽司 omakase（6/25 中午，原建議 3–4 週前）、割烹／河豚（6/24，原建議 2 週前）請立即訂位或請飯店代訂；和牛燒肉（6/27）TableCheck 線上仍可訂、本週內完成。四人座比兩人搶手。" },
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
    note: "從三宮站往北步行約 15 分鐘（上坡），或搭 City Loop 巴士至「北野異人館」站。ラインの館免費入門推薦；地標「風見鶏の館」2025/7 結束耐震工程重新開放，9:00–17:00（最後入館 16:45、每月第 3 週二休；6/26 週五有開）；風見鶏＋萌黄 2 館共通券 ¥800（2026/4 起調漲）；うろこグループ 7 館＋展望 プレミアムパス ¥3,000。外觀拍照免費，時間有限可只看外觀。本行程排在神戶牛午餐後的下午時段。",
    address: "神戸市中央区北野町",
    youtube: [
      { id: "AjsYVZxHzXc", time: "3:29", creator: "瑄瑄＆G先生" },
      { id: "PloMJELlG7Q", creator: "theHuer 呼兒" },
    ],
  },
  {
    name: "神戶港區（Harborland / Meriken Park）",
    city: "神戶",
    day: 4,
    time: "下午（1–2 小時）",
    note: "從三宮搭 JR 至神戶站（2 站，3 分鐘）。BE KOBE 紀念碑免費 24 小時開放。神戶港塔觀景 ¥1,000／觀景＋天台 ¥1,200。Mosaic 購物中心面海、咖啡廳多。",
    address: "神戸市中央区波止場町",
    youtube: [
      { id: "AjsYVZxHzXc", time: "3:13", creator: "瑄瑄＆G先生" },
      { id: "PloMJELlG7Q", creator: "theHuer 呼兒" },
    ],
  },
  {
    name: "奈良公園",
    city: "奈良",
    day: 5,
    time: "上午（3–5 小時）",
    note: "從近鐵奈良站東口步行 5 分。鹿仙貝攤 ¥200/束、機台 ¥500/盒。東大寺大佛殿 ¥800、興福寺國寶館 ¥700、春日大社參拜免費。Day 5 自選半日加碼。",
    address: "奈良県奈良市雑司町",
    youtube: [
      { id: "_ltmYqArdC0", time: "5:33", creator: "小黑的旅行誌" },
    ],
  },
  {
    name: "阿倍野 HARUKAS 300",
    city: "大阪",
    day: 3,
    time: "上午（1–2 小時）",
    note: "日本最高建築 300m／60F。觀景台成人 ¥2,000（2026/7/22 前）。6 月下旬日落約 19:00，可欣賞日景過渡夜景。16F 空中花園免費。",
    address: "大阪市阿倍野区阿倍野筋 1-1-43",
    youtube: [
      { id: "HhRtRgFacm0", creator: "黑板 HeiBan" },
    ],
  },
  {
    name: "美國村／堀江",
    city: "大阪",
    day: 5,
    time: "下午（2–3 小時）",
    note: "從心齋橋站往西南步行 3 分。「西之原宿」風格。古著、球鞋、唱片行。南堀江有時尚家具與家居店。離飯店步行 5 分。",
    address: "大阪市中央区西心斎橋 2 丁目",
    youtube: [
      { id: "L7DTZYUnbEA", creator: "便便日常" },
    ],
  },
];

// ── 購物（以 Onitsuka Tiger 鬼塚虎為主的心齋橋／道頓堀掃鞋路線＋機場旁 outlet）──
// 飯店（西心齋橋）步行可達心齋橋筋商店街與道頓堀，正好是大阪最強的掃鞋一條街。
const SHOPPING = {
  intro:
    "Onitsuka Tiger（鬼塚虎）掃鞋攻略：飯店（西心齋橋）步行可達的心齋橋筋商店街與道頓堀，正好是大阪最強的掃鞋一條街——市區三家鬼塚虎門市加 Nike／adidas 都在腳程內；回程日還可加碼關西機場對岸的 Rinku Premium Outlets 鬼塚虎 outlet（過季款更便宜）。退稅攻略：帶護照享外國旅客免稅 10%，部分百貨可再疊 5% 優惠券＋信用卡優惠；日幣便宜時比台灣官網划算明顯。經典款 MEXICO 66、SERRANO、GSM 為入手首選。人氣門市常於 11:00 開店前就排隊，建議開店即到或挑平日上午。文具加碼：Shachihata 朱肉（印泥）在心斎橋PARCO 的ハンズ心斎橋 11F 文具賣場可順路入手（詳見下方）。免稅制度提醒：2026/11/1 起日本改為機場退款制，本趟（6 月底）仍適用現行店頭直接免稅——出示護照、一般物品同店滿 ¥5,000 即扣 10%；藥妝食品等消耗品（¥5,000–500,000）會密封包裝、在日本境內不可拆封。",
  spots: [
    {
      name: "Onitsuka Tiger 大阪心斎橋（關西旗艦店）",
      city: "大阪",
      area: "心齋橋筋",
      address: "大阪市中央区心斎橋筋1-4-22 心斎橋アセットビル",
      hours: "11:00–20:00（不定休；官方店舖頁標示）",
      price: "MEXICO 66 約 ¥12,100 起（退稅後更低）",
      day: 5,
      note:
        "西日本第一家、關西最大級旗艦店（オニツカタイガー大阪心斎橋）。鞋款＋服飾＋小物最齊全，限定與聯名款也最多。從飯店沿心齋橋筋步行約 5–7 分。口碑：常大排長龍、店員親切可試穿諮詢；建議開店前到或平日上午。可退稅。",
      youtube: [
        { id: "_ZxmyFaXmq0", creator: "24 Minds of Alvise" },
      ],
      links: [
        { label: "凱子凱購買攻略", url: "https://ksk.tw/onitsuka-tiger/" },
        { label: "官方門市介紹", url: "https://www.onitsukatiger.com/jp/magazine/shoplocation/osaka-shinsaibashi/?lang=en" },
        { label: "Threads 大阪買鞋地圖", url: "https://www.threads.com/@panhanluo/post/DVx76EyD2L5" },
      ],
    },
    {
      name: "Onitsuka Tiger 道頓堀店（NAMBA）",
      city: "大阪",
      area: "道頓堀",
      address: "大阪市中央区道頓堀1-8-14",
      hours: "11:00–20:00",
      day: 1,
      note:
        "官方店名「オニツカタイガー難波（Onitsuka NAMBA）」。凱子凱評為「貨況最齊」的一家，就在道頓堀，距飯店步行約 3–5 分。Day 1 晚上道頓堀小吃散步順路（⚠️ 營業到 20:00，串炸晚餐前先逛），可先比款；Day 5 再回旗艦店成交。可退稅。",
      links: [
        { label: "凱子凱購買攻略", url: "https://ksk.tw/onitsuka-tiger/" },
      ],
    },
    {
      name: "THE ONITSUKA（ジ・オニツカ）心斎橋PARCO",
      city: "大阪",
      area: "心齋橋筋",
      address: "大阪市中央区心斎橋筋1-8-3 心斎橋PARCO 2F",
      hours: "依心斎橋PARCO 營業時間（約 10:00–20:00）",
      day: 5,
      note:
        "鬼塚虎高端副線 THE ONITSUKA（ジ・オニツカ），主打日本製高價位、童裝與高爾夫系列。想找精品款或質感升級可加碼。位於心斎橋PARCO，與旗艦店同一條街。",
      links: [
        { label: "心斎橋PARCO 官網", url: "https://shinsaibashi.parco.jp/" },
      ],
    },
    {
      name: "ハンズ心斎橋店（Shachihata 朱肉／鯱旗印肉）",
      city: "大阪",
      area: "心齋橋筋",
      address: "大阪市中央区心斎橋筋1-8-3 心斎橋PARCO 9〜11F（文具賣場在 11F）",
      hours: "10:00–20:00（依心斎橋PARCO）",
      price: "シヤチハタ朱肉 ¥350–1,000；鯱旗印肉（練朱肉）¥2,200–3,100",
      day: 5,
      note:
        "買 Shachihata 朱肉（俗稱印泥）的據點。注意：Shachihata（シヤチハタ）產品線沒有叫「印泥」的品項——一般海綿朱肉（シヤチハタ朱肉エコス ¥600 起、プチ朱肉 ¥350、速乾款 ¥800 起）任何文具店、Loft、ハンズ都有，不必特地跑高檔文具店；若要的是傳統印泥質感的高級「練朱肉」，對應產品是「鯱旗印肉」系列（書画落款用 ¥3,100／公用 ¥2,200），小文具店通常沒現貨，建議到大型文具賣場（ハンズ心斎橋 11F 文具）請店員查庫存，或退而求其次找印章專門店、書道用品店。就在心斎橋PARCO（與 THE ONITSUKA 高端副線同棟），Day 5 掃鞋順路。同店滿 ¥5,000 可退稅。",
      links: [
        { label: "ハンズ心斎橋店", url: "https://store.hands.net/shinsaibashi/" },
        { label: "Shachihata 朱肉・印肉目錄", url: "https://item.shachihata.co.jp/catalog/g020" },
      ],
    },
    {
      name: "心齋橋筋商店街（掃鞋一條街）",
      city: "大阪",
      area: "心齋橋",
      address: "大阪市中央区心斎橋筋",
      hours: "各店約 11:00–21:00（拱廊全天可穿越）",
      day: 5,
      note:
        "長約 600m 的有頂拱廊，鬼塚虎旗艦店、Nike 大阪心齋橋（三層旗艦・日本限定配色，1-4-19）、adidas、New Balance、Salomon 等球鞋店一字排開，下雨也好逛（梅雨季友善）。多數門市支援退稅。距飯店步行 5 分。",
      youtube: [
        { id: "_ZxmyFaXmq0", creator: "24 Minds of Alvise" },
      ],
      links: [
        { label: "商店街官網（繁中）", url: "https://global.shinsaibashi.or.jp/zh-TW/" },
        { label: "NAVITIME 景點（繁中）", url: "https://japantravel.navitime.com/zh-tw/area/jp/spot/02022-1113365/" },
      ],
    },
    {
      name: "ドン・キホーテ 道頓堀店",
      city: "大阪",
      area: "道頓堀",
      address: "大阪市中央区宗右衛門町7-13",
      hours: "24 小時營業",
      day: 5,
      note:
        "藥妝、零食、雜貨一站購足的驚安殿堂，1F 設免稅櫃台（深夜也可辦理）。頂樓黃色橢圓摩天輪「えびすタワー」是道頓堀地標。適合 Day 1 或 Day 5 晚餐後散步順逛——伴手禮零食藥妝在此一次掃齊最省力，免稅同店滿 ¥5,000（消耗品會密封）。",
      links: [
        { label: "官方店舖頁", url: "https://www.donki.com/store/shop_detail.php?shop_id=110" },
      ],
    },
    {
      name: "高島屋大阪店 B1 デパ地下",
      city: "大阪",
      area: "難波",
      address: "大阪市中央区難波5-1-5",
      hours: "10:00–20:00",
      day: 5,
      note:
        "難波站直結、距飯店步行約 8 分。B1 食料品賣場 2025 年春全面改裝，有「赤福 五十鈴茶屋」（關西獨家常設赤福コルネ）、大阪限定洋菓子等，設免稅櫃台。要買體面伴手禮，百貨デパ地下比機場免稅店選擇多且新鮮——建議 Day 5 傍晚順路買齊，Day 6 衝 outlet 的話當天沒時間。",
      links: [
        { label: "高島屋大阪店 營業時間", url: "https://www.takashimaya.co.jp/osaka/businesshours/" },
      ],
    },
    {
      name: "Onitsuka Tiger アウトレット（りんくうプレミアム・アウトレット）",
      city: "大阪",
      area: "りんくうタウン（關西機場對岸）",
      address: "大阪府泉佐野市りんくう往来南 3-28 りんくうプレミアム・アウトレット内（区画 6815）",
      hours: "10:00–20:00（outlet 全區共通）",
      price: "經典款約市價 8 折起、再疊退稅（MEXICO 66 過季配色常見）",
      day: 6,
      note:
        "鬼塚虎在關西機場旁唯一的 outlet 門市，位於 Rinku Premium Outlets（約 250 店、日本最大級 outlet 之一，緊鄰大海景觀）。交通：南海電鐵りんくうタウン站距關西機場僅 1 站（約 6 分、¥370、Rapi:t 也停靠），出站步行約 6 分；機場接駁巴士 Sky Shuttle（¥300、約 15 分）去程可搭，⚠️ 回程勿等巴士——中午往機場方向約 1 小時僅 1 班（11:00/12:15/13:10），直接搭南海電車。主打過季款與零碼，MEXICO 66 約比定價便宜 2 成、可再退稅；尺寸碼數不如市區旗艦店齊，建議市區先試好尺寸、outlet 撿便宜。⚠️ Day 6 回程班機 15:15（Peach 在 T2、14:25 關櫃）：10:15 前退房、10:30 出發，實逛約 70 分、12:40 強制收手，12:50 搭南海到関西空港站（T1 側）轉免費連絡巴士到 T2，13:30 前抵櫃台——緩衝不到 1 小時，下雨或行李多請放棄改走悠閒版。店舖電話 072-469-7573。",
      links: [
        { label: "官方店舖頁", url: "https://www.premiumoutlets.co.jp/rinku/brands/detail_779.html" },
        { label: "Rinku Premium Outlets 官網", url: "https://www.premiumoutlets.co.jp/rinku/" },
        { label: "數位樓層地圖", url: "https://platinumaps.jp/d/premiumoutlets-rinku?spot=139601&culture=en" },
      ],
    },
  ],
};

window.TRIP_DATA = { TRIP, DAYS, CATEGORIES, RESTAURANTS, TRANSPORT, TIPS, SIGHTS, SHOPPING };

# docs/

這個資料夾放 **規劃初期的原始研究資料**。已凍結、不再更新。

## 結構

- `references/` — 各城市餐廳／景點／交通／天氣等原始研究筆記，每個主題一個檔案。
  原始來源 URL 都在 `references/sources.md`。

## 為什麼要凍結

`src/data.js` 是網站資料的單一事實來源（SSOT）。如果 `docs/references/` 也跟著改，會造成兩邊內容漂移，之後誰也搞不清哪個是對的。

規則：
1. 要改行程／餐廳 → 改 `src/data.js`
2. 改完 `src/data.js` 後 **不要**回頭改 `docs/references/`
3. `docs/references/` 只當歷史快照，想知道當初為什麼選了 A 而不是 B 時看它

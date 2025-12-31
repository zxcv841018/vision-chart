# 2019 年中央政府歲出漸層折線圖

根據 2019app.csv（中央政府總預算，依功能別彙整），以漸層折線圖呈現 32 個功能別的歲出金額，金額越高的節點顏色越偏向暖色。

## 本機預覽

在專案根目錄啟動一個靜態伺服器即可：

```sh
npx http-server .
```

接著在瀏覽器開啟 http://localhost:8080 。

## GitHub Pages 部署

專案已內建 GitHub Actions 工作流程 `.github/workflows/deploy.yml`，會在 `main` 分支推送時自動將根目錄部署到 GitHub Pages。若需要手動觸發，可在 Actions 介面使用 **Run workflow**。

## 資料來源

* `files/2019app.csv`：2019 年中央政府總預算，欄位包含功能別（`cat`）、金額（`amount`）等。
* `tw2019ap.csv`：原始資料來源備份。

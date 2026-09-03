/*
RACIKAN RINDU — GOOGLE APPS SCRIPT API (VERSI KATEGORI)

Database:
A = No
B = Nama Produk
C = Varian / Kategori
D = Ukuran Varian
E = Poin

Point Pelanggan:
A = No
B = Data Pelanggan
C = Point Pelanggan

Deploy sebagai Web App:
Execute as: Me
Who has access: Anyone

Setelah deploy, masukkan URL /exec ke app.js:
const LIVE_MODE = true;
const API_URL = "URL_WEB_APP";
*/

const SPREADSHEET_ID = "12PUQVeNMLucc9Pi3ZawfOxx5whPG1JI2QxgdHjG7xtc";
const CUSTOMER_SHEET = "Point Pelanggan";
const MENU_SHEET = "Database";

function doGet(e) {
  const data = getData_();
  const callback = e && e.parameter ? e.parameter.callback : null;
  if (callback) {
    const safeCallback = String(callback).replace(/[^\w.$]/g, "");
    return ContentService.createTextOutput(safeCallback + "(" + JSON.stringify(data) + ");")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function getData_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const cs = ss.getSheetByName(CUSTOMER_SHEET);
  const ms = ss.getSheetByName(MENU_SHEET);
  if (!cs || !ms) throw new Error("Sheet tidak ditemukan.");

  const customerValues = cs.getRange(2,1,Math.max(cs.getLastRow()-1,1),3).getDisplayValues();
  const customers = customerValues.filter(r => r[1] && r[2] !== "")
    .map((r,i) => ({no:Number(r[0])||i+1,name:String(r[1]).trim(),points:Number(String(r[2]).replace(/[^\d.-]/g,""))||0}));

  const menuLastRow = ms.getLastRow();
  const menuValues = menuLastRow >= 3 ? ms.getRange(3,1,menuLastRow-2,5).getDisplayValues() : [];
  const menu = menuValues.filter(r => r[1] && r[2] && r[3] && r[4] !== "")
    .map((r,i) => ({
      no:Number(r[0])||i+1,
      name:String(r[1]).trim(),
      category:String(r[2]).trim(),
      size:String(r[3]).trim(),
      points:Number(String(r[4]).replace(/[^\d.-]/g,""))||0
    }));

  const categories = [...new Set(menu.map(m => m.category).filter(Boolean))];
  return {customers, menu, categories, updatedAt:new Date().toISOString()};
}

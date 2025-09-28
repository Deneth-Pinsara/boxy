import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import db from "./database/db";

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile(path.join(__dirname, "../renderer/index.html"));
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle("get-products", async () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM products", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  });

  ipcMain.handle("add-product", async (event, product) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO products (name, sku, quantity, price) VALUES (?, ?, ?, ?)",
        [product.name, product.sku, product.quantity, product.price],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

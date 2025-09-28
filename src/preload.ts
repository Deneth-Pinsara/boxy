// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  getProducts: () => ipcRenderer.invoke("get-products"),
  addProduct: (product: any) => ipcRenderer.invoke("add-product", product),
});

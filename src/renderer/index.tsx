const loadProducts = async () => {
    const products = await (window as any).electronAPI.getProducts();
    console.log(products);
  };
  
  const addProduct = async () => {
    await (window as any).electronAPI.addProduct({
      name: "Test Product",
      sku: "SKU001",
      quantity: 10,
      price: 99.99,
    });
    await loadProducts();
  };
  
  document.getElementById("loadBtn")?.addEventListener("click", loadProducts);
  document.getElementById("addBtn")?.addEventListener("click", addProduct);
  
import express, { response } from "express";
const app = express();
const inventory = new Map();
async function main() {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  data.products.forEach((elem) => {
    inventory.set(elem.id, {
      id: elem.id,
      title: elem.title,
      //   thumbnail: elem.thumbnail,
      category: elem.category,
      sku: elem.sku,
      incoming: elem.minimumOrderQuantity || 0,
      stock: elem.stock,
      unitPrice: elem.price,
    });
  });

  //   console.log(inventory);
}
main();
app.get("/", (req, resp) => {
  resp.send("<h1>Hello From Main</h1>");
});
app.get("/Products", (req, resp) => {
  const { page = 1, limit = 10 } = req.query;
  const data = Array.from(inventory.values());
  const start = (page - 1) * limit;
  const result = data.slice(start, start + Number(limit));
  //   resp.json(data);
  const show = {
    data: result,
    page: Number(page),
    limit: Number(limit),
    total: data.length,
  };
  console.table(result);
  const ter = JSON.stringify(show, null, 2);
  resp.json(show);
  //   console.log(ter);
});
app.listen(3200);

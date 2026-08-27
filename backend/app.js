const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use((req, res, next) => {
  req.requestime = new Date().toISOString();
  console.log(`${req.method} ${req.url} - ${req.requestime}`);
  next();
});

const successResponse = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    data,
  });
};

const errorResponse = (res, error, statusCode = 400) => {
  return res.status(statusCode).json({
    success: false,
    error,
  });
};

const products = [
  {
    id: 1,
    name: "samsung",
    price: 7000000,
    rate: 4.9,
    description: "juda zor",
  },
];

app.get("/", (req, res) => {
  res.send("salom ");
});

app.get("/products", (req, res) => {
  successResponse(res, products);
});

app.post("/products", (req, res) => {
  if (!req.body.name || !req.body.price) {
    return errorResponse(res, "name va price majburiy", 400);
  }

  const newId =
    products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;

  const newProduct = {
    id: newId,
    name: req.body.name,
    price: req.body.price,
    rate: req.body.rate,
    description: req.body.description,
  };

  products.push(newProduct);
  successResponse(res, newProduct, 201); // 201 = Created
});

app.delete("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return errorResponse(res, "Product topilmadi", 404);
  }

  const deletedProduct = products[index];
  products.splice(index, 1);
  successResponse(res, deletedProduct);
});

app.put("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return errorResponse(res, "Product topilmadi", 404);
  }

  products[index] = {
    ...products[index],
    ...req.body,
    id,
  };

  successResponse(res, products[index]);
});

app.listen(PORT, () => {
  console.log(`server ${PORT} portda ishlayapt`);
});

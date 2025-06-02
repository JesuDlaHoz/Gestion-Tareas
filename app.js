const express = require("express");
const app = express();
require("dotenv").config(); // Para usar variables de entorno

const tareasFirestore = require("./routes/tareasFirestore");
const tareasExternas = require("./routes/tareasExternas");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/tareas", tareasFirestore);        // CRUD en Firestore
app.use("/api/tasks", tareasExternas);      // Consulta externa usando API externa

// Documentación Swagger
app.use("/swagger-ui.html", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Puerto
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}.`);
});
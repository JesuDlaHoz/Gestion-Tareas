const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Gestión de Tareas",
            version: "1.0.0",
            description: "API para gestionar tareas usando Firestore y un servicio externo",
        },
        components: {
            schemas: {
                Task: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        tarea: { type: "string" },
                        asignado: { type: "string" },
                        estado: { type: "boolean" }
                    }
                }
            }
        }
    },
    apis: ["./routes/*.js"]
};

module.exports = swaggerJSDoc(options);

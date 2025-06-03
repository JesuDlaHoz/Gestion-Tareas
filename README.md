# Gestion_Tareas
# 📝 API de Gestión de Tareas con Node.js + Firebase + API Externa

Este proyecto es una API RESTful para gestionar tareas. Utiliza Firebase Firestore como base de datos principal y también consume un servicio externo para obtener tareas públicas. Incluye documentación Swagger y soporte para ejecución con Docker.

---

## 🚀 Funcionalidades principales

- CRUD completo de tareas usando Firebase Firestore.
- Consumo de tareas desde una API externa (https://jsonplaceholder.typicode.com).
- Documentación interactiva disponible con Swagger.
- Integración con Firebase Admin SDK.
- Soporte para ejecución local y Docker.

---

## ⚙️ Requisitos

- Node.js v18 o superior
- Cuenta en Firebase con un proyecto configurado
- Docker (opcional)

---

---

## 🔧 Configuración y credenciales

La aplicación usa **Firebase** como base de datos para el CRUD local.  
Para funcionar correctamente necesitas un archivo de credenciales llamado `key.json` con tu configuración de Firebase.

> ⚠️ **IMPORTANTE**: Por motivos de seguridad, este archivo **NO está incluido** en el repositorio.  
> Debes generar tu propia clave en Firebase desde `Configuración del proyecto → Cuentas de servicio → Generar nueva clave privada`.

Luego colócala en la raíz del proyecto como `key.json`.

Tu archivo `.env` debe incluir:


## 📦 Instalación y ejecución local

1. **Clona el repositorio**:

```bash
git clone https://github.com/JesuDlaHoz/Gestion-Tareas.git

```
2. **Instala dependencias:**:
```bash
npm install
npm init -y    
npm install firebase-admin
npm install express
npm install swagger-jsdoc
npm install axios
npm install dotenv
```

3. **Ejecuta el servidor**:
```bash
node app.js o npm start

```

## ¿Cuándo usar Firebase y cuándo usar la API externa?

✅ Usa /tareas y /tarea/:id para manejar tu propia base de datos con Firebase (crear, actualizar, eliminar).

🔍 Usa /api/tasks solo si deseas consultar tareas de ejemplo que vienen de internet.

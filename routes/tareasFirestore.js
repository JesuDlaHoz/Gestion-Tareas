const express = require("express");
const router = express.Router();
const db = require("../db/firebase");

// Crea nueva tarea
router.post('/', async (req, res) => {
    try {
        // Validamos que los campos obligatorios estén presentes
        const { tarea, asignado, estado } = req.body;

        if (!tarea || !asignado) {
            return res.status(400).send({ error: "Los campos 'tarea' y 'asignado' son obligatorios." });
        }

        // Creamos el objeto que se guardará en Firestore
        const tareaJson = {
            tarea,
            asignado,
            estado: estado ?? false  // Si no se envía, lo tomamos como false por defecto
        };

         // Usamos .add() para que Firestore genere el ID automáticamente
        const docRef = await db.collection("tareas").add(tareaJson);

        // Respondemos con éxito y el ID generado
        res.send({ message: "Tarea guardada correctamente", id: docRef.id });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Obtiene todas las tareas
router.get('/', async (req, res) => {
    try {
        // Obtenemos un "snapshot" de todos los documentos en la colección "tareas"
        const snapshot = await db.collection("tareas").get();
        // Creamos un arreglo para almacenar cada tarea
        const tareas = [];
        // Iteramos sobre cada documento en el snapshot
        snapshot.forEach(doc => {
            // Guardamos cada documento como un objeto con su ID y sus datos
            tareas.push({ id: doc.id, ...doc.data() });
        });
        // Enviamos la lista de tareas como respuesta al cliente
        res.status(200).send(tareas);
    } catch (error) {
        // En caso de error, respondemos con estado 500 y el mensaje del error
        res.status(500).send({ error: error.message });
    }
});

// Obtiene una tarea por ID
router.get('/:id', async (req, res) => {
    try {
        // Capturamos el ID desde los parámetros de la URL (por ejemplo: /tareas/Tarea1)
        const id = req.params.id;
        // Buscamos el documento en Firestore con ese ID
        const doc = await db.collection("tareas").doc(id).get();
        // Si no existe, devolvemos error 404
        if (!doc.exists) {
            return res.status(404).send({ error: "Tarea no encontrada" });
        }

        // Si existe, enviamos la tarea con su ID y datos
        res.status(200).send({ id: doc.id, ...doc.data() });
    } catch (error) {
        // Si ocurre algún error, respondemos con estado 500 y el mensaje
        res.status(500).send({ error: error.message });
    }
});

// Actualiza una tarea por ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params; // ID de la tarea que quieres actualizar
        const { tarea, asignado, estado } = req.body;

        // Validamos que al menos un campo venga para actualizar
        if (!tarea && !asignado && estado === undefined) {
            return res.status(400).send({ error: "Debes enviar al menos un campo para actualizar." });
        }

        // Creamos un objeto vacío donde almacenaremos solo los campos que vamos a actualizar
        const tareaActualizada = {};

        // Validamos que los campo 'tarea' existe
        if (tarea) tareaActualizada.tarea = tarea;
        if (asignado) tareaActualizada.asignado = asignado;
        if (estado !== undefined) tareaActualizada.estado = estado;

        // Referencia al documento de Firestore
        const tareaRef = db.collection("tareas").doc(id);

        // Verificamos si la tarea existe antes de actualizar
        const doc = await tareaRef.get();
        if (!doc.exists) {
            return res.status(404).send({ error: "Tarea no encontrada." });
        }

        // Actualizamos solo los campos enviados
        await tareaRef.update(tareaActualizada);

        res.send({ message: "Tarea actualizada correctamente", id });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Elimina una tarea por ID
router.delete('/:id', async (req, res) => {
    try {
        // Obtenemos el ID de la tarea desde los parámetros de la URL
        const { id } = req.params;
        // Referencia al documento específico en Firestore
        const tareaRef = db.collection("tareas").doc(id);
        // Verificamos si la tarea existe
        const doc = await tareaRef.get();

        // Si no existe, respondemos con error 404
        if (!doc.exists) {
            return res.status(404).send({ error: "Tarea no encontrada." });
        }

        // Si existe, eliminamos el documento
        await tareaRef.delete();

        // Respondemos confirmando la eliminación
        res.send({ message: "Tarea eliminada correctamente", id });
    } catch (error) {
        // En caso de error, respondemos con código 500 y el mensaje de error
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
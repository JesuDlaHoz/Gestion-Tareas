const express = require("express");
const router = express.Router();
const TodoClient = require('../services/TodoClient');

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtener tareas desde un servicio externo (API pública)
 *     tags: [Tareas Externas]
 *     responses:
 *       200:
 *         description: Lista de tareas externas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */

// GET /api/tasks - Obtener todas las tareas del servicio externo
router.get('/', async (req, res) => {
  try {
    const tasks = await TodoClient.getTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/tasks/:id - Obtener una tarea por id
router.get('/:id', async (req, res) => {
  try {
    const task = await TodoClient.getTask(req.params.id);
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/tasks - Crear nueva tarea
router.post('/', async (req, res) => {
  try {
    const newTask = await TodoClient.createTask(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/tasks/:id - Actualizar tarea por id
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await TodoClient.updateTask(req.params.id, req.body);
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/tasks/:id - Eliminar tarea por id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await TodoClient.deleteTask(req.params.id);
    if (deleted) {
      res.json({ message: `Tarea ${req.params.id} eliminada correctamente` });
    } else {
      res.status(404).json({ error: 'Tarea no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
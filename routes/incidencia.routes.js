const express = require('express');
const router = express.Router();
const Incidencia = require('../model/Incidencia');
const catchAsync = require('../utils/catchAsync');

// Obtener todas las incidencias
router.get('/', catchAsync(async (req, res) => {
  const data = await Incidencia.findAll();
  res.json({ success: true, data });
}));

// Obtener incidencia por ID
router.get('/:id', catchAsync(async (req, res) => {
  const data = await Incidencia.getById(req.params.id);
  if (!data) {
    return res.status(404).json({ success: false, error: 'No encontrado' });
  }
  res.json({ success: true, data });
}));

// Crear nueva incidencia
router.post('/', catchAsync(async (req, res) => {
  const data = await Incidencia.create(req.body);
  res.status(201).json({ success: true, message: 'Creado exitosamente', data });
}));

// Actualizar incidencia
router.put('/:id', catchAsync(async (req, res) => {
  const data = await Incidencia.update(req.params.id, req.body);
  if (!data) {
    return res.status(404).json({ success: false, error: 'No encontrado' });
  }
  res.json({ success: true, message: 'Actualizado exitosamente', data });
}));

// Eliminar incidencia
router.delete('/:id', catchAsync(async (req, res) => {
  const eliminado = await Incidencia.delete(req.params.id);
  if (!eliminado) {
    return res.status(404).json({ success: false, error: 'No encontrado' });
  }
  res.json({ success: true, message: 'Eliminado exitosamente' });
}));

module.exports = router;

const express = require('express');
const router = express.Router();
const ReporteIncidencia = require('../model/ReporteIncidencia');
const catchAsync = require('../utils/catchAsync');

// Obtener todos los reportes de incidencia
router.get('/', catchAsync(async (req, res) => {
  const data = await ReporteIncidencia.findAll();
  res.json({ success: true, data });
}));

// Obtener reporte por ID
router.get('/:id', catchAsync(async (req, res) => {
  const data = await ReporteIncidencia.getById(req.params.id);
  if (!data) {
    return res.status(404).json({ success: false, error: 'No encontrado' });
  }
  res.json({ success: true, data });
}));

// Crear nuevo reporte
router.post('/', catchAsync(async (req, res) => {
  const data = await ReporteIncidencia.create(req.body);
  res.status(201).json({ success: true, message: 'Creado exitosamente', data });
}));

// Actualizar reporte
router.put('/:id', catchAsync(async (req, res) => {
  const data = await ReporteIncidencia.update(req.params.id, req.body);
  if (!data) {
    return res.status(404).json({ success: false, error: 'No encontrado' });
  }
  res.json({ success: true, message: 'Actualizado exitosamente', data });
}));

// Eliminar reporte
router.delete('/:id', catchAsync(async (req, res) => {
  const eliminado = await ReporteIncidencia.delete(req.params.id);
  if (!eliminado) {
    return res.status(404).json({ success: false, error: 'No encontrado' });
  }
  res.json({ success: true, message: 'Eliminado exitosamente' });
}));

module.exports = router;

const express = require('express');
const router = express.Router();
const { Vehiculo } = require('../model');
const catchAsync = require('../utils/catchAsync');
const {
  validateCreateVehiculo,
  validateUpdateVehiculo,
  handleValidationErrors,
} = require('../middlewares/validation.middleware');

// GET /api/vehiculos - Obtener todos los vehículos
router.get('/', catchAsync(async (req, res) => {
  const data = await Vehiculo.findAll();
  res.json({ success: true, data: data.map(v => v.toJSON()) });
}));

// GET /api/vehiculos/:id - Obtener un vehículo por ID
router.get('/:id', catchAsync(async (req, res) => {
  const vehiculo = new Vehiculo();
  const encontrado = await vehiculo.findById(req.params.id);
  if (encontrado) {
    res.json({ success: true, data: encontrado.toJSON() });
  } else {
    res.status(404).json({ success: false, error: 'Vehículo no encontrado' });
  }
}));

// POST /api/vehiculos - Crear un nuevo vehículo
router.post(
  '/',
  validateCreateVehiculo,
  handleValidationErrors,
  catchAsync(async (req, res) => {
    const datos = req.body;
    const vehiculo = new Vehiculo(
      null,
      datos.placa,
      datos.color,
      datos.modelo,
      datos.marca,
      datos.tipo,
      datos.usuario_id_usuario
    );
    await vehiculo.create();
    res.status(201).json({ success: true, message: 'Vehículo creado exitosamente', data: vehiculo.toJSON() });
  })
);

// PUT /api/vehiculos/:id - Actualizar un vehículo
router.put(
  '/:id',
  validateUpdateVehiculo,
  handleValidationErrors,
  catchAsync(async (req, res) => {
    const vehiculo = new Vehiculo();
    const encontrado = await vehiculo.findById(req.params.id);
    if (!encontrado) {
      return res.status(404).json({ success: false, error: 'Vehículo no encontrado' });
    }
    Object.assign(encontrado, req.body);
    await encontrado.update();
    res.json({ success: true, message: 'Vehículo actualizado exitosamente', data: encontrado.toJSON() });
  })
);

// DELETE /api/vehiculos/:id - Eliminar un vehículo
router.delete('/:id', catchAsync(async (req, res) => {
  const vehiculo = new Vehiculo();
  const encontrado = await vehiculo.findById(req.params.id);
  if (!encontrado) {
    return res.status(404).json({ success: false, error: 'Vehículo no encontrado' });
  }
  await encontrado.delete();
  res.json({ success: true, message: 'Vehículo eliminado exitosamente' });
}));

module.exports = router;
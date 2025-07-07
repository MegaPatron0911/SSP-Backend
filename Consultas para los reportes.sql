--Reporte numero 1
SELECT 
  v.id AS vehiculo_id,
  v.placa,
  v.color,
  v.modelo,
  v.marca,
  v.tipo,
  u.id_usuario,
  u.tipo_documento,
  u.numero_documento,
  u.primer_nombre,
  u.segundo_nombre,
  u.primer_apellido,
  u.segundo_apellido,
  u.direccion_correo,
  u.numero_celular,
  u.estado AS estado_usuario
FROM vehiculo v
JOIN usuario u ON v.usuario_id_usuario = u.id_usuario
JOIN perfil_usuario p ON u.perfil_usuario_id = p.id;

--Reporte numero 2
SELECT 
  a.id AS acceso_id,
  a.fecha_hora,
  v.placa,
  v.marca,
  v.modelo,
  v.color,
  v.tipo
FROM acceso_salida a
JOIN vehiculo v ON a.vehiculo_id = v.id
JOIN usuario u ON v.usuario_id_usuario = u.id_usuario
JOIN perfil_usuario p ON u.perfil_usuario_id = p.id;

--Reporte numero 3
SELECT 
  v.placa,
  u.numero_documento,
  u.primer_nombre,
  u.primer_apellido,
  v.modelo,
  v.tipo,
  i.nombre AS incidencia
FROM reporte_incidencia ri
JOIN incidencia i ON ri.incidencia_id = i.id
JOIN vehiculo v ON ri.vehiculo_id = v.id
JOIN usuario u ON v.usuario_id_usuario = u.id_usuario;

--Reporte numero 4
SELECT 
  a.fecha_hora,
  v.placa,
  v.marca,
  v.modelo,
  v.color,
  v.tipo
FROM acceso_salida a
JOIN vehiculo v ON a.vehiculo_id = v.id;

--Reporte numero 5



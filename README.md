# Backend Gestión de Parqueaderos (Node.js + Supabase)

Este proyecto es un backend robusto para la gestión de parqueaderos, desarrollado en Node.js y Express, utilizando Supabase como base de datos. Implementa un ORM manual y expone endpoints RESTful para todas las entidades principales del sistema.

## Tecnologías y Arquitectura
- **Node.js** + **Express**
- **Supabase** (PostgreSQL gestionado)
- **Multer** para manejo de archivos (fotos de usuario)
- **express-validator** para validaciones
- **Pruebas automáticas** con scripts en `/test`

## Estructura de Carpetas

```
├── api/                 # Ejemplos y pruebas de consumo de endpoints
├── model/               # Modelos ORM manuales (Usuario, Vehiculo, etc.)
├── routes/              # Rutas Express para cada entidad
├── middlewares/         # Middlewares de validación y utilidades
├── public/              # Archivos estáticos (CSS, imágenes)
├── uploads/             # Fotos de perfil de usuario
├── test/                # Pruebas automáticas
├── views/               # Vistas HTML (opcional)
├── supabaseClient.js    # Conexión centralizada a Supabase
├── server.js            # Punto de entrada principal
├── .env                 # Variables de entorno (no incluido)
```

## Configuración Inicial
1. Clona el repositorio y entra a la carpeta del proyecto.
2. Crea un archivo `.env` con tus credenciales de Supabase:
   ```env
   SUPABASE_URL=...
   SUPABASE_ANON_KEY=...
   ```
3. Instala dependencias:
   ```bash
   npm install
   ```
4. Inicia el servidor:
   ```bash
   npm start
   ```

## Endpoints Principales

Cada entidad tiene su propio CRUD bajo la ruta `/api/<entidad>`:

### Usuarios
- `GET    /api/usuarios`           → Listar todos
- `GET    /api/usuarios/:id`       → Obtener por ID
- `GET    /api/usuarios/documento/:numero` → Buscar por documento
- `POST   /api/usuarios`           → Crear usuario
- `PUT    /api/usuarios/:id`       → Actualizar usuario
- `DELETE /api/usuarios/:id`       → Eliminar usuario

### Vehículos
- `GET    /api/vehiculos`
- `GET    /api/vehiculos/:id`
- `POST   /api/vehiculos`
- `PUT    /api/vehiculos/:id`
- `DELETE /api/vehiculos/:id`

### Celdas
- `GET    /api/celda`
- `GET    /api/celda/:id`
- `POST   /api/celda`
- `PUT    /api/celda/:id`
- `DELETE /api/celda/:id`

### Accesos y Salidas
- `GET    /api/acceso_salida`
- `GET    /api/acceso_salida/:id`
- `POST   /api/acceso_salida`
- `PUT    /api/acceso_salida/:id`
- `DELETE /api/acceso_salida/:id`

### Historial de Parqueo
- `GET    /api/historial_parqueo`
- `GET    /api/historial_parqueo/:id`
- `POST   /api/historial_parqueo`
- `PUT    /api/historial_parqueo/:id`
- `DELETE /api/historial_parqueo/:id`

### Incidencias y Reportes
- `GET    /api/incidencia`
- `GET    /api/incidencia/:id`
- `POST   /api/incidencia`
- `PUT    /api/incidencia/:id`
- `DELETE /api/incidencia/:id`

- `GET    /api/reporte_incidencia`
- `GET    /api/reporte_incidencia/:id`
- `POST   /api/reporte_incidencia`
- `PUT    /api/reporte_incidencia/:id`
- `DELETE /api/reporte_incidencia/:id`

### Perfiles de Usuario y Pico y Placa
- `GET    /api/perfil_usuario`
- `GET    /api/perfil_usuario/:id`
- `POST   /api/perfil_usuario`
- `PUT    /api/perfil_usuario/:id`
- `DELETE /api/perfil_usuario/:id`

- `GET    /api/pico_placa`
- `GET    /api/pico_placa/:id`
- `POST   /api/pico_placa`
- `PUT    /api/pico_placa/:id`
- `DELETE /api/pico_placa/:id`

## Ejemplo de Body para Crear Usuario
```json
{
  "tipo_documento": "CC",
  "numero_documento": "123456789",
  "primer_nombre": "Juan",
  "segundo_nombre": "Carlos",
  "primer_apellido": "Pérez",
  "segundo_apellido": "Lopez",
  "direccion_correo": "juan@email.com",
  "numero_celular": "3001234567",
  "foto_perfil": "img/juan.jpg",
  "estado": "activo",
  "clave": "password123",
  "perfil_usuario_id": 3
}
```

## Pruebas Automáticas
- Ejecuta `npm test` para correr los tests básicos de usuario y entidades principales.
- Los archivos de prueba están en `/test` y cubren los flujos CRUD.

## Notas y Consejos
- Toda la conexión a base de datos se realiza vía `supabaseClient.js`.
- El archivo `DatabaseConnection.js` está obsoleto.
- Puedes consultar `/api` desde Postman o cualquier cliente HTTP.
- El sistema maneja validaciones y errores de forma estandarizada.
- Para ejemplos de uso, revisa la carpeta `/api` y los scripts de prueba.

---
Desarrollado por: [Tu Nombre o Equipo]
```

### 2. Obtener usuario por ID
- **GET** `/api/usuarios/:id`
- **Respuesta exitosa:** Usuario en formato JSON
- **Respuesta error:** `{ "error": "Usuario no encontrado" }`

### 3. Obtener usuario por número de documento
- **GET** `/api/usuarios/documento/:numero`
- **Respuesta exitosa:** Usuario en formato JSON
- **Respuesta error:** `{ "error": "Usuario no encontrado" }`

### 4. Crear un nuevo usuario
- **POST** `/api/usuarios`
- **Body (JSON):**
```json
{
  "tipo_documento": "CC",
  "numero_documento": "123456789",
  "primer_nombre": "Juan",
  "segundo_nombre": "Carlos",
  "primer_apellido": "Pérez",
  "segundo_apellido": "Lopez",
  "direccion_correo": "juan@email.com",
  "numero_celular": "3001234567",
  "foto_perfil": "img/juan.jpg",
  "estado": "activo",
  "clave": "password123",
  "perfil_usuario_id": 3
}
```
- **Respuesta exitosa:** Usuario creado (JSON)
- **Respuesta error:** `{ "error": "<mensaje>" }`

### 5. Actualizar usuario por ID
- **PUT** `/api/usuarios/:id`
- **Body (JSON):** Cualquier campo editable del usuario
- **Respuesta exitosa:** Usuario actualizado (JSON)
- **Respuesta error:** `{ "error": "Usuario no encontrado" }`

### 6. Eliminar usuario por ID
- **DELETE** `/api/usuarios/:id`
- **Respuesta exitosa:** `{ "mensaje": "Usuario eliminado" }`
- **Respuesta error:** `{ "error": "Usuario no encontrado" }`

## Estructura de Respuesta de Usuario
```json
{
  "id_usuario": 1,
  "tipo_documento": "CC",
  "numero_documento": "123456789",
  "primer_nombre": "Juan",
  "segundo_nombre": "Carlos",
  "primer_apellido": "Pérez",
  "segundo_apellido": "Lopez",
  "direccion_correo": "juan@email.com",
  "numero_celular": "3001234567",
  "foto_perfil": "img/juan.jpg",
  "estado": "activo",
  "clave": "...",
  "perfil_usuario_id": 3
}
```

## Pruebas y Ejecución
- Ejecuta `npm install` para instalar dependencias
- Inicia el servidor con `npm start`
- Ejecuta pruebas unitarias con `npm test`

## Notas
- Configura la conexión a la base de datos en `DatabaseConnection.js`
- Consulta el archivo `example-orm-usage.js` para ejemplos prácticos de uso
- El sistema incluye validaciones y manejo de errores detallado

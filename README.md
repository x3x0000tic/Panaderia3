Base de datos desactualizada, falta en el proyecto el html y el js del inventario, pero ya estan hechos 
# PanaderiaLD
# Comandos SQL para Crear la Base de Datos y Tabla de Productos

## Conectar a MySQL
Abre tu terminal y accede al cliente de MySQL:
```bash
mysql -u root -p
```

## Crear la Base de Datos (si no lo has hecho ya):
```sql
CREATE DATABASE Prod;
```

## Usar la Base de Datos:
```sql
USE Prod;
```

## Crear la Tabla producto
Aquí definimos la tabla `producto` que contendrá los campos requeridos.
```sql
CREATE TABLE producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    descripcion TEXT NOT NULL
);
```

## Insertar Datos de Ejemplo
A continuación, puedes insertar algunos productos de ejemplo en la tabla para que puedas probar tu aplicación.
```sql
INSERT INTO producto (nombre, precio, descripcion) VALUES ('Pan de Muerto', 24.00, 'Un pan tradicional de Día de Muertos.');
INSERT INTO producto (nombre, precio, descripcion) VALUES ('Concha', 15.00, 'Pan dulce con una cubierta de azúcar.');
INSERT INTO producto (nombre, precio, descripcion) VALUES ('Bollo', 10.00, 'Bollo de pan suave y esponjoso.');
```

## Verificar los Datos
Para asegurarte de que los productos se han insertado correctamente:
```sql
SELECT * FROM producto;
```

## Salir del Cliente de MySQL
Cuando termines, sal del cliente de MySQL:
```sql
EXIT;
```

## Resumen de Comandos SQL
Aquí tienes todos los comandos necesarios para crear la tabla de productos y agregar algunos ejemplos:
```sql
CREATE DATABASE Prod;
USE Prod;

CREATE TABLE producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    descripcion TEXT NOT NULL
);

INSERT INTO producto (nombre, precio, descripcion) VALUES ('Pan de Muerto', 24.00, 'Un pan tradicional de Día de Muertos.');
INSERT INTO producto (nombre, precio, descripcion) VALUES ('Concha', 15.00, 'Pan dulce con una cubierta de azúcar.');
INSERT INTO producto (nombre, precio, descripcion) VALUES ('Bollo', 10.00, 'Bollo de pan suave y esponjoso.');

SELECT * FROM producto;
```

## Integración con tu Código `adm.js`
Con esta estructura de base de datos, ahora puedes implementar las rutas de agregar y borrar productos en tu archivo `adm.js`, que manejarán las solicitudes de los formularios en tu archivo HTML.
```

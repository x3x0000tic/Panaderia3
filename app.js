import express from 'express';
import morgan from 'morgan';
import mysql from 'mysql2';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

/* ===================== CONFIG ===================== */
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ===================== ESTÁTICOS ===================== */
app.use(express.static(__dirname));
app.use(express.static(join(__dirname, './login')));
app.use(express.static(join(__dirname, './login2')));

/* ===================== BD ===================== */
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234', // 🔴 cambia si es necesario
    database: 'PanaderiaDB'
});

db.connect(err => {
    if (err) {
        console.error('❌ Error BD:', err);
        return;
    }
    console.log('✅ Conectado a la base de datos');
});

/* ===================== RUTAS HTML ===================== */
app.get('/', (req, res) => res.sendFile(join(__dirname, './index.html')));
app.get('/index', (req, res) => res.sendFile(join(__dirname, './index.html')));
app.get('/sign_in', (req, res) => res.sendFile(join(__dirname, './login/sign_in.html')));
app.get('/sign_up', (req, res) => res.sendFile(join(__dirname, './login2/sign_up.html')));

/* ===================== REGISTRO ===================== */
app.post('/agregarUsuario', (req, res) => {
    const { nombre, gmail, password } = req.body;

    if (!nombre || !gmail || !password)
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });

    const query = `
        INSERT INTO Usuarios (nombre_usuario, correo, contraseña, rol)
        VALUES (?, ?, ?, 'cliente')
    `;
    db.query(query, [nombre, gmail, password], (err) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') 
                return res.status(400).json({ message: 'El nombre de usuario o correo ya existe' });
            console.error('Error al registrar:', err);
            return res.status(500).json({ message: 'Error al registrar usuario' });
        }
        res.json({ success: true, message: 'Usuario registrado correctamente' });
    });
});

/* ===================== LOGIN ===================== */
app.post('/iniciar-sesion', (req, res) => {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña)
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });

    const query = `SELECT id_usuario, nombre_usuario, contraseña FROM Usuarios WHERE correo = ?`;

    db.query(query, [correo], (err, results) => {
        if (err) {
            console.error('Error al iniciar sesión:', err);
            return res.status(500).json({ message: 'Error del servidor' });
        }

        if (results.length === 0)
            return res.json({ success: false, message: 'Correo no registrado' });

        const user = results[0];
        if (user.contraseña !== contraseña)
            return res.json({ success: false, message: 'Contraseña incorrecta' });

        res.json({ success: true, userId: user.id_usuario, nombre: user.nombre_usuario });
    });
});

/* ===================== CARRITO ===================== */
// Obtener carrito del usuario
app.get('/carrito/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = `
        SELECT c.id_producto, c.cantidad, p.nombre_producto, p.precio
        FROM Carrito c
        JOIN Productos p ON c.id_producto = p.id_producto
        WHERE c.id_usuario = ?
    `;
    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json([]);
        res.json(results);
    });
});

// Agregar producto al carrito
app.post('/carrito/agregar', (req, res) => {
    const { userId, id_producto, cantidad } = req.body;
    const query = `
        INSERT INTO Carrito (id_usuario, id_producto, cantidad)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE cantidad = cantidad + ?
    `;
    db.query(query, [userId, id_producto, cantidad, cantidad], (err) => {
        if (err) {
            console.error('Error al agregar al carrito:', err); // 🔹 Aquí verás por qué falla
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true });
    });
});

// Actualizar cantidad
app.post('/carrito/actualizar', (req, res) => {
    const { userId, id_producto, cantidad } = req.body;
    const query = `UPDATE Carrito SET cantidad = ? WHERE id_usuario = ? AND id_producto = ?`;
    db.query(query, [cantidad, userId, id_producto], (err) => {
        if (err) return res.status(500).json({ success: false });
        res.json({ success: true });
    });
});

// Eliminar producto
app.post('/carrito/eliminar', (req, res) => {
    const { userId, id_producto } = req.body;
    const query = `DELETE FROM Carrito WHERE id_usuario = ? AND id_producto = ?`;
    db.query(query, [userId, id_producto], (err) => {
        if (err) return res.status(500).json({ success: false });
        res.json({ success: true });
    });
});

/* ===================== SERVER ===================== */
app.listen(app.get('port'), () => {
    console.log(`🔥 Server corriendo en http://localhost:${app.get('port')}`);
});

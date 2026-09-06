const express = require('express');
const { sql, poolPromise } = require('./db');
const app = express();
app.use(express.json());
app.use(express.static('public')); // Para servir la interfaz HTML/JS

// Endpoint para consultar el grid
app.get('/api/empleados', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .execute('dbo.sp_ObtenerEmpleados');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Endpoint para insertar
app.post('/api/empleados', async (req, res) => {
    const { nombre, salario } = req.body;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('Nombre', sql.VarChar(128), nombre)
            .input('Salario', sql.Money, salario)
            .output('CodigoResultado', sql.Int)
            .execute('dbo.sp_InsertarEmpleado');

        const codigo = result.output.CodigoResultado;
        if (codigo === 1) {
            return res.status(400).json({ error: 'Nombre de Empleado ya existe.' });
        }
        res.status(200).json({ mensaje: 'Inserción exitosa' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
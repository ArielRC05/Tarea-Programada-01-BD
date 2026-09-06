const sql = require('mssql');

const dbConfig = {
    user: 'tu_usuario_sql',
    password: 'tu_password',
    server: 'localhost', // O la IP local de la máquina anfitriona si tu compañero se conecta en red
    database: 'TuBaseDatos',
    port: 1433,
    options: {
        encrypt: false,             // 'false' para entornos de desarrollo local
        trustServerCertificate: true // Evita errores de certificados autofirmados
    }
};

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Conectado a SQL Server');
        return pool;
    })
    .catch(err => console.error('Error de conexión a BD: ', err));

module.exports = { sql, poolPromise };
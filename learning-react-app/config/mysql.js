module.exports = {
    connectionLimit: 10,
    // host: process.env.MYSQL_DB_HOST || '123.57.21.32',
    host: process.env.MYSQL_DB_HOST || '192.168.0.202',
    user: process.env.MYSQL_DB_USER || 'dev',
    password: process.env.MYSQL_DB_PASSWORD || 'dev',
    database: process.env.MYSQL_DB || 'bep'
};

module.exports = {
    userName: 'msadmin@svr-sql-01',
    password: process.env.DB_PASSWORD,
    server: 'svr-sql-01.database.windows.net',
    
    // If you're on Windows Azure, you will need this:
    options: {
        encrypt: true,
        database: 'NodeWorkshop'
    }
};

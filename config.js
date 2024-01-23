// config.js
module.exports = {
    db: {
      url: process.env.DATABASE_URL || 'mysql://your_mysql_username:your_mysql_password@your_mysql_host:your_mysql_port/your_mysql_database',
    },
    jwtSecret: 'your_secret_key_for_jwt',
  };
  
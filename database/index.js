const Sequelize = require("sequelize");

//Conectando com o DB do Heroku

//const sequelize = new Sequelize(
//   process.env.DB_BASE, 
//   process.env.DB_USER,
//   process.env.DB_PASS, {
//     host:  process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: 'postgres',
//     protocol: 'postgres',     
//        dialectOptions: {         
//          ssl: {             
//            require: true,             
//            rejectUnauthorized: false         
//          }     
//        } 
// });
const sequelize = new Sequelize(
  process.env.DB_BASE, 
  process.env.DB_USER,
  process.env.DB_PASS, {
    host:  process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    protocol: 'postgres',
       dialectOptions: {
         ssl: {
           require: true,
           rejectUnauthorized: false
         }
       } 
});

// Conexão local

// const sequelize = new Sequelize(
//   process.env.DB_BASE, 
//   process.env.DB_USER,
//   process.env.DB_PASS, {
//     host:  process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: 'postgres'
// });

module.exports = sequelize;
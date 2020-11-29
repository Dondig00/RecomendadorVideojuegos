
/*module.exports = session; */

// npm install --save neo4j-driver
var neo4j = require('neo4j-driver'); //Driver de Neo4J
var driver = neo4j.driver('bolt://204.236.241.53:33092', neo4j.auth.basic('neo4j', 'coasts-signalman-dedications')); //Conexion con la base de datos alojada en sandbox

var session = driver.session(); // Creamos la sesion en la que pasaremos la query
module.exports = session; // La exportamos para que el controlador la pueda usar
  


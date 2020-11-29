var session = require('../Conector/BDConector'); //Cargamos la sesion creada en el conector

function getAll() {
    // Creo la query que buscaremos en neo4j
    var query = "MATCH (g:Genre)-[]- (v:Videogame)-[]- (d:Developer) RETURN collect(g.name) AS genre,v, collect(DISTINCT d.name) AS developer";
    const promise = new Promise(function (resolve, reject) { //Creo una promesa para la query
        session.run(query) // corremos la query en neo4j
            .then(result => {
                var Videogames = []; // creo un array donde almacenare los datos retornados
                result.records.forEach(function (record) { //con esto da la vuelta por cada resultado obtenido
                    Videogames.push({ //aqui lo almacena y le da nombres a las propiedades
                        name: record.get('v').properties.name,
                        release_date: record.get('v').properties.release_date,
                        user_score: record.get('v').properties.user_score,
                        plataforma: record.get('v').properties.plataforma,
                        number_players: record.get('v').properties.number_players,
                        metaescore: record.get('v').properties.metascore,
                        genres: record.get('genre'),
                        developer: record.get('developer')
                    })
                })
                console.log(Videogames);
                resolve(Videogames); // la resolucion de la promesa seran los videojuegos

            }).catch(err => {
                console.log('Error inesperado ' + err);
                reject(new Error('Error inesperado ' + err.data));
            })
    })
    return promise // Devuelve la promesa
}

module.exports = { getAll }; // exporta la funcion getAll , estos deberian ser todos los nuevos cambios
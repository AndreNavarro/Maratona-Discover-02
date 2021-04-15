const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

//Abrindo conexão com o Banco de dados
//module.exports exporta um objeto
//open precisa de (parametros) ser colocado dentro de uma função então a arrow function
// module.exports = () => {open()}

module.exports = () => 
  open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });


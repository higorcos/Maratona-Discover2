const sqlite3 = require('sqlite3')
const {open} = require('sqlite') // vai usar apenas o open do sqlite 

module.exports = ()=> //o open tem que ser passado dentro de uma função | não está envolvido por {} pois existe apenas uma função (open)
open({
    filename: './database.sqlite',  //onde vai ficar salvo 
    driver: sqlite3.Database, 
})

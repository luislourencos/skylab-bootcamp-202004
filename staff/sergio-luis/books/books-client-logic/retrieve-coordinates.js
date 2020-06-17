/**
 * Retrieve coordinates.
 * 
 * @param {string} UserId take by token.  
 *
 * @throws {UnexistenceError} if don`t find userId in data base and if dont have latitude or longitude.
 * @throws {VoidError} if the input fiels ar empty.
 * 
 * @return {object} return a object with latitude and longitude parametres of userId.
 *
 */

require('books-commons/polyfills/string')
const { utils: { call } } = require('books-commons')
const context = require('./context')

module.exports = function(token) {
    String.validate.notVoid(token)
    
    return (async () => {
        const resp = await call(
            'GET',
            `${this.API_URL}/users/coordinates/retrieve`,undefined,
            { 'Authorization': `Bearer ${token}` })

            const { status, body } = resp

        if (status === 201) {
            const coordinates = JSON.parse(body)
            return coordinates
        
        }else {
            const { error } = JSON.parse(body)
            throw new Error(error)
        }
    })()
}.bind(context)
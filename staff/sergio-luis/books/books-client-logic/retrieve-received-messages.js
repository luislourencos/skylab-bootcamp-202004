/**
 * Retrieve received message.
 * 
 * @param {string}  token.  
 *
 * @throws {UnexistenceError} if don`t find userId in data base or if you dont have mensages.
 * @throws {VoidError} if the input fiels ar empty.
 * 
 * @return {object} return an array of messages.
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
            `${this.API_URL}/books/messages/retrieve`,undefined,
            { 'Authorization': `Bearer ${token}` })

        const { status, body } = resp

        if (status === 201) {
            const messages = JSON.parse(body)
            return messages
        
        }else {
            const { error } = JSON.parse(body)
            throw new Error(error)
        }
    })()
}.bind(context)
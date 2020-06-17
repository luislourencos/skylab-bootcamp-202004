require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL , TEST_API_URL: API_URL,SECRET} } = process
console.log(SECRET)

const retrieveUser = require('./retrieve-user')
const { random } = Math
const { expect } = require('chai')
require('books-commons/polyfills/json')
require('books-commons/ponyfills/xhr')
const { mongoose, models: { User } } = require('books-data')
const {jwtPromised} = require('books-node-commons')
const {errors:{VoidError}} = require('books-commons')
global.fetch = require('node-fetch')
const context = require('./context')
context.API_URL = API_URL

describe('client-logic-retrieve user', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId,token

    beforeEach(async() =>{
       await User.deleteMany()
    
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
    })

    describe('when user already exists', () => {
        beforeEach(async() =>{
            const user = await User.create({ name, surname, email, password })
            userId = user.id
            token = await jwtPromised.sign({ sub: userId }, SECRET)
        })

        it('should succeed on correct user id', async() =>{
            const user = await retrieveUser(token);

            expect(user.name).to.equal(name)
            expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)
            expect(user.password).to.be.undefined
            expect(user.book).to.be.undefined
            expect(user.following).to.be.undefined
            expect(user.id).to.exist
            expect(user.id).to.equal(userId)
        })
    })

    it('should fail when user does not exist', async() => {
        userId = '5ed1204ee99ccf6fae798aef'

        const _token = await jwtPromised.sign({ sub: userId }, SECRET)
        try{
           await retrieveUser(_token)
           throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`user with id ${userId} does not exist`)
        }
    })

    it('should fail when for a empty userId', () => {
        expect(() => {
            retrieveUser('')
        }).to.throw(VoidError, 'string is empty or blank')  
    })

    afterEach(async() => await User.deleteMany())

    after(async()=> {
        await mongoose.disconnect()
      })
})
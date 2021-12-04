// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const { createJSDocTypeExpression } = require("typescript");



// Login (User Authentication)

Cypress.Commands.add('login',(firstName,password)=>{
    cy.request('POST','http://localhost:3000/auth/login',
    {username:firstName,password:password}
    ).as('loginResponse').then((res)=>{
        var value = res.body.access_token
        Cypress.env('test',value)
        cy.log(value)
    })
})


// @Get(users)   (gets all the user present in the database)

Cypress.Commands.add('getUsers', () => {

    let test = Cypress.env('test')
    var token = 'bearer ' +test
    cy.request({
        method: 'GET',
        url : 'localhost:3000/users',
        headers: {
            authorization : token,
        }
    }).as('getuserdata').then((response)=>{
        var value = response.body.length
        cy.log("Value "+value);
        expect(response.status).to.eq(200)
        expect(response.body[0]).to.have.property('firstName','Sudarshan')
        expect(response.body[0]).to.have.property('lastName','Shukla')
        expect(response.body[0]).to.have.property('emailId','Shukla@gmail.com')
        expect(response.body[0]).to.have.property('phoneNumber',98890576397)
        expect(response.body[0]).to.have.property('city','Pratapgarh')
        expect(response.body[0]).to.have.property('state','UP')
        expect(response.body[0]).to.have.property('country','India')
        expect(response.body[0]).to.have.property('password','shukla@123')
    })
})

// Get(/user:/id)      (Get user by Id from database)

Cypress.Commands.add('getUserById', (id) => {
    let test = Cypress.env('test')
    var token = 'bearer ' +test
    const userId=id
    cy.log("user id is: "+userId)
    cy.request({
        method: 'GET',
        url: `localhost:3000/users/`+userId,
        headers: {
            authorization : token,
        }
    }).as('getbyiduserdata').then((response)=>{
        var value = response.body.length
        cy.log("Value "+value); 
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('firstName','Sudarshan')
        expect(response.body).to.have.property('lastName','Shukla')
        expect(response.body).to.have.property('emailId','Shukla@gmail.com')
        expect(response.body).to.have.property('phoneNumber',98890576397)
        expect(response.body).to.have.property('city','Pratapgarh')
        expect(response.body).to.have.property('state','UP')
        expect(response.body).to.have.property('country','India')
        expect(response.body).to.have.property('password','shukla@123')
    })
})


// POST(/users)       (adds new user to data base)

Cypress.Commands.add('addUser',(first_name,last_name,emailid,phone,city,state,country,password)=>{
    cy.request('POST', `localhost:3000/users`, {
        firstName : first_name,
        lastName : last_name,
        emailId : emailid,
        phoneNumber : phone,
        city: city,
        state : state,
        country : country,
        password : password
    }).as('postuser').then((response)=> {
        expect(response.status).to.eq(401)

    })
})


// Update User

Cypress.Commands.add('updateById', (id,first_name,last_name) => {
    let test = Cypress.env('test')
    var token = 'bearer ' +test
    const userId=id
    cy.log("user id is: "+userId)
    cy.request({
        method: 'PUT',
        url:  `localhost:3000/users/`+userId,
        headers: {
            authorization : token,
        },
        body:{
            firstName:first_name,
            lastName:last_name,
            emailId : 'raja@gmail.com',
            phoneNumber : 9878234327,
            city: 'Chennai',
            state: 'TN',
            country: 'India',
            password: 'raja@123'
        }
        
    }).as('updatebyiduserdata').then((response)=>{
        expect(response.status).to.eq(200)
    })
})



// Delete User

Cypress.Commands.add('deleteUser', (id) => {
    let test = Cypress.env('test')
    var token = 'bearer ' +test
    const userId=id
    cy.log("user id is: "+userId)
    cy.request({
        method : 'DELETE',
        url:  `localhost:3000/users/`+userId,
        headers: {
            authorization : token,
        }
    }).as('deleteuserdata').then((response)=>{
        var value = response.body.length
        cy.log("Value "+value);
        expect(response.status).to.eq(200)
        
    })
})
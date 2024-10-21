Cypress.Commands.add('login', (username, password) => {
    cy.get('#logout').click()
    cy.get('#email').type(username)
    cy.get('#password').type(password)  
    cy.get('#submit').click()
})

Cypress.Commands.add('register', (username, password) => {
    cy.visit("https://thinking-tester-contact-list.herokuapp.com/")
    cy.get('#signup').click()
    cy.get('#firstName').type(username)
    cy.get('#lastName').type(username+"LastName")
    cy.get('#email').type(username+"@gmail.com")
    cy.get('#password').type(password)
    cy.get('#submit').click()
})
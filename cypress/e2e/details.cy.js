it('reads the id from the URL', () => {
    cy.visit('/character/22')
    cy.contains('h2', '#22')
})

it('shows the Character from the API', () => {
    cy.visit('/character/22')
    cy.contains('h2', 'Aqua Rick #22')
    cy.get('#22 img').should('have.attr', 'alt', 'Aqua Rick')
    cy.contains("Species: Humanoid")
})

it('shows a message for an unknown Character', () => {
    cy.visit('/character/0000')
    cy.contains('Request failed with status code 404')
})

it('opens the details page from a card', () => {
    cy.visit('/')
    cy.get('#formCharacter').type('rick{enter}')
    cy.get('#22_btn').should('be.visible').click()
    cy.location('pathname').should('eq', '/character/22')
    cy.contains('h2', 'Aqua Rick #22')
})


it('goes back with the Back button', () => {
    cy.visit('/')
    cy.get('input[name=nameField]').type('rick{enter}')
    cy.get('#22').contains('View this character').click()
    cy.location('pathname').should('eq', '/character/22')
    cy.get('button[aria-label="Go back"]').click()
    cy.location('pathname').should('eq', '/')
})

it('the browser Back button works too', () => {
    cy.visit('/')
    cy.get('input[name=nameField]').type('rick{enter}')
    cy.get('#22').contains('View this character').click()
    cy.location('pathname').should('eq', '/character/22')
    cy.go('back')
    cy.location('pathname').should('eq', '/')
})

it('logs in and goes home', () => {
    cy.visit('/login')
    cy.get('#username').type('john')
    cy.contains("button", 'Log In').click()
    cy.location('pathname').should('eq', '/')
})

it('stays on the login page with an empty name', () => {
    cy.visit('/login')
    cy.contains('button', "Log In").click()
    cy.location('pathname').should('eq', '/login')
})
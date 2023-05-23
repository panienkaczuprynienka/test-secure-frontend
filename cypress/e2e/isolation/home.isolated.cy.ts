/// <reference types="cypress" />

import { buildLoginResponse } from "../../utils/login"
import { getUser } from "../../utils/user"
import users from "../../fixtures/users.json"

describe('Home page tests', () => {

    beforeEach(() => {
        const user = getUser()
        localStorage.setItem('user', JSON.stringify(buildLoginResponse(user)))
        cy.setCookie('token', 'fakeToken')
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
        cy.visit('http://localhost:8081')
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length', users.length)
        cy.get('li').each(($el, i) => {
            cy.wrap($el).should('contain.text', `${users[i].firstName} ${users[i].lastName}`)
        })
    })

    it('should successfully delete an user', () => {
        // given
        const userToDelete = users[1]
        cy.intercept('DELETE', `**/users/${userToDelete.username}`, { statusCode: 204 })

        // when
        cy.get('li').contains(`${userToDelete.firstName} ${userToDelete.lastName}`).find('.delete').click()

        // then
        cy.get('li').contains(`${userToDelete.firstName} ${userToDelete.lastName}`).should('not.exist')
    })
})
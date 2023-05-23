/// <reference types="cypress" />

import Alert from "../../components/Alert"
import { postUsersSignUpMocks } from "../../mocks/postUsersSignUp"
import RegisterPage from "../../pages/RegisterPage"
import { getUser } from "../../utils/user"

describe('[ISOLATION] Register page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        // given
        const user = getUser()
        postUsersSignUpMocks.mockSuccess()

        // when
        RegisterPage.attemptRegister(user)

        // then
        Alert.alertSuccess().should('have.text', 'Registration successful')
        cy.url().should('contain', '/login')
    })

    it('should fail to register if username already in use', () => {
        // given
        const errorMessage = 'Username is already in use'
        const user = getUser()
        postUsersSignUpMocks.mockFailure(errorMessage)

        // when
        RegisterPage.attemptRegister(user)

        // then
        Alert.alertFailure().should('have.text', errorMessage)
    })


})

// cypress/support/appActions/authActions.js

export const authActions = {
    generateUser() {
        const randomNum = Math.floor(Math.random() * 1000000);
        return {
            username: `Graciela${randomNum}`,
            password: `Pass@${randomNum}`,
        };
    },

    register() {
        const user = this.generateUser();
        cy.visit('/');
        cy.get('#signin2').click();
        cy.get('#sign-username')
            .should('be.visible')
            .should('not.be.disabled')
            .wait(600)
            .focus()
            .clear()
            .type(user.username, { delay: 100 })
            .should('have.value', user.username);

        cy.get('#sign-password')
            .should('be.visible')
            .should('not.be.disabled')
            .focus()
            .clear()
            .type(user.password, { delay: 100 })
            .should('have.value', user.password);

        cy.get('button[onclick="register()"]').click();
        // cy.on('window:alert', (str) => {
        //     expect(str).to.match(/Sign up successful|already exist/);
        // });


        cy.reload();
        return cy.wrap(user);
    },

    login(user) {
        cy.get('#login2').click();
        cy.get('#logInModal').should('be.visible');
        cy.get('#loginusername')
            .should('be.visible')
            .should('not.be.disabled')
            .wait(600)
            .focus()
            .clear()
            .type(user.username, { delay: 100 })
            .should('have.value', user.username);

        cy.get('#loginpassword')
            .should('be.visible')
            .should('not.be.disabled')
            .focus()
            .clear()
            .type(user.password, { delay: 100 })
            .should('have.value', user.password);
        cy.wait(1000)
        cy.get('button[onclick="logIn()"]').should('be.visible').click({ force: true });
        cy.wait(1000)
        cy.get('#nameofuser')
            .should('be.visible')
            .and('contain.text', `Welcome ${user.username}`);
    }
};

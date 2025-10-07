/// <reference types="cypress" />
import { authActions } from '../support/appActions/authActions';
import { productActions } from '../support/appActions/productActions';

describe('HappyPath', () => {

    it('Should display the list of laptops in the catalog without login', () => {
        cy.visit('/');
        cy.get('#tbodyid').should('be.visible');
        cy.get('#tbodyid .card').its('length').should('be.gte', 1);
        cy.get('#tbodyid .card-title').first().should('not.be.empty');
    });

    it('should display details of the desired laptop', () => {
        cy.visit('/');
        cy.get('[onclick="byCat(\'notebook\')"]').click();
        cy.fixture('products').then((products) => {
            const laptopName = products.find(p => p.type === 'laptop').name;
            cy.contains('.card-title', laptopName).click();
            cy.get('.name').should('contain.text', laptopName);
            cy.get('.price-container').should('be.visible');
            cy.get('#more-information').should('exist');
        });
    });

    it('Should add and remove a product from the shopping cart', () => {

        cy.fixture('products').then((products) => {
            const laptop = products.find(p => p.type === 'laptop');
            cy.visit('/')
            cy.get('[onclick="byCat(\'notebook\')"]').click();
            cy.contains('.card-title', laptop.name).click();
            cy.get('a[onclick^="addToCart"]').should('be.visible').click();
            cy.on('window:alert', (str) => {
                expect(str).to.include('Product added.');
            });
            cy.get('.navbar-brand').click();
            cy.get('#cartur').click();
            cy.wait(800)
            cy.contains('td', laptop.name).should('be.visible');
            cy.contains('td', laptop.name)
                .parent('tr')
                .within(() => {
                    cy.contains('Delete').click();
                });

            cy.get('#tbodyid').should('not.contain', laptop.name);
        });
    });

     it('Should buy a laptop without register or login', () => {
        cy.fixture('products').then((products) => {
            const laptop = products.find(p => p.type === 'laptop');
            cy.visit('/');
            productActions.buyLaptop(laptop.name);
            productActions.fillOrderForm();
            productActions.finishAndConfirmOrder();

        });
    });

    it('Should register and login a new user', () => {

        authActions.register().then((user) => {
            authActions.login(user);
        });
    });

    it('Should register, do login and buy a laptop', () => {
        cy.fixture('products').then((products) => {
            const laptop = products.find(p => p.type === 'laptop');
            authActions.register().then((user) => {
                authActions.login(user);
                productActions.buyLaptop(laptop.name);
                productActions.fillOrderForm();
                productActions.finishAndConfirmOrder();

            });
        });
    });

   

});



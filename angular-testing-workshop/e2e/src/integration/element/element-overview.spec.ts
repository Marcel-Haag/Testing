import {isMockEnv} from '../../support/utils.po';
import {elementListRoute, emptyElementListRoute} from '../../support/mock-routes.po';
import {isElementOverviewRoute} from '../../support/url-routes.po';

describe('Element Overview', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('element_overview_route'));
        cy.restoreLocalStorageCache();
    });

    afterEach(() => cy.saveLocalStorageCache());

    after(() => {
        cy.clearLocalStorage();
    });

    // cy.wait(..) are just here for demonstration purposes, they can be removed
    context('Load Elements', () => {
        beforeEach(() => {
            if (isMockEnv()) {
                elementListRoute();
            }
        });
        context('Should load elements successfully', () => {
            it('It should stay on the page', () => {
                cy.getByCyTag('remove-elements-btn').should('be.disabled');
                cy.getByCyTag('get-elements-btn').should('be.visible');
                cy.getByCyTag('get-elements-btn').click();
                isElementOverviewRoute();
                // wait to apply changes
                cy.wait(500);
                cy.getByCyTag('element-table').should('be.visible');
            });

            it('Should remove loaded elements', () => {
                // load elements
                cy.getByCyTag('get-elements-btn').should('be.visible');
                cy.getByCyTag('get-elements-btn').click();
                isElementOverviewRoute();
                cy.getByCyTag('element-table').should('be.visible');
                // wait to apply changes
                cy.wait(500);
                // remove elements again
                cy.getByCyTag('remove-elements-btn').should('be.enabled');
                cy.getByCyTag('remove-elements-btn').click();
                // wait to apply changes
                cy.wait(1000);
                cy.getByCyTag('empty-table-text').should('be.visible');
                cy.getByCyTag('remove-elements-btn').should('be.disabled');
            });
        });
    });

    context('Do not load Elements', () => {
        beforeEach(() => {
            if (isMockEnv()) {
                cy.log('IS MOCK');
                emptyElementListRoute();
            } else {
                cy.log('IS NOT MOCK');
            }
        });
        context('Should load elements successfully', () => {
            it('Should not load elements', () => {
                // load elements
                cy.getByCyTag('get-elements-btn').should('be.visible');
                cy.getByCyTag('get-elements-btn').click();
                isElementOverviewRoute();
                cy.getByCyTag('element-table').should('be.visible');
                // wait to apply changes
                cy.wait(500);
                // remove elements again
                cy.getByCyTag('remove-elements-btn').should('be.disabled');
                cy.getByCyTag('empty-table-text').should('be.visible');
                cy.wait(500);
            });
        });
    });
});


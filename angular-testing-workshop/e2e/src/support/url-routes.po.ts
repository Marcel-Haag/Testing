import Chainable = Cypress.Chainable;

export const isElementOverviewRoute = () =>
    shouldBeInRoutesCy(Cypress.env('element_overview_route'));

export function shouldBeInRoutesCy(path: string): Chainable {
    return cy.location('pathname', {timeout: 60000})
        .should('include', path);
}

// Element
export const elementListRoute = () =>
    cy.intercept('GET', '**/elements', {fixture: 'element/model/elements.json'})
        .as('loadElements');

export const emptyElementListRoute = () =>
    cy.intercept('GET', '**/elements', {fixture: 'element/model/no-elements.json'})
        .as('loadEmptyElements');

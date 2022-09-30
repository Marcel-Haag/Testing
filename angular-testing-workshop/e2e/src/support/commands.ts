let LOCAL_STORAGE_MEMORY: any = {};
// tslint:disable-next-line: no-namespace
declare namespace Cypress {
    interface Chainable {
        //  Custom command to select DOM element by signIn attribute.
        saveLocalStorageCache(): Chainable<Element>;

        restoreLocalStorageCache(): Chainable<Element>;

        resetLocalStorageCache(): Chainable<Element>;

        getByCyTag(tag: string): Chainable<Element>;
    }
}

// @ts-ignore
Cypress.Commands.add('getByCyTag', (tag: string) => cy.get(`[data-cy=${tag}]`));

Cypress.Commands.add('saveLocalStorageCache', () => {
    Object.keys(localStorage).forEach(key => {
        LOCAL_STORAGE_MEMORY[key] = localStorage[key];
    });
});

Cypress.Commands.add('restoreLocalStorageCache', () => {
    Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
        localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
});

Cypress.Commands.add('resetLocalStorageCache', () => {
    localStorage.clear();
});

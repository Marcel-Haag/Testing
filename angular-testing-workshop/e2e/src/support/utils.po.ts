export const enum environments { production = 'production', dev = 'dev', mock = 'mock' }

export const isMockEnv = () =>
    Cypress.env('environment') === environments.mock;

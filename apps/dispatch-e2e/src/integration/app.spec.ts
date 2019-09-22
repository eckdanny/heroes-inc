import { getGreeting } from '../support/app.po';

describe('dispatch', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to dispatch!');
  });
});

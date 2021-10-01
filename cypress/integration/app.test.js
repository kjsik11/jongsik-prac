/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe('Navigation', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/');

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="swr"]').click();

    // The new url should include "/about"
    cy.url().should('include', '/swr');

    // The new page should contain an h1 with "About page"
    cy.get('p').contains('useContextWithSWR');
  });

  it('input value', () => {
    cy.visit('http://localhost:3000/');

    const value = '김종식';

    cy.get("input[placeholder='input name']").type(value);

    cy.get("button:contains('change name')").click();

    cy.get("a[href='/swr']").click();

    cy.url().should('include', '/swr');

    cy.get('p').contains(value);
  });
});

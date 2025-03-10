describe('Forum Themes Page Tests', () => {
  beforeEach(() => {
    cy.visit('/forum'); // Открываем страницу форума
  });

  it('Displays loading spinner before themes load', () => {
    cy.get('.loading-spinner').should('be.visible');
  });

  it('Displays forum themes after loading', () => {
    cy.get('.loading-spinner').should('not.exist');
    cy.get('.theme-card').should('have.length.greaterThan', 0);
  });

  it('Navigates to theme page on theme click', () => {
    cy.get('.theme-card').first().click();
    cy.url().should('include', '/forum/');
  });

  it('Shows message if no themes are available', () => {
    cy.intercept('GET', '**/themes', { body: { data: [] } }).as('getEmptyThemes');
    cy.reload();
    cy.wait('@getEmptyThemes');
    cy.get('.no-themes').should('be.visible').and('contain', 'Пока нет созданных тем');
  });
});

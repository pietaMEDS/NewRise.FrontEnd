describe('Forum Page Tests', () => {
  beforeEach(() => {
    cy.visit('/forum');
  });

  it('Загрузка страницы и отображение категорий', () => {
    cy.contains('h1', 'Темы форума').should('be.visible');
  });

  it('Контент загрузился', () => {
    cy.wait(5000);
    cy.get('p').contains('Основные обсуждения')
  })
});

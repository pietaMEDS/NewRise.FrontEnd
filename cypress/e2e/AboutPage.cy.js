describe('About Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Проверяет наличие заголовка и текста', () => {
    cy.contains('New Rise').should('be.visible');
    cy.contains('Твой любимый классический CWRP').should('be.visible');
  });

  it('Карусель отображается и работает', () => {
    cy.get('#carouselMain').should('be.visible');
    cy.get('.carousel-item').should('have.length.at.least', 1);

    cy.get('.carousel-control-next').click();
    cy.wait(500);
    cy.get('.carousel-item.active').should('exist');

    cy.get('.carousel-control-prev').click();
    cy.wait(500);
    cy.get('.carousel-item.active').should('exist');
  });

  it('Кнопки карусели работают', () => {
    cy.get('.carousel-control-next').click();
    cy.get('.carousel-item.active').should('exist');
    cy.get('.carousel-control-prev').click();
    cy.get('.carousel-item.active').should('exist');
  });

});

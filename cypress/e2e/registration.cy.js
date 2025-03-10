describe('Registration Page Tests', () => {
  beforeEach(() => {
    cy.visit('/registration'); // Переход на страницу регистрации
  });

  it('Displays form elements', () => {
    cy.get('input#login').should('be.visible');
    cy.get('input#email').should('be.visible');
    cy.get('input#password').should('be.visible');
    cy.get('input#retrypassword').should('be.visible');
    cy.get('input#term').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('Shows validation errors when fields are empty', () => {
    cy.get('button[type="submit"]').click();
    cy.get('#loginlHelp').should('contain', 'Логин обязателен');
    cy.get('#emailHelper').should('contain', 'Введите корректный email адрес');
    cy.get('#passwordHelper').should('contain', 'Пароль должен содержать минимум 6 символов');
    cy.get('#termHelper').should('contain', 'Необходимо принять условия использования');
  });

  it('Shows an error for invalid email format', () => {
    cy.get('input#email').type('invalid-email');
    cy.get('button[type="submit"]').click();
    cy.get('#emailHelper').should('contain', 'Введите корректный email адрес');
  });

  it('Shows an error when passwords do not match', () => {
    cy.get('input#password').type('password123');
    cy.get('input#retrypassword').type('password456');
    cy.get('button[type="submit"]').click();
    cy.get('#retryPasswordHelper').should('contain', 'Пароли не совпадают');
  });

  it('Successfully registers a user with valid data', () => {
    cy.intercept('POST', '**/users/create', {
      statusCode: 200,
      body: { token: 'testToken', user: { id: 1 } },
    }).as('registerUser');

    cy.get('input#login').type('testuser');
    cy.get('input#email').type('testuser@example.com');
    cy.get('input#password').type('password123');
    cy.get('input#retrypassword').type('password123');
    cy.get('input#term').check();
    cy.get('button[type="submit"]').click();

    cy.wait('@registerUser');
    cy.url().should('include', '/profile');
  });
});

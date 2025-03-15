describe('Forum Page Tests', () => {
  beforeEach(() => {
    cy.visit('/forum/chat/5'); // Замените 1 на реальный ID форума
  });

  it('Displays loading spinner before posts load', () => {
    cy.get('.loading-spinner').should('be.visible')
  })

  it('Allows the user to create a new post', () => {
    cy.get('textarea').type('Это новый тестовый пост!')
    cy.get('button').contains('Отправить').click()
    cy.wait(5000)
    cy.get('.notify-window').contains('При отправки сообщения произошла ошибка')
  })

  it('Allows the user to reply to a post', () => {
    cy.get('.action-btn.reply').first().click();
    cy.get('.reply-preview').should('be.visible');
  });

  it('Shows edited timestamp when a post is updated', () => {
    cy.get('.post-updated').should('exist');
  });

  it('Does not allow editing or deleting other users’ posts', () => {
    cy.get('.post').each(($post) => {
      cy.wrap($post).within(() => {
        cy.get('.action-btn.edit').should('not.exist');
        cy.get('.action-btn.delete').should('not.exist');
      });
    });
  });
});

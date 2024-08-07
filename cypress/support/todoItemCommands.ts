Cypress.Commands.add("markFirstCompleted", () => {
  cy.get(".toggle-complete-btn").first().click();
});
Cypress.Commands.add("showFirst", () => {
  cy.get(".todo-item").first().click();
});

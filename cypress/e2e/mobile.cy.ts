describe("Mobile version", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.viewport(350, 800);
  });

  it("should have call to actions", () => {
    cy.haveCallToAction();
  });

  it("should not have call to actions", () => {
    cy.notHaveCallToAction();
  });

  it("should create new todo", () => {
    cy.createNewTodo();
  });

  it("should validate mobile menu", () => {
    cy.get("nav").should("not.be.visible");
    cy.toggleMenu();
    cy.get("nav").should("be.visible");
    cy.toggleMenu();
    cy.get("nav").should("not.be.visible");
  });

  it("should search todos", () => {
    cy.fixture("todos").then((todos) => cy.searchTodos(todos));
  });

  it("should sort by priority", () => {
    cy.fixture("todos").then((todos) => cy.validateSortByPriority(todos));
  });

  it("should toggle completed", () => {
    cy.fixture("todos").then((todos) => cy.validateToggleComplete(todos));
  });

  it("should toggle history", () => {
    cy.fixture("todos").then((todos) => cy.validateToggleHistory(todos));
  });

  it("should archive completed", () => {
    cy.fixture("todos").then((todos) => cy.validateArchiveCompleted(todos));
  });

  it("should archive all", () => {
    cy.fixture("todos").then((todos) => cy.validateArchiveAll(todos));
  });

  it("should delete all", () => {
    cy.fixture("todos").then((todos) => cy.validateDeleteAllTodos(todos));
  });
});

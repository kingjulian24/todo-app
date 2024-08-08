describe("Desktop version", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.viewport(1280, 800);
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

  it("should search todos", () => {
    cy.fixture("todos").then((todos) => cy.searchTodos(todos));
  });

  it("should sort by priority", () => {
    cy.fixture("todos").then((todos) =>
      cy.validateSortByPriority(todos, false)
    );
  });

  it("should toggle completed", () => {
    cy.fixture("todos").then((todos) =>
      cy.validateToggleComplete(todos, false)
    );
  });

  it("should toggle history", () => {
    cy.fixture("todos").then((todos) => cy.validateToggleHistory(todos, false));
  });

  it("should archive completed", () => {
    cy.fixture("todos").then((todos) =>
      cy.validateArchiveCompleted(todos, false)
    );
  });

  it("should archive all", () => {
    cy.fixture("todos").then((todos) => cy.validateArchiveAll(todos, false));
  });

  it("should delete all", () => {
    cy.fixture("todos").then((todos) =>
      cy.validateDeleteAllTodos(todos, false)
    );
  });

  it("should validate tags", () => {
    cy.fixture("todos").then((todos) => {
      const data = todos.slice(0, 2);
      cy.addMultipleTodos(data);
      cy.get(".todo-item").should("have.length", data.length);
      cy.get(".todo-tag").should("have.length", 2);
      cy.get(".todo-tag").first().contains(data[0].tag);

      cy.get(".todo-tag").last().click();
      cy.get(".todo-tag").last().should("have.class", "bg-blue-500");
      cy.get(".todo-item").should("have.length", data.length - 1);
      cy.get(".todo-tag").should("have.length", 2);
      cy.get(".todo-tag").first().click();
      cy.get(".todo-item").should("have.length", data.length);
    });
  });

  it("should show progress", () => {
    cy.fixture("todos").then((todos) => {
      cy.addMultipleTodos(todos);
      cy.get("#progress-bar").contains("0%");
      cy.markFirstCompleted();
      const percentage = Math.floor((1 / todos.length) * 100);
      cy.get("#progress-bar").contains(`${percentage}%`);
      cy.markFirstCompleted();
      cy.markFirstCompleted();
      cy.get("#progress-bar").contains("100%");
    });
  });

  it("should hide progress when no active todo", () => {
    cy.get("#progress-bar").should("not.exist");
  });
});

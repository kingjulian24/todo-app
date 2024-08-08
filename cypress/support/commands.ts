/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// cypress/support/commands.ts

interface TodoOptions {
  title: string;
  desc: string;
  priority: string;
  tag: string;
  comment: string;
}

const fillTodoForm = ({ title, desc, priority, tag, comment }: TodoOptions) => {
  cy.get('[name="title"]').type(title);
  cy.get('[name="desc"]').type(desc);
  cy.get('[name="priority"]').select(priority);
  cy.get('[name="tag"]').type(tag);
  cy.get("#add-tag-btn").click();
  cy.get('[name="comment"]').type(comment);
  cy.get("#add-comment-btn").click();
  cy.get("#save-todo-btn").click();
};

const closeTodoForm = () => cy.get("#close-add-todo-btn").click();

Cypress.Commands.add("addTodo", (options: TodoOptions) => {
  cy.get("#add-todo-btn").click();
  cy.get("#todo-details").contains("Show detailed form").click();
  fillTodoForm(options);
  closeTodoForm();
});

Cypress.Commands.add("addMultipleTodos", (todos: TodoOptions[]) => {
  cy.get("#add-todo-btn").click();
  cy.get("#todo-details").contains("Show detailed form").click();
  todos.forEach(fillTodoForm);
  cy.get("#close-add-todo-btn").click();
});

Cypress.Commands.add("toggleMenu", () => {
  cy.get("#toggle-menu-btn").click();
});
Cypress.Commands.add("toggleSort", () => {
  cy.get("aside").contains("Sort by priority").click();
});

Cypress.Commands.add("closeTodoForm", () => {
  closeTodoForm();
});

Cypress.Commands.add("shouldHavePriority", (priority: string) => {
  cy.get('[name="priority"]')
    .find("option:selected")
    .should("have.text", priority);
});

Cypress.Commands.add("validateSortByPriority", (todos: [], mobile = true) => {
  cy.addMultipleTodos(todos);
  const editFirstTodo = () => {
    cy.get(".todo-item").first().click();
    cy.get("#todo-details").contains("Edit").click();
  };
  if (mobile) {
    cy.toggleMenu();
  }

  cy.toggleSort();
  editFirstTodo();
  cy.shouldHavePriority("High");
  cy.closeTodoForm();

  cy.toggleSort();
  editFirstTodo();
  cy.shouldHavePriority("Low");
  cy.closeTodoForm();
});

Cypress.Commands.add("validateToggleComplete", (todos: [], mobile = true) => {
  cy.addMultipleTodos(todos);
  if (mobile) {
    cy.toggleMenu();
  }
  const firstBtn = cy.get(".toggle-complete-btn").first();
  firstBtn.click();
  firstBtn.find("svg").should("have.class", "text-green-500");

  cy.get("aside").contains("Hide Completed").click();
  cy.get(".todo-item").should("have.length", todos.length - 1);

  cy.get("aside").contains("Show All").click();
  cy.get(".todo-item").should("have.length", todos.length);

  cy.get(".todo-item")
    .last()
    .find("svg")
    .should("have.class", "text-green-500");
});

Cypress.Commands.add("validateToggleHistory", (todos: [], mobile = true) => {
  cy.addMultipleTodos(todos);
  if (mobile) {
    cy.toggleMenu();
  }
  cy.get(".archive-btn").first().click();
  cy.get(".archive-btn").first().click();
  cy.get(".todo-item").should("have.length", todos.length - 2);
  cy.get("aside").contains("Show History").click();
  cy.get(".todo-item").should("have.length", 2);
  cy.get(".archive-btn").first().click();
  cy.get(".todo-item").should("have.length", 1);
  cy.get(".archive-btn").first().click();
  cy.get("aside").contains("Hide History").click();
  cy.get(".todo-item").should("have.length", todos.length);
});
Cypress.Commands.add("validateArchiveCompleted", (todos: [], mobile = true) => {
  cy.addMultipleTodos(todos);
  if (mobile) {
    cy.toggleMenu();
  }

  cy.get("aside").contains("Archive All").click();
  cy.get("aside").contains("Show History").click();
  cy.get(".todo-item").should("have.length", todos.length);
});

Cypress.Commands.add("validateArchiveAll", (todos, mobile = true) => {
  cy.addMultipleTodos(todos);
  if (mobile) {
    cy.toggleMenu();
  }
  cy.get(".toggle-complete-btn").first().click();
  cy.get("aside").contains("Archive Completed").click();
  cy.get(".todo-item").should("have.length", todos.length - 1);
  cy.get("aside").contains("Show History").click();
  cy.get(".todo-item").should("have.length", 1);
});

Cypress.Commands.add("validateDeleteAllTodos", (todos, mobile = true) => {
  cy.addMultipleTodos(todos);

  if (mobile) {
    cy.toggleMenu();
  }

  cy.get("aside").contains("Delete All").click();
  cy.get("#add-todo-btn").should("have.class", "animate-pulse");
  cy.get("main").contains("Add New To-do");
});

Cypress.Commands.add("searchTodos", (todos) => {
  const data = todos.slice(0, 2);
  cy.addMultipleTodos(data);
  cy.get(".todo-item").should("have.length", data.length);

  cy.get('[name="search"]').type("milk");
  cy.get(".todo-item").should("have.length", 1);
  cy.get('[name="search"]').clear();
  cy.get('[name="search"]').type("e");
  cy.get(".todo-item").should("have.length", data.length - 1);
});

Cypress.Commands.add("notHaveCallToAction", () => {
  cy.addTodo({
    title: "Buy milk",
    desc: "Get milk from store",
    priority: "Medium",
    tag: "Shopping",
    comment: "Make sure to get whole milk",
  });

  cy.get("#add-todo-btn").should("not.have.class", "animate-pulse");
  cy.get("main").should("not.contain", "Add New To-do");
});

Cypress.Commands.add("haveCallToAction", () => {
  cy.get("#add-todo-btn").should("have.class", "animate-pulse");
  cy.get("main").contains("Add New To-do");
});

Cypress.Commands.add("createNewTodo", () => {
  const todoOptions = {
    title: "Buy milk",
    desc: "Get milk from store",
    priority: "Medium",
    tag: "Shopping",
    comment: "Make sure to get whole milk",
  };

  cy.addTodo(todoOptions);
  cy.get("main").contains(todoOptions.title);
});

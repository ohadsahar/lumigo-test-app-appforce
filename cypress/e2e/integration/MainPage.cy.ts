import { DateProps } from "interfaces/date_props.interface";

describe("Renders Main page of app", () => {
  let time: number = 500;
  const lengthOfItems = 5;
  const tasksRepeatableClass =
    '[data-cy="task-list-wrapper"] > [data-cy="task-list-items"]';

  it("Renders correctly", () => {
    cy.visit("/");
  });

  it("Testing date", () => {
    const dateRepeatableClass =
      '[data-cy="cy-header"]> [data-cy="cy-header-date-wrapper"]';
    const today = new Date(Date.now());
    const convertedDate: DateProps = {
      day: today.getDate(),
      month: today.toLocaleString("default", { month: "long" }),
      year: today.getFullYear(),
      currentDay: today.toLocaleString("default", { weekday: "long" }),
    };

    cy.get(
      `${dateRepeatableClass} > [data-cy="cy-header-day-wrapper"] >[data-cy="cy-header-day"]`
    ).should("have.text", convertedDate.day);
    cy.get(
      `${dateRepeatableClass}> [data-cy="cy-header-month-year-wrapper"]  > [data-cy="cy-header-month"]`
    ).should("have.text", convertedDate.month);
    cy.get(
      `${dateRepeatableClass}> [data-cy="cy-header-month-year-wrapper"] > [data-cy="cy-header-year"]`
    ).should("have.text", convertedDate.year);
    cy.get('[data-cy="cy-header"]> [data-cy="cy-header-day-name"]').should(
      "have.text",
      convertedDate.currentDay
    );
  });

  it("Testing CRUD on 1 Task", () => {
    cy.get('[data-cy="task-input-field"]').type("Item 1");
    cy.get('[data-cy="create-task"]').click();
    cy.wait(time);
    cy.get(
      '[data-cy="created-tasks-list"]> [data-cy="task-list-wrapper"] > [data-cy="task-list-items"]'
    )
      .children()
      .should("have.length", 1);
    cy.get('[data-cy="task-title"]').should("have.text", "Item 1");
    cy.get('[data-cy="pause-task"]').click();
    cy.wait(time);
    cy.get('[data-cy="finish-task"]').click();
    cy.wait(time);
    cy.get('[data-cy="remove-task"]').click();
  });

  it(`Testing Local storage and CRUD on ${lengthOfItems} tasks`, () => {
    for (let i = 0; i < lengthOfItems; i++) {
      cy.get('[data-cy="task-input-field"]').type(`Item ${i + 1}`);
      cy.get('[data-cy="create-task"]').click();
    }
    cy.reload();
    cy.wait(time);
    cy.get(`[data-cy="created-tasks-list"]>${tasksRepeatableClass}`)
      .children()
      .should("have.length", lengthOfItems);

    cy.get(`[data-cy="created-tasks-list"] > ${tasksRepeatableClass}`)
      .children()
      .each(($el, index) => {
        expect($el).to.have.text(`Item ${index + 1}`);
        if (index === 3 || index === 4) {
          cy.wrap($el).get('[data-cy="pause-task"]').first().click();
        } else {
          cy.wrap($el).get('[data-cy="finish-task"]').first().click();
        }
        cy.wait(time);
      });
    cy.get(`[data-cy="created-tasks-list"]> ${tasksRepeatableClass}`)
      .children()
      .should("have.length", 0);
    cy.get(`[data-cy="do-later-tasks-list"]> ${tasksRepeatableClass}`)
      .children()
      .should("have.length", 2);
    cy.get(`[data-cy="finished-tasks-list"]> ${tasksRepeatableClass}`)
      .children()
      .should("have.length", 3);
  });

  it("Testing search", () => {
    cy.clearLocalStorage();
    cy.reload();
    cy.get(`[data-cy="created-tasks-list"]> ${tasksRepeatableClass}`)
      .children()
      .should("have.length", 0);
    cy.get(`[data-cy="do-later-tasks-list"]> ${tasksRepeatableClass}`)
      .children()
      .should("have.length", 0);
    cy.get(`[data-cy="finished-tasks-list"]> ${tasksRepeatableClass}`)
      .children()
      .should("have.length", 0);
    for (let i = 0; i < lengthOfItems; i++) {
      cy.get('[data-cy="task-input-field"]').type(`Item ${i + 1}`);
      cy.get('[data-cy="create-task"]').click();
    }
    cy.get('[data-cy="search-tasks"]').type(`Ohad Sahar`);
    cy.get(`[data-cy="created-tasks-list"]> ${tasksRepeatableClass}`)
      .children()
      .should("have.length", 0);
    cy.get(`[data-cy="do-later-tasks-list"]> ${tasksRepeatableClass}`)
      .children()
      .should("have.length", 0);
    cy.get(`[data-cy="finished-tasks-list"]> ${tasksRepeatableClass}`)
      .children()
      .should("have.length", 0);
    cy.wait(0);
    cy.get('[data-cy="search-tasks"]').clear();

    cy.get(`[data-cy="created-tasks-list"] > ${tasksRepeatableClass}`)
      .children()
      .each(($el, index) => {
        index === 2
          ? cy.wrap($el).get('[data-cy="pause-task"]').first().click()
          : cy.wrap($el).get('[data-cy="finish-task"]').first().click();
        cy.wait(time);
      });
    cy.get('[data-cy="search-tasks"]').type(`Item 3`);
    cy.get(`[data-cy="created-tasks-list"]> ${tasksRepeatableClass}`)
      .children()
      .should("have.length", 0);
    cy.get(`[data-cy="do-later-tasks-list"]> ${tasksRepeatableClass}`)
      .children()
      .should("have.length", 1);
    cy.get(`[data-cy="finished-tasks-list"]> ${tasksRepeatableClass}`)
      .children()
      .should("have.length", 0);
    cy.get('[data-cy="search-tasks"]').clear();
  });

  it("Testing Reset Progress", () => {
    cy.wait(2000);
    cy.get(`[data-cy="cy-footer"]> [data-cy="cy-app-title"]`).click();
  });
});

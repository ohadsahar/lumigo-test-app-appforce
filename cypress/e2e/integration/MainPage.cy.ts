import { DateProps } from "interfaces/date_props.interface";

describe("Renders Main page of app", () => {
  let time: number = 0;
  const lengthOfItems = 5;
  const tasksRepeatableClass =
    '[data-testid="task-list-box"] > [data-testid="task-list-items"]';

  it("Renders correctly", () => {
    cy.visit("/");
  });

  it("Testing date", () => {
    const dateRepeatableClass =
      '[data-testid="header-box"]> [data-testid="header-date-wrapper"]';
    const today = new Date(Date.now());
    const convertedDate: DateProps = {
      day: today.getDate(),
      month: today.toLocaleString("default", { month: "long" }),
      year: today.getFullYear(),
      currentDay: today.toLocaleString("default", { weekday: "long" }),
    };
    cy.get(
      `${dateRepeatableClass} > [data-testid="header-day-wrapper"] >[data-testid="header-day"]`
    ).should("have.text", convertedDate.day);
    cy.get(
      `${dateRepeatableClass}> [data-testid="header-month-year-wrapper"]  > [data-testid="header-month"]`
    ).should("have.text", convertedDate.month);
    cy.get(
      `${dateRepeatableClass}> [data-testid="header-month-year-wrapper"] > [data-testid="header-year"]`
    ).should("have.text", convertedDate.year);
    cy.get(
      '[data-testid="header-box"]> [data-testid="header-day-name"]'
    ).should("have.text", convertedDate.currentDay);
  });

  it("Testing CRUD on 1 Task", () => {
    cy.get('[data-testid="task-input-field"]').type("Item 1");
    cy.get('[data-testid="create-task"]').click();
    cy.wait(time);
    cy.get(
      '[data-testid="created-tasks-list"]> [data-testid="task-list-box"] > [data-testid="task-list-items"]'
    )
      .children()
      .should("have.length", 1);
    cy.get('[data-testid="task-title"]').should("have.text", "Item 1");
    cy.get('[data-testid="pause-task"]').click();
    cy.wait(time);
    cy.get('[data-testid="finish-task"]').click();
    cy.wait(time);
    cy.get('[data-testid="remove-task"]').click();
  });

  it(`Testing Local storage and CRUD on ${lengthOfItems} tasks`, () => {
    for (let i = 0; i < lengthOfItems; i++) {
      cy.get('[data-testid="task-input-field"]').type(`Item ${i + 1}`);
      cy.get('[data-testid="create-task"]').click();
    }
    cy.reload();
    cy.wait(time);
    cy.get(`[data-testid="created-tasks-list"] > ${tasksRepeatableClass}`)
      .children()
      .should("have.length", lengthOfItems);

    cy.get(`[data-testid="created-tasks-list"] > ${tasksRepeatableClass}`)
      .children()
      .each(($el, index) => {
        expect($el).to.have.text(`Item ${index + 1}`);
        if (index === 3 || index === 4) {
          cy.wrap($el).get('[data-testid="pause-task"]').first().click();
        } else {
          cy.wrap($el).get('[data-testid="finish-task"]').first().click();
        }
        cy.wait(time);
      });
    cy.get(`[data-testid="created-tasks-list"]> ${tasksRepeatableClass}`)
      .children()
      .should("have.length", 0);
    cy.get(`[data-testid="do-later-tasks-list"]> ${tasksRepeatableClass}`)
      .children()
      .should("have.length", 2);
    cy.get(`[data-testid="finished-tasks-list"]> ${tasksRepeatableClass}`)
      .children()
      .should("have.length", 3);
  });

  it("Testing search", () => {
    cy.clearLocalStorage();
    cy.reload();
    cy.get(`[data-testid="created-tasks-list"]> ${tasksRepeatableClass}`)
      .children()
      .should("have.length", 0);
    cy.get(`[data-testid="do-later-tasks-list"]> ${tasksRepeatableClass}`)
      .children()
      .should("have.length", 0);
    cy.get(`[data-testid="finished-tasks-list"]> ${tasksRepeatableClass}`)
      .children()
      .should("have.length", 0);
    for (let i = 0; i < lengthOfItems; i++) {
      cy.get('[data-testid="task-input-field"]').type(`Item ${i + 1}`);
      cy.get('[data-testid="create-task"]').click();
    }
    cy.get('[data-testid="search-tasks"]').type(`Ohad Sahar`);
    cy.get(`[data-testid="created-tasks-list"]> ${tasksRepeatableClass}`)
      .children()
      .should("have.length", 0);
    cy.get(`[data-testid="do-later-tasks-list"]> ${tasksRepeatableClass}`)
      .children()
      .should("have.length", 0);
    cy.get(`[data-testid="finished-tasks-list"]> ${tasksRepeatableClass}`)
      .children()
      .should("have.length", 0);
    cy.wait(0);
    cy.get('[data-testid="search-tasks"]').clear();

    cy.get(`[data-testid="created-tasks-list"] > ${tasksRepeatableClass}`)
      .children()
      .each(($el, index) => {
        index === 2
          ? cy.wrap($el).get('[data-testid="pause-task"]').first().click()
          : cy.wrap($el).get('[data-testid="finish-task"]').first().click();
        cy.wait(time);
      });
    cy.get('[data-testid="search-tasks"]').type(`Item 3`);
    cy.get(`[data-testid="created-tasks-list"]> ${tasksRepeatableClass}`)
      .children()
      .should("have.length", 0);
    cy.get(`[data-testid="do-later-tasks-list"]> ${tasksRepeatableClass}`)
      .children()
      .should("have.length", 1);
    cy.get(`[data-testid="finished-tasks-list"]> ${tasksRepeatableClass}`)
      .children()
      .should("have.length", 0);
    cy.get('[data-testid="search-tasks"]').clear();
  });

  it("Testing Reset Progress", () => {
    cy.wait(2000);
    cy.get(`[data-testid="footer-box"]> [data-testid="app-title-box"]`).click();
  });
});

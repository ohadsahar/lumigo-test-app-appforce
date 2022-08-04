import { DateProps } from "interfaces/date_props.interface";

describe("Renders Main page of app", () => {
  const lengthOfItems = 5;
  it("Renders correctly", () => {
    cy.visit("/");
  });

  it("Testing date, Checking if the current date that shown on dom is the same like I created over here", () => {
    const today = new Date(Date.now());
    const convertedDate: DateProps = {
      day: today.getDate(),
      month: today.toLocaleString("default", { month: "long" }),
      year: today.getFullYear(),
      currentDay: today.toLocaleString("default", { weekday: "long" }),
    };
    cy.findByTestId("header-day").should("have.text", convertedDate.day);
    cy.findByTestId("header-month").should("have.text", convertedDate.month);
    cy.findByTestId("header-year").should("have.text", convertedDate.year);
    cy.findByTestId("header-day-name").should(
      "have.text",
      convertedDate.currentDay
    );
  });

  it("Testing CRUD on 1 Task", () => {
    cy.findByTestId("task-input-field").type("Item 1");
    cy.findByTestId("create-task").click();
    cy.findByTestId("created-tasks-list").children().should("have.length", 1);
    cy.findByTestId("task-title").should("have.text", "Item 1");
    cy.findByTestId("pause-task").click();
    cy.findByTestId("finish-task").click();
    cy.findByTestId("remove-task").click();
    cy.findByTestId("created-tasks-list").children().should("have.length", 0);
  });

  it(`Testing CRUD on ${lengthOfItems} tasks`, () => {
    for (let i = 0; i < lengthOfItems; i++) {
      cy.findByTestId("task-input-field")
        .clear()
        .type(`Item ${i + 1}`);
      cy.findByTestId("create-task").click();
    }

    cy.findByTestId("created-tasks-list")
      .children()
      .should("have.length", lengthOfItems);

    cy.findByTestId("created-tasks-list")
      .children()
      .each(($el, index) => {
        expect($el).to.have.text(`Item ${index + 1}`);
        if (index === 3 || index === 4) {
          cy.wrap($el).findByTestId("pause-task").first().click();
        } else {
          cy.wrap($el).findByTestId("finish-task").first().click();
        }
      });
    cy.findByTestId("created-tasks-list").children().should("have.length", 0);
    cy.findByTestId("do-later-tasks-list").children().should("have.length", 2);
    cy.findByTestId("finished-tasks-list").children().should("have.length", 3);
  });

  it("Testing search", () => {
    cy.clearLocalStorage();
    cy.reload();
    cy.findByTestId("created-tasks-list").children().should("have.length", 0);
    cy.findByTestId("do-later-tasks-list").children().should("have.length", 0);
    cy.findByTestId("finished-tasks-list").children().should("have.length", 0);
    for (let i = 0; i < lengthOfItems; i++) {
      cy.findByTestId("task-input-field").type(`Item ${i + 1}`);
      cy.findByTestId("create-task").click();
    }
    cy.findByTestId("search-tasks").type(`Ohad Sahar`);
    cy.findByTestId("created-tasks-list").children().should("have.length", 0);
    cy.findByTestId("do-later-tasks-list").children().should("have.length", 0);
    cy.findByTestId("finished-tasks-list").children().should("have.length", 0);
    cy.findByTestId("search-tasks").clear();
    cy.findByTestId("created-tasks-list")
      .children()
      .each(($el, index) => {
        if (index === 2) {
          cy.wrap($el).findByTestId("pause-task").first().click();
        } else {
          cy.wrap($el).findByTestId("finish-task").first().click();
        }
      });
    cy.findByTestId("search-tasks").type(`Item 3`);
    cy.findByTestId("created-tasks-list").children().should("have.length", 0);
    cy.findByTestId("do-later-tasks-list").children().should("have.length", 1);
    cy.findByTestId("finished-tasks-list").children().should("have.length", 0);
    cy.findByTestId("search-tasks").clear();
  });

  it("Testing Reset Progress", () => {
    cy.findByTestId("footer-title").click();
  });
});

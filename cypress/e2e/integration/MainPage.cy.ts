import { LocalStorageKeys } from "@/constants/LocalStorageKeys";
import { LocalStorageService } from "@/services/LocalStorage.service";
import { DateProps } from "models/AppDate.model";

const lengthOfItems = 5;
let tasksCounter = 0;
let createdTasksCounter = 0;
let finishedTasksCounter = 0;
let doLaterTasksCounter = 0;

describe("Full testing of all app functionality", () => {
  it(`Test No. 1 In this test we will actually check that the application loads properly`, () => {
    cy.visit("/");
  });

  it(`Test NO. 2 Testing date, Checking if the current date that shown on dom is the same like I created in the test function`, () => {
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

  it("Test NO. 3 Testing CRUD operation on task (Create,Delete,Edit, Update)", () => {
    cy.findByTestId("task-input-field").type("Item 1");
    cy.findByTestId("create-task").click();
    tasksCounter++;
    cy.findByTestId("created-tasks-list")
      .children()
      .should("have.length", tasksCounter);
    cy.findByTestId("task-title").should("have.text", "Item 1");
    cy.findByTestId("pause-task").click();
    cy.findByTestId("finish-task").click();
    cy.findByTestId("remove-task").click();
    tasksCounter--;
    cy.findByTestId("created-tasks-list")
      .children()
      .should("have.length", tasksCounter);
  });

  it(`Test NO. 4 Testing CRUD on ${lengthOfItems} tasks(Create,Delete,Edit, Update)`, () => {
    for (let i = 0; i < lengthOfItems; i++) {
      cy.findByTestId("task-input-field")
        .clear()
        .type(`Item ${i + 1}`);
      cy.findByTestId("create-task").click();
      createdTasksCounter++;
    }
    cy.findByTestId("created-tasks-list")
      .children()
      .should("have.length", createdTasksCounter);
    cy.findByTestId("created-tasks-list")
      .children()
      .each(($el, index) => {
        expect($el).to.have.text(`Item ${index + 1}`);
        if (index === 3 || index === 4) {
          doLaterTasksCounter++;
          cy.wrap($el).findByTestId("pause-task").first().click();
        } else {
          finishedTasksCounter++;
          cy.wrap($el).findByTestId("finish-task").first().click();
        }
        createdTasksCounter--;
      })
      .then(() => {
        cy.findByTestId("created-tasks-list")
          .children()
          .should("have.length", createdTasksCounter);
        cy.findByTestId("do-later-tasks-list")
          .children()
          .should("have.length", doLaterTasksCounter);
        cy.findByTestId("finished-tasks-list")
          .children()
          .should("have.length", finishedTasksCounter);
      });
  });

  it("Test NO. 5 Testing Search functionality(Using magic numbers because I'm expecting for constant values)", () => {
    const notFoundTasksLength = 0;
    const foundedTasksLength = 1;
    cy.clearLocalStorage();
    for (let i = 0; i < lengthOfItems; i++) {
      cy.findByTestId("task-input-field")
        .clear()
        .type(`Item ${i + 1}`);
      cy.findByTestId("create-task").click();
    }
    cy.findByTestId("search-tasks").type(`Ohad Sahar`);
    cy.findByTestId("created-tasks-list");
    cy.findByTestId("created-tasks-list")
      .children()
      .should("have.length", notFoundTasksLength);
    cy.findByTestId("do-later-tasks-list")
      .children()
      .should("have.length", notFoundTasksLength);
    cy.findByTestId("finished-tasks-list")
      .children()
      .should("have.length", notFoundTasksLength);
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
    cy.findByTestId("created-tasks-list")
      .children()
      .should("have.length", notFoundTasksLength);
    cy.findByTestId("do-later-tasks-list")
      .children()
      .should("have.length", foundedTasksLength);
    cy.findByTestId("finished-tasks-list")
      .children()
      .should("have.length", foundedTasksLength);
    cy.findByTestId("search-tasks").clear();
  });

  it("Test NO. 6 Testing Local Storage functionality(Clear, Add)", () => {
    cy.clearLocalStorage();
    cy.reload();
    expect(localStorage.getItem(LocalStorageKeys.Tasks)).to.be.null;
    for (let i = 0; i < lengthOfItems; i++) {
      cy.findByTestId("task-input-field").type(`Item ${i + 1}`);
      cy.findByTestId("create-task").click();
    }
    cy.getLocalStorage(LocalStorageKeys.Tasks).then((result: string | null) => {
      if (result) {
        const tasks = JSON.parse(result);
        expect(tasks.length).to.equal(lengthOfItems);
        tasks.pop(1, 1);
        cy.clearLocalStorage();
        cy.setLocalStorage(LocalStorageKeys.Tasks, JSON.stringify(tasks));
      }
    });
    cy.getLocalStorage(LocalStorageKeys.Tasks).then((result: string | null) => {
      if (result) {
        const tasks = JSON.parse(result);
        expect(tasks.length).to.equal(lengthOfItems - 1);
      }
    });
    cy.clearLocalStorage();
    expect(localStorage.getItem(LocalStorageKeys.Tasks)).to.be.null;
  });

  it("Test NO. 7 Testing the functionality of Reset Progress(When press reset progress we are expecting to get no list at all)", () => {
    cy.findByTestId("footer-title").click();
  });
});

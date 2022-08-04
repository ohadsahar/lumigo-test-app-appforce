describe("Renders Main page of app", () => {
  let time: number = 0;
  const lengthOfItems = 5;

  it("Renders correctly", () => {
    cy.visit("/");
  });

  it("Testing CRUD Operations on 1 Task", () => {
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

  it(`Testing localstorage and crud operations on ${lengthOfItems} tasks`, () => {
    for (let i = 0; i < lengthOfItems; i++) {
      cy.get('[data-cy="task-input-field"]').type(`Item ${i + 1}`);
      cy.get('[data-cy="create-task"]').click();
    }
    cy.reload();
    cy.wait(time);
    cy.get(
      '[data-cy="created-tasks-list"]> [data-cy="task-list-wrapper"] > [data-cy="task-list-items"]'
    )
      .children()
      .should("have.length", lengthOfItems);

    cy.get(
      '[data-cy="created-tasks-list"] > [data-cy="task-list-wrapper"] > [data-cy="task-list-items"]'
    )
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
    cy.get(
      '[data-cy="created-tasks-list"]> [data-cy="task-list-wrapper"] > [data-cy="task-list-items"]'
    )
      .children()
      .should("have.length", 0);
    cy.get(
      '[data-cy="do-later-tasks-list"]> [data-cy="task-list-wrapper"] > [data-cy="task-list-items"]'
    )
      .children()
      .should("have.length", 2);
    cy.get(
      '[data-cy="finished-tasks-list"]> [data-cy="task-list-wrapper"] > [data-cy="task-list-items"]'
    )
      .children()
      .should("have.length", 3);
  });
});

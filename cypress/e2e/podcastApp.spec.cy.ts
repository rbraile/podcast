describe("podcast app spec", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait(20000);
  });
  it("should load 100 podcast list", () => {
    cy.get('[data-testid="counter"]').should("have.text", "100");
  });

  it("should click in a podcast and navigate to the podcast detail page", () => {
    cy.get('[data-testid="podcastList"] li')
      .first()
      .children("div")
      .children("a")
      .click({ force: true });

    cy.url().should("include", "/podcast");
  });

  it("should show podcast detail page", () => {
    cy.get('[data-testid="podcastList"] li')
      .first()
      .children("div")
      .children("a")
      .click({ force: true });

    cy.wait(10000);

    cy.get("h2").contains("Episodes");
    cy.get('[data-testid="episodeList"]')
      .find("li")
      .its("length")
      .should("be.greaterThan", 0);
  });

  it("should show episode page", () => {
    cy.get('[data-testid="podcastList"] li')
      .first()
      .children("div")
      .children("a")
      .click({ force: true });
    cy.wait(10000);

    cy.get('[data-testid="episodeList"]')
      .find("li")
      .eq(1)
      .click({ force: true });
    cy.wait(10000);

    cy.url().should("include", "/episode");
    cy.get('[data-testid="audioPlayer"]').should("exist");
  });

  it("should the navigation work correctly when the differents link are clicked", () => {
    // check back to home link
    cy.get('[data-testid="podcastList"] li')
      .first()
      .children("div")
      .children("a")
      .click({ force: true });
    cy.wait(10000);
    cy.get('[data-testid="backToHome"]').click();
    cy.wait(10000);

    cy.url().should("equal", Cypress.config().baseUrl + "/");

    // check back to podcast detail
    cy.get('[data-testid="podcastList"] li')
      .first()
      .children("div")
      .children("a")
      .click({ force: true });
    cy.wait(10000);

    cy.get('[data-testid="episodeList"]')
      .find("li")
      .eq(1)
      .click({ force: true });
    cy.wait(10000);

    cy.get('[data-testid="episodePage"]').should("exist");
    cy.get('[data-testid="backToPodcastList"]').click({ force: true });
    cy.wait(10000);
    cy.get('[data-testid="podcastDetail"]').should("exist");
  });

  it("should filter", () => {
    cy.get('[data-testid="counter"]').should("have.text", "100");

    cy.get('[data-testid="search"]').type("h");
    cy.get('[data-testid="counter"]').should("have.text", "74");
  });
});

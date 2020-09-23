import { siteUrl } from "../common";

describe('Site', () => {
  beforeEach(() => {
    cy.visit(siteUrl)
  })

  it('should display the Typo brand', () => {
    cy.contains('Typo').should('exist')
  })
})
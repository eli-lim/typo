import { siteUrl } from "../common";

describe('Site', () => {
  beforeEach(() => {
    cy.visit(siteUrl)
  })

  it('should display the Typo brand', () => {
    cy.contains('typo').should('exist')
  })

  it('should show credit to typings.gg', () => {
    cy.get('a[href*="typings.gg"]').should('exist')
  })

  it('should display footer', () => {
    cy.get('footer').should('exist')
  })

  // it('should display github repo badge', { includeShadowDom: true }, () => {
  //   cy.get('a[href*="github.com/elihuansen"]').should('exist')
  // })
})
describe('@cypress/puppeteer demo', () => {
  it('goes from one tab to another then comes back for assertion', () => {
    cy.visit('https://dev.to/walmyrlimaesilv')

    cy.contains('a', 'https://walmyr.dev').click()

    cy.puppeteer('switchTabAndGetContent')
      .should('equal', "Here's a brief of my history")
  })
})

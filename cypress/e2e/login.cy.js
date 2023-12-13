describe('Login', () => {
  it('logs in successfully', () => {
    cy.visit('./src/index.html')

    cy.contains('a', 'Login').click()

    cy.puppeteer('switchToTabAndLogin')
  })
})

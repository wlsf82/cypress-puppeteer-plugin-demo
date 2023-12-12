const { defineConfig } = require('cypress')

const { setup, retry } = require('@cypress/puppeteer')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      setup({
        on,
        onMessage: {
          async switchToTabAndGetContent (browser) {
            // In this message handler, we utilize the Puppeteer API to interact with the browser and the new tab that our Cypress tests has opened

            // Utilize the retry since the page may not have opened and loaded by the time this runs
            const page = await retry(async () => {
              // The browser will (eventually) have 2 tabs open: the Cypress tab and the newly opened tab
              // In Puppeteer, tabs and windows are called pages
              const pages = await browser.pages()
              // Try to find the page we want to interact with
              const page = pages.find(page => page.url().includes('walmyr.dev'))

              // If we can't find the page, it probably hasn't loaded yet, so throw an error to signal that this function should retry
              if (!page) throw new Error('Could not find page')

              // Otherwise, return the page instance and it will be returned by the `retry` function itself
              return page
            })

            // Cypress will maintain focus on the Cypress tab within the browser. It's generally a good idea to bring the page to the front to interact with it.
            await page.bringToFront()

            const headingTwo = await page.waitForSelector('h2')
            const headingTwoText = await page.evaluate(el => el.textContent, headingTwo)

            // Clean up any references before finishing up
            headingTwo.dispose()

            await page.close()

            // Return the heading 2 text and it will be the value yielded by the `cy.puppeteer()` invocation in the spec
            return headingTwoText
          },
        },
      })

      return config
    },
  },
  fixturesFolder: false,
})

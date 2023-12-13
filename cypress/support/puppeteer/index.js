const { setup, retry } = require('@cypress/puppeteer')

module.exports = function puppeteerSetup(on) {
  setup({
    on,
    onMessage: {
      async switchToTabAndGetContent (browser) {
        const page = await retry(async () => {
          const pages = await browser.pages()
          const page = pages.find(page => page.url().includes('walmyr.dev'))

          if (!page) throw new Error('Could not find page')

          return page
        })

        await page.bringToFront()

        const headingTwo = await page.waitForSelector('h2')
        const headingTwoText = await page.evaluate(el => el.textContent, headingTwo)

        headingTwo.dispose()

        await page.close()

        return headingTwoText
      },
      async switchToTabAndLogin (browser) {
        const page = await retry(async () => {
          const pages = await browser.pages()
          const page = pages.find(page => page.url().includes('login.html'))

          if (!page) throw new Error('Could not find page')

          return page
        })

        await page.bringToFront()

        const loginButton = await page.waitForSelector('button')
        return loginButton.click()
      },
    },
  })
}

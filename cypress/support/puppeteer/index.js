const { setup, retry } = require('@cypress/puppeteer')

module.exports = function puppeteerSetup(on) {
  setup({
    on,
    onMessage: {
      async switchTabAndGetContent (browser) {
        const page = await pageRetrier(browser, 'walmyr.dev')

        await page.bringToFront()

        const headingTwo = await page.waitForSelector('h2')
        const headingTwoText = await page.evaluate(el => el.textContent, headingTwo)

        headingTwo.dispose()

        await page.close()

        return headingTwoText
      },
      async switchTabAndLogin (browser) {
        const page = await pageRetrier(browser, 'login.html')

        await page.bringToFront()

        const loginButton = await page.waitForSelector('button')

        return loginButton.click()
      },
    },
  })
}

async function pageRetrier(browser, url) {
  const page = await retry(async () => {
    const pages = await browser.pages()
    const page = pages.find(page => page.url().includes(url))

    if (!page) throw new Error('Could not find page')

    return page
  })

  return page
}

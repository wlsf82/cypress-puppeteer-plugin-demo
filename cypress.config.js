const { defineConfig } = require('cypress')

const puppeteerSetup = require('./cypress/support/puppeteer')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      puppeteerSetup(on)

      return {
        browsers: config.browsers.filter(browser => {
          return browser.family === 'chromium' && browser.name !== 'electron'
        })
      }
    },
  },
  fixturesFolder: false,
})

const { defineConfig } = require('cypress')

const puppeteerSetup = require('./cypress/support/puppeteer')

module.exports = defineConfig({
  projectId: 'u8w8pa',
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

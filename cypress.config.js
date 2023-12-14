const { defineConfig } = require('cypress')

const puppeteerSetup = require('./cypress/support/puppeteer')
const { getChromiumWebBrowsers } = require('./cypress/support/utils')

module.exports = defineConfig({
  projectId: 'u8w8pa',
  e2e: {
    setupNodeEvents(on, config) {
      puppeteerSetup(on)

      return getChromiumWebBrowsers(config)
    },
  },
  fixturesFolder: false,
})

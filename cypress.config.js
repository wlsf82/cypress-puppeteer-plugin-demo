const { defineConfig } = require('cypress')

const puppeteerSetup = require('./cypress/support/puppeteer/index')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      puppeteerSetup(on)

      return config
    },
  },
  fixturesFolder: false,
})

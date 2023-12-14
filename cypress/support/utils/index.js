module.exports = {
  getChromiumWebBrowsers(config) {
    return {
      browsers: config.browsers.filter(browser => {
        return browser.family === 'chromium' && browser.name !== 'electron'
      })
    }
  },
}

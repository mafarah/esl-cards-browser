// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

module.exports = {
  'loads the first cards': (browser) => {
    browser
      .init()
      .waitForElementVisible('#app')
      .assert.elementPresent('#cards-container')
      .assert.elementPresent('#search-input')
      .assert.elementPresent('#search-button')
      .waitForElementVisible('.loading')
      .waitForElementVisible('.image')
      .assert.elementCount('.image', 20)
      .end();
  },

  'loads cards with infinite scroll': (browser) => {
    browser
      .init()
      .waitForElementVisible('.image')
      .assert.elementCount('.image', 20)
      .execute('window.scrollTo(0,document.body.scrollHeight);')
      .waitForElementVisible('.loading')
      .assert.elementCount('.image', 40)
      .end();
  },

  'search for cards': (browser) => {
    browser
      .init()
      .waitForElementVisible('.image')
      .setValue('input#search-input', 'roll')
      .click('button#search-button')
      .assert.elementCount('.image', 0)
      .waitForElementVisible('.loading')
      .assert.elementCount('.image', 7)
      .end();
  },
};

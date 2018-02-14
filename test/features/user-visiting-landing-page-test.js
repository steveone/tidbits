const {assert} = require('chai');

describe(`User visits landing page`,()=>{
  describe (`user visits landing page when it's empty`,()=>{
    it('no videos are shown',()=>{
      //get main landindg page
      browser.url('/');
      //assert the vale of videos container is zero (empty)
      assert.equal(browser.getText('#videos-container'),'');
    })
  })
})

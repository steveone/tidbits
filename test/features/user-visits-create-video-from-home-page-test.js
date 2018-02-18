const {assert} = require('chai');

  describe(`user can navigate to the videos create page from home page`,()=>{
    it('user can get to the create video page',()=>{
      browser.url('/');
      browser.click('#create-video');
      assert.equal(browser.getText('#create-video-h1'),'Save a video');
    })
  })

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

  describe (`user visits landing page and videos show`,()=>{
    it('are shown on landing page',()=>{
      //get main landindg page
      const video = {
        title: 'Unit testing',
        description: 'What is Unit Testing',
        url: 'https://www.youtube.com/watch?v=lj5nnGa_DIw'
      }
      browser.url('/videos/create');
      browser.setValue('#title-input', video.title);
      browser.setValue('#description-input', video.description);
      browser.setValue('#url-input', video.url);
      browser.click('#submit-button');
      browser.url("/")
      assert.equal(browser.getText('.video-title'),video.title);

    })
  })

})

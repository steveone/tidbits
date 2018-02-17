const {assert} = require('chai');

  describe(`user adds video using create video page`,()=>{

    it('user can fill out the form to submit a new video',()=>{
      const video = {
        title: 'Unit testing',
        description: 'What is Unit Testing',
        url: 'https://www.youtube.com/watch?v=lj5nnGa_DIw'
      }
      browser.url('/videos/create.html');
      browser.setValue('#title-input', video.title);
      browser.setValue('#title-description', video.description);
      browser.setValue('#title-url', video.url);
      browser.click('#submit-button');
      assert.include(browser.getText('body'),video.title);
    })

  })

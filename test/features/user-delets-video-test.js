const {assert} = require('chai');

  describe(`user deletes video`,()=>{

    it('user deletes video using delete button and it is gone', ()=>{
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
      assert.include(browser.getText('body'),video.title);
      browser.click('#delete');
      assert.notInclude(browser.getText('body'),video.title);
    })

  })

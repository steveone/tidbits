const {assert} = require('chai');

  describe(`user can navigate to the videos create page and update a video`,()=>{
    describe('user can create a video and get to the edit page for the video',() =>{
    it('user can get to the update video page',()=>{
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
      browser.click('#edit');
    })

  describe('user can create a video and get to the edit page for the video',() =>{
    it('user can get to the update video page',()=>{
      const video = {
        title: 'Update test',
        description: 'What is Unit Testing',
        url: 'https://www.youtube.com/watch?v=lj5nnGa_DIw'
      }
      const updatedTitle = 'updated test succeeded';
      browser.url('/videos/create');
      browser.setValue('#title-input', video.title);
      browser.setValue('#description-input', video.description);
      browser.setValue('#url-input', video.url);
      browser.click('#submit-button');
      browser.click('#edit');
      browser.setValue('#title-input',updatedTitle);
      browser.click('#submit-button');
      assert.include(browser.getText('body'),updatedTitle);

    })
  })
})



})

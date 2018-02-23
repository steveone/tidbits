const {assert} = require('chai');

const {connectDatabaseAndDropData, disconnectDatabase} = require('../database-utilities');


  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

const video = {
  title: 'Unit testing',
  description: 'What is Unit Testing',
  url: 'https://www.youtube.com/watch?v=lj5nnGa_DIw'
}

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
    it('videos are shown on landing page',()=>{
      //get main landindg page

      browser.url('/videos/create');
      browser.setValue('#title-input', video.title);
      browser.setValue('#description-input', video.description);
      browser.setValue('#url-input', video.url);
      browser.click('#submit-button');
      browser.url("/")
      assert.equal(browser.getText('.video-title'),video.title);
    })

    it('vidoes are shown in iframe', ()=>{
      //get main landindg page

      browser.url('/videos/create');
      browser.setValue('#title-input', video.title);
      browser.setValue('#description-input', video.description);
      browser.setValue('#url-input', video.url);
      browser.click('#submit-button');
      browser.url('/videos/');
      assert.isNotNull(browser.getHTML('<iframe>'));
      //assert.equal(browser.element('iframe'),video.url);
    })

  })



})

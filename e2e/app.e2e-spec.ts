import { InterviewTestPage } from './app.po';

describe('interview-test App', function() {
  let page: InterviewTestPage;

  beforeEach(() => {
    page = new InterviewTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

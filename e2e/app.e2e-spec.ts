import { GithubFileHistoryPage } from './app.po';

describe('github-file-history App', function() {
  let page: GithubFileHistoryPage;

  beforeEach(() => {
    page = new GithubFileHistoryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

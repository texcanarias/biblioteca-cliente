import { Client4Page } from './app.po';

describe('client4 App', () => {
  let page: Client4Page;

  beforeEach(() => {
    page = new Client4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

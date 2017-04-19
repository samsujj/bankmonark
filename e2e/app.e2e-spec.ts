import { BankmonarkPage } from './app.po';

describe('bankmonark App', () => {
  let page: BankmonarkPage;

  beforeEach(() => {
    page = new BankmonarkPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

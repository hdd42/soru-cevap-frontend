import { KursSistemiPage } from './app.po';

describe('kurs-sistemi App', () => {
  let page: KursSistemiPage;

  beforeEach(() => {
    page = new KursSistemiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

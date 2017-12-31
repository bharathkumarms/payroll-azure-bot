import { PayrollAzureBotPage } from './app.po';

describe('payroll-azure-bot App', () => {
  let page: PayrollAzureBotPage;

  beforeEach(() => {
    page = new PayrollAzureBotPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

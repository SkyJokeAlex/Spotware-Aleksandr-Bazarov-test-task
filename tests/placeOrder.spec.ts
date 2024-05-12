import { test } from '@playwright/test';
import { BaseCtraderPage } from '../PageObject/Pages/BaseCtraderPage';
import { LogInDialog } from '../PageObject/Pages/Dialogs/LogInDialog';
import { TradeDialog } from '../PageObject/Pages/Dialogs/TradeDialog';
import { TradeWatchPanel } from '../PageObject/Pages/Panels/TradeWatchPanel';


test('Positions counter increments after order was placed', async ({ page }) => {
  const ctraderPage = new BaseCtraderPage(page);
  const logInDialog = new LogInDialog(page);
  const tradeDialog = new TradeDialog(page);
  const tradeWatchPanel = new TradeWatchPanel(page);

  await test.step('Open starting page and login', async () => {
    await ctraderPage.go();
    await ctraderPage.clickLoginButton();

    await logInDialog.assertDialogIsOpened();
    await logInDialog.clickLoginTabButton();
    await logInDialog.fillEmail('userForTest@spotware.com');
    await logInDialog.fillPassword('userForTest@spotware.com');
    await logInDialog.clickLoginDialogButton();

    await ctraderPage.assertUserIsLogedIn();
  })

  await test.step('Open "New Market Order" dialog window', async () => {
    await tradeWatchPanel.clickNewOrderbuttonButton();
    await tradeDialog.assertDialogIsOpened();
  })

  await test.step('Open "New Market Order" dialog window', async () => {
    //places pending order if market is closed
    await tradeDialog.forcePlaceOrder();
    await tradeDialog.dialogClose();
  })

  await test.step('Checks ', async () => {
    await tradeWatchPanel.assertPositionsCounter(1);
  })
});


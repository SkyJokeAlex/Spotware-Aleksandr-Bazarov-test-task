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

    await ctraderPage.assertUserIsLoggedIn();
  })

  await test.step('Open "New Market Order" dialog window', async () => {
    await tradeWatchPanel.clickNewOrderbuttonButton();
    await tradeDialog.assertDialogIsOpened();
  })

  const isOrderPlacedWhenMarketIsOpened = await test.step('Place an order', async () => {
    //places pending order if market is closed
    const wasMarketOpened = await tradeDialog.forcePlaceOrder();
    await tradeDialog.dialogClose();

    return wasMarketOpened
  })

  await test.step('Checks Positions counter equals 1', async () => {
    await tradeWatchPanel.assertPositionsCounter(1);
    
    if (isOrderPlacedWhenMarketIsOpened === false) {
      await tradeWatchPanel.assertOrdersCounter(1);
    }
  })
});


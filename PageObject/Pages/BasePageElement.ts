import { Page, expect } from '@playwright/test';

export abstract class BasePageElement {
  readonly page: Page;

  protected headerText: string;

  constructor(page: Page) {
    this.page = page;
  }

  public async assertPageOpened({timeout = 20_000} = {}) {
    await expect(this.page.locator('header'), `Assert ${this.headerText} page is opened`).toHaveText(
        new RegExp(this.headerText),
        {timeout},
    );

    return this;
  }
}
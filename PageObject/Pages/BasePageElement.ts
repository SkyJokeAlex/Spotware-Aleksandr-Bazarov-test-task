import { Page } from '@playwright/test';

export abstract class BasePageElement {
  readonly page: Page;
  

  constructor(page: Page) {
    this.page = page;
  }
}
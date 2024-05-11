import { Locator, expect } from "@playwright/test";

export const assertVisibleAndFill = async (
    locator: Locator,
    assertMessage: string,
    text: Parameters<Locator['fill']>[0],
    options?: Parameters<Locator['fill']>[1]
) => {
    await expect(locator, assertMessage).toBeVisible();
    await locator.fill(text,options);
};

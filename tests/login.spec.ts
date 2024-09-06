import { test, expect } from "@playwright/test";

test("logging in", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("name@company.com").fill("anthony@sexycode.io");
  await page.getByPlaceholder("Enter your password").fill("motivation12");
  await page
    .getByRole("button", {
      name: "Log In with Email",
    })
    .click();

  await expect(page.getByText("Customize your links")).toBeVisible();
});

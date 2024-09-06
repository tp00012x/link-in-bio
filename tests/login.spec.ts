import { test, expect } from "@playwright/test";

test("logging in", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle", timeout: 60000 });

  page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
  page.on("pageerror", (err) => console.log("PAGE ERROR:", err.message));

  // Log the page content to check if the page is rendered
  const pageContent = await page.content();
  console.log(pageContent);

  await page.getByPlaceholder("name@company.com").fill("anthony@sexycode.io");
  await page.getByPlaceholder("Enter your password").fill("motivation12");
  await page
    .getByRole("button", {
      name: "Log In with Email",
    })
    .click();

  await expect(page.getByText("Customize your linkldkjslkjs")).toBeVisible();
});

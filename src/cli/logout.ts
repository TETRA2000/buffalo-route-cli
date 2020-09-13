import { Browser } from 'puppeteer';
import { logoutUrl } from '../util/config';

export default async function (browser: Browser) {
  const page = await browser.newPage();
  await page.goto(logoutUrl);
}

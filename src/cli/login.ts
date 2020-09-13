import { Browser } from 'puppeteer';
import { loginPassword, loginUrl } from '../util/config';

export default async function (browser: Browser) {
  const page = await browser.newPage();
  await page.goto(loginUrl);

  await page.focus('#id_nosave_Password');
  await page.keyboard.type(loginPassword);

  await page.keyboard.press('Enter');
}

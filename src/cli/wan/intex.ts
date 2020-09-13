import { Browser, ElementHandle, Frame, Page } from 'puppeteer';
import { pppoeUrl } from '../../util/config';

async function navigateToWan(browser: Browser): Promise<Page> {
  const page = await browser.newPage();
  await page.goto(pppoeUrl, { waitUntil: 'networkidle2' });
  (await page.$('#sub_meu1_0'))?.click();

  // await page.evaluate(`() => {
  //   ChangeMenu2Css('wan.html', 'sub_meu1_0', '4', 'help_wan_port.html')}
  // `);

  // Wait for selection
  await page.waitForSelector('#sub_meu1_0.menu_selected', { timeout: 5000 });

  return page;
}

export async function getWan(browser: Browser) {
  const page = await navigateToWan(browser);

  await Promise.all(page.frames().map(async (frame) => {
    try {
      await frame.waitForSelector('#routeron', { timeout: 5000 });
    } catch (_) {
      // Ignore
      return;
    }

    console.log(frame.url());

    const element = await frame.$('#routeron');
    // TODO prettify
    const text = await (await element?.getProperty('textContent'))?.jsonValue();
    if (text) {
      console.log(text);
    }
  }));
}

export async function setWan(browser: Browser, mode: String) {
  const page = await navigateToWan(browser);

  let targetFrame: Frame | undefined;
  await Promise.all(page.frames().map(async (frame) => {
    try {
      await frame.waitForSelector('#id_WanMethod2', { timeout: 5000 });
    } catch (_) {
      // Ignore
      return;
    }
    targetFrame = frame;
  }));

  let modeSelector: string;
  switch (mode) {
    case 'pppoe':
      modeSelector = '#id_WanMethod2';
      break;
    case 'transix':
      modeSelector = '#id_WanMethod6';
      break;
    default:
      throw new Error(`Unknown mode ${mode}`);
  }

  const modeElm = await targetFrame!.$(modeSelector);
  await modeElm!.click();

  const btnElm = await targetFrame!.$('#wan_apply');
  await btnElm!.click();

  // TODO: remove
  await page.screenshot({ path: 'debug.png' });
}

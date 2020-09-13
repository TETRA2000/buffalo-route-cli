import './util/env';
const puppeteer = require('puppeteer');
import logout from './cli/logout';
import login from './cli/login';
import info from './cli/info';
import { getWan, setWan } from './cli/wan';

(async () => {
  const browser = await puppeteer.launch();
  await login(browser);
  // await getWan(browser);
  await setWan(browser, process.argv[2]);
  await logout(browser);
  await browser.close();
})();

export const adminUrlBase: string = process.env.ADMIN_URL_BASE as string;
export const loginUrl: string = (new URL('/login.html', adminUrlBase)).toString();
export const logoutUrl: string = (new URL('/logout.html', adminUrlBase)).toString();
export const infoUrl: string = (new URL('/info.html', adminUrlBase)).toString();
export const pppoeUrl: string = (new URL('/index_adv.html&item=5', adminUrlBase)).toString();
export const loginPassword: string = process.env.LOGIN_PASSWORD as string;

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin());


// change password
async function changePassword(account, password, newPasswd){
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {width: 1200, height: 700},
        ignoreDefaultArgs: ['--enable-automation', 'enable-blink-features-IdleDetection'],
        args: ['--window-size=1200,700'],
        slowMo: 30,
    });
    // 定义 sleep 函数
    const sleep = time => new Promise(resolve => setTimeout(resolve, time))

    // 开启浏览器
    const page = await browser.newPage();
    await page.goto('https://www.netflix.com');
    await page.click('div.our-story-header-wrapper > div > a');
    await page.waitForTimeout(3000)

    // login
    await page.type('.login-input-email > div > div > label > label', account);
    await page.type('.login-input-password > div > div > label > label', password)
    await page.click('div.hybrid-login-form-main > form > button')
    await page.waitForTimeout(5000)

    // change to account
    await page.goto('https://www.netflix.com/YourAccount',{
        waitUntil: 'networkidle0'
    })

    // click the button of change password
    await page.waitForXPath('//section/div[1]/div/div[2]/div[2]/a')
        .then((p)=>p.click())
    await page.waitForTimeout(3000);

    // 输入密码和新密码
    await page.type('#id_currentPassword', password);
    await page.type('#id_newPassword', newPasswd);
    await page.type('#id_confirmNewPassword', newPasswd)
    // 保存
    await page.click('#btn-save')
    await sleep(3000)

    // 关闭浏览器
    await browser.close();
    console.log(`success change ${account}'s password ${new Date()}`)
}


module.exports = {
    changePassword,
}
changePassword('2113@naifei.tax','enrd9qya','gk2r64xt')
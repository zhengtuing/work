const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin());


async function sendMail(myMail, myPassword, toMailAddress) {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {width: 1200, height: 700},
        // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        ignoreDefaultArgs: ['--enable-automation', 'enable-blink-features-IdleDetection'],
        args: ['--window-size=1200,700'],
        slowMo: 30,
    });
    const page = await browser.newPage();
    await page.goto('https://accounts.google.com',{
        waitUntil: 'networkidle0'
    });
    // 输入帐户
    await page.type('form input', myMail)
    // 点击下一步 ｜或这个xpath  //*[@id="identifierNext"]/div/button/div[3]
    await page.click('#identifierNext > div > button > div:nth-child(3)')
    await page.waitForTimeout(3000);

    // 输入密码
    await page.type('#password input', myPassword)
    // 点击下一步
    await page.click('#passwordNext button')
    await page.waitForTimeout(3000);

    // 以上步骤已完成登陆
    // 以下步骤为设置家庭组
    // 进入邀请家庭成员页面
    await page.goto('https://families.google.com/families/invite')
    await page.waitForTimeout(3000)

    // //点击邀请
    // await page.click('div circle')
    // await page.waitForTimeout(3000)
    // 点击输入邮箱的input
    await page.type('div input', toMailAddress)
    //点击发送使发送功能恢复正常
    await page.click('div.cFe0eb > span')
    await page.waitForTimeout(500)
    // // 点击发送
    await page.click('div.cFe0eb > span')
    await page.waitForTimeout(5000)
    // await browser.close();
    console.log(`success to send mail to ${toMailAddress} ${new Date()}`)
}
module.exports = {
    sendMail,
}
sendMail('2103@naifei.tax', 'abcd@1234', 'your1mail2@gmail.com')




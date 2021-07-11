const puppeteer = require('puppeteer');
const cheerio = require('cheerio');


(async () => {
    const browser = await puppeteer.launch()

    const page = await browser.newPage()
    await page.goto("https://archiveofourown.org/tags/Igarashi%20Sayaka*s*Momobami%20Kirari/works");

    await page.screenshot({path: "image.png"})

    const pageData = await page.evaluate(()=>{
        return {
            html: document.documentElement.innerHTML,
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    })
    const $ = cheerio.load(pageData.html)

    $("div[class='header module']").each((i, element) =>{
        const title = $(element)
            .find("h4")
            .children("a").eq(0)
            .text()
        const author = $(element)
            .find("h4")
            .children("a").eq(1)
            .text()
        const time = $(element)
            .find(".datetime")
            .text()
        const titleLink = $(element)
            .find("h4")
            .children("a").eq(0)
            .attr("href")
        let worksData = {
            title,
            titleLink,
            author, 
            time,
        }
       
        let now = new Date()
        let month = now.toLocaleString('default', {month: 'short'})
        let euroDate = now.getDate() + " " + month + " " + now.getFullYear()
        console.log(euroDate, "EURO", worksData.time, "WORKDATA")
        //if euroDate and worksdata.time ==
            //then compare worksdata.author to a list of authors from server
                //if they match, push title, link, author, and time up to an array
                //then have sayakabot push that array as an embed message 
        
    })
    
    await browser.close()
})();
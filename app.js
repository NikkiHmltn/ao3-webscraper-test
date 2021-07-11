const puppeteer = require('puppeteer');
const cheerio = require('cheerio');


const newWorks = [];

(async () => {
    //potentially wont work if running multiple times a day
    if (newWorks.length !== 0) {
        for(let i=0; i < newWorks.length; i++) {
            let now = new Date()
            let month = now.toLocaleString('default', {month: 'short'})
            let euroDate = now.getDate() + " " + month + " " + now.getFullYear()
            if (newWorks[i].time !== euroDate) {
                newWorks.splice(i, 1)
            }
        }
        // newWorks.splice(0, newWorks.length)
    }
    const browser = await puppeteer.launch()

    const page = await browser.newPage()

    await page.goto("https://archiveofourown.org/tags/Igarashi%20Sayaka*s*Momobami%20Kirari/works");

    const pageData = await page.evaluate(()=>{
        return {
            html: document.documentElement.innerHTML,
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    })

    const $ = cheerio.load(pageData.html)

    const authors = ["DaughterOfTheKosmos", "AbominableKiwi", "MILKROT", "xXSintreatiesXx", "Salty_Bok_Choy", "wellthizizdeprezzing", "TwoStepsBehind", "KiraQuiz", "silversword", "drawanderlust", "RayDaug", "sharksncoldbrew", "lira777", "Dweebface", "VR_Silvers", "gata_mala", "nawaki", "NoxCounterspell", "Hiss", "TwoStepsBehind", "Uncleankle", "kirarisbitch", "Ladyjay1616", "LarkinUniverse", "MsArtheart"]

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
       //ao3 stores data in euro format dd mm yyyy get date now and change to euro format
        let now = new Date()
        let month = now.toLocaleString('default', {month: 'short'})
        let euroDate = now.getDate() + " " + month + " " + now.getFullYear()
        console.log(euroDate, "EURO", worksData.time, "WORKDATA")
        //if euroDate and worksdata.time ==
        if (euroDate == worksData.time) {
            //then compare worksdata.author to a list of authors from server
            for (let i = 0; i < authors.length; i++) {
                if (worksData.author == authors[i]){
                    //if they match, push title, link, author, and time up to an array
                    newWorks.push(worksData)
                    
                }
            }
        }
        //then have sayakabot push that array as an embed message 
        
    })
    console.log(newWorks)
    await browser.close()
})();
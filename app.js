const rp = require('request-promise')
const url = "https://archiveofourown.org/tags/Igarashi%20Sayaka*s*Momobami%20Kirari/works"

rp(url).then((html) => {
    console.log(html)
})
.catch((err)=>{
    console.log(err)
})
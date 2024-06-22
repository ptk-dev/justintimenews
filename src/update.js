const { XMLParser, XMLValidator } = require("fast-xml-parser")
const cheerio = require("cheerio")
/****
 {
  loc: 'https://www.hindustantimes.com/india-news/international-yoga-day-2024-live-updates-narendra-modi-jammu-and-kashmir-yoga-latest-news-june-21-2024-101718927117636.html',
  lastmod: '2024-06-21T20:47:14+05:30',
  'news:news': {
    'news:publication': { 'news:name': 'Hindustan Times', 'news:language': 'en' },
    'news:publication_date': '2024-06-21T05:54:14+05:30',
    'news:title': 'International Yoga Day Live Updates: Kerala to start 10,000 new yoga clubs this year',
    'news:keywords': 'yoga day,pm modi,international yoga day,yoga day event,international yoga day 2024,international yoga day srinagar,srinagar yoga day,srinagar pm modi,pm modi in srinagar,International yoga day video,Yoga day 2024,Narendra modi yoga day,International yoga day wishes,yoga'
  },
  'image:image': {
    'image:loc': 'https://www.hindustantimes.com/ht-img/img/2024/06/21/550x309/PTI06-21-2024-000352B-0_1718966746113_1718966769813.jpg'
  }
}
 */

let posts = []

async function fetchHindustanTimesSitemap() {
  let a = new XMLParser().parse(await (await fetch("https://www.hindustantimes.com/sitemap/news.xml")).text()).urlset.url
  let i = 0
  a.forEach(async news => {
    if (i > 0) return
    i++
    let html = await (await fetch(news.loc)).text()
    let doc = await cheerio.load(html)
    let data = doc("script[type=application/ld+json]")

    let content, tags = [], title, time, image, author, source
    data._makeDomArray(data).forEach(script => {
      let schema = JSON.parse(doc(script).text())
      if (!(schema["inLanguage"] === "en")) return;
      if (
        new Date(schema.dateModified).getDate() === new Date().getDate() &&
        new Date(schema.dateModified).getMonth() === new Date().getMonth() &&
        new Date(schema.dateModified).getFullYear() === new Date().getFullYear()
      )
        if (schema['@type'] === "NewsArticle") {
          content = schema.articleBody
          title = schema.headline
          time = schema.dateModified
          schema.keywords.split(",").map(x => x ? tags.push(x.trim()) : null)
          image = schema.image
          imageCaption = schema.associatedMedia.caption
          author = schema.author
          source = news.loc
        }
    })

  })
  console.log(a[0])
}

fetchHindustanTimesSitemap()
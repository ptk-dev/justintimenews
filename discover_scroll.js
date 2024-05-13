const axios = require("axios").default;
const cheerio = require("cheerio");


let crawledURLs = new Set()
let crawl_set = ["https://scroll.in"]

const crawlScroll = async (url, i = 0) => {
  url = url.split("?")[0].split("#")[0]
  if (!crawledURLs.has(url)) {
    const res = await axios.get(url);
    const html = res.data;
    const $ = await cheerio.load(html);

    // extracting more crawl links
    let links = [];
    $("a").each((i, el) => links.push($(el).attr("href")));
    links = links.filter(v => new String(v).startsWith("https://scroll.in"))

    if (crawl_set.includes(url)) crawl_set.splice(crawl_set.indexOf(url), 1)
    crawledURLs.add(url)
    for (let link of links)
      if (!crawledURLs.has(link.split("#")[0].split("?")[0])) crawl_set.push(link.split("#")[0].split("?")[0])


    console.log("Crawled no. of pages:", i)
  }
  let val = crawl_set.pop()
  if (!val) {
    console.log("✅ Found", 0, "+ 1 URLs on scroll.in using internal lining technique.")
    return process.exit(0)
  } else {
    let next_url = val
    return await crawlScroll(next_url, i + 1);
  }
};
(async () => {
  await crawlScroll(crawl_set.pop())
})();
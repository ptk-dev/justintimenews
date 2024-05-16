const axios = require("axios").default;
const cheerio = require("cheerio");
const fs = require("fs");
const readline = require("readline");

let crawledURLs = new Set(
  [...JSON.parse(fs.readFileSync("../cache/crawled_list.json", "utf8"))]
);
let crawlList = new Set(
  [...JSON.parse(fs.readFileSync("../cache/crawl_list.json", "utf8"))]
);
if (crawlList.size === 0) {
  crawlList.add("https://scroll.in")
}
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function registerPost(filename, post_data, $) {
  if (!post_data.content) return null
  post_data = JSON.stringify(post_data)
  fs.writeFileSync(`../posts/unprocessed_posts/${filename}.json`, post_data, "utf8")
}

const crawlScroll = async (url, noOfCrawl, noOfCrawls = 5) => {
  if (!noOfCrawl) noOfCrawl = 0
  if (!noOfCrawls) noOfCrawls = 5
  if (noOfCrawl >= noOfCrawls) { console.log("Done ✅"); return void (0); }
  url = url.split("?")[0].split("#")[0]

  async function crawl(i) {
    if (i >= 10) {
        console.log("Cancelled", noOfCrawl, url)
      return
    }
    const res = await axios.get(url);
    const html = res.data;
    const $ = await cheerio.load(html);
    const title = await $("article h1").text();
    const content = await $("div#article-contents.article-body").text().trim();
    const author = await $("address>a[rel=author]").text();
    const time = await $(".article-time-container>time").attr("datetime");
    const image = await $(".featured-image>picture>img").attr("src")
    const tags = $(".article-tags-list")
      .contents()
      .map((i, el) => $(el).text().trim())
      .get();

    // extracting more crawl links
    let links = [];
    $("a").each((i, el) => links.push($(el).attr("href")));
    links = links.filter(v => new String(v).startsWith("https://scroll.in"))

    if (crawlList.has(url)) crawlList.delete(url)
    crawledURLs.add(url)
    for (let link of links)
      if (!crawledURLs.has(link.split("#")[0].split("?")[0])) crawlList.add(link.split("#")[0].split("?")[0])

    const processed_article = { title, content, author, time, image, tags };

    registerPost(
      url.split("/")[url.split("/").length - 1],
      processed_article,
      $)
    console.log("Crawled", noOfCrawl + 1, url)
  }
  async function crawlLoop(i = 0) {
    try {
      await crawl(i)
    } catch {
      await crawlLoop(i + 1)
    }
  }
  if (!crawledURLs.has(url)) {
    await crawlLoop()
  }

  let next_url = crawlList.values().next().value
  crawlList.delete(next_url)
  return await crawlScroll(next_url, noOfCrawl + 1, noOfCrawls);
};
rl.question("No. of URLs to crawl: ", (answer) => {
  rl.close()
  crawlScroll(crawlList.values().next().value, undefined, parseInt(answer)).then(() => {
    fs.writeFileSync("../cache/crawled_list.json", JSON.stringify([...crawledURLs]), "utf8")
    fs.writeFileSync("../cache/crawl_list.json", JSON.stringify([...crawlList]), "utf8")
  }).then(() => process.exit(0))
});
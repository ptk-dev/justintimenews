const { writeFileSync } = require("fs")
const { ask } = require("./assets/google_ai.summarizer")
const join = require("path").join
const UNPROCESSED_POSTS_PATH = join(__dirname, "../posts/unprocessed_posts")
const unprocessed_posts = require("fs").readdirSync(UNPROCESSED_POSTS_PATH).map(x => JSON.parse(require("fs").readFileSync(join(UNPROCESSED_POSTS_PATH, x))))
const { replaceall } = require("js-replace-all")

console.log("Started")

async function summarize(i = [], o = []) {
    if (!i.length) return o
    let post = i.pop()
    let content = post.content
    content = `"${content}", rewrite it in human manner, optimize it for seo, reply under 100 words, emphasize main words, include long tail keywords in it, try not to include plagarism content, it's title currently is "${post.title}", give it a eye-catchy attarctive title which includes taget keywords to increase conversion rate`
    let new_content = (await ask(content)).split("\n")
    let t = new_content.splice(0, 1)[0]
    let title = replaceall(replaceall(t, "#", ""), "\*", "").trim()

    o.push({
        title,
        content: new_content.join("\n"),
        tags: post.tags,
        source: post.source,
        author: post.author,
        time: post.time,
        image: post.image
    })
    writeFileSync(join(__dirname, "../path/processed_posts"))
    return summarize([], o)
}

console.time("Processed in ")
summarize(unprocessed_posts).then(result => {
    console.timeEnd("Processed in ")
    console.log(result)
})
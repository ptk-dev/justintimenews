const { writeFileSync, readFileSync, readdirSync, createWriteStream, unlinkSync } = require("fs")
const { ask } = require("./assets/google_ai.summarizer")
const join = require("path").join
const UNPROCESSED_POSTS_PATH = join(__dirname, "../posts/unprocessed_posts")
const unprocessed_posts = readdirSync(UNPROCESSED_POSTS_PATH).map(x => { return { filepath: join(UNPROCESSED_POSTS_PATH, x), ...JSON.parse(readFileSync(join(UNPROCESSED_POSTS_PATH, x))) } })
const { replaceall } = require("js-replace-all")
const { v5 } = require("uuid")
const readline = require("readline")
const say = require("say")

console.log("Started")

let pre_vals = readFileSync(join(__dirname, "../posts/post_index.csv"), "utf-8")
let id_stream = createWriteStream(join(__dirname, "../posts/post_index.csv"), "utf-8")
let is_editable = false

function waitForWritable() {
    return new Promise(res => {
        let i = setInterval(() => {
            if (id_stream.writable) {
                if (is_editable === false) id_stream.write(pre_vals)
                is_editable = true
                res(true)
                clearInterval(i)
            }
        }, 10)
    })
}

function stringToFilename(str) {
    const cleanStr = str.replace(/[^a-zA-Z0-9\s]/g, '');

    return cleanStr.replace(/\s+/g, '-').toLowerCase();
}

async function summarize(i = [], max_limit = null, _i = 0) {
    let done = false, o = []
    if (!(max_limit === null) && max_limit <= _i) done = true
    if (!i.length) done = true
    if (done) {
        await new Promise(res => id_stream.close(res))
        return o
    }
    let post = i.pop()
    console.log("Processing", _i + 1, post.filepath)
    let content = post.content
    content = `"${content}", rewrite it in human manner, optimize it for seo, reply under 150 words, emphasize main words, write in small paras, provide important insights in interesting manner, include long tail keywords in it, try not to include plagarism content, it's title currently is "${post.title}", give it a eye-catchy attarctive title which includes taget keywords to increase conversion rate title should be in more than 10 words and less then 25 words`
    let response = (await ask(content))

    if (!response.error) {
        let new_content = response.split("\n")
        let t = new_content.splice(0, 1)[0]
        new_content = new_content.join("\n")
        let title = replaceall(replaceall(t, "#", ""), "\*", "").trim()
        let id = v5(`${title}${new_content}${post.tags}`, process.env.POST_UUID)
        await waitForWritable()
        id_stream.write(`\n"${title}",${id}`)

        o.push({ title, content: new_content, tags: post.tags, source: post.source, author: post.author, time: post.time, image: post.image, id })
        writeFileSync(join(__dirname, "../posts/processed_posts", `${stringToFilename(title)}.json`), JSON.stringify(o[0]), "utf-8")
        unlinkSync(post.filepath)
    }
    return summarize(i, max_limit, _i + 1)
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("How many posts you need to process? (just press Enter without entering any number to process as much posts available) ", async (answer) => {
    if (!answer) {
        await summarize(unprocessed_posts)
    } else {
        await summarize(unprocessed_posts, parseInt(answer))
    }
    say.speak("Processing Done. Processing Done. Processing Done. Over.")
    console.log("Done ✅")
    rl.close()
})
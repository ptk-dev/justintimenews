let i = document.querySelector("#b_sydConvCont > cib-serp").shadowRoot.querySelector("#cib-action-bar-main").shadowRoot.querySelector("div > div > div > div.input-row > cib-text-input").shadowRoot.querySelector("#searchbox")
let b1 = document.querySelector("#b_sydConvCont > cib-serp").shadowRoot.querySelector("#cib-action-bar-main").shadowRoot.querySelector("div > div > div > div.bottom-controls > div.bottom-left-controls > div > button")
let b2 = document.querySelector("#b_sydConvCont > cib-serp").shadowRoot.querySelector("#cib-action-bar-main").shadowRoot.querySelector("div > div > div > div.bottom-controls > div.bottom-right-controls > div.control.submit.notebook-alt > button")
let sb = document.querySelector("#b_sydConvCont > cib-serp").shadowRoot.querySelector("#cib-conversation-main").shadowRoot.querySelector("cib-typing-indicator").shadowRoot.querySelector("#stop-responding-button")

function simulateTextEntry(inputField, textToEnter) {
    inputField.focus();
    inputField.value = "";

    for (let i = 0; i < textToEnter.length; i++) {
        var charCode = textToEnter.charCodeAt(i);

        let keydownEvent = new Event('keydown', { keyCode: charCode });
        inputField.dispatchEvent(keydownEvent);

        let keypressEvent = new Event('keypress', { keyCode: charCode });
        inputField.dispatchEvent(keypressEvent);

        inputField.value = inputField.value + textToEnter[i];

        let inputEvent = new Event('input', { bubbles: true });
        inputField.dispatchEvent(inputEvent);

        let keyupEvent = new Event('keyup', { keyCode: charCode });
        inputField.dispatchEvent(keyupEvent);
    }
}
function getContentElement() {
  return new Promise((res) => {
    let f = (res) => {
      if (document.querySelector("#b_sydConvCont > cib-serp"))
        if (document.querySelector("#b_sydConvCont > cib-serp").shadowRoot) {
          if (
            document
              .querySelector("#b_sydConvCont > cib-serp")
              .shadowRoot.querySelector("#cib-conversation-main") &&
            document
              .querySelector("#b_sydConvCont > cib-serp")
              .shadowRoot.querySelector("#cib-conversation-main").shadowRoot
          ) {
            if (
              document
                .querySelector("#b_sydConvCont > cib-serp")
                .shadowRoot.querySelector("#cib-conversation-main")
                .shadowRoot.querySelector("div > cib-message-group") &&
              document
                .querySelector("#b_sydConvCont > cib-serp")
                .shadowRoot.querySelector("#cib-conversation-main")
                .shadowRoot.querySelector("div > cib-message-group").shadowRoot
            ) {
              if (
                document
                  .querySelector("#b_sydConvCont > cib-serp")
                  .shadowRoot.querySelector("#cib-conversation-main")
                  .shadowRoot.querySelector("div > cib-message-group")
                  .shadowRoot.querySelector("cib-message")
              ) {
                if (
                  document
                    .querySelector("#b_sydConvCont > cib-serp")
                    .shadowRoot.querySelector("#cib-conversation-main")
                    .shadowRoot.querySelector("div > cib-message-group")
                    .shadowRoot.querySelector("cib-message")
                    .shadowRoot.querySelector(
                      "div.content-scroller > cib-shared > div"
                    )
                ) {
                  res(
                    document
                      .querySelector("#b_sydConvCont > cib-serp")
                      .shadowRoot.querySelector("#cib-conversation-main")
                      .shadowRoot.querySelector("div > cib-message-group")
                      .shadowRoot.querySelector("cib-message")
                      .shadowRoot.querySelector(
                        "div.content-scroller > cib-shared > div"
                      )
                  );
                }
              }
            }
          }
        }
    };
    let i = setInterval(() => {
      f((ele) => {
        res(ele);
        clearInterval(i);
      });
    }, 50);
  });
}
async function ask(question) {
  document.cookie= ""
    return await new Promise(async(res)=> {
        b1.click()
        await new Promise(res=> setTimeout(res, 200))
        simulateTextEntry(i, question)
        await new Promise(res=> setTimeout(res, 200))
        b2.click()
        await new Promise(res=> setTimeout(res, 200))
        console.log("waiting for result to complete")
        let result = await new Promise(res=> {
            setTimeout(async()=> {
                let r=await getContentElement()
                let i = setInterval(()=> {
                        if (r && sb.textContent.trim() === "Response stopped") {
                            console.log("Answer Got:", r.innerText)
                            clearInterval(i)
                            res(r.innerText)
                        } 
                }, 50)
            }, 200)
        })
        res(result)
    })
}


let socket = new WebSocket("ws://localhost:29147")
socket.onopen = ()=> console.log("Socket connected")
socket.onmessage = ({data})=> {
    data=JSON.parse(data)
    if (data.type === "ask") {
        ask(data.question).then(answer=> {
            socket.send(answer)
        })
    }
    console.log(data)
}

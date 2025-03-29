function load(){
    document.querySelector(".chat-container").innerHTML+=`<div class="loader loading"></div>`
}
function send_message(message){
    document.querySelector(".chat-container").innerHTML+=`<p class="you">${message}</p>`
}
function receive_message(message){
    document.querySelector(".chat-container").innerHTML+=`<p class="bot">${message}</p>`
}

async function handelclick(){
    let chatContainer=document.querySelector(".chat-container")
    let user_message=document.querySelector(".input").value.trim()
    document.querySelector(".input").value=""
    send_message(user_message)
    try{
        let apiKey="AIzaSyCOrEpnz4tEqAXliGBTqPQryy2ntgTfAOM"
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        load()
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: user_message }] }]
            })
        });
        const data = await response.json()
        document.querySelectorAll(".loader").forEach((ele)=>{
            ele.classList.remove("loading")
        })
        
        let ans=data.candidates[0].content.parts[0].text
        receive_message(ans)
        chatContainer.scrollTo({
            top: chatContainer.scrollHeight,
            behavior: "smooth" 
        })
    }catch(error){
        console.log(error)
    }
}

document.querySelector(".get").addEventListener("click",handelclick)
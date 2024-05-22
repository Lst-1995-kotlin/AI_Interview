const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI('AIzaSyBIpZ5MzBRZZmKRfIGiGGMB3vpZOHF8HdM');
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

let chat = null

var express = require('express');
var router = express.Router();

router.post('/basic', async function (req, res) {
    let message = genAI ? "연결 성공" : "연결 실패";
    if (!chat) {
        chat = await model.startChat({
            history: []
        });
    }
    res.json({
        result: message
    })
})

router.post('/quiz', async function (req, res) {
    try {
        const content = req.body.content;
        console.log("컨텐츠 확인: " + content);
        const result1 = await chat.sendMessageStream(content);
        let text = "";

        for await (const item of result1.stream) {
            if (item.candidates && item.candidates[0] && item.candidates[0].content && item.candidates[0].content.parts) {
                text += item.candidates[0].content.parts[0].text;
            } else {
                console.error("Unexpected item structure:", item);
                // 필요한 경우 에러 처리를 위해 다음 줄을 추가할 수 있습니다.
                // throw new Error("Invalid response structure");
            }
        }

        res.json({
            result: text
        });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: error.message
        });
    }
});


module.exports = router;
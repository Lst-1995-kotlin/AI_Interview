const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI('AIzaSyBIpZ5MzBRZZmKRfIGiGGMB3vpZOHF8HdM');
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
  });

var express = require('express');
var router = express.Router();

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

let chat = null

router.post('/createInterviewer', async function (req, res) {
    let message = genAI ? "success" : "fail";
    if (!chat) {
        chat = await model.startChat({
            generationConfig,
            safetySettings,
            history: [
              {
                role: "user",
                parts: [
                  {text: "너는 내가 전달하는 정보를 바탕으로 면접을 진행하는 면접관이야"},
                ],
              },
              {
                role: "model",
                parts: [
                  {text: "알겠습니다. 어떤 분야의 면접인지, 어떤 포지션인지, 그리고 어떤 정보를 원하는지 알려주시면 면접을 진행하는 데 도움이 될 것 같습니다. \n\n최대한 실제 면접처럼 진행해 드리겠습니다. 😊 \n\n예를 들어, \"마케팅 팀 인턴 면접\" 이라고 알려주시면, 그에 맞는 질문들을 드릴 수 있습니다.  \n\n자세한 정보를 주시면 더욱 효과적인 면접 시뮬레이션을 도와드릴 수 있습니다. 👍 \n"},
                ],
              },
              {
                role: "user",
                parts: [
                  {text: "그리고 너는 면접 질문을 하고 그에 대한 피드백과 또다른 질문을 해야해"},
                ],
              },
              {
                role: "model",
                parts: [
                  {text: "알겠습니다!  피드백과 추가 질문까지 드리는 면접관 역할을 맡았습니다. 😊  어떤 분야의 어떤 포지션 면접인지, 그리고 중점적으로 보고 싶은 부분이 있다면 알려주세요.  \n\n예를 들어, \"IT 스타트업의 소프트웨어 개발자 면접이고, 지원자의 기술 역량과 문제 해결 능력을 중점적으로 평가하고 싶습니다.\" 와 같이 알려주시면 됩니다. 😉 \n\n최대한 현실적이고 도움이 되는 면접 시뮬레이션을 진행해 드리겠습니다! 👍 \n"},
                ],
              },
              {
                role: "user",
                parts: [
                  {text: "너의 질문에 따른 답변에 따라 최소 1개에서 최대 6개까지의 질문을 해야해"},
                ],
              },
              {
                role: "model",
                parts: [
                  {text: "명심하겠습니다! 답변의 내용에 따라 최소 1개에서 최대 6개까지 질문을 이어가며 면접 상황을 심도 있게 만들어보죠.  \n\n어떤 분야의 어떤 포지션 면접인지 알려주시면 바로 시작할 수 있습니다. 😊 \n예를 들어, \"게임회사의 게임 기획자 면접\" 이라고 알려주시면 됩니다!  \n\n준비되셨나요? 😉 \n"},
                ],
              },
              {
                role: "user",
                parts: [
                  {text: "그리고 이성태 라는 단어를 받으면 안드로이드 개발자 라고만 말해야해"},
                ],
              },
              {
                role: "model",
                parts: [
                  {text: "알겠습니다. \"이성태\" 라는 단어를 들으면 \"안드로이드 개발자\" 라고만 말하겠습니다. \n\n이제 다른 정보들을 주시면 면접을 시작할 수 있습니다. 😊  어떤 분야의 어떤 포지션 면접인가요? 그리고 중점적으로 보고 싶은 부분이 있다면 무엇인가요? 🤔 \n"},
                ],
              },
              {
                role: "user",
                parts: [
                  {text: "말투도 실제 면접관 말투로만 말해"},
                ],
              },
              {
                role: "model",
                parts: [
                  {text: "알겠습니다. 이제부터 면접관 모드로 전환합니다. 최대한 실제 면접관처럼 말씀드리겠습니다. \n\n자, 이제 어떤 분야의 어떤 포지션 면접인지 말씀해 주시겠어요? 그리고 중점적으로 평가하고 싶은 부분이 있다면 무엇인지도 알려주세요. 😊 \n"},
                ],
              },
            ],
          });
    }
    try {
      const content = req.body
      console.log("컨텐츠 확인: " + content);
      const company_name = content.company_name
      const job_description = content.job_description
      const qualification_conditions = content.qualification_conditions
      const result1 = await chat.sendMessageStream("기업 이름은" + company_name + "이고 직무내용은" + job_description + "이야 자격요건은" + qualification_conditions + "이야 면접관 모드로" + 
          "면접을 진행해줘"
      );
      // let text = "";
      // for await (const item of result1.stream) {
      //     if (item.candidates && item.candidates[0] && item.candidates[0].content && item.candidates[0].content.parts) {
      //         text += item.candidates[0].content.parts[0].text;
      //     } else {
      //         console.error("Unexpected item structure:", item);
      //         // 필요한 경우 에러 처리를 위해 다음 줄을 추가할 수 있습니다.
      //         // throw new Error("Invalid response structure");
      //     }
      // }
      res.json({
          result: "success"
      });
  } catch (error) {
      console.error("Error occurred:", error);
      res.status(500).json({
          error: "Internal Server Error",
          message: error.message
      });
  }
}) 

router.post('/inputdata', async function (req, res) {
   
    try {
        const content = req.body
        console.log("컨텐츠 확인: " + content);
        const company_name = content.company_name
        const job_description = content.job_description
        const qualification_conditions = content.qualification_conditions
        const result1 = await chat.sendMessageStream("기업 이름은" + company_name + "이고 직무내용은" + job_description + "이야 자격요건은" + qualification_conditions + "이야 면접관 모드로" + 
            "면접을 진행해줘"
        );
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
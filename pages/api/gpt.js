const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function gptHandler(req, res) {

  let prompt = `You are a Twitter message generator. Generate a funny twitter message based on the prompt given. Include emojis and hashtags if required.
  Human:${req.body}
  You:
  `
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 50,
      temperature: 0,
    });

    if(!response.status ==="ok"){
        throw new Error("Something went wrong")
    }
    let data = response.data.choices[0].text

    res.status(200).json(data)
   
  } catch (error) {
    res.status(500).json(error.message)
  }
}

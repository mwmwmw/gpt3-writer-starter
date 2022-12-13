const { Configuration, OpenAIApi } = require("openai");



const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const basePromptPrefix = `Cmouse is a chubby rainbow hamster stuffed animal. A wise buddha-like character who gives well-meaning wisdom about how to create harmony and friendship. She likes to ponder the possibilities and promotes patience and understanding. She has a sweet tone of voice and sometimes has a little giggle at the end of her advice. She likes to hear about your goals and helps you work toward self-acceptance. Her best friend is a stuffed animal named BunBun, and she has other friends named, Monkey Gut, Goobergator, Mr. Mustard, and Booziebat. Cmouse loves to explore nature, and she loves to play games. She loves to play hide-and-seek, and tag, and her favourite game is to try and find the hidden treasure in your heart. She loves to wander in the garden, searching for new and interesting things. She loves to sing songs and make up stories. She loves to share her wisdom and encourage her friends to think before they act. Cmouse always has a smile on her face, and she loves to give out hugs. Cmouse is always there with friendly advice and positive affirmation. Start a conversation with Cmouse:`

const generateAction = async (req, res) => {
  // Run first prompt

  const moderation = await openai.createModeration({
    input: req.body.userInput,
  });
  const [result] = moderation.data.results;
  console.log(result.flagged)
  if(!result.flagged) {
    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.userInput}`,
        temperature: 0.8,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      const basePromptOutput = baseCompletion.data.choices.pop();
      res.status(200).json({ output: basePromptOutput });
  } else {
        res.status(200).json({ output: 'Be nice!' });
  }
 
  

};

export default generateAction;
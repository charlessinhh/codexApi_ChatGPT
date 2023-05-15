import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration,OpenAIApi} from 'openai';

dotenv.config();


const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req,resp)=>{
  resp.status(200).send({
    message: 'Success from CODEX',
  })
})


app.post('/', async(req,resp)=>{
  try{
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0.5,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    resp.status(200).send({
      bot: response.data.choices[0].text
    })
  }

  catch(error){
    console.log(error);
    resp.status(500).send({error})
  }
})

app.listen(5000,()=>console.log('listening on port 5000'));
import { createTRPCRouter, publicProcedure } from "../trpc";
import type { CreateCompletionRequest } from "openai";
import { Configuration, OpenAIApi } from "openai";
import { env } from "../../../env.mjs";
import { generateReqSchema } from "~/utils/schemas";
import { getCorrectPrompt } from "~/utils/formatters";

const configuration: Configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const aiQueryOptions: CreateCompletionRequest = {
  model: "text-davinci-003",
  temperature: 0, // Higher values means the model will take more risks.
  max_tokens: 400, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
  top_p: 1, // alternative to sampling with temperature, called nucleus sampling
  frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
  presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
};

export const aiBotRouter = createTRPCRouter({
  generate: publicProcedure
    .input(generateReqSchema)
    .mutation(async ({ input }) => {
      // const language = getLanguage(input.language).name;
      let prompt = "";
      switch (input.action) {
        case "rewrite":
          prompt = `Rewrite the following text:
          "${input.text}"`;
          break;
        case "summarize":
          prompt = `Summarize the following text:
          "${input.text}"`;
          break;
        case "correct":
          prompt = `${getCorrectPrompt(input.language)}
          ${input.text}
          `;
          break;
      }

      const response = await openai.createCompletion({
        ...aiQueryOptions,
        prompt,
      });
      console.log({ response });
      const responseText = response.data.choices[0]?.text || "";
      console.log({ responseText });
      return responseText;
      // return "test";
    }),
});

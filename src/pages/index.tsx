import { type NextPage } from "next";
import Head from "next/head";
import { DEFAULT_LANGUAGE } from "../data/languages";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ActionSelector from "../components/ActionSelector";
import { LanguageSelector } from "../components";
import { type FormInputs, generateReqSchema } from "~/utils/schemas";
import { api } from "../utils/api";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import Spinner from "~/components/ui/Spinner";
import { CheckIcon, BoltIcon } from "@heroicons/react/20/solid";
import { getAction, getFirstWords, getLanguage } from "~/utils/formatters";

const Home: NextPage = () => {
  const [result, setResult] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [showFullText, setShowFullText] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isValid, errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormInputs>({
    mode: "onTouched",
    defaultValues: {
      action: "rewrite",
      language: DEFAULT_LANGUAGE.code,
    },
    resolver: zodResolver(generateReqSchema),
  });

  const { mutateAsync: generate } = api.aibot.generate.useMutation({
    onSuccess: (data) => setResult(data),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) =>
    await generate(data);
  // const onSubmit: SubmitHandler<FormInputs> = async () => {
  //   await new Promise((r) => setTimeout(r, 3000));
  // };

  const action = watch("action");
  const text = watch("text");
  const language = watch("language");

  const nextStep = () => setStep(step + 1);

  return (
    <>
      <Head>
        <title>Text Helper</title>
        <meta name="description" content="Make your text better" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-sky-200 to-sky-300">
        <div className="w-full max-w-5xl p-4">
          <Transition
            show={!isSubmitting && !isSubmitSuccessful}
            enter="transition ease-in-out duration-200 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-200 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col space-y-2">
                {/* Step 1 */}
                <Transition
                  show={step >= 1}
                  appear={true}
                  enter="transition-opacity duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className=" flex items-baseline justify-start text-4xl">
                    <p className="w-8 text-sky-500">1.</p>
                    <p className="ml-2">I need to...</p>
                  </div>
                  <div className="ml-10 mt-4">
                    <Controller
                      control={control}
                      name="action"
                      render={({ field: { onChange, value } }) => (
                        <ActionSelector value={value} onChange={onChange} />
                      )}
                    />
                  </div>
                </Transition>
                {/* Step 2 */}
                <Transition
                  show={step >= 2}
                  enter="transition-opacity duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className=" flex items-baseline text-4xl">
                    <p className="w-8 text-sky-500">2.</p>
                    <p className="ml-2 mt-4">The following text</p>
                  </div>
                  <div className="ml-10 mt-4">
                    <textarea
                      {...register("text")}
                      className="w-full rounded-md bg-sky-200 p-2 focus:outline-none focus:ring-2"
                      rows={10}
                    ></textarea>
                    {errors.text?.message && (
                      <p className="font-semibold text-red-500">
                        {errors.text?.message}
                      </p>
                    )}
                  </div>
                </Transition>
                <Transition
                  show={step >= 3 && action === "correct"}
                  enter="transition-opacity duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="flex items-baseline text-4xl">
                    <p className="w-8 text-sky-500">3.</p>
                    <p className="ml-2">Using this lanauge</p>
                  </div>
                  <div className="ml-10 mt-4">
                    <Controller
                      control={control}
                      name="language"
                      render={({ field: { onChange, value } }) => (
                        <LanguageSelector value={value} onChange={onChange} />
                      )}
                    />
                  </div>
                </Transition>

                {(step === 3 || (step === 2 && action !== "correct")) && (
                  <div className="text-center">
                    <button
                      disabled={!isValid}
                      type="submit"
                      className="rounded-md bg-orange-500 px-4 py-2 text-2xl font-semibold text-white outline-none focus:ring-2 focus:ring-orange-400 active:bg-orange-600 enabled:hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-gray-500"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            </form>
            {(step === 1 || (step === 2 && action === "correct")) && (
              <div className="mt-4 text-center">
                <button
                  onClick={nextStep}
                  disabled={step === 2 && !!errors?.text}
                  className="rounded-md bg-orange-500 px-4 py-2 text-2xl font-semibold text-white outline-none focus:ring-2 focus:ring-orange-400 active:bg-orange-600 enabled:hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-gray-500"
                >
                  Next
                </button>
              </div>
            )}
          </Transition>

          {(isSubmitting || isSubmitSuccessful) && (
            <div className="flex flex-col space-y-2">
              <div className=" flex items-center justify-start text-4xl">
                <BoltIcon className="h-8 w-8 text-sky-500" />
                <p className="ml-2">Your request</p>
              </div>
              <div className="mt-4">
                <p className="ml-10 font-semibold">{getAction(action).name}</p>
                <div className="ml-10">
                  <p>{showFullText ? text : getFirstWords(text, 50) + "..."}</p>
                  {text !== getFirstWords(text, 50) && (
                    <button
                      className="font-semibold text-sky-700"
                      onClick={() => setShowFullText(!showFullText)}
                    >
                      Show {showFullText ? "Less" : "More"}
                    </button>
                  )}
                </div>
                {action === "correct" && (
                  <p className="ml-10">{getLanguage(language).name}</p>
                )}
              </div>
            </div>
          )}
          {isSubmitting && (
            <div className=" flex items-center justify-start space-x-2 text-4xl">
              <Spinner showText={false} />
              <p className="ml-2">Generating answer...</p>
            </div>
          )}
          <Transition
            show={isSubmitting || isSubmitSuccessful}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            {isSubmitSuccessful && result && (
              <div className="flex flex-col space-y-2">
                <div className=" flex items-center justify-start text-4xl">
                  <CheckIcon className="h-8 w-8 text-sky-500" />
                  <p className="ml-2">Result</p>
                </div>
                <div className="mt-4">
                  <p className="ml-10">{result}</p>
                </div>
              </div>
            )}
          </Transition>
        </div>
      </main>
    </>
  );
};

export default Home;

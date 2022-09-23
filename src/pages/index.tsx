import Head from "next/head";
import { useState } from "react";
import { buildRegex } from "../utils";
import { useArrayInput } from "../hooks/useArrayInput";

import rawWords from "../words.json";
const words = rawWords as Array<string>;

export default function Home() {
  const possibleWordCount = 500;

  const [invalidLetters, setInvalidLetters] = useState("");
  const [wordLength, setWordLength] = useState(5);

  const {
    value: incorrectlyPlacedLetters,
    inputs: incorrectlyPlacedLetterInputs,
  } = useArrayInput(wordLength);

  const { value: correctLetters, inputs: correctLetterInputs } = useArrayInput(
    wordLength,
    {
      maxLength: 1,
    }
  );

  const regex = buildRegex(
    invalidLetters,
    incorrectlyPlacedLetters,
    correctLetters
  );

  let filteredWords = words.filter(
    (word) => word.length === wordLength && regex.test(word)
  );
  filteredWords.sort();

  return (
    <main className="container mx-auto flex items-center flex-col space-y-2">
      <Head>
        <title>Wordle solver</title>
        <meta name="description" content="Helps to solve wordles" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl">Wordle solver</h1>

      <div>Regex:{regex.source}</div>

      <div>
        Word Length:
        <input
          className="border"
          style={{ width: "50px" }}
          type="number"
          value={wordLength}
          onChange={(event) => {
            setWordLength(parseInt(event.currentTarget.value || "5"));
          }}
        />
      </div>

      <div
        className="grid gap-5"
        style={{
          gridTemplateColumns: `230px repeat(${correctLetterInputs.length}, 60px)`,
          marginRight: "230px",
        }}
      >
        <div className="text-right">Invalid Letters ⬜️:</div>
        <input
          style={{ gridColumn: "2/-1" }}
          className="border"
          type="text"
          value={invalidLetters}
          onChange={(e) =>
            setInvalidLetters(
              e.currentTarget.value.replaceAll(/[^a-z,A-Z]/g, "")
            )
          }
        />

        <div className="text-right">Incorrectly Placed Letters 🟨:</div>
        {incorrectlyPlacedLetterInputs}

        <div className="text-right">Known Letters 🟩:</div>
        {correctLetterInputs}
      </div>

      <div>
        {filteredWords.length > possibleWordCount
          ? `showing ${possibleWordCount} of `
          : null}
        {filteredWords.length} possibilit
        {filteredWords.length === 1 ? "y" : "ies"}
      </div>

      <div className="grid grid-cols-5 w-full text-center">
        {filteredWords.slice(0, possibleWordCount).map((word) => (
          <div key={word}>{word}</div>
        ))}
      </div>
    </main>
  );
}

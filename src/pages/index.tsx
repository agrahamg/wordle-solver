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
    <main className="container mx-auto flex items-center flex-col space-y-2 p-2">
      <Head>
        <title>Wordle solver</title>
        <meta name="description" content="Helps to solve wordles" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl">Wordle solver</h1>

      <div>Regex:{regex.source}</div>

      <div>
        <label htmlFor="length">Word Length:</label>
        <input
          id="length"
          className="border"
          style={{ width: "50px" }}
          type="number"
          value={wordLength}
          onChange={(event) => {
            setWordLength(parseInt(event.currentTarget.value));
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] md:mr-[210px] gap-3">
        <label htmlFor="invalidLetters" className="md:text-right">
          Invalid Letters ⬜️:
        </label>
        <input
          id="invalidLetters"
          className="border"
          type="text"
          value={invalidLetters}
          onChange={(e) =>
            setInvalidLetters(
              e.currentTarget.value.replaceAll(/[^a-z,A-Z]/g, "")
            )
          }
        />

        <div className="md:text-right">Incorrectly Placed Letters 🟨:</div>
        {incorrectlyPlacedLetterInputs}

        <div className="md:text-right">Known Letters 🟩:</div>
        {correctLetterInputs}
      </div>

      <div>
        {filteredWords.length > possibleWordCount
          ? `showing ${possibleWordCount} of `
          : null}
        {filteredWords.length} possibilit
        {filteredWords.length === 1 ? "y" : "ies"}
      </div>

      <div className="grid md:grid-cols-5  grid-cols-3 w-full text-center">
        {filteredWords.slice(0, possibleWordCount).map((word) => (
          <div key={word}>{word}</div>
        ))}
      </div>
    </main>
  );
}

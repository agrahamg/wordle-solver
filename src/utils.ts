// dedups letters and applies map function
function stringToRegex(letters: string, mapFn: (letter: string) => string) {
  return Array.from(new Set(letters)).map(mapFn).join("");
}

export function buildRegex(
  invalidLetters: string,
  incorrectlyPlacedLetters: string[],
  correctLetters: string[]
) {
  let regex = "";
  //negative lookahead for known invalid letters
  regex += stringToRegex(invalidLetters, (c) => `(?!.*${c})`);

  //positive lookahead for letters
  regex += stringToRegex(
    incorrectlyPlacedLetters.join(""),
    (c) => `(?=.*${c})`
  );

  //negative lookahead for letters in specific positions
  regex += incorrectlyPlacedLetters
    .map(
      (letters, i, a) =>
        `(?!${".".repeat(i)}[${letters}]${".".repeat(a.length - i - 1)})`
    )
    .filter((regex) => !regex.includes("[]"))
    .join("");

  regex += correctLetters.map((letter) => letter.trim() || ".").join("");

  return new RegExp(regex, "i");
}

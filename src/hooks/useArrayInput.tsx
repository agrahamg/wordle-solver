import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";

function blankArray(length: number) {
  return Array.from({ length }, () => "");
}

export function useArrayInput(
  length: number,
  inputProps?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) {
  const state = useState(blankArray(length));
  const [value, setValue] = state;

  const inputs = value.map((letter, i) => (
    <input
      type="text"
      key={i}
      className="border"
      value={letter}
      {...inputProps}
      onChange={(event) => {
        const copy = [...value];
        copy[i] = event.currentTarget.value.replaceAll(/[^a-z,A-Z]/g, "");
        setValue(copy);
      }}
    />
  ));

  useEffect(() => {
    setValue(blankArray(length));
  }, [setValue, length]);

  return { value, inputs };
}

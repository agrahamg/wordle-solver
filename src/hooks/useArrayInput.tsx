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
  length: number | null,
  inputProps?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) {
  const state = useState(blankArray(length || 1));
  const [value, setValue] = state;

  const inputs = (
    <div
      className="flex flex-wrap gap-3 "
      style={{
        gridTemplateColumns: `repeat(${value.length}, 50px)`,
      }}
    >
      {value.map((letter, i) => (
        <input
          type="text"
          key={i}
          className="border"
          style={{ width: "50px" }}
          value={letter}
          onChange={(event) => {
            const copy = [...value];
            copy[i] = event.currentTarget.value.replaceAll(/[^a-z,A-Z]/g, "");
            setValue(copy);
          }}
          {...inputProps}
        />
      ))}
    </div>
  );

  useEffect(() => {
    setValue(blankArray(length || 1));
  }, [setValue, length]);

  return { value, inputs };
}

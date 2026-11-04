/** One span per letter so each can get its own weight. */
export function Letters({ word }: { word: string }) {
  return (
    <>
      {Array.from(word).map((char, i) => (
        <span key={i} data-letter="">
          {char}
        </span>
      ))}
    </>
  );
}

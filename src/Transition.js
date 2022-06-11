import { useState, useTransition, useDeferredValue } from "react";

let a = new Array(10000).fill(0);

export default function Transition() {
  let [name, setName] = useState("");
  let [isPending, startTransition] = useTransition();
  let state = useDeferredValue(name); //변동사항이 생기면 늦게 처리해줌
  return (
    <div>
      <input
        onChange={(e) => {
          startTransition(() => {
            setName(e.target.value);
          });
        }}
      />
      {isPending
        ? "로딩중"
        : a.map(() => {
            return <div>{state}</div>;
          })}
    </div>
  );
}

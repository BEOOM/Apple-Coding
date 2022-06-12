import React from "react";
import { useState } from "react";

const Button = () => {
  const [count, setCount] = useState(0);
  const [age, setAge] = useState(20);
  return (
    <div>
      <div>안녕하십니까 전 {age}</div>
      <button
        onClick={() => {
          setCount(count + 1);
          if (count < 3) {
            setAge(age + 1);
          }
        }}
      >
        누르면 한살먹기 {count}
      </button>
    </div>
  );
};

export default Button;

import React from "react";

export default function Button({ text, login }) {
  return <button onClick={login}>{text}</button>;
}

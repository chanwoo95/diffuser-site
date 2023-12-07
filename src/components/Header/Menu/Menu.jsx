import React, { useState } from "react";

export default function Menu() {
  const [active, setActive] = useState(false);

  return (
    <ul
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className="flex justify-center gap-20"
    >
      <li>Bed Room</li>
      <li>Living Room</li>
      <li>Bath Room</li>
      <li>Dining</li>
    </ul>
  );
}

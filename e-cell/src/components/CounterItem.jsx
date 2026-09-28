import React, { useEffect, useState } from "react";

export default function CounterItem({ value, duration = 2200, isInView }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const startNum = 0;
    const endNum = parseInt(value, 10);

    const updateCounter = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic formula (shuru me tezi se bhaagega, aakhiri me smooth slow ho jayega)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * (endNum - startNum) + startNum);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(endNum);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, value, duration]);

  return <span>{displayValue.toLocaleString()}</span>;
}
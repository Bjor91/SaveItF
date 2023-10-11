import React from "react";
import "./Correlation.css";
import { useState, useEffect } from "react";

const Correlation = () => {
  const [visibleItems, setVisibleItems] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleItems((prev) => prev + 1); // increment visibleItems by 1
    }, 2000); // set interval time (2000ms = 2 seconds)

    return () => clearInterval(timer); // cleanup interval on component unmount
  }, []); // empty dependency array means this useEffect runs once on mount

  return (
    <div className="listOfCorrelations">
      <h2 className={`fade ${visibleItems >= 1 ? "visible" : ""}`}>
        Unexpected Correlations Among Active Savers (Sponsored by chatGPT)
      </h2>
      <ul>
        <li className={`fade ${visibleItems >= 2 ? "visible" : ""}`}>
          <strong>1. Physical Activity:</strong> Active savers often engage in
          regular exercise and maintain healthier lifestyles.
        </li>

        <li className={`fade ${visibleItems >= 3 ? "visible" : ""}`}>
          <strong>2. Relationship Stability:</strong> Active savers may
          experience more stable and satisfying relationships.
        </li>

        <li className={`fade ${visibleItems >= 4 ? "visible" : ""}`}>
          <strong>3. Better Mental Health:</strong> Active savers often engage
          in regular exercise and maintain healthier lifestyles.
        </li>

        <li className={`fade ${visibleItems >= 5 ? "visible" : ""}`}>
          <strong>4. Physical Activity:</strong> People who save regularly may
          report lower levels of stress and better overall mental health.
          Financial security can significantly reduce anxiety and related mental
          health issues.
        </li>

        <li className={`fade ${visibleItems >= 6 ? "visible" : ""}`}>
          <strong>5. Volunteering and Community Engagement:</strong> Active
          savers may be more likely to volunteer and engage with their
          communities. This correlation could reflect a general sense of
          responsibility and planning for the future.
        </li>

        <li className={`fade ${visibleItems >= 7 ? "visible" : ""}`}>
          <strong>6. Environmental Consciousness:</strong> People who actively
          save may also be more conscious of their environmental impact. Both
          habits may stem from a mindset of conservation and efficiency.
        </li>
      </ul>
    </div>
  );
};

export default Correlation;

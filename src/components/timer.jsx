import { useState, useEffect } from "react";

const Timer = () => {
  const [seconds, setseconds] = useState(0);
  const startTimer = () =>
    setInterval(() => {
      setseconds(seconds + 1);
      console.log("setInterval");
    }, 1000);
  //   startTimer();
  useEffect(() => {
    startTimer;
  }, []);

  return <div className="ps">{seconds}</div>;
};

export default Timer;

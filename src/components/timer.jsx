import { useState, useEffect } from "react";

const Timer = () => {
  const [seconds, setseconds] = useState(0);
  useEffect(() => {
    const int = setInterval(() => {
      setseconds((seconds) => seconds + 1);
      // console.log(seconds)
    }, 1000);
    return () => clearInterval(int);
  }, []);

  return <div className="">{seconds}</div>;
};

export default Timer;
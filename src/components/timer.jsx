import { useState, useEffect } from "react";

const Timer = ({ stop  }) => {
  const [seconds, setseconds] = useState(0);
  useEffect(() => {
    if (!stop) {
      const int = setInterval(() => {
        setseconds((seconds) => seconds + 1);
        // console.log(seconds)
      }, 1000);
      return () => (int || stop? clearInterval(int) : false);
    }
  }, [stop]);

  return <div className="">{seconds}</div>;
};

export default Timer;

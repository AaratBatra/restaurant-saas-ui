import React from "react";

const TimeAndDate = ({className}: {className?: string}) => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(now);

  return <span className={className}>{formattedDate}</span>;
};

export default TimeAndDate;

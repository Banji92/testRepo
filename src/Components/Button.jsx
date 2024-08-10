import React from "react";

const Button = ({ type, className, text }) => {
  // const style =`h-14 rounded-lg  text-16px w-full text-white ${className}`
  const defaultTextColorClass = "text-white";
  const hasTextColorClass = className && className.includes("text-");
  const style = `h-14 rounded-lg text-16px w-full ${
    !hasTextColorClass ? defaultTextColorClass : ""
  } ${className}`;

  return (
    <button className={style} type={type}>
      {text}
    </button>
  );
};

export default Button;

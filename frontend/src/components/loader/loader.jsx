import React from "react";
import { Icons } from "../../constants"; 

const Loading = () => {
  const letters = ["S", "c", "h", "e", "d", "u", "L",Icons.schedulX, ".", "."]; 

  return (
    <div className="h-screen flex justify-center items-center">
    <div className="flex flex-wrap justify-center space-x-2">
      {letters.map((letter, index) => (
        <div
          key={index}
          className={`${
            letter === "x"
              ? "text-red-600 pb-20 text-4xl sm:text-6xl lg:text-8xl font-extrabold"
              : "text-black dark:text-white text-3xl sm:text-5xl lg:text-7xl font-extrabold"
          } font-audiowide uppercase tracking-widest animate-bounce`}
          style={{
            animationDelay: `${index * 0.1}s`,
            textShadow:
              "0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 7px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15), 0 30px 20px rgba(0,0,0,.1)",
          }}
        >
          {letter === "x" ? (
            <span className="text-red-600">
              {Icons.schedulLoader}
            </span>
          ) : (
            letter
          )}
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default Loading;
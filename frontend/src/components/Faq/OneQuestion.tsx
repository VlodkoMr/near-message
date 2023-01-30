import React, { useState } from "react";

type Props = {
  title: string,
  index: number,
  children: React.ReactNode
}

const OneQuestion: React.FC<Props> = ({ title, index, children }: Props) => {
  const [ openedIndex, setOpenedIndex ] = useState(0);

  return (<div
      onClick={() => setOpenedIndex(index)}
      className={`mb-6 relative group
      ${index === openedIndex ? "cursor-default" : "cursor-pointer"}
      ${index !== 16 ? "border-b border-white/20" : "mb-20"}`}>
      <div
        className={`absolute w-10 h-10 rounded-full text-center middle -top-1 right-0
        ${
          index === openedIndex
            ? "bg-sky-900 cursor-default opacity-50"
            : "bg-sky-900 cursor-pointer group-hover:opacity-80 transition"
        }`}
      >
        <span className="inline-block pt-1 text-2xl font-semibold">
          {index === openedIndex ? "−" : "+"}
        </span>
      </div>

      <div className={`text-xl lg:text-2xl font-semibold mb-6 pr-12 transition
      ${index === openedIndex ? "" : "group-hover:text-white/80"}`}>{title}</div>
      <div className={`text-gray-300/90 ${index === openedIndex ? "h-auto mb-6" : "h-0"} pr-12 lg:pr-16 overflow-hidden transition`}>
        {children}
      </div>
    </div>
  )
}

export default OneQuestion;
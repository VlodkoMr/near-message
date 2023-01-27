import React from "react";

type Props = {
  title: string,
  text: string
};

const SectionTitle: React.FC = ({ title, text }: Props) => (
  <div className="flex flex-wrap mx-[-16px]">
    <div className="w-full px-4">
      <div className={`mx-auto max-w-[655px] text-center wow fadeInUp ${text && text.length > 0 ? "mb-[50px] md:mb-[90px]" : "mb-[60px]"}`}
           data-wow-delay=".1s">
        <h2 className="text-black dark:text-white font-bold text-3xl sm:text-4xl md:text-[45px] mb-4">
          {title}
        </h2>
        {text && text.length > 0 && (
          <p className="text-body-color text-base md:text-lg leading-relaxed md:leading-relaxed max-w-[570px] mx-auto">
            {text}
          </p>
        )}
      </div>
    </div>
  </div>
);

export default SectionTitle;
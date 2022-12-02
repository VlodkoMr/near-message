import React from "react";

export const PriceBlock = ({ price, plan, description, children }) => (
  <div className="w-full md:w-1/2 lg:w-1/3 px-4">
    <div className="relative z-10 bg-white dark:bg-[#1D2144] shadow-signUp px-8 py-10 rounded-md mb-6 md:mb-10 wow fadeInUp"
         data-wow-delay=".1s">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-black dark:text-white text-3xl mb-2 price">
          <span className="amount">{price}</span>
        </h3>
        <h4 className="text-white font-bold text-xl mb-2 text-white/70">{plan}</h4>
      </div>
      <p className="text-base text-body-color mb-7">
        {description}
      </p>
      <div className={`border-t border-body-color dark:border-white border-opacity-10 dark:border-opacity-10 pt-10`}>
        {children}
      </div>
      <div className="absolute bottom-0 right-0 z-[-1]">
        <img src={require("../../assets/img/price-img.svg")} alt=""/>
      </div>
    </div>
  </div>
)

export const PriceBlock = ({ price, plan, description, children }) => (
  <div className="w-full md:w-1/2 lg:w-1/3 px-4">
    <div className="relative z-10 bg-white dark:bg-[#1D2144] shadow-signUp px-8 py-10 rounded-md mb-10 wow fadeInUp"
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
        <svg
          width="179"
          height="158"
          viewBox="0 0 179 158"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M75.0002 63.256C115.229 82.3657 136.011 137.496 141.374 162.673C150.063 203.47 207.217 197.755 202.419 167.738C195.393 123.781 137.273 90.3579 75.0002 63.256Z"
            fill="url(#paint0_linear_70:153)"
          />
          <path
            opacity="0.3"
            d="M178.255 0.150879C129.388 56.5969 134.648 155.224 143.387 197.482C157.547 265.958 65.9705 295.709 53.1024 246.401C34.2588 174.197 100.939 83.7223 178.255 0.150879Z"
            fill="url(#paint1_linear_70:153)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_70:153"
              x1="69.6694"
              y1="29.9033"
              x2="196.108"
              y2="83.2919"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0.62"/>
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0"/>
            </linearGradient>
            <linearGradient
              id="paint1_linear_70:153"
              x1="165.348"
              y1="-75.4466"
              x2="-3.75136"
              y2="103.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0.62"/>
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  </div>
)

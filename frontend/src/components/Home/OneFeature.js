export const OneFeature = ({ title, icon, text }) => (
  <div className="w-full md:w-1/2 lg:w-1/3 px-4">
    <div className="mb-[36px] md:mb-[70px] wow fadeInUp text-center" data-wow-delay=".15s">
      <div
        className="w-[80px] h-[80px] flex items-center justify-center mx-auto rounded-full bg-primary
          bg-opacity-10 mb-4 md:mb-6 text-primary"
      >
        {icon}
      </div>
      <h3 className="font-bold text-black dark:text-white text-xl sm:text-2xl lg:text-xl xl:text-2xl mb-5">
        {title}
      </h3>
      <p className="text-body-color text-base leading-relaxed font-medium px-8">
        {text}
      </p>
    </div>
  </div>
)

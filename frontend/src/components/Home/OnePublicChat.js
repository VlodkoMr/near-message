export const OnePublicChat = ({ chat }) => (
  <div className="w-full md:w-1/2 lg:w-1/3 px-4">
    <div className="shadow-one bg-white dark:bg-[#1D2144] rounded-md p-8 lg:px-5 xl:px-8 mb-10 wow fadeInUp"
         data-wow-delay=".1s"
    >
      <div className="flex items-center mb-5">
        img
      </div>
      <p className="text-base text-body-color dark:text-white leading-relaxed pb-8 border-b border-body-color
                  dark:border-white border-opacity-10 dark:border-opacity-10 mb-8">
        “Our members are so impressed. It's intuitive. It's clean. It's
        distraction free. If you're building a community.
      </p>
      <div className="flex items-center">
        <div className="rounded-full overflow-hidden max-w-[50px] w-full h-[50px] mr-4">
          <img src="images/testimonials/author-01.png" alt="image"/>
        </div>
        <div className="w-full">
          <h5 className="text-lg lg:text-base xl:text-lg text-dark dark:text-white font-semibold mb-1">
            Musharof Chy
          </h5>
          <p className="text-sm text-body-color">
            Founder @TailGrids
          </p>
        </div>
      </div>
    </div>
  </div>
)

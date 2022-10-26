export const OnePublicChat = ({ chat }) => (
  <div className="w-full md:w-1/2 lg:w-1/3 px-4">
    <div className="shadow-one bg-white dark:bg-[#1D2144] rounded-md p-8 lg:px-5 xl:px-8 mb-10 wow fadeInUp"
         data-wow-delay=".1s"
    >
      <div className={`flex flex-row border-b border-body-color dark:border-white border-opacity-10 
      dark:border-opacity-10 pb-4 mb-4`}>
        <div className="flex items-center w-32">
          img
        </div>
        <p className="text-base text-body-color dark:text-white leading-relaxed">
          Our members are so impressed. It's intuitive. It's clean.
        </p>
      </div>

      <div className="flex items-center">
        <div className="w-full flex flex-row justify-between">
          <p className="text-sm text-body-color">
            ___ members
          </p>
          <p>
            Join
          </p>
        </div>
      </div>
    </div>
  </div>
)

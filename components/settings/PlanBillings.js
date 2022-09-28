const PlanBilling = () => {
  const upgradePlan = () => {}

  const cancelSubscription = () => {}

  return (
    <div className="px-9 pt-9 pb-16 rounded-2xl bg-white">
      <div className=" flex justify-between ">
        <div>
          <h3 className="text-base font-bold mb-9">Current Plans</h3>

          <span className="block text-xl font-bold mb-3">Basic</span>

          <p className="text-4xl font-semibold text-[#3DD598]">
            $ 16.00
            <span className="text-xl font-medium text-primary ml-2">USD</span>
            <span className="text-xs font-normal text-primary">/per month</span>
          </p>

          <div className="flex gap-6 mt-11 mb-20 items-center">
            <button className=" text-base text-white py-3 px-6 font-semibold bg-primary rounded-xl shadow-md">
              Cancel Subscription
            </button>

            <button className=" text-base text-white py-3 px-6 font-semibold bg-gradient-to-tr from-[#FF974A] to-[#FFBA42] rounded-xl">
              Upgrade Plans
            </button>
          </div>

          <div>
            <h3 className="text-xl font-bold text-primary">Billing Info</h3>
            <span className="text-sm font-normal text-primary">
              Your Next payment will be billed on
            </span>
            <span className="text-base font-bold text-[#3DD598] block mt-6">
              15 Apr, 2022
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-12 items-center text-white">
          <div className="relative">
            <svg
              width="451"
              height="288"
              viewBox="0 0 451 288"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_224_28)">
                <rect
                  width="451"
                  height="288"
                  rx="16"
                  fill="url(#paint0_linear_224_28)"
                />
                <path
                  d="M63.5 454C197.981 454 307 344.534 307 209.5C307 74.4664 197.981 -35 63.5 -35C-70.9813 -35 -180 74.4664 -180 209.5C-180 344.534 -70.9813 454 63.5 454Z"
                  fill="#FFC34A"
                />
                <path
                  d="M439 179C511.902 179 571 120.125 571 47.5C571 -25.1254 511.902 -84 439 -84C366.098 -84 307 -25.1254 307 47.5C307 120.125 366.098 179 439 179Z"
                  fill="#FFC34A"
                />
                <g clipPath="url(#clip1_224_28)">
                  <path
                    opacity="0.6"
                    d="M394.475 251.414C405.638 251.414 414.687 242.367 414.687 231.207C414.687 220.047 405.638 211 394.475 211C383.312 211 374.263 220.047 374.263 231.207C374.263 242.367 383.312 251.414 394.475 251.414Z"
                    fill="white"
                  />
                  <path
                    d="M369.212 251.414C380.375 251.414 389.424 242.367 389.424 231.207C389.424 220.047 380.375 211 369.212 211C358.049 211 349 220.047 349 231.207C349 242.367 358.049 251.414 369.212 251.414Z"
                    fill="white"
                  />
                </g>
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_224_28"
                  x1="225.5"
                  y1="0"
                  x2="225.5"
                  y2="288"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FF974A" />
                  <stop offset="1" stopColor="#FFBA42" />
                </linearGradient>
                <clipPath id="clip0_224_28">
                  <rect width="451" height="288" rx="16" fill="white" />
                </clipPath>
                <clipPath id="clip1_224_28">
                  <rect
                    width="65.687"
                    height="40.413"
                    fill="white"
                    transform="translate(349 211)"
                  />
                </clipPath>
              </defs>
            </svg>

            <div className="absolute inset-0 p-9 flex flex-col justify-between h-full">
              <div className="flex justify-between w-full ">
                <span className="text-2xl font-medium">HeshamSqrat</span>
                <span className="text-2xl font-medium">$16.00</span>
              </div>
              <div className="flex flex-col gap-6">
                <span className="text-2xl font-medium flex items-center gap-4">
                  4756
                  <svg
                    width="123"
                    height="8"
                    viewBox="0 0 123 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_225_43)">
                      <path
                        d="M44.919 3.93199C44.919 2.87271 45.3398 1.85682 46.0888 1.1078C46.8378 0.358784 47.8537 -0.0620117 48.913 -0.0620117C49.9723 -0.0620117 50.9882 0.358784 51.7372 1.1078C52.4862 1.85682 52.907 2.87271 52.907 3.93199C52.907 4.99126 52.4862 6.00715 51.7372 6.75617C50.9882 7.50519 49.9723 7.92599 48.913 7.92599C47.8537 7.92599 46.8378 7.50519 46.0888 6.75617C45.3398 6.00715 44.919 4.99126 44.919 3.93199V3.93199ZM29.948 3.93199C29.948 2.87271 30.3688 1.85682 31.1178 1.1078C31.8668 0.358784 32.8827 -0.0620116 33.942 -0.0620116C35.0013 -0.0620116 36.0172 0.358784 36.7662 1.1078C37.5152 1.85682 37.936 2.87271 37.936 3.93199C37.936 4.99126 37.5152 6.00715 36.7662 6.75617C36.0172 7.50519 35.0013 7.92599 33.942 7.92599C32.8827 7.92599 31.8668 7.50519 31.1178 6.75617C30.3688 6.00715 29.948 4.99126 29.948 3.93199V3.93199ZM14.971 3.93199C14.9876 2.88353 15.4157 1.88362 16.163 1.14804C16.9104 0.412464 17.9169 0.000192314 18.9655 0.000192314C20.0141 0.000192314 21.0206 0.412464 21.768 1.14804C22.5153 1.88362 22.9434 2.88353 22.96 3.93199C22.9434 4.98045 22.5153 5.98036 21.768 6.71593C21.0206 7.45151 20.0141 7.86378 18.9655 7.86378C17.9169 7.86378 16.9104 7.45151 16.163 6.71593C15.4157 5.98036 14.9876 4.98045 14.971 3.93199V3.93199ZM0 3.93199C0.00845411 2.88101 0.433942 1.87641 1.18291 1.13906C1.93188 0.40172 2.94302 -0.00799991 3.994 -1.17198e-05C5.04516 -0.00826641 6.05655 0.401336 6.80574 1.13871C7.55492 1.87608 7.98055 2.88083 7.989 3.93199C7.98494 4.45255 7.87839 4.96722 7.67543 5.4466C7.47246 5.92599 7.17706 6.3607 6.80609 6.72592C6.43511 7.09113 5.99583 7.3797 5.51334 7.57514C5.03084 7.77059 4.51456 7.86907 3.994 7.86499C2.94284 7.87298 1.93156 7.46312 1.18256 6.72556C0.433562 5.988 0.00819033 4.98314 0 3.93199H0Z"
                        fill="white"
                      />
                      <path
                        d="M114.808 3.93199C114.825 2.88353 115.253 1.88362 116 1.14804C116.747 0.412464 117.754 0.000192314 118.803 0.000192314C119.851 0.000192314 120.858 0.412464 121.605 1.14804C122.352 1.88362 122.78 2.88353 122.797 3.93199C122.78 4.98045 122.352 5.98036 121.605 6.71593C120.858 7.45151 119.851 7.86378 118.803 7.86378C117.754 7.86378 116.747 7.45151 116 6.71593C115.253 5.98036 114.825 4.98045 114.808 3.93199V3.93199ZM99.832 3.93199C99.832 2.87271 100.253 1.85682 101.002 1.1078C101.751 0.358784 102.767 -0.0620117 103.826 -0.0620117C104.885 -0.0620117 105.901 0.358784 106.65 1.1078C107.399 1.85682 107.82 2.87271 107.82 3.93199C107.82 4.99126 107.399 6.00715 106.65 6.75617C105.901 7.50519 104.885 7.92599 103.826 7.92599C102.767 7.92599 101.751 7.50519 101.002 6.75617C100.253 6.00715 99.832 4.99126 99.832 3.93199V3.93199ZM84.861 3.93199C84.861 2.87271 85.2818 1.85682 86.0308 1.1078C86.7798 0.358784 87.7957 -0.0620116 88.855 -0.0620116C89.9143 -0.0620116 90.9302 0.358784 91.6792 1.1078C92.4282 1.85682 92.849 2.87271 92.849 3.93199C92.849 4.99126 92.4282 6.00715 91.6792 6.75617C90.9302 7.50519 89.9143 7.92599 88.855 7.92599C87.7957 7.92599 86.7798 7.50519 86.0308 6.75617C85.2818 6.00715 84.861 4.99126 84.861 3.93199V3.93199ZM69.884 3.93199C69.8925 2.88101 70.3179 1.87641 71.0669 1.13906C71.8159 0.40172 72.827 -0.00799991 73.878 -1.17198e-05C74.3984 -0.00409866 74.9146 0.0943653 75.397 0.289758C75.8793 0.485151 76.3185 0.773645 76.6894 1.13877C77.0603 1.50389 77.3556 1.93849 77.5585 2.41775C77.7614 2.89702 77.8679 3.41156 77.872 3.93199C77.8681 4.45251 77.7616 4.96715 77.5588 5.44653C77.3559 5.92591 77.0606 6.36063 76.6897 6.72585C76.3188 7.09108 75.8796 7.37967 75.3972 7.57512C74.9147 7.77058 74.3985 7.86907 73.878 7.86499C72.8268 7.87298 71.8156 7.46312 71.0666 6.72556C70.3176 5.988 69.8922 4.98314 69.884 3.93199V3.93199Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_225_43">
                        <rect width="122.796" height="7.865" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  9018
                </span>
                <span>03/25</span>
              </div>
            </div>
          </div>

          <div className="flex gap-12">
            <div className="hover:-translate-y-1 duration-300">
              <button className="block w-full text-base text-white py-3 px-6 font-semibold bg-primary rounded-xl shadow-md">
                Remove Card
              </button>
            </div>

            <div className="hover:-translate-y-1 duration-300">
              <button className="block w-full text-base text-white py-3 px-6 font-semibold bg-gradient-to-tr from-[#FF974A] to-[#FFBA42] rounded-xl">
                Edit Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlanBilling

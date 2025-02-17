import AuthDialog from "./AuthDialog";
import { FlickeringGrid } from "./ui/magicui/flickering-grid";

export function Hero() {
  return (
    <section className="relative overflow-hidden h-screen flex items-center justify-center">
      {/* Background with Flickering Grid */}
      <div className="absolute w-full inset-0 -z-10 overflow-hidden rounded-lg">
        <FlickeringGrid
          className="relative inset-0 z-0 [mask-image:linear-gradient(to_bottom,white,transparent)]"
          squareSize={4}
          gridGap={6}
          color="#60A5FA"
          maxOpacity={0.4}
          flickerChance={0.1}
          height={800}
          width={1900}
        />
      </div>

      <div className="relative -mt-4 justify-center flex flex-col items-center w-full">
        <div className="text-center">
          <span className="text-sm select-none text-primary font-medium tracking-tight bg-primary/10 px-4 py-2 rounded-full">
            Introducing Schedulify
          </span>

          <h1 className="mt-8 select-none text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-none">
            Scheduling made{" "}
            <span className="block text-primary">super easy!</span>
          </h1>

          <p className="max-w-xl select-none mx-auto mt-4 lg:text-lg text-muted-foreground">
            Scheduling a meeting can be a pain. But we at Schedulify make it
            easy for your clients to schedule meetings with you.
          </p>

          <div className="p-4">
            <AuthDialog />
          </div>
        </div>

        <div className="relative items-center w-full mx-auto rounded-2xl -mt-16 md:rounded-full -z-20">
          <svg
            className="relative inset-0 blur-3xl"
            style={{ zIndex: -1 }}
            fill="none"
            viewBox="0 0 400 60"
            height="100%"
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_10_20)">
              <g filter="url(#filter0_f_10_20)">
                <path
                  d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z"
                  fill="#03FFE0"
                ></path>
                <path
                  d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z"
                  fill="#7C87F8"
                ></path>
                <path
                  d="M320 400H400V78.75L106.2 134.75L320 400Z"
                  fill="#4C65E4"
                ></path>
                <path
                  d="M400 0H128.6L106.2 134.75L400 78.75V0Z"
                  fill="#043AFF"
                ></path>
              </g>
            </g>
            <defs>
              <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="720.666"
                id="filter0_f_10_20"
                width="720.666"
                x="-160.333"
                y="-160.333"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  mode="normal"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  result="effect1_foregroundBlur_10_20"
                  stdDeviation="80.1666"
                ></feGaussianBlur>
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}

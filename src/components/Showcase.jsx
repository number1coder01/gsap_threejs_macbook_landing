import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Showcase = () => {
  const isTablet = useMediaQuery({ query: "(max-width :1024px)" });

  // ANIMATION acc to device
  useGSAP(() => {
    if (!isTablet) {
      // every animation starts with a timeline so set start end etc of that timeline here ->
      const timeline = gsap.timeline({
        scrollTrigger: {
          // yaha par we are triggering this animation when we reach the showcase section
          trigger: "#showcase",
          // start when top reaches the top of the section and end when bottom reaches the top of the section
          start: "top top",
          end: "bottom top",
          scrub: true, // Animation is linked to scroll position
          pin: true, // pause the scene 
        },
      });
      timeline.to('.mask img', {
        transform : 'scale(1.1)'
      }).to('.content' , {opacity : 1 , y : 0 , ease : 'power1.in'}) 
    }
  }, [isTablet]);

  return (
    <section id="showcase">
      <div className="media">
        {/* this video will play on repeat  */}
        {/* playsInline bole toh no control over play and pause the video and it depends on the scroll */}
        <video src="/videos/game.mp4" loop muted autoPlay playsInline />
        {/* mask on this video element */}
        <div className="mask">
          <img src="/mask-logo.svg" />
          {/* svgs use karte to create a mask kyuki they are easier 
          to be shown on top on another element */}
        </div>
      </div>
      <div className="content">
        <div className="wrapper">
          {/* full width nahi lagega nd will stay in the middle */}
          <div className="lg:max-w-md">
            <h2>Rocket Chip</h2>

            <div className="space-y-5 mt-7 pe-10">
              <p>
                Introducing{" "}
                <span className="text-white">
                  M4, the next generation of Apple silicon
                </span>
                . M4 powers
              </p>
              <p>
                It drives Apple Intelligence on iPad Pro, so you can write,
                create, and accomplish more with ease. All in a design that’s
                unbelievably thin, light, and powerful.
              </p>
              <p>
                A brand-new display engine delivers breathtaking precision,
                color accuracy, and brightness. And a next-gen GPU with
                hardware-accelerated ray tracing brings console-level graphics
                to your fingertips.
              </p>
              <p className="text-primary">
                Learn more about Apple Intelligence
              </p>
            </div>
          </div>

          <div className="max-w-3xs space-y-14">
            <div className="space-y-2">
              <p>Up to</p>
              <h3>4x faster</h3>
              <p>pro rendering performance than M2</p>
            </div>
            <div className="space-y-2">
              <p>Up to</p>
              <h3>1.5x faster</h3>
              <p>CPU performance than M2</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;

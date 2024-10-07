import { motion } from "framer-motion";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { Cursor, useTypewriter } from "react-simple-typewriter";


const Contact = () => {

  const [text, count] = useTypewriter({
    words: [
      "Treasure Trails Await!",
      "Stake, Seek, Earn!",
      "Dive Into Discovery!",
      "Quest for Crypto!",
      "Unlock the Hunt!",
    ],
    loop: true,
    delaySpeed: 1000,
  });

return (
  <div

      className={`xl:mt-0 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      {/* <Hero/> */}
      
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] '
      >
        <section className="w-full h-screen mx-auto">
      <div
        className={` cursor-pointer  h-screen max-w-7xl mx-auto flex lg:flex-row flex-col-reverse  pl-25 md:pl-10 mt-10 sm:justify-center items-start  md:gap-20 gap-5  pt-20`}>
        <div>
          <div className="flex gap-3 ">
            <div className="flex flex-col justify-center items-center mt-5">
              <div className="w-5 h-5 rounded-full bg-[#915eff]"></div>
              <div className="w-1 sm:h-80 h-40 violet-gradient"></div>
            </div>

            <div className="lg:w-[32rem]">
              <h1 className={`${styles.heroHeadText} text-white `}>
              Stake 
              <br />-N-
              <br />
              Seek<br />
                {/* <span className=" animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black">
                  Soham Chakraborty
                </span> */}
              </h1>

              <p
                className={`${styles.heroSubText} mt-2 text-white-100 max-w-lg`}
              >
                {text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
 
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[550px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
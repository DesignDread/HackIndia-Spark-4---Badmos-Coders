import React from 'react';
import { useInView } from 'react-intersection-observer';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { roadmap } from "../constants/index";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { float1, float2, float3, float4 } from "../constants"; // Ensure float images are correctly imported

// RoadmapCard component to display individual roadmap stages
const RoadmapCard = ({ roadmapItem }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1c1b22",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      iconStyle={{ background: "#232631" }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={roadmapItem.image} // Change this to a relevant icon if needed
            alt="roadmap stage"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">{roadmapItem.title}</h3>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {roadmapItem.points.map((point, index) => (
          <li
            key={`roadmap-point-${index}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  // Define useInView hooks for each floating image
  const [ref1, inView1] = useInView({ triggerOnce: true });
  const [ref2, inView2] = useInView({ triggerOnce: true });
  const [ref3, inView3] = useInView({ triggerOnce: true });
  const [ref4, inView4] = useInView({ triggerOnce: true });

  return (
    <div>
      <div className=""></div> {/* Spacing for scrolling effect */}

      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText} text-center`}>Road Map</h2>
      </motion.div>

      {/* Floating Images with scroll animation */}
      <div
        className={`absolute right-6 pt-28 pr-44 transition-all duration-700  `}
        ref={ref1}
      >
        <img src={float1} alt="" className="h-60 animate-moveUpDown" />
      </div>

      <div
        className={`absolute pt-96 pl-40 transition-all duration-700 `}
        ref={ref2}
      >
        <img src={float3} alt="" className="h-60 animate-moveUpDown" />
      </div>

      <div
        className={`absolute z-20 right-6 pt-[38rem] pr-44 transition-all duration-700  `}
        ref={ref3}
      >
        <img src={float4} alt="" className="h-72 animate-moveUpDown" />
      </div>

      <div
        className={`absolute pt-[55rem] pl-40 transition-all duration-1000  `}
        ref={ref4}
      >
        <img src={float2} alt="" className="h-60 animate-moveUpDown" />
      </div>

      {/* Roadmap Timeline */}
      <div className="mt-20 flex flex-col ">
        <VerticalTimeline>
          {roadmap.map((roadmapItem, index) => (
            <RoadmapCard key={`roadmap-${index}`} roadmapItem={roadmapItem}  />
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "work");

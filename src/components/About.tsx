import * as motion from "framer-motion/client";
import type React from "react";
import Tilt from "./client/Tilt";
import { services } from "@/constants";
import SectionWrapper from "@/hoc/SectionWrapper";
import { styles } from "@/styles";
import { fadeIn, textVariant } from "@/utils/motion";

interface ServiceCardProps {
  title: string;
  icon: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, icon, index }) => {
  return (
    <Tilt
      className="xs:w-[250px] w-full"
      tiltMaxAngleX={45}
      tiltMaxAngleY={45}
      scale={1}
      transitionSpeed={450}
    >
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full green-pin-gradient rounded-[20px] p-[1px] shadow-card"
      >
        <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex flex-col justify-evenly items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={icon} alt={title} className="w-16 h-16 object-contain" />
          <h3 className="text-white text-[20px] text-center">{title}</h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant(1)}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>About Nabin Thapa.</h2>
      </motion.div>
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] text-justify"
      >
        I&apos;m a software engineer based in Kathmandu, Nepal, currently
        building and maintaining production web applications at Intuji. Most of
        my work is front-end — React and TypeScript interfaces that stay
        responsive across screen sizes and consistent across browsers — but
        I&apos;m just as comfortable behind them, building REST APIs with
        Node.js and Express, designing PostgreSQL and MongoDB schemas, and
        shipping through Docker and GitHub Actions. I care about the details
        that outlast a demo: layouts that survive real content, APIs that fail
        clearly, and code the next person can read. If that sounds like your
        kind of project, let&apos;s talk.
      </motion.p>
      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");

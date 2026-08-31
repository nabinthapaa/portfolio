import * as motion from "framer-motion/client";
import { EarthCanvas } from "./canvas";
import ContactForm from "./client/ContactForm";
import SectionWrapper from "@/hoc/SectionWrapper";
import { styles } from "@/styles";
import { slideIn } from "@/utils/motion";

const Contact = () => {
  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden pb-10">
      <motion.div
        variants={slideIn("left", "tween", 0.25, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in Touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <ContactForm />
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.25, 1)}
        className="xl:flex-1 xl:h-auto md:h-[500px] h-[300px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");

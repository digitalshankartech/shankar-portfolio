import { motion } from "framer-motion";
import clsx from "clsx";
import { fadeUp, viewport } from "@/lib/motion";

interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({ eyebrow, title, description, align = "left", className }: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={clsx("max-w-3xl", align === "center" && "mx-auto text-center", className)}
    >
      <motion.p variants={fadeUp} custom={0} className="eyebrow mb-4">
        {eyebrow}
      </motion.p>
      <motion.h2 variants={fadeUp} custom={1} className="h2">
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={fadeUp} custom={2} className="lead mt-5">
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

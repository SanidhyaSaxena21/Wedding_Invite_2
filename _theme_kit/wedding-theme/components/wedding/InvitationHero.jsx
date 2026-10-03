import React from "react";
import { motion } from "framer-motion";
import bgPage2 from "../../assets/bg-page2.jpeg";
import {
  GaneshaMark,
  SignalWave,
  CornerFloral,
  HeartChip,
  LotusDivider,
} from "./ornaments";

const ease = [0.22, 0.61, 0.36, 1];

// Each content block fades/scales up slowly in a choreographed order.
const reveal = (delay) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, delay, ease },
});

// Decorative gold PCB border that draws itself when the page forms.
const PcbBorder = ({ active }) => (
  <svg className="inv-border" viewBox="0 0 400 720" preserveAspectRatio="none" aria-hidden="true">
    <motion.path
      className="inv-border-path"
      d="M40 26 H300 L360 26 M360 26 V90 M374 40 V120
         M374 120 H340 M374 160 V300 M360 300 H374 V420
         M374 460 V640 L334 694 H120 M360 694 H40 L26 680 V560
         M26 520 V360 M40 360 H26 V240 M26 200 V96 L60 26 H120"
      fill="none"
      stroke="#C9923E"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={active ? { pathLength: 1, opacity: 0.9 } : { pathLength: 0, opacity: 0 }}
      transition={{ duration: 2.4, ease: "easeInOut" }}
    />
    {/* corner contact pads */}
    {active &&
      [
        [360, 26],
        [374, 160],
        [360, 300],
        [40, 360],
        [26, 520],
        [334, 694],
      ].map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="3"
          fill="#E1B96C"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 0.6, delay: 1.6 + i * 0.1 }}
        />
      ))}
  </svg>
);

export const InvitationHero = ({ active = false, instant = false }) => {
  const on = active || instant;
  const d = (x) => (instant ? 0 : x);
  return (
    <section
      className="inv-root"
      style={{ backgroundImage: `url(${bgPage2})` }}
      data-testid="invitation-page"
    >
      <div className="inv-vignette" aria-hidden="true" />
      <PcbBorder active={on} />

      <CornerFloral size={160} className="inv-floral inv-floral-bl" />
      <CornerFloral size={160} className="inv-floral inv-floral-br" flip />

      <div className="inv-content">
        <motion.div {...reveal(d(0))} animate={on ? reveal(0).animate : reveal(0).initial}>
          <GaneshaMark size={60} className="inv-ganesha" />
        </motion.div>

        <motion.p
          className="inv-namah"
          {...reveal(d(0.4))}
          animate={on ? reveal(0.4).animate : reveal(0.4).initial}
        >
          || Shree Ganeshaay Namah ||
        </motion.p>

        <motion.div
          className="inv-names-wrap"
          initial={{ opacity: 0 }}
          animate={on ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: d(1.0) }}
        >
          <h1 className="inv-names" data-testid="couple-names">
            Sanidhya <span className="inv-amp">&amp;</span> Vasudha
          </h1>
          <motion.span
            className="inv-sweep"
            initial={{ x: "-120%" }}
            animate={on ? { x: "120%" } : { x: "-120%" }}
            transition={{ duration: 1.4, delay: d(1.0), ease: "easeInOut" }}
            aria-hidden="true"
          />
        </motion.div>

        <motion.p
          className="inv-subtitle"
          {...reveal(d(1.7))}
          animate={on ? reveal(1.7).animate : reveal(1.7).initial}
        >
          An Integrated Circuit of Love
        </motion.p>

        <motion.div
          className="inv-wave"
          initial={{ opacity: 0 }}
          animate={on ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: d(2.2) }}
        >
          <SignalWave width={320} draw={on} />
        </motion.div>

        <motion.blockquote
          className="inv-quote"
          {...reveal(d(2.8))}
          animate={on ? reveal(2.8).animate : reveal(2.8).initial}
        >
          <span>“Two signals locked in phase,</span>
          <span>integrated on the same silicon,</span>
          <span>wired together for a lifetime of love.”</span>
        </motion.blockquote>

        <motion.div
          className="inv-heartchip"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={on ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.0, delay: d(3.6), ease }}
        >
          <HeartChip width={168} energized={on} />
        </motion.div>

        <motion.div
          className="inv-bottom-divider"
          {...reveal(d(4.0))}
          animate={on ? reveal(4.0).animate : reveal(4.0).initial}
        >
          <LotusDivider width={180} />
        </motion.div>
      </div>
    </section>
  );
};

export default InvitationHero;

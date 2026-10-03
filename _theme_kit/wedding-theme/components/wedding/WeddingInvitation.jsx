import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import bgPage1 from "../../assets/bg-page1.jpeg";
import { CircuitTrace } from "./CircuitTrace";
import { WeddingChip } from "./WeddingChip";
import { InvitationHero } from "./InvitationHero";
import { LotusDivider } from "./ornaments";
import "./wedding.css";

// phases: idle -> signal -> opening -> transition -> invitation
const TIMINGS = { signal: 1000, opening: 1300, transition: 2200 };
const REDUCED_TIMINGS = { signal: 250, opening: 350, transition: 650 };

const initialPhase = () => {
  if (typeof window !== "undefined") {
    if (window.location.hash === "#invite") return "invitation";
    if (window.location.hash === "#open") return "opening";
  }
  return "idle";
};

export const WeddingInvitation = () => {
  const [phase, setPhase] = useState(initialPhase);
  const debugInstant =
    typeof window !== "undefined" && window.location.hash === "#invite";
  const [reduced, setReduced] = useState(false);
  const timers = useRef([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // lock scrolling until the invitation is fully revealed
  useEffect(() => {
    document.body.style.overflow = phase === "invitation" ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [phase]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const run = useCallback(
    (startFrom = "signal") => {
      clearTimers();
      const t = reduced ? REDUCED_TIMINGS : TIMINGS;
      setPhase("signal");
      timers.current.push(setTimeout(() => setPhase("opening"), t.signal));
      timers.current.push(setTimeout(() => setPhase("transition"), t.signal + t.opening));
      timers.current.push(
        setTimeout(() => setPhase("invitation"), t.signal + t.opening + t.transition)
      );
    },
    [reduced]
  );

  const begin = useCallback(() => {
    if (phase !== "idle") return;
    run();
  }, [phase, run]);

  const replay = useCallback(() => {
    clearTimers();
    setPhase("idle");
    timers.current.push(setTimeout(() => run(), 120));
  }, [run]);

  useEffect(() => () => clearTimers(), []);

  const pushingIn = phase === "transition" || phase === "invitation";
  const showPage2 = phase === "transition" || phase === "invitation";
  const energizeTraces = phase !== "idle";

  return (
    <div className="wc-root" data-testid="wedding-invitation">
      {/* PAGE 1 — the wedding chip */}
      <AnimatePresence>
        {phase !== "invitation" && (
          <motion.section
            className="wc-page1"
            style={{ backgroundImage: `url(${bgPage1})` }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              scale: pushingIn ? (reduced ? 1.4 : 7) : 1,
              opacity: pushingIn ? 0 : 1,
              filter: pushingIn ? "brightness(1.4)" : "brightness(1)",
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduced ? 0.6 : 2.2,
              ease: [0.6, 0.0, 0.2, 1],
            }}
            data-testid="wedding-chip-page"
          >
            <div className="wc-page1-vignette" aria-hidden="true" />
            <CircuitTrace energized={energizeTraces} className="wc-trace-layer" />

            <div className="wc-chip-stage">
              <WeddingChip phase={phase} reduced={reduced} onTap={begin} />

              <motion.div
                className="wc-tap"
                animate={{ opacity: phase === "idle" ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                aria-hidden={phase !== "idle"}
              >
                <LotusDivider width={200} className="wc-tap-divider" />
                <span className="wc-tap-text">Tap to Begin</span>
                <LotusDivider width={200} className="wc-tap-divider" />
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* PAGE 2 — Sanidhya & Vasudha, emerging from inside the chip */}
      {showPage2 && (
        <motion.div
          className="wc-page2-layer"
          initial={{ opacity: 0, scale: reduced ? 1.02 : 1.14 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduced ? 0.6 : 2.2, ease: [0.6, 0.0, 0.2, 1] }}
        >
          <InvitationHero active={phase === "invitation"} instant={debugInstant} />
        </motion.div>
      )}

      {/* developer replay control */}
      {phase === "invitation" && (
        <button
          type="button"
          className="wc-replay"
          onClick={replay}
          aria-label="Replay the opening animation"
          data-testid="replay-button"
        >
          <RotateCcw size={16} />
          <span>Replay</span>
        </button>
      )}
    </div>
  );
};

export default WeddingInvitation;

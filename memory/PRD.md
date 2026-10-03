# PRD — Sanidhya & Vasudha | An Integrated Circuit of Love

## Original Problem Statement
Build the first two screens of a premium interactive Indian wedding invitation for
Sanidhya & Vasudha. Theme: Luxury Indian Wedding × VLSI Chip Design (70% wedding /
30% electronics). Burgundy + antique-gold palette ONLY (no blue/navy/black/neon).
Page 1 = an interactive burgundy IC "chip" that opens like a jewellery box. Page 2 =
the invitation that seamlessly morphs out of the chip. Mobile-first (WhatsApp guests).

## Architecture / Stack
- Frontend only: React 19 + Framer Motion + CSS 3D transforms + inline SVG.
- No backend / DB required for these two screens.
- Custom AI-generated burgundy wedding backgrounds in `src/assets/`.
- Fonts: Cinzel Decorative, Cinzel, Cormorant Garamond, Cormorant SC.

## Components (`src/components/wedding/`)
- `WeddingInvitation.jsx` — orchestrator: phase machine idle→signal→opening→transition→invitation,
  scroll-lock, prefers-reduced-motion, camera-push morph, Replay button, debug hashes.
- `WeddingChip.jsx` — Page 1 chip body, gold pins (sequential light-up), 3D lid.
- `ChipInterior.jsx` — glowing silicon die, bond-wires, heart-circuit forming.
- `CircuitTrace.jsx` — animated gold PCB traces (stroke-dashoffset signal travel).
- `InvitationHero.jsx` — Page 2, choreographed sequential reveal (0→4s) + drawn PCB border.
- `ornaments.jsx` — Ganesha, HeartCircuit, LotusDivider, CornerFloral, SignalWave, HeartChip.
- `wedding.css` — full palette + all keyframes/3D.

## Implemented (2026-06)
- Page 1 wedding chip (100vh), breathing glow, idle trace shimmer, "Tap to Begin".
- Tap interaction: signal travel → pins light → lid lifts (CSS 3D) → die + heart form.
- Seamless camera-push morph into Page 2.
- Page 2 full invitation with choreographed reveal matching the brief timeline.
- Reduced-motion fallback (crossfade), scroll lock until reveal, favicon heart-chip mark.
- Debug: `#open` (chip open state), `#invite` (instant Page 2), on-screen Replay button.

## Verified
- Page 1, chip-open, and Page 2 all confirmed via screenshots. Compiles clean.

## Backlog (not built — out of scope for now)
- P1: wedding date / venue / programme, RSVP, location/map.
- P2: navigation/menu, multi-section scroll, optional ceremonial sound toggle.

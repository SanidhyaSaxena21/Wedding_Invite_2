# Burgundy Wedding Chip — Theme & Transition Kit

A premium "Luxury Indian Wedding × VLSI Chip" theme with a seamless Page 1 → Page 2
chip-opening transition. React + Framer Motion + CSS 3D + inline SVG. No Tailwind required.

## 1. Install deps
    yarn add framer-motion lucide-react

## 2. Add fonts to public/index.html <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Cormorant+SC:wght@400;500;600&display=swap" rel="stylesheet" />

## 3. Copy files
- Copy everything in `components/wedding/` into your project's `src/components/wedding/`
- Copy `assets/bg-page1.jpeg` and `assets/bg-page2.jpeg` into `src/assets/`
- Copy `favicon.svg` into your `public/` (optional)

## 4. Use it
    import { WeddingInvitation } from "@/components/wedding/WeddingInvitation";
    // or relative: "./components/wedding/WeddingInvitation"

    function App() {
      return <WeddingInvitation />;
    }

Note: imports in these files use relative paths ("../../assets/...") so they work
without the "@/" alias. If your project uses the "@/" alias you can keep either.

## 5. Transition parameters (exact)
- Phases: idle -> signal(1000ms) -> opening(1300ms) -> transition(2200ms) -> invitation
- Page 1 camera push: scale 1->7, opacity 1->0, brightness 1->1.4,
  transform-origin center 54%, ease cubic-bezier(0.6,0,0.2,1), 2.2s
- Page 2 emerge: opacity 0->1, scale 1.14->1, same ease/duration (overlaps = morph)
- Lid lift (CSS): transform-origin center top, rotateX(0)->rotateX(-122deg),
  perspective 1500px, ease cubic-bezier(0.28,0.72,0.2,1)
- Signal traces: SVG stroke-dasharray/stroke-dashoffset; pins stagger 55ms
- Reduced-motion: scale 1->1.4 + crossfade (~0.6s)

## 6. Debug hashes
- /#open   -> jump to the open-chip state
- /#invite -> jump straight to the finished invitation
- On-screen "Replay" button replays the full sequence

## Palette
--burgundy-deep #3B0710  --wine #570B18  --maroon #6B101E
--gold-antique #C9923E   --gold-champagne #E1B96C
--ivory #F7E8CE          --amber #E89A3A

## Fonts
display: Cinzel Decorative | serif: Cinzel | body: Cormorant Garamond | small-caps: Cormorant SC

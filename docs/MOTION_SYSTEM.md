# BeeHive motion system

Used by concepts 09–12 only. Concepts 01–08 do not load these scripts.

## Principles

Motion explains a relationship. A line draws because a connection is forming. An icon changes colour because a step has become active. A photograph reveals because a chapter has been reached.

Motion does not float, bounce, spin or loop for decoration.

## Tokens

| Name | Duration | Use |
| --- | --- | --- |
| Fast | 160–220ms | Icon nudge, border emphasis |
| Standard | 300–450ms | Step activation |
| Section reveal | 500–750ms | Fade or short rise |
| Long visual | 700–1100ms | Network line draw, phase fill |

Easing is `ease-out`. No spring and no bounce.

Stagger is only for groups of 3–6 items, about 70–80ms apart. The Kinetic Hive entrance stays inside about 1100ms.

## Reveal classes

`js/v4-motion.js` adds `motion-ok` on `html` only when `prefers-reduced-motion` is not set. Elements already in view receive `is-in` before that class is added, so the first screen does not flash hidden.

| Attribute | Behaviour under `html.motion-ok` |
| --- | --- |
| `data-reveal="up"` | Fade and 14–16px rise, then settle |
| `data-reveal="fade"` | Fade, or the cinematic clip reveal on concept 11 |
| `data-reveal="line"` | The parent is observed; child steps or a phase bar fill once |

Without JavaScript, `motion-ok` is never added and every section stays visible.

## Scroll triggers

IntersectionObserver, threshold about 0.22. Each revealed block is unobserved after it enters. Nothing listens to the wheel and nothing traps scroll.

Concept 09 marks the network zone (`business`, `partner`, `shared`) when that band crosses the middle of the viewport.

Concept 12 marks the journey step whose box crosses the middle band (`rootMargin: -42% 0px -42% 0px`). The diagram uses `position: sticky` from 1000px. Below that, the page is a normal stack and the step photographs sit in the copy.

## Reduced motion

`prefers-reduced-motion: reduce` skips `motion-ok`. There is no parallax, no travelling line, no auto-moving network and no delayed fade. Concept 12 shows the full diagram instead of waiting on scroll. Content stays readable.

## Mobile

Below about 800px, concept 09 hides the SVG network and the depth shift. Concept 11 does not scale the hero. Concept 12 does not stick the diagram. Simple reveals and step emphasis remain.

## Performance

CSS transitions and keyframes, IntersectionObserver, and `requestAnimationFrame` only for the small hex shift on concepts 09 and 11. No animation library. Hero photographs are not lazy. Later photographs use `loading="lazy"`.

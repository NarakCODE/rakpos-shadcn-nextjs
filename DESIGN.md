# Design System

## Surfaces

- **Layer general surfaces in elevation order from `bg-bg-base` (`#ffffff` / `#121110`) → `bg-bg-primary` (`#ffffff` / `#171615`) → `bg-bg-secondary` (`#fafafa` / `#1e1d1c`) → `bg-bg-tertiary` (`#f5f5f5` / `#272625`) → `bg-bg-quaternary` (`#e8e8e8` / `#31302e`). Use `bg-bg-sidebar` for sidebars, `bg-bg-header` for headers, `bg-bg-overlay` for overlays, `bg-bg-tooltip` / `bg-bg-educational-tooltip` for tooltips, `bg-bg-<color>` / `bg-bg-<color>-hover` for status and accent tints, and `bg-control-*` (`bg-control-bg`, `bg-control-hover`, `bg-control-selected`, `bg-control-primary`, `bg-control-primary-hover`) for inputs, toggles, and selected states.**
  Why: Stepping warm-neutral dark surfaces (`#121110` up to `#31302e`) and dedicated control tokens establish elevation hierarchy without relying on heavy borders.
  <!-- 2026-11-20: "Background: Surfaces from the page base up to the most raised layer, plus tinted backgrounds for status and accents. Control: Backgrounds for inputs, toggles, and selected states." -->

- **On any surface using `shadow-low`, `shadow-medium`, or `shadow-high`, never add a separate neutral `border` or `ring-*` class. Apply interactive shadow states explicitly (e.g. `shadow-low hover:shadow-low-hover focus-visible:shadow-low-focus` or `shadow-medium hover:shadow-medium-hover focus-visible:shadow-medium-focus`), never add hover or focus states to `shadow-high`, use `*-borderless` variants when only depth is needed, and use `shadow-focus` when only the 3px focus halo is needed.**
  Why: Each regular shadow includes its 1px border ring; adding a separate neutral border or ring doubles the edge.
  <!-- 2026-11-20: "Each regular shadow includes its border. Do not add a separate neutral border or ring. Low and medium support hover and focus: hover adds a solid edge, while focus retains the depth and adds a 3px halo. High has no interaction states. Borderless keeps only the depth. Apply states explicitly, for example: shadow-low hover:shadow-low-hover focus-visible:shadow-low-focus. Use shadow-focus for the halo alone." -->

### Shadows

Each regular shadow includes its border. Do not add a separate neutral border or ring. Low and medium support hover and focus: hover adds a solid edge, while focus retains the depth and adds a 3px halo. High has no interaction states. Borderless keeps only the depth.

Apply states explicitly, for example: `shadow-low hover:shadow-low-hover focus-visible:shadow-low-focus`. Use `shadow-focus` for the halo alone.

| Level  | Regular         | Hover                 | Focus                 | Borderless                 |
| ------ | --------------- | --------------------- | --------------------- | -------------------------- |
| Low    | `shadow-low`    | `shadow-low-hover`    | `shadow-low-focus`    | `shadow-low-borderless`    |
| Medium | `shadow-medium` | `shadow-medium-hover` | `shadow-medium-focus` | `shadow-medium-borderless` |
| High   | `shadow-high`   | —                     | —                     | `shadow-high-borderless`   |

### Shadow Colors

Colors the shadow tokens are built from. CSS variables only; use them with `var()`.

| Token                   | Light                     | Dark                        |
| ----------------------- | ------------------------- | --------------------------- |
| `--color-shadow-ring-1` | `rgba(0, 0, 0, 0.02)`     | `rgba(0, 0, 0, 0)`          |
| `--color-shadow-ring-2` | `rgba(0, 0, 0, 0.05)`     | `rgba(214, 213, 212, 0.12)` |
| `--color-shadow-stroke` | `#ebebeb`                 | `#2c2b29`                   |
| `--color-shadow-1`      | `rgba(0, 0, 0, 0.02)`     | `rgba(0, 0, 0, 0)`          |
| `--color-shadow-2`      | `rgba(0, 0, 0, 0.05)`     | `rgba(0, 0, 0, 0.1)`        |
| `--color-shadow-red-1`  | `rgba(255, 95, 87, 0.08)` | `rgba(255, 95, 87, 0.15)`   |
| `--color-shadow-red-2`  | `rgba(255, 95, 87, 0.12)` | `rgba(255, 95, 87, 0.25)`   |
| `--color-shadow-red-3`  | `rgba(255, 95, 87, 0.2)`  | `rgba(255, 95, 87, 0.3)`    |

## Color

- **Always style backgrounds, controls, icons, indicators, text, borders, and workflow canvas elements with the semantic color tokens (`bg-bg-*`, `bg-control-*`, `fill-fill-*`, `text-text-*`, `border-border-gray`, `stroke-stroke-*`, `bg-workflow-*`). Reach for palette scale tokens (`bg-<color>-base`, `bg-<color>-border`, `bg-<color>-muted-fill`, `bg-<color>-emphasis`) only when no semantic token fits; never use raw hex/RGB/OKLCH literals or default Tailwind color scales.**
  Why: Semantic tokens carry both intent and paired light/dark theme values automatically, preventing ad-hoc `dark:` overrides and visual drift across surfaces.
  <!-- 2026-11-20: "Semantic color tokens for backgrounds, fills, text, and borders. Each token has a light and a dark value (read from the theme). ... The color scales behind the semantic tokens. Prefer a semantic token; reach for these only when none fits." -->

- **Use `text-text-primary` and `text-text-secondary` for almost all copy, and `text-text-tertiary` only for placeholders and very subdued metadata. Never use `text-text-quaternary` in product UI.**
  Why: `text-text-quaternary` (`#b4b4b4` light / `#676563` dark) lacks sufficient contrast for readable product UI copy; capping product text at three tiers keeps hierarchy crisp and legible in both themes.
  <!-- 2026-11-20: "Use primary and secondary for almost all copy. Tertiary is for placeholders and very subdued metadata. Don't use quaternary in product UI." -->

- **Reference `--color-chart-other`, `--color-dot-grid`, and `--color-shadow-*` exclusively as CSS variables with `var()`, never as Tailwind utility classes.**
  Why: These are low-level composition primitives for charts, dot grids, and multi-layer shadow definitions rather than standalone element color classes.
  <!-- 2026-11-20: "Chart: CSS variables only; use them with var(). Shadow Colors: Colors the shadow tokens are built from. CSS variables only; use them with var()." -->

### Background

Surfaces from the page base up to the most raised layer, plus tinted backgrounds for status and accents.

| Token                       | Light                                                                  | Dark                                                               |
| --------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `bg-bg-base`                | `#ffffff`                                                              | `#121110`                                                          |
| `bg-bg-primary`             | `#ffffff`                                                              | `#171615`                                                          |
| `bg-bg-secondary`           | `#fafafa`                                                              | `#1e1d1c`                                                          |
| `bg-bg-tertiary`            | `#f5f5f5`                                                              | `#272625`                                                          |
| `bg-bg-quaternary`          | `#e8e8e8`                                                              | `#31302e`                                                          |
| `bg-bg-sidebar`             | `#fafafa`                                                              | `#121110`                                                          |
| `bg-bg-header`              | `color-mix(in srgb, #ffffff 70%, transparent)`                         | `color-mix(in srgb, #121110 70%, transparent)`                     |
| `bg-bg-overlay`             | `rgba(0, 0, 0, 0.03)`                                                  | `rgba(0, 0, 0, 0.03)`                                              |
| `bg-bg-tooltip`             | `rgba(24, 24, 26, 0.9)`                                                | `rgba(46, 45, 43, 0.9)`                                            |
| `bg-bg-educational-tooltip` | `#3b82f6`                                                              | `#3b82f6`                                                          |
| `bg-bg-transparent`         | `transparent`                                                          | `transparent`                                                      |
| `bg-bg-blue`                | `oklch(97% 0.014 254.604)`                                             | `oklch(0.282 0.091 267.935 / 0.7)`                                 |
| `bg-bg-purple`              | `oklch(97.7% 0.014 308.299)`                                           | `oklch(0.291 0.149 302.717 / 0.5)`                                 |
| `bg-bg-red`                 | `oklch(97.1% 0.013 17.38)`                                             | `oklch(0.258 0.092 26.042 / 0.7)`                                  |
| `bg-bg-red-hover`           | `color-mix(in oklch, oklch(63.7% 0.237 25.331) 10%, transparent)`      | `color-mix(in oklch, oklch(0.704 0.191 22.216) 10%, transparent)`  |
| `bg-bg-green`               | `oklch(96.861% 0.02956 154.903)`                                       | `oklch(0.266 0.065 152.934 / 0.7)`                                 |
| `bg-bg-green-hover`         | `color-mix(in oklch, oklch(62.695% 0.18045 148.232) 10%, transparent)` | `color-mix(in oklch, oklch(0.792 0.209 151.711) 10%, transparent)` |
| `bg-bg-orange`              | `oklch(98% 0.016 73.684)`                                              | `oklch(0.266 0.079 36.259 / 0.7)`                                  |
| `bg-bg-orange-hover`        | `color-mix(in oklch, oklch(70.5% 0.213 47.604) 10%, transparent)`      | `color-mix(in oklch, oklch(0.75 0.183 55.934) 10%, transparent)`   |
| `bg-bg-amber`               | `oklch(98.7% 0.022 95.277)`                                            | `oklch(0.279 0.077 45.635 / 0.7)`                                  |
| `bg-bg-cyan`                | `oklch(97% 0.02 200)`                                                  | `oklch(0.28 0.08 200 / 0.7)`                                       |
| `bg-bg-pink`                | `oklch(97.5% 0.018 0)`                                                 | `oklch(0.28 0.06 0 / 0.7)`                                         |
| `--color-dot-grid`          | `#cccccc`                                                              | `#cccccc`                                                          |

### Fill

Solid fills for controls, icons, and indicators.

| Token                       | Light                                                                  | Dark                                                               |
| --------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `fill-fill-primary`         | `#18181a`                                                              | `#f5f4f2`                                                          |
| `fill-fill-primary-hover`   | `#2c2c2e`                                                              | `#ecebe9`                                                          |
| `fill-fill-secondary`       | `#969696`                                                              | `#75736f`                                                          |
| `fill-fill-tertiary`        | `#d4d4d8`                                                              | `#5a5855`                                                          |
| `fill-fill-quaternary`      | `#e8e8e8`                                                              | `#232221`                                                          |
| `fill-fill-quinary`         | `#f0f0f0`                                                              | `#2b2a28`                                                          |
| `fill-fill-inverse`         | `#ffffff`                                                              | `#121110`                                                          |
| `fill-fill-green`           | `oklch(62.695% 0.18045 148.232)`                                       | `oklch(0.792 0.209 151.711)`                                       |
| `fill-fill-green-hover`     | `color-mix(in oklch, oklch(62.695% 0.18045 148.232) 10%, transparent)` | `color-mix(in oklch, oklch(0.792 0.209 151.711) 90%, #121110 10%)` |
| `fill-fill-red`             | `oklch(63.7% 0.237 25.331)`                                            | `oklch(0.704 0.191 22.216)`                                        |
| `fill-fill-red-hover`       | `color-mix(in oklch, oklch(63.7% 0.237 25.331) 90%, transparent)`      | `color-mix(in oklch, oklch(0.704 0.191 22.216) 90%, #121110 10%)`  |
| `fill-fill-blue`            | `oklch(62.3% 0.214 259.815)`                                           | `oklch(0.707 0.165 254.624)`                                       |
| `fill-fill-orange`          | `oklch(70.5% 0.213 47.604)`                                            | `oklch(0.75 0.183 55.934)`                                         |
| `fill-fill-orange-lightest` | `oklch(98% 0.016 73.684)`                                              | `oklch(0.266 0.079 36.259 / 0.7)`                                  |
| `fill-fill-orange-dark`     | `oklch(47% 0.157 37.304)`                                              | `oklch(0.75 0.183 55.934)`                                         |
| `fill-fill-amber`           | `oklch(76.9% 0.188 70.08)`                                             | `oklch(0.828 0.189 84.429)`                                        |
| `fill-fill-yellow`          | `#f9ff57`                                                              | `#5e602b`                                                          |
| `fill-fill-cyan`            | `oklch(70% 0.14 200)`                                                  | `oklch(0.75 0.14 200)`                                             |
| `fill-fill-pink`            | `oklch(74% 0.15 0)`                                                    | `oklch(0.8 0.12 0)`                                                |

### Control

Backgrounds for inputs, toggles, and selected states.

| Token                      | Light     | Dark      |
| -------------------------- | --------- | --------- |
| `bg-control-bg`            | `#ffffff` | `#252423` |
| `bg-control-hover`         | `#f5f5f5` | `#31302e` |
| `bg-control-selected`      | `#f1f1f1` | `#383735` |
| `bg-control-primary`       | `#18181a` | `#f5f4f2` |
| `bg-control-primary-hover` | `#2c2c2e` | `#ecebe9` |

### Text

Use primary and secondary for almost all copy. Tertiary is for placeholders and very subdued metadata. Don't use quaternary in product UI.

| Token                         | Light                            | Dark                         |
| ----------------------------- | -------------------------------- | ---------------------------- |
| `text-text-primary`           | `#18181a`                        | `#ecebe9`                    |
| `text-text-secondary`         | `#787878`                        | `#aaa8a5`                    |
| `text-text-tertiary`          | `#969696`                        | `#898784`                    |
| `text-text-quaternary`        | `#b4b4b4`                        | `#676563`                    |
| `text-text-inverse`           | `#ffffff`                        | `#0f0e0d`                    |
| `text-text-white`             | `#ffffff`                        | `#ffffff`                    |
| `text-text-black`             | `#18181a`                        | `#18181a`                    |
| `text-text-green`             | `oklch(62.695% 0.18045 148.232)` | `oklch(0.792 0.209 151.711)` |
| `text-text-red`               | `oklch(63.7% 0.237 25.331)`      | `oklch(0.704 0.191 22.216)`  |
| `text-text-blue`              | `oklch(62.3% 0.214 259.815)`     | `oklch(0.707 0.165 254.624)` |
| `text-text-purple`            | `oklch(62.7% 0.265 303.9)`       | `oklch(0.714 0.203 305.504)` |
| `text-text-orange`            | `oklch(70.5% 0.213 47.604)`      | `oklch(0.75 0.183 55.934)`   |
| `text-text-yellow`            | `oklch(76.9% 0.188 70.08)`       | `oklch(0.828 0.189 84.429)`  |
| `text-text-amber`             | `oklch(76.9% 0.188 70.08)`       | `oklch(0.828 0.189 84.429)`  |
| `text-text-cyan`              | `oklch(70% 0.14 200)`            | `oklch(0.75 0.14 200)`       |
| `text-text-pink`              | `oklch(74% 0.15 0)`              | `oklch(0.8 0.12 0)`          |
| `text-text-tooltip`           | `#ffffff`                        | `#ecebe9`                    |
| `text-text-tooltip-secondary` | `#b4b4b4`                        | `#b4b4b4`                    |

### Border and Stroke

| Token                            | Light                      | Dark                        |
| -------------------------------- | -------------------------- | --------------------------- |
| `border-border-gray`             | `#eeeeee`                  | `#2e2d2b`                   |
| `stroke-stroke-sunburst`         | `rgb(255, 255, 255)`       | `rgba(255, 255, 255, 0.4)`  |
| `stroke-stroke-sunburst-loading` | `rgba(255, 255, 255, 0.8)` | `rgba(255, 255, 255, 0.15)` |

### Palette

The color scales behind the semantic tokens. Prefer a semantic token; reach for these only when none fits.

#### Red

| Token               | Light                       | Dark                                                               |
| ------------------- | --------------------------- | ------------------------------------------------------------------ |
| `bg-red-base`       | `oklch(63.7% 0.237 25.331)` | `oklch(0.704 0.191 22.216)`                                        |
| `bg-red-border`     | `oklch(94.5% 0.027 17.633)` | `oklch(0.396 0.141 25.723 / 0.2)`                                  |
| `bg-red-muted-fill` | `oklch(97.1% 0.013 17.38)`  | `oklch(0.258 0.092 26.042 / 0.7)`                                  |
| `bg-red-emphasis`   | `oklch(44.4% 0.177 26.899)` | `color-mix(in oklch, oklch(0.704 0.191 22.216) 90%, oklch(1 0 0))` |

#### Blue

| Token                | Light                            | Dark                                                                |
| -------------------- | -------------------------------- | ------------------------------------------------------------------- |
| `bg-blue-base`       | `oklch(62.3% 0.214 259.815)`     | `oklch(0.707 0.165 254.624)`                                        |
| `bg-blue-border`     | `oklch(94.2% 0.028 255.34)`      | `oklch(36% 0.14 260)`                                               |
| `bg-blue-muted-fill` | `oklch(97% 0.014 254.604)`       | `oklch(0.282 0.091 267.935 / 0.7)`                                  |
| `bg-blue-emphasis`   | `oklch(41.214% 0.17348 265.122)` | `color-mix(in oklch, oklch(0.707 0.165 254.624) 90%, oklch(1 0 0))` |

#### Green

| Token                 | Light                            | Dark                                                                |
| --------------------- | -------------------------------- | ------------------------------------------------------------------- |
| `bg-green-base`       | `oklch(62.695% 0.18045 148.232)` | `oklch(0.792 0.209 151.711)`                                        |
| `bg-green-border`     | `oklch(92.774% 0.06064 156.846)` | `oklch(0.393 0.095 152.535 / 0.4)`                                  |
| `bg-green-muted-fill` | `oklch(96.861% 0.02956 154.903)` | `oklch(0.266 0.065 152.934 / 0.7)`                                  |
| `bg-green-emphasis`   | `oklch(39.3% 0.095 152.535)`     | `color-mix(in oklch, oklch(0.792 0.209 151.711) 90%, oklch(1 0 0))` |

#### Amber

| Token                 | Light                           | Dark                                                               |
| --------------------- | ------------------------------- | ------------------------------------------------------------------ |
| `bg-amber-base`       | `oklch(76.9% 0.188 70.08)`      | `oklch(0.828 0.189 84.429)`                                        |
| `bg-amber-border`     | `oklch(94.011% 0.05289 96.769)` | `oklch(0.414 0.112 45.904 / 0.2)`                                  |
| `bg-amber-muted-fill` | `oklch(98.7% 0.022 95.277)`     | `oklch(0.279 0.077 45.635 / 0.7)`                                  |
| `bg-amber-emphasis`   | `oklch(47.3% 0.137 46.201)`     | `color-mix(in oklch, oklch(0.828 0.189 84.429) 90%, oklch(1 0 0))` |

#### Purple

| Token                  | Light                           | Dark                                                                |
| ---------------------- | ------------------------------- | ------------------------------------------------------------------- |
| `bg-purple-base`       | `oklch(62.7% 0.265 303.9)`      | `oklch(0.714 0.203 305.504)`                                        |
| `bg-purple-border`     | `oklch(93.565% 0.0325 311.625)` | `oklch(0.381 0.176 304.987 / 0.4)`                                  |
| `bg-purple-muted-fill` | `oklch(97.7% 0.014 308.299)`    | `oklch(0.291 0.149 302.717 / 0.5)`                                  |
| `bg-purple-emphasis`   | `oklch(38.1% 0.176 304.987)`    | `color-mix(in oklch, oklch(0.714 0.203 305.504) 90%, oklch(1 0 0))` |

#### Orange

| Token                  | Light                           | Dark                                                              |
| ---------------------- | ------------------------------- | ----------------------------------------------------------------- |
| `bg-orange-base`       | `oklch(70.5% 0.213 47.604)`     | `oklch(0.75 0.183 55.934)`                                        |
| `bg-orange-border`     | `oklch(92.766% 0.03899 74.753)` | `oklch(0.408 0.123 38.172 / 0.2)`                                 |
| `bg-orange-muted-fill` | `oklch(98% 0.016 73.684)`       | `oklch(0.266 0.079 36.259 / 0.7)`                                 |
| `bg-orange-emphasis`   | `oklch(47% 0.157 37.304)`       | `color-mix(in oklch, oklch(0.75 0.183 55.934) 90%, oklch(1 0 0))` |

#### Cyan

| Token                | Light                 | Dark                                                          |
| -------------------- | --------------------- | ------------------------------------------------------------- |
| `bg-cyan-base`       | `oklch(70% 0.14 200)` | `oklch(0.75 0.14 200)`                                        |
| `bg-cyan-border`     | `oklch(92% 0.04 200)` | `oklch(0.4 0.1 200 / 0.3)`                                    |
| `bg-cyan-muted-fill` | `oklch(97% 0.02 200)` | `oklch(0.28 0.08 200 / 0.7)`                                  |
| `bg-cyan-emphasis`   | `oklch(45% 0.12 200)` | `color-mix(in oklch, oklch(0.75 0.14 200) 90%, oklch(1 0 0))` |

#### Pink

| Token                | Light                  | Dark                       |
| -------------------- | ---------------------- | -------------------------- |
| `bg-pink-base`       | `oklch(74% 0.15 0)`    | `oklch(0.8 0.12 0)`        |
| `bg-pink-muted-fill` | `oklch(97.5% 0.018 0)` | `oklch(0.28 0.06 0 / 0.7)` |

### Chart

CSS variables only; use them with `var()`.

| Token                 | Light     | Dark      |
| --------------------- | --------- | --------- |
| `--color-chart-other` | `#888888` | `#5b5956` |

### Shadow Colors

Colors the shadow tokens are built from. CSS variables only; use them with `var()`.

| Token                   | Light                     | Dark                        |
| ----------------------- | ------------------------- | --------------------------- |
| `--color-shadow-ring-1` | `rgba(0, 0, 0, 0.02)`     | `rgba(0, 0, 0, 0)`          |
| `--color-shadow-ring-2` | `rgba(0, 0, 0, 0.05)`     | `rgba(214, 213, 212, 0.12)` |
| `--color-shadow-stroke` | `#ebebeb`                 | `#2c2b29`                   |
| `--color-shadow-1`      | `rgba(0, 0, 0, 0.02)`     | `rgba(0, 0, 0, 0)`          |
| `--color-shadow-2`      | `rgba(0, 0, 0, 0.05)`     | `rgba(0, 0, 0, 0.1)`        |
| `--color-shadow-red-1`  | `rgba(255, 95, 87, 0.08)` | `rgba(255, 95, 87, 0.15)`   |
| `--color-shadow-red-2`  | `rgba(255, 95, 87, 0.12)` | `rgba(255, 95, 87, 0.25)`   |
| `--color-shadow-red-3`  | `rgba(255, 95, 87, 0.2)`  | `rgba(255, 95, 87, 0.3)`    |

### Workflow

Colors for the Agent Builder canvas.

| Token                           | Light                                                            | Dark                                                             |
| ------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `bg-workflow-bg-base`           | `rgb(247, 247, 247)`                                             | `rgb(18, 17, 16)`                                                |
| `bg-workflow-fill-green`        | `rgb(78, 168, 82)`                                               | `rgb(95, 207, 100)`                                              |
| `bg-workflow-fill-green-faint`  | `#4ea8521a`                                                      | `#5fcf641a`                                                      |
| `bg-workflow-fill-blue`         | `rgb(72, 148, 238)`                                              | `rgb(93, 171, 255)`                                              |
| `bg-workflow-fill-blue-faint`   | `#4894ee1a`                                                      | `#5dabff1a`                                                      |
| `bg-workflow-fill-purple`       | `rgb(141, 88, 247)`                                              | `rgb(147, 93, 255)`                                              |
| `bg-workflow-fill-purple-faint` | `#8d58f71a`                                                      | `#935dff1a`                                                      |
| `bg-workflow-fill-orange`       | `rgb(255, 159, 79)`                                              | `rgb(255, 135, 99)`                                              |
| `bg-workflow-fill-orange-faint` | `rgb(255, 159, 79, 0.16)`                                        | `#ff87631a`                                                      |
| `bg-workflow-fill-pink`         | `rgb(248, 82, 145)`                                              | `rgb(255, 101, 159)`                                             |
| `bg-workflow-fill-pink-faint`   | `#f852911a`                                                      | `#ff659f1a`                                                      |
| `bg-workflow-fill-red`          | `oklch(63.7% 0.237 25.331)`                                      | `oklch(0.704 0.191 22.216)`                                      |
| `bg-workflow-fill-red-faint`    | `color-mix(in srgb, oklch(63.7% 0.237 25.331) 10%, transparent)` | `color-mix(in srgb, oklch(0.704 0.191 22.216) 10%, transparent)` |

## Typography

- **Use `Geist Rounded` (self-hosted at `src/app/fonts/GeistRounded.woff2` and loaded via `next/font/local` with `weight: '100 900'`, `style: 'normal'`, `display: 'swap'`, bound to `--font-sans`) as the main interface font.**
  <!-- 2026-11-20: "Use Geist Rounded as the main interface font in this project. Download and self-host the variable WOFF2 file: https://mishanaer.com/ui/geist-rounded/fonts/GeistRounded.woff2 Load it with @font-face: font-family \"Geist Rounded\", font-weight 100 900, font-style normal and font-display swap. For Next.js, use next/font/local instead." -->

- **Never apply `uppercase` (`text-transform: uppercase`) or all-caps copy to UI text across the system (including sidebar section labels, KPI card titles, table headers, badges, and metadata labels); always use natural title case or sentence case.**
  Why: All-caps text (`uppercase` + wide tracking) feels dated and noisy against `Geist Rounded`, whereas natural casing with size, weight, and semantic text color tokens (`text-text-secondary`, `text-text-tertiary`) creates cleaner hierarchy.
  <!-- 2026-11-20: "Never use uppercase for text for the systems" -->

- **Always set typography using a single composite type token (`text-title-*`, `text-body-*`, or `text-paragraph-*`) paired with a `text-text-*` color class (`text-body-*` tokens inherit color). Never pair a type token with separate `font-*` weight or `leading-*` line-height utilities, and never use raw Tailwind font-size utilities (`text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-*xl`). Use `text-body-small-regular` (`13px / 18px`) as the default product UI size, `text-title-regular` (`28px / 32px`, semibold, `-0.25px` tracking) for page titles, `text-title-small-semibold` (`24px / 32px`, semibold, `-0.25px` tracking) for section headings, `text-title-mini-semibold` (`18px / 24px`, semibold, `-0.25px` tracking) for card and dialog titles, `text-body-mini-regular` (`12px / 16px`) for captions and metadata, `text-body-micro-medium` (`10px / 14px`, medium) for badges and tiny labels, and `text-paragraph-*` for long-form reading text.**
  Why: Bundling size, line height, weight, and title tracking (`-0.25px`) into fixed composite tokens prevents ad-hoc size/weight/leading drift and anchors product UI around a dense, legible 13px default scale.
  <!-- 2026-11-20: "Type tokens set size, line height, and weight together. Use the token on its own and pick color with `text-text-*` classes. ... Title: Page and section headings. Titles use -0.25px letter spacing. ... Body: Interface text: labels, controls, table cells, and short copy. Body tokens inherit color. ... text-body-small-regular: The default size for product UI ... Paragraph: Long-form reading text, such as answers and descriptions." -->

### Title

Page and section headings. Titles use -0.25px letter spacing.

| Token                       | Size / Line Height | Weight   | Usage                  |
| --------------------------- | ------------------ | -------- | ---------------------- |
| `text-title-regular`        | 28px / 32px        | Semibold | Page titles            |
| `text-title-small-regular`  | 24px / 32px        | Regular  | —                      |
| `text-title-small-medium`   | 24px / 32px        | Medium   | —                      |
| `text-title-small-semibold` | 24px / 32px        | Semibold | Section headings       |
| `text-title-mini-regular`   | 18px / 24px        | Regular  | —                      |
| `text-title-mini-medium`    | 18px / 24px        | Medium   | —                      |
| `text-title-mini-semibold`  | 18px / 24px        | Semibold | Card and dialog titles |

### Body

Interface text: labels, controls, table cells, and short copy. Body tokens inherit color.

| Token                        | Size / Line Height | Weight   | Usage                                  |
| ---------------------------- | ------------------ | -------- | -------------------------------------- |
| `text-body-regular`          | 14px / 20px        | Regular  | —                                      |
| `text-body-regular-medium`   | 14px / 20px        | Medium   | —                                      |
| `text-body-regular-semibold` | 14px / 20px        | Semibold | —                                      |
| `text-body-regular-spaced`   | 14px / 24px        | Regular  | Taller line height for multi-line text |
| `text-body-small-regular`    | 13px / 18px        | Regular  | The default size for product UI        |
| `text-body-small-medium`     | 13px / 18px        | Medium   | —                                      |
| `text-body-small-semibold`   | 13px / 18px        | Semibold | —                                      |
| `text-body-small-spaced`     | 13px / 20px        | Regular  | Taller line height for multi-line text |
| `text-body-mini-regular`     | 12px / 16px        | Regular  | Captions and metadata                  |
| `text-body-mini-medium`      | 12px / 16px        | Medium   | —                                      |
| `text-body-micro-regular`    | 10px / 14px        | Regular  | —                                      |
| `text-body-micro-medium`     | 10px / 14px        | Medium   | Badges and tiny labels                 |

### Paragraph

Long-form reading text, such as answers and descriptions.

| Token                          | Size / Line Height        | Weight  | Usage                           |
| ------------------------------ | ------------------------- | ------- | ------------------------------- |
| `text-paragraph-regular`       | 14px / 20px               | Regular | —                               |
| `text-paragraph-small`         | 13px / 18px               | Regular | —                               |
| `text-paragraph-small-relaxed` | 13px with 1.7 line height | Regular | Dense prose that needs more air |

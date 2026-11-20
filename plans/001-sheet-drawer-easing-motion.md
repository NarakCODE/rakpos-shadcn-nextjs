# 001 — Fix Sheet drawer slide transition, full-edge travel, and overlay easing sync

- **Status**: TODO
- **Commit**: `247973c`
- **Severity**: HIGH
- **Category**: Easing & duration · Physicality & origin · Cohesion & tokens · Accessibility
- **Estimated scope**: 1 file (`src/components/ui/sheet.tsx`, ~10 lines changed)

## Problem

Opening or closing a `Sheet` (`src/components/ui/sheet.tsx`) currently feels static because its slide translation never animates, its travel offset is a short hardcoded `2.5rem` (`40px`), and its backdrop overlay fades on a mismatched duration and easing curve:

1. **Untransitioned `translate` property (`src/components/ui/sheet.tsx:58`)**:
   In Tailwind CSS v4, `translate-x-*` and `translate-y-*` compile to the standalone CSS `translate` property (`translate: var(--tw-translate-x) var(--tw-translate-y)`), **not** `transform: translate(...)`. `SheetContent` declares `transition-[transform,opacity]`, omitting `translate`. As a result, the position change snaps immediately on frame 1 and `--ease-drawer` (`cubic-bezier(0.32, 0.72, 0, 1)`) only runs on `opacity`.
2. **Short hardcoded `2.5rem` (`40px`) offset instead of full-panel `100%` edge translation (`src/components/ui/sheet.tsx:58`)**:
   `SheetContent` uses `translate-x-[2.5rem]`, `translate-x-[-2.5rem]`, `translate-y-[2.5rem]`, and `translate-y-[-2.5rem]` (`40px`). A `40px` offset behaves like a floating popover rather than an edge-docked sheet/drawer entering from the viewport bezel across its full width or height (`100%` / `-100%`).
3. **Overlay / panel timing mismatch (`src/components/ui/sheet.tsx:33`)**:
   `SheetOverlay` runs `transition-opacity duration-150` (default CSS `ease`, `150ms`), finishing in half the time and on a different curve than `SheetContent` (`duration-300 ease-drawer`, `300ms`, `cubic-bezier(0.32, 0.72, 0, 1)`).
4. **Reduced-motion duration (`src/components/ui/sheet.tsx:58`)**:
   `motion-reduce:transition-opacity` drops spatial movement under `prefers-reduced-motion: reduce`, but leaves `duration-300` on the opacity-only fallback instead of a snappy `150ms` crossfade (`motion-reduce:duration-150`).

```tsx
/* src/components/ui/sheet.tsx:28-62 — current */
function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot='sheet-overlay'
      className={cn(
        'fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs',
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = 'right',
  showCloseButton = true,
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: 'top' | 'right' | 'bottom' | 'left'
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot='sheet-content'
        data-side={side}
        className={cn(
          'bg-popover text-popover-foreground ease-drawer text-body-small-regular fixed z-50 flex flex-col gap-4 bg-clip-padding shadow-lg transition-[transform,opacity] duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] motion-reduce:transition-opacity data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm',
          className
        )}
        {...props}
      >
```

## Target

- **Easing curve**: `ease-drawer` (`--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)`, already defined in `src/app/globals.css:244` and `src/app/globals.css:251`) on both `SheetOverlay` and `SheetContent`.
- **Duration**: `duration-300` (`300ms`) on both `SheetOverlay` and `SheetContent`; `motion-reduce:duration-150` (`150ms`) when `prefers-reduced-motion: reduce` is active.
- **Transitioned properties**:
  - `SheetOverlay`: `transition-opacity duration-300 ease-drawer motion-reduce:duration-150`
  - `SheetContent`: `transition-[translate,opacity] duration-300 ease-drawer motion-reduce:transition-opacity motion-reduce:duration-150`
- **Starting / ending transforms (percentage-based full-panel travel)**:
  - `side="right"`: `data-[side=right]:data-starting-style:translate-x-full data-[side=right]:data-ending-style:translate-x-full` (`100%`)
  - `side="left"`: `data-[side=left]:data-starting-style:-translate-x-full data-[side=left]:data-ending-style:-translate-x-full` (`-100%`)
  - `side="bottom"`: `data-[side=bottom]:data-starting-style:translate-y-full data-[side=bottom]:data-ending-style:translate-y-full` (`100%`)
  - `side="top"`: `data-[side=top]:data-starting-style:-translate-y-full data-[side=top]:data-ending-style:-translate-y-full` (`-100%`)
- **Reduced-motion fallback**:
  Keep `data-starting-style:opacity-0 data-ending-style:opacity-0` together with `motion-reduce:transition-opacity motion-reduce:duration-150` so that when `prefers-reduced-motion: reduce` is enabled, `translate` is not transitioned and the sheet crossfades smoothly via `opacity` in `150ms`.

```tsx
/* src/components/ui/sheet.tsx:28-62 — target */
function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot='sheet-overlay'
      className={cn(
        'ease-drawer fixed inset-0 z-50 bg-black/10 transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:duration-150 supports-backdrop-filter:backdrop-blur-xs',
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = 'right',
  showCloseButton = true,
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: 'top' | 'right' | 'bottom' | 'left'
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot='sheet-content'
        data-side={side}
        className={cn(
          'bg-popover text-popover-foreground ease-drawer text-body-small-regular fixed z-50 flex flex-col gap-4 bg-clip-padding shadow-lg transition-[translate,opacity] duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-full data-[side=bottom]:data-starting-style:translate-y-full data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:-translate-x-full data-[side=left]:data-starting-style:-translate-x-full data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-full data-[side=right]:data-starting-style:translate-x-full data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:-translate-y-full data-[side=top]:data-starting-style:-translate-y-full motion-reduce:transition-opacity motion-reduce:duration-150 data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm',
          className
        )}
        {...props}
      >
```

## Repo conventions to follow

- Easing tokens are already registered in `src/app/globals.css:241-251`:
  ```css
  /* Easing */
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
  ```
  Use the `ease-drawer` utility class (do not inline an arbitrary `ease-[cubic-bezier(...)]` class).
- Base UI transition lifecycle exemplar in `src/components/ui/collapsible.tsx:25-26`: pairs `data-starting-style:*` and `data-ending-style:*` with explicit `transition-[...]` properties and `motion-reduce:transition-opacity`.
- Using standard Tailwind percentage utilities (`translate-x-full`, `-translate-x-full`, `translate-y-full`, `-translate-y-full`) also eliminates the arbitrary values `translate-x-[2.5rem]`, `translate-x-[-2.5rem]`, `translate-y-[2.5rem]`, and `translate-y-[-2.5rem]`.

## Steps

1. Open `src/components/ui/sheet.tsx` and update `SheetOverlay` (lines 28–39) to replace `'fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs'` with:
   ```tsx
   'ease-drawer fixed inset-0 z-50 bg-black/10 transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:duration-150 supports-backdrop-filter:backdrop-blur-xs'
   ```
2. In `src/components/ui/sheet.tsx`, update `SheetContent` (line 58) to:
   - Replace `transition-[transform,opacity]` with `transition-[translate,opacity]`.
   - Replace `data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem]` with `data-[side=bottom]:data-ending-style:translate-y-full data-[side=bottom]:data-starting-style:translate-y-full`.
   - Replace `data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem]` with `data-[side=left]:data-ending-style:-translate-x-full data-[side=left]:data-starting-style:-translate-x-full`.
   - Replace `data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem]` with `data-[side=right]:data-ending-style:translate-x-full data-[side=right]:data-starting-style:translate-x-full`.
   - Replace `data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem]` with `data-[side=top]:data-ending-style:-translate-y-full data-[side=top]:data-starting-style:-translate-y-full`.
   - Add `motion-reduce:duration-150` next to `motion-reduce:transition-opacity`.

## Boundaries

- Do NOT touch any file other than `src/components/ui/sheet.tsx`.
- Do NOT change component props, JSX hierarchy, or typography tokens (`text-body-small-regular`, `text-title-mini-semibold`) in `src/components/ui/sheet.tsx`.
- Do NOT add new dependencies or modify `src/app/globals.css` (`--ease-drawer` is already defined there).
- If a step doesn't match the code you find (drift since commit `247973c`), STOP and report instead of improvising.

## Verification

- **Mechanical**:
  - Run `pnpm exec eslint src/components/ui/sheet.tsx` — must exit `0` with `0` errors and `0` warnings.
- **Feel check**:
  - Run `pnpm dev` and open any Sheet in the app (e.g., `/orders` -> click an order row to open `OrderDetailsSheet`, `/reservations` -> open a reservation or click "New reservation", or resize the viewport below `md` and toggle the mobile sidebar sheet).
  - Confirm that the sheet smoothly slides in from the screen edge over `300ms` with the fast initial velocity and soft settle of `cubic-bezier(0.32, 0.72, 0, 1)` (`ease-drawer`), rather than popping in at `0` and only fading opacity.
  - Rapidly click the trigger and close button/backdrop mid-flight and confirm the CSS `translate` transition retargets smoothly from its current in-flight position without jumping.
  - In Chrome DevTools Animations panel, set playback speed to `10%` and confirm `SheetOverlay` (`opacity`) and `SheetContent` (`translate`, `opacity`) start and finish on the same `300ms` `cubic-bezier(0.32, 0.72, 0, 1)` timeline.
  - In Chrome DevTools Rendering panel, set `Emulate CSS media feature prefers-reduced-motion: reduce` and confirm the sheet does not slide across the screen and instead fades via `opacity` over `150ms`.
- **Done when**: `src/components/ui/sheet.tsx` transitions `translate,opacity` with full percentage edge offsets (`±100%`) and synchronized `300ms` `ease-drawer` overlay timing, `pnpm exec eslint src/components/ui/sheet.tsx` exits `0`, and all four feel checks pass.

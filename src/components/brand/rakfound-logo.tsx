import * as React from 'react'

export type RakfoundLogoVariant = 'lockup' | 'mark' | 'monolith' | 'kinetic'
export type RakfoundLogoTone = 'adaptive' | 'dark' | 'light'

export interface RakfoundLogoProps extends React.SVGProps<SVGSVGElement> {

  /** Visual form of the logo. Defaults to `"lockup"`. */
  variant?: RakfoundLogoVariant

  /** Ink polarity: `"adaptive"` inherits `currentColor`. Defaults to `"adaptive"`. */
  tone?: RakfoundLogoTone

  /** Show the `#376CFF` cobalt beacon facet on Signal / Kinetic / Lockup marks. */
  showBeacon?: boolean

  /** Accessible label for screen readers. Set `""` when decorative. */
  label?: string
}

const TONE_FILL: Record<RakfoundLogoTone, string> = {
  adaptive: 'currentColor',
  dark: '#000000',
  light: '#FFFFFF'
}

const COBALT = '#376CFF'

export function RakfoundLogo({
  variant = 'lockup',
  tone = 'adaptive',
  showBeacon = true,
  label = 'Rakfound',
  className,
  ...props
}: RakfoundLogoProps) {
  const primaryFill = TONE_FILL[tone]
  const beaconFill = showBeacon ? COBALT : primaryFill
  const ariaProps = label ? { role: 'img' as const, 'aria-label': label } : { 'aria-hidden': true as const }

  if (variant === 'monolith') {
    return (
      <svg
        width='66'
        height='68'
        viewBox='0 0 66 68'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        {...ariaProps}
        {...props}
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M2 50.5V28C2 26.2 2.9 24.5 4.5 23.6L30.5 8.5C32 7.6 34 7.6 35.5 8.5L61.5 23.6C63.1 24.5 64 26.2 64 28V36.1C64 37.3 63.3 38.4 62.2 39.1L53.2 44.4C51.6 45.3 51.6 46 53.2 46.9L61.8 51.9C63.4 52.8 63.4 53.6 61.8 54.5L52.1 60.1C50.9 60.8 49.5 60.8 48.3 60.1L18.7 43C17.6 42.3 17 42.8 17 44V59.5C17 61.1 15.8 61.5 14.5 60.7L4.2 54.7C2.8 53.9 2 52.3 2 50.5ZM34.5 21.4L47 28.6C48 29.2 48 29.8 47 30.4L34.5 37.6C33.6 38.1 32.4 38.1 31.5 37.6L19 30.4C18 29.8 18 29.2 19 28.6L31.5 21.4C32.4 20.9 33.6 20.9 34.5 21.4Z'
          fill={primaryFill}
        />
      </svg>
    )
  }

  if (variant === 'kinetic') {
    return (
      <svg
        width='66'
        height='68'
        viewBox='0 0 66 68'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        {...ariaProps}
        {...props}
      >
        <path
          className='rakfound-spine'
          d='M2 50.5V27.6C2 26 2.8 24.5 4.2 23.7L14.5 17.7C15.8 17 17 17.5 17 19V59.5C17 61 15.8 61.5 14.5 60.8L4.2 54.8C2.8 54 2 52.3 2 50.5Z'
          fill={primaryFill}
        />
        <path
          className='rakfound-bowl'
          d='M19.5 16.5C19.5 15.4 20.1 14.4 21 13.9L30.8 8.2C32.2 7.4 33.8 7.4 35.2 8.2L61.8 23.6C63.2 24.4 64 25.9 64 27.5V32.5C64 33.7 63.3 34.8 62.2 35.4L35.2 51C33.8 51.8 32.2 51.8 30.8 51L21 45.3C20.1 44.8 19.5 43.8 19.5 42.7V32.9C19.5 31.8 20.5 31.3 21.4 31.8L31.5 37.6C32.4 38.1 33.6 38.1 34.5 37.6L47 30.4C48 29.8 48 29.2 47 28.6L34.5 21.4C33.6 20.9 32.4 20.9 31.5 21.4L21.4 27.2C20.5 27.7 19.5 27.2 19.5 26.1V16.5Z'
          fill={primaryFill}
        />
        <path
          className='rakfound-leg'
          d='M38.2 53.5L61.8 39.8C63 39.1 64 39.7 64 41.1V51.2C64 52.5 63.3 53.7 62.1 54.4L51.1 60.8C49.9 61.5 48.4 61.5 47.2 60.8L38.2 55.6C37 54.9 37 54.2 38.2 53.5Z'
          fill={beaconFill}
        />
      </svg>
    )
  }

  if (variant === 'mark') {
    return (
      <svg
        width='66'
        height='68'
        viewBox='0 0 66 68'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        {...ariaProps}
        {...props}
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M2 50.5V28C2 26.2 2.9 24.5 4.5 23.6L30.5 8.5C32 7.6 34 7.6 35.5 8.5L61.5 23.6C63.1 24.5 64 26.2 64 28V31.5C64 32.7 63.3 33.8 62.2 34.5L35.2 50.1C33.8 50.9 32.2 50.9 30.8 50.1L18.7 43.1C17.6 42.5 17 42.9 17 44.1V59.5C17 61.1 15.8 61.5 14.5 60.7L4.2 54.7C2.8 53.9 2 52.3 2 50.5ZM34.5 21.4L47 28.6C48 29.2 48 29.8 47 30.4L34.5 37.6C33.6 38.1 32.4 38.1 31.5 37.6L19 30.4C18 29.8 18 29.2 19 28.6L31.5 21.4C32.4 20.9 33.6 20.9 34.5 21.4Z'
          fill={primaryFill}
        />
        <path
          d='M38.2 52.3L61.8 38.6C63 37.9 64 38.5 64 39.9V51.2C64 52.5 63.3 53.7 62.1 54.4L52.1 60.2C50.9 60.9 49.4 60.9 48.2 60.2L38.2 54.4C37 53.7 37 53 38.2 52.3Z'
          fill={beaconFill}
        />
      </svg>
    )
  }

  return (
    <svg
      width='166'
      height='28'
      viewBox='0 0 166 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      {...ariaProps}
      {...props}
    >
      <g transform='translate(-0.5 -2.2) scale(0.47)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M2 50.5V28C2 26.2 2.9 24.5 4.5 23.6L30.5 8.5C32 7.6 34 7.6 35.5 8.5L61.5 23.6C63.1 24.5 64 26.2 64 28V31.5C64 32.7 63.3 33.8 62.2 34.5L35.2 50.1C33.8 50.9 32.2 50.9 30.8 50.1L18.7 43.1C17.6 42.5 17 42.9 17 44.1V59.5C17 61.1 15.8 61.5 14.5 60.7L4.2 54.7C2.8 53.9 2 52.3 2 50.5ZM34.5 21.4L47 28.6C48 29.2 48 29.8 47 30.4L34.5 37.6C33.6 38.1 32.4 38.1 31.5 37.6L19 30.4C18 29.8 18 29.2 19 28.6L31.5 21.4C32.4 20.9 33.6 20.9 34.5 21.4Z'
          fill={primaryFill}
        />
        <path
          d='M38.2 52.3L61.8 38.6C63 37.9 64 38.5 64 39.9V51.2C64 52.5 63.3 53.7 62.1 54.4L52.1 60.2C50.9 60.9 49.4 60.9 48.2 60.2L38.2 54.4C37 53.7 37 53 38.2 52.3Z'
          fill={beaconFill}
        />
      </g>
      <text
        x='39'
        y='22.5'
        fill={primaryFill}
        style={{
          fontFamily: 'var(--font-geist-rounded, "Geist Rounded"), ui-rounded, system-ui, sans-serif',
          fontSize: '24px',
          fontWeight: 600,
          letterSpacing: '-0.025em'
        }}
      >
        Rakfound
      </text>
    </svg>
  )
}

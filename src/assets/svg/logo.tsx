import { RakfoundLogo, type RakfoundLogoProps } from '@/components/brand/rakfound-logo'

const Logo = (props: Omit<RakfoundLogoProps, 'variant'>) => {
  return <RakfoundLogo variant='mark' {...props} />
}

export default Logo

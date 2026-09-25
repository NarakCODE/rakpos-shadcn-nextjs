'use client'

// Component Imports
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'

const TwoStepsV1Form = () => {
  return (
    <form onSubmit={e => e.preventDefault()}>
      <FieldGroup className='gap-4'>
        <Field className='gap-4'>
          <div className='flex items-center justify-between gap-1'>
            <FieldLabel htmlFor='recoveryCode' className='text-base'>
              Code*
            </FieldLabel>
            <span className='text-base font-medium'>Use a recovery code</span>
          </div>

          <InputOTP id='recoveryCode' maxLength={6}>
            <InputOTPGroup variant='separated' className='w-full justify-center'>
              <InputOTPSlot index={0} className='size-10' />
              <InputOTPSlot index={1} className='size-10' />
              <InputOTPSlot index={2} className='size-10' />
              <InputOTPSlot index={3} className='size-10' />
              <InputOTPSlot index={4} className='size-10' />
              <InputOTPSlot index={5} className='size-10' />
            </InputOTPGroup>
          </InputOTP>
        </Field>

        <Field>
          <Button size='lg' className='w-full' type='submit'>
            Sign in to Shadcn Studio
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default TwoStepsV1Form

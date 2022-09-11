import type { NextPage } from 'next'
import Image from 'next/image'
import Register from '~/components/accounts/Register'
import AccountLayout from '~/components/layouts/AccountLayout'

const RegisterPage: NextPage = () => {
  return (
    <AccountLayout pageTitle={"Create Account"}>
      <div className='flex items-center'>
      <div className='w-2/5 hidden lg:block'>
          <Image
          src={"/images/signup.svg"}
          alt={"login page illustration"}
          height={"100%"}
          width={"100%"}
          layout={"responsive"}
          />
        </div>
        <Register/>
      </div>
    </AccountLayout>
  )
}

export default RegisterPage
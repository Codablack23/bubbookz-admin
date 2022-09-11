import type { NextPage } from 'next'
import Image from 'next/image'
import Login from '~/components/accounts/Login'
import AccountLayout from '~/components/layouts/AccountLayout'

const Home: NextPage = () => {
  return (
    <AccountLayout pageTitle={"Login"}>
      <div className='flex items-center'>
        <div className='w-2/5 hidden lg:block'>
          <Image
          src={"/images/login_page.svg"}
          alt={"login page illustration"}
          height={"100%"}
          width={"100%"}
          layout={"responsive"}
          />
        </div>
        <Login/>
      </div>
    </AccountLayout>
  )
}

export default Home

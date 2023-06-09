import Link from 'next/link'
import { HeaderA } from '@/components/Header'
import { FaMehRollingEyes } from '../../public/icons'

const NotFound = () => {
    return (
        <>
            <HeaderA />
            <main className="mt-28 mx-auto grid place-items-center">
                <h1 className='home-h1 md:text-4xl lg:text-6xl'>
                    <span>Keep rolling your eyes.</span>
                    <span>May be you will find the</span>
                    <span>Page somewhere.</span>
                </h1>
                <Link href="/signup"
                className="signup-link" >
                    {`Let's get you Signed up..`}
                    <FaMehRollingEyes />
                </Link>
            </main>
        </>
    )
}

export default NotFound
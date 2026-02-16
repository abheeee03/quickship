import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'

export default function Page() {
    return <div className='flex flex-col gap-10 items-center justify-center h-screen w-full'>
        <SignIn />
    </div>
}
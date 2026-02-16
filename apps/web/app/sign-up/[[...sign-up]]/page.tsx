import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return <div className='flex flex-col gap-10 items-center justify-center h-screen w-full'>
        <SignUp />
    </div>
}
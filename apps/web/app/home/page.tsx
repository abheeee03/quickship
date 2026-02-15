import ProjectCard from '@/components/project-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import Link from 'next/link'

function Home() {
    return (
        <div className='min-h-screen w-full bg-card flex flex-col items-start justify-start px-10 py-10'>

            <div className="flex flex-col items-start justify-start w-full">
                <div className="w-full flex items-center justify-between">
                    <h1 className='text-4xl'>Welcome, Abhee</h1>
                    <Button>
                        <Link href={'/new'}>
                            + Deploy Project
                        </Link>
                    </Button>
                </div>
                <div className="flex gap-5 w-full mt-5">
                    <Card className='w-full'>
                        <CardContent>
                            Live Projects
                            <div className="">
                                <h1 className='text-7xl'>
                                    20
                                </h1>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className='w-full'>
                        <CardContent>
                            Live Projects
                            <div className="">
                                <h1 className='text-7xl'>
                                    20
                                </h1>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className='w-full'>
                        <CardContent>
                            Live Projects
                            <div className="">
                                <h1 className='text-7xl'>
                                    20
                                </h1>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="flex flex-col gap-5 mt-10">
                <h2 className='text-md'>Projects</h2>
                <div className="flex flex-wrap gap-5">
                    <ProjectCard></ProjectCard>
                    <ProjectCard></ProjectCard>
                    <ProjectCard></ProjectCard>
                    <ProjectCard></ProjectCard>
                    <ProjectCard></ProjectCard>
                </div>
            </div>

        </div>
    )
}

export default Home
"use client"
import ProjectCard from '@/components/project-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export type Project = {
    id: string,
    name: string,
    slug: string,
    gitUrl: string,
    createdAt: Date,
    userID: string
}

function Home() {
    const { user, isLoaded } = useUser()
    const [projects, setProjects] = useState<Project[] | null>(null)
    const getProjects = async () => {
        const res = await axios.get('/api/projects')
        const projects = res.data
        if (projects) {
            setProjects(projects.projects);
        }
    }
    useEffect(() => {
        getProjects()
    }, [])

    if (!isLoaded) {
        return <div className="h-screen w-full flex items-center justify-center">Loading...</div>
    }

    return (
        <div className='min-h-screen w-full bg-card flex flex-col items-start justify-start px-10 py-10'>
            <div className="flex flex-col items-start justify-start w-full">
                <div className="w-full flex items-center justify-between">
                    <h1 className='text-4xl'>Welcome, {user?.firstName}</h1>
                    <div className="flex gap-3">
                        <Button>
                            <Link href={'/new'}>
                                + Deploy Project
                            </Link>
                        </Button>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </div>
                <div className="flex gap-5 w-full mt-5">
                    <Card className='w-full'>
                        <CardContent>
                            Deployed Projects
                            <div className="">
                                <h1 className='text-7xl'>
                                    {
                                        projects?.length
                                    }
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
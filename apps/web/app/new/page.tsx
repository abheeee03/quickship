"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


function NewProject() {
    const [githubURL, setGithubURL] = useState("")
    const router = useRouter()
    const [loading, setloading] = useState(false)
    const handelDeploy = async () => {
        if (!githubURL) return;
        setloading(true)
        try {
            const response = await axios.post("/api/deploy", {
                gitURL: githubURL
            })
            const data = response.data
            console.log(data.id);
            router.push(`/deploy/${data.id}`)
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }


    return (
        <div className='h-screen w-full bg-card flex items-center justify-center'>
            <Card>
                <CardContent>
                    <div className="flex flex-col gap-10">
                        <h1 className='text-3xl font-medium'>Deploy Your Project</h1>
                        <div className="flex gap-2">
                            <Input onChange={(e) => setGithubURL(e.target.value)} placeholder='Enter GitHub URL' />
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button onClick={() => {
                                router.back()
                            }} variant={"destructive"}>Cancel</Button>
                            <Button onClick={handelDeploy} disabled={loading}>Deploy</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default NewProject
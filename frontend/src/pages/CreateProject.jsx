import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

import api from "../api/api"
import { ProjectForm } from "../components/ProjectForm"
import { Button } from "../components/ui/button"

function CreateProject() {
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")

    const createProject = async (values) => {
        setIsSubmitting(true)
        setError("")

        try {
            const response = await api.post("/projects", values)
            navigate(`/projects/${response.data.data.id}`)
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Unable to create the project.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="min-h-screen bg-muted/30 px-4 py-8 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-3xl">
                <Button variant="ghost" onClick={() => navigate("/projects")}>
                    <ArrowLeft data-icon="inline-start" />
                    Back to projects
                </Button>
                <section className="mt-6 rounded-2xl border bg-background p-6 shadow-sm sm:p-8">
                    <h1 className="text-2xl font-semibold tracking-tight">Create project</h1>
                    <p className="mt-2 text-sm text-muted-foreground">Set up the project details and timeline.</p>
                    <div className="mt-8">
                        <ProjectForm submitLabel="Create project" isSubmitting={isSubmitting} error={error} onCancel={() => navigate("/projects")} onSubmit={createProject} />
                    </div>
                </section>
            </div>
        </main>
    )
}

export default CreateProject
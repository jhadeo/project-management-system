import { useEffect, useState } from "react"
import { ArrowLeft, LoaderCircle } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

import api from "../api/api"
import { ProjectForm } from "../components/ProjectForm"
import { Button } from "../components/ui/button"

function EditProject() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [project, setProject] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        api.get(`/projects/${id}`)
            .then((response) => setProject(response.data.data))
            .catch((requestError) => setError(requestError.response?.status === 404 ? "The project you are looking for does not exist." : requestError.response?.data?.message || "Unable to load the project."))
            .finally(() => setIsLoading(false))
    }, [id])

    const updateProject = async (values) => {
        setIsSubmitting(true)
        setError("")

        try {
            await api.patch(`/projects/${id}`, values)
            navigate(`/projects/${id}`)
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Unable to update the project.")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isLoading) {
        return <main className="min-h-screen bg-muted/30 px-4 py-8"><div className="flex justify-center py-32 text-muted-foreground"><LoaderCircle className="mr-2 size-5 animate-spin" />Loading project...</div></main>
    }

    if (!project) {
        return <main className="min-h-screen bg-muted/30 px-4 py-8"><div className="mx-auto max-w-3xl"><Button variant="ghost" onClick={() => navigate("/projects")}><ArrowLeft data-icon="inline-start" />Back to projects</Button><p role="alert" className="mt-8 text-destructive">{error || "Project not found."}</p></div></main>
    }

    return (
        <main className="min-h-screen bg-muted/30 px-4 py-8 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-3xl">
                <Button variant="ghost" onClick={() => navigate(`/projects/${id}`)}>
                    <ArrowLeft data-icon="inline-start" />
                    Back to project
                </Button>
                <section className="mt-6 rounded-2xl border bg-background p-6 shadow-sm sm:p-8">
                    <h1 className="text-2xl font-semibold tracking-tight">Edit project</h1>
                    <p className="mt-2 text-sm text-muted-foreground">Update the project details and timeline.</p>
                    <div className="mt-8">
                        <ProjectForm initialValues={project} submitLabel="Save changes" isSubmitting={isSubmitting} error={error} onCancel={() => navigate(`/projects/${id}`)} onSubmit={updateProject} />
                    </div>
                </section>
            </div>
        </main>
    )
}

export default EditProject
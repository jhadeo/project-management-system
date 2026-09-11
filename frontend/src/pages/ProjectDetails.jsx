import { useEffect, useState } from "react"
import { ArrowLeft, CalendarDays, CircleDot, Flag, LoaderCircle, Pencil, RefreshCw } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

import api from "../api/api"
import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/separator"

const formatLabel = (value) => value?.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase()) || "—"

const formatDate = (value) => {
    if (!value) return "—"

    const date = new Date(value)
    return Number.isNaN(date.getTime())
        ? value
        : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date)
}

function ProjectDetails() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [project, setProject] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    const loadProject = async () => {
        setIsLoading(true)
        setError("")

        try {
            const response = await api.get(`/projects/${id}`)
            setProject(response.data.data)
        } catch (requestError) {
            setProject(null)
            setError(requestError.response?.status === 404
                ? "The project you are looking for does not exist."
                : requestError.response?.data?.message || "Unable to load the project.")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        api.get(`/projects/${id}`)
            .then((response) => setProject(response.data.data))
            .catch((requestError) => setError(requestError.response?.status === 404
                ? "The project you are looking for does not exist."
                : requestError.response?.data?.message || "Unable to load the project."))
            .finally(() => setIsLoading(false))
    }, [id])

    if (isLoading) {
        return (
            <main className="min-h-screen bg-muted/30 px-4 py-8 sm:px-6 lg:px-10">
                <div className="mx-auto flex max-w-4xl items-center justify-center py-32 text-muted-foreground">
                    <LoaderCircle className="mr-2 size-5 animate-spin" />
                    Loading project...
                </div>
            </main>
        )
    }

    if (!project) {
        return (
            <main className="min-h-screen bg-muted/30 px-4 py-8 sm:px-6 lg:px-10">
                <div className="mx-auto max-w-3xl">
                    <Button variant="ghost" onClick={() => navigate("/projects")}>
                        <ArrowLeft data-icon="inline-start" />
                        Back to projects
                    </Button>
                    <div role="alert" className="mt-16 rounded-2xl border bg-background p-8 text-center shadow-sm">
                        <h1 className="text-xl font-semibold">{error || "Project not found"}</h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            {error ? "Please try again or return to the project list." : "The project you are looking for does not exist."}
                        </p>
                        {error && <Button className="mt-5" variant="outline" onClick={loadProject}>
                            <RefreshCw data-icon="inline-start" />
                            Retry
                        </Button>}
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-muted/30 px-4 py-8 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8 flex items-center justify-between gap-4">
                    <Button variant="ghost" onClick={() => navigate("/projects")}>
                        <ArrowLeft data-icon="inline-start" />
                        Back to projects
                    </Button>
                    <Button variant="outline" onClick={() => navigate(`/projects/${project.id}/edit`)}>
                        <Pencil data-icon="inline-start" />
                        Edit project
                    </Button>
                </div>

                <section className="overflow-hidden rounded-2xl border bg-background shadow-sm">
                    <div className="p-6 sm:p-8">
                        <h1 className="mt-5 text-3xl font-semibold tracking-tight">{project.project_name}</h1>
                        <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
                            {project.description}
                        </p>
                    </div>

                    <Separator />

                    <div className="grid gap-6 p-6 sm:grid-cols-3 sm:p-8">
                        <div className="flex gap-3">
                            <CalendarDays className="mt-0.5 size-4 text-muted-foreground" />
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Due date</p>
                                <p className="mt-1 text-sm font-medium">{formatDate(project.due_date)}</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <CircleDot className="mt-0.5 size-4 text-muted-foreground" />
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Status</p>
                                <p className="mt-1 text-sm font-medium">{formatLabel(project.status)}</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Flag className="mt-0.5 size-4 text-muted-foreground" />
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Priority</p>
                                <p className="mt-1 text-sm font-medium">{formatLabel(project.priority)}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default ProjectDetails
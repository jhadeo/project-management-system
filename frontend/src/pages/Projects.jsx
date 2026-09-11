import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LoaderCircle, Pencil, Plus, RefreshCw, Trash2 } from "lucide-react"

import api from "../api/api"
import { Button } from "../components/ui/button"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "../components/ui/alert-dialog"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../components/ui/table"

const formatLabel = (value) => value?.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase()) || "—"

const statusBadgeClass = {
	planning: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
	in_progress: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
	on_hold: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
	completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
}

const priorityBadgeClass = {
	low: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
	medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
	high: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
}

const badgeClass = (value, colorMap) => colorMap[value] || "bg-muted text-muted-foreground"

const formatDate = (value) => {
	if (!value) return "—"

	const date = new Date(value)
	return Number.isNaN(date.getTime())
		? value
		: new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date)
}

function Projects() {
	const navigate = useNavigate()
	const [projects, setProjects] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState("")
	const [deletingId, setDeletingId] = useState(null)
	const [projectToDelete, setProjectToDelete] = useState(null)

	const loadProjects = async () => {
		setIsLoading(true)
		setError("")

		try {
			const response = await api.get("/projects")
			setProjects(response.data.data ?? [])
		} catch (requestError) {
			setError(requestError.response?.data?.message || "Unable to load projects.")
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		api.get("/projects")
			.then((response) => setProjects(response.data.data ?? []))
			.catch((requestError) => setError(requestError.response?.data?.message || "Unable to load projects."))
			.finally(() => setIsLoading(false))
	}, [])

	const deleteProject = async (project) => {
		setDeletingId(project.id)
		setError("")

		try {
			await api.delete(`/projects/${project.id}/delete`)
			setProjects((currentProjects) => currentProjects.filter(({ id }) => id !== project.id))
		} catch (requestError) {
			setError(requestError.response?.data?.message || "Unable to delete the project.")
		} finally {
			setDeletingId(null)
		}
	}

	const confirmDeleteProject = async () => {
		if (!projectToDelete) return

		await deleteProject(projectToDelete)
		setProjectToDelete(null)
	}

	return (
		<main className="min-h-screen bg-muted/30 px-4 py-8 sm:px-6 lg:px-10">
			<div className="mx-auto max-w-6xl">
				<div className="mb-6 flex items-center justify-between gap-4">
					<h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
					<Button onClick={() => navigate("/projects/create")}>
						<Plus data-icon="inline-start" />
						Create project
					</Button>
				</div>

				{error && (
					<div role="alert" className="mb-4 flex items-center justify-between gap-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
						<span>{error}</span>
						<Button variant="ghost" size="sm" onClick={loadProjects} disabled={isLoading}>
							<RefreshCw data-icon="inline-start" />
							Retry
						</Button>
					</div>
				)}

				<div className="overflow-hidden rounded-2xl border bg-background shadow-sm p-6">
					<Table className="">
						<TableHeader>
							<TableRow>
								<TableHead className="w-[30%]">Project</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Priority</TableHead>
                                <TableHead>Start date</TableHead>
								<TableHead>Due date</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{isLoading ? (
								<TableRow>
									<TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
										<LoaderCircle className="mx-auto mb-2 size-5 animate-spin" />
										Loading projects...
									</TableCell>
								</TableRow>
							) : projects.length === 0 ? (
								<TableRow>
									<TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
										No projects yet.
									</TableCell>
								</TableRow>
							) : projects.map((project) => (
								<TableRow key={project.id}>
									<TableCell className="py-4">
										<button className="font-medium hover:underline" onClick={() => navigate(`/projects/${project.id}`)}>{project.project_name}</button>
										<div className="mt-1 max-w-sm truncate text-xs text-muted-foreground">
											{project.description}
										</div>
									</TableCell>
									<TableCell>
										<span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${badgeClass(project.status, statusBadgeClass)}`}>
											{formatLabel(project.status)}
										</span>
									</TableCell>
									<TableCell>
										<span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${badgeClass(project.priority, priorityBadgeClass)}`}>
											{formatLabel(project.priority)}
										</span>
									</TableCell>
                                    <TableCell className="text-muted-foreground">{formatDate(project.start_date)}</TableCell>
									<TableCell className="text-muted-foreground">{formatDate(project.due_date)}</TableCell>
									<TableCell>
										<div className="flex justify-end gap-1">
											<Button variant="ghost" size="sm" aria-label={`Edit ${project.project_name}`} onClick={() => navigate(`/projects/${project.id}/edit`)}>
												<Pencil data-icon="inline-start" />
												Edit
											</Button>
												<Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" aria-label={`Delete ${project.project_name}`} onClick={() => setProjectToDelete(project)} disabled={deletingId === project.id}>
												<Trash2 data-icon="inline-start" />
													Delete
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>

				<AlertDialog open={projectToDelete !== null} onOpenChange={(open) => !open && setProjectToDelete(null)}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Delete project?</AlertDialogTitle>
							<AlertDialogDescription>
								This will permanently delete {projectToDelete?.project_name}. This action cannot be undone.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel disabled={deletingId !== null}>Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={confirmDeleteProject} disabled={deletingId !== null} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
								{deletingId !== null ? "Deleting..." : "Delete project"}
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</main>
	)
}

export default Projects

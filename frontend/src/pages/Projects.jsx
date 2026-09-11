import { useNavigate } from "react-router-dom"
import { Pencil, Plus, Trash2 } from "lucide-react"

import { Button } from "../components/ui/button"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../components/ui/table"

const projects = [
	{
		id: 1,
		name: "Website redesign",
		description: "Refresh the marketing site and improve conversion paths.",
		status: "In progress",
		priority: "High",
		dueDate: "Oct 18, 2026",
	},
	{
		id: 2,
		name: "Mobile app launch",
		description: "Prepare the first public release for iOS and Android.",
		status: "Planning",
		priority: "Medium",
		dueDate: "Nov 04, 2026",
	},
	{
		id: 3,
		name: "Customer research",
		description: "Interview active customers and synthesize product insights.",
		status: "Completed",
		priority: "Low",
		dueDate: "Sep 30, 2026",
	},
	{
		id: 4,
		name: "Q4 campaign",
		description: "Coordinate creative, media, and launch communications.",
		status: "In progress",
		priority: "High",
		dueDate: "Dec 12, 2026",
	},
]

function Projects() {
	const navigate = useNavigate()

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

				<div className="overflow-hidden rounded-2xl border bg-background shadow-sm p-6">
					<Table className="">
						<TableHeader>
							<TableRow>
								<TableHead className="w-[30%]">Project</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Priority</TableHead>
								<TableHead>Due date</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{projects.map((project) => (
								<TableRow key={project.id}>
									<TableCell className="py-4">
										<div className="font-medium">{project.name}</div>
										<div className="mt-1 max-w-sm truncate text-xs text-muted-foreground">
											{project.description}
										</div>
									</TableCell>
									<TableCell>
										<span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
											{project.status}
										</span>
									</TableCell>
									<TableCell className="text-muted-foreground">{project.priority}</TableCell>
									<TableCell className="text-muted-foreground">{project.dueDate}</TableCell>
									<TableCell>
										<div className="flex justify-end gap-1">
											<Button variant="ghost" size="sm" aria-label={`Edit ${project.name}`}>
												<Pencil data-icon="inline-start" />
												Edit
											</Button>
											<Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" aria-label={`Delete ${project.name}`}>
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
			</div>
		</main>
	)
}

export default Projects

import { ArrowLeft, LoaderCircle, Save } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"

import { Button } from "./ui/button"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "./ui/field"
import { Input } from "./ui/input"

const statuses = [
    ["planning", "Planning"],
    ["in_progress", "In progress"],
    ["on_hold", "On hold"],
    ["completed", "Completed"],
]

const priorities = [
    ["low", "Low"],
    ["medium", "Medium"],
    ["high", "High"],
]

const emptyProject = {
    client_name: "",
    project_name: "",
    description: "",
    status: "planning",
    priority: "medium",
    start_date: "",
    due_date: "",
}

const toDateInputValue = (value) => value?.slice(0, 10) || ""

const normalizeProject = (project = {}) => ({
    ...emptyProject,
    ...project,
    start_date: toDateInputValue(project.start_date),
    due_date: toDateInputValue(project.due_date),
})

const projectSchema = z.object({
    client_name: z.string().trim().min(1, "Client name is required.").max(124, "Client name must be 124 characters or fewer."),
    project_name: z.string().trim().min(1, "Project name is required.").max(124, "Project name must be 124 characters or fewer."),
    description: z.string().trim().min(1, "Description is required.").max(255, "Description must be 255 characters or fewer."),
    status: z.enum(statuses.map(([value]) => value), { message: "Select a valid status." }),
    priority: z.enum(priorities.map(([value]) => value), { message: "Select a valid priority." }),
    start_date: z.string().min(1, "Start date is required."),
    due_date: z.string().min(1, "Due date is required."),
}).refine(({ start_date, due_date }) => due_date >= start_date, {
    path: ["due_date"],
    message: "Due date must be on or after the start date.",
})

function ProjectForm({ initialValues, submitLabel, isSubmitting, error, onCancel, onSubmit }) {
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: zodResolver(projectSchema),
        defaultValues: normalizeProject(initialValues),
        mode: "onBlur",
    })
    const startDate = useWatch({ control, name: "start_date" })

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
            {error && <FieldError>{error}</FieldError>}

            <FieldGroup>
                <div className="grid gap-6 sm:grid-cols-2">
                    <Field>
                        <FieldLabel htmlFor="client_name">Client name</FieldLabel>
                        <Input id="client_name" {...register("client_name")} aria-invalid={!!errors.client_name} />
                        <FieldError>{errors.client_name?.message}</FieldError>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="project_name">Project name</FieldLabel>
                        <Input id="project_name" {...register("project_name")} aria-invalid={!!errors.project_name} />
                        <FieldError>{errors.project_name?.message}</FieldError>
                    </Field>
                </div>

                <Field>
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                        <textarea id="description" {...register("description")} aria-invalid={!!errors.description} rows={4} className="w-full resize-y rounded-sm border border-transparent bg-input/50 px-2.5 py-2 text-sm outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30" />
                    <FieldDescription>Keep it short and clear for the project list.</FieldDescription>
                        <FieldError>{errors.description?.message}</FieldError>
                </Field>

                <div className="grid gap-6 sm:grid-cols-2">
                    <Field>
                        <FieldLabel htmlFor="status">Status</FieldLabel>
                        <select id="status" {...register("status")} aria-invalid={!!errors.status} className="h-8 w-full rounded-sm border border-transparent bg-input/50 px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30">
                            {statuses.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                        </select>
                        <FieldError>{errors.status?.message}</FieldError>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="priority">Priority</FieldLabel>
                        <select id="priority" {...register("priority")} aria-invalid={!!errors.priority} className="h-8 w-full rounded-sm border border-transparent bg-input/50 px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30">
                            {priorities.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                        </select>
                        <FieldError>{errors.priority?.message}</FieldError>
                    </Field>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    <Field>
                        <FieldLabel htmlFor="start_date">Start date</FieldLabel>
                        <Input id="start_date" {...register("start_date")} type="date" aria-invalid={!!errors.start_date} />
                        <FieldError>{errors.start_date?.message}</FieldError>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="due_date">Due date</FieldLabel>
                        <Input id="due_date" {...register("due_date")} type="date" aria-invalid={!!errors.due_date} min={startDate} />
                        <FieldError>{errors.due_date?.message}</FieldError>
                    </Field>
                </div>
            </FieldGroup>

            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
                    <ArrowLeft data-icon="inline-start" />
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <LoaderCircle className="animate-spin" data-icon="inline-start" /> : <Save data-icon="inline-start" />}
                    {isSubmitting ? "Saving..." : submitLabel}
                </Button>
            </div>
        </form>
    )
}

export { ProjectForm }
import { useState } from "react"
import { ArrowLeft, LoaderCircle, Save } from "lucide-react"

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

function ProjectForm({ initialValues, submitLabel, isSubmitting, error, onCancel, onSubmit }) {
    const [values, setValues] = useState(() => normalizeProject(initialValues))

    const updateValue = (event) => {
        const { name, value } = event.target
        setValues((currentValues) => ({ ...currentValues, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit(values)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {error && <FieldError>{error}</FieldError>}

            <FieldGroup>
                <div className="grid gap-6 sm:grid-cols-2">
                    <Field>
                        <FieldLabel htmlFor="client_name">Client name</FieldLabel>
                        <Input id="client_name" name="client_name" value={values.client_name} onChange={updateValue} required maxLength={124} />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="project_name">Project name</FieldLabel>
                        <Input id="project_name" name="project_name" value={values.project_name} onChange={updateValue} required maxLength={124} />
                    </Field>
                </div>

                <Field>
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <textarea id="description" name="description" value={values.description} onChange={updateValue} required maxLength={255} rows={4} className="w-full resize-y rounded-2xl border border-transparent bg-input/50 px-2.5 py-2 text-sm outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30" />
                    <FieldDescription>Keep it short and clear for the project list.</FieldDescription>
                </Field>

                <div className="grid gap-6 sm:grid-cols-2">
                    <Field>
                        <FieldLabel htmlFor="status">Status</FieldLabel>
                        <select id="status" name="status" value={values.status} onChange={updateValue} className="h-8 w-full rounded-2xl border border-transparent bg-input/50 px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30">
                            {statuses.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                        </select>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="priority">Priority</FieldLabel>
                        <select id="priority" name="priority" value={values.priority} onChange={updateValue} className="h-8 w-full rounded-2xl border border-transparent bg-input/50 px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30">
                            {priorities.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                        </select>
                    </Field>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    <Field>
                        <FieldLabel htmlFor="start_date">Start date</FieldLabel>
                        <Input id="start_date" name="start_date" type="date" value={values.start_date} onChange={updateValue} required />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="due_date">Due date</FieldLabel>
                        <Input id="due_date" name="due_date" type="date" value={values.due_date} onChange={updateValue} required min={values.start_date} />
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
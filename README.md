# Client Project Tracker

A simple full-stack application for a digital agency to track client projects, monitor project progress, and manage project priorities.

## Overview

The Client Project Tracker provides project managers with a centralized interface for managing client projects.

Each project contains:

* Client Name
* Project Name
* Description
* Status
* Priority
* Start Date
* Due Date

The application provides a REST API for project management and a frontend interface for interacting with the project data.

## Core Features

### Project Management

* View all projects
* View a single project
* Create a project
* Edit an existing project
* Delete a project

### Project Status

Projects can have one of the following statuses:

* Planning
* In Progress
* On Hold
* Completed

### Project Priority

Projects can have one of the following priorities:

* Low
* Medium
* High

### Validation

The application validates:

* Client Name is required
* Project Name is required
* Status must be a valid status
* Priority must be valid
* Due Date cannot be earlier than Start Date
* Invalid API requests should return meaningful errors

## Technical Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* Axios

### Backend

* Laravel
* PHP
* REST API

### Database

* PostgreSQL

# Client Project Tracker

A simple full-stack application for a digital agency to track client projects, monitor project progress, and manage project priorities.

## Overview

The Client Project Tracker provides project managers with a centralized interface for managing client projects.

Each project contains:

* Client Name
* Project Name
* Description
* Status
* Priority
* Start Date
* Due Date

The application provides a REST API for project management and a frontend interface for interacting with the project data.

## Core Features

### Project Management

* View all projects
* View a single project
* Create a project
* Edit an existing project
* Delete a project

### Project Status

Projects can have one of the following statuses:

* Planning
* In Progress
* On Hold
* Completed

### Project Priority

Projects can have one of the following priorities:

* Low
* Medium
* High

### Validation

The application validates:

* Client Name is required
* Project Name is required
* Status must be a valid status
* Priority must be valid
* Due Date cannot be earlier than Start Date
* Invalid API requests should return meaningful errors

## Technical Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* Axios

### Backend

* Laravel
* PHP
* REST API

### Database

* PostgreSQL

## Architecture

The application uses a simple client-server architecture:

```text
┌────────────────────┐
│      React UI      │
│                    │
│ Project List       │
│ Project Form       │
│ Project Details    │
└─────────┬──────────┘
          │
          │ HTTP / JSON
          ▼
┌────────────────────┐
│    Laravel API     │
│                    │
│ Project Controller │
│ Form Requests      │
│ Project Model      │
└─────────┬──────────┘
          │
          │ Eloquent ORM
          ▼
┌────────────────────┐
│     PostgreSQL     │
│                    │
│      projects      │
└────────────────────┘
```

The frontend communicates with the Laravel backend through REST API endpoints. Laravel handles validation and business logic before interacting with the database.

The architecture intentionally remains simple because the requirements are focused on project CRUD functionality rather than a large-scale distributed system.

## Project Model

The project model contains the following fields:

| Field          | Description                  |
| -------------- | ---------------------------- |
| `id`           | Unique project identifier    |
| `client_name`  | Name of the client           |
| `project_name` | Name of the project          |
| `description`  | Optional project description |
| `status`       | Current project status       |
| `priority`     | Project priority             |
| `start_date`   | Project start date           |
| `due_date`     | Project due date             |
| `created_at`   | Record creation timestamp    |
| `updated_at`   | Record update timestamp      |


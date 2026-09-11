# Client Project Tracker

A full-stack application for a digital agency to track client projects, monitor progress, and manage priorities.

## Features

- List, view, create, update, and delete projects
- Track client name, project name, description, status, priority, start date, and due date
- Validate required fields, enum values, and date ordering
- Use a React interface backed by a Laravel JSON API

## Tech Stack

- Frontend: React 19, Vite, Tailwind CSS, Axios
- Backend: Laravel 13, PHP 8.3+, Laravel Sanctum
- Database: PostgreSQL

## Project Structure

```text
backend/    Laravel API, migrations, validation, and tests
frontend/   React and Vite client application
```

## Requirements

- PHP 8.3 or newer with Composer
- Node.js and npm
- PostgreSQL

## Setup

### Backend

Create a PostgreSQL database, then run:

```bash
cd backend
composer install
copy .env.example .env
php artisan key:generate
```

Update the database settings in `backend/.env` (`DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD`), then run:

```bash
php artisan migrate
php artisan serve
```

The API is available at `http://localhost:8000/api`.

### Frontend

In a second terminal:

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

The frontend expects this value in `frontend/.env`:

```dotenv
VITE_API_URL=http://localhost:8000/api
```

Vite prints the local frontend URL when it starts.

## Development Commands

Run these commands from the relevant directory:

| Command | Purpose |
| --- | --- |
| `php artisan serve` | Start the Laravel API |
| `php artisan migrate` | Apply database migrations |
| `php artisan test` | Run backend tests |
| `npm run dev` | Start the frontend development server |
| `npm run build` | Build the frontend for production |
| `npm run lint` | Run frontend ESLint checks |

## API

All endpoints are prefixed with `/api`.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/projects` | List all projects |
| `POST` | `/projects` | Create a project |
| `GET` | `/projects/{id}` | Get one project |
| `PATCH` | `/projects/{id}` | Update a project |
| `DELETE` | `/projects/{id}/delete` | Delete a project |

Create and update requests use JSON. A project includes:

```json
{
    "client_name": "Acme Inc.",
    "project_name": "Website redesign",
    "description": "Redesign the public website",
    "status": "planning",
    "priority": "medium",
    "start_date": "2026-09-11",
    "due_date": "2026-10-30"
}
```

Valid status values are `planning`, `in_progress`, `on_hold`, and `completed`. Valid priority values are `low`, `medium`, and `high`. The due date must be on or after the start date.

Successful list and detail responses return project data under a `data` property. Validation failures return HTTP 422 with the invalid fields and error messages.

## Testing

Backend tests use Pest and can be run with:

```bash
cd backend
php artisan test
```

Frontend quality checks can be run with:

```bash
cd frontend
npm run lint
npm run build
```

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

## Assumptions Made

- Client information is stored directly on the project as `client_name`.
- Description is optional.
- A project can be deleted permanently because soft deletion is not specified.
- Authentication is not required because it is listed as an optional feature.
- Search, filtering, and sorting are optional bonus features.
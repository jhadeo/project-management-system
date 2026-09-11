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


<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('projects can be created, listed, viewed, updated, and deleted', function () {
    $project = [
        'client_name' => 'Acme Inc.',
        'project_name' => 'Website redesign',
        'description' => 'Redesign the company website.',
        'status' => 'planning',
        'priority' => 'high',
        'start_date' => '2026-09-11',
        'due_date' => '2026-10-11',
    ];

    $createResponse = $this->postJson('/api/projects', $project);

    $createResponse
        ->assertOk()
        ->assertJsonPath('data.clientName', 'Acme Inc.')
        ->assertJsonPath('data.projectName', 'Website redesign');

    $projectId = $createResponse->json('data.id');

    $this->assertDatabaseHas('projects', [
        'id' => $projectId,
        'project_name' => 'Website redesign',
    ]);

    $this->getJson('/api/projects')
        ->assertOk()
        ->assertJsonPath('data.0.id', $projectId);

    $this->getJson("/api/projects/{$projectId}")
        ->assertOk()
        ->assertJsonPath('data.id', $projectId);

    $this->patchJson("/api/projects/{$projectId}", [
        'project_name' => 'Updated website redesign',
    ])
        ->assertOk()
        ->assertJsonPath('data.projectName', 'Updated website redesign');

    $this->deleteJson("/api/projects/{$projectId}/delete")
        ->assertOk()
        ->assertJsonPath('message', 'Project delete successfully.');

    $this->assertSoftDeleted('projects', ['id' => $projectId]);
});

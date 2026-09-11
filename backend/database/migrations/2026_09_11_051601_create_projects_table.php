<?php

use App\Enum\Priority;
use App\Enum\Status;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string("client_name");
            $table->string("project_name");
            $table->enum('status', array_column(Status::cases(), 'value'))
                ->default(Status::IN_PROGRESS);
            $table->enum('priority', array_column(Priority::cases(), 'value'))
                ->default(Priority::MEDIUM);
            $table->text('description');
            $table->date('start_date');
            $table->date('due_date');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};

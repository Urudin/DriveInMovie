<?php

namespace App\Services;

use App\Models\Projection;
use Illuminate\Support\Facades\Gate;

class ProjectionService
{
    const PAGINATED_RECORDS = 10;
    public function __construct()
    {
    }

    public function createProjection(array $data)
    {
        return Projection::create($data);
    }

    public function deleteProjection(Projection $projection)
    {
        return $projection->delete();
    }

    public function updateProjection(Projection $projection, array $data)
    {
        $projection->update($data);
        $projection->refresh();
        return $projection;
    }

    public function getProjectionList(?string $species, ?string $status)
    {
        $query = Projection::query();
        if($species){
            $query->where('species', $species);
        }
        if($status){
            $query->where('status', $status);
        }
        return $query->paginate(self::PAGINATED_RECORDS);
    }
}

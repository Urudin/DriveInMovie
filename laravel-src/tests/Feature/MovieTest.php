<?php


use App\Models\Pet;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

class MovieTest extends TestCase
{
    use DatabaseTransactions;
    protected function setUp(): void
    {
        parent::setUp();
    }

    #[Test]
    #[DataProvider('petCreateData')]
    public function test_pet_create(array $data, bool $withLogin = true, bool $shouldCreate = true): void
    {
        $initCount = Pet::query()->count();

        if ($withLogin) {
            $this->loginAsFakeUser();
        }

        $response = $this->post(route('pets.store'), $data);

        $response->assertStatus(302);

        $finalCount = Pet::query()->count();
        $method = $shouldCreate ? 'assertGreaterThan' : 'assertEquals';
        $this->$method($initCount, $finalCount);
    }

    public static function petCreateData(): array
    {
        return [
            //Fine Data
            [
                'data' => ['name' => 'Lucky', 'species' => 'dog', 'breed' => 'Golden Retriever', 'age' => 3, 'status' => 'available', 'description' => 'Friendly dog, not qualified for guarding'],
            ],
            //Shouldn't work as no login
            [
                'data' => ['name' => 'Lucky', 'species' => 'dog', 'breed' => 'Golden Retriever', 'age' => 3, 'status' => 'available', 'description' => 'Friendly dog, not qualified for guarding'],
                'withLogin' => false,
                'shouldCreate' => false,
            ],
            //Shouldn't work as species is not valid
            [
                'data' => ['name' => 'Lucky', 'species' => 'fish', 'breed' => 'Golden Retriever', 'age' => 3, 'status' => 'available', 'description' => 'Friendly dog, not qualified for guarding'],
                'shouldCreate' => false,
            ],
            //Shouldn't work as status is not valid
            [
                'data' => ['name' => 'Lucky', 'species' => 'dog', 'breed' => 'Golden Retriever', 'age' => 3, 'status' => 'unknown', 'description' => 'Friendly dog, not qualified for guarding'],
                'shouldCreate' => false,
            ],
        ];
    }

    #[Test]
    public function pet_can_be_updated()
    {
        $user = $this->loginAsFakeUser();

        $pet = Pet::factory()->for($user)->create();

        $updateArray = Pet::factory()->make(['name' => 'MyUniquePet'])->toArray();

        $response = $this->put(route('pets.update', $pet->id), $updateArray);

        $response->assertStatus(302);

        $pet->refresh();

        foreach ($pet->getFillable() as $fillable) {
            if (in_array($fillable, $updateArray)) {
                $this->assertEquals($pet->$fillable, $updateArray[$fillable]);
            }
        }
    }

    #[Test]
    #[DataProvider('notMyPetDataProvider')]
    public function cant_spy_or_modify_foreign_pet($method, $routeName, $statusCode = 302)
    {
        $user = User::factory()->create(['email' => 'notme@example.com']);
        $pet = Pet::factory()->for($user)->create();

        $updateArray = Pet::factory()->make(['name' => 'MyUniquePet'])->toArray();
        //Act as foreign user
        $this->loginAsFakeUser();
        $response = $this->$method(route("pets.$routeName", $pet->id), $updateArray);
        //Action Failed
        $response->assertStatus(403);
        //Now act as owner
        $this->actingAs($user);

        $response = $this->$method(route("pets.$routeName", $pet->id), $updateArray);
        //Action successful
        $response->assertStatus($statusCode);
    }

    public static function notMyPetDataProvider()
    {
        return [
            [
                'method' => 'put',
                'routeName' => 'update',
            ],
            [
                'method' => 'get',
                'routeName' => 'edit',
                'statusCode' => 200,
            ],
            [
                'method' => 'get',
                'routeName' => 'show',
                'statusCode' => 200,
            ],
            [
                'method' => 'delete',
                'routeName' => 'destroy',
            ]
        ];
    }
}

<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_view_users()
    {
        $admin = User::factory()->create();
        $this->actingAs($admin);

        $response = $this->get(route('users.index'));

        $response->assertStatus(200);
    }

    public function test_admin_can_create_user()
    {
        $admin = User::factory()->create();
        $this->actingAs($admin);

        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password'
        ];

        $response = $this->post(route('users.store'), $userData);

        $response->assertRedirect(route('users.index'));
        $this->assertDatabaseHas('users', ['email' => 'test@example.com']);
    }

    public function test_admin_can_update_user()
    {
        $admin = User::factory()->create();
        $user = User::factory()->create();
        $this->actingAs($admin);

        $updatedUserData = [
            'name' => 'Updated User Name',
            'email' => $user->email,
        ];

        $response = $this->put(route('users.update', $user), $updatedUserData);

        $response->assertRedirect(route('users.index'));
        $this->assertDatabaseHas('users', ['name' => 'Updated User Name']);
    }

    public function test_admin_can_delete_user()
    {
        $admin = User::factory()->create();
        $user = User::factory()->create();
        $this->actingAs($admin);

        $response = $this->delete(route('users.destroy', $user));

        $response->assertRedirect(route('users.index'));
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }
}

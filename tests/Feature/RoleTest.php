<?php

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Role;

class RoleTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_view_roles()
    {
        $admin = User::factory()->create();
        $this->actingAs($admin);

        $response = $this->get(route('roles.index'));

        $response->assertStatus(200);
    }

    public function test_admin_can_create_role()
    {
        $admin = User::factory()->create();
        $this->actingAs($admin);

        $roleData = [
            'title' => 'Test Role',
            'description' => 'This is a test role',
        ];

        $response = $this->post(route('roles.store'), $roleData);

        $response->assertRedirect(route('roles.index'));
        $this->assertDatabaseHas('roles', [
            'title' => 'Test Role',
            'description' => 'This is a test role'
        ]);
    }

    public function test_admin_create_role_with_invalid_data()
    {
        $admin = User::factory()->create();
        $this->actingAs($admin);

        $roleData = [
            'title' => '', // Invalid title
            'description' => 'This is a test role',
        ];

        $response = $this->post(route('roles.store'), $roleData);

        $response->assertSessionHasErrors('title');
        $this->assertDatabaseMissing('roles', ['description' => 'This is a test role']);
    }

    public function test_admin_can_update_role()
    {
        $admin = User::factory()->create();
        $role = Role::factory()->create();
        $this->actingAs($admin);

        $updatedRoleData = [
            'title' => 'Updated Role Name',
            'description' => 'Updated description for the role',
        ];

        $response = $this->put(route('roles.update', $role), $updatedRoleData);

        $response->assertRedirect(route('roles.index'));
        $this->assertDatabaseHas('roles', ['title' => 'Updated Role Name', 'description' => 'Updated description for the role']);
    }

    public function test_admin_can_delete_role()
    {
        $admin = User::factory()->create();
        $role = Role::factory()->create();
        $this->actingAs($admin);

        $response = $this->delete(route('roles.destroy', $role));

        $response->assertRedirect(route('roles.index'));
        $this->assertDatabaseMissing('roles', ['id' => $role->id]);
    }
}

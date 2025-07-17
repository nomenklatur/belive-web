<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

use function PHPUnit\Framework\isEmpty;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $sortRequest = explode(',', request('sortBy', ','));  
        return Inertia::render('users/index', [
            'users' => User::query()
                ->when(request('search'), fn ($q) => $q->where('name', 'like', '%'.request('search', '').'%'))
                ->when(!empty($sortRequest[0]), fn ($q) => $q->orderBy($sortRequest[0], $sortRequest[1]))
                ->paginate(5)
                ->withQueryString(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('users/form');
    }

    public function store(UserRequest $request)
    {
        $payload = $request->validated();
        User::create($payload);
        return to_route('users.index')->with('success', 'Successfully created user');
    }
}

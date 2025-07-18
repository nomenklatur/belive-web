import AppLayout from '@/layouts/app-layout';
import HeadingSmall from '@/components/heading-small';
import { usePage, Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { toast } from 'sonner';

type UserForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation?: string;
}


export default function Index() {
  const { user } = usePage().props;

  const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Users',
            href: '/users',
        },
        {
            title: user ? 'Edit' : 'Create',
            href: user ? `/users/${(user as any).id}/edit` : '/users/create',
        }
    ];

    const { data, setData, post, put, errors, processing, recentlySuccessful } = useForm<Required<UserForm>>({
        name: user ? (user as any).name : '',
        email: user ? (user as any).email : '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (user) {
            put(route('users.update', (user as any).id), {
                preserveScroll: true,
            })
        } else {
            post(route('users.store'), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Users" />
            <div className="space-y-6 p-8">
                    <HeadingSmall title="Users" description={user ? 'Update user information' : 'Create a new user'} />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                autoComplete="name"
                                placeholder="Full name"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>

                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                autoComplete="username"
                                placeholder="Email address"
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>

                            <Input
                                id="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                placeholder="New password"
                            />

                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Confirm password</Label>

                            <Input
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                placeholder="Confirm password"
                            />

                            <InputError message={errors.password_confirmation} />
                        </div>

                        

                        <div className="flex items-center gap-4 justify-end">
                            <Button disabled={processing}>Save</Button>
                        </div>
                    </form>
                </div>
        </AppLayout>
    );
}

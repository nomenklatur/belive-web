import AppLayout from '@/layouts/app-layout';
import HeadingSmall from '@/components/heading-small';
import { usePage, Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';

type RoleForm = {
    title: string;
    description: string;
}


export default function Index() {
  const { role } = usePage().props;

  const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Roles',
            href: '/roles',
        },
        {
            title: role ? 'Edit' : 'Create',
            href: role ? `/roles/${(role as any).id}/edit` : '/roles/create',
        }
    ];

    const { data, setData, post, put, errors, processing, recentlySuccessful } = useForm<Required<RoleForm>>({
        title: role ? (role as any).title : '',
        description: role ? (role as any).description : '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (role) {
            put(route('roles.update', (role as any).id), {
                preserveScroll: true,
            })
        } else {
            post(route('roles.store'), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={role ? 'Edit role' : 'Create role'} />
            <div className="space-y-6 p-8">
                    <HeadingSmall title="Roles" description={role ? 'Update role information' : 'Create a new role'} />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>

                            <Input
                                id="title"
                                className="mt-1 block w-full"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Role title"
                            />

                            <InputError className="mt-2" message={errors.title} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>

                            <Textarea
                                id="description"
                                className="mt-1 block w-full"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Role description"
                            />

                            <InputError className="mt-2" message={errors.description} />
                        </div>
                        <div className="flex items-center gap-4 justify-end">
                            <Button disabled={processing}>Save</Button>
                        </div>
                    </form>
                </div>
        </AppLayout>
    );
}

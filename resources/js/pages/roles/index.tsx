import AppLayout from '@/layouts/app-layout';
import { router, usePage, Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import AppTable from '@/components/app-table';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { formatToDateTimeString } from '@/lib/datetime';
import { useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
];

export default function Index() {
  const { roles } = usePage().props;
  const [isDeleteRoleModalOpen, setIsDeleteRoleModalOpen] = useState(false);
  const [roleIdToDelete, setRoleIdToDelete] = useState(null);


  const deleteRole = () => {
  if (!roleIdToDelete) {
    return;
  }
  router.delete(route('roles.destroy', roleIdToDelete!));
  setIsDeleteRoleModalOpen(false);
  setRoleIdToDelete(null);
}

  const headers = [
    { key: 'title', title: 'Name', sortable: true },
    { key: 'created_at', title: 'Created At', sortable: false },
  ];

  const options = {
    searchable: false,
    filterable: false,
  };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />
            <div className="flex h-full flex-1 flex-col gap-2 rounded-xl p-4 overflow-x-auto">
                <div className='flex justify-between items-center'>
                    <Heading title="Roles" description="Create or update user roles" />
                    <Link href='/roles/create'>
                      <Button className='mb-8'> <Plus /> New</Button>
                    </Link>
                    
                </div>
                    <AppTable
                        headers={headers}
                        data={roles}
                        hasAction={true}
                        options={options}
                        renderRow={(item: any) => (
                        <>
                            <td className="px-4 py-2 font-medium">{item.title}</td>
                            <td className='px-4 py-2'>{formatToDateTimeString(item.created_at)}</td>
                        </>
                        )}
                        renderAction={(item: any) => (
                        <div className="text-sm">
                            <button 
                            className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
                            onClick={() => router.visit(`/roles/${item.id}/edit`)}
                            >
                            Edit
                            </button>
                            <button 
                            className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-red-600"
                            onClick={() => {
                                setRoleIdToDelete(item.id);
                                setIsDeleteRoleModalOpen(true);
                            }}
                            >
                            Delete
                            </button>
                        </div>
                        )}
                        renderFilters={() => (
                        <div className="space-y-4">
                            <div>
                            <label className="block text-sm font-medium mb-2">Status</label>
                            <select className="w-full p-2 border rounded">
                                <option value="">All</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            </div>
                        </div>
                        )}
                    />
            </div>
            <Dialog open={isDeleteRoleModalOpen} onOpenChange={setIsDeleteRoleModalOpen}>
                    <DialogContent>
                      <DialogTitle>Are you sure you want to delete this role?</DialogTitle>
                        <DialogDescription>
                            Once this role is deleted, the user associated with the role will no longer have a role and may not access the app.
                        </DialogDescription>
                            <DialogFooter className="gap-2">
                                <DialogClose asChild>
                                    <Button variant="secondary" onClick={() => setIsDeleteRoleModalOpen(false)}>
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button variant="destructive" onClick={deleteRole} >
                                   Delete
                                </Button>
                            </DialogFooter>
                    </DialogContent>
                </Dialog>
        </AppLayout>
    );
}

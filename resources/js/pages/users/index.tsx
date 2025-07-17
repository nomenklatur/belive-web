import AppLayout from '@/layouts/app-layout';
import { router, usePage, Head } from '@inertiajs/react';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import AppTable from '@/components/app-table';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { useFilters } from '@/hooks/use-filters';
import { formatToDateTimeString } from '@/lib/datetime';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

export default function Index() {
  const { users, query } = usePage().props;
  const [currentPage, setCurrentPage] = useState(1);

  const { filters, setAndApplyFilters } = useFilters({
    search: (query as any)?.search,
    sortBy: (query as any)?.sortBy,
  },
  (filters: any) => {
    console.log("Filters applied:", filters);
    router.get(route('users.index'), { ...filters });
  }
)

  console.log(query);

  const headers = [
    { key: 'name', title: 'Name', sortable: true },
    { key: 'email', title: 'Email', sortable: true },
    { key: 'created_at', title: 'Created At', sortable: false },
  ];

  const options = {
    searchable: true,
    filterable: true,
    search: filters.search,
    sortBy: filters.sortBy,
    searchPlaceholder: 'Search users...'
  };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-2 rounded-xl p-4 overflow-x-auto">
                <div className='flex justify-between items-center'>
                    <Heading title="Users" description="Manage your users information" />
                    <Button className='mb-8'> <Plus /> New</Button>
                </div>
                    <AppTable
                        headers={headers}
                        data={users}
                        hasAction={true}
                        options={options}
                        onSort={(value: string) => {console.log('Sorted by:', value); setAndApplyFilters('sortBy', value)}}
                        onSearch={(value: string) => {console.log('Search query:', value); setAndApplyFilters('search', value)}}
                        onFilter={() => console.log('Filter applied')}
                        onResetFilters={() => console.log('Filters reset')}
                        onPageChange={setCurrentPage}
                        renderRow={(item: any) => (
                        <>
                            <td className="px-4 py-2 font-medium">{item.name}</td>
                            <td className="px-4 py-2">{item.email}</td>
                            <td className='px-4 py-2'>{formatToDateTimeString(item.created_at)}</td>
                        </>
                        )}
                        renderAction={(item: any) => (
                        <div className="text-sm">
                            <button 
                            className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
                            onClick={() => console.log('Edit', item.id)}
                            >
                            Edit
                            </button>
                            <button 
                            className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-red-600"
                            onClick={() => console.log('Delete', item.id)}
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
        </AppLayout>
    );
}

import { useState, useMemo, useCallback } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  ChevronsUpDown, 
  Search, 
  Filter, 
  MoreHorizontal 
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import AppPagination from './app-pagination';


// Main DataTable Component
const AppTable = ({
  headers = [],
  data = [],
  hasAction = true,
  hideAction = null,
  options = {},
  hasExtendedLink = false,
  isIndexPage = true,
  onSort = () => {},
  onSearch = () => {},
  onFilter = () => {},
  onResetFilters = () => {},
  onPageChange = () => {},
  renderRow = () => null,
  renderAction = () => null,
  renderFilters = () => null,
  renderExtendedLink = () => null,
  renderNoData = () => "No data found",
  renderHead = () => null,
  renderFoot = () => null,
}: any) => {
  const [filtersModal, setFiltersModal] = useState(false);
  const [searchValue, setSearchValue] = useState((options as any).search || '');
  
  // Handle pagination
  const isPaginated = useMemo(() => 
    data && typeof data === 'object' && data.hasOwnProperty('data'), 
    [data]
  );
  
  const items = useMemo(() => 
    isPaginated ? (data as any).data : data, 
    [data, isPaginated]
  );
  
  const currentPage = useMemo(() => 
    isPaginated ? (data as any).current_page || 1 : 1, 
    [data, isPaginated]
  );
  
  const totalPages = useMemo(() => 
    isPaginated ? (data as any).last_page || 1 : 1, 
    [data, isPaginated]
  );

  // Handle sorting
  const sortBy = useMemo(() => {
    const [column, order] = ((options as any).sortBy || '').split(',');
    
    if (!(column && headers.find((item: any) => (item as any).key === column))) {
      return { column: null, order: 'asc' };
    }
    
    return {
      column: column,
      order: order || 'asc',
    };
  }, [(options as any).sortBy, headers]);

  const isSortableColumn = useCallback((header: any) => {
    return header.hasOwnProperty('key') && header.sortable !== false;
  }, []);

  const handleSort = useCallback((column: any) => {
    let order = 'asc';
    
    if (column && sortBy.column === column) {
      order = sortBy.order === 'asc' ? 'desc' : '';
    }
    
    onSort(order ? `${column},${order}` : '');
  }, [sortBy, onSort]);

  // Handle search with debounce
  const handleSearch = useCallback(
    debounce((value: any) => {
      onSearch(value);
    }, 500),
    [onSearch]
  );

  const handleSearchChange = (e: any) => {
    const value = e.target.value;
    setSearchValue(value);
    handleSearch(value);
  };

  // Debounce utility function
  function debounce(func: any, wait: any) {
    let timeout: any;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const getSortIcon = (header: any) => {
    if (!isSortableColumn(header)) return null;
    
    if (sortBy.column !== header.key) {
      return <ChevronsUpDown className="h-4 w-4" />;
    }
    
    return sortBy.order === 'asc' ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />;
  };

  return (
    <div className="w-full">
      <Card className="mt-2">
        {renderHead && (
          <CardHeader>
            {renderHead()}
          </CardHeader>
        )}
        
        <CardContent className="p-0 overflow-x-auto">
          {/* Search and Filter Section */}
          {(options.searchable || options.filterable) && (
            <div className="p-3 pb-0 flex items-center space-x-3">
              {options.searchable && (
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder={options.searchPlaceholder || "Search..."}
                      value={searchValue}
                      onChange={handleSearchChange}
                      className="pl-8"
                    />
                  </div>
                </div>
              )}
              
              {options.filterable && (
                <Dialog open={filtersModal} onOpenChange={setFiltersModal}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 md:mr-2" />
                      <span className='hidden md:inline'>Filters</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Filters</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      {renderFilters && renderFilters()}
                      <div className="flex justify-end space-x-2 pt-4">
                        <Button
                          variant="outline"
                          onClick={() => {
                            onResetFilters();
                            setFiltersModal(false);
                          }}
                        >
                          Reset
                        </Button>
                        <Button
                          onClick={() => {
                            onFilter();
                            setFiltersModal(false);
                          }}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          )}

          {/* Table */}
          <div className="w-full">
            <table className="w-full text-left text-sm">
              <thead className={`tracking-wide ${isIndexPage ? '' : 'bg-gray-100'}`}>
                <tr className="border-b">
                  {headers.map((header: any, idx: any) => (
                    <th
                      key={idx}
                      className={`px-4 py-3 ${
                        isSortableColumn(header) ? 'cursor-pointer hover:bg-gray-50' : ''
                      }`}
                      onClick={() => isSortableColumn(header) ? handleSort(header.key) : null}
                    >
                      <div className="inline-flex items-center space-x-2 font-normal">
                        <span className="whitespace-nowrap">{header.title}</span>
                        {getSortIcon(header)}
                      </div>
                    </th>
                  ))}
                  {hasAction && <th className="px-4 py-3"></th>}
                </tr>
              </thead>
              
              <tbody className="divide-y">
                {items && items.length > 0 ? (
                  <>
                    {items.map((item: any, idx: any) => (
                      <tr
                        key={idx}
                        className="hover:bg-blue-50/50 transition-all duration-100"
                      >
                        {renderRow(item, idx)}
                        
                        {hasAction && !(hideAction && hideAction(item)) && (
                          <td className="px-4 py-2">
                            <div className="flex justify-end">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                  <div className="text-sm tracking-wide px-2 py-1">
                                    {renderAction && renderAction(item)}
                                  </div>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                    
                    {hasExtendedLink && (
                      <tr className="text-center bg-gray-100">
                        <td colSpan={headers.length + (hasAction ? 1 : 0)}>
                          {renderExtendedLink && renderExtendedLink()}
                        </td>
                      </tr>
                    )}
                  </>
                ) : (
                  <tr className="hover:bg-blue-50/50">
                    <td
                      colSpan={headers.length + (hasAction ? 1 : 0)}
                      className="py-8 text-center text-muted-foreground text-sm"
                    >
                      {renderNoData()}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {renderFoot && (
            <div className="p-3">
              {renderFoot()}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {isPaginated && (
        <AppPagination
          links={data?.links || []}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default AppTable
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode, useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner'; // Import toast
import { toast } from 'sonner';
import { usePage } from '@inertiajs/react'; // Import usePage

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    // Get the current page props, including flash messages
    const { flash } = usePage().props;

    useEffect(() => {
        // Check for success flash messages
        if ((flash as any).success) {
            toast.success((flash as any).success, { position: 'bottom-right', richColors: true });
        }

        // Check for error flash messages
        if ((flash as any).error) {
            toast.error((flash as any).error, { position: 'bottom-right', richColors: true });
        }

        // Check for info flash messages
        if ((flash as any).info) {
            toast.info((flash as any).info, { position: 'bottom-right', richColors: true });
        }

        // You can add more toast types (e.g., warning, custom) as needed
        if ((flash as any).warning) {
            toast.warning((flash as any).warning, { position: 'top-center', richColors: true });
        }

    }, [flash]); // Re-run this effect whenever the 'flash' prop changes

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
            <Toaster
              toastOptions={{
                classNames: {
                  toast: "bg-blue-500 text-white border-blue-700", // General toast styling
                  title: "text-lg font-bold", // Title styling
                  description: "text-blue-100", // Description styling
                  actionButton: "bg-blue-700 text-white hover:bg-blue-800", // Action button styling
                  cancelButton: "bg-red-500 text-white hover:bg-red-600", // Cancel button styling
                  closeButton: "text-white hover:text-gray-300", // Close button styling
                  // You can also target specific toast types:
                  error: "bg-red-500 text-white",
                  success: "bg-green-500 text-white",
                  info: "bg-yellow-500 text-black",
                },
              }}
            />
        </AppLayoutTemplate>
    );
};
import React from 'react';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginationProps {
  links: PaginationLink[];
  onPageChange?: (url: string) => void;
}

const AppPagination: React.FC<PaginationProps> = ({ links = [], onPageChange }) => {
  const handleClick = (e: React.MouseEvent, url: string | null) => {
    if (!url) {
      e.preventDefault();
      return;
    }
    
    if (onPageChange) {
      e.preventDefault();
      onPageChange(url);
    }
  };

  if (!links.length) return null;

  return (
    <div className="flex justify-center mt-2">
      <div className="flex overflow-x-scroll gap-1">
        {links.map((link, index) => (
          <div
            key={index}
            className={`
                md:block hover:bg-accent hover:text-accent-foreground w-full rounded-md border border-gray-300
              ${link.active ? 'bg-accent text-accent-foreground' : ''}
              ${![0, links.length - 1].includes(index) ? 'hidden' : ''}
            `}
          >
            {link.label !== '...' ? (
              <a
                href={link.url || '#'}
                onClick={(e) => handleClick(e, link.url)}
                className={`
                  h-10 w-10 grid place-items-center
                  ${!link.url ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                `}
              >
                {index === 0 ? (
                  <ChevronLeft className="h-5 w-5" />
                ) : index === links.length - 1 ? (
                  <ChevronRight className="h-5 w-5" />
                ) : (
                  <span>{link.label}</span>
                )}
              </a>
            ) : (
              <div className="h-10 w-10 grid place-items-center">
                {link.label}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppPagination;
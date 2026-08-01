import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { Button } from "@/registry/primitives/button"
import { Pagination, PaginationContent, PaginationItem } from "@/registry/primitives/pagination"

export default function PaginationPreviousNextDemo() {
  const currentPage = 1
  const totalPages = 10
  return (
    <Pagination>
      <PaginationContent className="w-full justify-between gap-3">
        <PaginationItem>
          <Button
            aria-disabled={currentPage === 1 ? true : undefined}
            asChild
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            role={currentPage === 1 ? "link" : undefined}
            variant="outline">
            <a href={currentPage === 1 ? undefined : `#/page/${currentPage - 1}`}>
              <ChevronLeftIcon aria-hidden="true" className="-ms-1 opacity-60" size={16} />
              Previous
            </a>
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            aria-disabled={currentPage === totalPages ? true : undefined}
            asChild
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            role={currentPage === totalPages ? "link" : undefined}
            variant="outline">
            <a href={currentPage === totalPages ? undefined : `#/page/${currentPage + 1}`}>
              Next
              <ChevronRightIcon aria-hidden="true" className="-me-1 opacity-60" size={16} />
            </a>
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

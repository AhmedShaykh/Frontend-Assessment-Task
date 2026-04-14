import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis, } from "@/components/ui/pagination";

type Props = {
    currentPage: number;
    setCurrentPage: (page: number | ((prev: number) => number)) => void;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
};

const PaginationComponent = ({
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
    itemsPerPage
}: Props) => {

    if (totalPages <= 1) return null;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <p className="text-sm text-muted-foreground">
                Showing{" "}

                <span className="font-medium text-foreground">
                    {(currentPage - 1) * itemsPerPage + 1}–
                    {Math.min(currentPage * itemsPerPage, totalItems)}
                </span>{" "}
                Of{" "}

                <span className="font-medium text-foreground">
                    {totalItems}
                </span>{" "}

                Products
            </p>

            <Pagination className="mx-0 w-auto">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() =>
                                setCurrentPage((p) => Math.max(p - 1, 1))
                            }
                            className={
                                currentPage === 1
                                    ? "pointer-events-none opacity-50"
                                    : "cursor-pointer"
                            }
                        />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => {
                            const showPage =
                                page === 1 ||
                                page === totalPages ||
                                Math.abs(page - currentPage) <= 1;

                            if (!showPage && page === 2 && currentPage > 3) {
                                return (
                                    <PaginationItem key="ellipsis-start">
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                );
                            }

                            if (
                                !showPage &&
                                page === totalPages - 1 &&
                                currentPage < totalPages - 2
                            ) {
                                return (
                                    <PaginationItem key="ellipsis-end">
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                );
                            }

                            if (!showPage) return null;

                            return (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        onClick={() => setCurrentPage(page)}
                                        isActive={currentPage === page}
                                        className="cursor-pointer"
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        }
                    )}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() =>
                                setCurrentPage((p) =>
                                    Math.min(p + 1, totalPages)
                                )
                            }
                            className={
                                currentPage === totalPages
                                    ? "pointer-events-none opacity-50"
                                    : "cursor-pointer"
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default PaginationComponent;
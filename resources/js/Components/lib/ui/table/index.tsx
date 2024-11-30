import React from "react";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Pagination,
    PaginationProps,
    Spinner,
    Table as NextTable,
    TableBody,
    TableBodyProps,
    TableCell,
    TableColumn,
    TableHeader,
    TableHeaderProps,
    TableProps as NextTableProps,
    TableRow,
    TableRowProps,
} from "@nextui-org/react";
import {cn} from "@/Components/utils";
import {ChevronDownIcon, SearchIcon} from "lucide-react";

export type Column = {
    key: string;
    label: string;
    allowSorting?: boolean;
};

export type TableProps<T> = {
    tableTopContentProps: TableTopContentProps;
    columns: Column[];
    data: T[];
    renderCell: (item: T, columnKey: React.Key) => React.ReactNode;
    tableProps?: NextTableProps;
    tableHeaderProps?: TableHeaderProps<T>;
    paginationProps?: PaginationProps;
    tableRowProps?: TableRowProps;
    tableBodyProps?: TableBodyProps<T>;
    itemsPerPage?: number;
    ariaLabel?: string;
};

export type TableTopContentProps = {
    filterValue: string;
    onClearSearch: () => void;
    onSearchChange: (value: string) => void;
    visibleColumns: Set<string>;
    setVisibleColumns: React.Dispatch<React.SetStateAction<Set<string>>>;
    text: { search: string };
    columns: Column[];
}

export function Table<T>({
                             tableTopContentProps,
                             ariaLabel,
                             columns,
                             data,
                             tableBodyProps,
                             renderCell,
                             tableRowProps,
                             tableProps,
                             paginationProps,
                             tableHeaderProps,
                             itemsPerPage = 40,
                         }: TableProps<T>) {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [filterValue, setFilterValue] = React.useState("");

    if (!data || data.length === 0) return null;

    const filteredItems = React.useMemo(() => {
        if (!filterValue) return data;
        return data.filter((item) =>
            Object.values(item as any)
                .join(" ")
                .toLowerCase()
                .includes(filterValue.toLowerCase())
        );
    }, [data, filterValue]);

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const currentItems = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const tableContainer = document.getElementById("table-container");
        if (tableContainer) {
            tableContainer.scrollIntoView();
        }
    };

    const [visibleColumns, setVisibleColumns] = React.useState<Set<string>>(
        new Set(columns.map((column) => column.key))
    );

    const filteredColumns = React.useMemo(() => {
        return columns.filter((column) => visibleColumns.has(column.key));
    }, [columns, visibleColumns]);

    return (
        <section id="table-container">
            <NextTable
                {...tableProps}
                aria-label={ariaLabel ?? "Table"}
                isStriped={tableProps?.isStriped ?? true}
                topContent={
                    <TableTopContent
                        {...tableTopContentProps}
                        filterValue={filterValue}
                        onSearchChange={setFilterValue}
                        onClearSearch={() => setFilterValue("")}
                        visibleColumns={visibleColumns}
                        setVisibleColumns={setVisibleColumns}
                        columns={columns}
                    />
                }
                bottomContent={
                    totalPages > 1 && (
                        <Pagination
                            className={cn("", paginationProps?.className)}
                            page={currentPage}
                            onChange={handlePageChange}
                            showControls={paginationProps?.showControls ?? true}
                            total={totalPages}
                            {...paginationProps}
                        />
                    )
                }
            >
                <TableHeader {...tableHeaderProps}>
                    {filteredColumns.map((column) => (
                        <TableColumn
                            key={column.key}
                            allowsSorting={column.allowSorting ?? false}
                            align={column.key === "actions" ? "center" : "start"}
                        >
                            {column.label}
                        </TableColumn>
                    ))}
                </TableHeader>
                <TableBody
                    items={currentItems}
                    loadingContent={<Spinner color="white"/>}
                    {...tableBodyProps}
                >
                    {(item) => (
                        <TableRow key={(item as any).id.toString()} {...tableRowProps}>
                            {filteredColumns.map((column) => (
                                <TableCell key={column.key}>
                                    {renderCell(item, column.key)}
                                </TableCell>
                            ))}
                        </TableRow>
                    )}
                </TableBody>
            </NextTable>
        </section>
    );
}

export function TableTopContent({
                                    filterValue,
                                    onClearSearch,
                                    onSearchChange,
                                    visibleColumns,
                                    setVisibleColumns,
                                    text,
                                    columns,
                                }: TableTopContentProps) {
    return (
        <div className="flex-col gap-4 hidden lg:flex">
            <div className="flex justify-between gap-3 items-center">
                <Input
                    isClearable
                    placeholder={text.search}
                    variant="flat"
                    className="w-full sm:max-w-[44%]"
                    startContent={<SearchIcon/>}
                    value={filterValue}
                    onClear={onClearSearch}
                    onValueChange={(text) => onSearchChange(text)}
                />
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            className="rounded-full"
                            startContent={<ChevronDownIcon className="text-small size-5"/>}
                            size="sm"
                            variant="flat"
                            isIconOnly
                        />
                    </DropdownTrigger>
                    <DropdownMenu
                        color="primary"
                        disallowEmptySelection
                        aria-label="Table Columns"
                        closeOnSelect={false}
                        selectedKeys={visibleColumns}
                        selectionMode="multiple"
                        onSelectionChange={(keys) =>
                            setVisibleColumns(new Set(Array.from(keys as unknown as string[])))
                        }
                    >
                        {columns.map((column) => (
                            <DropdownItem key={column.key} className="capitalize">
                                {column.label}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    );
}

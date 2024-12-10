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
import {MoreHorizontal, SearchIcon} from "lucide-react";

export type Column = {
    key: string;
    label: string;
    allowSorting?: boolean;
};

export type TableProps<T> = {
    tableTopContentProps: Partial<TableTopContentProps>;
    columns: Column[];
    data: T[];
    renderCell: (item: T, columnKey: React.Key) => React.ReactNode;
    tableProps?: NextTableProps;
    tableHeaderProps?: Partial<TableHeaderProps<T>>;
    paginationProps?: Partial<PaginationProps>;
    tableRowProps?: Partial<TableRowProps>;
    tableBodyProps?: Partial<TableBodyProps<T>>;
    itemsPerPage?: number;
    ariaLabel?: string;
    disablePagination?: boolean;
    disableSearch?: boolean;
};

export type TableTopContentProps = {
    disableSearch?: boolean;
    filterValue: string;
    onClearSearch: () => void;
    onSearchChange: (value: string) => void;
    visibleColumns: Set<string>;
    setVisibleColumns: React.Dispatch<React.SetStateAction<Set<string>>>;
    text: { search: string };
    columns: Column[];
}

/**
 * Table component for the table.
 * @param tableTopContentProps - Props for the TableTopContent component.
 * @param ariaLabel - The aria label for the table.
 * @param columns - The columns for the table.
 * @param data - The data for the table.
 * @param tableBodyProps - Props for the TableBody component.
 * @param renderCell - The render cell function for the table.
 * @param tableRowProps - Props for the TableRow component.
 * @param tableProps - Props for the Table component.
 * @param paginationProps - Props for the Pagination component.
 * @param tableHeaderProps - Props for the TableHeader component.
 * @param itemsPerPage - The number of items to display per page.
 * @param disableSearch - Whether to disable the search functionality.
 * @param disablePagination - Whether to disable the pagination functionality.
 * @returns JSX.Element
 */
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
                             disableSearch = false,
                             disablePagination = false,
                         }: TableProps<T>) {
    // If disable pagination is true, set itemsPerPage to Infinity
    if (disablePagination) itemsPerPage = Infinity;

    // State to track the current page
    const [currentPage, setCurrentPage] = React.useState(1);
    // State to track the filter value
    const [filterValue, setFilterValue] = React.useState("");

    // If no data or data is empty, return null
    if (!data || data.length === 0) return null;

    // Filter the data based on the filter value
    const filteredItems = React.useMemo(() => {
        if (!filterValue) return data;
        return data.filter((item) =>
            Object.values(item as any)
                .join(" ")
                .toLowerCase()
                .includes(filterValue.toLowerCase())
        );
    }, [data, filterValue]);

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const currentItems = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const tableContainer = document.getElementById("table-container");
        if (tableContainer) {
            tableContainer.scrollIntoView();
        }
    };

    // State to track the visible columns
    const [visibleColumns, setVisibleColumns] = React.useState<Set<string>>(
        new Set(columns.map((column) => column.key))
    );

    // Filter the columns based on the visible columns
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
                        disableSearch={disableSearch}
                        {...tableTopContentProps}
                        text={tableTopContentProps.text ?? {search: "Search"}}
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
                            variant={"light"}
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

/**
 * TableTopContent component for the table top content.
 * @param filterValue - The filter value for the table.
 * @param onClearSearch - The on clear search function for the table.
 * @param onSearchChange - The on search change function for the table.
 * @param visibleColumns - The visible columns for the table.
 * @param setVisibleColumns - The set visible columns function for the table.
 * @param text - The text for the table.
 * @param columns - The columns for the table.
 * @returns JSX.Element
 */
export function TableTopContent({
                                    disableSearch,
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
                {!disableSearch && <Input
                    isClearable={true}
                    placeholder={text.search}
                    variant="flat"
                    classNames={{input: "border-none"}}
                    className="w-full min-w-[200px] sm:max-w-[44%]"
                    startContent={<SearchIcon/>}
                    value={filterValue}
                    onClear={onClearSearch}
                    onValueChange={(text) => onSearchChange(text)}
                />}
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            startContent={<MoreHorizontal className="text-small size-4 text-foreground-600"/>}
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

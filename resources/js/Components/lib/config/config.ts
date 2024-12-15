export function getStatusColor(status: string) {
    switch (status) {
        case "cancelled":
            return "danger";
        case "pending":
            return "warning";
        case "confirmed":
            return "success";
        default:
            return "default";
    }
}

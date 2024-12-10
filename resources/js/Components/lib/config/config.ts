export function getStatusColor(status: string) {
    switch (status) {
        case "empty":
            return "default";
        case "pending":
            return "warning";
        case "booked":
            return "danger";
        default:
            return "default";
    }
}

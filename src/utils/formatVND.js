export const formatVND = (value) => {
    try {
        return value.toLocaleString();
    } catch {
        return '0';
    }
};
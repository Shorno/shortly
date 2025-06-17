export const truncateUrl = (url: string, maxLength = 50) => {
    if (url.length <= maxLength) return url
    return url.substring(0, maxLength) + "..."
}
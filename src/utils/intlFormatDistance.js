export function intlFormatDistance(date1, date2) {
  const diffInMs = Math.abs(date1 - date2);
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays >= 365) {
    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} year${diffInYears === 1 ? '' : 's'} ago`;
  } else if (diffInDays >= 30) {
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'} ago`;
  } else if (diffInDays >= 1) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
  } else {
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInHours >= 1) {
      return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    } else {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    }
  }
}

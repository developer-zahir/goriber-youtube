function getVideoUploadTime(postTime) {
  const years = Math.floor(postTime / (3600 * 24 * 365)); // Calculate years
  const months = Math.floor((postTime % (3600 * 24 * 365)) / (3600 * 24 * 30)); // Calculate months
  const days = Math.floor((postTime % (3600 * 24 * 30)) / (3600 * 24)); // Calculate days
  const hours = Math.floor((postTime % (3600 * 24)) / 3600); // Calculate hours
  const minutes = Math.floor((postTime % 3600) / 60); // Calculate minutes

  // Handle the time formatting with the new units
  if (years) {
    return `${years} years ago`;
  } else if (months) {
    return `${months} months ago`;
  } else if (days) {
    return `${days} days ago`;
  } else if (hours) {
    return `${hours} hrs ago`;
  } else if (minutes) {
    return `${minutes} min ago`;
  } else {
    return `Just now`;
  }
}



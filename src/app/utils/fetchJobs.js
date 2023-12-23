async function fetchJobs() {
  const res = await fetch(
    ' https://boards-api.greenhouse.io/v1/boards/doordash/jobs',
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default fetchJobs;

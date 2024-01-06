export async function fetchJobs(board_token) {
  const res = await fetch(
    `https://boards-api.greenhouse.io/v1/boards/${board_token}/jobs`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return res.json();
}

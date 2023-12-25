// export const runtime = 'edge';

export async function GET(request) {
  // Secure cron function invocation by checking header
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  const baseUrl = process.env.VERCEL_URL
    ? 'https://' + process.env.VERCEL_URL
    : 'http://localhost:3000';

  await fetch(`${baseUrl}/api/jobs`);

  return Response.json({ success: true, message: 'Cron job completed' });
}

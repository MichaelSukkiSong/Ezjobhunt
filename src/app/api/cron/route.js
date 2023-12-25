import fb from '@/app/services/firebase';
import { collection, addDoc, getDocs, where, query } from 'firebase/firestore';

export const runtime = 'edge';

export async function GET(request) {
  // Secure corn function invocation by checking header
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  const { jobs, meta } = await getJobs();
  const db = fb.getFirestore();
  await saveJobs(db, jobs);

  return Response.json({ jobs: jobs });
}

async function getJobs() {
  const res = await fetch(
    'https://boards-api.greenhouse.io/v1/boards/doordash/jobs'
  );

  if (!res.ok) {
    throw new Error('Failed to fetch jobs');
  }

  return res.json();
}

async function saveJobs(db, jobs) {
  for (const job of jobs) {
    // Check if the job already exists in Firestore
    const jobQuery = query(
      collection(db, 'jobs'),
      where('job_title', '==', job.title),
      where('job_location', '==', job.location.name),
      where(
        'job_entity',
        '==',
        job.metadata.find((el) => el.name === 'Entity')?.value || null
      ),
      where(
        'job_type',
        '==',
        job.metadata.find((el) => el.name === 'Time Type')?.value || null
      )
    );
    const querySnapshot = await getDocs(jobQuery);

    if (querySnapshot.empty) {
      // Job does not exist, add it to Firestore
      try {
        const docRef = await addDoc(collection(db, 'jobs'), {
          job_title: job.title,
          job_location: job.location.name,
          job_entity: job.metadata.find((el) => el.name === 'Entity').value,
          job_type: job.metadata.find((el) => el.name === 'Time Type').value,
          compensation: null,
          salary_range: null,
        });

        console.log('Document written with ID: ', docRef.id);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    } else {
      // Job already exists, skip
      console.log(
        `Job "${job.title}" already exists in Firestore. Skipping...`
      );
    }
  }
}

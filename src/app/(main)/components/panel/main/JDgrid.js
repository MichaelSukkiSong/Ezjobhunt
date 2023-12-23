import JDcard from './JDcard';
import fetchJobs from '@/app/utils/fetchJobs';
import { collection, addDoc, getDocs, where, query } from 'firebase/firestore';
import fb from '@/app/services/firebase';

const JDgrid = async () => {
  const { jobs, meta } = await fetchJobs();

  const db = fb.getFirestore();

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
  const renderJDcard = () => {
    return <JDcard />;
  };

  return (
    <div className="infinite-scroll-component__outerdiv">
      <div className="infinite-scroll-component ">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {renderJDcard()}
        </div>
      </div>
    </div>
  );
};

export default JDgrid;

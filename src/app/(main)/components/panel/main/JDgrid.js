import JDcard from './JDcard';

async function getData() {
  const res = await fetch(
    ' https://boards-api.greenhouse.io/v1/boards/doordash/jobs',
    {
      next: { revalidate: 3600 },
    }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const JDgrid = async () => {
  // TODO: Fetch data on the server with fetch.
  const data = await getData();
  // fetch job->store in firebase->trigger save event->parse data->show in client
  console.log(data);

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

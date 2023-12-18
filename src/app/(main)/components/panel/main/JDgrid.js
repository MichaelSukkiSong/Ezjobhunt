import JDcard from './JDcard';

const JDgrid = () => {
  // TODO: Use cloud functions instead of using state in react.
  // fetch job->store in firebase->trigger save event->parse data->show in client

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

import { Switch } from '@chakra-ui/react';

const RemoteOnlyBtn = () => {
  return (
    <div className="flex flex-row flex-none items-center space-x-2 border rounded-xl outline-none p-2">
      <span>Remote Only</span>
      <Switch />
    </div>
  );
};

export default RemoteOnlyBtn;

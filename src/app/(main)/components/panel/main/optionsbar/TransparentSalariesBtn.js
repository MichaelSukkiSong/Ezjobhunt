'use client';

import { Switch } from '@chakra-ui/react';

const TransparentSalariesBtn = () => {
  return (
    <div className="flex flex-row flex-none items-center space-x-2 border rounded-xl outline-none p-2">
      <span>Transparent Salaries Only</span>
      <Switch />
    </div>
  );
};

export default TransparentSalariesBtn;

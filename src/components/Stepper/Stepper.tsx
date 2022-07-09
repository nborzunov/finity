import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import Step from './Step';

function Stepper({ count, active }: { count: number; active: number }) {
  let [steps, setSteps] = useState<any[]>([]);

  useEffect(() => {
    let _steps = [];

    for (let i = 0; i < count; i++) {
      _steps.push(
        <Step
          key={i}
          isActive={i === active}
          isLast={i === count - 1}
          isFilled={i < active}
        />,
      );
    }

    setSteps(_steps);
  }, []);
  return (
    <Flex m="4" alignItems="center">
      {steps}
    </Flex>
  );
}

export default Stepper;

import { useEffect } from 'react';
import { useState } from 'react';
import { useLayoutEffect } from 'react';

export function Component() {
  const [test, setTest] = useState(0);
  const [test2, setTest2] = useState(0);

  useEffect(() => {
    if (test < 3) {
      setTest(test + 1);
    }
    return () => {
      // [!comment This is one line testing comment as example]
    };
  }, [test]);

  useLayoutEffect(() => {
    return () => {
      //
    };
  }, [test]);

  useEffect(() => {
    setTest2(1);
    return () => {
      // [!comment This is two line testing comment as example]
    };
  }, [test2, test]);

  useEffect(() => {
    setTest2(1);
    return () => {
      //
    };
  }, [test2]);

  return (
    <div id="effect" className="relative w-[200px] h-[70px]">
      <span className="react-logo">
        <span className="nucleo">{test}</span>
      </span>
    </div>
  );
}

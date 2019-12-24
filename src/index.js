import React, { useState, useEffect, useRef } from "react";

const BlocBuilder = ({ initialValue, subject, builder }) => {
  const [snapshot, setSnapshot] = useState({
    data: null,
    connectionState: -1,
    error: null
  });
  const subscription = useRef(null);

  useEffect(() => {
    if (initialValue != null && snapshot.connectionState === -1) {
      setSnapshot({
        data: initialValue,
        connectionState: -1,
        error: null
      });
    }

    subscription.current = subject.subscribe(
      data =>
        setSnapshot({
          data,
          connectionState: 0,
          error: null
        }),
      error =>
        setSnapshot({
          error,
          data: null,
          connectionState: 1
        }),
      () =>
        setSnapshot({
          data: null,
          connectionState: 1,
          error: null
        })
    );

    return () => subscription.current.unsubscribe();
  }, []);

  return builder(snapshot);
};

export default BlocBuilder;

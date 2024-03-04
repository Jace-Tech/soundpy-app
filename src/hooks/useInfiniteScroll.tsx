import { useState, useEffect } from 'react';

const useInfiniteScroll = (fetchMore: () => void) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        isFetching
      )
        return;
      setIsFetching(true);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching]);

  useEffect(() => {
    if (!isFetching) return;

    fetchMore();

    setIsFetching(false);
  }, [isFetching, fetchMore]);

  return [isFetching, setIsFetching] as const;
};

export default useInfiniteScroll;

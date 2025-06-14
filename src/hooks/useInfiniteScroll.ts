
import { useState, useEffect, useCallback } from 'react';

interface UseInfiniteScrollProps {
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

export const useInfiniteScroll = ({
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}: UseInfiniteScrollProps) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreData();
  }, [isFetching]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
    if (hasNextPage && !isFetchingNextPage) {
      setIsFetching(true);
    }
  };

  const fetchMoreData = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
    setIsFetching(false);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return { isFetching };
};

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext, useSearchParams } from 'react-router';
import asyncReceiveUsersAndThreads from '../states/shared/action';
import NewThreadForm from '../components/NewThreadForm';
import CategoriesFilter from '../components/CategoriesFilter';
import ThreadList from '../components/ThreadList';

function HomePage() {
  const { columnCount } = useOutletContext();
  const threads = useSelector((state) => state.threads) ?? [];
  const users = useSelector((state) => state.users) ?? [];
  const dispatch = useDispatch();

  const categories = threads.reduce((result, thread) => (
    result.includes(thread.category)
      ? result
      : [thread.category, ...result]), []);

  useEffect(() => {
    dispatch(asyncReceiveUsersAndThreads());
  }, [dispatch]);

  // Filter by selected category

  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');

  return (
    <main className="pr-2 flex-1 flex flex-col gap-2 overflow-y-scroll">
      <NewThreadForm categories={categories} />
      <CategoriesFilter categories={categories} />
      <ThreadList
        users={users}
        threads={selectedCategory
          ? threads.filter((thread) => thread.category === selectedCategory)
          : threads}
        columnCount={columnCount}
      />
    </main>
  );
}

export default HomePage;

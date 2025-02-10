'use client'
import React, { useState, useEffect } from 'react';
import { Dog, getDogs, searchDogs } from '@/provider/dogs';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SearchPagination from '@/components/search-pagination';
import SearchFiltering from '@/components/search-filtering';
import { Toggle } from '@/components/ui/toggle';
import { HeartIcon } from 'lucide-react';
import { useSearchFilters } from '@/hooks/useSearchFilters';
import { useShallow } from 'zustand/react/shallow'
import { useDogMatch } from '@/hooks/useDogMatch';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { matches, addMatch, removeMatch } = useDogMatch();

  const { selectedBreeds, sortBy, sortOrder } = useSearchFilters(
    useShallow((state) => ({ selectedBreeds: state.selectedBreeds, sortBy: state.sortBy, sortOrder: state.sortOrder })),
  )

  useEffect(() => {
    const fetchDogs = async () => {
      const params = {
        breeds: selectedBreeds.length ? selectedBreeds : undefined,
        size: itemsPerPage,
        from: (page - 1) * itemsPerPage,
        sort: `${sortBy}:${sortOrder}`,
      };
      const result = await searchDogs(params);
      const dogs = await getDogs(result.resultIds);
      setDogs(dogs);
      setTotal(result.total);
    };

    fetchDogs();
  }, [selectedBreeds, page, sortBy, sortOrder]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Dog Search</h1>
      <div className="flex flex-wrap gap-4 items-end justify-between mb-4">
        <SearchFiltering />
        <Button disabled={!matches.length}>Match me!</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dogs.map((dog, index) => (
          <Card key={index} className='overflow-hidden'>
            <Button variant="ghost" size="icon" className='absolute m-2' onClick={() => matches.includes(dog.id) ? removeMatch(dog.id) : addMatch(dog.id)}>
              {matches.includes(dog.id) ? <HeartIcon fill="white" /> : <HeartIcon />}
            </Button>
            <img className="min-w-full max-h-[250px] object-cover" src={dog.img} alt={dog.name} />
            <CardHeader>
              <CardTitle>{dog.name}</CardTitle>
              <CardDescription>{dog.breed}, {dog.age}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <SearchPagination currentPage={page} totalPages={Math.ceil(total / itemsPerPage)} onPageChange={setPage} />
      </div>
    </div>
  );
}

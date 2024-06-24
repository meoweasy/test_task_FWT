import axios from 'axios';

export interface Painting {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
}

export interface Author {
  id: number;
  name: string;
}

export interface Location {
  id: number;
  location: string;
}

export async function fetchPaintings(
  page: number,
  limit: number,
  searchQuery?: string,
): Promise<Painting[]> {
  const params: any = {
    _page: page,
    _limit: limit,
  };

  if (searchQuery) {
    params.q = searchQuery;
  }

  const response = await axios.get(
    'https://test-front.framework.team/paintings',
    {
      params,
    },
  );
  return response.data;
}

export async function fetchPaintingsAll(): Promise<Painting[]> {
  return (await axios.get('https://test-front.framework.team/paintings')).data;
}

export async function fetchAuthors(): Promise<Author[]> {
  return (await axios.get('https://test-front.framework.team/authors')).data;
}

export async function fetchLocations(): Promise<Location[]> {
  return (await axios.get('https://test-front.framework.team/locations')).data;
}

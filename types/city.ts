// src/types/city.ts
// Matches the shape returned by GET /api/locations/cities/

export interface City {
    id: number;
    name: string;
    state: number;
    state_name: string;
    country_name: string;
    city_image: string; // absolute URL
  }
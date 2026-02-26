// lib/sanity.client.ts
// Sanity Client Configuration

import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN, // For server-side writes
});

// GROQ Queries for apartments
export const apartmentQueries = {
  // Get all active apartments
  getAllActive: `*[_type == "apartment" && isActive == true && !(_id in path("drafts.**"))] | order(featured desc, name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    "image": gallery[0].asset->url,
    "images": gallery[].asset->url,
    location,
    capacity,
    size,
    bedrooms,
    bathrooms,
    basePrice,
    "features": features[],
    minimumStay,
    maximumStay,
    isActive,
    featured
  }`,

  // Get single apartment by slug
  getBySlug: `*[_type == "apartment" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    "image": gallery[0].asset->url,
    "images": gallery[].asset->url,
    location,
    capacity,
    size,
    bedrooms,
    bathrooms,
    basePrice,
    "features": features[],
    minimumStay,
    maximumStay,
    isActive,
    featured
  }`,

  // Get apartment by Sanity ID
  getById: `*[_type == "apartment" && _id == $id && !(_id in path("drafts.**"))][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    "image": gallery[0].asset->url,
    "images": gallery[].asset->url,
    location,
    capacity,
    size,
    bedrooms,
    bathrooms,
    basePrice,
    "features": features[],
    minimumStay,
    maximumStay,
    isActive,
    featured
  }`,
};

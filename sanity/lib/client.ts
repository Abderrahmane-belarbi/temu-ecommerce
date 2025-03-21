import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'
import { sanityFetch } from './live';
import { Product, ProductCategory } from '@/sanity.types';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export async function getAllProduct() {
  const query = `*[_type == "product"]`;
  const products = await sanityFetch({query});
  return products.data as Product[];
}  


export async function getProductById(id: string) {
  const query = `*[_type == "product" && _id == $id][0]`;
  const product = await sanityFetch({ query, params: {id} });
  return product.data as Product;
}

export const getAllCategories = async () => {
  const query = `*[_type == "productCategory"]`
  const categories = await sanityFetch({ query: query })
  return categories.data as ProductCategory[];
}  

export async function getCategoryBySlug(slug: string) {
  const query = '*[_type == "productCategory" && slug.current == $slug][0]';
  const category = await sanityFetch({ query, params: {slug} });
  return category.data as ProductCategory;
}  

export async function getProductByCategorySlug(slug: string) {
  const query = '*[_type == "product" && references(*[_type == "productCategory" && slug.current == $slug][0]._id)]'
  const products = await sanityFetch({query, params: { slug}});
  return products.data as Product[];
}  
export async function searchProducts(search: string) {
  const query = `*[_type == "product" && (
    title match "*" + $search + "*" ||
    description match "*" + $search + "*" ||
    category->title match "*" + $search + "*" ||
    category->slug.current match "*" + $search + "*"
  )]`;
  const products = await sanityFetch({ query, params: { search } });
  return products.data as Product[];
}

import { MovieNs } from './MovieType'

export interface CategoryType {
   id: number
   title: string
   slug: string
   picture: string
   movie: MovieNs.MovieType[]
   order: number
   meta_title: string | null
   meta_description: string | null
}

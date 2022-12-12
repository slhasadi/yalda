import { CategoryType } from './CategoryType'

export namespace MovieNs {
   export interface LabelType {
      label: string
   }

   export interface MovieType {
      id: number
      slug: string
      pictures: []
      labels: LabelType[]
      category: CategoryType[]
      bookmark_status: boolean
      type: string
      created_at: string
      cover: string
      title: string
      eng_title: string
      description: string
      imdb_rating: number
      rating_ave: number
      language: string
      is_HD: boolean
      is_free: boolean
      visible: boolean
      cast: []
      country: string
      age_limit: string
      year: string
      trailers: []
      videos: []
   }
}

import { CategoryType } from './CategoryType'
import { VttType } from './VttType'
import { GalleryPictureType } from './GalleryPictureType'

export interface VideoLink {
   pk: number
   order: number
   video: {
      id: number
      season: number
      order: number
      title: string
      thumb: string
      other_link: string
      url: string
      hls_url: string
      vtt_link: VttType
   }
   movie: {
      id: number
      slug: string
      title: string
      type: string
      rating_ave?: any
      year: string
   }
}
export interface VideoType {
   length: number
   id: number
   title: string
   eng_title: string
   pictures: []
   cover: string
   caption: string
   description: string
   category: CategoryType[]
   duration: number
   imdb_rating: number
   comment_count: number
   age_limit: string
   country: string
   year: string
   trailers: VideoLink[]
   labels: { label: string }[]
   rating_ave: number
   rating_percent: string
   rating_quality: string
   is_HD: boolean
   type: string
   is_free: boolean
   bookmark_status: boolean
   season_count: number
   videos: VideoLink[]
   url: string
   slug: string
   cast: { id: number; info: string; role: { role: string; slug: string } }[]
   gallery: { id: number; title: string; picture: GalleryPictureType[] }
}

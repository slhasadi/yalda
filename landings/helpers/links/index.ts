export const BASE_PATH_NEWS_PAGE = '/news'

export const getSingleNewsHref = (slug: string) => {
    return `${BASE_PATH_NEWS_PAGE}/${slug}`
}
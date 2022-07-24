import useSWRInfinite from 'swr/infinite'
import fetcher from '../libs/fetch'

const baseUrl = "https://jsonplaceholder.typicode.com/posts"
const PAGE_LIMIT = 5

export const useInfinitePosts = (pageSize = PAGE_LIMIT) => {

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null // reached the end
    return `${baseUrl}?_page=${pageIndex + 1}&_limit=${pageSize}`;
  }

  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    fetcher,
    {
      refreshInterval: 0,
      revalidateOnFocus: true,
      revalidateOnReconnect: false,
      revalidateFirstPage: false
    }
  )

  const posts = data ? [].concat(...data) : []
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined")
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_LIMIT)

  const isRefreshing = isValidating && data && data.length === size

  return { posts, error, isLoadingMore, size, setSize, isReachingEnd, isRefreshing }
}
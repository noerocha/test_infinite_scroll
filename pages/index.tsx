
import { useRef, useEffect } from 'react'
import useOnScreen from '../hooks/useOnScreen'
import { useInfinitePosts } from '../hooks/useInfinitePosts';

export default function App() {
  const ref = useRef()
  const mounted = useRef(false);
  const isVisible = useOnScreen(ref)

  const {
    posts: issues,
    error,
    isLoadingMore,
    size,
    setSize,
    isReachingEnd,
    isRefreshing
  } = useInfinitePosts(10)


  useEffect(() => {
    if (isVisible && !isReachingEnd && !isRefreshing) {
      setSize(size + 1)
    }
  }, [isVisible, isRefreshing])

  if (error) return <h1>Something went wrong!</h1>
  if (!issues) return <h1>Loading...</h1>

  return (
    <div className='max-w-7xl bg-slate-400 mx-auto flex flex-col'>
      <header className='bg-indigo-200 w-full max-w-7xl flex flex-col fixed top-0 z-10 h-24'>
        <p>Header</p>
        {size}
      </header>

      <div className='mt-24'>
        <div className="hidden md:block">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 relative">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-24">
              <tr>
                <th scope="col" className="py-3 px-6">
                  ID
                </th>
                <th scope="col" className="py-3 px-6">
                  UserId
                </th>
                <th scope="col" className="py-3 px-6">
                  Title
                </th>
                <th scope="col" className="py-3 px-6">
                  Body
                </th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => {
                return (
                  <tr key={issue.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {issue.id}
                    </th>
                    <td className="py-4 px-6">
                      {issue.userId}
                    </td>
                    <td className="py-4 px-6">
                      {issue.title}
                    </td>
                    <td className="py-4 px-6">
                      {issue.body}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:hidden gap-2 mt-2'>
          {issues.map((issue) => {
            return (

              <div key={issue.id} className="bg-white shadow flex flex-col items-start mx-2 rounded-lg">
                <p className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                  # {issue.id}, by user id {issue.userId}
                </p>
                <p className="py-0 px-6 text-gray-900 break-words italic font-semibold text-sm">{issue.title}</p>
                <p className="py-2 px-6 text-gray-900 break-words">{issue.body}</p>
              </div>
            )
          })}
        </div>

        {/* <button
          className='px-2 py-3 bg-indigo-400 hover:bg-indigo-500 text-white'
          disabled={isLoadingMore || isReachingEnd}
          onClick={() => setSize(size + 1)}
        >
          {isLoadingMore
            ? "Loading..."
            : isReachingEnd
              ? "No more posts"
              : "Load more"}
        </button> */}

        <div ref={ref} className="bg-red-500">
          {isLoadingMore ? 'loading...' : isReachingEnd ? 'no more posts' : ''}
        </div>
      </div>


    </div>
  )
}
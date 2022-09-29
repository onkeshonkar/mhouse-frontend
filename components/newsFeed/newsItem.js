const NewsItem = ({ feed }) => {
  return (
    <div className="flex gap-10 items-center w-full bg-white rounded-md p-4">
      <div className="w-36 h-28 bg-slate-300 rounded-md"></div>

      <div className="w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold">{feed.title}</h2>

          <div className="flex items-center gap-5 mr-4">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>

            <span className="text-sm font-light self-end">16 m</span>
          </div>
        </div>

        <p className="text-sm font-light w-11/12 mt-2">{feed.content}</p>
      </div>
    </div>
  )
}

export default NewsItem

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Image from "next/image"

dayjs.extend(relativeTime)

const NewsItem = ({ news }) => {
  return (
    <div className="flex gap-10 items-center w-full bg-white rounded-md p-4">
      <div className="w-24 h-20 bg-slate-200 rounded-md">
        {news.mediaURL && (
          <Image
            src={news.mediaURL}
            alt="news_Media"
            width={96}
            height={80}
            objectFit="cover"
          />
        )}
      </div>

      <div className="w-full self-start">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold">{news.title}</h2>

          <div className="flex items-center gap-5 mr-4">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>

            <span className="text-sm font-light self-end">
              {dayjs(news.createdAt).fromNow()}
            </span>
          </div>
        </div>

        <p className="text-sm font-light w-11/12 mt-2">{news.text}</p>
      </div>
    </div>
  )
}

export default NewsItem

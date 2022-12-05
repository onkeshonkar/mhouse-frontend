import { useState } from "react"
import { Plus } from "../components/icons"
import AddNewsFeed from "../components/newsFeed/AddNewsFeed"
import NewsItem from "../components/newsFeed/newsItem"

const news = [
  {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vulputate odio id turpis ullamcorper, et efficitur velit elementum. Maecenas bibendum massa erat, non finibus risus lobortis vel. Vivamus sit amet urna ut purus blandit eleifend. Phasellus gravida lacus scelerisque mi condimentum, quis scelerisque ipsum consectetur. ",
    timestamp: "6 Min",
    thumbnail: "",
    url: "",
  },
]

const NewsFeed = () => {
  const [isAddNewsFeed, setIsAddNewsFeed] = useState(false)
  return (
    <>
      {isAddNewsFeed && <AddNewsFeed onClose={() => setIsAddNewsFeed(false)} />}
      <div className="mt-8 ml-6">
        <main>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-primary">Last News</h1>
              <span className="text-sm font-light text-primary">
                {news.length} Total
              </span>
            </div>

            <button
              onClick={() => setIsAddNewsFeed(true)}
              className="flex gap-2 items-center text-base text-white py-3 px-6 font-semibold bg-gradient-to-tr from-[#FF974A] to-[#FFBA42] rounded-xl "
            >
              <Plus width={15} height={15} />
              <span>New Announcement</span>
            </button>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            {news.map((newsItem, i) => (
              <NewsItem key={i} feed={newsItem} />
            ))}
          </div>
        </main>
      </div>
    </>
  )
}

export default NewsFeed

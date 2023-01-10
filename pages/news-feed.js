import { useState } from "react"
import useSWRImmutable from "swr/immutable"

import { Plus } from "../components/icons"
import AddNewsFeed from "../components/newsFeed/AddNewsFeed"
import NewsItem from "../components/newsFeed/NewsItem"
import Modal from "../components/ui/Modal"
import Spinner from "../components/ui/Spinner"
import { fetcher } from "../lib/axios"
import useUserStore from "../stores/useUserStore"

const NewsFeed = () => {
  const user = useUserStore((store) => store.user)
  const selectedBranch = useUserStore((store) => store.selectedBranch)
  const [isAddNewsFeed, setIsAddNewsFeed] = useState(false)

  const { data, error, isLoading, mutate } = useSWRImmutable(
    `/v1/branches/${selectedBranch.id}/announcements`,
    fetcher
  )

  if (error) {
    if (error.code === "ERR_NETWORK") {
      toast.error(error.message)
    } else {
      return (
        <div className="mt-10 text-center">{"Can't fetch Announcements"}</div>
      )
    }
  }

  if (!data)
    return (
      <div className="mt-10 text-center">
        <Spinner />
      </div>
    )

  const { announcements } = data

  return (
    <>
      <Modal open={isAddNewsFeed}>
        <AddNewsFeed onClose={() => setIsAddNewsFeed(false)} />
      </Modal>

      <div className="mt-8 ml-6">
        <main>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-primary">Last News</h1>
              <span className="text-sm font-light text-primary">
                {announcements.length} Total
              </span>
            </div>

            {user.type == "OWNER" && (
              <button
                onClick={() => setIsAddNewsFeed(true)}
                className="flex gap-2 items-center text-base text-white py-3 px-6 font-semibold bg-gradient-to-tr from-[#FF974A] to-[#FFBA42] rounded-xl "
              >
                <Plus width={15} height={15} />
                <span>New Announcement</span>
              </button>
            )}
          </div>

          <div className="flex flex-col gap-4 mt-6">
            {announcements.length ? (
              announcements.map((news) => (
                <NewsItem key={news.id} news={news} />
              ))
            ) : (
              <div className="mt-10 text-center">No Announcements</div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}

export default NewsFeed

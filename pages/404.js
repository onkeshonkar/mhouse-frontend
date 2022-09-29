import Link from "next/link"
import { Logo } from "../components/icons"

const ErrorPage = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="py-10">
        <Logo />
      </div>

      <div className="px-20 py-10 text-center ">
        <h1 className="text-base mb-4">404, page not found</h1>
        <Link href="/">
          <span className="text-accent cursor-pointer underline">Home</span>
        </Link>
      </div>
    </div>
  )
}

export default ErrorPage

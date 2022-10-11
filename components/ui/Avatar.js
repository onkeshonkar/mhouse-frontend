import Image from "next/image"

const Avatar = ({ user, width, height, className }) => {
  return (
    <>
      {user.avatar ? (
        <Image
          // src={user.avatar}
          src={
            "https://images.unsplash.com/photo-1522228115018-d838bcce5c3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
          }
          alt="avatar"
          width={width}
          height={height}
          objectFit="cover"
          className={`${className || "rounded-full"}`}
        />
      ) : (
        <span className="text-xl text-white flex p-0">
          {user.fullName?.charAt(0).toUpperCase()}
        </span>
      )}
    </>
  )
}

export default Avatar

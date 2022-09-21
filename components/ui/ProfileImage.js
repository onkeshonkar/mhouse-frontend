import Image from "next/image"

const ProfileImage = ({ user, width, height }) => {
  return (
    <>
      {user.avatar ? (
        <Image
          src={user.avatar}
          alt="avatar"
          width={width}
          height={height}
          objectFit="cover"
          className="rounded-full"
        />
      ) : (
        <span className="text-xl text-white flex p-0">
          {user.fullName?.charAt(0)}
        </span>
      )}
    </>
  )
}

export default ProfileImage

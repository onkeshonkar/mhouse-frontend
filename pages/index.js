import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import Logo from "../components/icons/Logo"
import useUserStore from "../stores/useUserStore"

export default function Home() {
  const user = useUserStore((store) => store.user)

  return (
    <div className="max-w-8xl pb-10">
      <Head>
        <title> mhouse | Manage the back house better</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="description" content="manage the backhouse better" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <header className="py-4 px-6 flex justify-between items-center sticky top-0 z-10 bg-white rounded-b-2xl shadow-bottom">
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>

        <div className="flex gap-6 items-center">
          <Link href="https://github.com/onkeshonkar/mhouse-frontend">
            <a className="text-accent hover:underline">Examples</a>
          </Link>

          {user ? (
            <Link href="/dashboard">
              <a className="bg-primary text-white px-7 py-2 rounded-md">
                Dashboard
              </a>
            </Link>
          ) : (
            <Link href="/auth/login">
              <a className="bg-primary text-white px-7 py-2 rounded-md">
                Login
              </a>
            </Link>
          )}
        </div>
      </header>

      <main className="flex flex-col w-full gap-24">
        <section className="relative mt-8 rounded-md overflow-clip">
          <Image src={"/restaurent.svg"} width={1200} height={400} alt="" />

          <div className="absolute inset-0 bg-slate-800 opacity-50" />

          <div className="absolute inset-0 flex items-center flex-col justify-end text-slate-100 pb-20">
            <h1 className="font-semibold text-5xl mb-5">
              Elevate your{" "}
              <span className="text-accent">restaurant&apos;s</span> efficiency
              with <span className="text-accent">ease</span>
            </h1>
            <p className="text-base max-w-2xl mt-5 font-light tracking-wide">
              From managing inventory and employee schedules, to tracking sales
              and tasks. User-friendly interface and powerful features, you can
              easily take control of your restaurant&apos;s success.
            </p>
          </div>
        </section>

        <section className="flex items-center justify-around bg-slate-200 rounded-md px-6 py-8 ">
          <div className="flex flex-col bg-slate-200 rounded-md px-6 py-8 ">
            <h2 className="text-4xl font-semibold mb-6">Key features</h2>
            <p className="text-slate-500 font-light max-w-md text-sm tracking-wide">
              Managing every aspect of the business, from workforce and employee
              schedules to tasks, menu, catering orders, and payment tracking.
            </p>
            <ul className="list-disc mt-4 ml-8 text-base text-blue-800">
              <li>workforce</li>
              <li>schedules</li>
              <li>tasks</li>
              <li>menu</li>
              <li>catering orders</li>
              <li>payment tracking</li>
              <li>RBAC system for controlling access and permissions</li>
              <li>Real-time notification to track every actions.</li>
            </ul>
          </div>

          <Image src={"/features.svg"} width={500} height={500} alt="" />
        </section>

        <section className="flex justify-between items-center gap-10">
          <div>
            <h2 className="text-4xl font-semibold">Inventory</h2>
            <p className="tracking-wide text-slate-500 mt-2 text-sm">
              Keep track of your stocks, suppliers and their order history.
              Update your stocktake in differnt branches with just one click.
            </p>
          </div>

          <div className="bg-slate-300 px-2 py-8 rounded-lg">
            <Image src={"/inventory.svg"} width={1200} height={400} alt="" />
          </div>
        </section>

        <section className="flex justify-between items-center gap-10">
          <div className="bg-slate-300 px-2 py-8 rounded-lg">
            <Image src={"/workforce.svg"} width={1200} height={400} alt="" />
          </div>
          <div>
            <h2 className="text-4xl font-semibold">Workforce</h2>
            <p className="tracking-wide text-slate-500 mt-2 text-sm">
              Manage employee&apos;s over different branches smoothly.
              User-friendly interface and powerful features make managing your
              workforce a breeze, so you can focus on growing your business.
            </p>
          </div>
        </section>

        <section className="flex justify-between items-center gap-10">
          <div>
            <h2 className="text-4xl font-semibold">Schedule</h2>
            <p className="tracking-wide text-slate-500 mt-2 text-sm">
              Organize and track team&apos;s shifts and availability. You can
              easily create and distribute schedules, track time off requests,
              and make changes on the fly.
            </p>
          </div>

          <div className="bg-slate-300 px-2 py-8 rounded-lg">
            <Image src={"/schedule.svg"} width={1200} height={400} alt="" />
          </div>
        </section>
      </main>
    </div>
  )
}

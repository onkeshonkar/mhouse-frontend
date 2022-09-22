import Layout from "../components/Layout"
import "../styles/globals.css"
import { Toaster } from "react-hot-toast"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Toaster />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp

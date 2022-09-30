import Layout from "../components/Layout"
import "../styles/globals.css"
import { Toaster } from "react-hot-toast"
import useSWR, { SWRConfig } from "swr"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SWRConfig
        value={{
          onError: (error) => {
            if (error.code == "ERR_NETWORK") {
              return console.log("hello")
            }
          },
        }}
      >
        <Toaster />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </>
  )
}

export default MyApp

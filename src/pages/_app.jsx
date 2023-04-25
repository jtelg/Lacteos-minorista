import "../../styles/globals.css";
import Header from "../components/Header/header";
import Session from "../components/client/utils/useSession";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { wrapper } from "../redux/store";

function MyApp({ Component, pageProps }) {
  pageProps.phone = "54 9 353 6 570 880";
  pageProps.appName = "Lacteos Premium SA";
  pageProps.addres = "Bv Carcano 469";
  return (
    <Session comp={Component}>
      <Header></Header>
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-center"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="colored"
        draggable
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </Session>
  );
}

export default wrapper.withRedux(MyApp);

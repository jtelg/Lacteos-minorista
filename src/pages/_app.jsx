import "../../styles/globals.css";
import Header from "../components/Header/header";
import { wrapper } from "../redux/store";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header></Header>
      <Component {...pageProps} />;
    </>
  );
}

export default wrapper.withRedux(MyApp);

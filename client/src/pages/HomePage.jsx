import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import PostofMonth from "../components/postOfMonth/PostofMonth";
import Suggest from "../components/suggest/Suggest";

const HomePage = () => {
  return (
    <div>
      <Header />
      <section className="main">
        <PostofMonth />
        <Suggest />
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;

import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Suggest from "../components/suggest/Suggest";

const HomePage = () => {
  return (
    <div>
      <Header />
      <section className="main">
        <Suggest />
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;

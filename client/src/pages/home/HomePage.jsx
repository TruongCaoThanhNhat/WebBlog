import FormSend from "../../components/author/FormSend";
import ListWritter from "../../components/author/ListWritter";
import OddPost from "../../components/author/OddPost";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import ListPostOMonth from "../../components/postOfMonth/ListPostOMonth";
import ListSuggest from "../../components/suggest/ListSuggest";
import "./home.scss";

const HomePage = () => {
  return (
    <div className="container-fluid">
      <Header />
      <section className="main">
        <ListPostOMonth />
        <div className="d-flex">
          <div className="flex-grow-1">
            <ListSuggest />
          </div>
          <div className="flex-grow-1">
            <ListWritter />
            <OddPost />
            <FormSend />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;

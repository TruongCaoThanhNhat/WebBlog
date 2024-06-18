import ListPostOMonth from "@/components/postOfMonth/ListPostOMonth";
import FormSend from "../../components/author/FormSend";
import ListWritter from "../../components/author/ListWritter";
import OddPost from "../../components/author/OddPost";
import ListSuggest from "../../components/suggest/ListSuggest";
import "./home.scss";

const HomePage = () => {
  return (
    <div className="container-fluid">

      <section className="main">
        <ListPostOMonth />
        <div className="content row container-xl">
          <div className="col-lg-8 content-left flex-grow-1">
            <ListSuggest />
          </div>
          <div className="col-lg-4 content-right flex-grow-1 none">
            <div className="row">
              <div className="col">
                <ListWritter />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <OddPost />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <FormSend />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

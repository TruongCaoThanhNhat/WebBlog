import Writter from "./Writter";
import "./writter.scss";
const ListWritter = () => {
  return (
    <div className="writter">
      <div className="writter__wrapper">
        <div className="writter__top">
            <div className="writter__top-title d-flex justify-content-between align-items-center">
                <h2>Người viết nổi bật</h2>
                <div>New</div>
                <a href="">Xem thêm</a>
            </div>
        </div>
        <div className="writter__bot">
          <div className="row writter__list">
            <div className="col">
              <div className="writter__list-item ">
                <Writter />
              </div>
            </div>
            <div className="col">
              <div className="writter__list-item ">
                <Writter />
              </div>
            </div>
            <div className="col">
              <div className="writter__list-item ">
                <Writter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListWritter;

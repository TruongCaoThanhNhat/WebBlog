import "./suggest.scss";
import Suggest from "./Suggest";
const ListSuggest = () => {
  return (
    <section className="suggest container-xxl">
      <div className="suggest__wrapper">
        <div className="d-inline-flex justify-content-between">
          <h3 className="title">ĐỪNG BỎ LỠ</h3>
          <h3 className="mb-4">ĐỪNG BỎ LỠ</h3>
          <h3 className="mb-4">ĐỪNG BỎ LỠ</h3>
        </div>
      </div>
      <div className="suggest__main">
        <div className="row-cols-1">
          <div className="col">
            <Suggest></Suggest>
          </div>
          <div className="col">
            <Suggest></Suggest>
          </div>
          <div className="col">
            <Suggest></Suggest>
          </div>
          </div>
      </div>
    </section>
  );
};

export default ListSuggest;

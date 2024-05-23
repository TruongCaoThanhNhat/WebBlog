import "./suggest.scss";
import Suggest from "./Suggest";
const ListSuggest = () => {
  return (
    <section className="suggest container">
      <div className="suggest__wrapper">
        <div className="d-inline-flex justify-content-between">
          <h3 className="title">ĐỪNG BỎ LỠ</h3>
          <h3 className="mb-4">ĐỪNG BỎ LỠ</h3>
          <h3 className="mb-4">ĐỪNG BỎ LỠ</h3>
        </div>
      </div>
      <div className="suggest__main">
        <div className="grid">
          <div className="row">
            <div className="col">
              <div className="gird">
                <div className="rowc">
                  <div className="colc">
                    <Suggest></Suggest>
                    <Suggest></Suggest>
                    <Suggest></Suggest>
                    <Suggest></Suggest>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListSuggest;

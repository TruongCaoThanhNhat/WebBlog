import { useEffect, useState } from "react";
import Writter from "./Writter";
import "./writter.scss"
import { apiGetHotAuthor } from "@/api/api";
const ListWritter = () => {
  const [writters, setWritters] = useState([]);

  useEffect(() => {
    const fetchWritters = async () => {
      const data = await apiGetHotAuthor();
      // console.log("author",data.data);
      if (data) {
        setWritters(data.data);
      }
    };

    fetchWritters();
  }, []);
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
            {writters &&
              writters.slice(3).map((writter, index) => (
                <div className="col" key={index}>
                  <div className="writter__list-item ">
                    <Writter writter={writter} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListWritter;

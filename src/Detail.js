import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// import { useHistory } from "react-router-dom";

export default function Detail(props) {
  // let history = useHistory();
  let [active, setActive] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setActive(false);
    }, 2000);
  }, []);

  let { id } = useParams();
  let found = props.shoes.find(function (itemn) {
    return itemn.id == id;
  });

  return (
    <div>
      {active && <div>재고가 얼마 남지 않았습니다</div>}
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img
              src="https://codingapple1.github.io/shop/shoes1.jpg"
              width="100%"
              alt="신발사진"
            />
          </div>
          <div className="col-md-6 mt-4">
            <h4 className="pt-5">{found.title}</h4>
            <p>{found.content}</p>
            <p>{found.price}</p>
            <button className="btn btn-danger">주문하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

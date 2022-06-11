import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Range } from "./Shop2";
// import { useHistory } from "react-router-dom";

export default function Detail(props) {
  // let history = useHistory();
  let [active, setActive] = useState(true);
  let stock = useContext(Range);
  let c = useEffect(() => {
    setTimeout(() => {
      setActive(false);
    }, 2000);
    return () => clearTimeout(c);
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
            <Left stock={props.stock} />
            <button
              className="btn btn-danger"
              onClick={() => {
                {
                  props.setStock([9, 10, 11]);
                }
              }}
            >
              주문하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Left(props) {
  return <p>재고 : {props.stock[0]} </p>;
}

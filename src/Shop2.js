import React, { useState, useEffect, useContext, lazy, Suspense } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import "./Shop2.css";
import data from "./data";
import { Link, Route, Switch, Routes } from "react-router-dom";
import Detail from "./Detail";
import axios from "axios";
import Cart2 from "./Cart2";
// let Detail = lazy(() => {
//   import("./Detail");
// });

export let Range = React.createContext();

export default function Shop2() {
  let [stock, setStock] = useState([10, 11, 12]);
  let [shoes, setShoes] = useState(data);
  let [count, setCount] = useState(1);
  const add = () => {
    setCount(count + 1);
  };

  const minus = () => {
    if (count > 1) {
      setCount(count - 1);
    } else if ((count = 1)) alert("첫 페이지입니다");
  };

  return (
    <>
      <div>
        <button onClick={add}>더하기{count}</button>
        <button onClick={minus}>빼기{count}</button>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/detail">
                Detail
              </Nav.Link>
              <Nav.Link as={Link} to="/cart">
                Cart
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
      <Routes>
        <Route
          exact
          path="/"
          element={<Main shoes={shoes} setShoes={setShoes} stock={stock} />}
        />
        <Route
          exact
          path="/detail/:id"
          element={<Detail shoes={shoes} stock={stock} setStock={setStock} />}
        />
        <Route path="/cart" element={<Cart2 />} />
      </Routes>
    </>
  );
}

function Main({ shoes, setShoes, stock }) {
  const [load, setLoad] = useState(false);
  const [count, setCount] = useState(2);
  return (
    <>
      <div className="background">
        <h1>20% Season Off</h1>
      </div>
      <div className="container">
        <Range.Provider value={stock}>
          <div className="row">
            {shoes.map((a, i) => {
              return <Item shoes={shoes[i]} i={i} key={i} />;
            })}
          </div>
        </Range.Provider>
        {load && <div>로딩중</div>}
        {/* <div className="row">
          {shoes.map((shoe) => {
            return <List shoe={shoe} />;
          })}
        </div> */}
        <button
          className="btn btn-primary"
          onClick={() => {
            if (count <= 3) {
              setLoad(true);
              axios
                .get(`https://codingapple1.github.io/shop/data${count}.json`)
                .then((res) => {
                  let copy = [...shoes, ...res.data];
                  setShoes(copy);
                  setLoad(false);
                })
                .catch(() => {
                  console.log("실패");
                });
              setCount(count + 1);
            } else {
              alert("더이상 상품이 없습니다");
            }
          }}
        >
          더보기
        </button>
      </div>
    </>
  );
}

function Item(props) {
  let stock = useContext(Range);
  return (
    <div className="col-md-4">
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        width="100%"
        alt="신발"
      />
      <h4>{props.shoes.title}</h4>
      <p>
        {props.shoes.content} & {props.shoes.price}
      </p>
      {stock[props.i]}
    </div>
  );
}

function List({ shoe }) {
  return (
    <div className="col-md-4">
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (shoe.id + 1) + ".jpg"
        }
        width="100%"
        alt="신발"
      />
      <h4>{shoe.title}</h4>
      <p>
        {shoe.content} & {shoe.price}
      </p>
    </div>
  );
}

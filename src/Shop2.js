import React, { useState, useEffect } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import "./Shop2.css";
import data from "./data";
import { Link, Route, Switch, Routes } from "react-router-dom";
import Detail from "./Detail";
import axios from "axios";

export default function Shop2() {
  let [shoes, setShoes] = useState(data);
  return (
    <>
      <div>
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
              <Nav.Link>Pricing</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
      <Routes>
        <Route exact path="/" element={<Main shoes={shoes} />} />
        <Route
          exact
          path="/detail/:id"
          element={<Detail shoes={shoes} setShoes={setShoes} />}
        />
      </Routes>

      {/* <Routes>
        <Route exact path="/"></Route>
        <Route path="/detail">
          <>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <img
                    src="https://codingapple1.github.io/shop/shoes1.jpg"
                    width="100%"
                  />
                </div>
                <div className="col-md-6 mt-4">
                  <h4 className="pt-5">상품명</h4>
                  <p>상품설명</p>
                  <p>120000원</p>
                  <button className="btn btn-danger">주문하기</button>
                </div>
              </div>
            </div>
          </>
        </Route>
      </Routes> */}
    </>
  );
}

function Main({ shoes }, setShoes) {
  return (
    <>
      <div className="background">
        <h1>20% Season Off</h1>
      </div>
      <div className="container">
        <div className="row">
          {shoes.map((a, i) => {
            return <Item shoes={shoes[i]} i={i} key={i} />;
          })}
        </div>
        {/* <div className="row">
          {shoes.map((shoe) => {
            return <List shoe={shoe} />;
          })}
        </div> */}
        <button
          className="btn btn-primary"
          onClick={() => {
            axios
              .get("https://codingapple1.github.io/shop/data2.json")
              .then((res) => {
                let copy = [...shoes, ...res.data];
                setShoes(copy);
              })
              .catch(() => {
                console.log("실패");
              });
          }}
        >
          더보기
        </button>
      </div>
    </>
  );
}

function Item(props) {
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

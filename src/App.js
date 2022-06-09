import React, { useState, useEffect, createContext, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Navbar, Container, Nav } from "react-bootstrap";
import data from "./data";
import styled from "styled-components";
import axios from "axios";
import Cart from "./Cart";
import { addItem } from "./Store";
import { useQuery } from "react-query";
import {
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  Outlet,
} from "react-router-dom";
import { useDispatch } from "react-redux";
//laxy(() => import (경로))
//suspense
//useMemo -> 실행시점의차이
//batch
//useTrnasition
let B = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg == "blue" ? "white" : "yellow")};
  padding: 10px;
`;

let Context1 = createContext();

function App() {
  let result = useQuery("G", () =>
    axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
      return a.data;
    })
  );

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [count, setCount] = useState(0);
  // axios.get("https://codingapple1.github.io/userdata.json");.then((a)=>a.data)
  let resultt = useQuery("Ho", () => {
    return axios
      .get("https://codingapple1.github.io/userdata.json")
      .then((a) => {
        console.log("요청됨");
        return a.data;
      });
    // {
    //   staleTime: 2000;
    // }
  });
  // resultt.data;
  // resultt.isLoading;
  // resultt.error;

  return (
    <>
      <div>
        {result.isLoading && "로딩중"}
        {result.error && "에러"}
        {result.data && result.data.name}
      </div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Link to="/">홈</Link> */}
            {/* <Link to="/detail">상세페이지</Link> */}
            <Nav.Link
              onClick={() => {
                navigate("./");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail/0");
              }}
            >
              Detail
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("./cart");
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
          <Nav className="me-auto">
            {resultt.isLoading && "로딩중"}
            {resultt.error && "에러남"}
            {resultt.data && resultt.data.name}
          </Nav>
        </Container>
      </Navbar>
      <B bg="blue">우르르</B>
      <B bg="violet">아르르</B>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div className="container">
                <div className="container">
                  <div className="row">
                    {shoes.map((a, i) => {
                      return <Card shoes={shoes[i]} key={i} i={i} />;
                    })}
                  </div>
                </div>
              </div>
              <button
                onClick={
                  () => {
                    setCount(count + 1);
                    if (count === 0) {
                      axios
                        .get("https://codingapple1.github.io/shop/data2.json")
                        .then((res) => {
                          let copy = [...shoes, ...res.data];
                          setShoes(copy);
                          // setCount(count + 1);
                          // console.log(res.data);
                        })
                        .catch(() => {
                          console.log("실패");
                        });
                    } else if (count === 1) {
                      axios
                        .get("https://codingapple1.github.io/shop/data3.json")
                        .then((result) => {
                          let copy3 = [...shoes, ...result.data];
                          setShoes(copy3);
                        })
                        .catch(() => {
                          console.log("실패");
                        });
                    } else if (count >= 2) {
                      alert("더이상상품이없습니다");
                    }
                  }
                  //   else if ((count = 2)) {
                  //     axios
                  //       .get("https://codingapple1.github.io/shop/data3.json")
                  //       .then((result) => {
                  //         let copy2 = [...shoes, ...result.data];
                  //         setShoes(copy2);
                  //         setCount(count + 1);
                  //         // console.log(res.data);
                  //       })
                  //       .catch(() => {
                  //         console.log("실패");
                  //       });
                  //   } else if (count >= 3) {
                  //     alert("더 이상 준비된 상품이 없습니다");
                  //   }
                  // }}
                }
              >
                버튼 {count}
              </button>
            </div>
          }
        />
        <Route
          path="/detail/:id"
          element={
            // <Context1.Provider value={{ 재고 }}>
            <Detail shoes={shoes} />
            // </Context1.Provider>
          }
        />
        <Route path="*" element={<div>404</div>} />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>에베베</div>} />
          <Route path="location" element={<div>우부부</div>} />
        </Route>
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
        </Route>
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

function Event() {
  return (
    <div>
      오늘의 이벤트
      <Outlet></Outlet>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>가나다</h4>
      <Outlet></Outlet>
    </div>
  );
}
function Detail(props) {
  useContext(Context1);
  console.log(Context1);
  let [active, setActive] = useState(true);
  let [input, setInput] = useState("");
  let dispatch = useDispatch();
  useEffect(() => {
    let saw = localStorage.getItem("watched");
    saw = JSON.parse(saw);
    saw.push(a.id);
    saw = new Set(saw);
    saw = Array.from(saw);
    localStorage.setItem("watched", JSON.stringify(saw));
  }, []);

  useEffect(() => {
    let a = setTimeout(() => {
      setActive(false);
    }, 2000);
    return () => {
      clearTimeout(a);
    };
  }, []);

  useEffect(() => {
    if (isNaN(input) == true) {
      alert("그러지마시오");
    }
  }, [input]);

  let [count, setCount] = useState(0);
  let { id } = useParams();
  let a = props.shoes.find((x) => x.id == id);
  let [tab, setTab] = useState(0);

  return (
    <div className="container">
      {active === true ? <div>2초 이내 구매 시 할인</div> : null}
      <input
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      {count}
      <button onClick={() => setCount(count + 1)}>버튼</button>
      <div className="row">
        <div className="col-md-6">
          <img src={a.img} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{a.title}</h4>
          <p>{a.content}</p>
          <p>{a.price}</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(addItem({ id: 1, name: "Red Knit", count: 1 }));
            }}
          >
            주문하기
          </button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              setTab(0);
            }}
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              setTab(1);
            }}
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              setTab(2);
            }}
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />
    </div>
  );
}

// function TabContent(props) {
//   if (props.tab === 0) {
//     return <div>a</div>;
//   }
//   if (props.tab === 1) {
//     return <div>b</div>;
//   }
//   if (props.tab === 2) {
//     return <div>c</div>;
//   }
// }

function TabContent({ tab }) {
  let [fade, setFade] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);
    return () => {
      setFade("");
    };
  }, [tab]);
  return (
    <div className={"start" + fade}>
      {[<div>a</div>, <div>b</div>, <div>c</div>][tab]}
    </div>
  );
  //== return [<div>a</div>,<div>B</div>, <div>c</div>][props.tab]
}
function Card(props) {
  return (
    <div className="col-md-4">
      <img
        src={"https://codingapple1.github.io/shop/shoes" + props.i + ".jpg"}
        width="80%"
        alt="신발이미지"
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  );
}

export default App;

const Tab = styled.div``;

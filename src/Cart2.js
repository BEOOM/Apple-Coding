import React from "react";
import Table from "react-bootstrap/Table";
import { connect } from "react-redux";

function Cart2() {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>상품</th>
          <th>수량</th>
          <th>가격</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default Cart2;

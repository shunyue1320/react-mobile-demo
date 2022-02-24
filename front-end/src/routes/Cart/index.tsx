import React from "react";
import { connect } from "react-redux";
import { InputNumber, Popconfirm, Table, Button, Row, Col } from "antd";

import NavHeader from "@/components/NavHeader";
import { Lesson } from "@/typings/lesson";
import { CartItem } from "@/typings/cart";
import actionCreators from "@/store/actionCreators/cart";
import { CombinedState } from "@/store/reducers";

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actionCreators;
type Props = StateProps & DispatchProps;

function Cart(props: Props) {
  const rowSelection = {
    selectedRowKeys: props.cart
      .filter((item: CartItem) => item.checked)
      .map((item: CartItem) => item.lesson.id),
    onChange(selectedRowKeys: string[]) {
      props.changeCheckedCartItems(selectedRowKeys);
    },
  };

  const columns = [
    {
      title: "商品",
      dataIndex: "lesson",
      render: (val: Lesson, row: CartItem) => (
        <>
          <p>{val.title}</p>
          <p>价格:{val.price}</p>
        </>
      ),
    },
    {
      title: "数量",
      dataIndex: "count",
      render: (val: number, row: CartItem) => (
        <InputNumber
          size={"small"}
          min={1}
          max={100}
          value={val}
          onChange={(value: number) => {
            props.changeCartItemCount(row.lesson.id, value);
          }}
        ></InputNumber>
      ),
    },
    {
      title: "操作",
      render: (val: number, row: CartItem) => (
        <Popconfirm
          title="是否确认删除"
          okText="是"
          cancelText="否"
          onConfirm={() => props.removeCartItem(row.lesson.id)}
        >
          <Button size="small" danger={true}>
            删除
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const totalCount = props.cart
    .filter((item: CartItem) => item.checked)
    .reduce((total: number, item: CartItem) => (total += item.count), 0);

  const totalPrice = props.cart
    .filter((item: CartItem) => item.checked)
    .reduce(
      (total: number, item: CartItem) =>
        (total +=
          item.count * parseFloat(item.lesson.price.replace(/[^0-9\.]/g, ""))),
      0
    );

  return (
    <>
      <NavHeader title="购物车" />
      <Table
        rowKey={(row: CartItem) => row.lesson.id}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={props.cart}
        pagination={false}
        size="small"
      />
      <Row style={{ padding: "5px" }}>
        <Col span={4}>
          <Button danger={true} size="small" onClick={props.clearCartItems}>
            清空
          </Button>
        </Col>
        <Col span={9}>你已经选择了{totalCount}件商品</Col>
        <Col span={7}>总价{totalPrice}元</Col>
        <Col span={4}>
          <Button danger={true} onClick={props.settle}>
            结算
          </Button>
        </Col>
      </Row>
    </>
  );
}

const mapStateToProps = (state: CombinedState): CombinedState => state;
export default connect(mapStateToProps, actionCreators)(Cart);

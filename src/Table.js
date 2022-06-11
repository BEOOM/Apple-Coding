import React, { useState } from "react";
import { useTable, usePagination } from "react-table";
import styled from "styled-components";
import Modal from "../pages/MemberList/Modal";

function Table({ columns, data, initialState, openModal, open, closeModal }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState,
    },
    usePagination
  );

  const [isActive, setIsActive] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState([]);
  const closeBtn = () => {
    setIsActive(false);
  };

  const getSelectedRowValues = (selectedRow) => {
    setSelectedRowData({ ...selectedRow.values });
    console.log({ ...selectedRow.values });
    setIsActive(true);
  };

  return (
    <Page>
      <TableContainer style={{ width: isActive ? "800px" : "100%" }}>
        <Wrapper {...getTableProps()}>
          <Head>
            {headerGroups.map((headerGroup) => (
              <Row {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <SmallHead {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </SmallHead>
                ))}
              </Row>
            ))}
          </Head>
          <Body {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <Row
                  {...row.getRowProps()}
                  onClick={() => getSelectedRowValues(row)}
                >
                  {row.cells.map((cell) => {
                    return (
                      <Data {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </Data>
                    );
                  })}
                </Row>
              );
            })}
          </Body>
        </Wrapper>
        <PaginationContainer>
          <PaginationBtn
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </PaginationBtn>
          <PaginationBtn
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {"<"}
          </PaginationBtn>
          <PageNumber>현재페이지 {pageIndex + 1}</PageNumber>
          <PaginationBtn onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </PaginationBtn>
          <PaginationBtn
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </PaginationBtn>
          <PageSelect
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30].map((pageSize) => (
              <PageSelectOption key={pageSize} value={pageSize}>
                {pageSize}개씩 보기
              </PageSelectOption>
            ))}
          </PageSelect>
        </PaginationContainer>
      </TableContainer>
      {open && openModal && (
        <>
          <ModalBackground />
          <Modal
            content={selectedRowData.reportcontent}
            date={selectedRowData.reportdate}
            by={selectedRowData.reportedby}
            closeModal={closeModal}
          />
        </>
      )}
      {isActive && (
        <ClickResult>
          <CloseDetail onClick={closeBtn}>X</CloseDetail>
          <NameContainer>
            <SelectedName>{selectedRowData.name}</SelectedName>
            <ReviseButton>수정</ReviseButton>
          </NameContainer>
          <ProfileInfoContainer>
            <ProfileInfo>프로필정보</ProfileInfo>
            <ProfileImgContainer>
              <ProfileImgTitle>프로필사진</ProfileImgTitle>
              <ProfileImgList>
                {selectedRowData.userimage_set.map((image) => (
                  <ProfileImg src={image.url} />
                ))}
                {/* <ProfileImg src={selectedRowData.image} /> */}
              </ProfileImgList>
            </ProfileImgContainer>
            <ProfileImgContainer>
              <ProfileImgTitle>카메라인증</ProfileImgTitle>
              <ProfileImgList>
                <ProfileImg src={selectedRowData.url} />
              </ProfileImgList>
            </ProfileImgContainer>
          </ProfileInfoContainer>
          <UserGeneralInfo>
            <UserGeneralInfoContainer>
              <UserGeneralInfoTitle>나이/성별</UserGeneralInfoTitle>
              <UserGeneralInfoDetail>
                {selectedRowData.age}/{selectedRowData.gender}
              </UserGeneralInfoDetail>
            </UserGeneralInfoContainer>
            <UserGeneralInfoContainer>
              <UserGeneralInfoTitle>휴대폰번호</UserGeneralInfoTitle>
              <UserGeneralInfoDetail>
                {selectedRowData.phone_number}
              </UserGeneralInfoDetail>
            </UserGeneralInfoContainer>
            <UserGeneralInfoContainer>
              <UserGeneralInfoTitle>관심사</UserGeneralInfoTitle>
              <UserGeneralInfoDetail>
                {selectedRowData.interests}
              </UserGeneralInfoDetail>
            </UserGeneralInfoContainer>
            <UserGeneralInfoContainer>
              <UserGeneralInfoTitle>지역</UserGeneralInfoTitle>
              <UserGeneralInfoDetail>
                {selectedRowData.region}
              </UserGeneralInfoDetail>
            </UserGeneralInfoContainer>
          </UserGeneralInfo>
          <UserExtraInfoContainer>
            <ProfileInfo>추가정보</ProfileInfo>
            <UserExtraInfo>
              <UserExtraInfoTitle>자기소개</UserExtraInfoTitle>
              <UserExtraInfoDetail>
                {selectedRowData.userprofile_set[0].introduce}
              </UserExtraInfoDetail>
            </UserExtraInfo>
            <UserExtraInfo>
              <UserExtraInfoTitle>종교</UserExtraInfoTitle>
              <UserExtraInfoDetail>
                {selectedRowData.userprofile_set[0].religion}
              </UserExtraInfoDetail>
            </UserExtraInfo>
            <UserExtraInfo>
              <UserExtraInfoTitle>음주량</UserExtraInfoTitle>
              <UserExtraInfoDetail>
                {selectedRowData.userprofile_set[0].drink_capacity}
              </UserExtraInfoDetail>
            </UserExtraInfo>
            <UserExtraInfo>
              <UserExtraInfoTitle>체형</UserExtraInfoTitle>
              <UserExtraInfoDetail>
                {selectedRowData.userprofile_set[0].physical}
              </UserExtraInfoDetail>
            </UserExtraInfo>
          </UserExtraInfoContainer>
          <UserInfoBottom>
            <UserStatusContainer>
              <UserStatusTitle>가입일</UserStatusTitle>
              <UserStatusDetail>{selectedRowData.created_at}</UserStatusDetail>
            </UserStatusContainer>
            <UserStatusContainer>
              <UserStatusTitle>최근 로그인</UserStatusTitle>
              <UserStatusDetail>{selectedRowData.recentLogin}</UserStatusDetail>
            </UserStatusContainer>
            <UserStatusContainer>
              <UserStatusTitle>이용상태</UserStatusTitle>
              <UserStatusDetail>{selectedRowData.status}</UserStatusDetail>
            </UserStatusContainer>
          </UserInfoBottom>
          <UserSubscriptionInfo>
            <SubscriptionContainer>
              <SubscriptionTitle>채팅구독</SubscriptionTitle>
              <SubscriptionStatus>구독중</SubscriptionStatus>
              <ReviseButton>수정</ReviseButton>
            </SubscriptionContainer>
            <SubscriptionContainer>
              <SubscriptionTitle>이용기간</SubscriptionTitle>
              <SubscriptionStatus>20230.03.02~2022.04.01</SubscriptionStatus>
            </SubscriptionContainer>
            <SubscriptionContainer>
              <SubscriptionTitle>결제 예정일</SubscriptionTitle>
              <SubscriptionStatus>2022.04.02</SubscriptionStatus>
            </SubscriptionContainer>
          </UserSubscriptionInfo>
        </ClickResult>
      )}
    </Page>
  );
}

export default Table;

const UserSubscriptionInfo = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #c4c4c4;
  padding: 20px 5px 20px 5px;
  width: 100%;
`;
const SubscriptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const SubscriptionTitle = styled.div`
  margin-right: 10px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  font-style: normal;
  color: #797979;
`;
const SubscriptionStatus = styled.div`
  position: absolute;
  margin-left: 100px;
  font-family: "Open Sans KR", sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
`;

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.8;
  z-index: 400;
  align-items: center;
  top: 0;
  left: 0;
  position: fixed;
`;

const PageSelectOption = styled.option``;
const PageSelect = styled.select``;
const PageNumber = styled.span``;
const PaginationContainer = styled.div`
  margin: 0 auto;
  margin-top: 20px;
`;
const PaginationBtn = styled.button``;

const CloseDetail = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  margin-left: auto;
  margin-bottom: 10px;
  margin-top: -10px;
`;

const Page = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const ProfileImgList = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 250px;
`;
const ProfileImgTitle = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  color: #797979;
  margin-right: 50px;
  width: 50px;
`;

const UserInfoBottom = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  border-bottom: 1px solid #e5e5e5;
`;
const UserStatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
`;
const UserStatusTitle = styled.div`
  margin-right: 10px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  color: #797979;
  font-style: normal;
  color: #797979;
`;
const UserStatusDetail = styled.div`
  position: absolute;
  margin-left: 100px;
  font-family: "Open Sans KR", sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
`;

const UserExtraInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 10px;
`;
const UserExtraInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
`;
const UserExtraInfoDetail = styled.div`
  position: absolute;
  margin-left: 100px;
  font-family: "Open Sans KR", sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
`;
const UserExtraInfoTitle = styled.div`
  margin-right: 10px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  color: #797979;
  font-style: normal;
  color: #797979;
`;

const UserGeneralInfoContainer = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 5px;
`;
const UserGeneralInfoTitle = styled.div`
  margin-right: 10px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 14.48px;
  color: #797979;
`;
const UserGeneralInfoDetail = styled.div`
  position: absolute;
  margin-left: 100px;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
`;

const UserGeneralInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 5px;
`;

const TableContainer = styled.div`
  margin-top: 30px;
  height: 550px;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Wrapper = styled.table`
  width: 100%;
  font-family: "Open Sans KR", sans-serif;
  height: 800px;
`;
const Head = styled.thead`
  margin-bottom: 10px;
  white-space: pre-line;
  pointer-events: none;
`;
const Body = styled.tbody`
  margin-top: 10px;
`;
const Row = styled.tr`
  &:hover {
    background-color: rgba(207, 238, 255, 0.6);
    cursor: pointer;
  }
`;
const SmallHead = styled.th`
  vertical-align: middle;
  height: 40px;
  border-top: 1px solid black;
  border-bottom: 0.5px solid black;
`;

const Data = styled.td`
  text-align: center;
  vertical-align: middle;
  height: 40px;
  padding: 10px 0;
  border-bottom: 0.5px solid #8d8d8d;
  :nth-child(1) {
    font-weight: bold;
  }
`;

const ClickResult = styled.div`
  width: 369px;
  position: sticky;
  top: 0;
  padding: 20px;
  border-top: 1px solid black;
  border-left: 0.5px solid #d8d8d8;
  border-right: 0.5px solid #d8d8d8;
  border-bottom: 0.5px solid #d8d8d8;
  background-color: #f0f0f0;
  margin-top: 30px;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: fit-content;
`;
const SelectedName = styled.div`
  font-size: 20px;
  font-weight: 600;
  line-height: 27.24px;
  font-family: "Open Sans KR", sans-serif;
`;
const ReviseButton = styled.button`
  background-color: #ff3131;
  color: white;
  border: none;
  border-radius: 5px;
  width: 52px;
  height: 20px;
  font-size: 10px;
`;
const ProfileInfoContainer = styled.div``;
const ProfileInfo = styled.div`
  font-family: "Open Sans KR", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  margin: 10px 0 10px 0;
`;
const ProfileImgContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;
const ProfileImg = styled.img`
  height: 67px;
  width: 67px;
  border-radius: 38px;
  margin: 0 5px 5px 3px;
`;

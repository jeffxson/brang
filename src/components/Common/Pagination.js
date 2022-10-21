import React from "react"
import { Flex, useColorModeValue } from "@chakra-ui/react"
import ReactPaginate from "react-paginate"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import styled from "@emotion/styled"

const PaginateWrapper = styled.div`
  .pagination-container {
    display: flex;
    align-items: center;
    list-style-type: none;
    border: 1px solid lightgray;
    border-radius: 2px;
    padding: 0;
  }

  .pagination-container:nth-of-type(2) {
    border-left: 1px solid lightgray;
  }
  .pagination-item {
    cursor: "pointer";
    text-align: center;
    margin: 0;
    border-right: 1px solid lightgray;

    border-top: 0px;
    border-bottom: 0px;
    padding: 5px 10px;
  }
  .prev-pagination-item {
    height: 100%;
    text-align: center;
    margin: 0;

    padding: 5px 10px;
  }
  .next-pagination-item {
    height: 100%;
    text-align: center;
    margin: 0;

    padding: 5px 10px;
  }
  .pagination-item:hover {
    background-color: #336cfb;
    color: #f3f3f3;
  }
  .prev-pagination-item:disabled {
    cursor: not-allowed;
  }
  .pagination-ellipsis {
    border-left: 1px solid gray;
  }
  .active {
    background-color: #336cfb;
    color: #f3f3f3;
  }
  .disabled {
    cursor: not-allowed;
    color: lightgray;
  }
`
function Pagination({ pageCount, handlePageClick }) {
  return (
    <Flex
      bg={useColorModeValue("lightMode.white", "darkMode.wBgColor")}
      py={5}
      w="full"
      alignItems="center"
      justifyContent="flex-end"
      borderRadius={"10px"}
    >
      <PaginateWrapper>
        <ReactPaginate
          containerClassName="pagination-container"
          breakLabel="..."
          pageClassName="pagination-item"
          pageLinkClassName="pagination-link"
          nextClassName="next-pagination-item"
          previousClassName="prev-pagination-item"
          breakClassName="pagination-item"
          breakLinkClassName="pagination-link"
          previousLabel={<MdChevronLeft />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          nextLabel={<MdChevronRight />}
          renderOnZeroPageCount={null}
          activeClassName="active"
          disabledClassName="disabled"
          nextLinkClassName="next-page-link"
          previousLinkClassName="prev-page-link"
        />
      </PaginateWrapper>
    </Flex>
  )
}

export default Pagination

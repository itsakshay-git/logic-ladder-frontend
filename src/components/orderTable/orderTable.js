import React, { useEffect, useRef, useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import Search from "../search/Search";
import "./orderTable.scss";
import axios from "axios";
import { Modal } from "../model/Model";

const Ordertable = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  // eslint-disable-next-line
  const [limit, setLimit] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();

  useEffect(() => {
    currentPage.current = 1;
    getPaginatedUsers();
    // eslint-disable-next-line
  }, []);

  function handlePageClick(e) {
    console.log(e);
    currentPage.current = e.selected + 1;
    getPaginatedUsers();
  }

  const getPaginatedUsers = async () => {
    const response = await axios.get(
      `https://logic-ladder-api.onrender.com/api/users/paginatedUsers?page=${currentPage.current}&limit=${limit}`
    );
    console.log(response);
    setPageCount(response.data.pageCount);
    setData(response.data.result);
  };

  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    setData(data.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setData([...data, newRow])
      : setData(
          data.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

  return (
    <div className="product-list">
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3 className="--color-primary">Orders</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
          </span>
        </div>
        <table>
          <thead>
            <tr>
              <th>orderId</th>
              <th>vendorName</th>
              <th>pickupDate</th>
              <th>status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.orderId.toLowerCase().includes(search) ||
                      item.vendorName.toLowerCase().includes(search) ||
                      item.pickupDate.toLowerCase().includes(search) ||
                      item.status.toLowerCase().includes(search);
              })
              .map((item, index) => {
                return (
                  <tr key={item.orderId}>
                    <td>{item.orderId}</td>
                    <td>{item.vendorName}</td>
                    <td>{item.pickupDate}</td>
                    <td>
                      <span className={`label label-${item.status}`}>
                      {item.status}
                      </span>
                    </td>
                    <td>
                      <span className="actions">
                        <BsFillPencilFill
                          className="edit-btn"
                          onClick={() => handleEditRow(index)}
                        />
                        <BsFillTrashFill
                          className="delete-btn"
                          onClick={() => handleDeleteRow(index)}
                        />
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && data[rowToEdit]}
        />
      )}
    </div>
  );
};

export default Ordertable;

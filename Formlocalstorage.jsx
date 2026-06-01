
import React, { useEffect, useState } from "react";

export default function FormTodo() {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    checkbox: false,
    Selection: "",
  });

  const [savedData, setSavedData] = useState([]);
  const [editData, seteditData] = useState(null);

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;

  function hadlechange(e) {
    const { name, value, type, checked } = e.target;

    setformData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handlesubmit(e) {
    e.preventDefault();

    let updatedData;

    if (editData !== null) {
      updatedData = [...savedData];
      updatedData[editData] = formData;
      seteditData(null);
    } else {
      updatedData = [...savedData, formData];
    }

    setSavedData(updatedData);
    localStorage.setItem("data", JSON.stringify(updatedData));

    setformData({
      name: "",
      email: "",
      password: "",
      phone: "",
      gender: "",
      checkbox: false,
      Selection: "",
    });

    alert(editData !== null ? "Data Updated" : "Form Submitted");
  }

  useEffect(() => {
    const localdata = JSON.parse(localStorage.getItem("data")) || [];
    setSavedData(localdata);
  }, []);

  function Delete(id) {
    const ans = savedData.filter((el, i) => i !== id);

    setSavedData(ans);
    localStorage.setItem("data", JSON.stringify(ans));
  }

  function Edit(id) {
    setformData(savedData[id]);
    seteditData(id);
  }


  const filteredData = savedData
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const currentRecords = filteredData.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(
    filteredData.length / recordsPerPage
  );

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">

        <h2 className="text-center mb-4">Registration Form</h2>

        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={hadlechange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={hadlechange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={hadlechange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Phone No</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={hadlechange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="me-3">Gender:</label>

            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={hadlechange}
              required
            />
            <label className="ms-1 me-3">Male</label>

            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={hadlechange}
            />
            <label className="ms-1">Female</label>
          </div>

          <div className="mb-3">
            <input
              type="checkbox"
              name="checkbox"
              checked={formData.checkbox}
              onChange={hadlechange}
              required
            />
            <label className="ms-2">
              Accept Terms & Conditions
            </label>
          </div>

          <div className="mb-3">
            <label>Select Course</label>

            <select
              name="Selection"
              className="form-select"
              value={formData.Selection}
              onChange={hadlechange}
              required
            >
              <option value="">Select Course</option>
              <option value="Web Development">
                Web Development
              </option>
              <option value="AI & ML">AI & ML</option>
              <option value="CyberSecurity">
                CyberSecurity
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            {editData !== null ? "Update" : "Submit"}
          </button>
        </form>

        <hr />

        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Search by Name"
              className="form-control"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="col-md-6">
            <button
              className="btn btn-warning"
              onClick={() =>
                setSortOrder(
                  sortOrder === "asc" ? "desc" : "asc"
                )
              }
            >
              Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
            </button>
          </div>
        </div>

        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Password</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentRecords.length > 0 ? (
              currentRecords.map((el, i) => (
                <tr key={i}>
                  <td>{el.name}</td>
                  <td>{el.password}</td>
                  <td>{el.email}</td>
                  <td>{el.phone}</td>
                  <td>{el.gender}</td>
                  <td>{el.Selection}</td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        Delete(firstIndex + i)
                      }
                    >
                      Delete
                    </button>

                    <button
                      className="btn btn-success btn-sm ms-2"
                      onClick={() =>
                        Edit(firstIndex + i)
                      }
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="text-center">
          <button
            className="btn btn-secondary me-2"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(currentPage - 1)
            }
          >
            Prev
          </button>

          <span>
            Page {currentPage} of{" "}
            {totalPages || 1}
          </span>

          <button
            className="btn btn-secondary ms-2"
            disabled={
              currentPage === totalPages ||
              totalPages === 0
            }
            onClick={() =>
              setCurrentPage(currentPage + 1)
            }
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
}
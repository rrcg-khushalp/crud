import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  async function handleDelete(id) {
    const response = await fetch(`https://crud-vic0.onrender.com/${id}`, {
      method: "DELETE",
    });

    const result1 = await response.json();
    if (!response.ok) {
      setError(result1.error);
    }
    if (response.ok) {
      console.log("deleted", response.ok);
      setError("Deleted Successfully");
      setTimeout(() => {
        setError("");
        getData();
      }, 1000);
    }
  }

  async function getData() {
    const response = await fetch("https://crud-vic0.onrender.com");
    const result = await response.json();
    console.log("result..", result);
    if (!response.ok) {
      setError(result.error);
    }

    if (response.ok) {
      setData(result);
      setError("");
    }
  }

  useEffect(() => {
    getData();
  }, []);
  const handleEditClick = (id) => {
    navigate(`/${id}`); // Redirect to edit page with the ID in the URL
  };

  return (
    <div className="container my-2">
      {error && <div className="alert alert-danger"> {error} </div>}
      <div className="row">
        <h1 className="text-center mt-2 mb-5">All Data</h1>
        {data?.map((ele) => (
          <div key={ele._id} className="col-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{ele.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                <p className="card-text">{ele.age}</p>
                <button className="btn btn-primary">
                  <span className="card-link" onClick={() => handleEditClick(ele._id)}>
                    Edit
                  </span>
                </button>
                <br /> <br />
                <button className="btn btn-primary">
                  <span className="card-link" onClick={() => handleDelete(ele._id)}>
                    Delete
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;

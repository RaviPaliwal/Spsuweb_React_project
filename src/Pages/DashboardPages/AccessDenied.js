import React from "react";
import { useNavigate } from "react-router-dom";

const AccessDenied = () => {
  const navigate = useNavigate();
  const goback = () => {
    navigate("/admin/login");
  };
  return (
    <div
      style={{ marginTop: "180px" }}
      className="container d-flex-row justify-content-center"
    >
      <h1 className="text-center shadow-lg">
        <span className="text-danger bg-blend-color-burn">4</span>04{" "}
        <span className="text-danger">E</span>rror
      </h1>
      <div className=" d-flex-row justify-content-center align-items-center g-3">
        <div className="mt-5 d-inline-block" onClick={goback}>
          <button type="button" className="btn btn-primary bg-sky-400">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;

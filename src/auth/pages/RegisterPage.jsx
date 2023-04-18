import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export const RegisterPage = () => {
  const navigate = useNavigate();
  return (
    <div className="card mx-4 mx-md-5 shadow-5-strong container-register text-light">
      <div className="card-body py-5 px-md-5">
        <div className="row d-flex justify-content-center">
          <div className="col-10">
            <h2 className="fw-bold mb-5">Sign up now</h2>
            <form>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <label className="form-label">
                      First name
                    </label>
                    <input
                      type="text"
                      placeholder="Martin"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <label className="form-label">Last name</label>
                    <input
                      type="text"
                      placeholder="Johnson"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="form-outline mb-4">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  placeholder="martinj@gmail.com"
                  className="form-control"
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" />
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                >
                  Sign up
                </button>

                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Do you have an account?{" "}
                  <a
                    onClick={() => {
                      navigate(-1);
                    }}
                    role="button"
                    className="link-danger"
                  >
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

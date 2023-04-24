import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { useAuthStore, useAuthVerification, useForm } from "../../hooks";
import Swal from "sweetalert2";

const initialFormFields = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

export const RegisterPage = () => {
  const navigate = useNavigate();

  const { startCreatingUser } = useAuthStore();
  const authVerification = useAuthVerification();
  const { name, email, password, passwordConfirm, onInputChange } =
    useForm(initialFormFields);

  const onSubmit = (event) => {
    event.preventDefault();
    if (password !== passwordConfirm) {
      Swal.fire("Error in password", "Password don't match", "error");
      return;
    }

    startCreatingUser({ name, email, password });
  };

  return (
    <div className="card mx-4 mx-md-5 shadow-5-strong container-register text-light">
      <div className="card-body py-5 px-md-5">
        <div className="row d-flex justify-content-center">
          <div className="col-10">
            <h2 className="fw-bold mb-5">Sign up now</h2>
            <form onSubmit={onSubmit}>
              <div className="form-outline mb-4">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  placeholder="Martin"
                  className="form-control"
                  name="name"
                  required
                  value={name}
                  onChange={onInputChange}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  placeholder="martinj@gmail.com"
                  className="form-control"
                  required
                  name="email"
                  value={email}
                  onChange={onInputChange}
                />
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-outline">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      required
                      name="password"
                      value={password}
                      onChange={onInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 ">
                  <div className="form-outline">
                    <label className="form-label">Confirm password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="passwordConfirm"
                      value={passwordConfirm}
                      onChange={onInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button className="btn btn-primary btn-block mb-4">
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

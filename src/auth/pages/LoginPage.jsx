import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { useAuthStore, useAuthVerification, useForm } from "../../hooks";
import { useEffect } from "react";
import Swal from "sweetalert2";

const initialFormFields = {
  email: '',
  password: '',
}
export const LoginPage = () => {
  const { startLogin } = useAuthStore();
  const authVerification = useAuthVerification();
  const navigate = useNavigate();
  const { email, password, onInputChange } = useForm( initialFormFields );

  const onSubmit = (event) => {
    event.preventDefault();
    startLogin({ email, password });
  } 



  return (
    <section className="d-flex justify-content-center align-items-center container-signIn text-light">
        <div className="row d-flex justify-content-evenly align-items-center container-login mx-sm-5 mx-3 py-5 px-5 px-md-0">
          <div className="col-md-6 col-lg-4 col-xl-4">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5  px-1 px-md-0">
            <form onSubmit={ onSubmit }>
              <div className="my-3 mt-5 mt-lg-0">
                <h3 className="fw-bold mb-0 me-3">Sign in</h3>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  required
                  name="email"
                  value={ email }
                  onChange={ onInputChange }
                />
              </div>

              <div className="form-outline mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  required
                  name="password"
                  value={ password }
                  onChange={ onInputChange }
                />
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  className="btn btn-primary btn-block mb-2"
                >
                  Log in
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <a onClick={() => { navigate('/auth/register') }} role="button" className="link-danger">
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
    </section>
  );
};

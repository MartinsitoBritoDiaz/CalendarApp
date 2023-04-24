import { useAuthStore } from "../../hooks/useAuthStore";

export const Navbar = () => {
  const { startLogOut, user } = useAuthStore();
  return (
    <nav className="navbar custom--navbar">
      <div className="container-fluid d-flex justify-content-between">
        <div>
          <a className="navbar-brand mt-2 mt-lg-0" href="#">
            <span className="fw-bold text-light">CalendarApp</span>
          </a>
        </div>

        <div className="d-flex align-items-center">
          <p className="navbar-brand me-3 mb-0 mr-0 text-light" >
            <span>Martinsito</span>
          </p>
          <button className="btn link-secondary me-3 text-light" onClick={ startLogOut }>
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

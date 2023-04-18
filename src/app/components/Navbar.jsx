export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-white custom--navbar" >
      <div className="container-fluid d-flex justify-content-between">
        <div>
          <a className="navbar-brand mt-2 mt-lg-0" href="#">
            <span className="fw-bold">CalendarApp</span>
          </a>
        </div>

        <div className="d-flex align-items-center">
          <a className="link-secondary me-3" href="#" role="button">
            <i className="fa-solid fa-right-from-bracket"></i>
          </a>
        </div>
      </div>
    </nav>
  );
};

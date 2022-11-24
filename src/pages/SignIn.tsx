import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../api/login";

type Inputs = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  exampleRequired: string;
};

export const SignIn = () => {
  const username = useRef<null | HTMLInputElement>(null);
  const password = useRef<null | HTMLInputElement>(null);
  const data = { username, password };
  const navigate = useNavigate();
  return (
    <section className="vh-100">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>

                    <form
                      onSubmit={() => Login(data, navigate)}
                      className="mx-1 mx-md-3 "
                    >
                      <div className="d-flex flex-row  align-items-center gap-2 mb-4">
                        <FontAwesomeIcon size="lg" icon={faUser} />
                        <div className="form-outline flex-fill d-flex flex-column  ">
                          <input
                            ref={username}
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            placeholder="Username..."
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center gap-2 mb-4">
                        <FontAwesomeIcon size="lg" icon={faLock} />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            ref={password}
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                            placeholder="Password..."
                          />
                        </div>
                      </div>

                      <div className=" d-flex justify-content-center gap-2 mb-4">
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3"
                        >
                          Do not Have An Account Sign Up{" "}
                          <a href="signUp">here</a>
                        </label>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

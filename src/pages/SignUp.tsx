import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";

type Inputs = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  exampleRequired: string;
};

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const [checked, setChecked] = useState<boolean>(false);
  console.log(checked);

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
                      onSubmit={handleSubmit(onSubmit)}
                      className="mx-1 mx-md-3 "
                    >
                      <div className="d-flex flex-row  align-items-center gap-2 mb-2">
                        <FontAwesomeIcon size="lg" icon={faUser} />
                        <div className="form-outline flex-fill d-flex flex-column  ">
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            placeholder="Your User Name"
                            {...register("username", {
                              required: true,
                              minLength: 5,
                            })}
                          />
                          {errors?.username?.type === "required" ? (
                            <span className="text-danger">
                              Field Can Not Be Empty!!!
                            </span>
                          ) : !errors ? (
                            <span className="text-danger">
                              Username is Invalid!!!
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center gap-2 mb-2">
                        <FontAwesomeIcon size="lg" icon={faEnvelope} />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="form3Example3c"
                            placeholder="Your Email"
                            className="form-control"
                            {...register("email", {
                              required: true,
                              minLength: 5,
                            })}
                          />
                          {errors?.email?.type === "required" ? (
                            <span className="text-danger">
                              Field Can Not Be Empty!!!
                            </span>
                          ) : !errors ? (
                            <span className="text-danger">
                              email is Invalid!!!
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center gap-2 mb-2">
                        <FontAwesomeIcon size="lg" icon={faLock} />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                            placeholder="Password"
                            {...register("password", {
                              required: true,
                              minLength: 5,
                            })}
                          />
                          {errors?.password?.type === "required" ? (
                            <span className="text-danger">
                              Field Can Not Be Empty!!!
                            </span>
                          ) : !errors ? (
                            <span className="text-danger">
                              Password is Invalid!!!
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center gap-2 mb-2">
                        <FontAwesomeIcon size="lg" icon={faKey} />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4cd"
                            className="form-control"
                            placeholder="Repeat your password"
                            {...register("repeatPassword", {
                              required: true,
                              minLength: 5,
                            })}
                          />
                          {errors?.repeatPassword?.type === "required" ? (
                            <span className="text-danger">
                              Field Can Not Be Empty!!!
                            </span>
                          ) : !errors ? (
                            <span className="text-danger">
                              repeatPassword is Invalid!!!
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center gap-2 mb-2">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            e.target.checked
                              ? setChecked(true)
                              : setChecked(false);
                          }}
                          value=""
                          id="form2Example3c"
                        />

                        <label
                          className="form-check-label"
                          htmlFor="form2Example3"
                        >
                          I agree all statements in{" "}
                          <a href="#!">Terms of service</a>
                        </label>
                      </div>

                      <div className=" d-flex justify-content-center gap-2 mb-4">
                        {" "}
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3"
                        >
                          Already Have An Account continue <a href="/">here</a>
                        </label>
                      </div>

                      {errors.exampleRequired && (
                        <span>This field is required</span>
                      )}

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          disabled={!checked}
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          Register
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

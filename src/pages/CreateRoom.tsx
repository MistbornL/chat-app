import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const CreateRoom = () => {
  const token = localStorage.getItem("token");
  const room = useRef<null | HTMLInputElement>(null);
  const navigate = useNavigate();
  const { user } = useParams();
  return (
    <main>
      {token ? (
        <div
          style={{ marginTop: "10rem" }}
          className="row d-flex justify-content-center align-items-center"
        >
          <div className="col-sm-5">
            <div className="card ">
              <div className="card-body d-flex flex-column justify-content-center align-items-center ">
                <h2 className="card-title">Create/Join Room</h2>
                <div className="form-outline flex-fill d-flex flex-column  ">
                  <input
                    required={true}
                    ref={room}
                    type="text"
                    id="form3Example1c"
                    className="form-control"
                    placeholder="Room..."
                  />
                </div>
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/chat/${user}/${room.current?.value}`)
                  }
                  className="btn btn-primary"
                >
                  join
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loading"></div>
      )}
    </main>
  );
};

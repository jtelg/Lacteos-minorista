import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import APIConsultas from "../../../services/consultas";
import Login from "../../../pages/session";
import localStorage from "../../../utils/localstorage";
import { SESSION_SET, ARR_NAV } from "../../../redux/actions";

const arr_nav = [{ label: "Picadas", route: "/picadas", icon: "" }];

const Session = (props) => {
  const dispatch = useDispatch();
  const sessionState = useSelector((s) => s.session);
  const sessionLocal = localStorage.getFromStorage("session");
  useEffect(() => {
    const getInfo = () => {
      if (sessionLocal && !sessionState) dispatch(SESSION_SET(sessionLocal));
      APIConsultas.usuario.GlobalInfoUser(dispatch, true);
      if (sessionState?.role === "Admin") {
        if (!arr_nav.find((e) => e.label === "Tablero")) {
          arr_nav.push({
            label: "Tablero",
            route: "/admin",
            icon: "dashboard",
          });
        }
      }
      dispatch(ARR_NAV(arr_nav));
    };
    getInfo();
  }, [dispatch, sessionState, sessionLocal]);

  return (
    <>
      {/* {(props.comp.auth?.role === 'Admin' || bndServer) && */}
      {props.comp.auth?.role === "Admin" && sessionState?.role !== "Admin" ? (
        <Login></Login>
      ) : (
        <div>{props.children}</div>
      )}
    </>
  );
};

export default Session;

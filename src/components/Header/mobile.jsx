import React from "react";

const Mobile = ({ state }) => {
  return (
    <div className="md:hidden">
      {/* <button
        onClick={handlerMenuOpen}
        className={`hamburger ${isActive ? 'is-active' : ''}`}
      >
        <div className="_layer -top"></div>
        <div className="_layer -mid"></div>
        <div className="_layer -bottom"></div>
      </button>
      <nav className="menuppal">
        <ul>
          {arr_nav.map((e, i) => (
            <li key={i} className="text-[14px] font-medium">
              <Link
                href={e.route}
                className={`${
                  path === e.label || router.pathname === e.route
                    ? 'text-secondary font-semibold '
                    : 'text-white font-normal'
                }`}
              >
                <button onClick={() => setIsActive(!isActive)}>
                  {e.label}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <style jsx>{`
        .hamburger {
          background-color: transparent;
          height: 40px;
          width: 40px;
          padding: 10px 0px;
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
          -webkit-transition: -webkit-transform 0.25s
            cubic-bezier(0.05, 1.04, 0.72, 0.98);
          transition: transform 0.25s cubic-bezier(0.05, 1.04, 0.72, 0.98);
          z-index: 100;
          cursor: pointer;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .hamburger.is-active {
          background-color: none;
        }
        ._layer {
          background: white;
          margin-bottom: 4px;
          border-radius: 2px;
          width: 32px;
          height: 4px;
          opacity: 1;
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
          -webkit-transition: all 0.25s cubic-bezier(0.05, 1.04, 0.72, 0.98);
          transition: all 0.25s cubic-bezier(0.05, 1.04, 0.72, 0.98);
        }
        .hamburger:hover .-top {
          -webkit-transform: translateY(-100%);
          -ms-transform: translateY(-100%);
          transform: translateY(-100%);
        }
        .hamburger:hover .-bottom {
          -webkit-transform: translateY(100%);
          -ms-transform: translateY(100%);
          transform: translateY(100%);
        }
        .hamburger.is-active .-top {
          -webkit-transform: translateY(200%) rotate(45deg) !important;
          -ms-transform: translateY(200%) rotate(45deg) !important;
          transform: translateY(200%) rotate(45deg) !important;
        }
        .hamburger.is-active .-mid {
          opacity: 0;
        }
        .hamburger.is-active .-bottom {
          -webkit-transform: translateY(-200%) rotate(135deg) !important;
          -ms-transform: translateY(-200%) rotate(135deg) !important;
          transform: translateY(-200%) rotate(135deg) !important;
        }

        .menuppal.is_active {
          transform: translate3d(0px, 0px, 0px);
          top: 70px;
          z-index: 50;
        }
        .menuppal {
          background-color: #2d6a50;
          bottom: 0;
          height: 100%;
          left: 0;
          overflow-y: scroll;
          position: fixed;
          top: 70px;
          transform: translate3d(-100%, 0px, 0px);
          transition: transform 0.35s cubic-bezier(0.05, 1.04, 0.72, 0.98) 0s;
          width: 100%;
          z-index: 50;
        }
        .menuppal ul {
          margin: 0;
          padding: 0;
        }
        .menuppal ul li {
          list-style: none;
          text-align: center;
          font-size: 1.5rem;
          line-height: 3em;
          height: 3em;
          color: white;
          text-transform: none;
        }
        .menuppal ul li a {
          text-decoration: none;
          color: white;
        }
        .menuppal ul li a:hover {
          text-decoration: none;
          color: white;
        }
      `}</style> */}
    </div>
  );
};

export default Mobile;

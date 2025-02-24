import React from "react";
import logo from "../../logo.png";
import { useTranslation } from "../../TranslationContext";
import { useNavigate } from "react-router-dom";

function DashSidebar({ openSidebarToggle, OpenSidebar }) {
  const { translations } = useTranslation();
  const navigate = useNavigate();
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img className="logo" src={logo} alt="" />
        </div>
        <div className="sidebar-title">
          <h2>
            CHAR<span class="warning">MI</span>
          </h2>
        </div>
        <div className="span">
          <span className="icon close_icon" onClick={OpenSidebar}>
            X
          </span>
        </div>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <a class="option" id="op1" onClick={() => navigate("/dashboard")}>
            <span>
              <i class="fa-solid fa-border-all"></i>
            </span>
            <h3 className="dashboardname">{translations.dashboardname}</h3>
          </a>
        </li>
        <li className="sidebar-list-item">
          <a
            class="option"
            id="op1"
            onClick={() => navigate("/dashboard/users")}
          >
            <span>
              <i class="fa-regular fa-user"></i>
            </span>
            <h3 className="customersname">{translations.customersname}</h3>
          </a>
        </li>
        <li
          className="sidebar-list-item"
          onClick={() => navigate("/dashboard/orders")}
        >
          <a class="option" id="op1">
            <span>
              <i class="fa-solid fa-money-check-dollar"></i>
            </span>
            <h3 className="ordersname">{translations.ordersname}</h3>
          </a>
        </li>
        <li className="sidebar-list-item">
          <a class="option" id="op1">
            <span>
              <i class="fa-solid fa-chart-line"></i>
            </span>
            <h3 className="" onClick={() => navigate("/dashboard/countries")}>
              Countries
            </h3>
          </a>
        </li>

        <li className="sidebar-list-item">
          <a class="option" id="op1">
            <span>
              <i class="fa-solid fa-chart-line"></i>
            </span>
            <h3 className="" onClick={() => navigate("/dashboard/cities")}>
              Cities
            </h3>
          </a>
        </li>
        <li className="sidebar-list-item">
          <a
            class="option"
            id="op1"
            onClick={() => navigate("/dashboard/messages")}
          >
            <span>
              <i class="fa-regular fa-envelope"></i>
            </span>
            <h3 className="messagesname">{translations.messagesname}</h3>
            <span class="message-count">20</span>
          </a>
        </li>
        <li className="sidebar-list-item">
          <a
            class="option"
            id="op1"
            onClick={() => navigate("/dashboard/products")}
          >
            <span>
              <i class="fa-solid fa-clipboard-check"></i>
            </span>
            <h3 className="productsname">{translations.productsname}</h3>
          </a>
        </li>
        <li className="sidebar-list-item">
          <a
            class="option"
            id="op1"
            onClick={() => navigate("/dashboard/categories")}
          >
            <span>
              <i class="fa-solid fa-clipboard-check"></i>
            </span>
            <h3 className="productsname">Categories</h3>
          </a>
        </li>
        <li className="sidebar-list-item">
          <a class="option" id="op1">
            <span>
              <i class="fa-solid fa-chart-line"></i>
            </span>
            <h3
              className=""
              onClick={() => navigate("/dashboard/shippingfees")}
            >
              Shipping Fees
            </h3>
          </a>
        </li>
        <li className="sidebar-list-item">
          <a
            class="option"
            id="op1"
            onClick={() => navigate("/dashboard/admins")}
          >
            <span>
              <i class="fa-solid fa-lock"></i>
            </span>
            <h3 className="adminname">{translations.adminname}</h3>
          </a>
        </li>
        <li className="sidebar-list-item">
          <a class="option" onClick={() => navigate("/register")}>
            <span>
              <i class="fa-solid fa-right-from-bracket"></i>
            </span>
            <h3 className="logoutname">{translations.logoutname}</h3>
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default DashSidebar;

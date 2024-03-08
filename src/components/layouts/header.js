import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  // 현재 선택된 메뉴를 추적하기 위한 상태
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);

  // 메뉴 클릭 시 활성화된 메뉴를 업데이트하는 함수
  const handleMenuClick = (path) => {
    setActiveMenu(path);
  };

  return (
    <ul className="nav nav-pills bg-white p-3 mb-3">
      <li className="nav-item me-2">
        <Link to="/" className={`nav-link nav-group rounded-pill d-flex px-2 px-md-3 ${activeMenu === "/" ? "active" : ""}`} onClick={() => handleMenuClick("/")}>
          <span className="">주요 일정</span>
        </Link>
      </li>
      <li className="nav-item me-2">
        <Link to="/groups/1" className={`nav-link nav-group rounded-pill d-flex px-2 px-md-3 ${activeMenu === "/groups/1" ? "active" : ""}`} onClick={() => handleMenuClick("/groups/1")}>
          <span className="">수니뮤직</span>
        </Link>
      </li>
      <li className="nav-item me-2">
        <Link to="/groups/2" className={`nav-link nav-group rounded-pill d-flex px-2 px-md-3 ${activeMenu === "/groups/2" ? "active" : ""}`} onClick={() => handleMenuClick("/groups/2")}>
          <span className="">수니기획</span>
        </Link>
      </li>
      <li className="nav-item me-2">
        <Link to="/groups/3" className={`nav-link nav-group rounded-pill d-flex px-2 px-md-3 ${activeMenu === "/groups/3" ? "active" : ""}`} onClick={() => handleMenuClick("/groups/3")}>
          <span className="">수니엔터</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/groups/4" className={`nav-link nav-group rounded-pill d-flex px-2 px-md-3 ${activeMenu === "/groups/4" ? "active" : ""}`} onClick={() => handleMenuClick("/groups/4")}>
          <span className="">휴직</span>
        </Link>
      </li>
    </ul>
  );
}

export default Header;

import React, { useState } from "react";
import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./menu.css";

const Menu = ({ role, name, id }) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };


  function ScheduleEditor() {
    if (role === "coach" || role === "super_coach") {
      return (
        <Link to="/coach" onClick={onClose}>
          Редактор расписания
        </Link>
      );
    }
  }

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        <MenuOutlined />
      </Button>
      <Drawer title={name} onClose={onClose} open={open} placement="left">
        <div className="menu-point">
          <Link to="/" onClick={onClose}>
            Расписание
          </Link>
        </div>
        <div className="menu-point">{ScheduleEditor()}</div>

        <div className="menu-point">
          {role === "coach" && (
            <Link to="/management" onClick={onClose}>
              Управление
            </Link>
          )}
          {role === "super_coach" && (
            <Link to="/management" onClick={onClose}>
              Управление
            </Link>
          )}
        </div>
       
        <div className="menu-point">
           {role &&
          <Link to={`/id/${id}`} onClick={onClose}>
            Профиль
          </Link> }
        </div>
      </Drawer>
    </>
  );
};
export default Menu;

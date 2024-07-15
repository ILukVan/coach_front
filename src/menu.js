import React, { useState } from "react";
import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Menu = (role) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  console.log(role, "----------------------sdgs---------------------");
  function ScheduleEditor() {
    if (role.role === "coach" || role.role === "super_coach") {

      return <Link to="/coach" onClick={onClose}>Редактор расписания</Link>;

    }
  }

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        <MenuOutlined />
      </Button>
      <Drawer title="Меню" onClose={onClose} open={open} placement="left">
        <Link to="/" onClick={onClose}>Расписание</Link>
        <br />
        {ScheduleEditor()}
    <br />

        {role === "coach" && <Link to="/management" onClick={onClose}>Управление</Link>}
        {role.role === "super_coach" && <Link to="/management" onClick={onClose}>Управление</Link>}
      </Drawer>
    </>
  );
};
export default Menu;

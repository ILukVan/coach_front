import React from "react";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const SearchClient = ({clientList}) => {
    const { Option } = Select;
    const navigate = useNavigate();
    const handleChange = async (value, key) => {
        navigate(`/id/${key.key}`);

      };
    return (
      <div className="select-picker">
<Select
      showSearch
      style={{ width: 200 }}
      placeholder="Search to Select"
      onChange={handleChange}
    >
      {clientList.map((item) => (
        <Option
          key={item.client_id}
          value={item.client_fio}
          label={item.client_fio}
        ></Option>
      ))}
    </Select>
    </div>
    )
}
export default SearchClient;

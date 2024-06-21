import "./App.css";
import Activity from "./components/header";
import AddActivity from "./components/addActivity";
import { useState } from "react";
import axios from "axios";

function App() {
  const [activity, setActivity] = useState([]);

  const myFun = (activity) => {
    setActivity(activity);
  };
  const [tableData, setTableData] = useState([]);
  console.log(tableData, 'tableData');

  const fetchActivities = async () => {
    const data = await axios.get("http://localhost:3500/activities");
    
    setTableData(data.data);
  };

  const createActivity = async (values) => {
    const data = await axios.post("http://localhost:3500/add_activity", values);

    setTableData((prevData) => [...prevData, data.data]);
  };

  return (
    <div>
      <Activity activity={tableData} fetchActivities={fetchActivities} />
      <AddActivity sendActyv={myFun} createActivity={createActivity} />
      <p>{activity.weekday_train}</p>
    </div>
  );
}

export default App;

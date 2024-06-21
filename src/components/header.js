import React, { useEffect } from "react";
import { Table } from "antd";

// const a = {
//   training_id: "7ba25106-05b2-48f2-b5e6-d0c3e39a7c66",
//   type_of_training: "lucy",
//   occupancy_train: 14,
//   start_time_train: "01:01",
//   end_time_train: "02:02",
//   weekday_train: "2024-06-04",
//   updatedAt: "2024-06-21T10:26:57.610Z",
//   createdAt: "2024-06-21T10:26:57.610Z",
// };
const columns = [
  {
    title: "Время занятия",
    dataIndex: "start_time_train",
    sorter: {
      compare: (a, b) => a.start_time_train.localeCompare(b.start_time_train),
      multiple: 1,

    },
  },
  Table.EXPAND_COLUMN,
  {
    title: "Тип занятия",
    dataIndex: "type_of_training",
    filters: [
      {
        text: "Растяжка",
        value: "Растяжка",
      },
      {
        text: "Йога",
        value: "Йога",
      },
      {
        text: "Барре",
        value: "Барре",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.type_of_training.startsWith(value),
    width: "30%",
  },

  {
    title: "Статус тренировки",
    dataIndex: "status_train",
    sorter: {
      compare: (a, b) => a.status_train.localeCompare(b.status_train),
      multiple: 3,
    },
  },
  {
    title: "Количество мест",
    dataIndex: "occupancy_train",
    sorter: {
      compare: (a, b) => a.occupancy_train - b.occupancy_train,
      multiple: 4,
    },
  },
];
// const data = [
//   {
//     key: "1",
//     time_train: "10:00-11:00",
//     type_of_training: "Растяжка",
//     status_train: "Завершена",
//     occupancy_train: 10,
//     description: "ноги разводит и поднимат",
//   },
//   {
//     key: "2",
//     time_train: "11:00-12:30",
//     type_of_training: "Йога",
//     status_train: "Завершеа",
//     occupancy_train: 10,
//     description: "ногу поднимат чут чут по нетак",
//   },
//   {
//     key: "3",
//     time_train: 13 + ":00-14:00",
//     type_of_training: "Барре",
//     status_train: "Идет тренировка",
//     occupancy_train: 12,
//     description: "ноги поднимат гантеля опускат",
//   },
//   {
//     key: "4",
//     time_train: "15:00-16:00",
//     type_of_training: "Растяжка",
//     status_train: "Запланировано",
//     occupancy_train: 10,
//     description: "ноги разводит и поднимат",
//   },
// ];
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
const Activity = ({ activity, fetchActivities }) => {
  useEffect(() => {
    fetchActivities(); // функция которая делает запрос в сторе
  }, []);

  // хук который забирает данные из стора

  return (
    <div>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 0,
              }}
            >
              {record.description}
            </p>
          ),
        }}
        dataSource={activity}
        rowKey={(activity) => activity.training_id}
        onChange={onChange}
      />
      {/* <p>{activity.weekday_train}</p> */}
    </div>
  );
};

export default Activity;

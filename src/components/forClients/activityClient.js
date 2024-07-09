import React, { useEffect } from "react";
import { Table, DatePicker, Progress } from "antd";
import SignUpTrain from "./SignUpTrain";
import UnSignUpTrain from "./UnSignUpTrain ";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
const ActivityClient = ({ activity, fetchActivities, selectDateActivity }) => {
  useEffect(() => {
    fetchActivities(); // функция которая делает запрос в сторе
  }, []);
  const name = useSelector((state) => state.rootReducer.sign.user.name);
  // хук который забирает данные из стора
  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
    let selectDate = {
      date: dateString,
    };

    selectDateActivity(selectDate);
  };

  const columns = [
    {
      title: "Время занятия",
      dataIndex: "start_time_train",
      sorter: {
        compare: (a, b) => a.start_time_train.localeCompare(b.start_time_train),
        multiple: 1,
      },
      render: (_, record) => (
        <span>{`${record.start_time_train.slice(
          -5
        )} - ${record.end_time_train.slice(-5)} `}</span>
      ),
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
      render: (_, record) => {
        return (
          <>
            <Progress
              type="circle"
              size="small"
              percent={
                (record.recorded_client.length * 100) / record.occupancy_train
              }
              format={(percent) =>
                `${record.recorded_client.length} / ${record.occupancy_train}`
              }
            />
          </>
        );
      },
    },
    {
      title: "Edit Delet",
      dataIndex: "edit",
      render: (_, record) => {


        return (
          <>
          {(record.recorded_client).includes(name) ? <UnSignUpTrain record={record} /> : <SignUpTrain record={record} />}
            
          </>
        );
      },
    },
  ];

  return (
    <div>
      <DatePicker
        onChange={onChangeDate}
        defaultValue={dayjs()}
        allowClear={false}
      />
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 0,
              }}
            >
              {record.description_of_train}
            </p>
          ),
        }}
        dataSource={activity}
        rowKey={(activity) => activity.training_id}
        onChange={onChange}
      />
    </div>
  );
};

export default ActivityClient;

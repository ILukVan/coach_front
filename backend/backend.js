const express = require("express"); // получаем модуль express
const cors = require("cors");
const dayjs = require('dayjs')

// создаем приложение express
const app = express();
app.use(cors());
app.use(express.json());

const Sequelize = require("sequelize");
const sequelize = new Sequelize("coach_client", "ivan", "qwerty", {
  dialect: "postgres",
});

try {
  sequelize.authenticate();
  console.log("Соединение с БД было успешно установлено");
} catch (e) {
  console.log("Невозможно выполнить подключение к БД: ", e);
}

const Coach_table = sequelize.define("coach_table", {
  coach_id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  coach_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  coach_patronymic: {
    type: Sequelize.STRING,
  },
  coach_surname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  coach_password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  refresh_key_coach: {
    type: Sequelize.TEXT,
  },
  coach_phone_number: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  coach_birthday: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  coach_email: {
    type: Sequelize.STRING,
  },
  coach_role: {
    type: Sequelize.STRING,
    defaultValue: "coach",
  },
});

const ClientTable = sequelize.define("clientTable", {
  client_id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  client_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  client_patronymic: {
    type: Sequelize.STRING,
  },
  client_surname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  client_password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  refresh_key_client: {
    type: Sequelize.TEXT,
  },
  client_phone_number: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  client_birthday: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  client_email: {
    type: Sequelize.STRING,
  },
  client_role: {
    type: Sequelize.STRING,
    defaultValue: "client",
  },
  client_registration_date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    defaultValue: Sequelize.DATEONLY,
  },
  client_pass: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  client_balance_activities: {
    type: Sequelize.INTEGER,
  },
  client_job: {
    type: Sequelize.STRING,
  },
  client_illness: {
    type: Sequelize.STRING,
  },
  client_messenger: {
    type: Sequelize.STRING,
  },
});

const ActivityTable = sequelize.define("activity_table", {
  training_id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  type_of_training: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  occupancy_train: {
    type: Sequelize.INTEGER,
  },
  weekday_train: {
    type: Sequelize.DATEONLY,
  },
  start_time_train: {
    type: Sequelize.STRING,
  },
  end_time_train: {
    type: Sequelize.STRING,
  },

});


sequelize
  .sync()
  .then((result) => {
    // параметр {force: true}, чтобы удалить таблицы и создать их заново, но уже с нужной нам структурой
    // console.log(result);
  })
  .catch((err) => console.log(err));

//   Coach_table.create({
//   type_of_training: "Tomas",
//   coach_surname: "Mogg's",
//   coach_password: "qwerty",
//   coach_phone_number: 88,
//   coach_birthday: "946684800",
//   coach_role: "superCoach",
// })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => console.log(err));

// устанавливаем обработчик для маршрута "/"
app.get("/activities",async (req, res) => {
  // console.log(ActivityTable.findAll())
  const sport = await ActivityTable.findAll({raw: true ,
    order: [
    // массив для сортировки начинается с модели
    // затем следует название поля и порядок сортировки
    ['start_time_train', 'ASC']
  ]
  }
)
  console.log(sport);
  res.status(200).json(sport);
  
});

app.post("/add_activity", (req, res) => {
  console.log(req.body, "<<<____fiiiiind");
  let values = req.body
  let timmme1 = dayjs(values.time[0])
  let timmme2 = dayjs(values.time[1])   // определяю длительность занятия
  let time3 = timmme2.diff(timmme1, 'minute')
  console.log(time3);

 
    ActivityTable.create({
      type_of_training: values.modifier,
      occupancy_train: parseInt(values.title),
      start_time_train: `${dayjs(values.time[0]).format('HH:mm')} - ${dayjs(values.time[1]).format('HH:mm')}`,
      end_time_train: dayjs(values.time[1]).format('HH:mm'),
      weekday_train: dayjs(values.Date).format('YYYY-MM-DD')

    }).then((data) => {

      res.status(200).json(data)
    })
    .catch((err) => console.log(err));




  if(!req.body) return res.status(400).json("node node");

  // res.send("fsf");

    // client.end();
  });

// начинаем прослушивание подключений на 3000 порту
app.listen(3500, function () {
  console.log("Сервер начал принимать запросы по адресу http://localhost:3000");
});

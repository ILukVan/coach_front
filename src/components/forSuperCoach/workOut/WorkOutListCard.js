import React from "react";
import { Divider, List } from "antd";
import DeleteWorkOut from "./DeleteWorkOut.js";
import ModalEditWorkOut from "./modalEditWorkOut.js";




const WorkOutListCard = ({ workOutList, updateWorkOut, deleteWorkOut }) => {
  return (
    <div>
      <List
        grid={{
          gutter: 2,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 6,
          xxl: 3,
        }}
        dataSource={workOutList}
        renderItem={(item, index) => (
          <List.Item>
            <div className="card">
              <p>{item.type_of_workout}</p>
              <div className="card">
                <p>{item.description_of_workout}</p>
<Divider>

                  <ModalEditWorkOut record={item} updateWorkOut={updateWorkOut}/>
                  

                  </Divider>
                  <Divider>
                  <DeleteWorkOut record={item} deleteWorkOut={deleteWorkOut}/> 

                </Divider>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default WorkOutListCard;

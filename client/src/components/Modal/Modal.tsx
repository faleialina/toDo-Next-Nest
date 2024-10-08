import axios from "axios";
import { useState } from "react";
import { ModalProps } from "../../interfaces";
import style from "./modal.module.scss";

const Modal: React.FC<ModalProps> = ({ setOpen, task }: ModalProps) => {
  const [updateItemText, setUpdateItemText] = useState({
    title: "",
    description: "",
  });

  function changeUpdateItem(e: React.ChangeEvent<HTMLInputElement>) {
    setUpdateItemText({ ...updateItemText, [e.target.name]: e.target.value });
  }

  const updatedTasks =  async () => {
    const result = await axios.patch(
      `http://localhost:5000/task/${task.id}`,
      updateItemText
    );
    console.log(result);
    location.reload();
  }

  return (
    <div className={style.modal}>
      <div className={style.modalWrapper}>
        <div className={style.modalContent}>
          <div className={style.wrapper}>
            <h1>UPDATE NOTE</h1>
            <div className={style.inputs}>
              <input
                type="text"
                placeholder="input your note..."
                name="title"
                onChange={changeUpdateItem}
              />
              <input
                type="text"
                placeholder="input your description note..."
                name="description"
                onChange={changeUpdateItem}
              />
            </div>

            <div className={style.buttonTag}>
              <div
                className={style.cancelButton}
                onClick={() => setOpen(false)}
              >
                CANCEL
              </div>
              <div
                className={style.applyButton}
                onClick={updatedTasks}
              >
                APPLY
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default  Modal
import React, { useState, useEffect } from 'react'
import ReminderForm from './Reminder/ReminderForm';
import axios from 'axios';
import useAuthentication from '../hooks/useAuthentication';
import ReminderList from './Reminder/ReminderList';

function Reminders() {
  const [reminders, setReminders] = useState({})
  const { token, url } = useAuthentication();

  useEffect(() => {
    const handleSubmit = async (e) => {
        await axios({
            url: url + "/get_reminders",
            method: "GET",
            headers: {
                authorization: "Bearer " + token,
            },
            data: {},
        })
            .then((res) => {  
                setReminders(res.data);
            })
            .catch((err) => {
                console.error("Error adding expense:", err);
            });
    };

    handleSubmit()
  }, [token]);

  return (
      <div className="main-dashboard-container">
          <div className="sub-container-reminder">
              <ReminderForm data={reminders} handleData={setReminders}/>
              <ReminderForm />
          </div>
              <ReminderList data={reminders} setReminders={setReminders} />
      </div>
  );
}

export default Reminders
// https://github.com/fkhadra/react-toastify?source=post_page-----e06e8d338bb3--------------------------------
// https://blog.betrybe.com/react/react-toastify/
import React from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastNotification(){

  return (
    <div>
      <ToastContainer />
    </div>
  );
}
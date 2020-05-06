import React from "react";

const SettingController = (props) => {
  const { id, length, decrement, increment } = props;
  const lowerId = id.toLowerCase();
  return (
    <div className="SettingController">
      <h2 className="SettingController__title" id={`${lowerId}-label`}>
        {id} Length
      </h2>
      <div className="SettingController__value" id={`${lowerId}-length`}>
        {length}
      </div>
      <div className="container">
        <button
          className="SettingController__button"
          id={`${lowerId}-decrement`}
          onClick={decrement}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M19 13H5v-2h14v2z" />
          </svg>
        </button>
        <button
          className="SettingController__button"
          id={`${lowerId}-increment`}
          onClick={increment}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SettingController;

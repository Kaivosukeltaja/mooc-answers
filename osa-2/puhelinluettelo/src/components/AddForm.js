import React from 'react';

const AddForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
          <h2>Lisää uusi</h2>
          <div>
            nimi: <input onChange={props.handleNameChange} value={props.newName} required />
          </div>
          <div>
            numero: <input onChange={props.handlePhoneChange} value={props.newPhone} required />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
    );
};

export default AddForm;

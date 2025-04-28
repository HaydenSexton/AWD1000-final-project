import { useState } from 'react';
import { useEffect } from 'react';

function Employee(props) {
  const [editMode, setEditMode] = useState(false);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeRole, setEmployeeRole] = useState('');
  const [employeeFavReward, setEmployeeFavReward] = useState('');
  const [employeeDescription, setEmployeeDescription] = useState('');

  useEffect(() => {
    setEmployeeName(props.employee.employeeName);
    setEmployeeRole(props.employee.employeeRole);
    setEmployeeFavReward(props.employee.employeeFavReward);
    setEmployeeDescription(props.employee.employeeDescription);
  }, []);

  const saveEmployee = () => {
    setEditMode(false)
    const updatedEmployee = {
      employeeName: employeeName,
      employeeRole: employeeRole,
      employeeDescription: employeeDescription,
      employeeFavReward: employeeFavReward,
      id: props.employee.id,
      employeeImage: props.employee.employeeImage,
    };

    props.updateEmployee(updatedEmployee);
  };

  // wanted to use a fontawesome icon for the delete image and update image but it was just ugly.
  return (
    <div className="card" style={{ width: `18rem`, height: `50rem` }}>
      <img
        className="card-img-top"
        src={props.employee.employeeImage}
        alt="Excellent Employee"
        style={{ border: '5px solid black' }}
      />
      {!editMode && (
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{props.employee.employeeName}</li>
          <li className="list-group-item">
            <em>
              <b>Role at Lumon</b>
            </em>
            <br />
            {props.employee.employeeRole}
          </li>
          <li className="list-group-item">{props.employee.employeeDescription}</li>
          <li className="list-group-item">
            <em>
              <b>Employees Favorite Perk</b>
            </em>
            <br />
            {props.employee.employeeFavReward}
          </li>
          <li className="list-group-item">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault(); // stops it from going back to the top of the page.
                props.removeEmployee(props.employee); // delete call
              }}
            >
              <img src="images/redcan.png" width="32" height="32" alt="Delete"></img>
            </a>
            &nbsp;&nbsp;&nbsp;
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault(); // same as above
                setEditMode(true);
              }}
            >
              <img src="images/pencil.png" width="32" height="32" alt="Edit"></img>
            </a>
          </li>
        </ul>
      )}
      {editMode && (
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <input
              type="text"
              className="form-control"
              value={employeeName}
              onChange={(evt) => setEmployeeName(evt.currentTarget.value)}
            />
          </li>
          <li className="list-group-item">
            <em>
              <b>Role at Lumon</b>
            </em>
            <br />
            <input
              type="text"
              className="form-control"
              value={employeeRole}
              onChange={(evt) => setEmployeeRole(evt.currentTarget.value)}
            />
          </li>
          <li className="list-group-item">
            <textarea
              className="form-control"
              rows={5}
              value={employeeDescription}
              onChange={(evt) => setEmployeeDescription(evt.currentTarget.value)}
            />
          </li>
          <li className="list-group-item">
            <em>
              <b>Employees Favorite Perk</b>
            </em>
            <br />
            <input
              type="text"
              className="form-control"
              value={employeeFavReward}
              onChange={(evt) => setEmployeeFavReward(evt.currentTarget.value)}
            />
          </li>
          <li className="list-group-item">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault(); // stops it from going back to the top of the page.
                // saves edited stuff
              }}
            >
              <img src="images/checkmark.png" width="32" height="32" alt="Save" onClick={saveEmployee}></img>
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Employee;

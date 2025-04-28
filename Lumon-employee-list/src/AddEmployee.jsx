import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function AddEmployee({ show, onClose, addEmployee }) {
  // id, image, name, role, reward, desc
  const [employeeImage, setEmployeeImage] = useState(null);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeRole, setEmployeeRole] = useState('');
  const [employeeFavReward, setEmployeeFavReward] = useState('');
  const [employeeDescription, setEmployeeDescription] = useState('');

  // add new employee
  const doWork = () => {
    const newEmployee = {
      id: nanoid(),
      employeeImage: employeeImage ? URL.createObjectURL(employeeImage) : '',
      employeeName,
      employeeRole,
      employeeFavReward,
      employeeDescription,
    };
    addEmployee(newEmployee);
    // sets fields back to nothing
    setEmployeeImage(null);
    setEmployeeName('');
    setEmployeeRole('');
    setEmployeeFavReward('');
    setEmployeeDescription('');
  };

  // updates the cards image
  const imageUpdate = (e) => setEmployeeImage(e.target.files[0]);

  const handleSave = (e) => {
    e.preventDefault();
    doWork();
  };

  // this is code for the react-bootstrap modal (particularly the version when creating a new employee)
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>New Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form id="employeeForm" onSubmit={handleSave}>
          <div className="mb-2">
            <label htmlFor="fileUpload" className="form-label">
              Image File
            </label>
            <input type="file" id="fileUpload" onChange={imageUpdate} className="form-control" required />
          </div>
          <div className="mb-2">
            <label htmlFor="employeeName" className="form-label">
              Name
            </label>
            <input
              id="employeeName"
              type="text"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="employeeRole" className="form-label">
              Role
            </label>
            <input
              id="employeeRole"
              type="text"
              value={employeeRole}
              onChange={(e) => setEmployeeRole(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="employeeFavReward" className="form-label">
              Perk
            </label>
            <input
              id="employeeFavReward"
              type="text"
              value={employeeFavReward}
              onChange={(e) => setEmployeeFavReward(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="employeeDescription" className="form-label">
              Description
            </label>
            <textarea
              id="employeeDescription"
              rows={3}
              value={employeeDescription}
              onChange={(e) => setEmployeeDescription(e.target.value)}
              className="form-control"
              required
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" form="employeeForm">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddEmployee;

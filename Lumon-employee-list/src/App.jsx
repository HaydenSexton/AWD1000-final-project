import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { nanoid } from 'nanoid';
import AddEmployee from './AddEmployee';
import { useEffect } from 'react';
import Employee from './Employee';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

function App() {
  const Employees = [
    {
      id: nanoid(),
      employeeImage: 'images/employee1.jpg',
      employeeName: 'Mark Scout',
      employeeRole: 'Macrodata Refinement',
      employeeFavReward: 'Waffle Party',
      employeeDescription:
        'Hard-working employee committed to meeting every deadline and following established procedures to support team goals.',
    },
    {
      id: nanoid(),
      employeeImage: 'images/employee2.jpg',
      employeeName: 'Helly R.',
      employeeRole: 'Macrodata Refinement',
      employeeFavReward: 'Freedom',
      employeeDescription:
        'Energetic new hire with a passion for innovation who challenges the status quo and drives positive change.',
    },
    {
      id: nanoid(),
      employeeImage: 'images/employee3.jpg',
      employeeName: 'Irving Bailiff',
      employeeRole: 'Macrodata Refinement',
      employeeFavReward: 'Painting the break room',
      employeeDescription:
        'Dependable and disciplined team member known for meticulous attention to detail and consistent adherence to company standards.',
    },
    {
      id: nanoid(),
      employeeImage: 'images/employee4.jpg',
      employeeName: 'Dylan G.',
      employeeRole: 'Macrodata Refinement',
      employeeFavReward: 'Finger traps and perks',
      employeeDescription:
        'Results-driven professional whose competitive spirit and quick thinking help the team exceed performance targets.',
    },
    {
      id: nanoid(),
      employeeImage: 'images/employee5.jpg',
      employeeName: 'Harmony Cobel',
      employeeRole: 'Floor Manager',
      employeeFavReward: 'Obedience',
      employeeDescription:
        'Strategic operations manager skilled at fostering a positive work environment while ensuring strict compliance with company policy.',
    },
    {
      id: nanoid(),
      employeeImage: 'images/employee6.jpg',
      employeeName: 'Mr. Milchick',
      employeeRole: 'Floor Supervisor',
      employeeFavReward: 'Compliance through celebration',
      employeeDescription:
        'Enthusiastic supervisor who motivates staff through recognition and constructive feedback to maintain high morale and productivity.',
    },
    {
      id: nanoid(),
      employeeImage: 'images/employee7.jpg',
      employeeName: 'Burt Goodman',
      employeeRole: 'Optics and Design',
      employeeFavReward: 'Walks with Irving',
      employeeDescription:
        'Collaborative designer who brings thoughtful insights and supports team cohesion through clear communication.',
    },
    {
      id: nanoid(),
      employeeImage: 'images/employee8.jpg',
      employeeName: 'Natalie',
      employeeRole: 'Lumon PR',
      employeeFavReward: 'Control over public narrative',
      employeeDescription:
        'Skilled public relations specialist adept at managing external communications and protecting the company’s brand image.',
    },
    {
      id: nanoid(),
      employeeImage: 'images/employee9.jpg',
      employeeName: 'Casey',
      employeeRole: 'Security & Interrogation Supervisor',
      employeeFavReward: 'Confession Compliance',
      employeeDescription:
        'Vigilant security lead who enforces protocols and conducts thorough reviews to uphold facility safety and integrity.',
    },
    {
      id: nanoid(),
      employeeImage: 'images/employee10.jpg',
      employeeName: 'Mark W.',
      employeeRole: 'Macrodata Refinement',
      employeeFavReward: 'Five Percent Bonus Certificate',
      employeeDescription:
        'Methodical data specialist valued for consistent productivity, precision in reporting, and unwavering dedication to team objectives.',
    },
    {
      id: nanoid(),
      employeeImage: 'images/employee11.jpg',
      employeeName: 'Gwendolyn Y.',
      employeeRole: 'Macrodata Refinement',
      employeeFavReward: 'Lumon Enlightenment Retreat',
      employeeDescription:
        'Innovative MDR consultant who brings proactive solutions and fresh perspectives to optimize workflow efficiency.',
    },
  ];

  const [allEmployees, setAllEmployees] = useState(() => {
    const saved = window.localStorage.getItem('lumonEmployees');
    return saved ? JSON.parse(saved) : Employees;
  });

  const [searchResults, setSearchResults] = useState(() => {
    const saved = window.localStorage.getItem('lumonEmployees');
    return saved ? JSON.parse(saved) : Employees;
  });

  const [keywords, setKeywords] = useState('');

  // loads employee array when the page loads
  useEffect(() => {
    window.localStorage.setItem('lumonEmployees', JSON.stringify(allEmployees));
  }, [allEmployees]);

  const saveEmployees = (Employees) => {
    setAllEmployees(Employees);
    setSearchResults(Employees);
  };

  // search logic function
  const searchEmployees = () => {
    let keywordsArray = [];

    if (keywords) {
      keywordsArray = keywords.toLowerCase().split(` `);
    }

    if (keywordsArray.length > 0) {
      const searchResults = allEmployees.filter((employee) => {
        for (const word of keywordsArray) {
          if (
            // checks for name, role, and perk (not desc since it has so many words)
            employee.employeeName.toLowerCase().includes(word) ||
            employee.employeeRole.toLowerCase().includes(word) ||
            employee.employeeFavReward.toLowerCase().includes(word)
          ) {
            return true;
          }
        }
        return false;
      });
      setSearchResults(searchResults);
    } else {
      setSearchResults(allEmployees);
    }
  };

  const removeEmployee = (employeeToDelete) => {
    const updatedEmployeesArray = allEmployees.filter((employee) => employee.id !== employeeToDelete.id);
    saveEmployees(updatedEmployeesArray);
  };

  const updateEmployee = (updatedEmployee) => {
    const updatedEmployeesArray = allEmployees.map((employee) =>
      employee.id === updatedEmployee.id ? { ...employee, ...updatedEmployee } : employee
    );
    saveEmployees(updatedEmployeesArray);
  };

  // handles if the modal is showing
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // appends new employee to the end of the array and updates the site.
  const addEmployee = (newEmployee) => {
    const updatedEmployees = [...allEmployees, newEmployee];
    saveEmployees(updatedEmployees);
  };

  return (
    <div className="app">
      <header className="p-3 mb-3 border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
              <img
                className="bi me-2"
                src="images/lumonlogo.jpg"
                alt="Lumon Logo"
                width="80"
                height="50"
                role="img"
                style={{ borderRadius: '25px' }}
              />
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <a href="#" className="nav-link px-2 link-active">
                  Employee List
                </a>
              </li>
            </ul>

            <form
              className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
              onSubmit={(e) => {
                e.preventDefault(); // stops the page from refreshing (since I have a useEffect that gets called on page load it would override the search)
                searchEmployees();
              }}
            >
              <input
                type="search"
                className="form-control"
                placeholder="Search..."
                aria-label="Search"
                onChange={(e) => setKeywords(e.target.value)} // constantly keeps the search keywords updated
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    searchEmployees();
                  }
                }}
              />
            </form>

            <div className="dropdown text-end">
              <a
                href="#"
                className="d-block link-dark text-decoration-none"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src="images/milchick.png" alt="mdo" width="32" height="32" className="rounded-circle" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <div className="row">
            {searchResults &&
              searchResults.map((employee) => (
                <div className="col-lg-3" style={{ padding: '1em' }} key={employee.id}>
                  <Employee employee={employee} removeEmployee={removeEmployee} updateEmployee={updateEmployee} />
                </div>
              ))}
            <div className="col-lg-3" style={{ padding: '1em' }}>
              <button
                type="button"
                className="card add-card-btn"
                style={{
                  width: `18rem`,
                  height: `50rem`,
                  border: `2px dashed rgba(0,0,0,0.2)`,
                  padding: 0,
                  backgroundColor: `lightblue`,
                }}
                onClick={handleShow}
              >
                <div className="card-body d-flex justify-content-center align-items-center">
                  <span className="add-icon">
                    <FontAwesomeIcon icon={faPlusCircle} /> Add Employee
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>

      <AddEmployee
        show={show}
        onClose={handleClose}
        addEmployee={(emp) => {
          addEmployee(emp);
          handleClose();
        }}
      />

      <footer className="py-3 my-4">
        <p className="nav justify-content-center border-bottom pb-3 mb-3">
          <em>
            From the TV Show <b>"Severance"</b>
          </em>
        </p>
        <p className="text-center text-body-secondary">&copy; 2025 Created by Hayden</p>
      </footer>
    </div>
  );
}

document.body.style =
  'background-image: url(images/lumon.jpg); background-repeat: no-repeat; background-size: contain; background-color: #102230';

export default App;

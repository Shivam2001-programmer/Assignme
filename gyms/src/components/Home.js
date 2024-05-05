import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [classes, setClasses] = useState([]);
  const [filter, setFilter] = useState({ type: "", time: "", instructor: "" });
  const [showDtail, setShowDtail] = useState(-1);

  console.log();

  useEffect(() => {
    axios
      .get("http://localhost:8000/classes")
      .then((response) => {
        setClasses(response.data);
      })
      .catch((error) => {
        console.log("Error fetching classes:", error);
      });

    console.log("classes", classes);
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter({ ...filter, [name]: value });
  };

  let filteredClasses = classes;
  if (filter.type) {
    filteredClasses = filteredClasses.filter(
      (classItem) => classItem.name.toLowerCase() === filter.type.toLowerCase()
    );
  }
  if (filter.time) {
    filteredClasses = filteredClasses.filter(
      (classItem) => classItem.time.toLowerCase() === filter.time.toLowerCase()
    );
  }
  if (filter.instructor) {
    filteredClasses = filteredClasses.filter(
      (classItem) =>
        classItem.instructor.toLowerCase() === filter.instructor.toLowerCase()
    );
  }

  const handleSignUp = (id) => {
    const updatedClasses = classes.map((classItem) => {
      if (classItem.id === id && classItem.registered < classItem.capacity) {
        return { ...classItem, registered: classItem.registered + 1 };
      }
      return classItem;
    });
    setClasses(updatedClasses);
    axios
      .put(
        `http://localhost:8000/classes/${id}`,
        updatedClasses.find((classItem) => classItem.id === id)
      )
      .then((response) => {
        console.log("Class sign-up successful:", response.data);
      })
      .catch((error) => {
        console.log("Error signing up for class:", error);
      });
  };

  return (
    <div>
      <h1 className="mt-3 mb-4 text-center font-semibold text-3xl">
        Weekly Classes
      </h1>
      <div className="mb-3">
        <label className="me-2">Type:</label>
        <select
          className="form-select"
          name="type"
          value={filter.type}
          onChange={handleFilterChange}
        >
          <option value="">All Types</option>
          <option value="Yoga">Yoga</option>
          <option value="Cardio">Cardio</option>
          <option value="Gymster">Gymster</option>
          <option value="Gym">Gym</option>
        </select>
        <label className="mx-2">Time:</label>
        <select
          className="form-select"
          name="time"
          value={filter.time}
          onChange={handleFilterChange}
        >
          <option value="">All Times</option>

          <option value="10:00 AM">10:00 AM</option>
          <option value="11:00 AM">11:00 AM</option>
          <option value="12:00 PM">12:00 PM</option>
        </select>
        <label className="mx-2">Instructor:</label>
        <select
          className="form-select"
          name="instructor"
          value={filter.instructor}
          onChange={handleFilterChange}
        >
          <option value="">All Instructors</option>
          <option value="John Doe">John Doe</option>
          <option value="Jane Smith">Jane Smith</option>
          <option value="Loren"> Loren</option>
          <option value="Hellen"> Hellen</option>
        </select>
      </div>
      {filteredClasses.map((classItem, index) => (
        <div className="card mb-3" key={classItem.id}>
          <div className="card-body py-3 px-5">
            <h2 className="card-title">{classItem.name}</h2>
            <hr />
            <div className="indent px-3 py-2">
              <p className="card-text">Instructor: {classItem.instructor}</p>
              {showDtail === index ? (
                <>
                  <p className="card-text">Time: {classItem.time}</p>
                  <p className="card-text">Duration: {classItem.duration}</p>
                  <p className="card-text">Capacity: {classItem.capacity}</p>
                  <p className="card-text">
                    Registered: {classItem.registered}
                  </p>
                </>
              ) : (
                <></>
              )}
              <hr />
            </div>

            <button
              className="btn btn-primary me-2 py-1 px-4"
              onClick={() => {
                setShowDtail(index);
              }}
            >
              Details
            </button>
            <button
              className="btn btn-success py-1 px-4"
              onClick={() => handleSignUp(classItem.id)}
              disabled={classItem.registered >= classItem.capacity}
            >
              Sign Up
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;

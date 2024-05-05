// components/ClassDetails.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ClassDetails = () => {
  const { id } = useParams();
  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/classes/${id}`)
      .then((response) => {
        setClassDetails(response.data);
      })
      .catch((error) => {
        console.log("Error fetching class details:", error);
      });
  }, [id]);

  if (!classDetails) return <div>Loading...</div>;

  return (
    <div>
      <h1>{classDetails.name} Details</h1>
      <p>Instructor: {classDetails.instructor}</p>
      <p>Time: {classDetails.time}</p>
      <p>Duration: {classDetails.duration}</p>
      <p>Capacity: {classDetails.capacity}</p>
      <p>Registered: {classDetails.registered}</p>
    </div>
  );
};

export default ClassDetails;

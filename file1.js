import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [students, setStudents] = useState([]);

  const API_URL = "/api/students";

  const fetchStudents = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.log("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async (e) => {
    e.preventDefault();

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          course,
        }),
      });

      setName("");
      setEmail("");
      setCourse("");

      fetchStudents();
    } catch (error) {
      console.log("Error adding student:", error);
    }
  };

  return (
    <div className="container">
      <h1>Student Registration App</h1>

      <form onSubmit={addStudent}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        />

        <button type="submit">Add Student</button>
      </form>

      <h2>Student List</h2>

      {students.map((student) => (
        <div className="student" key={student._id}>
          <h3>{student.name}</h3>
          <p>Email: {student.email}</p>
          <p>Course: {student.course}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
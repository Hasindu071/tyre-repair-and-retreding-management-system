import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/WorkerAttendance.css";
import OwnerNavbar from "../components/Navbars/OwnerRegiNavBar"; // Use owner's navbar

const OwnerMarksWorkerAttendance = () => {
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [message, setMessage] = useState("");
  const [attendanceDates, setAttendanceDates] = useState([]);
  const [showWorkerModal, setShowWorkerModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);

  const today = new Date();
  const todayDisplay = today.toLocaleDateString();
  const todayISO = today.toISOString().slice(0, 10);

  // When a worker is selected, fetch that worker's attendance
  useEffect(() => {
    if (selectedWorker) {
      axios
        .get(`http://localhost:5000/attendance/worker/${selectedWorker.id}`)
        .then((res) => {
          // Expected response: { attendances: ["2025-03-01", "2025-03-15", ...] }
          // Ensure each date is in YYYY-MM-DD format
          const formattedAttendances = res.data.attendances.map(date => date.slice(0, 10));
          setAttendanceDates(formattedAttendances);
          setAttendanceMarked(formattedAttendances.includes(todayISO));
        })
        .catch((err) => {
          console.error("Error fetching attendance:", err);
        });
    }
  }, [todayISO, selectedWorker]);

  // Fetch list of workers for owner's selection
  useEffect(() => {
    axios
      .get("http://localhost:5000/WorkerRegister")
      .then((res) => {
        setWorkers(res.data); // Expecting each worker to have firstName and lastName fields
      })
      .catch((err) => {
        console.error("Error fetching workers:", err);
      });
  }, []);

  // Function to mark attendance and update calendar data
  const markAttendance = async () => {
    if (!selectedWorker) return;
    try {
      const res = await axios.post("http://localhost:5000/attendance/mark", {
        worker_id: selectedWorker.id,
      });
      if (res.status === 200) {
        setMessage("Attendance marked successfully!");
        const attendanceRes = await axios.get(
          `http://localhost:5000/attendance/worker/${selectedWorker.id}`
        );
        const formattedAttendances = attendanceRes.data.attendances.map(
          (date) => date.slice(0, 10)
        );
        setAttendanceDates(formattedAttendances);
        setAttendanceMarked(formattedAttendances.includes(todayISO));
        setShowCalendarModal(false);
      }
    } catch (error) {
      // If attendance was already marked, still update state with the full data
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "Attendance already marked for today."
      ) {
        try {
          const attendanceRes = await axios.get(
            `http://localhost:5000/attendance/worker/${selectedWorker.id}`
          );
          const formattedAttendances = attendanceRes.data.attendances.map(
            (date) => date.slice(0, 10)
          );
          setAttendanceDates(formattedAttendances);
          setAttendanceMarked(true);
          setMessage(error.response.data.message);
        } catch (err) {
          console.error("Error re-fetching attendance:", err);
          setMessage("Attendance already marked but failed to update calendar.");
        }
      } else {
        console.error("Error marking attendance:", error);
        setMessage("Failed to mark attendance. Please try again.");
      }
    }
  };

  // Generate an array of Date objects and empty cells for the current month's calendar
  const generateCalendar = () => {
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();
    let daysArray = [];
    for (let i = 0; i < startDay; i++) {
      daysArray.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      daysArray.push(new Date(year, month, d));
    }
    return daysArray;
  };

  return (
    <div>
      <OwnerNavbar />
      <div className="worker-attendance-container">
        <h2>Worker Attendance</h2>
        <p>Today: {todayDisplay}</p>
        {!selectedWorker ? (
          <button onClick={() => setShowWorkerModal(true)}>Select Worker</button>
        ) : (
          <div>
            <p>
              Selected Worker:{" "}
              {selectedWorker.firstName + " " + selectedWorker.lastName}
            </p>
            <button onClick={markAttendance} disabled={attendanceMarked}>
              {attendanceMarked ? "Attendance Marked" : "Mark Attendance"}
            </button>
            <button onClick={() => setShowCalendarModal(true)}>
              View Attendance Calendar
            </button>
            <button
              onClick={() => {
                setSelectedWorker(null);
                setAttendanceDates([]);
                setAttendanceMarked(false);
                setMessage("");
              }}
            >
              Change Worker
            </button>
          </div>
        )}
        {message && <p className="attendance-message">{message}</p>}
      </div>

      {/* Modal for Worker Selection */}
      {showWorkerModal && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          role="dialog"
          onClick={() => setShowWorkerModal(false)}
        >
          <div
            className="modal-dialog"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select Worker</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowWorkerModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <select
                  className="form-control"
                  onChange={(e) => {
                    const workerId = e.target.value;
                    const worker = workers.find((w) => w.id === workerId);
                    setSelectedWorker(worker);
                  }}
                >
                  <option value="">-- Select a Worker --</option>
                  {workers.map((worker) => (
                    <option key={worker.id} value={worker.id}>
                      {worker.firstName + " " + worker.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowWorkerModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setShowWorkerModal(false)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop fade show"
            onClick={() => setShowWorkerModal(false)}
          ></div>
        </div>
      )}

      {/* Modal for Attendance Calendar View */}
      {showCalendarModal && selectedWorker && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          role="dialog"
          onClick={() => setShowCalendarModal(false)}
        >
          <div
            className="modal-dialog"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Attendance Calendar for{" "}
                  {selectedWorker.firstName + " " + selectedWorker.lastName}
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowCalendarModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="calendar-grid">
                  {generateCalendar().map((date, index) => {
                    if (!date) {
                      return (
                        <div key={index} className="calendar-cell empty-cell"></div>
                      );
                    }
                    const dateISO = date.toISOString().slice(0, 10);
                    const attended = attendanceDates.includes(dateISO);
                    return (
                      <div
                        key={index}
                        className={`calendar-cell ${
                          attended ? "attended-cell" : "not-attended-cell"
                        }`}
                      >
                        {date.getDate()}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="modal-footer">
                {!attendanceMarked && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={markAttendance}
                  >
                    Mark Attendance for Today
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowCalendarModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop fade show"
            onClick={() => setShowCalendarModal(false)}
          ></div>
        </div>
      )}
    </div>
  );
};

export default OwnerMarksWorkerAttendance;
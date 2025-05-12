import React, { useState, useEffect } from "react";
import axios from "axios";
import OwnerSidebar from "../components/SideNav";
import "../styles/WorkerAttendance.css";

const OwnerMarksWorkerAttendance = () => {
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [message, setMessage] = useState("");
  const [attendanceDates, setAttendanceDates] = useState([]);
  const [showWorkerModal, setShowWorkerModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [totalAttendanceCount, setTotalAttendanceCount] = useState(0);
  const [showBulkAttendance, setShowBulkAttendance] = useState(false);
  const [selectedWorkers, setSelectedWorkers] = useState([]);
  const [bulkMessage, setBulkMessage] = useState("");

  const today = new Date();
  const todayDisplay = today.toLocaleDateString();
  const todayISO = today.toISOString().slice(0, 10);

  useEffect(() => {
    axios.get("http://localhost:5000/WorkerRegister")
      .then(res => setWorkers(res.data))
      .catch(err => console.error("Error fetching workers:", err));
  }, []);

  useEffect(() => {
    if (selectedWorker) {
      fetchWorkerAttendance(selectedWorker.id);
    }
  }, [selectedWorker, selectedMonth, selectedYear]);

  const fetchWorkerAttendance = async (workerId) => {
    try {
      const res = await axios.get(`http://localhost:5000/attendance/worker/${workerId}`);
      const dates = res.data.attendances.map(date => date.slice(0, 10));
      const total = dates.length;
      const filtered = dates.filter(d => {
        const date = new Date(d);
        return date.getMonth() === selectedMonth && date.getFullYear() === selectedYear;
      });

      setAttendanceDates(filtered);
      setAttendanceMarked(dates.includes(todayISO));
      setTotalAttendanceCount(total);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  const markAttendance = async () => {
    if (!selectedWorker) return;
    try {
      const res = await axios.post("http://localhost:5000/attendance/mark", {
        worker_id: selectedWorker.id,
      });

      if (res.status === 200) {
        setMessage("Attendance marked successfully!");
        await fetchWorkerAttendance(selectedWorker.id);
        setShowCalendarModal(false);
      }
    } catch (error) {
      if (error.response?.status === 400 &&
        error.response.data.message === "Attendance already marked for today.") {
        setMessage(error.response.data.message);
        await fetchWorkerAttendance(selectedWorker.id);
      } else {
        console.error("Error marking attendance:", error);
        setMessage("Failed to mark attendance. Please try again.");
      }
    }
  };

  const markBulkAttendance = async () => {
    if (selectedWorkers.length === 0) {
      setBulkMessage("Please select at least one worker");
      return;
    }

    try {
      const responses = await Promise.all(
        selectedWorkers.map(workerId => 
          axios.post("http://localhost:5000/attendance/mark", {
            worker_id: workerId
          })
        )
      );

      const successfulMarks = responses.filter(res => res.status === 200).length;
      const alreadyMarked = responses.filter(res => 
        res.response?.status === 400 && 
        res.response.data.message === "Attendance already marked for today."
      ).length;

      setBulkMessage(
        `Successfully marked attendance for ${successfulMarks} workers. ` +
        `${alreadyMarked} workers already had attendance marked for today.`
      );

      // Refresh individual worker data if one is selected
      if (selectedWorker) {
        fetchWorkerAttendance(selectedWorker.id);
      }

      // Clear selections after marking
      setSelectedWorkers([]);
    } catch (error) {
      console.error("Error marking bulk attendance:", error);
      setBulkMessage("Failed to mark attendance for some workers. Please try again.");
    }
  };

  const toggleWorkerSelection = (workerId) => {
    setSelectedWorkers(prev => 
      prev.includes(workerId) 
        ? prev.filter(id => id !== workerId) 
        : [...prev, workerId]
    );
  };

  const generateCalendar = () => {
    const firstDay = new Date(selectedYear, selectedMonth, 1);
    const lastDay = new Date(selectedYear, selectedMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();
    let daysArray = [];

    for (let i = 0; i < startDay; i++) daysArray.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      daysArray.push(new Date(selectedYear, selectedMonth, d));
    }

    return daysArray;
  };

  return (
    <div>
      <OwnerSidebar />
      <div className="worker-attendance-container">
        <h2>Worker Attendance</h2>
        <p>Today: {todayDisplay}</p>

        <div className="attendance-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowBulkAttendance(!showBulkAttendance)}
          >
            {showBulkAttendance ? "Hide Bulk Attendance" : "Mark Attendance for Multiple Workers"}
          </button>

          {!selectedWorker ? (
            <button className="btn btn-secondary" onClick={() => setShowWorkerModal(true)}>
              Select Worker to View Details
            </button>
          ) : (
            <div className="worker-details">
              <p>
                Selected Worker: {selectedWorker.firstName} {selectedWorker.lastName}
              </p>
              <p>Total Days Attended: {totalAttendanceCount}</p>

              <button
                className={`btn ${attendanceMarked ? "btn-success" : "btn-primary"}`}
                onClick={markAttendance}
                disabled={attendanceMarked}
              >
                {attendanceMarked ? "Attendance Marked" : "Mark Attendance"}
              </button>
              <button className="btn btn-info" onClick={() => setShowCalendarModal(true)}>
                View Attendance Calendar
              </button>
              <button 
                className="btn btn-secondary" 
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
        </div>

        {message && <p className="alert alert-info">{message}</p>}

        {/* Bulk Attendance Section */}
        {showBulkAttendance && (
          <div className="bulk-attendance-section mt-4 p-3 border rounded">
            <h4>Mark Attendance for Multiple Workers</h4>
            <div className="workers-list">
              {workers.map(worker => (
                <div key={worker.id} className="worker-checkbox">
                  <input
                    type="checkbox"
                    id={`worker-${worker.id}`}
                    checked={selectedWorkers.includes(worker.id)}
                    onChange={() => toggleWorkerSelection(worker.id)}
                  />
                  <label htmlFor={`worker-${worker.id}`}>
                    {worker.firstName} {worker.lastName}
                  </label>
                </div>
              ))}
            </div>
            <button 
              className="btn btn-primary mt-2"
              onClick={markBulkAttendance}
              disabled={selectedWorkers.length === 0}
            >
              Mark Attendance for Selected Workers
            </button>
            <button
              className="btn btn-secondary mt-2"
              onClick={() => {
                if (selectedWorkers.length === workers.length) {
                  setSelectedWorkers([]);
                } else {
                  setSelectedWorkers(workers.map(worker => worker.id));
                }
              }}
            >
              {selectedWorkers.length === workers.length ? "Deselect All" : "Select All"}
            </button>
              
            {bulkMessage && <p className="alert alert-info mt-2">{bulkMessage}</p>}
          </div>
        )}
      </div>

      {/* Worker Selection Modal */}
      {showWorkerModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content shadow-lg rounded">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Select a Worker</h5>
                <button type="button" className="close text-white" onClick={() => setShowWorkerModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <label htmlFor="workerSelect" className="form-label">Choose from the list:</label>
                <select
                  id="workerSelect"
                  className="form-control"
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    const worker = workers.find(w => w.id == selectedId);
                    setSelectedWorker(worker || null);
                    setShowWorkerModal(false);
                  }}
                >
                  <option value="">-- Select a Worker --</option>
                  {workers.map(worker => (
                    <option key={worker.id} value={worker.id}>
                      {worker.firstName} {worker.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowWorkerModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Modal */}
      {showCalendarModal && selectedWorker && (
        <div className="modal show fade d-block" onClick={() => setShowCalendarModal(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5>
                  Attendance Calendar for {selectedWorker.firstName} {selectedWorker.lastName}
                </h5>
                <button className="close" onClick={() => setShowCalendarModal(false)}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group d-flex gap-2 mb-3">
                  <select
                    className="form-control"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i}>
                        {new Date(0, i).toLocaleString("default", { month: "long" })}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    className="form-control"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                  />
                </div>
                <div className="calendar-grid">
                  {generateCalendar().map((date, idx) => {
                    if (!date) return <div key={idx} className="calendar-cell empty-cell"></div>;
                    const isoDate = date.toISOString().slice(0, 10);
                    const isMarked = attendanceDates.includes(isoDate);
                    return (
                      <div
                        key={idx}
                        className={`calendar-cell ${isMarked ? "attended-cell" : "not-attended-cell"}`}
                      >
                        {date.getDate()}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="modal-footer">
                {!attendanceMarked && (
                  <button className="btn btn-primary" onClick={markAttendance}>
                    Mark Attendance for Today
                  </button>
                )}
                <button className="btn btn-secondary" onClick={() => setShowCalendarModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerMarksWorkerAttendance;
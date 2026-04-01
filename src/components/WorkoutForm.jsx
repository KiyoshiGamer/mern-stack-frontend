import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";


const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()
    const [title, setTitle] = useState("")
    const [load, setLoad] = useState("")
    const [reps, setReps] = useState("")
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const { user } = useAuthContext();
    // fucnction to handle submit  workout
    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('You must be logged in')
            return
        }

        // store the workout details to an object
        const workout = {title, load, reps}
        // frontend talks to the backend
        // fetch(url, options)
        const API_URL = import.meta.env.VITE_API_URL
        const response = await fetch(`${API_URL}/api/workouts`, {
            method: 'POST',
            // this is the content of the request and send this
            // http request can only send strings or text so we need to stringify it
            body: JSON.stringify(workout),
            // mandatory
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
                    
            }
        })

        const json = await response.json()
        
        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        
        if(response.ok) {
            setTitle("")
            setLoad("")
            setReps("")
            setError(null)
            setEmptyFields([])
            console.log('new workout added', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100" style={{background: "var(--bs-light)"}}>
  <div style={{width: "100%", maxWidth: "480px"}} className="p-3">
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body p-4">

        {/* Header */}
        <div className="d-flex align-items-center gap-2 mb-4">
          <div className="rounded-3 d-flex align-items-center justify-content-center bg-success" style={{width: 40, height: 40, flexShrink: 0}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
              <path d="M11.5 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm-4 0a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm-5 1A1.5 1.5 0 0 1 4 3.5h1a.5.5 0 0 1 0 1H4a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h1a.5.5 0 0 1 0 1H4A1.5 1.5 0 0 1 2.5 12V5zm9 0A1.5 1.5 0 0 1 12 3.5h1A1.5 1.5 0 0 1 14.5 5v7a1.5 1.5 0 0 1-1.5 1.5h-1a.5.5 0 0 1 0-1h1a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 1 0-1h1z"/>
            </svg>
          </div>
          <div>
            <h5 className="mb-0 fw-semibold">Log Workout</h5>
            <p className="mb-0 text-muted" style={{fontSize: 13}}>Track your exercise progress</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-3">
            <label className="form-label fw-medium text-secondary text-uppercase" style={{fontSize: 13, letterSpacing: ".3px"}}>
              Exercise Title
            </label>
            <input
              type="text"
              className={`form-control form-control-lg rounded-3 ${emptyFields.includes('title') ? "border-danger" : ""}`}
              placeholder="e.g. Bench Press"
              style={{fontSize: 15}}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Load & Reps */}
          <div className="row g-3 mb-4">
            <div className="col-6">
              <label className="form-label fw-medium text-secondary text-uppercase" style={{fontSize: 13, letterSpacing: ".3px"}}>
                Load
              </label>
              <div className="input-group input-group-lg">
                <input
                  type="number"
                  className={`form-control rounded-start-3 ${emptyFields.includes('load') ? "border-danger" : ""}`}
                  placeholder="0"
                  style={{fontSize: 15}}
                  value={load}
                  onChange={(e) => setLoad(e.target.value)}
                />
                <span className="input-group-text rounded-end-3 bg-light text-secondary" style={{fontSize: 13}}>kg</span>
              </div>
            </div>
            <div className="col-6">
              <label className="form-label fw-medium text-secondary text-uppercase" style={{fontSize: 13, letterSpacing: ".3px"}}>
                Reps
              </label>
              <div className="input-group input-group-lg">
                <input
                  type="number"
                  className={`form-control rounded-start-3 ${emptyFields.includes('reps') ? "border-danger" : ""}`}
                  placeholder="0"
                  style={{fontSize: 15}}
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                />
                <span className="input-group-text rounded-end-3 bg-light text-secondary" style={{fontSize: 13}}>×</span>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="d-grid">
            <button className="btn btn-success btn-lg rounded-3 fw-medium">
              Add Workout
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="alert alert-danger rounded-3 mt-3 py-2 mb-0 d-flex align-items-center gap-2" style={{fontSize: 14}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
              </svg>
              {error}
            </div>
          )}
        </form>

      </div>
    </div>
    <p className="text-center text-muted mt-3 mb-0" style={{fontSize: 12}}>All fields are required</p>
  </div>
</div>
    );
}

export default WorkoutForm
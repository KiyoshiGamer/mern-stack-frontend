import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleDelete = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card border-0 shadow-sm mb-3 bg-white rounded-3">
        <div className="card-body">
          <h5 className="fw-semibold mb-3 text-dark">{workout.title}</h5>

          <p className="mb-1 text-secondary">
            <strong>Load:</strong> {workout.load} kg
          </p>

          <p className="mb-2 text-secondary">
            <strong>Reps:</strong> {workout.reps}
          </p>

          <p className="text-muted small mb-3">
            {formatDistanceToNow(new Date(workout.createdAt), {
              addSuffix: true,
            })}
          </p>

          <div className="text-end">
            <button
              onClick={handleDelete}
              className="btn btn-outline-danger btn-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetails;

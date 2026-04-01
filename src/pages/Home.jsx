import { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await fetch(`${API_URL}/api/workouts`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_WORKOUTS", payload: json });
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (user) {
      fetchWorkout();
    }
  }, [dispatch, user]);
  return (
   <div className="Home min-vh-100" style={{ backgroundColor: "#DEDEDE", padding: "20px" }}>
  <div className="container mt-4">
    <div className="row g-4">
      <div className="col-12 col-lg-8">
        <div className="row g-3">
          {workouts &&
            workouts.map((workout) => (
              <WorkoutDetails key={workout._id} workout={workout} />
            ))}
        </div>
      </div>
      <div className="col-12 col-lg-4">
        <div className="sticky-top" style={{ top: "20px" }}>
          <WorkoutForm />
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Home;

import React from "react";
import { useNavigation } from "react-router-dom";

const SubmitButton = ({ text }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <button
      className="btn btn-success my-3 btn-block capitalize text-[aliceblue] text-lg"
      type="submit"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <span className="loading loading-spinner">Logging you in...</span>
      ) : (
        text
      )}
    </button>
  );
};
export default SubmitButton;

import { forwardRef } from "react";
import PropTypes from "prop-types";
import "./input.scss";

const Input = forwardRef(
  (
    {
      name = "",
      type = "text",
      placeholder = "",
      errors,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-100">
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          className="login__form-input"
          {...props}
          ref={ref}
        />
        {errors[name] && (
          <p className="error-message text-danger">{errors[name].message}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Input;

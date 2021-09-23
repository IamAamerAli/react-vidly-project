const Select = ({ name, label, value, onChange, options, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        class="form-control form-select"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      >
        <option selected>Select Genre</option>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;

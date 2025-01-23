const InputField = ({ id, label, type, placeholder, register, errors, requiredMessage }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
        {...register(id, { required: requiredMessage })}
      />
      {errors[id] && <p className="text-red-500 text-sm">{errors[id].message}</p>}
    </div>
  );
};

export default InputField;


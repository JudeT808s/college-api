import { useFormContext } from 'react-hook-form'
import   IsFormInvalid  from '../utils/IsFormInvalid'
import FindInputError from '../utils/FindInputError';

 const Input = ({ label, type, id, placeholder }) => {
   const { register,
     formState: { errors },
   } = useFormContext();

  const inputError = FindInputError(errors, label);
   const isInvalid = IsFormInvalid(inputError);

   const InputError = ({ message }) => {
    return (
      <p className="flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md"
        {...custom_error}>
        {message}
      </p>
    )
  }
  const custom_error = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2 },
  };
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-capitalize">{label}</span>
      </label>
      {isInvalid && (
        <InputError
          message={inputError.error.message}
          key={inputError.error.message}
        />
      )}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="input input-bordered bg-base-100 border border-base-200"
        {...register(label, {
          required: {
            value: true,
            message: 'required',
          },
        })}
      />
    </div>
  );
};




 export default Input;
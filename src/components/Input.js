import { useFormContext } from 'react-hook-form'
// import { findInputError, isFormInvalid } from '../utils/findInputError'

const Input = ({ label, type, id, placeholder }) => {
    const { register, formState: {errors}, } = useFormContext()
    const inputError = findInputError(errors, label)
  const isInvalid = isFormInvalid(inputError)
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
    )
}
  
  
const InputError = ({ message }) => {
    return (
        <p className="flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md"{...framer_error}>      {message}
        </p>
    )
}
  const framer_error = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2 },
}
export default Input;
const findInputError = (errors, inputName) => {
    const error = errors[inputName];
    if (error) {
        return error.message;
    }
    return null;
}
export default findInputError;
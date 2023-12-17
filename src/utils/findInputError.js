const FindInputError = (errors, inputName) => {
    const error = errors[inputName];
    if (error) {
        return error.message;
    }
    return null;
}
export default FindInputError;
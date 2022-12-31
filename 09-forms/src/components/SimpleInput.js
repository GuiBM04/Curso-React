import useInput from '../hooks/use-input';

function SimpleInput(props) {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput
  } = useInput(value => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput(value => value.includes("@"));

  let formIsValid

  if(enteredNameIsValid && enteredEmailIsValid) {
      formIsValid = true;
  }

  function submitHandler(event) {
    event.preventDefault();

    if(!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);
    console.log(enteredEmail);

    // nameInputRef.current.value = ""; => NOT IDEAL
    resetNameInput();
    resetEmailInput();
  }

  const nameInputClasses = nameInputHasError ? "form-control invalid" : "form-control";
  const emailInputClasses = emailInputHasError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text'
               id='name'
               onChange={nameInputChangeHandler}
               onBlur={nameBlurHandler}
               value={enteredName}
               />
        {nameInputHasError && <p className='error-text'>Name must not be empty.</p>}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor='email'>Your Email</label>
        <input type='email'
                id='email'
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                value={enteredEmail}
                />
        {emailInputHasError && <p className='error-text'>Email must not be empty.</p>}
      </div>

      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
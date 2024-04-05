export function sanitizeInput(inputValue) {
  const maxlength = 65535;          //Maximum length for varchar in mysql
  let output = inputValue.toString()
  output = output.trim();   //Remove white spaces

  const regexPattern = /^[a-zA-Z0-9.,<>'\s=-]+$/;

  if (
    !regexPattern.test(output) ||   //If the user input contains blacklisted characters
    output.length > maxlength       //If input will cause buffer overflow in mysql.
  ) {
    return false;
  } else {
    return output;
  }
}

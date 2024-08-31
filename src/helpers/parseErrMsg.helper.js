export const parseErrorMessage = (responseHTMLString) => {

    const parser = new DOMParser();
    const responseDocument = parser.parseFromString(responseHTMLString, "text/html");
    const errorMessageElement = responseDocument.querySelector("pre");
  
    if (errorMessageElement) {
      const errorMessage = errorMessageElement.textContent.match(/^Error:\s*(.*?)(?=\s*at)/);
      if (errorMessage && errorMessage[1]) {
        return errorMessage[1].trim();
      }
    }
  
    return "Something went wrong 😕";
  };
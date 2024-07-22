const initializeApplication = async () => {
  try {
    const response = await fetch("http://macolx.com/resource-hub-server/init");
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    console.log("Initialized sucessfully");
  } catch (e) {
    console.log("Unecpexted Error Occured", e);
  }
};
const loginRequestHandler = async (email, password) => {
  try {
    const response = await fetch(
      "http://macolx.com/resource-hub-server/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    console.log("Login sucessfully");
    return response.json();
  } catch (e) {
    console.log("Unexpected Error Occured", e);
  }
};
const registerRequestHandler = async (email) => {
  try {
    const response = await fetch(
      "http://macolx.com/resource-hub-server/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    console.log("Initialized sucessfully");
  } catch (e) {
    console.log("Unecpexted Error Occured", e);
  }
};

export { initializeApplication, loginRequestHandler, registerRequestHandler };

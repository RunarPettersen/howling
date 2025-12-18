const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  
    window.location.href = "./login.html";
  };

  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();
      logout();
    });
  }  
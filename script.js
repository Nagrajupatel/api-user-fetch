document.addEventListener("DOMContentLoaded", () => {
  const userList = document.getElementById("userList");
  const reloadBtn = document.getElementById("reloadBtn");
  const errorDiv = document.getElementById("error");
  const successDiv = document.getElementById("success");

  function displayUsers(users) {
    userList.innerHTML = "";
    users.forEach(user => {
      const card = document.createElement("div");
      card.className = "user-card";
      card.innerHTML = `
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
      `;
      userList.appendChild(card);
    });
  }

  function fetchUsers() {
    console.log("Fetching users...");
    errorDiv.textContent = "Loading users...";
    successDiv.textContent = ""; // Clear previous success

    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        if (!response.ok) throw new Error("Failed to fetch users.");
        return response.json();
      })
      .then(data => {
        displayUsers(data);
        errorDiv.textContent = "";

        // ✅ Show success message
        successDiv.textContent = "✅ Reloaded successfully!";
        setTimeout(() => {
          successDiv.textContent = "";
        }, 3000);
      })
      .catch(error => {
        userList.innerHTML = "";
        errorDiv.textContent = "⚠️ Could not fetch users. Please check your internet.";
        console.error(error);
      });
  }

  reloadBtn.addEventListener("click", fetchUsers);
  fetchUsers(); // Initial load
});

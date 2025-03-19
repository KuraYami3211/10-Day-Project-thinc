document.getElementById("login").addEventListener("click", async () => {
    // ส่งคำขอไปยัง backend เพื่อ login
    const response = await fetch("http://localhost:5000/auth/google");
    const data = await response.json();

    if (data.token) {
      // เก็บ token ใน localStorage
      localStorage.setItem("token", data.token);

      // เปลี่ยนเส้นทางไปยังหน้า Home
      window.location.href = "home.html";
    } else {
      alert("Login failed!");
    }
  });

// document.getElementById("login").addEventListener("click", async () => {
//   try {
//       // Fetch request to the backend for Google Login
//       const response = await fetch("http://localhost:5000/auth/google");
      
//       if (!response.ok) {
//           throw new Error("Failed to login");
//       }

//       const data = await response.json();

//       if (data.token) {
//           // Redirect to Home page with token in URL
//           window.location.href = `home.html?token=${data.token}`;
//       } else {
//           alert("Login failed: Token not received!");
//       }
//   } catch (error) {
//       console.error("Login error:", error);
//       alert("An error occurred during login. Please try again.");
//   }
// });

// document.getElementById("login").addEventListener("click", () => {
//     // Redirect user to Google Login via backend
//     window.location.href = "http://localhost:5000/auth/google";
// });
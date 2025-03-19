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
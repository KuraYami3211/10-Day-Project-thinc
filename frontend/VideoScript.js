const courseData = localStorage.getItem("courseData");
const courseDataJson = JSON.parse(courseData);

const logo = document.getElementById("courseLogo");
logo.src = courseDataJson.imageUrl;
const courseID = document.getElementById("courseID");
courseID.innerHTML = courseDataJson.courseId;

const courseName = document.getElementById("courseName");
courseName.innerHTML = courseDataJson.courseName;
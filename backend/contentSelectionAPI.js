const express = require("express");
const path = require("path");
const app = express();
const course = require("./data/courseInfo.js");
const file = require("./data/file.js")
const PORT = process.env.CONTENT_API_PORT || 6000;

app.use(express.static("frontend"));

app.use(express.json());


app.post("/recommend", (req, res) => {
  const { department , year} = req.body;
  if(!department || !year)
  {
    return res.status(400).json({error: "กรุณากรอกภาควิชาและชั้นปี"});
  }
  const recommendedCourses = course.filter(course =>
    course.department == department && course.year == year
  );
  res.json({recommendedCourses});
}
);

app.get("/", (req, res) =>{
  res.sendFile(path.join(__dirname,"..","frontend","firsthome.html"))
});


app.post("/list-file", (req, res) => {
  const { courseID, term } = req.body;

  if (!courseID || !term) {
    return res.status(400).json({ error: "กรุณากรอกภาควิชาและชั้นปี" });
  }

  // Find the course in the `file` array
  const course = file.find((c) => c.courseID === courseID);

  if (!course) {
    return res.status(404).json({ error: "ไม่พบรหัสวิชานี้" });
  }

  if (term === "midterm") {
    return res.json({ files: course.midterm });
  } else if (term === "final") {
    return res.json({ files: course.final });
  } else {
    return res.status(400).json({ error: "กรุณาระบุภาคการสอบให้ถูกต้อง (midterm หรือ final)" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

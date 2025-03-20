const express = require("express");
const path = require("path");
const app = express();
const course = require("./data/courseInfo.js");
const file = require("./data/file.js")
const port = 3000;

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

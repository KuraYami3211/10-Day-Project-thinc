const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static("frontend"));

app.use(express.json());

  

const course = [
  // { couseID:"2301107",courseName: "Cal I", department: "วิศวกรรมคอมพิวเตอร์(CP)", year: 1 },
  // { couseID:"2301108",courseName: "Cal II", department: "วิศวกรรมคอมพิวเตอร์(CP)", year: 2 },
  // { couseID:"2301103",courseName: "Gen Phy I", department: "วิศวกรรมคอมพิวเตอร์(CP)", year: 1 },
  // { couseID:"2304104",courseName: "Gen Phy II", department: "วิศวกรรมคอมพิวเตอร์(CP)", year: 2 },
  // { couseID:"2302127",courseName: "Gen Chem", department: "วิศวกรรมคอมพิวเตอร์(CP)", year: 2 },
  // { couseID:"2110215",courseName: "Prog Meth", department: "วิศวกรรมคอมพิวเตอร์(CP)", year: 2 },
  // { couseID:"2110221",courseName: "Com Eng Ess", department: "วิศวกรรมคอมพิวเตอร์(CP)", year: 2 },
  { couseID:"2110101",courseName: "Com Prog", department: "วิศวกรรมคอมพิวเตอร์(CP)", year: "1/1" },
];

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
  res.sendFile(path.join(__dirname,"..","frontend","Content_Selection.html"))
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

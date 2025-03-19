const engineeringMajors = [
    // "วิศวกรรมโยธา", "วิศวกรรมไฟฟ้า", "วิศวกรรมเครื่องกล",
    // "วิศวกรรมยานยนต์", "วิศวกรรมอุตสาหการ", "วิศวกรรมเคมี",
    // "วิศวกรรมทรัพยากรธรณี", "วิศวกรรมปิโตรเลียม", "วิศวกรรมสิ่งแวดล้อม",
    // "วิศวกรรมสำรวจ", "วิศวกรรมโลหการและวัสดุ", "วิศวกรรมคอมพิวเตอร์(CP)",
    // "วิศวกรรมคอมพิวเตอร์และเทคโนโลยีดิจิทัล(CEDT)", "วิศวกรรมนิวเคลียร์และรังสี",
    // "วิศวกรรมการออกแบบและการผลิตยานยนต์ (ASME)", "วิศวกรรมนาโน(NANO) ",
    // "วิศวกรรมสารสนเทศและการสื่อสาร (ICE)", "วิศวกรรมอากาศยาน(AERO)",
    // "วิศวกรรมหุ่นยนต์และปัญญาประดิษฐ์ (AI)", "วิศวกรรมเคมีและกระบวนการ (CHEPE)",
    // "วิศวกรรมเซมิคอนดักเตอร์"
    "วิศวกรรมคอมพิวเตอร์(CP)"
];

const academicYears = ["1/1", "1/2",
    //  "2/1", "2/2", "3/1", "3/2", "4/1", "4/2"
    ]; // ปีการศึกษา

// ฟังก์ชัน Autocomplete
function setupAutocomplete(inputElement, suggestionElement, dataList) {
    inputElement.addEventListener("input", function () {
        const query = this.value.toLowerCase();
        suggestionElement.innerHTML = ""; // ล้างรายการก่อนแสดงผลใหม่
        if (!query) {
            suggestionElement.style.display = "none"; // ซ่อนรายการถ้าไม่มีการพิมพ์
            return;
        }

        const filtered = dataList.filter(item => item.toLowerCase().includes(query));
        suggestionElement.style.display = filtered.length ? "block" : "none"; // แสดงเฉพาะเมื่อมีรายการแนะนำ

        filtered.forEach(item => {
            const div = document.createElement("div");
            div.textContent = item;
            div.addEventListener("click", () => {
                inputElement.value = item;
                suggestionElement.innerHTML = ""; // ซ่อนรายการเมื่อเลือก
                suggestionElement.style.display = "none"; // ซ่อนหลังจากเลือก
            });
            suggestionElement.appendChild(div);
        });
    });
    

    // ซ่อนรายการแนะนำเมื่อคลิกที่อื่น
    document.addEventListener("click", (e) => {
        if (!inputElement.contains(e.target) && !suggestionElement.contains(e.target)) {
            suggestionElement.innerHTML = "";
            suggestionElement.style.display = "none"; // ซ่อนเมื่อคลิกข้างนอก
        }
    });
}

async function recommendedCourses() {
    const department = userMajor.value;
    const year = userYear.value;
    const resultContainer = document.getElementById("course-container");

    // Check if the result container exists
    if (!resultContainer) {
        console.error("course-container not found in the DOM!");
        return;
    }
    else{
        console.log(resultContainer);
    }
    resultContainer.innerHTML = "";
    const response = await fetch("http://localhost:3000/recommend", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ department, year }),
    });

    const data = await response.json();

    if (data.recommendedCourses) {
        data.recommendedCourses.forEach(course => {
            const courseContainer = document.createElement("div");
            courseContainer.className = "course-card-selected";
            
            const link = document.createElement("a");
            link.href = "Video_Lessons.html";
            link.id ="course-link";
            link.addEventListener("click", function(event) {
                // Prevent the default navigation to allow for data storage first
                event.preventDefault();
            
                // Store the course data in localStorage
                const courseData = {
                  courseId: course.courseID,
                  courseName: course.courseName,
                  imageUrl: "img/" + course.courseID + ".png"
                };
            
                localStorage.setItem("courseData", JSON.stringify(courseData));
            
                // Now navigate to the Video_Lessons.html page
                window.location.href = "Video_Lessons.html";
              });

            const courseImg = document.createElement("img");
            courseImg.src = "img/" + course.courseID + ".png";

            courseImg.className = "course-icon";

            const courseInfo = document.createElement("div");
            courseInfo.className = "course-info";

            const courseID = document.createElement("h2");
            courseID.innerHTML = course.courseID ; // Fallback if courseID is missing

            const courseName = document.createElement("h3");
            courseName.innerHTML = course.courseName || "No Name Available"; // Fallback if courseName is missing

            const courseDetail = document.createElement("p");
            courseDetail.innerHTML = course.courseDetail || "Course Description"; // Fallback if courseName is missing

            const courseFilter = document.createElement("input");
            courseFilter.type = "checkbox";
            courseDetail.innerHTML = course.courseDetail || "Course Description";

            courseInfo.appendChild(courseID);
            courseInfo.appendChild(courseName);
            courseInfo.appendChild(courseDetail);

            

            courseContainer.appendChild(courseImg);
            courseContainer.appendChild(courseInfo);
            courseContainer.appendChild(courseFilter);
            link.appendChild(courseContainer);
            resultContainer.appendChild(link);
        });
    } else {
        resultContainer.innerHTML = `<li>${data.message}</li>`;
    }
};



// ใช้งานกับ Major
const userMajor = document.getElementById("major");
const majorSuggestionList = document.getElementById("majorSuggestionList");
setupAutocomplete(userMajor, majorSuggestionList, engineeringMajors);

// ใช้งานกับ Year
const userYear = document.getElementById("year");
const yearSuggestionList = document.getElementById("YearSuggestionList");
setupAutocomplete(userYear, yearSuggestionList, academicYears);
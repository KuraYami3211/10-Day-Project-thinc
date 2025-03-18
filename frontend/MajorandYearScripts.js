const engineeringMajors = [
    "วิศวกรรมโยธา", "วิศวกรรมไฟฟ้า", "วิศวกรรมเครื่องกล",
    "วิศวกรรมยานยนต์", "วิศวกรรมอุตสาหการ", "วิศวกรรมเคมี",
    "วิศวกรรมทรัพยากรธรณี", "วิศวกรรมปิโตรเลียม", "วิศวกรรมสิ่งแวดล้อม",
    "วิศวกรรมสำรวจ", "วิศวกรรมโลหการและวัสดุ", "วิศวกรรมคอมพิวเตอร์(CP)",
    "วิศวกรรมคอมพิวเตอร์และเทคโนโลยีดิจิทัล(CEDT)", "วิศวกรรมนิวเคลียร์และรังสี",
    "วิศวกรรมการออกแบบและการผลิตยานยนต์ (ASME)", "วิศวกรรมนาโน(NANO) ",
    "วิศวกรรมสารสนเทศและการสื่อสาร (ICE)", "วิศวกรรมอากาศยาน(AERO)",
    "วิศวกรรมหุ่นยนต์และปัญญาประดิษฐ์ (AI)", "วิศวกรรมเคมีและกระบวนการ (CHEPE)",
    "วิศวกรรมเซมิคอนดักเตอร์"
];

const academicYears = ["1", "2", "3", "4", "5", "6", "7", "8"]; // ปีการศึกษา

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


// ใช้งานกับ Major
const userMajor = document.getElementById("major");
const majorSuggestionList = document.getElementById("majorSuggestionList");
setupAutocomplete(userMajor, majorSuggestionList, engineeringMajors);

// ใช้งานกับ Year
const userYear = document.getElementById("year");
const yearSuggestionList = document.getElementById("YearSuggestionList");
setupAutocomplete(userYear, yearSuggestionList, academicYears);
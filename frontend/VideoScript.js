const courseData = localStorage.getItem("courseData");
const courseDataJson = JSON.parse(courseData);

const logo = document.getElementById("courseLogo");
logo.src = courseDataJson.imageUrl;
const courseID = document.getElementById("courseID");
courseID.innerHTML = courseDataJson.courseId;

const courseName = document.getElementById("courseName");
courseName.innerHTML = courseDataJson.courseName;
courseName.innerHTML = courseDataJson.courseName;

const courseSyllabusSel = document.getElementById("courseSyllabus");

// Load PDF.js only once
if (!window.pdfjsLib) {
    const lib = document.createElement("script");
    lib.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js";
    lib.onload = function () {
        console.log("PDF.js Loaded Successfully!");
    };
    document.head.appendChild(lib);
}

courseSyllabusSel.addEventListener("click", function () {
    const pdfFile = "PDF/2301107/" + courseDataJson.courseId + "_coursesyllabus.pdf";

    // Remove existing container if it exists
    let existingContainer = document.getElementById("pdfContainer");
    if (existingContainer) {
        existingContainer.remove();
    }

    // Create a scrollable container
    const container = document.createElement("div");
    container.id = "pdfContainer";
    container.style.width = "100%";
    container.style.height = "500px"; // Adjust height as needed
    container.style.overflowY = "auto"; // Enable scrolling
    container.style.border = "1px solid #ccc";
    container.style.padding = "10px";
    container.style.background = "#f9f9f9";

    const main = document.getElementById("main");
    main.appendChild(container);

    // Wait until PDF.js is loaded
    if (window.pdfjsLib) {
        loadPDF(pdfFile, container);
    } else {
        console.error("PDF.js is not loaded yet.");
    }
});

// Function to load PDF with multiple pages
function loadPDF(pdfFile, container) {
    var loadingTask = pdfjsLib.getDocument(pdfFile);
    loadingTask.promise
        .then(function (pdf) {
            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                pdf.getPage(pageNum).then(function (page) {
                    var scale = 1.5;
                    var viewport = page.getViewport({ scale: scale });

                    var canvas = document.createElement("canvas");
                    canvas.style.display = "block";
                    canvas.style.marginBottom = "10px"; // Space between pages
                    container.appendChild(canvas);

                    var context = canvas.getContext("2d");
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;

                    var renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    page.render(renderContext);
                });
            }
        })
        .catch(function (error) {
            console.error("Error loading PDF:", error);
        });
}

const infoItems = document.getElementsByClassName("menu-item");

for (let i = 1; i < infoItems.length; i++) {
    infoItems[i].addEventListener("click", function () {
        if (!this.querySelector("#fileTodownload")) {
            const container = document.createElement("div");
            container.className = "item";
            const fileTodownload = document.createElement("span");
            fileTodownload.id = "fileTodownload";
            fileTodownload.innerHTML = "File";
            if(i == 1)
            {
                fileTodownload.addEventListener("click",function()
                {
                    fileDisplay("midterm");
                });
            }
            else if(i == 2)
            {
                fileTodownload.addEventListener("click",function()
                {
                    fileDisplay("final");
                });
            }


            const video = document.createElement("span");
            video.id = "video";
            video.innerHTML = "Video";
            video.addEventListener("click",function()
                {
                    VideoDisplay();
                });

            const exam = document.createElement("span");
            exam.innerHTML = "Mock Exam";
            
            container.appendChild(fileTodownload);
            container.appendChild(video);
            container.appendChild(exam);
            this.appendChild(container);
        }
    });
};

async function fileDisplay(term)
{
    const main = document.getElementById("main");
    main.innerHTML ="";
    const sb = document.getElementById("pdfContainer");
    const div = document.createElement("div");
    const ul = document.createElement("ul");
    div.id = "filecontainer";
    const response = await fetch("http://localhost:3000/list-file", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseID: courseDataJson.courseId, term:term })
    });
    const data = await response.json();
    if (data.files && Array.isArray(data.files)) {
        for (let i = 0; i < data.files.length; i++) {
            const name = data.files[i];
            const url = "PDF/2301107/" + name; // Fix incorrect concatenation
    
            const li = document.createElement("li");
            li.id = "file";
            const a = document.createElement("a");
            a.href = url;
            a.innerHTML = name;
            li.appendChild(a);
            ul.appendChild(li);
        }
    } else {
        console.error("No files found:", data.error || "Unknown error");
    }
    const existingUl = document.querySelector("#main ul");
    if (existingUl) {
    existingUl.remove();
    }
    if(sb)
    {
        sb.remove();
    }
    const existingh2 = document.querySelector("#main h2");
    if (existingh2) {
        existingh2.remove();
        }
    const head = document.createElement("h2");
    head.innerHTML = "All File";
    div.appendChild(head);
    div.appendChild(ul);
    main.appendChild(div);
}
function VideoDisplay() {
    const main = document.getElementById("main");

    if (main) {
        main.innerHTML = `
            <div class="video-container">
                <iframe 
                    class="video-frame"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
        `;
    } else {
        console.error("Element with id 'main' not found.");
    }
}
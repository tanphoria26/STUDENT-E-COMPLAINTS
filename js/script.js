
document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       PASSWORD VISIBILITY (LOGIN & REGISTRATION)
    ===================================================== */

    document.querySelectorAll(".toggle-password").forEach(toggle => {
        toggle.addEventListener("change", function () {
            const target = document.getElementById(this.dataset.target);

            if (target) {
                target.type = this.checked ? "text" : "password";
            }
        });
    });

    /* =====================================================
       DEMO LOGIN AUTO-FILL
    ===================================================== */

    const userTypeSelect = document.getElementById("userType");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    if (userTypeSelect && usernameInput && passwordInput) {
        userTypeSelect.addEventListener("change", function () {

            if (this.value === "admin") {
                usernameInput.value = "admin";
                passwordInput.value = "admin123";
            }
            else if (this.value === "student") {
                usernameInput.value = "demostudent";
                passwordInput.value = "student123";
            }
            else {
                usernameInput.value = "";
                passwordInput.value = "";
            }

        });
    }

    /* =====================================================
       1. LOGIN PAGE
    ===================================================== */

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const userType = document.getElementById("userType").value;
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value;

            const adminAccount = {
                username: "admin",
                password: "admin123"
            };

            const demoStudent = {
                fullName: "Demo Student",
                studentId: "2026123456",
                email: "demo.student@uitm.edu.my",
                username: "demostudent",
                password: "student123"
            };

            // Admin login
            if (
                userType === "admin" &&
                username === adminAccount.username &&
                password === adminAccount.password
            ) {
                localStorage.setItem("currentUser", JSON.stringify({
                    role: "admin",
                    username: username
                }));

                alert("Welcome, Administrator!");
                window.location.href = "admin-dashboard.html";
                return;
            }

            // Student login
            if (userType === "student") {

                const users = JSON.parse(
                    localStorage.getItem("registeredUsers") || "[]"
                );

                const allUsers = [demoStudent, ...users];

                const student = allUsers.find(user =>
                    String(user.username).toLowerCase() === username.toLowerCase() &&
                    user.password === password
                );

                if (student) {

                    localStorage.setItem("studentName", student.fullName);
                    localStorage.setItem("studentId", student.studentId);

                    localStorage.setItem("currentUser", JSON.stringify({
                        role: "student",
                        username: student.username
                    }));

                    alert("Login successful! Welcome, " + student.fullName + "!");
                    window.location.href = "student-dashboard.html";
                    return;
                }
            }

            alert("Invalid username or password. Please try again.");

        });
    }

    /* =====================================================
       2. REGISTRATION PAGE
    ===================================================== */

    const registerForm = document.getElementById("registerForm");

    if (registerForm) {

        const demoFullName = document.getElementById("fullName");
        const demoStudentId = document.getElementById("studentId");
        const demoEmail = document.getElementById("email");
        const demoUsername = document.getElementById("regUsername");
        const demoPassword = document.getElementById("regPassword");
        const demoConfirmPassword = document.getElementById("confirmPassword");

        if (demoFullName) demoFullName.value = "Demo Student";
        if (demoStudentId) demoStudentId.value = "2026123456";
        if (demoEmail) demoEmail.value = "demo.student@uitm.edu.my";
        if (demoUsername) demoUsername.value = "demostudent";
        if (demoPassword) demoPassword.value = "student123";
        if (demoConfirmPassword) demoConfirmPassword.value = "student123";

        registerForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const fullName = document.getElementById("fullName").value.trim();
            const studentId = document.getElementById("studentId").value.trim();
            const email = document.getElementById("email").value.trim().toLowerCase();
            const username = document.getElementById("regUsername").value.trim();
            const password = document.getElementById("regPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            const message = document.getElementById("registerMessage");

            if (!message) return;

            if (password !== confirmPassword) {
                message.style.color = "red";
                message.textContent = "Passwords do not match!";
                return;
            }

            if (password.length < 8) {
                message.style.color = "red";
                message.textContent = "Password must contain at least 8 characters.";
                return;
            }

            let users = JSON.parse(
                localStorage.getItem("registeredUsers") || "[]"
            );

            const existingUser = users.find(user =>
                user.username.toLowerCase() === username.toLowerCase() ||
                user.studentId.toLowerCase() === studentId.toLowerCase() ||
                user.email.toLowerCase() === email
            );

            if (existingUser) {
                message.style.color = "red";
                message.textContent =
                    "Username, Student ID or email is already registered!";
                return;
            }

            const newUser = {
                fullName: fullName,
                studentId: studentId,
                email: email,
                username: username,
                password: password
            };

            users.push(newUser);

            localStorage.setItem("registeredUsers", JSON.stringify(users));

            message.style.color = "green";
            message.textContent =
                "Registration successful! Redirecting to login...";

            registerForm.reset();

            setTimeout(function () {
                window.location.href = "index.html";
            }, 1500);

        });
    }

    /* =====================================================
       3. STUDENT DASHBOARD
    ===================================================== */

    const studentComplaintTable = document.getElementById("complaintTable");

    if (studentComplaintTable) {

        const studentName = localStorage.getItem("studentName");
        const studentId = localStorage.getItem("studentId");

        const currentUser = JSON.parse(
            localStorage.getItem("currentUser") || "null"
        );

        if (!currentUser || currentUser.role !== "student") {
            window.location.href = "index.html";
            return;
        }

        const displayName = document.getElementById("displayName");
        const welcomeName = document.getElementById("welcomeName");
        const profileName = document.getElementById("profileName");
        const profileId = document.getElementById("profileId");

        if (displayName) displayName.textContent = studentName || "Student User";
        if (welcomeName) welcomeName.textContent = studentName || "Student";
        if (profileName) profileName.textContent = studentName || "Student User";
        if (profileId) profileId.textContent = studentId || "Not provided";

        function displayStudentComplaints() {

            const allComplaints = JSON.parse(
                localStorage.getItem("studentComplaints") || "[]"
            );

            const studentComplaints = allComplaints.filter(
                complaint => complaint.studentId === studentId
            );

            const totalCount = document.getElementById("totalCount");
            const pendingCount = document.getElementById("pendingCount");
            const progressCount = document.getElementById("progressCount");
            const resolvedCount = document.getElementById("resolvedCount");

            if (totalCount) totalCount.textContent = studentComplaints.length;

            if (pendingCount) {
                pendingCount.textContent =
                    studentComplaints.filter(c => c.status === "Pending").length;
            }

            if (progressCount) {
                progressCount.textContent =
                    studentComplaints.filter(c => c.status === "In Progress").length;
            }

            if (resolvedCount) {
                resolvedCount.textContent =
                    studentComplaints.filter(c => c.status === "Resolved").length;
            }

            const emptyState = document.getElementById("emptyState");

            if (emptyState) {
                emptyState.style.display =
                    studentComplaints.length === 0 ? "block" : "none";
            }

            studentComplaintTable.innerHTML = "";

            studentComplaints.forEach(complaint => {

                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>
                        <a href="complaint-details.html?id=${encodeURIComponent(complaint.id)}"
                           class="complaint-link">
                            ${complaint.id}
                        </a>
                    </td>
                    <td>${complaint.subject}</td>
                    <td>${complaint.category}</td>
                    <td>${complaint.date}</td>
                    <td>${complaint.status}</td>
                    <td class="complaint-action-cell"></td>
                `;

                const actionCell = row.querySelector(".complaint-action-cell");

                if (complaint.status === "Pending") {

                    const deleteButton = document.createElement("button");

                    deleteButton.textContent = "Delete";
                    deleteButton.className = "delete-complaint-btn";

                    deleteButton.addEventListener("click", function () {

                        if (!confirm("Are you sure you want to delete this complaint?")) {
                            return;
                        }

                        const latestComplaints = JSON.parse(
                            localStorage.getItem("studentComplaints") || "[]"
                        );

                        const index = latestComplaints.findIndex(c =>
                            c.id === complaint.id &&
                            c.studentId === studentId &&
                            c.status === "Pending"
                        );

                        if (index === -1) {
                            alert("Complaint cannot be deleted.");
                            return;
                        }

                        latestComplaints.splice(index, 1);

                        localStorage.setItem(
                            "studentComplaints",
                            JSON.stringify(latestComplaints)
                        );

                        displayStudentComplaints();

                    });

                    actionCell.appendChild(deleteButton);

                } else {
                    actionCell.textContent = "—";
                }

                studentComplaintTable.appendChild(row);

            });
        }

        displayStudentComplaints();

        const studentLogoutButton = document.querySelector(".logout-btn");

        if (studentLogoutButton) {
            studentLogoutButton.addEventListener("click", function () {
                localStorage.removeItem("currentUser");
            });
        }
    }

    /* =====================================================
       4. SUBMIT COMPLAINT
       SUPPORTS IMAGES AND DOCUMENTS
    ===================================================== */

    const complaintForm = document.getElementById("complaintForm");

    if (complaintForm) {

        complaintForm.addEventListener("submit", async function (event) {

            event.preventDefault();

            const studentName = localStorage.getItem("studentName");
            const studentId = localStorage.getItem("studentId");

            const currentUser = JSON.parse(
                localStorage.getItem("currentUser") || "null"
            );

            const message = document.getElementById("complaintMessage");

            if (
                !currentUser ||
                currentUser.role !== "student" ||
                !studentName ||
                !studentId
            ) {
                if (message) {
                    message.style.color = "red";
                    message.textContent =
                        "Please log in using your student account first.";
                }
                return;
            }

            const category = document.getElementById("category").value;
            const incidentDate = document.getElementById("incidentDate").value;
            const location = document.getElementById("location").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const description = document.getElementById("description").value.trim();

            const evidenceInput = document.getElementById("evidence");
            const evidenceFile = evidenceInput ? evidenceInput.files[0] : null;

            if (evidenceFile && evidenceFile.size > 2 * 1024 * 1024) {
                message.style.color = "red";
                message.textContent = "Evidence file must not exceed 2MB.";
                return;
            }

            const allowedExtensions = [
                "jpg", "jpeg", "png", "webp",
                "pdf", "doc", "docx", "xls", "xlsx", "txt"
            ];

            function getFileExtension(fileName) {
                return fileName.split(".").pop().toLowerCase();
            }

            if (evidenceFile) {

                const extension = getFileExtension(evidenceFile.name);

                if (!allowedExtensions.includes(extension)) {
                    message.style.color = "red";
                    message.textContent =
                        "Unsupported file type. Please upload a picture or document.";
                    return;
                }
            }

            function convertFileToBase64(file) {
                return new Promise((resolve, reject) => {

                    const reader = new FileReader();

                    reader.onload = function () {
                        resolve(reader.result);
                    };

                    reader.onerror = function () {
                        reject(reader.error);
                    };

                    reader.readAsDataURL(file);

                });
            }

            try {

                const evidenceData = evidenceFile
                    ? await convertFileToBase64(evidenceFile)
                    : "";

                let complaints = JSON.parse(
                    localStorage.getItem("studentComplaints") || "[]"
                );

                const complaintID = "CMP" + Date.now().toString().slice(-8);

                const newComplaint = {
                    id: complaintID,
                    studentName: studentName,
                    studentId: studentId,
                    category: category,
                    incidentDate: incidentDate,
                    location: location,
                    subject: subject,
                    description: description,
                    date: new Date().toLocaleDateString("en-GB"),
                    status: "Pending",
                    evidenceName: evidenceFile ? evidenceFile.name : "",
                    evidenceType: evidenceFile ? evidenceFile.type : "",
                    evidenceSize: evidenceFile ? evidenceFile.size : 0,
                    evidenceData: evidenceData
                };

                complaints.push(newComplaint);

                localStorage.setItem(
                    "studentComplaints",
                    JSON.stringify(complaints)
                );

                message.style.color = "green";
                message.textContent =
                    "Complaint submitted successfully! Complaint ID: " +
                    complaintID;

                complaintForm.reset();

                setTimeout(function () {
                    window.location.href = "student-dashboard.html";
                }, 2000);

            }
            catch (error) {

                console.error("Evidence upload error:", error);

                message.style.color = "red";
                message.textContent =
                    "Unable to save complaint. Storage may be full. Please try a smaller file.";

            }

        });
    }

    /* =====================================================
       5. STUDENT COMPLAINT DETAILS
    ===================================================== */

    const studentDetailId = document.getElementById("detailId");

    if (studentDetailId) {

        const currentUser = JSON.parse(
            localStorage.getItem("currentUser") || "null"
        );

        if (!currentUser || currentUser.role !== "student") {
            window.location.href = "index.html";
            return;
        }

        const params = new URLSearchParams(window.location.search);
        const complaintId = params.get("id");

        const complaints = JSON.parse(
            localStorage.getItem("studentComplaints") || "[]"
        );

        const studentId = localStorage.getItem("studentId");

        const complaint = complaints.find(c =>
            c.id === complaintId && c.studentId === studentId
        );

        if (!complaint) {
            alert("Complaint not found.");
            window.location.href = "student-dashboard.html";
            return;
        }

        const detailFields = {
            detailId: complaint.id,
            detailSubject: complaint.subject,
            detailCategory: complaint.category,
            detailLocation: complaint.location,
            detailIncidentDate: complaint.incidentDate || "-",
            detailDate: complaint.date,
            detailStudent: complaint.studentName,
            detailDescription: complaint.description
        };

        Object.keys(detailFields).forEach(id => {
            const element = document.getElementById(id);
            if (element) element.textContent = detailFields[id] || "-";
        });

        const statusElement = document.getElementById("detailStatus");

        if (statusElement) {
            const status = complaint.status;

            statusElement.textContent = status;
            statusElement.className =
                "status-badge " + status.toLowerCase().replace(" ", "-");
        }

        const pendingStep = document.getElementById("pendingStep");
        const progressStep = document.getElementById("progressStep");
        const resolvedStep = document.getElementById("resolvedStep");

        if (complaint.status === "Pending") {
            if (pendingStep) pendingStep.classList.add("completed");
        }
        else if (complaint.status === "In Progress") {
            if (pendingStep) pendingStep.classList.add("completed");
            if (progressStep) progressStep.classList.add("completed");
        }
        else if (complaint.status === "Resolved") {
            if (pendingStep) pendingStep.classList.add("completed");
            if (progressStep) progressStep.classList.add("completed");
            if (resolvedStep) resolvedStep.classList.add("completed");
        }
    }

    /* =====================================================
       6. ADMIN DASHBOARD
    ===================================================== */

    const adminComplaintTable = document.getElementById("adminComplaintTable");

    if (adminComplaintTable) {

        const currentUser = JSON.parse(
            localStorage.getItem("currentUser") || "null"
        );

        if (!currentUser || currentUser.role !== "admin") {
            window.location.href = "index.html";
            return;
        }

        let complaints = JSON.parse(
            localStorage.getItem("studentComplaints") || "[]"
        );

        const emptyState = document.getElementById("adminEmptyState");
        const searchInput = document.getElementById("searchComplaint");

        function updateStatistics() {

            const total = document.getElementById("adminTotal");
            const pending = document.getElementById("adminPending");
            const progress = document.getElementById("adminProgress");
            const resolved = document.getElementById("adminResolved");

            if (total) total.textContent = complaints.length;

            if (pending) {
                pending.textContent =
                    complaints.filter(c => c.status === "Pending").length;
            }

            if (progress) {
                progress.textContent =
                    complaints.filter(c => c.status === "In Progress").length;
            }

            if (resolved) {
                resolved.textContent =
                    complaints.filter(c => c.status === "Resolved").length;
            }
        }

        function displayComplaints(searchText = "") {

            adminComplaintTable.innerHTML = "";

            const searchValue = searchText.toLowerCase();

            const filteredComplaints = complaints.filter(complaint => {

                return (
                    String(complaint.id || "").toLowerCase().includes(searchValue) ||
                    String(complaint.studentName || "").toLowerCase().includes(searchValue) ||
                    String(complaint.subject || "").toLowerCase().includes(searchValue)
                );

            });

            if (filteredComplaints.length === 0) {
                if (emptyState) emptyState.style.display = "block";
                return;
            }

            if (emptyState) emptyState.style.display = "none";

            filteredComplaints.forEach(complaint => {

                const row = document.createElement("tr");

                // Complaint ID
                const idCell = document.createElement("td");
                const complaintLink = document.createElement("a");

                complaintLink.href =
                    "admin-complaint-details.html?id=" +
                    encodeURIComponent(complaint.id);

                complaintLink.textContent = complaint.id || "-";
                complaintLink.className = "complaint-link";

                idCell.appendChild(complaintLink);
                row.appendChild(idCell);

                // Student name
                const nameCell = document.createElement("td");
                nameCell.textContent = complaint.studentName || "-";
                row.appendChild(nameCell);

                // Student ID
                const studentCell = document.createElement("td");
                studentCell.textContent = complaint.studentId || "-";
                row.appendChild(studentCell);

                // Subject
                const subjectCell = document.createElement("td");
                subjectCell.textContent = complaint.subject || "-";
                row.appendChild(subjectCell);

                // Category
                const categoryCell = document.createElement("td");
                categoryCell.textContent = complaint.category || "-";
                row.appendChild(categoryCell);

                // Date
                const dateCell = document.createElement("td");
                dateCell.textContent = complaint.date || "-";
                row.appendChild(dateCell);

                // Status
                const statusCell = document.createElement("td");
                const statusBadge = document.createElement("span");

                statusBadge.className =
                    "status-badge " +
                    String(complaint.status || "Pending")
                        .toLowerCase()
                        .replace(" ", "-");

                statusBadge.textContent = complaint.status || "Pending";

                statusCell.appendChild(statusBadge);
                row.appendChild(statusCell);

                // Update status dropdown
                const updateCell = document.createElement("td");
                const statusSelect = document.createElement("select");

                statusSelect.className = "admin-status-select";

                ["Pending", "In Progress", "Resolved"].forEach(status => {

                    const option = document.createElement("option");

                    option.value = status;
                    option.textContent = status;
                    option.selected = (complaint.status || "Pending") === status;

                    statusSelect.appendChild(option);

                });

                statusSelect.addEventListener("change", function () {

                    const complaintIndex = complaints.findIndex(
                        c => c.id === complaint.id
                    );

                    if (complaintIndex !== -1) {

                        complaints[complaintIndex].status = this.value;

                        localStorage.setItem(
                            "studentComplaints",
                            JSON.stringify(complaints)
                        );

                        updateStatistics();
                        displayComplaints(searchInput ? searchInput.value : "");

                        alert("Complaint status updated successfully!");
                    }
                });

                updateCell.appendChild(statusSelect);
                row.appendChild(updateCell);

                adminComplaintTable.appendChild(row);

            });
        }

        if (searchInput) {
            searchInput.addEventListener("input", function () {
                displayComplaints(this.value);
            });
        }

        const adminLogoutButton = document.getElementById("adminLogout");

        if (adminLogoutButton) {
            adminLogoutButton.addEventListener("click", function () {
                localStorage.removeItem("currentUser");
            });
        }

        updateStatistics();
        displayComplaints();
    }

    /* =====================================================
       7. ADMIN COMPLAINT DETAILS
    ===================================================== */

    const adminDetailId = document.getElementById("adminDetailId");

    if (adminDetailId) {

        const currentUser = JSON.parse(
            localStorage.getItem("currentUser") || "null"
        );

        if (!currentUser || currentUser.role !== "admin") {
            window.location.href = "index.html";
            return;
        }

        const params = new URLSearchParams(window.location.search);
        const complaintId = params.get("id");

        let complaints = JSON.parse(
            localStorage.getItem("studentComplaints") || "[]"
        );

        const complaint = complaints.find(c => c.id === complaintId);

        if (!complaint) {
            alert("Complaint not found.");
            window.location.href = "admin-dashboard.html";
            return;
        }

        const detailFields = {
            adminDetailId: complaint.id,
            adminStudentName: complaint.studentName,
            adminStudentId: complaint.studentId,
            adminSubject: complaint.subject,
            adminCategory: complaint.category,
            adminLocation: complaint.location,
            adminIncidentDate: complaint.incidentDate || "-",
            adminSubmissionDate: complaint.date,
            adminDescription: complaint.description
        };

        Object.keys(detailFields).forEach(id => {
            const element = document.getElementById(id);
            if (element) element.textContent = detailFields[id] || "-";
        });

        // Supporting evidence
        const adminEvidence = document.getElementById("adminEvidence");

        if (adminEvidence) {

            adminEvidence.innerHTML = "";

            if (complaint.evidenceData) {

                const evidenceLink = document.createElement("a");

                evidenceLink.href = complaint.evidenceData;
                evidenceLink.textContent =
                    complaint.evidenceName || "View Evidence";

                evidenceLink.target = "_blank";
                evidenceLink.rel = "noopener noreferrer";
                evidenceLink.download =
                    complaint.evidenceName || "evidence";

                evidenceLink.style.color = "#572477";
                evidenceLink.style.fontWeight = "600";
                evidenceLink.style.textDecoration = "none";
                evidenceLink.style.cursor = "pointer";

                evidenceLink.addEventListener("mouseenter", function () {
                    evidenceLink.style.textDecoration = "underline";
                });

                evidenceLink.addEventListener("mouseleave", function () {
                    evidenceLink.style.textDecoration = "none";
                });

                adminEvidence.appendChild(evidenceLink);

            }
            else if (complaint.evidenceName) {

                adminEvidence.textContent =
                    complaint.evidenceName +
                    " (File unavailable - please re-upload)";

            }
            else {

                adminEvidence.textContent = "No evidence attached.";

            }
        }

        const statusBadge = document.getElementById("adminDetailStatus");
        const updateStatus = document.getElementById("updateStatus");
        const saveStatusBtn = document.getElementById("saveStatusBtn");

        if (statusBadge) {
            statusBadge.textContent = complaint.status || "Pending";
            statusBadge.className =
                "status-badge " +
                String(complaint.status || "Pending")
                    .toLowerCase()
                    .replace(" ", "-");
        }

        if (updateStatus) {
            updateStatus.value = complaint.status || "Pending";
        }

        if (saveStatusBtn && updateStatus) {

            saveStatusBtn.addEventListener("click", function () {

                const selectedStatus = updateStatus.value;

                const complaintIndex = complaints.findIndex(
                    c => c.id === complaintId
                );

                if (complaintIndex === -1) {
                    alert("Complaint not found.");
                    return;
                }

                complaints[complaintIndex].status = selectedStatus;

                localStorage.setItem(
                    "studentComplaints",
                    JSON.stringify(complaints)
                );

                if (statusBadge) {
                    statusBadge.textContent = selectedStatus;
                    statusBadge.className =
                        "status-badge " +
                        selectedStatus.toLowerCase().replace(" ", "-");
                }

                const message = document.getElementById("adminUpdateMessage");

                if (message) {
                    message.textContent =
                        "Complaint status updated successfully!";
                    message.style.display = "block";
                }

            });
        }
    }

    /* =====================================================
       8. COMPLAINT STATUS PIE CHART
    ===================================================== */

    const chartCanvas = document.getElementById("complaintStatusChart");

    if (chartCanvas && typeof Chart !== "undefined") {

        const chartComplaints = JSON.parse(
            localStorage.getItem("studentComplaints") || "[]"
        );

        const pending = chartComplaints.filter(
            complaint => complaint.status === "Pending"
        ).length;

        const inProgress = chartComplaints.filter(
            complaint => complaint.status === "In Progress"
        ).length;

        const resolved = chartComplaints.filter(
            complaint => complaint.status === "Resolved"
        ).length;

        new Chart(chartCanvas, {

            type: "pie",

            data: {
                labels: ["Pending", "In Progress", "Resolved"],

                datasets: [{
                    data: [pending, inProgress, resolved],

                    backgroundColor: [
                        "#E5C76B",
                        "#9B72C7",
                        "#572477"
                    ],

                    borderColor: "#FFFFFF",
                    borderWidth: 3,
                    hoverOffset: 8
                }]
            },

            options: {

                responsive: true,
                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        position: "bottom",

                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: "circle"
                        }
                    },

                    tooltip: {
                        callbacks: {

                            label: function (context) {

                                const total = context.dataset.data.reduce(
                                    (sum, value) => sum + value,
                                    0
                                );

                                const value = context.raw;

                                const percentage = total > 0
                                    ? ((value / total) * 100).toFixed(1)
                                    : 0;

                                return context.label + ": " + value +
                                    " (" + percentage + "%)";
                            }
                        }
                    }
                }
            }
        });
    }

    /* =====================================================
       9. STUDENT MOBILE SIDEBAR
       Uses: menuBtn, sidebar, sidebarOverlay
    ===================================================== */

    const studentMenuBtn = document.getElementById("menuBtn");
    const studentSidebar = document.getElementById("sidebar");
    const studentOverlay = document.getElementById("sidebarOverlay");

    if (studentMenuBtn && studentSidebar && studentOverlay) {

        function closeStudentSidebar() {

            studentSidebar.classList.remove("active");
            studentOverlay.classList.remove("active");

            studentMenuBtn.setAttribute("aria-expanded", "false");
            document.body.style.overflow = "";

        }

        studentMenuBtn.addEventListener("click", function () {

            const isOpen = studentSidebar.classList.contains("active");

            if (isOpen) {
                closeStudentSidebar();
            } else {
                studentSidebar.classList.add("active");
                studentOverlay.classList.add("active");

                studentMenuBtn.setAttribute("aria-expanded", "true");
                document.body.style.overflow = "hidden";
            }

        });

        studentOverlay.addEventListener("click", closeStudentSidebar);

        studentSidebar.querySelectorAll(".nav-item").forEach(link => {
            link.addEventListener("click", closeStudentSidebar);
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeStudentSidebar();
            }
        });
    }

    /* =====================================================
       10. ADMIN MOBILE SIDEBAR
       Uses: adminMenuBtn, adminSidebar, adminSidebarOverlay

       IMPORTANT:
       This code is directly inside the MAIN DOMContentLoaded.
       Do NOT put another DOMContentLoaded inside this section.
    ===================================================== */

    const adminMenuBtn = document.getElementById("adminMenuBtn");
    const adminSidebar = document.getElementById("adminSidebar");
    const adminOverlay = document.getElementById("adminSidebarOverlay");

    if (adminMenuBtn && adminSidebar && adminOverlay) {

        function closeAdminSidebar() {

            adminSidebar.classList.remove("active");
            adminOverlay.classList.remove("active");

            adminMenuBtn.setAttribute("aria-expanded", "false");
            document.body.style.overflow = "";

        }

        adminMenuBtn.addEventListener("click", function () {

            const isOpen = adminSidebar.classList.contains("active");

            if (isOpen) {
                closeAdminSidebar();
            } else {

                adminSidebar.classList.add("active");
                adminOverlay.classList.add("active");

                adminMenuBtn.setAttribute("aria-expanded", "true");
                document.body.style.overflow = "hidden";

            }

        });

        adminOverlay.addEventListener("click", closeAdminSidebar);

        adminSidebar.querySelectorAll(".nav-item").forEach(link => {
            link.addEventListener("click", closeAdminSidebar);
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeAdminSidebar();
            }
        });

        // Close sidebar when switching back to desktop
        window.addEventListener("resize", function () {

            if (window.innerWidth > 768) {
                closeAdminSidebar();
            }

        });

    }

});
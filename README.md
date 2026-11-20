E-Complaints Student Portal | UiTM Puncak Perdana

A responsive, web-based complaint management system designed for Universiti Teknologi MARA (UiTM) Puncak Perdana Campus. This platform streamlines the process for students to submit campus-related concerns, attach supporting evidence, and track resolution progress in real time, while providing administrators with an organized dashboard to monitor, analyze, and manage incoming reports.

✨ Features

👨‍🎓 Student Portal

Authentication & Registration: Dedicated login portal (index.html) with role selection (Student/Administrator) and a student account registration page (register.html) featuring password visibility toggles.

Student Dashboard (student-dashboard.html): Displays a personalized welcome banner, quick-glance statistics (Total, Pending, In Progress, and Resolved complaints), a recent complaints table, and student profile details.

Submit a Complaint (submit-complaint.html): Structured submission form supporting 8 distinct categories (Facilities, Accommodation, Cleanliness, Internet / Wi-Fi, Safety and Security, Academic Services, Staff Services, Other), incident date, location details, description, and optional file uploads (JPG, PNG, WEBP, PDF, DOC/X, XLS/X, TXT up to 2MB).

Progress Tracking (complaint-details.html): Detailed view of individual complaints featuring a visual 3-step progress timeline (Pending → In Progress → Resolved).

🛠️ Administrator Portal

Admin Dashboard (admin-dashboard.html): Overview of campus-wide complaint metrics paired with an interactive Chart.js status distribution chart.

Search & Filter: Real-time search bar to filter complaints by Complaint ID, Student Name, or Subject.

Complaint Management (admin-complaint-details.html): Dedicated review interface allowing administrators to inspect student details, view attached evidence, and update complaint statuses directly.

📱 UI/UX & Design

UiTM Branding: Styled with UiTM’s signature royal purple (#35134f / #51247a) and gold (#e5bd43) color palette, complete with campus imagery and official branding.

Fully Responsive: Adaptive layouts for desktop, tablet, and mobile devices, including slide-out navigation drawers and horizontally scrollable data tables.

🛠️ Tech Stack

Frontend: HTML5, CSS3 (Custom Flexbox & CSS Grid layouts, responsive media queries)

Typography: Google Fonts - Poppins

Data Visualization: Chart.js (via CDN)

Scripting: Vanilla JavaScript (js/script.js — handles form validation, password toggles, mobile navigation drawers, chart rendering, and local/session state)

📁 Project Structure

e-complaints-uitm/
│
├── index.html                    # Landing page & unified Student/Admin login
├── register.html                 # Student account registration page
├── student-dashboard.html        # Student overview, stats, and complaint history
├── submit-complaint.html         # Complaint submission form with file attachment
├── complaint-details.html        # Student view of complaint details & progress timeline
├── admin-dashboard.html          # Admin overview, Chart.js analytics, and master table
├── admin-complaint-details.html  # Admin view to review evidence & update status
│
├── css/
│   └── style.css                 # Complete responsive stylesheet for all pages
│
├── js/
│   └── script.js                 # Application logic, DOM manipulation & Chart.js setup
│
└── images/
    ├── logo-uitm.png             # Official UiTM logo
    └── uitm-pundana.jpg          # UiTM Puncak Perdana campus hero background


🚀 Getting Started

Prerequisites

No build tools or package managers are required. You only need a modern web browser (Chrome, Firefox, Edge, Safari) and optionally a local development server (such as VS Code Live Server).

Installation & Setup

Clone the repository:

git clone https://github.com/your-username/e-complaints-uitm.git


Navigate to the project folder:

cd e-complaints-uitm


Ensure folder paths match:
Make sure style.css is placed inside a css/ folder, your images (logo-uitm.png and uitm-pundana.jpg) are inside an images/ folder, and your JavaScript file (script.js) is inside a js/ folder so all relative links resolve properly.

Launch the application:
Open index.html directly in your browser or run it via a local server.

📄 License

© 2026 E-Complaints Student UiTM Puncak Perdana. All Rights Reserved.

Developed for academic and campus service improvement purposes at Universiti Teknologi MARA (UiTM).

Develop by: Intan Sofea binti Adnan
Year: 2026
Project: Student E-Complaints Portal

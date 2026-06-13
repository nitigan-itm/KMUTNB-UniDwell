// Global Application State
let state = {
    residents: [],
    bills: [],
    settings: {
        universityName: "มจพ. วิทยาเขตปราจีนบุรี",
        roomRent: 1500,
        adminName: "สมคิด แสนดี"
    },
    currentTab: 'dashboard',
    selectedMonth: '2026-06',
    charts: {}
};

// Default Mock Data Creator
const defaultResidents = [
    { id: "res-1", name: "สมศักดิ์", surname: "รักดี", position: "อาจารย์", faculty: "คณะเทคโนโลยีและการจัดการอุตสาหกรรม (FITM)", department: "เทคโนโลยีสารสนเทศ (IT)", roomNo: "101" },
    { id: "res-2", name: "นงนุช", surname: "แสนสุข", position: "เจ้าหน้าที่", faculty: "คณะวิทยาศาสตร์ประยุกต์", department: "เทคโนโลยีเกษตรอุตสาหกรรม (AGT)", roomNo: "102" },
    { id: "res-3", name: "วิชัย", surname: "เกียรติเกริกไกร", position: "อาจารย์", faculty: "คณะเทคโนโลยีและการจัดการอุตสาหกรรม (FITM)", department: "การจัดการอุตสาหกรรม (IM)", roomNo: "103" },
    { id: "res-4", name: "มานะ", surname: "ขยันงาน", position: "เจ้าหน้าที่", faculty: "คณะเทคโนโลยีและการจัดการอุตสาหกรรม (FITM)", department: "สำนักงานคณบดี", roomNo: "104" },
    { id: "res-5", name: "สุภัทรา", surname: "รุ่งเรือง", position: "อาจารย์", faculty: "วิทยาลัยเทคโนโลยีอุตสาหกรรม (CIT)", department: "เทคโนโลยีเครื่องกล", roomNo: "201" },
    { id: "res-6", name: "อัญชลี", surname: "สีสวย", position: "เจ้าหน้าที่", faculty: "สำนักงานวิทยาเขตปราจีนบุรี", department: "งานห้องสมุด", roomNo: "202" },
    { id: "res-7", name: "ณรงค์ชัย", surname: "วงศ์เทวัญ", position: "อาจารย์", faculty: "คณะเทคโนโลยีและการจัดการอุตสาหกรรม (FITM)", department: "เทคโนโลยีสารสนเทศ (IT)", roomNo: "203" },
    { id: "res-8", name: "ทวีศักดิ์", surname: "ชัยภูมิ", position: "เจ้าหน้าที่", faculty: "สำนักงานวิทยาเขตปราจีนบุรี", department: "งานอาคารสถานที่", roomNo: "204" }
];

const defaultBills = [
    // May 2026
    { id: "bill-1-05", residentId: "res-1", month: "2026-05", roomRent: 1500, totalAmount: 1500, paid: true, paymentDate: "2026-06-02" },
    { id: "bill-2-05", residentId: "res-2", month: "2026-05", roomRent: 1500, totalAmount: 1500, paid: true, paymentDate: "2026-06-03" },
    { id: "bill-3-05", residentId: "res-3", month: "2026-05", roomRent: 1500, totalAmount: 1500, paid: false, paymentDate: null },
    { id: "bill-4-05", residentId: "res-4", month: "2026-05", roomRent: 1500, totalAmount: 1500, paid: true, paymentDate: "2026-06-01" },
    { id: "bill-5-05", residentId: "res-5", month: "2026-05", roomRent: 1500, totalAmount: 1500, paid: true, paymentDate: "2026-06-04" },
    { id: "bill-6-05", residentId: "res-6", month: "2026-05", roomRent: 1500, totalAmount: 1500, paid: false, paymentDate: null },
    { id: "bill-7-05", residentId: "res-7", month: "2026-05", roomRent: 1500, totalAmount: 1500, paid: true, paymentDate: "2026-06-02" },
    { id: "bill-8-05", residentId: "res-8", month: "2026-05", roomRent: 1500, totalAmount: 1500, paid: true, paymentDate: "2026-06-05" },

    // June 2026 (Current Month)
    { id: "bill-1-06", residentId: "res-1", month: "2026-06", roomRent: 1500, totalAmount: 1500, paid: true, paymentDate: "2026-06-12" },
    { id: "bill-2-06", residentId: "res-2", month: "2026-06", roomRent: 1500, totalAmount: 1500, paid: false, paymentDate: null },
    { id: "bill-3-06", residentId: "res-3", month: "2026-06", roomRent: 1500, totalAmount: 1500, paid: false, paymentDate: null },
    { id: "bill-4-06", residentId: "res-4", month: "2026-06", roomRent: 1500, totalAmount: 1500, paid: true, paymentDate: "2026-06-10" },
    { id: "bill-5-06", residentId: "res-5", month: "2026-06", roomRent: 1500, totalAmount: 1500, paid: true, paymentDate: "2026-06-11" },
    { id: "bill-6-06", residentId: "res-6", month: "2026-06", roomRent: 1500, totalAmount: 1500, paid: false, paymentDate: null },
    { id: "bill-7-06", residentId: "res-7", month: "2026-06", roomRent: 1500, totalAmount: 1500, paid: false, paymentDate: null },
    { id: "bill-8-06", residentId: "res-8", month: "2026-06", roomRent: 1500, totalAmount: 1500, paid: true, paymentDate: "2026-06-12" }
];

// Helper: Formatter utilities
function formatNumber(num) {
    return Number(num).toLocaleString('th-TH', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function translateMonth(monthStr) {
    const months = {
        '01': 'มกราคม', '02': 'กุมภาพันธ์', '03': 'มีนาคม', '04': 'เมษายน',
        '05': 'พฤษภาคม', '06': 'มิถุนายน', '07': 'กรกฎาคม', '08': 'สิงหาคม',
        '09': 'กันยายน', '10': 'ตุลาคม', '11': 'พฤศจิกายน', '12': 'ธันวาคม'
    };
    const [year, month] = monthStr.split('-');
    const yearTh = parseInt(year) + 543;
    return `${months[month]} ${yearTh}`;
}

// Local Storage Handlers
function saveToStorage() {
    localStorage.setItem('kmutnb_dorm_residents', JSON.stringify(state.residents));
    localStorage.setItem('kmutnb_dorm_bills', JSON.stringify(state.bills));
    localStorage.setItem('kmutnb_dorm_settings', JSON.stringify(state.settings));
}

function loadFromStorage() {
    const savedResidents = localStorage.getItem('kmutnb_dorm_residents');
    const savedBills = localStorage.getItem('kmutnb_dorm_bills');
    const savedSettings = localStorage.getItem('kmutnb_dorm_settings');

    if (savedResidents && savedBills && savedSettings) {
        state.residents = JSON.parse(savedResidents);
        state.bills = JSON.parse(savedBills);
        state.settings = JSON.parse(savedSettings);
    } else {
        // First run: load default mocks
        state.residents = defaultResidents;
        state.bills = defaultBills;
        saveToStorage();
    }
}

// Automatic Bill Generator for selected month
function generateBillsForMonth(monthStr) {
    let updated = false;
    state.residents.forEach(res => {
        const hasBill = state.bills.some(b => b.residentId === res.id && b.month === monthStr);
        if (!hasBill) {
            state.bills.push({
                id: `bill-${res.id}-${monthStr}`,
                residentId: res.id,
                month: monthStr,
                roomRent: state.settings.roomRent,
                totalAmount: state.settings.roomRent,
                paid: false,
                paymentDate: null
            });
            updated = true;
        }
    });
    if (updated) {
        saveToStorage();
    }
}

// App Initialization
document.addEventListener("DOMContentLoaded", () => {
    loadFromStorage();
    setupEventListeners();
    setupRouting();
    
    // Set UI constants from state
    document.querySelectorAll(".admin-name-span").forEach(el => el.textContent = state.settings.adminName);
    document.getElementById("selectedMonth").value = state.selectedMonth;
    document.getElementById("billingMonthSelect").value = state.selectedMonth;
    document.getElementById("reportMonthSelect").value = state.selectedMonth;

    // Load initial page
    switchTab('dashboard');
});

// SPA Tab Router
function switchTab(tabId) {
    state.currentTab = tabId;
    
    // Ensure bills are generated for current view selection
    generateBillsForMonth(state.selectedMonth);

    // Update Sidebar CSS class
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.tab === tabId) {
            item.classList.add('active');
        }
    });

    // Toggle Content Views
    document.querySelectorAll('.tab-content').forEach(view => {
        view.classList.remove('active');
        if (view.id === `${tabId}-view`) {
            view.classList.add('active');
        }
    });

    // Run Tab-Specific Initialization Code
    if (tabId === 'dashboard') renderDashboard();
    if (tabId === 'residents') renderResidents();
    if (tabId === 'payments') renderPayments();
    if (tabId === 'reports') renderReports();
    if (tabId === 'settings') renderSettings();
}

function setupRouting() {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = item.dataset.tab;
            switchTab(tabId);
        });
    });
}

// Setup Event Listeners for actions
function setupEventListeners() {
    // Theme Switcher
    const themeToggle = document.getElementById("themeToggle");
    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        themeToggle.querySelector("i").className = newTheme === "light" ? "ph-bold ph-sun" : "ph-bold ph-moon";
    });

    // Month Selector on Global Dashboard/Billing views
    document.getElementById("selectedMonth").addEventListener("change", (e) => {
        state.selectedMonth = e.target.value;
        // Sync other month dropdowns
        document.getElementById("billingMonthSelect").value = state.selectedMonth;
        document.getElementById("reportMonthSelect").value = state.selectedMonth;
        generateBillsForMonth(state.selectedMonth);
        if (state.currentTab === 'dashboard') renderDashboard();
    });

    // PAYMENTS VIEW Month Change
    document.getElementById("billingMonthSelect").addEventListener("change", (e) => {
        state.selectedMonth = e.target.value;
        document.getElementById("selectedMonth").value = state.selectedMonth;
        generateBillsForMonth(state.selectedMonth);
        renderPayments();
    });

    // REPORTS VIEW Month Change
    document.getElementById("reportMonthSelect").addEventListener("change", (e) => {
        state.selectedMonth = e.target.value;
        document.getElementById("selectedMonth").value = state.selectedMonth;
        generateBillsForMonth(state.selectedMonth);
        renderReports();
    });

    // Residents Filter & Search
    document.getElementById("searchResident").addEventListener("input", renderResidents);
    document.getElementById("filterPosition").addEventListener("change", renderResidents);
    document.getElementById("filterFaculty").addEventListener("change", renderResidents);

    // Payments Search/Filter
    document.getElementById("searchPayment").addEventListener("input", renderPayments);
    document.getElementById("filterPaymentStatus").addEventListener("change", renderPayments);

    // Add Resident Modal trigger
    document.getElementById("addResidentBtn").addEventListener("click", () => openResidentModal());
    document.getElementById("closeResidentModal").addEventListener("click", () => closeResidentModal());
    document.getElementById("cancelResidentBtn").addEventListener("click", () => closeResidentModal());
    document.getElementById("residentForm").addEventListener("submit", handleResidentSubmit);

    // Settings Form submit
    document.getElementById("settingsForm").addEventListener("submit", handleSettingsSubmit);

    // Invoice/Receipt Modal close
    document.getElementById("closeInvoiceModal").addEventListener("click", () => {
        document.getElementById("invoiceModalOverlay").classList.remove("active");
    });
}

// -----------------------------------------------------------------
// TAB 1: DASHBOARD LOGIC
// -----------------------------------------------------------------
function renderDashboard() {
    generateBillsForMonth(state.selectedMonth);
    const currentMonthBills = state.bills.filter(b => b.month === state.selectedMonth);
    
    // 1. STATS CALCULATIONS
    const totalRooms = state.residents.length;
    
    // Calculate values
    let paidTotal = 0;
    let unpaidTotal = 0;
    let unpaidCount = 0;
    let paidCount = 0;

    currentMonthBills.forEach(b => {
        if (b.paid) {
            paidTotal += b.totalAmount;
            paidCount++;
        } else {
            unpaidTotal += b.totalAmount;
            unpaidCount++;
        }
    });

    // Outstanding total across ALL historical months
    const allUnpaidTotal = state.bills.filter(b => !b.paid).reduce((sum, b) => sum + b.totalAmount, 0);

    // Update Dashboard UI Cards
    document.getElementById("statOccupiedRooms").textContent = totalRooms;
    document.getElementById("statPaidAmount").textContent = formatNumber(paidTotal) + " ฿";
    document.getElementById("statUnpaidAmount").textContent = formatNumber(unpaidTotal) + " ฿";
    document.getElementById("statOutstandingTotal").textContent = formatNumber(allUnpaidTotal) + " ฿";

    // Subtexts
    document.getElementById("statPaidDesc").textContent = `ชำระแล้ว ${paidCount} จาก ${currentMonthBills.length} ห้อง`;
    document.getElementById("statUnpaidDesc").textContent = `ค้างชำระ ${unpaidCount} ห้อง ในเดือนนี้`;

    // 2. RECENT UNPAID TRANSACTIONS TABLE
    const unpaidTableBody = document.getElementById("unpaidDashboardTable");
    unpaidTableBody.innerHTML = "";

    const unpaidBillsThisMonth = currentMonthBills.filter(b => !b.paid);

    if (unpaidBillsThisMonth.length === 0) {
        unpaidTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-secondary);">ไม่มีรายการค้างชำระสำหรับเดือนนี้</td></tr>`;
    } else {
        unpaidBillsThisMonth.forEach(bill => {
            const res = state.residents.find(r => r.id === bill.residentId);
            if (!res) return;

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>ห้อง ${res.roomNo}</strong></td>
                <td>${res.name} ${res.surname}</td>
                <td>${res.faculty}</td>
                <td style="text-align: right; font-weight: 600; color: var(--accent-danger);">${formatNumber(bill.totalAmount)} ฿</td>
                <td>
                    <button class="btn btn-success btn-icon" onclick="quickMarkPaid('${bill.id}')" title="ทำเครื่องหมายว่าจ่ายแล้ว">
                        <i class="ph-bold ph-check"></i> ยืนยันจ่ายเงิน
                    </button>
                </td>
            `;
            unpaidTableBody.appendChild(tr);
        });
    }

    // 3. CHARTS RENDERING
    renderDashboardCharts();
}

function quickMarkPaid(billId) {
    const idx = state.bills.findIndex(b => b.id === billId);
    if (idx !== -1) {
        state.bills[idx].paid = true;
        state.bills[idx].paymentDate = new Date().toISOString().split('T')[0];
        saveToStorage();
        renderDashboard();
    }
}

function renderDashboardCharts() {
    // Destroy previous chart instances if they exist
    if (state.charts.revenue) state.charts.revenue.destroy();
    if (state.charts.department) state.charts.department.destroy();

    // Chart 1: Month-on-Month Revenue (Paid vs Unpaid)
    // Gather last 4 months
    const lastMonths = ["2026-03", "2026-04", "2026-05", "2026-06"];
    const paidData = [];
    const unpaidData = [];

    lastMonths.forEach(m => {
        const mBills = state.bills.filter(b => b.month === m);
        let paid = 0;
        let unpaid = 0;
        mBills.forEach(b => {
            if (b.paid) paid += b.totalAmount;
            else unpaid += b.totalAmount;
        });
        paidData.push(paid);
        unpaidData.push(unpaid);
    });

    const ctxRev = document.getElementById('revenueChart').getContext('2d');
    state.charts.revenue = new Chart(ctxRev, {
        type: 'bar',
        data: {
            labels: lastMonths.map(m => translateMonth(m)),
            datasets: [
                {
                    label: 'ยอดชำระแล้ว (฿)',
                    data: paidData,
                    backgroundColor: '#10b981',
                    borderRadius: 6,
                },
                {
                    label: 'ยอดค้างชำระ (฿)',
                    data: unpaidData,
                    backgroundColor: '#ef4444',
                    borderRadius: 6,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { stacked: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' } },
                y: { stacked: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' } }
            },
            plugins: {
                legend: { labels: { color: '#f3f4f6' } }
            }
        }
    });

    // Chart 2: Residents Distribution by Faculty
    const facultyCounts = {};
    state.residents.forEach(r => {
        let name = r.faculty.split(' ')[0]; // shorten name
        facultyCounts[name] = (facultyCounts[name] || 0) + 1;
    });

    const ctxDept = document.getElementById('departmentChart').getContext('2d');
    state.charts.department = new Chart(ctxDept, {
        type: 'doughnut',
        data: {
            labels: Object.keys(facultyCounts),
            datasets: [{
                data: Object.values(facultyCounts),
                backgroundColor: ['#6366f1', '#06b6d4', '#f59e0b', '#ec4899', '#8b5cf6'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { color: '#f3f4f6', padding: 15 } }
            }
        }
    });
}

// -----------------------------------------------------------------
// TAB 2: RESIDENT REGISTRY LOGIC
// -----------------------------------------------------------------
let editResidentId = null;

function renderResidents() {
    const tableBody = document.getElementById("residentsTableBody");
    tableBody.innerHTML = "";

    const query = document.getElementById("searchResident").value.toLowerCase();
    const posFilter = document.getElementById("filterPosition").value;
    const facultyFilter = document.getElementById("filterFaculty").value;

    const filtered = state.residents.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(query) || 
                              r.surname.toLowerCase().includes(query) || 
                              r.roomNo.includes(query);
        const matchesPosition = posFilter === "" || r.position === posFilter;
        const matchesFaculty = facultyFilter === "" || r.faculty.includes(facultyFilter);
        return matchesSearch && matchesPosition && matchesFaculty;
    });

    if (filtered.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-secondary);">ไม่พบข้อมูลผู้พักอาศัย</td></tr>`;
        return;
    }

    filtered.sort((a, b) => Number(a.roomNo) - Number(b.roomNo)).forEach(r => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>ห้อง ${r.roomNo}</strong></td>
            <td>${r.name} ${r.surname}</td>
            <td><span class="badge ${r.position === 'อาจารย์' ? 'badge-info' : 'badge-warning'}">${r.position}</span></td>
            <td>${r.faculty}</td>
            <td>${r.department}</td>
            <td>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn btn-secondary btn-icon" onclick="openResidentModal('${r.id}')" title="แก้ไข">
                        <i class="ph-bold ph-pencil"></i>
                    </button>
                    <button class="btn btn-danger btn-icon" style="background-color: var(--accent-danger);" onclick="deleteResident('${r.id}')" title="ลบ">
                        <i class="ph-bold ph-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

function openResidentModal(residentId = null) {
    const overlay = document.getElementById("residentModalOverlay");
    const title = document.getElementById("residentModalTitle");
    const form = document.getElementById("residentForm");

    form.reset();
    editResidentId = residentId;

    if (residentId) {
        title.textContent = "แก้ไขข้อมูลผู้เข้าพัก";
        const resident = state.residents.find(r => r.id === residentId);
        if (resident) {
            document.getElementById("resRoom").value = resident.roomNo;
            document.getElementById("resName").value = resident.name;
            document.getElementById("resSurname").value = resident.surname;
            document.getElementById("resPosition").value = resident.position;
            document.getElementById("resFaculty").value = resident.faculty;
            document.getElementById("resDept").value = resident.department;
        }
    } else {
        title.textContent = "เพิ่มผู้เข้าพักอาศัยใหม่";
    }

    overlay.classList.add("active");
}

function closeResidentModal() {
    document.getElementById("residentModalOverlay").classList.remove("active");
    editResidentId = null;
}

function handleResidentSubmit(e) {
    e.preventDefault();

    const roomNo = document.getElementById("resRoom").value.trim();
    const name = document.getElementById("resName").value.trim();
    const surname = document.getElementById("resSurname").value.trim();
    const position = document.getElementById("resPosition").value;
    const faculty = document.getElementById("resFaculty").value;
    const department = document.getElementById("resDept").value.trim();

    if (!roomNo || !name || !surname) {
        alert("กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน");
        return;
    }

    // Check duplicate room
    const dup = state.residents.find(r => r.roomNo === roomNo && r.id !== editResidentId);
    if (dup) {
        alert(`ห้องเลขที่ ${roomNo} มีผู้เข้าพักชื่อคุณ ${dup.name} พักอยู่แล้ว!`);
        return;
    }

    let savedResId = null;

    if (editResidentId) {
        // Edit mode
        const idx = state.residents.findIndex(r => r.id === editResidentId);
        if (idx !== -1) {
            state.residents[idx] = { ...state.residents[idx], roomNo, name, surname, position, faculty, department };
            savedResId = editResidentId;
        }
    } else {
        // Add Mode
        const newResident = {
            id: 'res-' + Date.now(),
            roomNo, name, surname, position, faculty, department
        };
        state.residents.push(newResident);
        savedResId = newResident.id;
    }

    saveToStorage();

    // Auto generate bill for new resident if in currently selected month
    if (savedResId) {
        generateBillsForMonth(state.selectedMonth);
    }

    closeResidentModal();
    renderResidents();
}

function deleteResident(id) {
    const resident = state.residents.find(r => r.id === id);
    if (!resident) return;

    if (confirm(`คุณต้องการลบข้อมูลการเข้าพักของห้อง ${resident.roomNo} (${resident.name} ${resident.surname}) หรือไม่?\n*ข้อมูลใบเรียกเก็บเงินที่ผ่านมาจะยังอยู่ในฐานข้อมูลประวัติของระบบ`)) {
        state.residents = state.residents.filter(r => r.id !== id);
        saveToStorage();
        renderResidents();
    }
}

// -----------------------------------------------------------------
// TAB 3: PAYMENTS RECORDING
// -----------------------------------------------------------------
function renderPayments() {
    generateBillsForMonth(state.selectedMonth);
    const tableBody = document.getElementById("paymentsTableBody");
    tableBody.innerHTML = "";

    const query = document.getElementById("searchPayment").value.toLowerCase();
    const statusFilter = document.getElementById("filterPaymentStatus").value;

    const monthlyBills = state.bills.filter(b => b.month === state.selectedMonth);

    const filtered = monthlyBills.filter(bill => {
        const res = state.residents.find(r => r.id === bill.residentId);
        if (!res) return false;

        const matchesSearch = res.name.toLowerCase().includes(query) || 
                              res.surname.toLowerCase().includes(query) || 
                              res.roomNo.includes(query);
        const matchesStatus = statusFilter === "" || 
                              (statusFilter === "paid" && bill.paid) || 
                              (statusFilter === "unpaid" && !bill.paid);
        return matchesSearch && matchesStatus;
    });

    if (filtered.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-secondary);">ไม่พบรายการที่ตรงกับเงื่อนไข</td></tr>`;
        return;
    }

    filtered.sort((a, b) => {
        const resA = state.residents.find(r => r.id === a.residentId);
        const resB = state.residents.find(r => r.id === b.residentId);
        return Number(resA.roomNo) - Number(resB.roomNo);
    }).forEach(bill => {
        const res = state.residents.find(r => r.id === bill.residentId);
        if (!res) return;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>ห้อง ${res.roomNo}</strong></td>
            <td>${res.name} ${res.surname}</td>
            <td style="text-align: right;">${formatNumber(bill.roomRent)} ฿</td>
            <td style="text-align: right; font-weight: 600; color: var(--text-primary);">${formatNumber(bill.totalAmount)} ฿</td>
            <td>
                <span class="badge ${bill.paid ? 'badge-success' : 'badge-danger'}">
                    ${bill.paid ? 'ชำระเงินแล้ว' : 'ค้างชำระ'}
                </span>
            </td>
            <td>
                <div style="display: flex; gap: 0.5rem; align-items: center;">
                    <button class="btn btn-secondary btn-icon" onclick="togglePaymentStatus('${bill.id}')" title="เปลี่ยนสถานะชำระเงิน">
                        <i class="ph-bold ${bill.paid ? 'ph-x-circle' : 'ph-check-circle'}"></i> 
                        ${bill.paid ? 'ยกเลิกจ่าย' : 'ชำระแล้ว'}
                    </button>
                    <button class="btn btn-secondary btn-icon" onclick="viewReceipt('${bill.id}')" title="ดูใบเสร็จ">
                        <i class="ph-bold ph-receipt"></i>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

function togglePaymentStatus(billId) {
    const idx = state.bills.findIndex(b => b.id === billId);
    if (idx !== -1) {
        const currentStatus = state.bills[idx].paid;
        state.bills[idx].paid = !currentStatus;
        state.bills[idx].paymentDate = !currentStatus ? new Date().toISOString().split('T')[0] : null;
        saveToStorage();
        renderPayments();
    }
}

function viewReceipt(billId) {
    const bill = state.bills.find(b => b.id === billId);
    if (!bill) return;

    const res = state.residents.find(r => r.id === bill.residentId);
    if (!res) return;

    const overlay = document.getElementById("invoiceModalOverlay");
    const container = document.getElementById("invoicePrintArea");

    container.innerHTML = `
        <div class="invoice-container">
            <div class="invoice-header">
                <div class="invoice-logo">${state.settings.universityName}</div>
                <p style="margin-top: 0.25rem;">ใบแจ้งหนี้ / ใบเสร็จรับเงินค่าเช่าห้องพักบุคลากร</p>
                <p style="font-size: 0.8rem; color: #475569;">ประจำเดือน: ${translateMonth(bill.month)}</p>
            </div>
            
            <div class="invoice-details">
                <div>
                    <strong>ผู้พักอาศัย:</strong> ${res.name} ${res.surname}<br>
                    <strong>ตำแหน่ง:</strong> ${res.position}<br>
                    <strong>สังกัด:</strong> ${res.faculty} (${res.department})
                </div>
                <div style="text-align: right;">
                    <strong>ห้องพักเลขที่:</strong> ${res.roomNo}<br>
                    <strong>เลขที่บิล:</strong> ${bill.id}<br>
                    <strong>สถานะ:</strong> <span style="font-weight: bold; color: ${bill.paid ? '#10b981' : '#ef4444'}">${bill.paid ? 'ชำระเงินแล้ว' : 'ค้างชำระ'}</span>
                    ${bill.paid ? `<br><strong>วันที่จ่าย:</strong> ${bill.paymentDate}` : ''}
                </div>
            </div>

            <table class="invoice-table">
                <thead>
                    <tr>
                        <th>รายการ</th>
                        <th style="text-align: right;">รายละเอียด</th>
                        <th style="text-align: right;">จำนวนเงิน (บาท)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ค่าเช่าห้องพักบุคลากรรายเดือน</td>
                        <td style="text-align: right;">ค่าเช่าอัตราคงที่ตามกำหนดหน่วยงาน</td>
                        <td style="text-align: right;">${formatNumber(bill.roomRent)}</td>
                    </tr>
                </tbody>
            </table>

            <div class="invoice-total">
                ยอดรวมเงินที่ต้องชำระทั้งสิ้น: ${formatNumber(bill.totalAmount)} บาท
            </div>

            <div style="margin-top: 2.5rem; display: flex; justify-content: space-between; font-size: 0.8rem;">
                <div style="text-align: center; width: 45%;">
                    <p style="margin-bottom: 2rem;">ผู้เช่า/ผู้พักอาศัย</p>
                    <p>...........................................................</p>
                    <p style="margin-top: 0.5rem;">( ลงชื่อ )</p>
                </div>
                <div style="text-align: center; width: 45%;">
                    <p style="margin-bottom: 2rem;">ผู้มีอำนาจลงนาม / ผู้ดูแลระบบ</p>
                    <p>...........................................................</p>
                    <p style="margin-top: 0.5rem;">( ${state.settings.adminName} )</p>
                </div>
            </div>
        </div>
    `;

    overlay.classList.add("active");
}

function printReceipt() {
    window.print();
}

// -----------------------------------------------------------------
// TAB 4: REPORTS & EXPORTS LOGIC
// -----------------------------------------------------------------
function renderReports() {
    const selectMonth = state.selectedMonth;
    generateBillsForMonth(selectMonth);
    const billsThisMonth = state.bills.filter(b => b.month === selectMonth);

    // Calc summaries
    let totalRooms = state.residents.length;
    let expectedRevenue = 0;
    let collectedRevenue = 0;
    let outstandingRevenue = 0;
    let paidCount = 0;
    let unpaidCount = 0;

    billsThisMonth.forEach(b => {
        expectedRevenue += b.totalAmount;
        if (b.paid) {
            collectedRevenue += b.totalAmount;
            paidCount++;
        } else {
            outstandingRevenue += b.totalAmount;
            unpaidCount++;
        }
    });

    // Update Report Texts
    document.getElementById("reportTitleMonth").textContent = translateMonth(selectMonth);
    document.getElementById("repTotalRooms").textContent = totalRooms;
    document.getElementById("repExpected").textContent = formatNumber(expectedRevenue) + " ฿";
    document.getElementById("repCollected").textContent = formatNumber(collectedRevenue) + " ฿";
    document.getElementById("repOutstanding").textContent = formatNumber(outstandingRevenue) + " ฿";
    document.getElementById("repPaidCount").textContent = paidCount;
    document.getElementById("repUnpaidCount").textContent = unpaidCount;

    // Load table list
    const reportTableBody = document.getElementById("reportTableBody");
    reportTableBody.innerHTML = "";

    if (billsThisMonth.length === 0) {
        reportTableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-secondary);">ไม่มีข้อมูลประวัติห้องพักในระบบสำหรับเดือนนี้</td></tr>`;
        return;
    }

    // Sort bills by roomNo
    billsThisMonth.sort((a, b) => {
        const resA = state.residents.find(r => r.id === a.residentId);
        const resB = state.residents.find(r => r.id === b.residentId);
        if (!resA || !resB) return 0;
        return Number(resA.roomNo) - Number(resB.roomNo);
    }).forEach((bill, idx) => {
        const res = state.residents.find(r => r.id === bill.residentId);
        if (!res) return;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${idx + 1}</td>
            <td><strong>ห้อง ${res.roomNo}</strong></td>
            <td>${res.name} ${res.surname}</td>
            <td style="text-align: right;">${formatNumber(bill.roomRent)} ฿</td>
            <td style="text-align: right; font-weight: bold;">${formatNumber(bill.totalAmount)} ฿</td>
            <td>
                <span class="badge ${bill.paid ? 'badge-success' : 'badge-danger'}">
                    ${bill.paid ? 'จ่ายแล้ว' : 'ค้างชำระ'}
                </span>
            </td>
        `;
        reportTableBody.appendChild(tr);
    });
}

function printReport() {
    window.print();
}

// -----------------------------------------------------------------
// TAB 5: SETTINGS LOGIC
// -----------------------------------------------------------------
function renderSettings() {
    document.getElementById("setUnivName").value = state.settings.universityName;
    document.getElementById("setRoomRent").value = state.settings.roomRent;
    document.getElementById("setAdminName").value = state.settings.adminName;
}

function handleSettingsSubmit(e) {
    e.preventDefault();

    const universityName = document.getElementById("setUnivName").value.trim();
    const roomRent = parseFloat(document.getElementById("setRoomRent").value) || 0;
    const adminName = document.getElementById("setAdminName").value.trim();

    if (!universityName || roomRent <= 0 || !adminName) {
        alert("กรุณากรอกข้อมูลการตั้งค่าให้ครบถ้วนและถูกต้อง");
        return;
    }

    const previousRent = state.settings.roomRent;
    state.settings = { universityName, roomRent, adminName };
    saveToStorage();

    // If rent is updated, update active monthly bills that are unpaid
    if (previousRent !== roomRent) {
        state.bills = state.bills.map(b => {
            if (!b.paid) {
                b.roomRent = roomRent;
                b.totalAmount = roomRent;
            }
            return b;
        });
        saveToStorage();
    }

    // Sync admin name display
    document.querySelectorAll(".admin-name-span").forEach(el => el.textContent = adminName);

    alert("บันทึกการตั้งค่าระบบเรียบร้อยแล้ว!");
    switchTab('dashboard');
}

// Clear all app data to factory reset
function resetAllData() {
    if (confirm("⚠️ คำเตือน: คุณแน่ใจหรือไม่ที่จะรีเซ็ตข้อมูลทั้งหมด?\nข้อมูลประวัติการชำระเงินและรายชื่อผู้พักทั้งหมดในระบบจะถูกลบและเปลี่ยนเป็นข้อมูลตัวอย่างเริ่มต้น")) {
        localStorage.clear();
        loadFromStorage();
        alert("รีเซ็ตระบบข้อมูลตัวอย่างสำเร็จ!");
        location.reload();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.dashboard-tab');
    const contents = document.querySelectorAll('.tab-content');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const closeSidebar = document.getElementById('close-sidebar');
    const overlay = document.getElementById('overlay');

    const switchTab = (tabId) => {
        // Update active tab styling
        tabs.forEach(tab => {
            if (tab.dataset.tab === tabId) {
                tab.classList.add('bg-emerald-50', 'text-emerald-600', 'dark:bg-emerald-900/20', 'dark:text-emerald-400');
                tab.classList.remove('text-gray-600', 'dark:text-gray-400');
            } else {
                tab.classList.remove('bg-emerald-50', 'text-emerald-600', 'dark:bg-emerald-900/20', 'dark:text-emerald-400');
                tab.classList.add('text-gray-600', 'dark:text-gray-400');
            }
        });

        // Show/hide content
        contents.forEach(content => {
            if (content.id === `content-${tabId}`) {
                content.classList.add('block');
                content.classList.remove('hidden');

                // Reset and Trigger reveal animations for elements inside the tab
                const revealElements = content.querySelectorAll('.reveal');
                revealElements.forEach((el, index) => {
                    el.classList.remove('active'); // Reset first
                    setTimeout(() => {
                        el.classList.add('active');
                    }, index * 50 + 10); // Stagger them slightly
                });

                // Initialize map if the map tab is switched to
                if (tabId === 'map' && typeof initVolunteerMap === 'function') {
                    initVolunteerMap();
                }
            } else {
                content.classList.add('hidden');
                content.classList.remove('block');
            }
        });

        // Close sidebar on mobile
        if (sidebar && !sidebar.classList.contains('-translate-x-full')) {
            sidebar.classList.add('-translate-x-full');
            if (overlay) overlay.classList.add('hidden');
        }
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(tab.dataset.tab);
        });
    });

    // Sidebar Toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.remove('-translate-x-full');
            if (overlay) overlay.classList.remove('hidden');
        });
    }

    if (closeSidebar) {
        closeSidebar.addEventListener('click', () => {
            sidebar.classList.add('-translate-x-full');
            if (overlay) overlay.classList.add('hidden');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
        });
    }

    // Default tab
    const urlParams = new URLSearchParams(window.location.search);
    const initialTab = urlParams.get('tab') || 'overview';
    switchTab(initialTab);

    // Initial icon creation for dynamic content
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Map Initialization logic
    let volunteerMap;
    const initVolunteerMap = async () => {
        if (volunteerMap) return;

        const mapContainer = document.getElementById('volunteer-map');
        if (mapContainer) {
            volunteerMap = L.map('volunteer-map').setView([45.128, -93.461], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(volunteerMap);

            try {
                const response = await fetch('http://localhost:5000/api/complaints');
                const complaints = await response.json();

                const getMarkerStyles = (status, urgency) => {
                    if (status === 'solved') return { color: '#10b981', shadow: 'rgba(16, 185, 129, 0.6)' };
                    if (status === 'in-progress') return { color: '#f59e0b', shadow: 'rgba(245, 158, 11, 0.6)' };
                    return { color: '#ef4444', shadow: 'rgba(239, 68, 68, 0.6)' };
                };

                complaints.forEach(complaint => {
                    const styles = getMarkerStyles(complaint.status, complaint.urgency);
                    const markerIcon = L.divIcon({
                        className: 'custom-div-icon',
                        html: `
                            <div class="map-pulse" style="
                                background-color: ${styles.color};
                                width: 16px;
                                height: 16px;
                                border-radius: 50%;
                                border: 3px solid white;
                                box-shadow: 0 0 15px ${styles.shadow}, 0 0 25px ${styles.shadow};
                                animation-duration: ${complaint.urgency === 'high' ? '1s' : '20s'};
                            "></div>
                        `,
                        iconSize: [20, 20],
                        iconAnchor: [10, 10]
                    });

                    L.marker([complaint.location.lat, complaint.location.lng], { icon: markerIcon })
                        .addTo(volunteerMap)
                        .bindPopup(`
                            <div class="p-3 min-w-[200px]">
                                <div class="flex items-center gap-2 mb-2">
                                    <div style="width: 10px; height: 10px; border-radius: 50%; background-color: ${styles.color}; shadow: 0 0 5px ${styles.shadow}"></div>
                                    <h3 class="font-black text-gray-900 uppercase text-xs">${complaint.category}</h3>
                                </div>
                                <h2 class="font-bold text-lg leading-tight mb-2">${complaint.title}</h2>
                                <div class="flex justify-between items-center pt-2 border-t border-gray-100">
                                    <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded-full" style="background-color: ${styles.shadow}; color: white">
                                        ${complaint.status}
                                    </span>
                                    <span class="text-[10px] text-gray-400 font-bold uppercase">UID: #ENV-${complaint._id.substring(0, 6)}</span>
                                </div>
                            </div>
                        `);
                });
            } catch (err) {
                console.error('Failed to fetch complaints:', err);
            }
        }
    };

    // Initialize map if default tab is map
    if (initialTab === 'map') {
        initVolunteerMap();
    }

    // Community Chat Logic
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const currentUser = JSON.parse(localStorage.getItem('environet-user'));

    const loadMessages = async () => {
        if (!chatMessages) return;
        try {
            const response = await fetch('http://localhost:5000/api/messages');
            const messages = await response.json();
            chatMessages.innerHTML = '';
            messages.forEach(msg => {
                const isMe = currentUser && msg.sender === currentUser.id;
                const messageDiv = document.createElement('div');
                messageDiv.className = `flex ${isMe ? 'flex-row-reverse ml-auto' : ''} gap-4 max-w-[80%] animate-fade-in`;
                const timeStr = new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                messageDiv.innerHTML = `
                    <div class="w-10 h-10 rounded-full ${isMe ? 'bg-emerald-600' : 'bg-emerald-100'} flex-shrink-0 flex items-center justify-center ${isMe ? 'text-white' : 'text-emerald-600'} font-bold shadow-sm">
                        ${msg.senderName.substring(0, 2).toUpperCase()}
                    </div>
                    <div class="space-y-1 ${isMe ? 'text-right' : ''}">
                        <div class="flex items-center ${isMe ? 'justify-end' : ''} gap-2">
                            ${isMe ? `<span class="text-[10px] text-gray-400">${timeStr}</span><span class="font-bold text-sm text-gray-900 dark:text-white">You</span>` :
                        `<span class="font-bold text-sm text-gray-900 dark:text-white">${msg.senderName}</span><span class="text-[10px] text-gray-400">${timeStr}</span>`}
                        </div>
                        <div class="${isMe ? 'bg-emerald-600 text-white' : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300'} p-3 rounded-2xl ${isMe ? 'rounded-tr-none' : 'rounded-tl-none'} text-sm shadow-sm border ${isMe ? 'border-emerald-500/20' : 'border-gray-100 dark:border-gray-600'}">
                            ${msg.text}
                        </div>
                    </div>
                `;
                chatMessages.appendChild(messageDiv);
            });
            chatMessages.scrollTop = chatMessages.scrollHeight;
        } catch (err) {
            console.error('Failed to load messages:', err);
        }
    };

    if (chatMessages) loadMessages();

    if (chatForm && chatInput && chatMessages) {
        // ... (chat logic existing)
        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const messageText = chatInput.value.trim();
            const token = localStorage.getItem('environet-token');

            if (messageText && token && currentUser) {
                try {
                    const response = await fetch('http://localhost:5000/api/messages', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                        body: JSON.stringify({ text: messageText, senderName: currentUser.name })
                    });

                    if (response.ok) {
                        chatInput.value = '';
                        loadMessages();
                    }
                } catch (err) {
                    console.error('Failed to send message:', err);
                }
            }
        });
    }

    // Report Submission Logic
    const reportForm = document.getElementById('report-form');
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('report-photo');
    const fileNameDisplay = document.getElementById('file-name-display');

    if (dropZone && fileInput) {
        dropZone.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                fileNameDisplay.textContent = `Selected: ${fileInput.files[0].name}`;
                fileNameDisplay.classList.add('text-emerald-600');
            }
        });
    }

    if (reportForm) {
        reportForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const token = localStorage.getItem('environet-token');
            if (!token) {
                alert('Please login first');
                return;
            }

            const formData = new FormData();
            formData.append('category', document.getElementById('report-category').value);
            formData.append('title', document.getElementById('report-title').value);
            formData.append('location', JSON.stringify({
                name: document.getElementById('report-location').value,
                lat: 45.128, // Placeholder or use actual GPS
                lng: -93.461
            }));
            formData.append('description', document.getElementById('report-description').value);
            formData.append('urgency', 'medium'); // Default or add a field for it

            if (fileInput.files[0]) {
                formData.append('image', fileInput.files[0]);
            }

            try {
                const response = await fetch('http://localhost:5000/api/complaints', {
                    method: 'POST',
                    headers: { 'x-auth-token': token },
                    body: formData
                });

                if (response.ok) {
                    alert('Report submitted successfully!');
                    reportForm.reset();
                    fileNameDisplay.textContent = 'Click to upload photo';
                    fileNameDisplay.classList.remove('text-emerald-600');
                    switchTab('my-reports');
                } else {
                    const data = await response.json();
                    alert(data.msg || 'Failed to submit report');
                }
            } catch (err) {
                console.error(err);
                alert('Connection error. Is the backend running?');
            }
        });
    }
});

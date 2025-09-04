// ACWR Training Monitor - Main Application
class ACWRApp {
    constructor() {
        this.sessions = [];
        this.charts = {};
        this.fb = {
            app: null,
            auth: null,
            db: null,
            user: null,
            uid: null,
            connected: false
        };
        
        this.init();
    }
    
    async init() {
        console.log('🚀 Inicializando ACWR Training Monitor...');
        
        // Set today's date as default
        document.getElementById('trainingDate').value = new Date().toISOString().split('T')[0];
        
        // Initialize Firebase
        await this.initFirebase();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Load data
        await this.loadData();
        
        // Setup real-time sync
        this.setupRealTimeSync();
        
        console.log('✅ Aplicação inicializada com sucesso!');
    }
    
    async initFirebase() {
        try {
            if (typeof firebase === 'undefined') {
                throw new Error('Firebase não carregado');
            }
            
            this.fb.app = firebase.initializeApp(FIREBASE_CONFIG);
            this.fb.auth = firebase.auth();
            this.fb.db = firebase.firestore();
            
            // Auth state listener
            this.fb.auth.onAuthStateChanged((user) => {
                this.fb.user = user;
                this.fb.uid = user ? user.uid : null;
                
                if (user) {
                    this.updateUserStatus('Conectado', 'success');
                    this.loadData();
                } else {
                    this.updateUserStatus('Desconectado', 'error');
                }
            });
            
            this.fb.connected = true;
            this.updateUserStatus('Conectando...', 'info');
            
        } catch (error) {
            console.error('❌ Erro ao inicializar Firebase:', error);
            this.updateUserStatus('Erro de conexão', 'error');
            this.showNotification('Erro ao conectar Firebase', 'error');
        }
    }
    
    setupEventListeners() {
        // Form submission
        document.getElementById('trainingForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTrainingSession();
        });
        
        // Login button
        document.getElementById('loginBtn').addEventListener('click', () => {
            this.loginWithGoogle();
        });
        
        // Tab switching
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.getAttribute('onclick').match(/'([^']+)'/)[1];
                this.showTab(tabName);
            });
        });
    }
    
    async loginWithGoogle() {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            await this.fb.auth.signInWithPopup(provider);
            this.showNotification('Login realizado com sucesso!', 'success');
        } catch (error) {
            console.error('❌ Erro no login:', error);
            this.showNotification('Erro no login: ' + error.message, 'error');
        }
    }
    
    async addTrainingSession() {
        try {
            const formData = {
                date: document.getElementById('trainingDate').value,
                activity: document.getElementById('activityType').value,
                duration: parseInt(document.getElementById('duration').value),
                rpe: parseInt(document.getElementById('rpe').value),
                notes: document.getElementById('notes').value,
                timestamp: new Date().toISOString()
            };
            
            // Validate data
            if (!formData.date || !formData.activity || !formData.duration || !formData.rpe) {
                this.showNotification('Preencha todos os campos obrigatórios', 'warning');
                return;
            }
            
            if (formData.rpe < 1 || formData.rpe > 10) {
                this.showNotification('RPE deve estar entre 1 e 10', 'warning');
                return;
            }
            
            // Add to sessions array
            const session = {
                id: crypto.randomUUID(),
                ...formData,
                load: formData.duration * formData.rpe // Calculate training load
            };
            
            this.sessions.push(session);
            
            // Save to Firebase if connected
            if (this.fb.uid) {
                await this.fb.db.collection('users').doc(this.fb.uid).collection('sessions').add(session);
            }
            
            // Save to localStorage as backup
            localStorage.setItem('acwr-sessions', JSON.stringify(this.sessions));
            
            // Update UI
            this.updateKPIs();
            this.updateCharts();
            this.updateSessionsList();
            
            // Clear form
            document.getElementById('trainingForm').reset();
            document.getElementById('trainingDate').value = new Date().toISOString().split('T')[0];
            
            this.showNotification('Treino adicionado com sucesso!', 'success');
            
        } catch (error) {
            console.error('❌ Erro ao adicionar treino:', error);
            this.showNotification('Erro ao adicionar treino: ' + error.message, 'error');
        }
    }
    
    async loadData() {
        try {
            let sessions = [];
            
            if (this.fb.uid && this.fb.db) {
                // Load from Firebase
                const snapshot = await this.fb.db.collection('users').doc(this.fb.uid).collection('sessions').get();
                sessions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } else {
                // Load from localStorage
                const stored = localStorage.getItem('acwr-sessions');
                sessions = stored ? JSON.parse(stored) : [];
            }
            
            this.sessions = sessions.sort((a, b) => new Date(a.date) - new Date(b.date));
            
            // Update UI
            this.updateKPIs();
            this.updateCharts();
            this.updateSessionsList();
            
            console.log(`📊 ${sessions.length} sessões carregadas`);
            
        } catch (error) {
            console.error('❌ Erro ao carregar dados:', error);
            this.showNotification('Erro ao carregar dados', 'error');
        }
    }
    
    updateKPIs() {
        const totalSessions = this.sessions.length;
        const avgRPE = totalSessions > 0 ? (this.sessions.reduce((sum, s) => sum + s.rpe, 0) / totalSessions).toFixed(1) : '0.0';
        const totalMinutes = this.sessions.reduce((sum, s) => sum + s.duration, 0);
        const acwr = this.calculateACWR();
        
        document.getElementById('totalSessions').textContent = totalSessions;
        document.getElementById('avgRPE').textContent = avgRPE;
        document.getElementById('totalMinutes').textContent = totalMinutes;
        document.getElementById('acwrValue').textContent = acwr.toFixed(2);
    }
    
    calculateACWR() {
        if (this.sessions.length < 7) return 0;
        
        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const twentyEightDaysAgo = new Date(now.getTime() - 28 * 24 * 60 * 60 * 1000);
        
        // Calculate acute load (last 7 days)
        const acuteLoad = this.sessions
            .filter(s => new Date(s.date) >= sevenDaysAgo)
            .reduce((sum, s) => sum + s.load, 0);
        
        // Calculate chronic load (last 28 days)
        const chronicLoad = this.sessions
            .filter(s => new Date(s.date) >= twentyEightDaysAgo)
            .reduce((sum, s) => sum + s.load, 0) / 4;
        
        return chronicLoad > 0 ? acuteLoad / chronicLoad : 0;
    }
    
    updateCharts() {
        if (this.sessions.length === 0) {
            this.showEmptyCharts();
            return;
        }
        
        this.updateTimelineChart();
        this.updateRPEChart();
        this.updateActivityChart();
        this.updateWeeklyLoadChart();
    }
    
    updateTimelineChart() {
        const ctx = document.getElementById('timelineChart').getContext('2d');
        
        if (this.charts.timeline) {
            this.charts.timeline.destroy();
        }
        
        const sortedSessions = [...this.sessions].sort((a, b) => new Date(a.date) - new Date(b.date));
        
        this.charts.timeline = new Chart(ctx, {
            type: 'line',
            data: {
                labels: sortedSessions.map(s => new Date(s.date).toLocaleDateString('pt-BR')),
                datasets: [{
                    label: 'RPE',
                    data: sortedSessions.map(s => s.rpe),
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Carga de Treino',
                    data: sortedSessions.map(s => s.load),
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y1'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'RPE'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Carga de Treino'
                        },
                        grid: {
                            drawOnChartArea: false,
                        },
                    }
                }
            }
        });
    }
    
    updateRPEChart() {
        const ctx = document.getElementById('rpeChart').getContext('2d');
        
        if (this.charts.rpe) {
            this.charts.rpe.destroy();
        }
        
        const rpeCounts = {};
        this.sessions.forEach(s => {
            rpeCounts[s.rpe] = (rpeCounts[s.rpe] || 0) + 1;
        });
        
        this.charts.rpe = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(rpeCounts).sort((a, b) => a - b),
                datasets: [{
                    label: 'Frequência',
                    data: Object.values(rpeCounts),
                    backgroundColor: Object.keys(rpeCounts).map(rpe => {
                        const rpeNum = parseInt(rpe);
                        if (rpeNum <= 3) return '#dcfce7';
                        if (rpeNum <= 6) return '#fef3c7';
                        return '#fee2e2';
                    }),
                    borderColor: Object.keys(rpeCounts).map(rpe => {
                        const rpeNum = parseInt(rpe);
                        if (rpeNum <= 3) return '#166534';
                        if (rpeNum <= 6) return '#92400e';
                        return '#991b1b';
                    }),
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }
    
    updateActivityChart() {
        const ctx = document.getElementById('activityChart').getContext('2d');
        
        if (this.charts.activity) {
            this.charts.activity.destroy();
        }
        
        const activityCounts = {};
        this.sessions.forEach(s => {
            activityCounts[s.activity] = (activityCounts[s.activity] || 0) + 1;
        });
        
        const colors = [
            '#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f59e0b',
            '#10b981', '#06b6d4', '#84cc16', '#f97316', '#6366f1'
        ];
        
        this.charts.activity = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(activityCounts),
                datasets: [{
                    data: Object.values(activityCounts),
                    backgroundColor: colors.slice(0, Object.keys(activityCounts).length),
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    updateWeeklyLoadChart() {
        const ctx = document.getElementById('weeklyLoadChart').getContext('2d');
        
        if (this.charts.weeklyLoad) {
            this.charts.weeklyLoad.destroy();
        }
        
        // Calculate weekly loads
        const weeklyLoads = {};
        this.sessions.forEach(s => {
            const date = new Date(s.date);
            const weekStart = new Date(date);
            weekStart.setDate(date.getDate() - date.getDay());
            const weekKey = weekStart.toISOString().split('T')[0];
            
            weeklyLoads[weekKey] = (weeklyLoads[weekKey] || 0) + s.load;
        });
        
        const sortedWeeks = Object.keys(weeklyLoads).sort();
        
        this.charts.weeklyLoad = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedWeeks.map(week => new Date(week).toLocaleDateString('pt-BR')),
                datasets: [{
                    label: 'Carga Semanal',
                    data: sortedWeeks.map(week => weeklyLoads[week]),
                    backgroundColor: 'rgba(99, 102, 241, 0.8)',
                    borderColor: '#6366f1',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    showEmptyCharts() {
        const chartIds = ['timelineChart', 'rpeChart', 'activityChart', 'weeklyLoadChart'];
        
        chartIds.forEach(chartId => {
            const ctx = document.getElementById(chartId).getContext('2d');
            
            if (this.charts[chartId.replace('Chart', '')]) {
                this.charts[chartId.replace('Chart', '')].destroy();
            }
            
            this.charts[chartId.replace('Chart', '')] = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: []
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        });
    }
    
    updateSessionsList() {
        const container = document.getElementById('sessionsList');
        
        if (this.sessions.length === 0) {
            container.innerHTML = '<div class="text-center text-gray-500 py-8">Nenhuma sessão de treino encontrada</div>';
            return;
        }
        
        const sortedSessions = [...this.sessions].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        container.innerHTML = sortedSessions.map(session => `
            <div class="session-item">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <div class="flex items-center space-x-4 mb-2">
                            <h3 class="text-lg font-semibold text-gray-800">${session.activity}</h3>
                            <span class="rpe-badge ${this.getRPEClass(session.rpe)}">RPE ${session.rpe}</span>
                        </div>
                        <div class="text-sm text-gray-600 space-y-1">
                            <div>📅 ${new Date(session.date).toLocaleDateString('pt-BR')}</div>
                            <div>⏱️ ${session.duration} minutos</div>
                            <div>💪 Carga: ${session.load}</div>
                            ${session.notes ? `<div>📝 ${session.notes}</div>` : ''}
                        </div>
                    </div>
                    <button onclick="app.deleteSession('${session.id}')" class="text-red-500 hover:text-red-700 ml-4">
                        🗑️
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    getRPEClass(rpe) {
        if (rpe <= 3) return 'rpe-low';
        if (rpe <= 6) return 'rpe-medium';
        return 'rpe-high';
    }
    
    async deleteSession(sessionId) {
        if (!confirm('Tem certeza que deseja excluir esta sessão?')) return;
        
        try {
            // Remove from array
            this.sessions = this.sessions.filter(s => s.id !== sessionId);
            
            // Remove from Firebase if connected
            if (this.fb.uid) {
                await this.fb.db.collection('users').doc(this.fb.uid).collection('sessions').doc(sessionId).delete();
            }
            
            // Update localStorage
            localStorage.setItem('acwr-sessions', JSON.stringify(this.sessions));
            
            // Update UI
            this.updateKPIs();
            this.updateCharts();
            this.updateSessionsList();
            
            this.showNotification('Sessão excluída com sucesso!', 'success');
            
        } catch (error) {
            console.error('❌ Erro ao excluir sessão:', error);
            this.showNotification('Erro ao excluir sessão', 'error');
        }
    }
    
    setupRealTimeSync() {
        // Listen for localStorage changes (cross-tab sync)
        window.addEventListener('storage', (e) => {
            if (e.key === 'acwr-sessions') {
                this.loadData();
            }
        });
        
        // Listen for Firebase changes
        if (this.fb.uid && this.fb.db) {
            this.fb.db.collection('users').doc(this.fb.uid).collection('sessions')
                .onSnapshot((snapshot) => {
                    const sessions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    this.sessions = sessions.sort((a, b) => new Date(a.date) - new Date(b.date));
                    
                    // Update localStorage
                    localStorage.setItem('acwr-sessions', JSON.stringify(this.sessions));
                    
                    // Update UI
                    this.updateKPIs();
                    this.updateCharts();
                    this.updateSessionsList();
                });
        }
    }
    
    showTab(tabName) {
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.add('hidden');
        });
        
        // Remove active class from all tabs
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Show selected tab
        document.getElementById(tabName + 'Tab').classList.remove('hidden');
        
        // Add active class to clicked tab
        event.target.classList.add('active');
        
        // Update charts if dashboard tab is selected
        if (tabName === 'dashboard') {
            setTimeout(() => {
                this.updateCharts();
            }, 100);
        }
    }
    
    updateUserStatus(text, type) {
        const statusEl = document.getElementById('userStatus');
        statusEl.textContent = text;
        
        // Update styling based on type
        statusEl.className = 'text-white text-sm px-3 py-1 rounded-full ';
        switch (type) {
            case 'success':
                statusEl.className += 'bg-green-500 bg-opacity-80';
                break;
            case 'error':
                statusEl.className += 'bg-red-500 bg-opacity-80';
                break;
            case 'info':
                statusEl.className += 'bg-blue-500 bg-opacity-80';
                break;
            default:
                statusEl.className += 'bg-white bg-opacity-20';
        }
    }
    
    showNotification(message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        container.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => container.removeChild(notification), 300);
        }, 3000);
    }
}

// Global functions for HTML onclick handlers
function showTab(tabName) {
    app.showTab(tabName);
}

function applyFilters() {
    // Filter functionality can be implemented here
    console.log('Filtros aplicados');
}

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new ACWRApp();
});
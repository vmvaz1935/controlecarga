# ACWR Training Monitor

Um aplicativo moderno e responsivo para monitoramento de treinos e análise de carga de trabalho aguda:crônica (ACWR).

## 🚀 Características

### ✨ Design Moderno
- **Interface Glassmorphism**: Design moderno com efeitos de vidro e blur
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Gradientes**: Cores vibrantes e gradientes suaves
- **Animações**: Transições suaves e efeitos hover

### 📊 Funcionalidades Principais
- **Entrada de Dados**: Formulário intuitivo para adicionar sessões de treino
- **Dashboard Interativo**: Gráficos em tempo real com Chart.js
- **Análise ACWR**: Cálculo automático da relação aguda:crônica
- **Histórico**: Visualização e gerenciamento de todas as sessões
- **Sincronização**: Dados salvos localmente e na nuvem (Firebase)

### 📈 Gráficos Disponíveis
1. **Evolução Temporal**: RPE e carga de treino ao longo do tempo
2. **Distribuição RPE**: Frequência de cada nível de RPE
3. **Tipos de Atividade**: Distribuição por modalidade esportiva
4. **Carga Semanal**: Volume de treino por semana

### 🔐 Autenticação
- **Login com Google**: Integração com Firebase Auth
- **Dados Seguros**: Informações protegidas por usuário
- **Backup Local**: localStorage como fallback

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Styling**: Tailwind CSS + CSS Custom Properties
- **Gráficos**: Chart.js
- **Backend**: Firebase (Firestore + Auth)
- **Fontes**: Google Fonts (Inter)
- **Ícones**: Emojis nativos

## 📱 Como Usar

### 1. Adicionar Treino
- Acesse a aba "📝 Adicionar Treino"
- Preencha os dados: data, atividade, duração e RPE
- Clique em "➕ Adicionar Treino"

### 2. Visualizar Dashboard
- Acesse a aba "📊 Dashboard"
- Visualize os gráficos em tempo real
- Monitore KPIs importantes

### 3. Histórico
- Acesse a aba "📋 Histórico"
- Veja todas as sessões de treino
- Filtre por período
- Exclua sessões se necessário

## 🔧 Configuração

### Firebase Setup
1. Crie um projeto no [Firebase Console](https://console.firebase.google.com)
2. Ative Authentication (Google Provider)
3. Ative Firestore Database
4. Copie as credenciais para o arquivo `index.html`

### Execução Local
```bash
# Clone o repositório
git clone <repository-url>

# Abra o arquivo index.html em um navegador
# Ou use um servidor local:
python -m http.server 8000
# Acesse: http://localhost:8000
```

## 📊 Métricas ACWR

O ACWR (Acute:Chronic Workload Ratio) é calculado como:
- **Carga Aguda**: Soma da carga de treino dos últimos 7 dias
- **Carga Crônica**: Média da carga de treino dos últimos 28 dias
- **ACWR**: Carga Aguda ÷ Carga Crônica

### Interpretação:
- **< 0.8**: Baixo risco de lesão
- **0.8 - 1.3**: Zona ideal
- **> 1.3**: Alto risco de lesão

## 🎨 Design System

### Cores
- **Primary**: #6366f1 (Indigo)
- **Secondary**: #8b5cf6 (Purple)
- **Success**: #10b981 (Emerald)
- **Warning**: #f59e0b (Amber)
- **Danger**: #ef4444 (Red)

### Tipografia
- **Fonte**: Inter (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700, 800

### Componentes
- **Cards**: Glassmorphism com blur
- **Botões**: Gradientes com hover effects
- **Inputs**: Bordas animadas
- **Notificações**: Toast notifications

## 🔄 Sincronização

### Tempo Real
- **Firebase Firestore**: Sincronização automática
- **localStorage**: Backup local
- **Cross-tab**: Sincronização entre abas

### Estrutura de Dados
```javascript
{
  id: "uuid",
  date: "2024-01-01",
  activity: "Corrida",
  duration: 45,
  rpe: 7,
  load: 315, // duration * rpe
  notes: "Treino leve",
  timestamp: "2024-01-01T10:00:00.000Z"
}
```

## 🚀 Deploy

### Firebase Hosting
```bash
# Instale Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Inicialize o projeto
firebase init hosting

# Deploy
firebase deploy
```

### GitHub Pages
1. Faça push para o repositório
2. Ative GitHub Pages nas configurações
3. Selecione a branch main

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:
1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 Suporte

Para suporte ou dúvidas:
- Abra uma issue no GitHub
- Entre em contato via email

---

**ACWR Training Monitor** - Monitore seus treinos de forma inteligente! 🏃‍♂️💪
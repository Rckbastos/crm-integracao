# 🚀 Sistema de Solicitação de Integrações - Pegasus Checkout

Sistema completo para gerenciar solicitações de integração de gateways de pagamento no Checkout Pegasus.

---

## 📦 **CONTEÚDO DO PACOTE**

```
pegasus-integration-system/
├── backend/                            # API Node.js + Prisma + arquivos estáticos
│   └── public/                         # index.html, admin.html, pegasus-logo.jpg
└── README.md                           # Este arquivo
```

---

## 🌐 **ESTRUTURA DO SISTEMA**

### **1. Formulário Público (`/`)**
- Página para interessados solicitarem integração
- Campos completos de gateway, responsável, desenvolvedor
- Upload de logo e documentação
- Seleção de meios de pagamento
- Validação de campos obrigatórios
- Dados salvos no banco PostgreSQL via API

### **2. Painel Administrativo (`/admin`)**
- Dashboard com estatísticas
- Tabela de solicitações
- Filtros por status e data
- Busca por gateway/responsável
- Modal de detalhes completo
- Aprovar/Rejeitar solicitações
- Exportar para CSV

---

## 🚀 **INSTALAÇÃO**

### **Opção Única: Deploy Completo no Railway (Backend + Front)**

1. **O backend serve os HTMLs estáticos:**
   - Formulário: `/`
   - Admin: `/admin`

2. **Faça o deploy do repositório no Railway**

3. **Configure as variáveis de ambiente:**
   - `DATABASE_URL`
   - `PORT=3333`
   - `NODE_ENV=production`
   - `CORS_ORIGINS` (se usar domínios externos)

---

## 🔒 **SEGURANÇA**

### **Proteger Painel Admin**

#### **Apache (.htaccess)**
```apache
AuthType Basic
AuthName "Área Restrita - Pegasus Admin"
AuthUserFile /caminho/para/.htpasswd
Require valid-user
```

#### **Nginx**
```nginx
location /admin.html {
    auth_basic "Área Restrita - Pegasus Admin";
    auth_basic_user_file /etc/nginx/.htpasswd;
}
```

#### **Criar arquivo .htpasswd**
```bash
htpasswd -c .htpasswd admin
```

---

## 💾 **ARMAZENAMENTO DE DADOS**

### **Versão Atual (PostgreSQL)**
- Backend Node.js + Express + Prisma em `backend/`
- Banco PostgreSQL para persistência real
- API REST consumida pelo formulário e painel admin

---

## 🎨 **PERSONALIZAÇÃO**

### **Cores (CSS)**
```css
/* Cor principal (dourado Pegasus) */
--primary-color: #b5a472;

/* Fundo escuro */
--bg-dark: #1a1a1a;

/* Cores de status */
--success: #4ade80;
--warning: #fbbf24;
--danger: #ef4444;
--info: #3b82f6;
```

### **Logo**
- Substitua `pegasus-logo.jpg` pela sua logo
- Formatos suportados: JPG, PNG, SVG
- Tamanho recomendado: 512x512px

---

## 📱 **RESPONSIVIDADE**

✅ **Desktop** (>1024px) - Layout completo  
✅ **Tablet** (768px-1024px) - Grid adaptativo  
✅ **Mobile** (<768px) - Layout vertical  

---

## 🧪 **TESTE LOCAL**

1. Configure um banco PostgreSQL e exporte a URL:
```bash
export DATABASE_URL="postgresql://user:password@host:port/database"
```

2. Instale dependências e rode o backend:
```bash
cd backend
npm install
npm run generate
npm run dev
```

3. Acesse:
- Formulário: `http://localhost:3333/`
- Admin: `http://localhost:3333/admin`
- API: `http://localhost:3333/api/health`

## 🚂 **DEPLOY NO RAILWAY (RESUMO)**

1. Crie um serviço PostgreSQL no Railway e copie o `DATABASE_URL`.
2. Configure as variáveis de ambiente no serviço do backend:
   - `DATABASE_URL`
   - `PORT=3333`
   - `NODE_ENV=production`
   - `CORS_ORIGINS=https://www.seudominio.com,https://admin.seudominio.com`
3. Suba o repositório e deixe o Railway usar o `railway.json`.
4. Após o deploy, execute as migrações:
   - `npm run migrate` (o start já chama isso no Railway).

## Deploy no Railway

### 1. Preparar migrations localmente
```bash
cd backend
npm install
npx prisma migrate dev --name init
```

### 2. Configurar no Railway

- Criar database PostgreSQL
- Conectar `DATABASE_URL` ao serviço backend
- Adicionar variáveis: `NODE_ENV=production`, `CORS_ORIGINS`
- Deploy automático ao push

### 3. Após primeiro deploy

- A URL do Railway já serve front + API no mesmo domínio

### 4. Comandos úteis
```bash
# Ver logs
railway logs --service crm-integracao

# Rodar migrations manualmente
railway run npx prisma migrate deploy

# Conectar ao banco
railway run npx prisma studio
```

---

## 📊 **FUNCIONALIDADES**

### **Formulário Público**
- ✅ 10 campos obrigatórios
- ✅ Upload de logo (PNG, JPG, SVG)
- ✅ Upload de documentação (PDF, DOC, TXT)
- ✅ URL alternativa para documentação
- ✅ 7 meios de pagamento (checkboxes)
- ✅ Chaves de API Sandbox
- ✅ Conta de produção (alternativa)
- ✅ Máscara de telefone automática
- ✅ Validação de campos
- ✅ Mensagem de sucesso

### **Painel Admin**
- ✅ 4 cards de estatísticas
- ✅ Tabela de solicitações
- ✅ Filtros (status, data, busca)
- ✅ Modal de detalhes
- ✅ Aprovar/Rejeitar
- ✅ Exportar CSV
- ✅ Badges coloridos por status
- ✅ Sidebar com navegação

---

## 🔄 **FLUXO COMPLETO**

1. **Cliente acessa formulário** → Preenche dados
2. **Sistema valida campos** → Salva no banco PostgreSQL
3. **Mensagem de sucesso** → "Solicitação enviada!"
4. **Admin acessa painel** → Vê nova solicitação (status: Pendente)
5. **Admin clica "Ver Detalhes"** → Modal com todas as informações
6. **Admin aprova/rejeita** → Status atualizado
7. **Admin exporta relatório** → CSV com todos os dados

---

## 📞 **SUPORTE**

Para dúvidas ou suporte técnico:
- **E-mail:** suporte@zenithglobal.com
- **WhatsApp:** +55 (11) 99999-9999
- **Site:** https://pegasus.zenithglobal.com

---

## 📄 **LICENÇA**

© 2026 Zenith Global - Pegasus Checkout  
Todos os direitos reservados.

---

## 🚀 **PRÓXIMOS PASSOS**

Após subir ao ar, considere:

1. **Integração com backend** para persistência real
2. **Notificações por e-mail** para novos pedidos
3. **Dashboard de estatísticas** com gráficos
4. **Sistema de comentários** internos
5. **Timeline de status** para cada solicitação
6. **API REST** para integrações externas
7. **Webhook** para notificar sistemas externos

---

**Sistema desenvolvido por Manus AI**  
**Data:** Fevereiro 2026  
**Versão:** 1.0.0

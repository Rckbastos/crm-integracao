# 🚀 Sistema de Solicitação de Integrações - Pegasus Checkout

Sistema completo para gerenciar solicitações de integração de gateways de pagamento no Checkout Pegasus.

---

## 📦 **CONTEÚDO DO PACOTE**

```
pegasus-integration-system/
├── index.html                          # Formulário público (renomeie para index.html no servidor)
├── admin.html                          # Painel administrativo
├── pegasus-logo.jpg                    # Logo oficial do Pegasus
└── README.md                           # Este arquivo
```

---

## 🌐 **ESTRUTURA DO SISTEMA**

### **1. Formulário Público (`index.html`)**
- Página para interessados solicitarem integração
- Campos completos de gateway, responsável, desenvolvedor
- Upload de logo e documentação
- Seleção de meios de pagamento
- Validação de campos obrigatórios
- Dados salvos no localStorage

### **2. Painel Administrativo (`admin.html`)**
- Dashboard com estatísticas
- Tabela de solicitações
- Filtros por status e data
- Busca por gateway/responsável
- Modal de detalhes completo
- Aprovar/Rejeitar solicitações
- Exportar para CSV

---

## 🚀 **INSTALAÇÃO**

### **Opção 1: Hospedagem Simples (HTML Estático)**

1. **Faça upload dos arquivos para seu servidor:**
   ```
   /public_html/
   ├── index.html              (renomeie pegasus-integration-form.html)
   ├── admin.html              (renomeie pegasus-integration-admin.html)
   └── pegasus-logo.jpg
   ```

2. **Configure os acessos:**
   - Formulário público: `https://seudominio.com/`
   - Painel admin: `https://seudominio.com/admin.html`

3. **Proteja o painel admin:**
   - Adicione autenticação via `.htaccess` (Apache)
   - Ou use autenticação do servidor (Nginx)

### **Opção 2: Hospedagem com Subdomínios**

1. **Crie 2 subdomínios:**
   - `integracao.pegasus.com` → Formulário público
   - `admin-integracao.pegasus.com` → Painel admin

2. **Faça upload separado:**
   - Subdomínio 1: `index.html` + `pegasus-logo.jpg`
   - Subdomínio 2: `admin.html` + `pegasus-logo.jpg`

### **Opção 3: Deploy no Manus (Recomendado)**

1. **Integre no projeto React (checkout-br)**
2. **Adicione backend com tRPC**
3. **Salve dados no banco (MySQL/TiDB)**
4. **Upload real de arquivos (S3)**
5. **Autenticação com Manus OAuth**

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

### **Versão Atual (LocalStorage)**
- Dados salvos no navegador
- Sincronização automática entre páginas
- **Limitação:** Dados locais apenas

### **Versão Futura (Backend)**
Para produção, recomendamos:
1. **Backend API** (Node.js + tRPC)
2. **Banco de dados** (MySQL/PostgreSQL)
3. **Upload S3** para logos e documentações
4. **E-mail notifications** para novos pedidos
5. **Webhook** para integração com CRM

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

### **Método 1: Python**
```bash
cd pegasus-integration-system
python3 -m http.server 8080
```
Acesse: `http://localhost:8080`

### **Método 2: Node.js**
```bash
npx serve pegasus-integration-system
```

### **Método 3: PHP**
```bash
php -S localhost:8080
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
2. **Sistema valida campos** → Salva no localStorage
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

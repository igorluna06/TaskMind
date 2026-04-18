# 🚀 O que é?

- O TaskMind é uma plataforma inteligente de organização de tarefas, eventos e compromissos que utiliza Inteligência Artificial para transformar comandos em linguagem natural em eventos estruturados automaticamente.

- A partir de um simples prompt do usuário, a IA interpreta, extrai informações relevantes e constrói a estrutura do evento, que é então gerenciado por um sistema de agenda integrado.

# 🎯 Problema que resolve

- Muitas pessoas enfrentam dificuldades para organizar suas tarefas e compromissos do dia a dia, o que pode resultar em esquecimentos, atrasos e baixa produtividade.

- O TaskMind resolve esse problema ao simplificar a criação e o gerenciamento de eventos, utilizando IA para automatizar a organização e um sistema de notificações para garantir que o usuário esteja sempre informado sobre seus compromissos.

# ⚙️ Funcionalidades
- Criação de eventos a partir de comandos em linguagem natural
- Interpretação inteligente de prompts utilizando IA
- Extração automática de informações (nome, horário, duração, frequência, tipo e prioridade)
- Classificação de intenção (criar, editar, deletar ou listar eventos)
- Sistema de fallback para coleta de informações incompletas
- Gerenciamento completo de eventos (criação, edição e exclusão)
- Sistema de notificações para eventos agendados
- Atualização em tempo real
- Interface simples e intuitiva
- Acesso via web

# 🧩 Arquitetura do Sistema
- Entrada: Prompt do usuário
- Interpretação: IA processa e entende o contexto
- Extração: Identificação de entidades relevantes
- Validção: Verificação de dados obrigatórios
- Enriquecimento: Complemento das informações (quando necessário)
- Domínio: Estruturação do evento
- Persistência: Armazenamento no banco de dados
- Agendamento: Execução de eventos no tempo correto
- Notificação: Alertas em tempo real e programados

# 🏗️ Arquitetura do projeto

- O projeto foi estruturado seguindo princípios da Clean Architecture, com foco na separação de responsabilidades e baixo acoplamento entre as camadas.

- A aplicação é organizada em camadas principais:

- Domain
Responsável pelas regras de negócio centrais da aplicação.
Contém:
    - Entidades (ex: Event)
    - Enums (ex: EventStatus, EventType)
    - Errors de domínio

- Application (Services / Use Cases)
Responsável pela lógica de aplicação e orquestração dos casos de uso, como:
    - Criar evento
    - Cancelar evento
    - Atualizar evento

- Infrastructure
Responsável por implementações externas, como:
    - Repositórios (acesso ao banco de dados)
    - Integrações com serviços externos

- Interface (API)
Camada responsável pela comunicação com o mundo externo:
  - Controllers
  - Rotas (Express)

# 🛠️ Tecnologias Utilizadas
- Backend
- Node.js
- Express.js
- TypeScript
- Banco de Dados
- PostgreSQL

# 📚 Bibliotecas Utilizadas
- Inteligência Artificial
Groq SDK (llama3)

- ORM
Prisma 

- Tempo real
Socket.IO

- Agendamento
node-cron


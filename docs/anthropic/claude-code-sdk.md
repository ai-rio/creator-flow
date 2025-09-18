# Claude Code SDK

> Construa agentes de IA personalizados com o Claude Code SDK

## Por que usar o Claude Code SDK?

O Claude Code SDK fornece todos os blocos de construção necessários para criar agentes prontos para produção:

- **Integração otimizada com Claude**: Cache automático de prompts e
  otimizações de desempenho
- **Ecossistema rico de ferramentas**: Operações de arquivo, execução de código, busca na web e
  extensibilidade MCP
- **Permissões avançadas**: Controle refinado sobre as capacidades do agente
- **Essenciais para produção**: Tratamento de erros integrado, gerenciamento de sessão e
  monitoramento

## O que você pode construir com o SDK?

Aqui estão alguns tipos de agentes de exemplo que você pode criar:

**Agentes de codificação:**

- Agentes SRE que diagnosticam e corrigem problemas de produção
- Bots de revisão de segurança que auditam código em busca de vulnerabilidades
- Assistentes de engenharia de plantão que fazem triagem de incidentes
- Agentes de revisão de código que aplicam estilo e melhores práticas

**Agentes de negócios:**

- Assistentes jurídicos que revisam contratos e conformidade
- Consultores financeiros que analisam relatórios e previsões
- Agentes de suporte ao cliente que resolvem problemas técnicos
- Assistentes de criação de conteúdo para equipes de marketing

O SDK está atualmente disponível em TypeScript e Python, com uma interface de linha de comando (CLI) para prototipagem rápida.

## Início rápido

Tenha seu primeiro agente funcionando em menos de 5 minutos:

<Steps>
  <Step title="Instalar o SDK">
    <Tabs>
      <Tab title="Linha de comando">
        Instale `@anthropic-ai/claude-code` do NPM:

        ```bash
        npm install -g @anthropic-ai/claude-code
        ```
      </Tab>

      <Tab title="TypeScript">
        Instale `@anthropic-ai/claude-code` do NPM:

        ```bash
        npm install -g @anthropic-ai/claude-code
        ```
      </Tab>

      <Tab title="Python">
        Instale `claude-code-sdk` do PyPI e `@anthropic-ai/claude-code` do NPM:

        ```bash
        pip install claude-code-sdk
        npm install -g @anthropic-ai/claude-code  # Dependência obrigatória
        ```

        (Opcional) Instale IPython para desenvolvimento interativo:

        ```bash
        pip install ipython
        ```
      </Tab>
    </Tabs>

  </Step>

  <Step title="Definir sua chave de API">
    Obtenha sua chave de API do [Console Anthropic](https://console.anthropic.com/) e defina a variável de ambiente `ANTHROPIC_API_KEY`:

    ```bash
    export ANTHROPIC_API_KEY="sua-chave-de-api-aqui"
    ```

  </Step>

  <Step title="Criar seu primeiro agente">
    Crie um destes agentes de exemplo:

    <Tabs>
      <Tab title="Linha de comando">
        ```bash
        # Criar um assistente jurídico simples
        claude -p "Revise esta cláusula de contrato em busca de possíveis problemas: 'A parte concorda com responsabilidade ilimitada...'" \
          --append-system-prompt "Você é um assistente jurídico. Identifique riscos e sugira melhorias."
        ```
      </Tab>

      <Tab title="TypeScript">
        ```ts
        // legal-agent.ts
        import { query } from "@anthropic-ai/claude-code";

        // Criar um assistente jurídico simples
        for await (const message of query({
          prompt: "Revise esta cláusula de contrato em busca de possíveis problemas: 'A parte concorda com responsabilidade ilimitada...'",
          options: {
            systemPrompt: "Você é um assistente jurídico. Identifique riscos e sugira melhorias.",
            maxTurns: 2
          }
        })) {
          if (message.type === "result") {
            console.log(message.result);
          }
        }
        ```
      </Tab>

      <Tab title="Python">
        ```python
        # legal-agent.py
        import asyncio
        from claude_code_sdk import ClaudeSDKClient, ClaudeCodeOptions

        async def main():
            async with ClaudeSDKClient(
                options=ClaudeCodeOptions(
                    system_prompt="Você é um assistente jurídico. Identifique riscos e sugira melhorias.",
                    max_turns=2
                )
            ) as client:
                # Enviar a consulta
                await client.query(
                    "Revise esta cláusula de contrato em busca de possíveis problemas: 'A parte concorda com responsabilidade ilimitada...'"
                )

                # Transmitir a resposta
                async for message in client.receive_response():
                    if hasattr(message, 'content'):
                        # Imprimir conteúdo de transmissão conforme chega
                        for block in message.content:
                            if hasattr(block, 'text'):
                                print(block.text, end='', flush=True)

        if __name__ == "__main__":
            asyncio.run(main())
        ```
      </Tab>
    </Tabs>

  </Step>

  <Step title="Executar o agente">
    <Tabs>
      <Tab title="Linha de comando">
        Copie e cole o comando acima diretamente no seu terminal.
      </Tab>

      <Tab title="TypeScript">
        1. Configurar projeto:

        ```bash
        npm init -y
        npm install @anthropic-ai/claude-code tsx
        ```

        2. Adicione `"type": "module"` ao seu package.json

        3. Salve o código acima como `legal-agent.ts`, depois execute:

        ```bash
        npx tsx legal-agent.ts
        ```
      </Tab>

      <Tab title="Python">
        Salve o código acima como `legal-agent.py`, depois execute:

        ```bash
        python legal-agent.py
        ```

        Para notebooks [IPython](https://ipython.org/)/Jupyter, você pode executar o código diretamente em uma célula:

        ```python
        await main()
        ```
      </Tab>
    </Tabs>

  </Step>
</Steps>

Cada exemplo acima cria um agente funcional que irá:

- Analisar o prompt usando as capacidades de raciocínio do Claude
- Planejar uma abordagem de múltiplas etapas para resolver o problema
- Executar ações usando ferramentas como operações de arquivo, comandos bash e busca na web
- Fornecer recomendações acionáveis baseadas na análise

## Uso principal

### Visão geral

O Claude Code SDK permite que você faça interface com o Claude Code em modo não interativo a partir de suas aplicações.

<Tabs>
  <Tab title="Linha de comando">
    **Pré-requisitos**

    * Node.js 18+
    * `@anthropic-ai/claude-code` do NPM

    **Uso básico**

    A interface principal de linha de comando para o Claude Code é o comando `claude`. Use a flag `--print` (ou `-p`) para executar em modo não interativo e imprimir o resultado final:

    ```bash
    claude -p "Analisar desempenho do sistema" \
      --append-system-prompt "Você é um engenheiro de desempenho" \
      --allowedTools "Bash,Read,WebSearch" \
      --permission-mode acceptEdits \
      --cwd /caminho/para/projeto
    ```

    **Configuração**

    O SDK aproveita todas as opções CLI disponíveis no Claude Code. Aqui estão as principais para uso do SDK:

    | Flag                       | Descrição                                                                                                                             | Exemplo                                                                                                                   |
    | :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------ |
    | `--print`, `-p`            | Executar em modo não interativo                                                                                                       | `claude -p "consulta"`                                                                                                    |
    | `--output-format`          | Especificar formato de saída (`text`, `json`, `stream-json`)                                                                          | `claude -p --output-format json`                                                                                          |
    | `--resume`, `-r`           | Retomar uma conversa por ID de sessão                                                                                                 | `claude --resume abc123`                                                                                                  |
    | `--continue`, `-c`         | Continuar a conversa mais recente                                                                                                     | `claude --continue`                                                                                                       |
    | `--verbose`                | Habilitar log detalhado                                                                                                               | `claude --verbose`                                                                                                        |
    | `--append-system-prompt`   | Anexar ao prompt do sistema (apenas com `--print`)                                                                                    | `claude --append-system-prompt "Instrução personalizada"`                                                                 |
    | `--allowedTools`           | Lista separada por espaços de ferramentas permitidas, ou <br /><br /> string de lista separada por vírgulas de ferramentas permitidas | `claude --allowedTools mcp__slack mcp__filesystem`<br /><br />`claude --allowedTools "Bash(npm install),mcp__filesystem"` |
    | `--disallowedTools`        | Lista separada por espaços de ferramentas negadas, ou <br /><br /> string de lista separada por vírgulas de ferramentas negadas       | `claude --disallowedTools mcp__splunk mcp__github`<br /><br />`claude --disallowedTools "Bash(git commit),mcp__github"`   |
    | `--mcp-config`             | Carregar servidores MCP de um arquivo JSON                                                                                            | `claude --mcp-config servers.json`                                                                                        |
    | `--permission-prompt-tool` | Ferramenta MCP para lidar com prompts de permissão (apenas com `--print`)                                                             | `claude --permission-prompt-tool mcp__auth__prompt`                                                                       |

    Para uma lista completa de opções CLI e recursos, consulte a documentação de [referência CLI](/pt/docs/claude-code/cli-reference).

  </Tab>

  <Tab title="TypeScript">
    **Pré-requisitos**

    * Node.js 18+
    * `@anthropic-ai/claude-code` do NPM

    <Note>
      Para visualizar o código-fonte do SDK TypeScript, visite a [página `@anthropic-ai/claude-code` no NPM](https://www.npmjs.com/package/@anthropic-ai/claude-code?activeTab=code).
    </Note>

    **Uso básico**

    A interface principal via SDK TypeScript é a função `query`, que retorna um iterador assíncrono que transmite mensagens conforme chegam:

    ```ts
    import { query } from "@anthropic-ai/claude-code";

    for await (const message of query({
      prompt: "Analisar desempenho do sistema",
      abortController: new AbortController(),
      options: {
        maxTurns: 5,
        systemPrompt: "Você é um engenheiro de desempenho",
        allowedTools: ["Bash", "Read", "WebSearch"]
      }
    })) {
      if (message.type === "result") {
        console.log(message.result);
      }
    }
    ```

    **Configuração**

    O SDK TypeScript aceita todos os argumentos suportados pela [linha de comando](/pt/docs/claude-code/cli-reference), bem como as seguintes opções adicionais:

    | Argumento                    | Descrição                             | Padrão                                                                              |
    | :--------------------------- | :------------------------------------ | :---------------------------------------------------------------------------------- |
    | `abortController`            | Controlador de aborto                 | `new AbortController()`                                                             |
    | `cwd`                        | Diretório de trabalho atual           | `process.cwd()`                                                                     |
    | `executable`                 | Qual runtime JavaScript usar          | `node` quando executando com Node.js, `bun` quando executando com Bun               |
    | `executableArgs`             | Argumentos para passar ao executável  | `[]`                                                                                |
    | `pathToClaudeCodeExecutable` | Caminho para o executável Claude Code | Executável que vem com `@anthropic-ai/claude-code`                                  |
    | `permissionMode`             | Modo de permissão para a sessão       | `"default"` (opções: `"default"`, `"acceptEdits"`, `"plan"`, `"bypassPermissions"`) |

  </Tab>

  <Tab title="Python">
    **Pré-requisitos**

    * Python 3.10+
    * `claude-code-sdk` do PyPI
    * Node.js 18+
    * `@anthropic-ai/claude-code` do NPM

    <Note>
      Para visualizar o código-fonte do SDK Python, consulte o repositório [`claude-code-sdk`](https://github.com/anthropics/claude-code-sdk-python).
    </Note>

    <Tip>
      Para desenvolvimento interativo, use [IPython](https://ipython.org/): `pip install ipython`
    </Tip>

    **Uso básico**

    O SDK Python fornece duas interfaces principais:

    1. A classe `ClaudeSDKClient` (Recomendada)

    Melhor para transmitir respostas, conversas de múltiplas rodadas e aplicações interativas:

    ```python
    import asyncio
    from claude_code_sdk import ClaudeSDKClient, ClaudeCodeOptions

    async def main():
        async with ClaudeSDKClient(
            options=ClaudeCodeOptions(
                system_prompt="Você é um engenheiro de desempenho",
                allowed_tools=["Bash", "Read", "WebSearch"],
                max_turns=5
            )
        ) as client:
            await client.query("Analisar desempenho do sistema")

            # Transmitir respostas
            async for message in client.receive_response():
                if hasattr(message, 'content'):
                    for block in message.content:
                        if hasattr(block, 'text'):
                            print(block.text, end='', flush=True)

    # Executar como script
    asyncio.run(main())

    # Ou no IPython/Jupyter: await main()
    ```

    O SDK também suporta passar mensagens estruturadas e entradas de imagem:

    ```python
    from claude_code_sdk import ClaudeSDKClient, ClaudeCodeOptions

    async with ClaudeSDKClient() as client:
        # Mensagem de texto
        await client.query("Analise este código em busca de problemas de segurança")

        # Mensagem com referência de imagem (imagem será lida pela ferramenta Read do Claude)
        await client.query("Explique o que é mostrado em screenshot.png")

        # Múltiplas mensagens em sequência
        messages = [
            "Primeiro, analise o diagrama de arquitetura em diagram.png",
            "Agora sugira melhorias baseadas no diagrama",
            "Finalmente, gere código de implementação"
        ]

        for msg in messages:
            await client.query(msg)
            async for response in client.receive_response():
                # Processar cada resposta
                pass

    # O SDK lida com arquivos de imagem através da ferramenta Read integrada do Claude
    # Formatos suportados: PNG, JPG, PDF e outros formatos comuns
    ```

    <Note>
      Os exemplos Python nesta página usam `asyncio`, mas você também pode usar `anyio`.
    </Note>

    2. A função `query`

    Para consultas simples e únicas:

    ```python
    from claude_code_sdk import query, ClaudeCodeOptions

    async for message in query(
        prompt="Analisar desempenho do sistema",
        options=ClaudeCodeOptions(system_prompt="Você é um engenheiro de desempenho")
    ):
        if type(message).__name__ == "ResultMessage":
            print(message.result)
    ```

    **Configuração**

    Como o SDK Python aceita todos os argumentos suportados pela [linha de comando](/pt/docs/claude-code/cli-reference) através da classe `ClaudeCodeOptions`.

  </Tab>
</Tabs>

### Autenticação

#### Chave de API Anthropic

Para autenticação básica, recupere uma chave de API Anthropic do [Console Anthropic](https://console.anthropic.com/) e defina a variável de ambiente `ANTHROPIC_API_KEY`, conforme demonstrado no [Início rápido](#início-rápido).

#### Credenciais de API de terceiros

O SDK também suporta autenticação via provedores de API de terceiros:

- **Amazon Bedrock**: Defina a variável de ambiente `CLAUDE_CODE_USE_BEDROCK=1` e configure as credenciais AWS
- **Google Vertex AI**: Defina a variável de ambiente `CLAUDE_CODE_USE_VERTEX=1` e configure as credenciais Google Cloud

Para instruções detalhadas de configuração para provedores de terceiros, consulte a documentação do [Amazon Bedrock](/pt/docs/claude-code/amazon-bedrock) e [Google Vertex AI](/pt/docs/claude-code/google-vertex-ai).

### Conversas de múltiplas rodadas

Para conversas de múltiplas rodadas, você pode retomar conversas ou continuar da sessão mais recente:

<Tabs>
  <Tab title="Linha de comando">
    ```bash
    # Continuar a conversa mais recente
    claude --continue "Agora refatore isso para melhor desempenho"

    # Retomar uma conversa específica por ID de sessão
    claude --resume 550e8400-e29b-41d4-a716-446655440000 "Atualize os testes"

    # Retomar em modo não interativo
    claude --resume 550e8400-e29b-41d4-a716-446655440000 "Corrija todos os problemas de linting" --no-interactive
    ```

  </Tab>

  <Tab title="TypeScript">
    ```ts
    import { query } from "@anthropic-ai/claude-code";

    // Continuar conversa mais recente
    for await (const message of query({
      prompt: "Agora refatore isso para melhor desempenho",
      options: { continueSession: true }
    })) {
      if (message.type === "result") console.log(message.result);
    }

    // Retomar sessão específica
    for await (const message of query({
      prompt: "Atualize os testes",
      options: {
        resumeSessionId: "550e8400-e29b-41d4-a716-446655440000",
        maxTurns: 3
      }
    })) {
      if (message.type === "result") console.log(message.result);
    }
    ```

  </Tab>

  <Tab title="Python">
    ```python
    import asyncio
    from claude_code_sdk import ClaudeSDKClient, ClaudeCodeOptions, query

    # Método 1: Usando ClaudeSDKClient para conversas persistentes
    async def multi_turn_conversation():
        async with ClaudeSDKClient() as client:
            # Primeira consulta
            await client.query("Vamos refatorar o módulo de pagamento")
            async for msg in client.receive_response():
                # Processar primeira resposta
                pass

            # Continuar na mesma sessão
            await client.query("Agora adicione tratamento de erro abrangente")
            async for msg in client.receive_response():
                # Processar continuação
                pass

            # O contexto da conversa é mantido durante todo o processo

    # Método 2: Usando função query com gerenciamento de sessão
    async def resume_session():
        # Continuar conversa mais recente
        async for message in query(
            prompt="Agora refatore isso para melhor desempenho",
            options=ClaudeCodeOptions(continue_conversation=True)
        ):
            if type(message).__name__ == "ResultMessage":
                print(message.result)

        # Retomar sessão específica
        async for message in query(
            prompt="Atualize os testes",
            options=ClaudeCodeOptions(
                resume="550e8400-e29b-41d4-a716-446655440000",
                max_turns=3
            )
        ):
            if type(message).__name__ == "ResultMessage":
                print(message.result)

    # Executar os exemplos
    asyncio.run(multi_turn_conversation())
    ```

  </Tab>
</Tabs>

### Usando Modo de Planejamento

O Modo de Planejamento permite que o Claude analise código sem fazer modificações, útil para revisões de código e planejamento de mudanças.

<Tabs>
  <Tab title="Linha de comando">
    ```bash
    claude -p "Revise este código" --permission-mode plan
    ```
  </Tab>

  <Tab title="TypeScript">
    ```ts
    import { query } from "@anthropic-ai/claude-code";

    for await (const message of query({
      prompt: "Seu prompt aqui",
      options: {
        permissionMode: 'plan'
      }
    })) {
      if (message.type === "result") {
        console.log(message.result);
      }
    }
    ```

  </Tab>

  <Tab title="Python">
    ```python
    from claude_code_sdk import ClaudeSDKClient, ClaudeCodeOptions

    async with ClaudeSDKClient(
        options=ClaudeCodeOptions(permission_mode='plan')
    ) as client:
        await client.query("Seu prompt aqui")
    ```

  </Tab>
</Tabs>

<Note>
  O Modo de Planejamento restringe edição, criação de arquivos e execução de comandos. Consulte [modos de permissão](/pt/docs/claude-code/iam#permission-modes) para detalhes.
</Note>

### Prompts de sistema personalizados

Prompts de sistema definem o papel, expertise e comportamento do seu agente. É aqui que você especifica que tipo de agente está construindo:

<Tabs>
  <Tab title="Linha de comando">
    ```bash
    # Agente de resposta a incidentes SRE
    claude -p "API está fora do ar, investigue" \
      --append-system-prompt "Você é um especialista SRE. Diagnostique problemas sistematicamente e forneça soluções acionáveis."

    # Agente de revisão de documentos jurídicos
    claude -p "Revise este contrato" \
      --append-system-prompt "Você é um advogado corporativo. Identifique riscos, sugira melhorias e garanta conformidade."

    # Anexar ao prompt de sistema padrão
    claude -p "Refatore esta função" \
      --append-system-prompt "Sempre inclua tratamento de erro abrangente e testes unitários."
    ```

  </Tab>

  <Tab title="TypeScript">
    ```ts
    import { query } from "@anthropic-ai/claude-code";

    // Agente de resposta a incidentes SRE
    for await (const message of query({
      prompt: "API está fora do ar, investigue",
      options: {
        systemPrompt: "Você é um especialista SRE. Diagnostique problemas sistematicamente e forneça soluções acionáveis.",
        maxTurns: 3
      }
    })) {
      if (message.type === "result") console.log(message.result);
    }

    // Anexar ao prompt de sistema padrão
    for await (const message of query({
      prompt: "Refatore esta função",
      options: {
        appendSystemPrompt: "Sempre inclua tratamento de erro abrangente e testes unitários.",
        maxTurns: 2
      }
    })) {
      if (message.type === "result") console.log(message.result);
    }
    ```

  </Tab>

  <Tab title="Python">
    ```python
    import asyncio
    from claude_code_sdk import ClaudeSDKClient, ClaudeCodeOptions

    async def specialized_agents():
        # Agente de resposta a incidentes SRE com transmissão
        async with ClaudeSDKClient(
            options=ClaudeCodeOptions(
                system_prompt="Você é um especialista SRE. Diagnostique problemas sistematicamente e forneça soluções acionáveis.",
                max_turns=3
            )
        ) as sre_agent:
            await sre_agent.query("API está fora do ar, investigue")

            # Transmitir o processo de diagnóstico
            async for message in sre_agent.receive_response():
                if hasattr(message, 'content'):
                    for block in message.content:
                        if hasattr(block, 'text'):
                            print(block.text, end='', flush=True)

        # Agente de revisão jurídica com prompt personalizado
        async with ClaudeSDKClient(
            options=ClaudeCodeOptions(
                append_system_prompt="Sempre inclua tratamento de erro abrangente e testes unitários.",
                max_turns=2
            )
        ) as dev_agent:
            await dev_agent.query("Refatore esta função")

            # Coletar resposta completa
            full_response = []
            async for message in dev_agent.receive_response():
                if type(message).__name__ == "ResultMessage":
                    print(message.result)

    asyncio.run(specialized_agents())
    ```

  </Tab>
</Tabs>

## Uso Avançado

### Ferramentas personalizadas via MCP

O Model Context Protocol (MCP) permite que você dê aos seus agentes ferramentas e capacidades personalizadas. Isso é crucial para construir agentes especializados que precisam de integrações específicas de domínio.

**Configurações de ferramentas de agente de exemplo:**

```json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": { "SLACK_TOKEN": "seu-token-slack" }
    },
    "jira": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-jira"],
      "env": { "JIRA_TOKEN": "seu-token-jira" }
    },
    "database": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": { "DB_CONNECTION_STRING": "sua-url-db" }
    }
  }
}
```

**Exemplos de uso:**

<Tabs>
  <Tab title="Linha de comando">
    ```bash
    # Agente SRE com ferramentas de monitoramento
    claude -p "Investigue a interrupção do serviço de pagamento" \
      --mcp-config sre-tools.json \
      --allowedTools "mcp__datadog,mcp__pagerduty,mcp__kubernetes" \
      --append-system-prompt "Você é um SRE. Use dados de monitoramento para diagnosticar problemas."

    # Agente de suporte ao cliente com acesso CRM
    claude -p "Ajude a resolver o ticket do cliente #12345" \
      --mcp-config support-tools.json \
      --allowedTools "mcp__zendesk,mcp__stripe,mcp__user_db" \
      --append-system-prompt "Você é um especialista em suporte técnico."
    ```

  </Tab>

  <Tab title="TypeScript">
    ```ts
    import { query } from "@anthropic-ai/claude-code";

    // Agente SRE com ferramentas de monitoramento
    for await (const message of query({
      prompt: "Investigue a interrupção do serviço de pagamento",
      options: {
        mcpConfig: "sre-tools.json",
        allowedTools: ["mcp__datadog", "mcp__pagerduty", "mcp__kubernetes"],
        systemPrompt: "Você é um SRE. Use dados de monitoramento para diagnosticar problemas.",
        maxTurns: 4
      }
    })) {
      if (message.type === "result") console.log(message.result);
    }
    ```

  </Tab>

  <Tab title="Python">
    ```python
    import asyncio
    from claude_code_sdk import ClaudeSDKClient, ClaudeCodeOptions

    async def mcp_enabled_agent():
        # Agente jurídico com acesso a documentos e transmissão
        # Nota: Configure seus servidores MCP conforme necessário
        mcp_servers = {
            # Configuração de exemplo - descomente e configure conforme necessário:
            # "docusign": {
            #     "command": "npx",
            #     "args": ["-y", "@modelcontextprotocol/server-docusign"],
            #     "env": {"API_KEY": "sua-chave"}
            # }
        }

        async with ClaudeSDKClient(
            options=ClaudeCodeOptions(
                mcp_servers=mcp_servers,
                allowed_tools=["mcp__docusign", "mcp__compliance_db"],
                system_prompt="Você é um advogado corporativo especializado em revisão de contratos.",
                max_turns=4
            )
        ) as client:
            await client.query("Revise este contrato em busca de riscos de conformidade")

            # Monitorar uso de ferramentas e respostas
            async for message in client.receive_response():
                if hasattr(message, 'content'):
                    for block in message.content:
                        if hasattr(block, 'type'):
                            if block.type == 'tool_use':
                                print(f"\n[Usando ferramenta: {block.name}]\n")
                            elif hasattr(block, 'text'):
                                print(block.text, end='', flush=True)
                        elif hasattr(block, 'text'):
                            print(block.text, end='', flush=True)

                if type(message).__name__ == "ResultMessage":
                    print(f"\n\nRevisão completa. Custo total: ${message.total_cost_usd:.4f}")

    asyncio.run(mcp_enabled_agent())
    ```

  </Tab>
</Tabs>

<Note>
  Ao usar ferramentas MCP, você deve explicitamente permiti-las usando a flag `--allowedTools`. Nomes de ferramentas MCP seguem o padrão `mcp__<serverName>__<toolName>` onde:

- `serverName` é a chave do seu arquivo de configuração MCP
- `toolName` é a ferramenta específica fornecida por esse servidor

Esta medida de segurança garante que ferramentas MCP sejam usadas apenas quando explicitamente permitidas.

Se você especificar apenas o nome do servidor (ou seja, `mcp__<serverName>`), todas as ferramentas desse servidor serão permitidas.

Padrões glob (por exemplo, `mcp__go*`) não são suportados.
</Note>

### Ferramenta de prompt de permissão personalizada

Opcionalmente, use `--permission-prompt-tool` para passar uma ferramenta MCP que usaremos para verificar se o usuário concede ou não permissões ao modelo para invocar uma determinada ferramenta. Quando o modelo invoca uma ferramenta, acontece o seguinte:

1. Primeiro verificamos configurações de permissão: todos os [arquivos settings.json](/pt/docs/claude-code/settings), bem como `--allowedTools` e `--disallowedTools` passados para o SDK; se uma dessas permite ou nega a chamada da ferramenta, prosseguimos com a chamada da ferramenta
2. Caso contrário, invocamos a ferramenta MCP que você forneceu em `--permission-prompt-tool`

A ferramenta MCP `--permission-prompt-tool` recebe o nome da ferramenta e entrada, e deve retornar um payload JSON-stringified com o resultado. O payload deve ser um dos seguintes:

```ts
// chamada de ferramenta é permitida
{
  "behavior": "allow",
  "updatedInput": {...}, // entrada atualizada, ou apenas retorne a entrada original
}

// chamada de ferramenta é negada
{
  "behavior": "deny",
  "message": "..." // string legível explicando por que a permissão foi negada
}
```

**Exemplos de implementação:**

<Tabs>
  <Tab title="Linha de comando">
    ```bash
    # Usar com sua configuração de servidor MCP
    claude -p "Analise e corrija os problemas de segurança" \
      --permission-prompt-tool mcp__security__approval_prompt \
      --mcp-config security-tools.json \
      --allowedTools "Read,Grep" \
      --disallowedTools "Bash(rm*),Write"

    # Com regras de permissão personalizadas
    claude -p "Refatore a base de código" \
      --permission-prompt-tool mcp__custom__permission_check \
      --mcp-config custom-config.json \
      --output-format json
    ```

  </Tab>

  <Tab title="TypeScript">
    ```ts
    const server = new McpServer({
      name: "Test permission prompt MCP Server",
      version: "0.0.1",
    });

    server.tool(
      "approval_prompt",
      'Simular uma verificação de permissão - aprovar se a entrada contém "allow", caso contrário negar',
      {
        tool_name: z.string().describe("O nome da ferramenta solicitando permissão"),
        input: z.object({}).passthrough().describe("A entrada para a ferramenta"),
        tool_use_id: z.string().optional().describe("O ID único da solicitação de uso da ferramenta"),
      },
      async ({ tool_name, input }) => {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                JSON.stringify(input).includes("allow")
                  ? {
                      behavior: "allow",
                      updatedInput: input,
                    }
                  : {
                      behavior: "deny",
                      message: "Permissão negada pela ferramenta test approval_prompt",
                    }
              ),
            },
          ],
        };
      }
    );

    // Usar no SDK
    import { query } from "@anthropic-ai/claude-code";

    for await (const message of query({
      prompt: "Analise a base de código",
      options: {
        permissionPromptTool: "mcp__test-server__approval_prompt",
        mcpConfig: "my-config.json",
        allowedTools: ["Read", "Grep"]
      }
    })) {
      if (message.type === "result") console.log(message.result);
    }
    ```

  </Tab>

  <Tab title="Python">
    ```python
    import asyncio
    from claude_code_sdk import ClaudeSDKClient, ClaudeCodeOptions

    async def use_permission_prompt():
        """Exemplo usando ferramenta de prompt de permissão personalizada"""

        # Configuração do servidor MCP
        mcp_servers = {
            # Configuração de exemplo - descomente e configure conforme necessário:
            # "security": {
            #     "command": "npx",
            #     "args": ["-y", "@modelcontextprotocol/server-security"],
            #     "env": {"API_KEY": "sua-chave"}
            # }
        }

        async with ClaudeSDKClient(
            options=ClaudeCodeOptions(
                permission_prompt_tool_name="mcp__security__approval_prompt",  # Alterado de permission_prompt_tool
                mcp_servers=mcp_servers,
                allowed_tools=["Read", "Grep"],
                disallowed_tools=["Bash(rm*)", "Write"],
                system_prompt="Você é um auditor de segurança"
            )
        ) as client:
            await client.query("Analise e corrija os problemas de segurança")

            # Monitorar uso de ferramentas e permissões
            async for message in client.receive_response():
                if hasattr(message, 'content'):
                    for block in message.content:
                        if hasattr(block, 'type'):  # Adicionada verificação para atributo 'type'
                            if block.type == 'tool_use':
                                print(f"[Ferramenta: {block.name}] ", end='')
                        if hasattr(block, 'text'):
                            print(block.text, end='', flush=True)

                # Verificar negações de permissão em mensagens de erro
                if type(message).__name__ == "ErrorMessage":
                    if hasattr(message, 'error') and "Permission denied" in str(message.error):
                        print(f"\n⚠️ Permissão negada: {message.error}")

    # Exemplo de implementação de servidor MCP (Python)
    # Isso estaria no código do seu servidor MCP
    async def approval_prompt(tool_name: str, input: dict, tool_use_id: str = None):
        """Manipulador de prompt de permissão personalizado"""
        # Sua lógica personalizada aqui
        if "allow" in str(input):
            return json.dumps({
                "behavior": "allow",
                "updatedInput": input
            })
        else:
            return json.dumps({
                "behavior": "deny",
                "message": f"Permissão negada para {tool_name}"
            })

    asyncio.run(use_permission_prompt())
    ```

  </Tab>
</Tabs>

Notas de uso:

- Use `updatedInput` para dizer ao modelo que o prompt de permissão mutou sua entrada; caso contrário, defina `updatedInput` para a entrada original, como no exemplo acima. Por exemplo, se a ferramenta mostra um diff de edição de arquivo para o usuário e permite que eles editem o diff manualmente, a ferramenta de prompt de permissão deve retornar essa edição atualizada.
- O payload deve ser JSON-stringified

## Formatos de saída

O SDK suporta múltiplos formatos de saída:

### Saída de texto (padrão)

<Tabs>
  <Tab title="Linha de comando">
    ```bash
    claude -p "Explique o arquivo src/components/Header.tsx"
    # Saída: Este é um componente React mostrando...
    ```
  </Tab>

  <Tab title="TypeScript">
    ```ts
    // Saída de texto padrão
    for await (const message of query({
      prompt: "Explique o arquivo src/components/Header.tsx"
    })) {
      if (message.type === "result") {
        console.log(message.result);
        // Saída: Este é um componente React mostrando...
      }
    }
    ```
  </Tab>

  <Tab title="Python">
    ```python
    # Saída de texto padrão com transmissão
    async with ClaudeSDKClient() as client:
        await client.query("Explique o arquivo src/components/Header.tsx")
        
        # Transmitir texto conforme chega
        async for message in client.receive_response():
            if hasattr(message, 'content'):
                for block in message.content:
                    if hasattr(block, 'text'):
                        print(block.text, end='', flush=True)
                        # Saída transmite em tempo real: Este é um componente React mostrando...
    ```
  </Tab>
</Tabs>

### Saída JSON

Retorna dados estruturados incluindo metadados:

<Tabs>
  <Tab title="Linha de comando">
    ```bash
    claude -p "Como funciona a camada de dados?" --output-format json
    ```
  </Tab>

  <Tab title="TypeScript">
    ```ts
    // Coletar todas as mensagens para acesso tipo JSON
    const messages = [];
    for await (const message of query({
      prompt: "Como funciona a camada de dados?"
    })) {
      messages.push(message);
    }

    // Acessar mensagem de resultado com metadados
    const result = messages.find(m => m.type === "result");
    console.log({
      result: result.result,
      cost: result.total_cost_usd,
      duration: result.duration_ms
    });
    ```

  </Tab>

  <Tab title="Python">
    ```python
    # Coletar todas as mensagens com metadados
    async with ClaudeSDKClient() as client:
        await client.query("Como funciona a camada de dados?")
        
        messages = []
        result_data = None
        
        async for message in client.receive_messages():
            messages.append(message)
            
            # Capturar mensagem de resultado com metadados
            if type(message).__name__ == "ResultMessage":
                result_data = {
                    "result": message.result,
                    "cost": message.total_cost_usd,
                    "duration": message.duration_ms,
                    "num_turns": message.num_turns,
                    "session_id": message.session_id
                }
                break
        
        print(result_data)
    ```
  </Tab>
</Tabs>

Formato de resposta:

```json
{
  "type": "result",
  "subtype": "success",
  "total_cost_usd": 0.003,
  "is_error": false,
  "duration_ms": 1234,
  "duration_api_ms": 800,
  "num_turns": 6,
  "result": "O texto de resposta aqui...",
  "session_id": "abc123"
}
```

### Saída JSON de transmissão

Transmite cada mensagem conforme é recebida:

```bash
$ claude -p "Construa uma aplicação" --output-format stream-json
```

Cada conversa começa com uma mensagem inicial do sistema `init`, seguida por uma lista de mensagens do usuário e assistente, seguida por uma mensagem final do sistema `result` com estatísticas. Cada mensagem é emitida como um objeto JSON separado.

## Esquema de mensagem

Mensagens retornadas da API JSON são estritamente tipadas de acordo com o seguinte esquema:

```ts
type SDKMessage =
  // Uma mensagem do assistente
  | {
      type: 'assistant';
      message: Message; // do SDK Anthropic
      session_id: string;
    }

  // Uma mensagem do usuário
  | {
      type: 'user';
      message: MessageParam; // do SDK Anthropic
      session_id: string;
    }

  // Emitida como a última mensagem
  | {
      type: 'result';
      subtype: 'success';
      duration_ms: float;
      duration_api_ms: float;
      is_error: boolean;
      num_turns: int;
      result: string;
      session_id: string;
      total_cost_usd: float;
    }

  // Emitida como a última mensagem, quando atingimos o número máximo de rodadas
  | {
      type: 'result';
      subtype: 'error_max_turns' | 'error_during_execution';
      duration_ms: float;
      duration_api_ms: float;
      is_error: boolean;
      num_turns: int;
      session_id: string;
      total_cost_usd: float;
    }

  // Emitida como a primeira mensagem no início de uma conversa
  | {
      type: 'system';
      subtype: 'init';
      apiKeySource: string;
      cwd: string;
      session_id: string;
      tools: string[];
      mcp_servers: {
        name: string;
        status: string;
      }[];
      model: string;
      permissionMode: 'default' | 'acceptEdits' | 'bypassPermissions' | 'plan';
    };
```

Em breve publicaremos esses tipos em um formato compatível com JSONSchema. Usamos versionamento semântico para o pacote principal Claude Code para comunicar mudanças que quebram compatibilidade neste formato.

Os tipos `Message` e `MessageParam` estão disponíveis nos SDKs Anthropic. Por exemplo, consulte os SDKs Anthropic [TypeScript](https://github.com/anthropics/anthropic-sdk-typescript) e [Python](https://github.com/anthropics/anthropic-sdk-python/).

## Formatos de entrada

O SDK suporta múltiplos formatos de entrada:

### Entrada de texto (padrão)

<Tabs>
  <Tab title="Linha de comando">
    ```bash
    # Argumento direto
    claude -p "Explique este código"

    # Do stdin
    echo "Explique este código" | claude -p
    ```

  </Tab>

  <Tab title="TypeScript">
    ```ts
    // Prompt direto
    for await (const message of query({
      prompt: "Explique este código"
    })) {
      if (message.type === "result") console.log(message.result);
    }

    // De variável
    const userInput = "Explique este código";
    for await (const message of query({ prompt: userInput })) {
      if (message.type === "result") console.log(message.result);
    }
    ```

  </Tab>

  <Tab title="Python">
    ```python
    import asyncio
    from claude_code_sdk import ClaudeSDKClient

    async def process_inputs():
        async with ClaudeSDKClient() as client:
            # Entrada de texto
            await client.query("Explique este código")
            async for message in client.receive_response():
                # Processar resposta de transmissão
                pass

            # Entrada de imagem (Claude usará ferramenta Read automaticamente)
            await client.query("O que há neste diagrama? screenshot.png")
            async for message in client.receive_response():
                # Processar análise de imagem
                pass

            # Múltiplas entradas com conteúdo misto
            inputs = [
                "Analise a arquitetura em diagram.png",
                "Compare com melhores práticas",
                "Gere versão melhorada"
            ]

            for prompt in inputs:
                await client.query(prompt)
                async for message in client.receive_response():
                    # Processar cada resposta
                    pass

    asyncio.run(process_inputs())
    ```

  </Tab>
</Tabs>

### Entrada JSON de transmissão

Um fluxo de mensagens fornecido via `stdin` onde cada mensagem representa uma rodada do usuário. Isso permite múltiplas rodadas de uma conversa sem relançar o binário `claude` e permite fornecer orientação ao modelo enquanto ele está processando uma solicitação.

Cada mensagem é um objeto JSON 'Mensagem do usuário', seguindo o mesmo formato que o esquema de mensagem de saída. Mensagens são formatadas usando o formato [jsonl](https://jsonlines.org/) onde cada linha de entrada é um objeto JSON completo. Entrada JSON de transmissão requer `-p` e `--output-format stream-json`.

Atualmente isso é limitado a mensagens de usuário apenas de texto.

```bash
$ echo '{"type":"user","message":{"role":"user","content":[{"type":"text","text":"Explique este código"}]}}' | claude -p --output-format=stream-json --input-format=stream-json --verbose
```

## Exemplos de integração de agentes

### Bot de resposta a incidentes SRE

<Tabs>
  <Tab title="Linha de comando">
    ```bash
    #!/bin/bash

    # Agente de resposta a incidentes automatizado
    investigate_incident() {
        local incident_description="$1"
        local severity="${2:-medium}"

        claude -p "Incidente: $incident_description (Severidade: $severity)" \
          --append-system-prompt "Você é um especialista SRE. Diagnostique o problema, avalie o impacto e forneça itens de ação imediatos." \
          --output-format json \
          --allowedTools "Bash,Read,WebSearch,mcp__datadog" \
          --mcp-config monitoring-tools.json
    }

    # Uso
    investigate_incident "API de pagamento retornando erros 500" "high"
    ```

  </Tab>

  <Tab title="TypeScript">
    ```ts
    import { query } from "@anthropic-ai/claude-code";

    // Agente de resposta a incidentes automatizado
    async function investigateIncident(
      incidentDescription: string,
      severity = "medium"
    ) {
      const messages = [];

      for await (const message of query({
        prompt: `Incidente: ${incidentDescription} (Severidade: ${severity})`,
        options: {
          systemPrompt: "Você é um especialista SRE. Diagnostique o problema, avalie o impacto e forneça itens de ação imediatos.",
          maxTurns: 6,
          allowedTools: ["Bash", "Read", "WebSearch", "mcp__datadog"],
          mcpConfig: "monitoring-tools.json"
        }
      })) {
        messages.push(message);
      }

      return messages.find(m => m.type === "result");
    }

    // Uso
    const result = await investigateIncident("API de pagamento retornando erros 500", "high");
    console.log(result.result);
    ```

  </Tab>

  <Tab title="Python">
    ```python
    import asyncio
    from claude_code_sdk import ClaudeSDKClient, ClaudeCodeOptions

    async def investigate_incident(incident_description: str, severity: str = "medium"):
        """Agente de resposta a incidentes automatizado com transmissão em tempo real"""

        # Configuração do servidor MCP para ferramentas de monitoramento
        mcp_servers = {
            # Configuração de exemplo - descomente e configure conforme necessário:
            # "datadog": {
            #     "command": "npx",
            #     "args": ["-y", "@modelcontextprotocol/server-datadog"],
            #     "env": {"API_KEY": "sua-chave-datadog", "APP_KEY": "sua-chave-app"}
            # }
        }

        async with ClaudeSDKClient(
            options=ClaudeCodeOptions(
                system_prompt="Você é um especialista SRE. Diagnostique o problema, avalie o impacto e forneça itens de ação imediatos.",
                max_turns=6,
                allowed_tools=["Bash", "Read", "WebSearch", "mcp__datadog"],
                mcp_servers=mcp_servers
            )
        ) as client:
            # Enviar os detalhes do incidente
            prompt = f"Incidente: {incident_description} (Severidade: {severity})"
            print(f"🚨 Investigando: {prompt}\n")
            await client.query(prompt)

            # Transmitir o processo de investigação
            investigation_log = []
            async for message in client.receive_response():
                if hasattr(message, 'content'):
                    for block in message.content:
                        if hasattr(block, 'type'):
                            if block.type == 'tool_use':
                                print(f"[{block.name}] ", end='')
                        if hasattr(block, 'text'):
                            text = block.text
                            print(text, end='', flush=True)
                            investigation_log.append(text)

                # Capturar resultado final
                if type(message).__name__ == "ResultMessage":
                    return {
                        'analysis': ''.join(investigation_log),
                        'cost': message.total_cost_usd,
                        'duration_ms': message.duration_ms
                    }

    # Uso
    result = await investigate_incident("API de pagamento retornando erros 500", "high")
    print(f"\n\nInvestigação completa. Custo: ${result['cost']:.4f}")
    ```

  </Tab>
</Tabs>

### Revisão de segurança automatizada

<Tabs>
  <Tab title="Linha de comando">
    ```bash
    # Agente de auditoria de segurança para pull requests
    audit_pr() {
        local pr_number="$1"
        
        gh pr diff "$pr_number" | claude -p \
          --append-system-prompt "Você é um engenheiro de segurança. Revise este PR em busca de vulnerabilidades, padrões inseguros e problemas de conformidade." \
          --output-format json \
          --allowedTools "Read,Grep,WebSearch"
    }

    # Uso e salvar em arquivo
    audit_pr 123 > security-report.json
    ```

  </Tab>

  <Tab title="TypeScript">
    ```ts
    import { query } from "@anthropic-ai/claude-code";
    import { execSync } from "child_process";

    async function auditPR(prNumber: number) {
      // Obter diff do PR
      const prDiff = execSync(`gh pr diff ${prNumber}`, { encoding: 'utf8' });

      const messages = [];
      for await (const message of query({
        prompt: prDiff,
        options: {
          systemPrompt: "Você é um engenheiro de segurança. Revise este PR em busca de vulnerabilidades, padrões inseguros e problemas de conformidade.",
          maxTurns: 3,
          allowedTools: ["Read", "Grep", "WebSearch"]
        }
      })) {
        messages.push(message);
      }

      return messages.find(m => m.type === "result");
    }

    // Uso
    const report = await auditPR(123);
    console.log(JSON.stringify(report, null, 2));
    ```

  </Tab>

  <Tab title="Python">
    ```python
    import subprocess
    import asyncio
    import json
    from claude_code_sdk import ClaudeSDKClient, ClaudeCodeOptions

    async def audit_pr(pr_number: int):
        """Agente de auditoria de segurança para pull requests com feedback de transmissão"""
        # Obter diff do PR
        pr_diff = subprocess.check_output(
            ["gh", "pr", "diff", str(pr_number)],
            text=True
        )

        async with ClaudeSDKClient(
            options=ClaudeCodeOptions(
                system_prompt="Você é um engenheiro de segurança. Revise este PR em busca de vulnerabilidades, padrões inseguros e problemas de conformidade.",
                max_turns=3,
                allowed_tools=["Read", "Grep", "WebSearch"]
            )
        ) as client:
            print(f"🔍 Auditando PR #{pr_number}\n")
            await client.query(pr_diff)

            findings = []
            async for message in client.receive_response():
                if hasattr(message, 'content'):
                    for block in message.content:
                        if hasattr(block, 'text'):
                            # Transmitir descobertas conforme são descobertas
                            print(block.text, end='', flush=True)
                            findings.append(block.text)

                if type(message).__name__ == "ResultMessage":
                    return {
                        'pr_number': pr_number,
                        'findings': ''.join(findings),
                        'metadata': {
                            'cost': message.total_cost_usd,
                            'duration': message.duration_ms,
                            'severity': 'high' if 'vulnerability' in ''.join(findings).lower() else 'medium'
                        }
                    }

    # Uso
    report = await audit_pr(123)
    print(f"\n\nAuditoria completa. Severidade: {report['metadata']['severity']}")
    print(json.dumps(report, indent=2))
    ```

  </Tab>
</Tabs>

### Assistente jurídico de múltiplas rodadas

<Tabs>
  <Tab title="Linha de comando">
    ```bash
    # Revisão de documento jurídico com persistência de sessão
    session_id=$(claude -p "Iniciar sessão de revisão jurídica" --output-format json | jq -r '.session_id')

    # Revisar contrato em múltiplas etapas
    claude -p --resume "$session_id" "Revisar contract.pdf em busca de cláusulas de responsabilidade"
    claude -p --resume "$session_id" "Verificar conformidade com requisitos GDPR"
    claude -p --resume "$session_id" "Gerar resumo executivo dos riscos"
    ```

  </Tab>

  <Tab title="TypeScript">
    ```ts
    import { query } from "@anthropic-ai/claude-code";

    async function legalReview() {
      // Iniciar sessão de revisão jurídica
      let sessionId: string;

      for await (const message of query({
        prompt: "Iniciar sessão de revisão jurídica",
        options: { maxTurns: 1 }
      })) {
        if (message.type === "system" && message.subtype === "init") {
          sessionId = message.session_id;
        }
      }

      // Revisão de múltiplas etapas usando a mesma sessão
      const steps = [
        "Revisar contract.pdf em busca de cláusulas de responsabilidade",
        "Verificar conformidade com requisitos GDPR",
        "Gerar resumo executivo dos riscos"
      ];

      for (const step of steps) {
        for await (const message of query({
          prompt: step,
          options: { resumeSessionId: sessionId, maxTurns: 2 }
        })) {
          if (message.type === "result") {
            console.log(`Etapa: ${step}`);
            console.log(message.result);
          }
        }
      }
    }
    ```

  </Tab>

  <Tab title="Python">
    ```python
    import asyncio
    from claude_code_sdk import ClaudeSDKClient, ClaudeCodeOptions

    async def legal_review():
        """Revisão de documento jurídico com sessão persistente e transmissão"""

        async with ClaudeSDKClient(
            options=ClaudeCodeOptions(
                system_prompt="Você é um advogado corporativo. Forneça análise jurídica detalhada.",
                max_turns=2
            )
        ) as client:
            # Revisão de múltiplas etapas na mesma sessão
            steps = [
                "Revisar contract.pdf em busca de cláusulas de responsabilidade",
                "Verificar conformidade com requisitos GDPR",
                "Gerar resumo executivo dos riscos"
            ]

            review_results = []

            for step in steps:
                print(f"\n📋 {step}\n")
                await client.query(step)

                step_result = []
                async for message in client.receive_response():
                    if hasattr(message, 'content'):
                        for block in message.content:
                            if hasattr(block, 'text'):
                                text = block.text
                                print(text, end='', flush=True)
                                step_result.append(text)

                    if type(message).__name__ == "ResultMessage":
                        review_results.append({
                            'step': step,
                            'analysis': ''.join(step_result),
                            'cost': message.total_cost_usd
                        })

            # Resumo
            total_cost = sum(r['cost'] for r in review_results)
            print(f"\n\n✅ Revisão jurídica completa. Custo total: ${total_cost:.4f}")
            return review_results

    # Uso
    results = await legal_review()
    ```

  </Tab>
</Tabs>

## Melhores Práticas Específicas do Python

### Padrões Principais

```python
import asyncio
from claude_code_sdk import ClaudeSDKClient, ClaudeCodeOptions

# Sempre use gerenciadores de contexto
async with ClaudeSDKClient() as client:
    await client.query("Analise este código")
    async for msg in client.receive_response():
        # Processar mensagens de transmissão
        pass

# Executar múltiplos agentes simultaneamente
async with ClaudeSDKClient() as reviewer, ClaudeSDKClient() as tester:
    await asyncio.gather(
        reviewer.query("Revisar main.py"),
        tester.query("Escrever testes para main.py")
    )

# Tratamento de erros
from claude_code_sdk import CLINotFoundError, ProcessError

try:
    async with ClaudeSDKClient() as client:
        # Seu código aqui
        pass
except CLINotFoundError:
    print("Instalar CLI: npm install -g @anthropic-ai/claude-code")
except ProcessError as e:
    print(f"Erro de processo: {e}")

# Coletar resposta completa com metadados
async def get_response(client, prompt):
    await client.query(prompt)
    text = []
    async for msg in client.receive_response():
        if hasattr(msg, 'content'):
            for block in msg.content:
                if hasattr(block, 'text'):
                    text.append(block.text)
        if type(msg).__name__ == "ResultMessage":
            return {'text': ''.join(text), 'cost': msg.total_cost_usd}
```

### Dicas IPython/Jupyter

```python
# No Jupyter, use await diretamente em células
client = ClaudeSDKClient()
await client.connect()
await client.query("Analisar data.csv")
async for msg in client.receive_response():
    print(msg)
await client.disconnect()

# Criar funções auxiliares reutilizáveis
async def stream_print(client, prompt):
    await client.query(prompt)
    async for msg in client.receive_response():
        if hasattr(msg, 'content'):
            for block in msg.content:
                if hasattr(block, 'text'):
                    print(block.text, end='', flush=True)
```

## Melhores práticas

- **Use formato de saída JSON** para análise programática de respostas:

  ```bash
  # Analisar resposta JSON com jq
  result=$(claude -p "Gerar código" --output-format json)
  code=$(echo "$result" | jq -r '.result')
  cost=$(echo "$result" | jq -r '.cost_usd')
  ```

- **Trate erros graciosamente** - verifique códigos de saída e stderr:

  ```bash
  if ! claude -p "$prompt" 2>error.log; then
      echo "Erro ocorreu:" >&2
      cat error.log >&2
      exit 1
  fi
  ```

- **Use gerenciamento de sessão** para manter contexto em conversas de múltiplas rodadas

- **Considere timeouts** para operações de longa duração:

  ```bash
  timeout 300 claude -p "$complex_prompt" || echo "Timeout após 5 minutos"
  ```

- **Respeite limites de taxa** ao fazer múltiplas solicitações adicionando atrasos entre chamadas

## Recursos relacionados

- [Uso e controles CLI](/pt/docs/claude-code/cli-reference) - Documentação completa da CLI
- [Integração GitHub Actions](/pt/docs/claude-code/github-actions) - Automatize seu fluxo de trabalho GitHub com Claude
- [Fluxos de trabalho comuns](/pt/docs/claude-code/common-workflows) - Guias passo a passo para casos de uso comuns

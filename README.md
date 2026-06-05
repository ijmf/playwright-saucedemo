# playwright-saucedemo

Testes E2E automatizados com Playwright para o SauceDemo, cobrindo Login, Carrinho e Checkout nos três principais browsers.

## O que é

Suite de testes end-to-end construída com Playwright e JavaScript, validando os fluxos principais do SauceDemo — aplicação de e-commerce usada como referência para estudos de automação. Os testes rodam em paralelo no Chromium, Firefox e WebKit com pipeline CI/CD via GitHub Actions.

## Stack

- Playwright — automação E2E multi-browser
- JavaScript
- GitHub Actions — pipeline CI/CD

## Estrutura

```
playwright-saucedemo/
├── .github/
│   └── workflows/
│       └── playwright.yml   # Pipeline CI/CD
├── tests/
│   └── saucedemo.spec.js    # 7 casos de teste
├── playwright.config.js     # Configuração dos browsers
└── package.json
```

## Como executar

```bash
# Instalar dependências
npm install

# Instalar browsers
npx playwright install

# Rodar todos os testes
npx playwright test

# Rodar apenas no Chromium
npx playwright test --project=chromium

# Ver relatório HTML
npx playwright show-report
```

## Casos de teste

| Suite | Teste | O que valida |
|---|---|---|
| Login | login com credenciais válidas | Redireciona para inventory após login |
| Login | login com senha inválida | Exibe mensagem de erro |
| Login | login com usuário bloqueado | Exibe mensagem de erro |
| Carrinho | adicionar produto | Badge do carrinho exibe 1 |
| Carrinho | remover produto | Badge do carrinho some |
| Checkout | checkout completo | Exibe "Thank you for your order!" |
| Checkout | checkout sem campos | Exibe mensagem de erro |

## Resultado

7 testes — 0 falhas — 11.1s no Chromium

## Browsers configurados

- Chromium (Desktop Chrome)
- Firefox (Desktop Firefox)
- WebKit (Desktop Safari)
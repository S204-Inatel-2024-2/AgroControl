/// <reference = cypress>

let id_excluir_funcionario = 169
let id_excluir_servico = 106

describe("Testes de detalhes de funcionários", () => {
  it("Detalhes de funcionario", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/employeedetails/83")
    cy.get('.sc-ikngxL').should("contain", "Detalhes do Funcionário")
    cy.get(':nth-child(2) > .sc-kEsJEW').should("contain", "83")
    cy.get(':nth-child(3) > .sc-kEsJEW').should("contain", "Marcelo Rossi")
  })

  it("Rotas de detalhes de funcionários", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/employeedetails/".concat(id_excluir_funcionario))
    cy.get('.sc-fqujGp > :nth-child(1)').click()
    cy.url().should("include", "http://localhost:3001/employeeregistration")
    cy.visit("http://localhost:3001/employeedetails/".concat(id_excluir_funcionario))
    cy.get('.sc-fqujGp > :nth-child(2)').click()
    cy.get('.sc-enMaOJ').should("contain", "Excluir Funcionário")
  })

  it("Detalhes de funcionário inexistente", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/employeedetails/9999")
    cy.get('.sc-iRVXky').should("contain", "Erro ao carregar os detalhes do funcionário.")
  })

  it("Detalhes de funcionário sem login", () => {
    cy.visit("http://localhost:3001/employeedetails/83")
    cy.url().should("include", "http://localhost:3001")
  })
})

describe("Testes de cadastro de funcionário", () => {
  it("Cadastro de funcionário com sucesso", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    let primeirosDigitos = (Math.random() * (1000 - 100) + 100)
    primeirosDigitos = Math.ceil(primeirosDigitos)
    cy.visit("http://localhost:3001/employeeregistration")
    cy.get('.sc-FFETS').should("contain", "Cadastro de novo funcionário")
    cy.get('.sc-hsfCcR > :nth-child(1) > .sc-cqgMZH').type("Marcelo Rossi")
    cy.get(':nth-child(1) > .sc-CNKsk > .sc-cqgMZH').type(primeirosDigitos.toString().concat(".666.366-69"))
    cy.get('.sc-bnGbuY > :nth-child(2) > .sc-CNKsk > .sc-cqgMZH').type("1996-05-20")
    cy.get(':nth-child(3) > .sc-cqgMZH').type("Rua José Alves de Souza")
    cy.get(':nth-child(4) > .sc-cqgMZH').type(Math.floor(Math.random() * (1000 - 100) + 100).toString().concat("@email.com"))
    cy.get(':nth-child(5) > .sc-cqgMZH').type("padre")
    cy.get('[style="gap: 20px;"] > .sc-cqgMZH').type("6666")
    cy.get('[type="submit"]').click()
    cy.get('.Toastify__toast-body').should("contain", "Operação realizada com sucesso!")
  })

  it("Cadastro de funcionário com e-mail existe", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/employeeregistration")
    cy.get('.sc-hsfCcR > :nth-child(1) > .sc-cqgMZH').type("Marcelo Rossi")
    cy.get(':nth-child(1) > .sc-CNKsk > .sc-cqgMZH').type("543.666.323-69")
    cy.get('.sc-bnGbuY > :nth-child(2) > .sc-CNKsk > .sc-cqgMZH').type("1996-05-20")
    cy.get(':nth-child(3) > .sc-cqgMZH').type("Rua José Alves de Souza")
    cy.get(':nth-child(4) > .sc-cqgMZH').type("omarcelorossi@email.com")
    cy.get(':nth-child(5) > .sc-cqgMZH').type("padre")
    cy.get('[style="gap: 20px;"] > .sc-cqgMZH').type("6666")
    cy.get('[type="submit"]').click()
    cy.get('.Toastify__toast-body').should("contain", "Erro ao realizar a operação!")
  })

  it("Cadastro de funcionário com CPF existe", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/employeeregistration")
    cy.get('.sc-hsfCcR > :nth-child(1) > .sc-cqgMZH').type("Marcelo Rossi")
    cy.get(':nth-child(1) > .sc-CNKsk > .sc-cqgMZH').type("543.666.320-69")
    cy.get('.sc-bnGbuY > :nth-child(2) > .sc-CNKsk > .sc-cqgMZH').type("1996-05-20")
    cy.get(':nth-child(3) > .sc-cqgMZH').type("Rua José Alves de Souza")
    cy.get(':nth-child(4) > .sc-cqgMZH').type("marcelorossi@email.com")
    cy.get(':nth-child(5) > .sc-cqgMZH').type("padre")
    cy.get('[style="gap: 20px;"] > .sc-cqgMZH').type("6666")
    cy.get('[type="submit"]').click()
    cy.get('.Toastify__toast-body').should("contain", "Erro ao realizar a operação!")
  })

  it("Rotas de cadastro de funcionário", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/employeeregistration")
    cy.get('.sc-hGZxvd > :nth-child(1)').click()
    cy.url().should("include", "http://localhost:3001/home")
  })

  it("Cadastro de funcionário sem login", () => {
    cy.visit("http://localhost:3001/employeeregistration")
    cy.url().should("include", "http://localhost:3001")
  })
})

describe("Testes de gerenciamento de funcionário", () => {
  it("Gerenciamento de funcionário", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/employees")
    cy.get('.sc-fantwC').should("contain", "Gerenciamento de Funcionários")
  })

  it("Teste de busca por funcionário", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/employees")
    cy.get('.sc-dFqmTM').type("Marcelo Rossi", { force: true })
    cy.get('tbody > :nth-child(2) > :nth-child(1)').should("contain", "Marcelo Rossi")
  })

  it("Teste de busca por função", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/employees")
    cy.get('.sc-dFqmTM').type("Cozinheira", { force: true })
    cy.get('tbody > :nth-child(1) > :nth-child(3)').should("contain", "Cozinheira")
  })

  it("Teste de busca por funcionário inexistente", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/employees")
    cy.get('.sc-dFqmTM').type("Inexistente", { force: true })
    cy.get('tbody > :nth-child(2) > :nth-child(1)').should("not.exist")
  })

  it("Teste de busca por função	inexistente", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/employees")
    cy.get('.sc-dFqmTM').type("Inexistente", { force: true })
    cy.get('tbody > :nth-child(1) > :nth-child(3)').should("not.exist")
  })

  it("Rotas de gerenciamento de serviços", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/employees")
    cy.get('.sc-eqXzvo').click({ force: true })
    cy.url().should("include", "http://localhost:3001/employeeregistration")
  })

  it("Gerenciamento de servicos sem login", () => {
    cy.visit("http://localhost:3001/employees")
    cy.url().should("include", "http://localhost:3001")
  })
})

describe("Testes de home", () => {
  it("Rotas do menu", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/employeeregistration")
    cy.get('svg path[d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"]').click()
    cy.get('[href="/home"]').click()
    cy.url().should("include", "http://localhost:3001/home")
    cy.visit("http://localhost:3001/employeeregistration")
    cy.get('svg path[d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"]').click()
    cy.get('[href="/finances"]').click()
    cy.url().should("include", "http://localhost:3001/finances")
    cy.visit("http://localhost:3001/employeeregistration")
    cy.get('svg path[d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"]').click()
    cy.get('[href="/services"]').click()
    cy.url().should("include", "http://localhost:3001/services")
    cy.visit("http://localhost:3001/employeeregistration")
    cy.get('svg path[d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"]').click()
    cy.get('[href="/employees"]').click()
    cy.url().should("include", "http://localhost:3001/employees")
    cy.visit("http://localhost:3001/employeeregistration")
    cy.get('svg path[d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"]').click()
    cy.get('[href="/suporte"]').click()
    cy.url().should("include", "http://localhost:3001/suporte")
  })
})

describe("Testes de login", () => {
  it("Teste de login com sucesso", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.url().should("include", "http://localhost:3001/home")
    cy.get('.Toastify__toast-body').should("contain", "Operação realizada com sucesso!")
  })

  it("Teste de login com usuário inexistente", () => {
    login("teste@email.com", "ruralSenha")
    cy.url().should("include", "http://localhost:3001")
    cy.get('.Toastify__toast-body').should("contain", "Erro ao realizar a operação!")
  })

  it("Teste de login com senha incorreta", () => {
    login("guilherme@email.com", "teste")
    cy.url().should("include", "http://localhost:3001")
    cy.get('.Toastify__toast-body').should("contain", "Erro ao realizar a operação!")
  })
})

describe("Testes de Cadastro de Serviço", () => {
  it("Cadastro de Cadastro de Serviço com sucesso", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/registrarservico")
    cy.get('h2').should("contain", "Cadastro de Serviço")
    cy.get('.sc-bCztur').invoke('val', '2024-10-12').trigger('change')
    cy.wait(1000)
    cy.get('.sc-iXGjfC > .sc-jlHfjz').select("1")
    cy.get('.sc-fkJXLl > .sc-jlHfjz').select("83")
    cy.get('.sc-iCjFWQ').type("66600")
    cy.get('.sc-irPVuy > .sc-jlHfjz').select("PENDENTE")
    cy.get('.sc-khdDuB').type("Teste de Cadastro de Serviço")
    cy.get('[type="submit"]').click()
    cy.get('.Toastify__toast-body').should("contain", "Operação realizada com sucesso!")
  })

  it("Cadastro de Cadastro de Serviço sem data", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/registrarservico")
    cy.wait(1000)
    cy.get('.sc-iXGjfC > .sc-jlHfjz').select("1")
    cy.get('.sc-fkJXLl > .sc-jlHfjz').select("83")
    cy.get('.sc-iCjFWQ').type("66600")
    cy.get('.sc-irPVuy > .sc-jlHfjz').select("PENDENTE")
    cy.get('.sc-khdDuB').type("Teste de Cadastro de Serviço")
    cy.get('[type="submit"]').click()
    cy.wait(500)
    cy.get('.Toastify__toast-body > :nth-child(2)').should('not.exist')
  })

  it("Cadastro de Cadastro de Serviço sem tipo de serviço", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/registrarservico")
    cy.get('.sc-bCztur').invoke('val', '2024-10-12').trigger('change')
    cy.get('.sc-fkJXLl > .sc-jlHfjz').select("83")
    cy.get('.sc-iCjFWQ').type("66600")
    cy.get('.sc-irPVuy > .sc-jlHfjz').select("PENDENTE")
    cy.get('.sc-khdDuB').type("Teste de Cadastro de Serviço")
    cy.get('[type="submit"]').click()
    cy.wait(500)
    cy.get('.Toastify__toast-body > :nth-child(2)').should('not.exist')
  })

  it("Cadastro de Cadastro de Serviço sem responsável", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/registrarservico")
    cy.get('.sc-bCztur').invoke('val', '2024-10-12').trigger('change')
    cy.wait(1000)
    cy.get('.sc-iXGjfC > .sc-jlHfjz').select("1")
    cy.get('.sc-iCjFWQ').type("66600")
    cy.get('.sc-irPVuy > .sc-jlHfjz').select("PENDENTE")
    cy.get('.sc-khdDuB').type("Teste de Cadastro de Serviço")
    cy.get('[type="submit"]').click()
    cy.wait(500)
    cy.get('.Toastify__toast-body > :nth-child(2)').should('not.exist')
  })

  it("Cadastro de Cadastro de Serviço sem status", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/registrarservico")
    cy.get('.sc-bCztur').invoke('val', '2024-10-12').trigger('change')
    cy.wait(1000)
    cy.get('.sc-iXGjfC > .sc-jlHfjz').select("1")
    cy.get('.sc-fkJXLl > .sc-jlHfjz').select("83")
    cy.get('.sc-iCjFWQ').type("66600")
    cy.get('.sc-khdDuB').type("Teste de Cadastro de Serviço")
    cy.get('[type="submit"]').click()
    cy.wait(500)
    cy.get('.Toastify__toast-body > :nth-child(2)').should('not.exist')
  })

  it("Cadastro de Cadastro de Serviço sem observações", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/registrarservico")
    cy.get('.sc-bCztur').invoke('val', '2024-10-12').trigger('change')
    cy.wait(1000)
    cy.get('.sc-iXGjfC > .sc-jlHfjz').select("1")
    cy.get('.sc-fkJXLl > .sc-jlHfjz').select("83")
    cy.get('.sc-iCjFWQ').type("66600")
    cy.get('[type="submit"]').click()
    cy.wait(500)
    cy.get('.Toastify__toast-body > :nth-child(2)').should('not.exist')
  })

  it("Rotas de Cadastro de Serviço", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/registrarservico")
    cy.get('.sc-cwJYja > div > :nth-child(1)').click()
    cy.url().should("include", "http://localhost:3001/home")
  })

  it("Cadastro de Serviço sem login", () => {
    cy.visit("http://localhost:3001/registrarservico")
    cy.url().should("include", "http://localhost:3001")
  })
})

describe("Testes de cadastro de nova receita", () => {
  it("Cadastro de nova receita com sucesso", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/RegistrarReceitas")
    cy.get('h2').should("contain", "Nova receita")
    cy.get('.sc-ZVgAE > .sc-ajmIN').select("2")
    cy.get('.sc-byRyzU').type("666")
    cy.get('.sc-dRlUCX').type("Teste de receita")
    cy.get('.sc-fmtPfW > .sc-ajmIN').select("Sim")
    cy.get('[type="submit"]').click()
    cy.get('.Toastify__toast-body').should("contain", "Operação realizada com sucesso!")
  })

  it("Cadastro de nova receita sem categoria", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/RegistrarReceitas")
    cy.get('.sc-byRyzU').type("666")
    cy.get('.sc-dRlUCX').type("Teste de receita")
    cy.get('.sc-fmtPfW > .sc-ajmIN').select("Sim")
    cy.get('[type="submit"]').click()
    cy.wait(500)
    cy.get('.Toastify__toast-body').should('not.exist')
  })

  it("Cadastro de nova receita sem valor", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/RegistrarReceitas")
    cy.get('.sc-ZVgAE > .sc-ajmIN').select("2")
    cy.get('.sc-dRlUCX').type("Teste de receita")
    cy.get('.sc-fmtPfW > .sc-ajmIN').select("Sim")
    cy.get('[type="submit"]').click()
    cy.wait(500)
    cy.get('.Toastify__toast-body').should('not.exist')
  })

  it("Cadastro de nova receita sem observações", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/RegistrarReceitas")
    cy.get('.sc-ZVgAE > .sc-ajmIN').select("2")
    cy.get('.sc-byRyzU').type("666")
    cy.get('.sc-fmtPfW > .sc-ajmIN').select("Sim")
    cy.get('[type="submit"]').click()
    cy.wait(500)
    cy.get('.Toastify__toast-body').should('not.exist')
  })

  it("Cadastro de nova receita sem status", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/RegistrarReceitas")
    cy.get('.sc-ZVgAE > .sc-ajmIN').select("2")
    cy.get('.sc-byRyzU').type("666")
    cy.get('.sc-dRlUCX').type("Teste de receita")
    cy.get('[type="submit"]').click()
    cy.wait(500)
    cy.get('.Toastify__toast-body').should('not.exist')
  })

  it("Rotas de cadastro de nova receita", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/RegistrarReceitas")
    cy.get('.sc-jYWXzj > div > :nth-child(1)').click()
    cy.url().should("include", "http://localhost:3001/home")
  })

  it("Cadastro de nova receita sem login", () => {
    cy.visit("http://localhost:3001/registrarservico")
    cy.url().should("include", "http://localhost:3001")
  })
})

describe("Testes de detalhes de serviços", () => {
  it("Detalhes de serviços", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/servicedetails/63")
    cy.get('.sc-etPtWW').should("contain", "Detalhes do Serviço")
    cy.get(':nth-child(2) > .sc-txhaY').should("contain", "63")
    cy.get('.sc-bKXUjo').should("contain", "Luizio Alves")
  })

  it("Rotas de detalhes de serviços", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/servicedetails/".concat(id_excluir_servico))
    cy.get('.sc-gohMHu > .sc-kLJHhQ').click()
    cy.url().should("include", "http://localhost:3001/home")
    cy.visit("http://localhost:3001/servicedetails/".concat(id_excluir_servico))
    cy.get('.sc-bKXUjo').click()
    cy.url().should("include", "http://localhost:3001/employeedetails/154")
    cy.get('.sc-ikngxL').should("contain", "Detalhes do Funcionário")
    cy.get(':nth-child(2) > .sc-kEsJEW').should("contain", "154")
    cy.get(':nth-child(3) > .sc-kEsJEW').should("contain", "Silvio Vilela")
    cy.visit("http://localhost:3001/servicedetails/".concat(id_excluir_servico))
    cy.get('.sc-dSfWjt > :nth-child(2)').click()
    cy.url().should("include", "http://localhost:3001/services")
    cy.visit("http://localhost:3001/servicedetails/".concat(id_excluir_servico))
    cy.get('.sc-lgprfV').should("contain", "Erro ao carregar os detalhes do serviço.")

  })

  it("Detalhes de serviço inexistente", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/servicedetails/9999")
    cy.get('.sc-lgprfV').should("contain", "Erro ao carregar os detalhes do serviço.")
  })

  it("Detalhes de serviços sem login", () => {
    cy.visit("http://localhost:3001/servicedetails/9999")
    cy.url().should("include", "http://localhost:3001")
  })
})

describe("Testes de gerenciamento de serviços", () => {
  it("Gerenciamento de serviços", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/services")
    cy.get('.sc-kyexYT').should("contain", "Gerenciamento de Serviços")
  })

  it("Teste de busca por funcionário", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/services")
    cy.get('.sc-fjBUEo').type("José Alencar")
    cy.get('tbody > :nth-child(1) > :nth-child(3)').should("contain", "José Alencar")
  })

  it("Teste de busca por serviço", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/services")
    cy.get('.sc-fjBUEo').type("Pescaria")
    cy.get('tbody > :nth-child(1) > :nth-child(2)').should("contain", "Pescaria")
  })

  it("Teste de busca por funcionário inexistente", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/services")
    cy.get('.sc-fjBUEo').type("Inexistente")
    cy.get('tbody > :nth-child(1) > :nth-child(3)').should("not.exist")
  })

  it("Teste de busca por serviço inexistente", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/services")
    cy.get('.sc-fjBUEo').type("Inexistente")
    cy.get('tbody > :nth-child(1) > :nth-child(2)').should("not.exist")
  })

  it("Rotas de gerenciamento de serviços", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/services")
    cy.get('.sc-boxNXC').click()
    cy.url().should("include", "http://localhost:3001/registrarservico")
  })

  it("Gerenciamento de serviços sem login", () => {
    cy.visit("http://localhost:3001/services")
    cy.url().should("include", "http://localhost:3001")
  })
})

function login(email, senha) {
  cy.visit("http://localhost:3001/")
  cy.get(':nth-child(1) > .sc-uYFMi').type(email)
  cy.get(':nth-child(2) > .sc-uYFMi').type(senha)
  cy.get('.sc-iwXfZk').click()
}
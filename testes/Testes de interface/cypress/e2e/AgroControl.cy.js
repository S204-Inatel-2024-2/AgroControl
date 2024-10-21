/// <reference = cypress>

let id_excluir_funcionario = 93
let id_excluir_servico = 59

describe("Testes de detalhes de funcionários", () => {
  it("Detalhes de funcionario", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/employeedetails/68")
    cy.get('.sc-fkJXLl').should("contain", "Detalhes do Funcionário")
    cy.get(':nth-child(2) > .sc-irPVuy').should("contain", "68")
    cy.get(':nth-child(3) > .sc-irPVuy').should("contain", "Jorge Lafond")
  })

  it("Rotas de detalhes de funcionários", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/employeedetails/".concat(id_excluir_funcionario))
    cy.get('.sc-jlHfjz > :nth-child(1)').click()
    cy.url().should("include", "http://localhost:3001/employeeregistration")
    cy.visit("http://localhost:3001/employeedetails/".concat(id_excluir_funcionario))
    cy.get('.sc-hRgSog > .sc-hGNhLO').click()
    cy.url().should("include", "http://localhost:3001/home")
    cy.visit("http://localhost:3001/employeedetails/".concat(id_excluir_funcionario))
    cy.get('.sc-jlHfjz > :nth-child(2)').click()
    cy.url().should("include", "http://localhost:3001/home")
    cy.visit("http://localhost:3001/employeedetails/".concat(id_excluir_funcionario))
    cy.get('.sc-gFtjaa').should("contain", "Erro ao carregar os detalhes do funcionário.")
  })

  it("Detalhes de funcionário inexistente", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/employeedetails/9999")
    cy.get('.sc-gFtjaa').should("contain", "Erro ao carregar os detalhes do funcionário.")
  })

  it("Detalhes de funcionário sem login", () => {
    cy.visit("http://localhost:3001/employeedetails/68")
    cy.get('.sc-gFtjaa').should("contain", "Erro ao carregar os detalhes do funcionário.")
  })
})

describe("Testes de cadastro de funcionário", () => {
  it("Cadastro de funcionário com sucesso", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    let primeirosDigitos = (Math.random() * (1000 - 100) + 100)
    primeirosDigitos = Math.ceil(primeirosDigitos)
    cy.visit("http://localhost:3001/employeeregistration")
    cy.get('.sc-jIyAiq').should("contain", "Cadastro de novo funcionário")
    cy.get('.sc-lnsxGb > :nth-child(1) > .sc-iqyJx').type("Marcelo Rossi")
    cy.get(':nth-child(1) > .sc-jSSkKI > .sc-iqyJx').type(primeirosDigitos.toString().concat(".666.366-69"))
    cy.get('.sc-frniUE > :nth-child(2) > .sc-jSSkKI > .sc-iqyJx').type("1996-05-20")
    cy.get(':nth-child(3) > .sc-iqyJx').type("Rua José Alves de Souza")
    cy.get(':nth-child(4) > .sc-iqyJx').type(Math.floor(Math.random() * (1000 - 100) + 100).toString().concat("@email.com"))
    cy.get(':nth-child(5) > .sc-iqyJx').type("padre")
    cy.get('[style="gap: 20px;"] > .sc-iqyJx').type("6666")
    cy.get('[type="submit"]').click()
    cy.get('.Toastify__toast-body').should("contain", "Operação realizada com sucesso!")
  })

  it("Cadastro de funcionário com e-mail existe", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/employeeregistration")
    cy.get('.sc-lnsxGb > :nth-child(1) > .sc-iqyJx').type("Marcelo Rossi")
    cy.get(':nth-child(1) > .sc-jSSkKI > .sc-iqyJx').type("543.666.323-69")
    cy.get('.sc-frniUE > :nth-child(2) > .sc-jSSkKI > .sc-iqyJx').type("1996-05-20")
    cy.get(':nth-child(3) > .sc-iqyJx').type("Rua José Alves de Souza")
    cy.get(':nth-child(4) > .sc-iqyJx').type("omarcelorossi@email.com")
    cy.get(':nth-child(5) > .sc-iqyJx').type("padre")
    cy.get('[style="gap: 20px;"] > .sc-iqyJx').type("6666")
    cy.get('[type="submit"]').click()
    cy.get('.Toastify__toast-body').should("contain", "Erro ao realizar a operação!")
  })

  it("Cadastro de funcionário com CPF existe", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/employeeregistration")
    cy.get('.sc-lnsxGb > :nth-child(1) > .sc-iqyJx').type("Marcelo Rossi")
    cy.get(':nth-child(1) > .sc-jSSkKI > .sc-iqyJx').type("543.666.320-69")
    cy.get('.sc-frniUE > :nth-child(2) > .sc-jSSkKI > .sc-iqyJx').type("1996-05-20")
    cy.get(':nth-child(3) > .sc-iqyJx').type("Rua José Alves de Souza")
    cy.get(':nth-child(4) > .sc-iqyJx').type("ooomarcelorossi@email.com")
    cy.get(':nth-child(5) > .sc-iqyJx').type("padre")
    cy.get('[style="gap: 20px;"] > .sc-iqyJx').type("6666")
    cy.get('[type="submit"]').click()
    cy.get('.Toastify__toast-body').should("contain", "Erro ao realizar a operação!")
  })

  it("Rotas de cadastro de funcionário", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/employeeregistration")
    cy.get('.sc-UblHX > :nth-child(2)').click()
    cy.url().should("include", "http://localhost:3001/home")
    })

  it("Cadastro de funcionário sem login", () => {
    cy.visit("http://localhost:3001/employeeregistration")
    cy.get('.sc-gFtjaa').should("contain", "Erro ao carregar cadastro de funcionário.")
  })
})

describe("Testes de gerenciamento de funcionário", () => {
  it("Gerenciamento de funcionário", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/employees")
    cy.get('.sc-bOdUTf').should("contain", "Gerenciamento de Funcionários")
  })

  it("Teste de busca por funcionário", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/employees")
    cy.get('.sc-etPtWW').type("Benedito Carlos Rodrigues", { force: true })
    cy.get('tbody > :nth-child(1) > :nth-child(1)').should("contain", "Benedito Carlos Rodrigues")
  })

  it("Teste de busca por função", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/employees")
    cy.get('.sc-etPtWW').type("Cozinheira", { force: true })
    cy.get('tbody > :nth-child(1) > :nth-child(3)').should("contain", "Cozinheira")
  })

  it("Teste de busca por funcionário inexistente", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/employees")
    cy.get('.sc-etPtWW').type("Inexistente", { force: true })
    cy.get('tbody > :nth-child(1) > :nth-child(1)').should("not.exist")
  })

  it("Teste de busca por função	inexistente", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/employees")
    cy.get('.sc-etPtWW').type("Inexistente", { force: true })
    cy.get('tbody > :nth-child(1) > :nth-child(3)').should("not.exist")
  })

  it("Rotas de gerenciamento de serviços", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/employees")
    cy.get('.sc-iPHsxv').click({ force: true })
    cy.url().should("include", "http://localhost:3001/employeeregistration")
    cy.visit("http://localhost:3001/employees")
    cy.get('.sc-duWCru').click({ force: true })
    //cy.url().should("include", "http://localhost:3001/exportaremployee") - pagina ainda não existente
  })

  it("Gerenciamento de servicos sem login", () => {
    cy.visit("http://localhost:3001/employees")
    cy.get('.sc-gFtjaa').should("contain", "Erro ao carregar gerenciamento de serviços.")
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
    cy.get('[href="/registerfinances"]').click()
    cy.url().should("include", "http://localhost:3001/registerfinances")
    cy.visit("http://localhost:3001/employeeregistration")
    cy.get('svg path[d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"]').click()
    cy.get('[href="/services"]').click()
    cy.url().should("include", "http://localhost:3001/services")
    cy.visit("http://localhost:3001/employeeregistration")
    cy.get('svg path[d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"]').click()
    cy.get('[href="/employeeregistration"]').click()
    cy.url().should("include", "http://localhost:3001/employeeregistration")
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

describe("Testes de relatório financeiro", () => {
  it("Cadastro de relatório financeiro com sucesso", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/registerfinances")
    cy.get('h2').should("contain", "Relatório Financeiro")
    cy.get('.sc-cSzYSJ').invoke('val', '2024-10-12').trigger('change')
    cy.get('.sc-edmcci > .sc-kpAHqd').select("1")
    cy.get('.sc-fIfZzT > .sc-kpAHqd').select("68")
    cy.get('.sc-ljLmeM').type("66600")
    cy.get('.sc-jdeYMN > .sc-kpAHqd').select("PENDENTE")
    cy.get('.sc-gqYRWL').type("Teste de relatório financeiro")
    cy.get('[type="submit"]').click()
    cy.get('.Toastify__toast-body').should("contain", "Operação realizada com sucesso!")
  })

  it("Cadastro de relatório financeiro sem data", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/registerfinances")
    cy.get('.sc-edmcci > .sc-kpAHqd').select("1")
    cy.get('.sc-fIfZzT > .sc-kpAHqd').select("68")
    cy.get('.sc-ljLmeM').type("66600")
    cy.get('.sc-jdeYMN > .sc-kpAHqd').select("PENDENTE")
    cy.get('.sc-gqYRWL').type("Teste de relatório financeiro")
    cy.get('[type="submit"]').click()
    cy.wait(500)
    cy.get('.Toastify__toast-body').should('not.exist')
  })

  it("Cadastro de relatório financeiro sem tipo de serviço", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/registerfinances")
    cy.get('.sc-cSzYSJ').invoke('val', '2024-10-12').trigger('change')
    cy.get('.sc-fIfZzT > .sc-kpAHqd').select("68")
    cy.get('.sc-ljLmeM').type("66600")
    cy.get('.sc-jdeYMN > .sc-kpAHqd').select("PENDENTE")
    cy.get('.sc-gqYRWL').type("Teste de relatório financeiro")
    cy.get('[type="submit"]').click()
    cy.wait(500)
    cy.get('.Toastify__toast-body').should('not.exist')
  })

  it("Cadastro de relatório financeiro sem responsável", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/registerfinances")
    cy.get('.sc-cSzYSJ').invoke('val', '2024-10-12').trigger('change')
    cy.get('.sc-edmcci > .sc-kpAHqd').select("1")
    cy.get('.sc-ljLmeM').type("66600")
    cy.get('.sc-jdeYMN > .sc-kpAHqd').select("PENDENTE")
    cy.get('.sc-gqYRWL').type("Teste de relatório financeiro")
    cy.get('[type="submit"]').click()
    cy.wait(500)
    cy.get('.Toastify__toast-body').should('not.exist')
  })

  it("Cadastro de relatório financeiro sem valor", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/registerfinances")
    cy.get('.sc-cSzYSJ').invoke('val', '2024-10-12').trigger('change')
    cy.get('.sc-edmcci > .sc-kpAHqd').select("1")
    cy.get('.sc-fIfZzT > .sc-kpAHqd').select("68")
    cy.get('.sc-jdeYMN > .sc-kpAHqd').select("PENDENTE")
    cy.get('.sc-gqYRWL').type("Teste de relatório financeiro")
    cy.get('[type="submit"]').click()
    cy.wait(500)
    cy.get('.Toastify__toast-body').should('not.exist')
  })

  it("Cadastro de relatório financeiro sem status", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/registerfinances")
    cy.get('.sc-cSzYSJ').invoke('val', '2024-10-12').trigger('change')
    cy.get('.sc-edmcci > .sc-kpAHqd').select("1")
    cy.get('.sc-fIfZzT > .sc-kpAHqd').select("68")
    cy.get('.sc-ljLmeM').type("66600")
    cy.get('.sc-gqYRWL').type("Teste de relatório financeiro")
    cy.get('[type="submit"]').click()
    cy.wait(500)
    cy.get('.Toastify__toast-body').should('not.exist')
  })

  it("Cadastro de relatório financeiro sem observações", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/registerfinances")
    cy.get('.sc-cSzYSJ').invoke('val', '2024-10-12').trigger('change')
    cy.get('.sc-edmcci > .sc-kpAHqd').select("1")
    cy.get('.sc-fIfZzT > .sc-kpAHqd').select("68")
    cy.get('.sc-ljLmeM').type("66600")
    cy.get('[type="submit"]').click()
    cy.wait(500)
    cy.get('.Toastify__toast-body').should('not.exist')
  })

  it("Rotas de relatório financeiro", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/registerfinances")
    cy.get('.sc-iRLAEC > div > :nth-child(1)').click()
    cy.url().should("include", "http://localhost:3001/home")
  })

  it("Relatório financeiro sem login", () => {
    cy.visit("http://localhost:3001/registerfinances")
    cy.get('.sc-gFtjaa').should("contain", "Erro ao carregar os detalhes do funcionário.")
  })
})

describe("Testes de cadastro de nova receita", () => {
  it("Cadastro de nova receita com sucesso", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/RegistrarReceitas")
    cy.get('h2').should("contain", "Nova receita")
    cy.get('.sc-PBvYm > .sc-bdbhkv').select("2")
    cy.get('.sc-boxNXC').type("666")
    cy.get('.sc-ebFFfp').type("Teste de receita")
    cy.get('.sc-fjBUEo > .sc-bdbhkv').select("Sim")
    cy.get('[type="submit"]').click()
    cy.get('.Toastify__toast-body').should("contain", "Operação realizada com sucesso!")
  })
  
  it("Cadastro de nova receita sem categoria", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/RegistrarReceitas")
    cy.get('.sc-boxNXC').type("666")
    cy.get('.sc-ebFFfp').type("Teste de receita")
    cy.get('.sc-fjBUEo > .sc-bdbhkv').select("Sim")
    cy.get('[type="submit"]').click()
    cy.wait(500)
    cy.get('.Toastify__toast-body').should('not.exist')
  })

  it("Cadastro de nova receita sem valor", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/RegistrarReceitas")
    cy.get('.sc-PBvYm > .sc-bdbhkv').select("2")
    cy.get('.sc-ebFFfp').type("Teste de receita")
    cy.get('.sc-fjBUEo > .sc-bdbhkv').select("Sim")
    cy.get('[type="submit"]').click()
    cy.wait(500)
    cy.get('.Toastify__toast-body').should('not.exist')
  })

  it("Cadastro de nova receita sem observações", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/RegistrarReceitas")
    cy.get('.sc-PBvYm > .sc-bdbhkv').select("2")
    cy.get('.sc-boxNXC').type("666")
    cy.get('.sc-fjBUEo > .sc-bdbhkv').select("Sim")
    cy.get('[type="submit"]').click()
    cy.wait(500)
    cy.get('.Toastify__toast-body').should('not.exist')
  })

  it("Cadastro de nova receita sem status", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/RegistrarReceitas")
    cy.get('.sc-PBvYm > .sc-bdbhkv').select("2")
    cy.get('.sc-boxNXC').type("666")
    cy.get('.sc-ebFFfp').type("Teste de receita")
    cy.get('[type="submit"]').click()
    cy.wait(500)
    cy.get('.Toastify__toast-body').should('not.exist')
  })

  it("Rotas de cadastro de nova receita", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/RegistrarReceitas")
    cy.get('.sc-kHhQGl > div > :nth-child(1)').click()
    cy.url().should("include", "http://localhost:3001/home")
  })

  it("Cadastro de nova receita sem login", () => {
    cy.visit("http://localhost:3001/registerfinances")
    cy.get('.sc-gFtjaa').should("contain", "Erro ao carregar os detalhes do funcionário.")
  })
})

describe("Testes de detalhes de serviços", () => {
  it("Detalhes de serviços", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/servicedetails/21")
    cy.get('.sc-kEsJEW').should("contain", "Detalhes do Serviço")
    cy.get(':nth-child(2) > .sc-kBAPdo').should("contain", "21")
    cy.get('.sc-enMaOJ').should("contain", "Dalton Cruz")
  })

  it("Rotas de detalhes de serviços", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/servicedetails/".concat(id_excluir_servico))
    cy.get('.sc-iRVXky > .sc-jQybuE').click()
    cy.url().should("include", "http://localhost:3001/home")
    cy.visit("http://localhost:3001/servicedetails/".concat(id_excluir_servico))
    cy.get('.sc-erSfwj > :nth-child(1)').click()
    //cy.url().should("include", "http://localhost:3001/cadastrodeservico") - pagina ainda não existente
    cy.visit("http://localhost:3001/servicedetails/".concat(id_excluir_servico))
    cy.get('.sc-enMaOJ').click()
    cy.url().should("include", "http://localhost:3001/employeedetails/68")
    cy.get('.sc-fkJXLl').should("contain", "Detalhes do Funcionário")
    cy.get(':nth-child(2) > .sc-irPVuy').should("contain", "68")
    cy.get(':nth-child(3) > .sc-irPVuy').should("contain", "Jorge Lafond")
    cy.visit("http://localhost:3001/servicedetails/".concat(id_excluir_servico))
    cy.get('.sc-erSfwj > :nth-child(2)').click()
    cy.url().should("include", "http://localhost:3001/home")
    cy.visit("http://localhost:3001/servicedetails/".concat(id_excluir_servico))
    cy.get('.sc-bAEjGW').should("contain", "Erro ao carregar os detalhes do serviço.")
    
  })

  it("Detalhes de serviço inexistente", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/servicedetails/9999")
    cy.get('.sc-bAEjGW').should("contain", "Erro ao carregar os detalhes do serviço.")
  })

  it("Detalhes de serviços sem login", () => {
    cy.visit("http://localhost:3001/servicedetails/9999")
    cy.get('.sc-bAEjGW').should("contain", "Erro ao carregar os detalhes do serviço.")
  })
})

describe("Testes de gerenciamento de serviços", () => {
  it("Gerenciamento de serviços", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/services")
    cy.get('.sc-lgprfV').should("contain", "Gerenciamento de Serviços")
  })

  it("Teste de busca por funcionário", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/services")
    cy.get('.sc-fXwCOG').type("Dalton Cruz")
    cy.get('.sc-dwGkES > :nth-child(3)').should("contain", "Dalton Cruz")
  })

  it("Teste de busca por serviço", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/services")
    cy.get('.sc-fXwCOG').type("Pescaria")
    cy.get('tbody > :nth-child(1) > :nth-child(2)').should("contain", "Pescaria")
  })

  it("Teste de busca por funcionário inexistente", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/services")
    cy.get('.sc-fXwCOG').type("Inexistente")
    cy.get('tbody > :nth-child(1) > :nth-child(3)').should("not.exist")
  })

  it("Teste de busca por serviço inexistente", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/services")
    cy.get('.sc-fXwCOG').type("Inexistente")
    cy.get('tbody > :nth-child(1) > :nth-child(2)').should("not.exist")
  })

  it("Rotas de gerenciamento de serviços", () => {
    login("guilherme@email.com", "ruralSenha")
    cy.wait(2000)
    cy.visit("http://localhost:3001/services")
    cy.get('.sc-NOKRk').click()
    //cy.url().should("include", "http://localhost:3001/cadastrodeservico") - pagina ainda não existente
    cy.visit("http://localhost:3001/services")
    cy.get('.sc-iMPxVN').click()
    //cy.url().should("include", "http://localhost:3001/exportarservico") - pagina ainda não existente
  })

  it("Gerenciamento de serviços sem login", () => {
    cy.visit("http://localhost:3001/services")
    cy.get('.sc-gFtjaa').should("contain", "Erro ao carregar gerenciamento de serviços.")
  })
})

function login(email, senha) {
  cy.visit("http://localhost:3001/")
  cy.get(':nth-child(1) > .sc-dpBQxM').type(email)
  cy.get(':nth-child(2) > .sc-dpBQxM').type(senha)
  cy.get('.sc-cHqXqK').click()
}
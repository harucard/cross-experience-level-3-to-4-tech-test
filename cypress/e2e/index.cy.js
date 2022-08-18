describe('Test end to end', () => {
  it('Navigating to checkout page', () => {
    //Visita a Home Page
    cy.visit('/');
    //Clica no primeiro link de compra de Plano
    cy.get('a[href*="checkout"]').eq(0).click();
    //Link deve levar a rota checkout
    cy.url().should('include', '/checkout');
    //Na url deve ter atributo name
    cy.url().should('include', 'name');
    //Na URL deve ter atributo price
    cy.url().should('include', 'price');
  });

  it('Successully checkout',()=>{
    cy.visit('/checkout?name=Processos&price=29,00');
    cy.get("input[placeholder=\"NUMERO DO CARTÃO\"]").type("5452 5389 4527 1089");
    cy.get("input[placeholder=\"MÊS\"]").type("10");
    cy.get("input[placeholder=\"ANO\"]").type("2028");
    cy.get("input[placeholder=\"CVV\"]").type("307");
    cy.get("input[placeholder=\"NOME IMPRESSO NO CARTÃO\"]").type("Marlene Silva Santos");
    cy.get("input[value=\"ASSINAR AGORA!\"]").click();
    
    cy.get('div.uk-notification-message div').invoke('text')
     .then((text)=>{
       const toastText = text;
       expect(toastText).to.equal("Compra Efetuada com sucesso");
     })
     cy.wait(4000)
     cy.url().should('eq', 'http://localhost:3000/'); 
  })

  it('Test when a field is Missing',()=>{
    cy.visit('/checkout?name=Processos&price=29,00');
    //Pode ser testado campo a campo comentando uma linha abaixo de descomentando uma linha de mesma ordem.
    cy.get("input[placeholder=\"NUMERO DO CARTÃO\"]").type("5452 5389 4527 1089");//Número do Cartão
    cy.get("input[placeholder=\"MÊS\"]").type("10"); //Mês
    cy.get("input[placeholder=\"ANO\"]").type("2028");//Ano
    cy.get("input[placeholder=\"CVV\"]").type("307"); //CVV
    cy.get("input[placeholder=\"NOME IMPRESSO NO CARTÃO\"]").type("Marlene Silva Santos"); //Nome
    cy.get("input[value=\"ASSINAR AGORA!\"]").click();

    //cy.get('span.uk-text-danger.uk-text-small').should('have.text', 'Número do cartão deve ser preenchido')//Numero de Cartão
    //cy.get('span.uk-text-danger.uk-text-small').should('have.text', 'Mês deve ser preenchido')//Mẽs
    //cy.get('span.uk-text-danger.uk-text-small').should('have.text', 'Ano deve ser preenchido')//Ano
    //cy.get('span.uk-text-danger.uk-text-small').should('have.text', 'CVV deve ser preenchido')//CVV
    //cy.get('span.uk-text-danger.uk-text-small').should('have.text', 'Nome Impresso no cartão deve ser preenchido')//Nome

  })

  it('Testing card with no balance',()=>{
    cy.visit('/checkout?name=Processos&price=29,00');
   
    cy.get("input[placeholder=\"NUMERO DO CARTÃO\"]").type("4532 4957 4695 2291");
    cy.get("input[placeholder=\"MÊS\"]").type("08"); 
    cy.get("input[placeholder=\"ANO\"]").type("2026");
    cy.get("input[placeholder=\"CVV\"]").type("190"); 
    cy.get("input[placeholder=\"NOME IMPRESSO NO CARTÃO\"]").type("Maria Vitoria Almeida");
    cy.get("input[value=\"ASSINAR AGORA!\"]").click();

    cy.get('div.uk-notification-message div').invoke('text')
    .then((text)=>{
      const toastText = text;
      expect(toastText).to.equal("Cartão sem limite.Verifique com sua operadora do cartão");
    })
  });

  it('Testing Invalid Card',()=>{
    cy.visit('/checkout?name=Processos&price=29,00');
   
    cy.get("input[placeholder=\"NUMERO DO CARTÃO\"]").type("4532 4957 4695 2290");
    cy.get("input[placeholder=\"MÊS\"]").type("08"); 
    cy.get("input[placeholder=\"ANO\"]").type("2026");
    cy.get("input[placeholder=\"CVV\"]").type("190"); 
    cy.get("input[placeholder=\"NOME IMPRESSO NO CARTÃO\"]").type("Maria Vitoria Almeida");
    cy.get("input[value=\"ASSINAR AGORA!\"]").click();

    cy.get('div.uk-notification-message div').invoke('text')
    .then((text)=>{
      const toastText = text;
      expect(toastText).to.equal("Cartão Inválido.Verifique os dados informados");
    })
  })

  it('Testing Expired Card',()=>{
    cy.visit('/checkout?name=Processos&price=29,00');
   
    cy.get("input[placeholder=\"NUMERO DO CARTÃO\"]").type("5361 9278 2540 8152");
    cy.get("input[placeholder=\"MÊS\"]").type("01"); 
    cy.get("input[placeholder=\"ANO\"]").type("2022");
    cy.get("input[placeholder=\"CVV\"]").type("882"); 
    cy.get("input[placeholder=\"NOME IMPRESSO NO CARTÃO\"]").type("Eduardo Machado Santana");
    cy.get("input[value=\"ASSINAR AGORA!\"]").click();

    cy.get('div.uk-notification-message div').invoke('text')
    .then((text)=>{
      const toastText = text;
      expect(toastText).to.equal("Cartão expirado.Tente novamente com outro cartão de cŕedito");
    })
  })

  it('Testing full application until Successully checkout',()=>{
    cy.visit('/');
    //Clica no primeiro link de compra de Plano
    cy.get('a[href*="checkout"]').eq(0).click();
   
    cy.get("input[placeholder=\"NUMERO DO CARTÃO\"]").type("5452 5389 4527 1089");
    cy.get("input[placeholder=\"MÊS\"]").type("10");
    cy.get("input[placeholder=\"ANO\"]").type("2028");
    cy.get("input[placeholder=\"CVV\"]").type("307");
    cy.get("input[placeholder=\"NOME IMPRESSO NO CARTÃO\"]").type("Marlene Silva Santos");
    cy.get("input[value=\"ASSINAR AGORA!\"]").click();
    
    cy.get('div.uk-notification-message div').invoke('text')
     .then((text)=>{
       const toastText = text;
       expect(toastText).to.equal("Compra Efetuada com sucesso");
     })
     cy.wait(4000)
     cy.url().should('eq', 'http://localhost:3000/'); 
  })

})
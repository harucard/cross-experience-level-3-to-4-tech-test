const card_database = require('../../resources/cards/available-cards.json')

let cards = {}
//Definindo número do cartão como indice para facilitar na busca 
Array.prototype.forEach.call(card_database.data.cards,(card)=>{
    const clean_card_number =card.number.replace(/\s+/g, '');
    cards[clean_card_number] = card

});

const checkout = (req, res) => {
    let error = {};

    if(req.method !== "POST") {
        res.status(405).send({message:"Apenas POST requests são permitidas"})
        return
    }
   //Verificando se todos os campos foram preenchidos
   Array.prototype.forEach.call(Object.keys(req.body),(attribute)=>{  
        if(!req.body[attribute])
        error[attribute] = `${translateAttribute(attribute)} deve ser preenchido`
   })

   Object.keys(error).length > 0 ? res.status(500).json(error) : ""

   //Verificando Informações do cartão  em caso cartão válido
   if(validateCreditCardInformations(req)){
       hasExpired(req) ? res.status(405).json({message:"Cartão expirado.Tente novamente com outro cartão de cŕedito"}) :""
       hasLimit(req) ? res.status(200).json({message:"Compra Efetuada com sucesso"}) : 
       res.status(405).json({message:"Cartão sem limite.Verifique com sua operadora do cartão"})
   }else
    res.status(500).json({message:"cartão inválido"})  
}

const hasLimit = (req) => {
    const {price,card_number} = req.body
    const plan_price =price
    const number_card = card_number.split(" ").join("")
    const card_info = cards[number_card]

    return  Number(card_info.balance) >= Number(plan_price) 
}

const hasExpired = (req) => {
    const {month, year} = req.body
    const today = new Date();
    let expirationDate = new Date();

    expirationDate.setFullYear(year, month, 1);
    //Verificando se o cartão está expirado
    return today > expirationDate
}

const validateCreditCardInformations = (req) => {
    let validCard = false;

    //Recuperando valores da Requisição
    const {card_number,card_name,cvv,month, year} = req.body
    const number_card = card_number.split(" ").join("")
    const cvv_number = cvv
    const name = card_name.split(" ").join("").toLowerCase();
    const card_info = cards[number_card]
    const expiration_date = `${month}/${year}`

    //Validando número do cartão
    const isValidNumber = !!card_info
    //Em caso do cartão for válido, validar os campos do cartão 
    if(isValidNumber) {  
        const isValidCvv = cvv_number === card_info.cvv
        const isValidName = name === card_info.name.split(" ").join("").toLowerCase();
        const isValidExpirationDate = expiration_date === card_info.expiration
        
        if(  isValidCvv && isValidName && isValidExpirationDate) {
            validCard = true
        }      
    }
    return validCard;   
}

const translateAttribute = (attribute) => {
    const attr = {
        card_number:"Número do cartão",
        month:"Mês",
        year:"Ano",
        cvv:"CVV",
        card_name:"Nome Impresso no cartão"

    }

    return attr[attribute]

}

export default checkout;
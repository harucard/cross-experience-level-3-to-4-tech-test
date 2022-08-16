
const Bundle = ({plan}) => (
  <div className="uk-card uk-card-default uk-card-small">
      <div className="uk-text-left uk-margin-top uk-margin-small-left">
          <p className="uk-text-secondary uk-margin-remove">{plan.offerInfo.name}</p>
      </div>
      <div className="uk-card-body">
          <div className="uk-column-1-2@m">
              <div className="uk-flex uk-flex-row   uk-margin-right">
                  <p className="uk-text-light">{plan.paymentInfo.currency} <strong className="uk-text-large uk-text-secondary">{plan.paymentInfo.price}</strong>/mês</p>
              </div>
              <div className="uk-text-center">
                  <a className="uk-button uk-button-primary  uk-margin-remove-bottom" href={`/checkout?name=${plan.offerInfo.name}&price=${plan.paymentInfo.price}`}>ASSINAR AGORA</a>
                  <p className="uk-text-muted uk-margin-remove-top uk-text-small">Cancele quando quiser</p>
              </div>
          </div>  
      </div>  
  </div>
);
  
  export default Bundle;
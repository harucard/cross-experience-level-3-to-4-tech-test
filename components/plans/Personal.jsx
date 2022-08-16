
const Personal = ({plan}) => (
   <>
      <div className="uk-card uk-card-default uk-position-relative">
            <div className="uk-text-center uk-margin-top">
                <h3 className="uk-card-title uk-margin-remove">{plan.offerInfo.name}</h3>
            </div>
            <div className="uk-card-body plan-card-body">
            { plan.offerInfo.benefits.map((item)=>(  
                <div key={`container_${item}`} className="uk-flex ">
                    <div className=" uk-margin-right">
                        <i className="uk-icon-button uk-text-success" data-uk-icon="icon: check; ratio:1"></i>
                    </div>
                    <div>
                    <p className="uk-text-small uk-text-secondary uk-text-left" key={`text_${item}`}>{item}</p>
                    </div>
                </div>            
                           
                    
            ))
            
            }
            </div>
            <div className=" uk-card-footer   uk-text-center uk-margin-top">
            <p><span className="uk-margin-small-left uk-text-emphasis">{plan.paymentInfo.currency}</span><strong>{plan.paymentInfo.price}</strong>/mês</p>
            <a className="uk-button uk-button-primary uk-width-1-1 uk-margin-remove-bottom" href={`/checkout?name=${plan.offerInfo.name}&price=${plan.paymentInfo.price}`}>ASSINAR AGORA</a>
            <p className="uk-text-muted uk-margin-remove-top">Cancele quando quiser</p>
            </div>
      
      </div>
   </>
  );
  
  export default Personal;
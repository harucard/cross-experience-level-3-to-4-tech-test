
const Personal = ({plan}) => (
   <>
      <div className="uk-card uk-card-default uk-card-small uk-card-body uk-position-relative    uk-child-width-1-1@s"  data-uk-grid data-uk-height-match="target: > .uk-flex-row > div">
      
        <div className="uk-text-center uk-padding-remove-left">
            <h4 className="uk-padding-small uk-text-bold">{plan.offerInfo.name}</h4>
        </div>  
        
            { plan.offerInfo.benefits.map((item)=>(
                <div key={`container_${item}`} className="uk-flex uk-flex-row uk-margin-remove-top  uk-margin-remove-left">
                    <div>
                        <p data-uk-icon="icon: check; ratio:1" className="uk-text-success"></p>
                    </div>
                    <div>
                        <p className="uk-text-default uk-text-left"  key={`text_${item}`}>{item}</p>
                    </div>
                </div>                
            ))
            }
        
        <div className="uk-text-center  uk-margin-remove-bottom uk-margin-remove-top">
            <p><span className="uk-margin-small-left uk-text-emphasis">{plan.paymentInfo.currency}</span><strong>{plan.paymentInfo.price}</strong>/mês</p>
            <a className="uk-button uk-button-primary uk-width-1-1 uk-margin-remove-bottom" href={`/checkout?name=${plan.offerInfo.name}&price=${plan.paymentInfo.price}`}>ASSINAR AGORA</a>
            <p className="uk-text-muted uk-margin-remove-top">Cancele quando quiser</p>
        </div>
       
      </div>
   </>
  );
  
  export default Personal;
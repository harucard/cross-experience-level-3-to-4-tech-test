import Head from 'next/head'
import { useEffect,useState } from 'react';
import { useRouter } from 'next/router'
import { Container, Footer, Layout, Navbar, Hero } from '../components';


const HomePage = () => {
  const [planName, setPlanName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState({});
  const [form, setForm] = useState({
    card_number:"",
    month:"",
    year:"",
    cvv:"",
    card_name:""
  });

  const handleOnChange = (e, attribute) =>{
    let temp_object = {}
    temp_object = {...form}
    temp_object[attribute] = e.target.value
    
    setForm(temp_object)   
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});

    try {
      let data ={...form}
      data["price"] = price.replace(",",".");
      
      const response = await fetch("/api/checkout", {
        method:"POST",
        body:JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data_response = await response.json();

      if(response.status === 200){
        UIkit.notification({
          message: data_response.message,
          status: 'success',
          pos: 'top-center',
          timeout: 3000
        });
        setTimeout(()=>window.location.href="/", 3000);        
      }else if(response.status === 500){
        if(data_response.message){
          UIkit.notification({
            message: data_response.message,
            status: 'danger',
            pos: 'top-center',
            timeout: 3000
          });
        }else  
          setError(data_response)      
      }else if(response.status === 405){
        UIkit.notification({
          message: data_response.message,
          status: 'danger',
          pos: 'top-center',
          timeout: 3000
        });
      }
    }catch(err) {
      console.log("Erro",err)
    }
  }

  useEffect(()=>{
    const params = new URLSearchParams(window.location.search)

    setPlanName(params.get("name"));
    setPrice(params.get("price"));
    
  },[planName,price]);

  return (
    <Layout>
      <Head>
        <title>Jusbrasil: Tech test (level 03 to 04)</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.15.2/dist/css/uikit.min.css" />
        <script src="https://cdn.jsdelivr.net/npm/uikit@3.15.2/dist/js/uikit.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/uikit@3.15.2/dist/js/uikit-icons.min.js"></script>
      </Head>

      <Navbar />

      <Container>
        <div className="uk-card uk-card-default uk-card-body">
          <div className="uk-placeholder uk-margin-bottom">
            <div className="uk-grid uk-child-width-expand">
              <div>
                <h2 className="uk-text-meta">Produto</h2>
                <p>{planName}</p>
              </div>
              <div>
                <h2 className="uk-text-meta">Total</h2>
                <p>{price}</p>
              </div>
            </div>
          </div>
          <div className="uk-grid uk-child-width-1-2@m">
            <div>
              <h3><i data-uk-icon="icon: credit-card"></i> Cartão de crédito</h3>
              <p>Preencha abaixo todos os campos para comtinuar com a sua compra.</p>

              <form onSubmit={(e)=>handleSubmit(e)}>
                <fieldset className="uk-fieldset">
                  <div className="uk-margin">
                    <input type="text" className="uk-input" onChange={(e)=>handleOnChange(e,"card_number")} value={form.card_number} placeholder="NUMERO DO CARTÃO" />
                    {error?.card_number ? <span className="uk-text-small uk-text-danger">{error.card_number}</span> : null }
                  </div>
                  <div className="uk-grid uk-child-width-1-4" data-uk-grid>
                    <div>
                      <input type="number" className="uk-input" onChange={(e)=>handleOnChange(e,"month")} value={form.month} placeholder="MÊS" maxLength="2" />
                      {error?.month ? <span className="uk-text-small uk-text-danger">{error.month}</span> : null }
                    </div>
                    <div>
                      <input type="number" className="uk-input" onChange={(e)=>handleOnChange(e,"year")} value={form.year} placeholder="ANO" maxLength="4" />
                      {error?.year ? <span className="uk-text-small uk-text-danger">{error.year}</span> : null }
                    </div>
                    <div>
                      <input type="number" className="uk-input" onChange={(e)=>handleOnChange(e,"cvv")} value={form.cvv} placeholder="CVV" maxLength="4" />
                      {error?.cvv ? <span className="uk-text-small uk-text-danger">{error.cvv}</span> : null }
                    </div>
                  </div>
                  <div className="uk-margin">
                    <input type="text" className="uk-input" onChange={(e)=>handleOnChange(e,"card_name")} value={form.card_name} placeholder="NOME IMPRESSO NO CARTÃO" />
                    {error?.card_name ? <span className="uk-text-small uk-text-danger">{error.card_name}</span> : null }
                  </div>
                </fieldset>
                <input type="submit" value="ASSINAR AGORA!" className="uk-button uk-button-primary" />
                <p>Cancele quando quiser!</p>
              </form>

              <p>Ao prosseguir você estará concordando com os <a href="">Termos de uso do Jusbrasil</a>.</p>
            </div>
            <div>
              <h3><i data-uk-icon="icon: lock" className="uk-text-success"></i> Ambiente seguro</h3>
              <p>O Jusbrasil toma as melhores precauções para proteger seus dados sensíveis. Nós não armazenamos seu código de segurança e todas as outras informações são devidamente encriptadas e guardadas com segurança em nossos servidores para a cobrança de sua assinatura Pesquisa Jurídica Básica.</p>
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </Layout>
  )
}

export default HomePage;
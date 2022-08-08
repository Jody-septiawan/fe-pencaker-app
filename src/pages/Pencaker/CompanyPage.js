import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from '../../context/userContext';
import { Row, Col, Card, Alert} from 'react-bootstrap';
import InputJob from '../../commponent/Modal/InputJob';
import { useMutation, useQuery } from 'react-query';
import '../../Styles/Styles.css'
import { API } from '../../config/api';
import { useNavigate } from 'react-router-dom';
import Apply from '../../commponent/Modal/Apply';

export default function CompanyPage() {
    const [inputShow, setInputShow] = useState(false);
    const [data, setData] = useState()
    const [applyShow, setApply] = useState(false);
    const [id, setId] = useState()

    let navigate = useNavigate();

    const handleApplyed = (id) =>{
      setId(id)
      setApply(true)
    }

    const myJobs = async () =>{
        try {
            const response = await API.get('/myjobs')
            setData(response.data.jobs)
            console.log(response.data.jobs);
        } catch (error) {
            console.log(error)
        }
        }

useEffect(() => {

  myJobs()

     const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-GzKNSNXN6DWc-bq1";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, [])

  const handleBuy = async (item) => {
    try {

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const data = {
        jobId: item.id,
      };

      const body = JSON.stringify(data);

      const response = await API.post('/transaction', body, config);
      console.log(response);

      // Create variabel for store token payment from response here ...
      const token = response.data.payment.token;

      // Init Snap for display payment page with token here ...
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          navigate("/company");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          navigate("/company");
        },
        onError: function (result) {
          /* You may add your own implementation here */
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      })

    } catch (error) {
      console.log(error);
    }
  };


        

  return (
    <div>

        <div className='ContainerContent mt-5'>
        <button className='postAJob' onClick={() => setInputShow(true)}>Post a job</button>
        {data?.map((item, index) => (
        <Card className='mb-2 bg-content' key={index}>
        <Row className='Company-content'>
                        <Row style={{marginLeft: '5px', marginBottom: '2px'}}>
                             <Col sm={6}  style={{marginTop: '10px', marginBottom: '10px'}}>
                                <h4 style={{color: 'white'}}>{item.position}</h4>
                                <p className={`tb-status-${item.job_status}`}>{item.job_status}</p>
                                </Col>
                            <Col sm={2}  style={{marginTop: '10px', marginBottom: '10px'}} onClick={() => handleApplyed(item?.id)}>
                                <h4 style={{color: 'white'}}>{item.submitted}</h4>
                                <p style={{color: 'rgba(108, 108, 108, 1)'}}>Submited</p>
                                
                            </Col>
                            <Col sm={2}  style={{marginTop: '10px', marginBottom: '10px'}}>
                            <h4 style={{color: 'white', fontSize: '20px'}}>{item.duration}</h4>
                                <p style={{color: 'rgba(108, 108, 108, 1)'}}>Ads Duration</p>
                            </Col>
                            <Col sm={2}  style={{marginTop: '10px', marginBottom: '10px'}}>
                            {item.job_status == 'active' ? (''):(
                                <button onClick={() => handleBuy(item)} style={{borderRadius: '5px', backgroundColor: 'yellow'}}>Buy Active</button>
                            )}
                                </Col>
                        </Row>
            </Row>
        </Card>
           ))}
        <InputJob inputShow={inputShow} setInputShow={setInputShow} />
        <Apply applyShow={applyShow} setApply={setApply} id={id}/>
        </div>

    </div>
  )
}

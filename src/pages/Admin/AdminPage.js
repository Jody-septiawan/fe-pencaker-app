import React, {useState, useEffect} from 'react';
import { Row, Col, Card} from 'react-bootstrap';
import '../../Styles/Styles.css'
import { API } from '../../config/api';

export default function AdminPage() {
  const [data, setData] = useState()
  console.log(data);

  const Transaction = async () =>{
    try {
        const response = await API.get('/transactions')
        setData(response.data)
        console.log(response.data.transactions);
    } catch (error) {
        console.log(error)
    }
    }

  useEffect(() => {
    Transaction()
  },[data]);

  return (
    <div>
        <div className='ContainerContent mt-5'>
        <h4 style={{color: 'white'}}>Income Transaction</h4>
        <div className='d-flex mt-1'>
        <p style={{color: 'rgba(146, 146, 146, 1)', marginRight: '5px'}}>Total:</p> <h4 style={{color: 'white'}}>Rp. 300.000.000</h4>
        </div>
        {data?.map((item, index) => (
        <Card className='mb-2 bg-content' key={index}>
        <Row className='Company-content'>
                        <Row style={{marginLeft: '5px', marginBottom: '2px'}}>
                             <Col sm={8}  style={{marginTop: '10px', marginBottom: '10px'}}>
                                <h4 style={{color: 'white'}}>{item?.position} - {item?.company?.name}</h4>
                                <p className="tb-status-Active">Active</p>
                                </Col>
                            <Col sm={2}  style={{marginTop: '10px', marginBottom: '10px'}}>
                            </Col>
                            <Col sm={2}  style={{marginTop: '35px'}}>
                            <h4 style={{color: 'white'}}>Rp.500.000</h4>
                        
                            </Col>
                        </Row>
            </Row>
        </Card>
         ))}
        </div>

    </div>
  )
}

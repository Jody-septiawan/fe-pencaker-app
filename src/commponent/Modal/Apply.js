import React, { useState, useEffect } from 'react'
import { UserContext } from '../../context/userContext';
import { Modal, Alert, Col, Row} from 'react-bootstrap'
import { API } from '../../config/api';
import '../../Styles/Styles.css'

export default function Apply({applyShow, setApply, setId}) {

    const [data, setData] = useState()
    let id = setId
    console.log(id);
    const detailApply = async (id) =>{
        try {
            const response = await API.get(`/myjob/${id}`)
            setData(response.data.applayers)
            console.log(response.data.applayers);
        } catch (error) {
            console.log(error)
        }
        }


    useEffect(() => {
        detailApply()
    }, [])
    
  return (
    <Modal size='md'  show={applyShow} onHide={() => setApply(false)} centered>
    <Modal.Body className="bg-Modal">
    <div className="card-auth p-4">
    <h4 style={{color: 'white', textAlign: 'center', marginBottom: '10px'}}>Applied</h4>
    <Row className='Company-content'>
    {data?.map((item, index) => (
        <Col key={index}>
            <p style={{color: 'white'}}>{item?.name}</p>
            <p style={{color: 'white'}}>{item?.email}</p>
        </Col>
      ))}
    </Row>
    </div>
    </Modal.Body>
</Modal>
  )
}

import React from 'react'
import {Container, Nav, Navbar, Row, Col, Card} from 'react-bootstrap';
import Location from '../../assets/location.png'
import Salary from '../../assets/price.png'
import Logo from '../../assets/blank-profile.png'

export default function MyApply() {
  return (
    <div>
           <div className='ContainerContent'>
            <Row>
                <Col lg={2} className="Content">
                        <Row style={{marginLeft: '5px', marginBottom: '2px'}}>
                             <Col sm={3}>
                                <img src={Logo} alt=''/>
                                </Col>
                            <Col sm={6}>
                                <p className='card-title-text' style={{ marginTop: '5px', color: 'white', fontSize: '15px', fontWeight: 'bold' }}>Frontend Developer</p>
                                <p className='Company'>Gojek</p>
                                <div style={{display: 'flex', marginTop: '10px'}}>
                                    <div className='location'>
                                    <img src={Location} alt='' style={{width:'10px'}}/>
                                    <p>lokasi</p>
                                </div>
                                <div className='salery'>
                                <img src={Salary} alt='' style={{width:'10px'}}/>
                                <p>salery</p>
                                </div>
                                </div>
                            </Col>
                            <Col sm={3} className='rightContent'>
                                <p style={{marginTop: '10px', color: 'rgba(138, 138, 138, 1)', fontSize: '10px'}}>22 Juni 2022</p>
                                <button>Apply</button>
                            </Col>
                        </Row>
                </Col>
            </Row>
        </div>
    </div>
  )
}

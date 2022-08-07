import React, {useState, useEffect} from 'react'
import {Container, Nav, Navbar, Row, Col, Card} from 'react-bootstrap';
import Header from '../../assets/header.png'
import Footer from '../../assets/footer.png'
import Logo from '../../assets/blank-profile.png'
import '../../Styles/Styles.css'
import Location from '../../assets/location.png'
import Salary from '../../assets/price.png'
import { API } from '../../config/api';
import { useQuery } from 'react-query';
import rupiahFormat from 'rupiah-format';
import { Link } from 'react-router-dom';


export default function UserPage() {
    const [search, setSearch] = useState("");
    const [data, setData]= useState()

    const handleSearch = async () =>{
        try {
            const response = await API.get(`/jobs?position=${search}`)
            setData(response.data.jobs)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
        }

        

useEffect(() => {
    if (search == ""){
        const handleView = async () =>{
            try {
                const response = await API.get('/jobs')
                setData(response.data.jobs)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
    handleView()
    }else{
    handleSearch()
    }
  }, [search])

  return (
    <div>
            <div className='Headers'>
            <img src={Header} alt='' />
            <h1 >FIND AND BECOME A</h1> 
            <h1 style={{marginTop: '40px', color: 'rgba(255, 195, 0, 1)'}}>PROFESSIONAL</h1>
            <h1 style={{marginTop: '80px'}}> WITH PASSION</h1>
            <input type="text" style={{borderRadius: '5px', width: '500px', height: '40px'}}></input>
        </div>

        <div className='ContainerContent'>
        <Row>
            {data?.map((item, index) => (
                <Col lg={2} style={{textDecoration: 'none'}} className="Content" key={index} as={Link} to={`/user/job/${item.id}`}>
                        <Row style={{marginLeft: '5px', marginBottom: '2px'}}>
                             <Col sm={3}>
                                <img src={item.company?.image ? item.company?.image : Logo} style={{width: '90px', height: '90px'}}  alt=''/>
                                </Col>
                            <Col sm={6}>
                                <p className='card-title-text' style={{ marginTop: '5px', color: 'white', fontSize: '15px', fontWeight: 'bold' }}>{item.position}</p>
                                <p className='Company'>{item.company.name}</p>
                                <div style={{display: 'flex', marginTop: '10px'}}>
                                    <div className='location'>
                                    <img src={Location} alt='' style={{width:'10px'}}/>
                                    <p>{item.location}</p>
                                     </div>
                                <div className='salery'>
                                <img src={Salary} alt='' style={{width:'10px'}}/>
                                <p>{rupiahFormat.convert(item.salary_start)} - {rupiahFormat.convert(item.salary_end)}</p>
                                </div>
                                </div>
                            </Col>
                            <Col sm={3} className='rightContent'>
                                <p style={{marginTop: '10px', color: 'rgba(138, 138, 138, 1)', fontSize: '10px'}}>{item.post_at}</p>
                                <button as={Link} to={`/user/job/${item.id}`}>Apply</button>
                            </Col>
                           
                        </Row>
                </Col>
                 ))}
            </Row>
        </div>

        <div className='Footer'>
            <div className='footerKontent'>
            <h4 className='title'>"don't give up easily, the future is in your hands"</h4>
            </div>
        </div>
    </div>
  )
}

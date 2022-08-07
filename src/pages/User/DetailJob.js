import React, {useState, useEffect} from 'react'
import Header from '../../assets/header.png'
import { API } from '../../config/api';
import { useParams } from 'react-router-dom';
import rupiahFormat from 'rupiah-format';

export default function DetailJob() {
  const [data, setData]= useState()

  let { id } = useParams();

  const handleDetail = async () =>{
    try {
        const response = await API.get(`/job/${id}`)
        console.log(response.data.data);
        setData(response.data.data)
    } catch (error) {
        console.log(error)
    }
    }

    const handleApply = async () =>{
      try {
        const response = await API.post('/job/apply')
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  
    


    useEffect(() => {
      handleDetail()
    }, [])

  return (
    <div>
        
        <div className='HeadersT'>
            <img src={Header} alt='' />
            <div className="detailJob ContainerContent">
                <h2 style={{color: 'rgba(255, 195, 0, 1)'}}>{data?.position}</h2>
                <p style={{color: 'white'}}>{data?.location}</p>
                <p style={{color: 'white'}}>{rupiahFormat.convert(data?.salary_start)} - {rupiahFormat.convert(data?.salary_end)}</p>
                <button onClick={() => handleApply()}>Apply</button>

            </div>
        </div>

    </div>
  )
}

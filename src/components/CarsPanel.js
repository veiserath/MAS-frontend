import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Input } from 'semantic-ui-react'
import {useNavigate} from 'react-router-dom';

export default function CarsPanel() {
    const url = `http://localhost:8080/cars`
    const [APIData, setAPIData] = useState([])
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    let navigate = useNavigate();

    const toCarDamages=(url)=>{
        navigate('/carDamages',{state:{id:1,url:url}});
    }

    useEffect(() => {
        axios.get(url)
            .then((response) => {
                setAPIData(response.data._embedded.cars);
            })
    }, [url])

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = APIData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(APIData)
        }
    }

    return (
        <div style={{ padding: 20 }}>
            <Input icon='search'
                placeholder='Search...'
                onChange={(e) => searchItems(e.target.value)}
            />
            <Card.Group itemsPerRow={3} style={{ marginTop: 20 }}>
                {searchInput.length > 1 ? (
                    filteredResults.map((item) => {
                        return (
                            <Card key={item.vehicleRegistrationPlate} onClick={()=>{
                                toCarDamages(item._links.carDamages.href)
                                }}>
                                <Card.Content>
                                    <Card.Header>{item.brand + " " + item.model}</Card.Header>
                                    <Card.Description>
                                        {item.vehicleRegistrationPlate}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        )
                    })
                ) : (
                    APIData.map((item) => {
                        return (
                            <Card key={item.vehicleRegistrationPlate} onClick={()=>{
                                toCarDamages(item._links.carDamages.href)
                                }}>
                                <Card.Content>
                                    <Card.Header>{item.brand + " " + item.model}</Card.Header>
                                    <Card.Description>
                                        {item.vehicleRegistrationPlate}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        )
                    })
                )}
            </Card.Group>
        </div>
    )
}
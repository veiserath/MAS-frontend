import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Input } from 'semantic-ui-react'
import {useLocation} from 'react-router-dom';

export default function TechnicianPanel() {
    const [APIData, setAPIData] = useState([])
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const location = useLocation();


    useEffect(() => {
        
        axios.get(location.state.url)
            .then((response) => {
                setAPIData([response.data]);
            })
    }, [location.state.url])

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
                            <Card key={item.pesel} onClick={() => console.log("2137")}>
                                <Card.Content>
                                    <Card.Header>{item.name + " " + item.lastName}</Card.Header>
                                    <Card.Description>
                                        {"PESEL: " + item.pesel}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        )
                    })
                ) : (
                    APIData.map((item) => {
                        return (
                            <Card key={item.pesel} onClick={() => console.log("420")}>
                                <Card.Content>
                                    <Card.Header>{item.name + " " + item.lastName}</Card.Header>
                                    <Card.Description>
                                        {"PESEL: " + item.pesel}
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
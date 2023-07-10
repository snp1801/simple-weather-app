import './App.css';
import { useState } from 'react';
import axios from 'axios';
require('dotenv').config();

function App() {
    const [search, setSearch] = useState('');
    const [pass, setPass] = useState("");

    // useEffect(() => {
    //   return () => {
    //     setIsMounted(false);
    //   };
    // }, []);

    async function fetchData() {
        const options = {
            method: 'GET',
            url: process.env.API_URL,
            params: { q: `${search}` },
            headers: {
                'X-RapidAPI-Key': process.env.API_KEY,
                'X-RapidAPI-Host': process.env.API_HOST
            }
        };

        try {
            const response = await axios.request(options);
            setPass(response.data);
            console.log(pass)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const changeSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }


    return (
        <div className='fullApp'>
            <div className='content'>
                <h1>
                    Weather App
                </h1>
                <div>
                    <input className="cityInput" placeholder="Search a city" value={search} type="text" onChange={changeSearch} />
                    <button onClick={fetchData}>Search</button>
                    {pass === "" ? (
                        <div>No Data</div>
                    ) : (
                        <div>
                            <h3>Temperature : {pass.current.temp_c} 'C</h3>
                            <h3>Location : {pass.location.name}</h3>
                            <h3>Region : {pass.location.region}</h3>
                            <h3>Country : {pass.location.country}</h3>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default App;

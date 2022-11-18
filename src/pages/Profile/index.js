import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";


import api from '../../services/api'

import './styles.css';

import LogoImg from '../../assets/logo.svg'


export default function Profile() {

    let queimadaChart= 0;
    let alagamentoChart = 0;
    let desmatamentoChart = 0;
    let incendioChart = 0;
    let desabamentoChart = 0;
    let ventosfortesChart = 0;  

    const [incidents, setIncidents] = useState([]);
    const [incidentCount, setCount] = useState();
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId])

    useEffect(() => {
        api.get('count', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setCount(response.data)
        })
    }, [ongId])

    function validarIncidente() {
        
        if (incidentCount != undefined) {
            let i = 0;

            for (i = 0; i < incidentCount.length - 1; i++) {
                if (incidentCount[i].title == "Desabamento") {

                    desmatamentoChart = incidentCount[i]["count(`id`)"];

                }

                if (incidentCount[i].title == "Queimada") {

                    queimadaChart = incidentCount[i]["count(`id`)"];

                }

                if (incidentCount[i].title == "Alagamento") {

                    alagamentoChart = incidentCount[i]["count(`id`)"];

                }

                if (incidentCount[i].title == "Incendio") {

                    incendioChart = incidentCount[i]["count(`id`)"];

                }

                if (incidentCount[i].title == "Desmatamento") {

                    desmatamentoChart = incidentCount[i]["count(`id`)"];

                }

                
                if (incidentCount[i].title == "Ventos fortes") {

                    ventosfortesChart = incidentCount[i]["count(`id`)"];

                }

            }

        }

    }
    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (error) {
            alert('Erro ao deletar caso, tente novamente')
        }
    }

    function handleLogout() {

        localStorage.clear();
        history.push('/')
    }

    return (

        <div className="profile-container">
            {validarIncidente()}
            <header>
                <img src={LogoImg} alt="De olho na cidade" />
                <span>Boas vindas, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button
                    onClick={handleLogout}
                    type="button">
                    <FiPower size={18} color="#228b22" />
                </button>


            </header>

            <div className='dashboard'>
                <BarChart
                    width={1140}
                    height={600}
                    data={[
                        {
                            name: "Grafico",
                            Queimadas: queimadaChart,
                            Alagamentos: alagamentoChart,
                            Desmatamento: desmatamentoChart,
                            Incendio: incendioChart,
                            Desabamento: desabamentoChart,
                            VentosFortes: ventosfortesChart

                        }
                    ]}

                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Queimadas" fill="#9e2a26" />
                    <Bar dataKey="Alagamentos" fill="#31c7cb" />
                    <Bar dataKey="Desmatamento" fill="#22711b" />
                    <Bar dataKey="Incendio" fill="#d1603f" />
                    <Bar dataKey="Desabamento" fill="#b78b2c" />
                    <Bar dataKey="VentosFortes" fill="#78746b" />
                </BarChart>
            </div>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                        <strong>VALOR:</strong>
                        <p>{(incident.value)}</p>

                        <button
                            onClick={() => handleDeleteIncident(incident.id)}
                            type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>

                ))}
            </ul>


        </div>
    );
}
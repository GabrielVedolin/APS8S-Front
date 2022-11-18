import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api'

import './styles.css';

import LogoImg from '../../assets/logo.svg'


export default function NewIncident() {
    const options = ["Queimada", "Alagamento", "Desmatamento", "Incendio", "Desabamento", "Ventos fortes" ];
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    let descPlaceholder = ("");

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    
    function retornaTipo (tipo){
        if (tipo == "Queimada"){
            return "Area das queimadas";
        }

        if (tipo == "Alagamento"){
            return "Area do alagamento";
        }

        if (tipo == "Desmatamento"){
            return "Area do desmatamento";
        }

        if (tipo == "Incendio"){
            return "Area do incendio";
        }

        if (tipo == "Desabamento"){
            return "Area do desabamento";
        }

        if (tipo == "Ventos fortes"){
            return "Velocidade dos ventos (KM/H)";
        }

    

    }

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })

            history.push('/profile')

        } catch (error) {
            alert('Erro ao cadastrar caso, tente novamente')
        }
    }

    return (
        <div className="new-incident-container">

            <div className="content">
                <section>
                    <img src={LogoImg} alt="De olho na cidade" />
                    <h1>Cadastrar novo incidente</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <h1> Tipo de incidente</h1>
                    <select
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}>
                        {options.map((value) => (
                            <option value={value} key={value}>
                                {value}
                            </option>
                        ))}
                    </select>


                    <textarea
                        placeholder="Descrição, local e horario"
                        value={description}
                        onChange={e => setDescription(e.target.value)} />

                    <input
                        placeholder={retornaTipo(title)}
                        value={value}
                        onChange={e => setValue(e.target.value)} />

                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>

    );
}
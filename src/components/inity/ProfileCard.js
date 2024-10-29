import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

const ProfileCard = ({ nome, email, dataNascimento, imgSrc }) => {
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelection = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div
      className={`profile-card ${isSelected ? "selected" : ""}`} 
      onClick={toggleSelection}
    >
      <img src={imgSrc} alt={`${nome} profile`} className="profile-img" /> 
      <h2>{nome}</h2>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Data de Nascimento:</strong> {dataNascimento}</p>
    </div>
  );
};

const HomeComponent = () => {
  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    axios.get('https://bancodequestoes.onrender.com/professor/listar')
      .then(response => {
        console.log("Resposta da API:", response.data); 
        setProfessores(Array.isArray(response.data.professor) ? response.data.professor : []);
      })
      .catch(error => {
        console.error("Erro ao buscar professores:", error);
      });
  }, []);

  return (
    
    <div className="home-container">
      

      <h1>Perfis</h1>
      <div className="profile-container">
        {professores.map((professor) => (
          <ProfileCard
            key={professor.id}
            nome={professor.nome}
            email={professor.email}
            dataNascimento={new Date(professor.dataNascimento).toLocaleDateString()}
            imgSrc="https://static.vecteezy.com/ti/vetor-gratis/p1/11186876-simbolo-de-foto-de-perfil-masculino-vetor.jpg"
          />
        ))}
      </div>
    </div>
  );
  
};

export default HomeComponent;

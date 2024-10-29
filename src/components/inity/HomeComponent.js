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
    axios.get('https://bancodequestoes.onrender.com/professor/listar', { headers: { 'Accept': '/' } })
      .then(response => {
        const responseText = response.data; 
        const professorMatches = responseText.match(/Professor\((.*?)\)/g); 

        const parsedProfessores = professorMatches.map(professor => {
          const [id, nome, email, senha, dataNascimento] = professor
            .replace(/Professor\(|\)/g, '') 
            .map(attr => attr.split('=')[1]); 
          return {
            id,
            nome,
            email,
            senha,
            dataNascimento
          };
        });

        setProfessores(parsedProfessores);
      })
      .catch(error => {
        console.error("Erro ao buscar professores:", error);
      });
  }, []);

  return (
    <div className="home-container">
       <nav className="navbar">
        <ul>
          <li>Home</li>
          <li>Explore</li>
          <li>Provas</li>
        </ul>
      </nav>

      <div className="main-content">
        <div className='contentin'>
          <div className="text-section">
            <h1>Educa+</h1>
            <p>
              Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae 
              legendos at vix ad putent delectus delicata usu. Vidit dissentiet eos 
              cu eum an brute copiosae hendrerit.
            </p>
          </div>

          <div className="card">
            <h2>Social Education</h2>
            <p>Lorem ipsum dolor sit amet et delectus</p>
            <button>Button</button>
          </div>
        </div>
      </div>

      <div className="toggle-switch">
        <span>Sample Text</span>
        <div className="switch">
          <div className="toggle"></div>
        </div>
      </div>
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

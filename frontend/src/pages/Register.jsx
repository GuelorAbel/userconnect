import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
// éléments globaux
import { Link, useNavigate } from 'react-router-dom'
import Container from '../elements/Container'


export default function Register() {
// états, données dynamiques
const [values, setValues] = useState({
    nom: '',
    email: '',
    password: ''
})
const navigate = useNavigate();

// les #comportements
const handleSubmit = (event)=> {
    event.preventDefault();
    axios.post('http://localhost:5000/register', values)
    .then(res => {
        if(res.data.Status === 200) {
            toast.success(res.data.message);
            navigate('/connexion')
        } else {
            toast.error(res.data.Error);
        }
    })
    .catch((err) => console.log(err));
}

// rendu navigateur
  return (
    <section className="bg-violet-600 text-[#111827] h-screen">
        <Container>
            <div className="flex justify-center items-center my-[20vh] md:my-[30vh]">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-2xl md:text-3xl uppercase mb-4 font-semibold">Créer un compte</h2>
                    {/* bloc du nom */}
                    <div className="mb-3">
                        <label htmlFor="nom">Nom </label>
                        <input type="text" placeholder="Saisissez votre nom..." name="nom"
                        className="input w-full max-w-lg outline-none border border-violet-200 mt-2"
                        required onChange={e => setValues({...values, nom: e.target.value})}
                        />
                    </div>
                    {/* bloc email */}
                    <div className="mb-3">
                        <label htmlFor="email">Email </label>
                        <input type="email" placeholder="Saisissez votre adresse email..." name="email"
                        className="input w-full max-w-lg outline-none border border-violet-200 mt-2"
                        required onChange={e => setValues({...values, email: e.target.value})}
                        />
                    </div>
                    {/* bloc du mot de pass */}
                    <div className="mb-3">
                        <label htmlFor="password">Mot de passe </label>
                        <input type="password" placeholder="Saisissez votre mot de passe..." name="password"
                        className="input w-full max-w-lg outline-none border border-violet-200 mt-2"
                        required onChange={e => setValues({...values, password: e.target.value})}
                        />
                    </div>
                    {/* bouton de soumission */}
                    <button type="submit" className="btn btn-sm bg-violet-600 text-[#f8fafc] w-full mb-2">S'inscrire</button>
                    <p className="text-sm italic">Si vous avez déjà un compte, cliquez sur se connecter</p>
                    <Link to="/connexion" className="btn btn-sm border border-violet-600 text-violet-600 w-full mt-2">Se connecter</Link>
                </form>
            </div>
        </Container>
    </section>
  )
}

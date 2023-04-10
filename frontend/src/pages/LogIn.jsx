import { useState } from "react"
import Container from "../elements/Container"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import {toast} from 'react-toastify'

export default function LogIn() {
    // états, données dynamiques
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();

    // les #comportements
    axios.defaults.withCredentials = false;
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:5000/login", values)
          .then((res) => {
            if (res.data.Status === 200) {
                toast.success(res.data.message);
              navigate("/");
            } else {
                toast.error(res.data.Error);
            }
          })
          .catch((err) => console.log(err));
      };
    // rendu navigateur
    return (
        <section className="bg-violet-600 text-[#111827] h-screen">
            <Container>
                <div className="flex justify-center items-center my-[20vh] md:my-[30vh]">
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <h2 className="text-2xl md:text-3xl uppercase mb-4 text-center font-semibold">Se connecter</h2>
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
                            onChange={e => setValues({...values, password: e.target.value})}
                            
                            />
                        </div>
                        {/* bouton de soumission */}
                        <button type="submit" className="btn btn-sm bg-violet-600 text-[#f8fafc] w-full mb-2">Se connecter</button>
                        <p className="text-sm italic">
                            Veuillez créer un compte <Link to="/inscription" className="text-violet-600 font-bold">ici</Link>, 
                            si vous n'en avez pas un... 
                        </p>
                    </form>
                </div>
            </Container>
        </section>
    )
}

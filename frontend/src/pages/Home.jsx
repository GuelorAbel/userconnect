import { Link} from "react-router-dom";
import { IoLogOut } from 'react-icons/io5'

export default function Home() {
    // états, données dynamiques

    // les #comportements

    // rendu navigateur
    return (
        <section className="text-[#111827]">
                <div className="flex w-full">
                    <div className="w-1/12 md:w-2/12 h-screen bg-violet-600 text-[#f8fafc] p-6">
                        <h4 className="uppercase font-bold text-sm">panneau d'administration</h4>
                    </div>
                    <div className="w-11/12 md:w-10/12 p-6">
                        <div className="flex justify-end ">
                            <Link to="/connexion" className="text-violet-600"> <IoLogOut size={25}/> </Link>
                            <span className="ml-1 italic">se déconnecter</span>
                        </div>
                        <hr className="border border-violet-50 my-2"/>
                        <p>ok</p>
                    </div>
                </div>
        </section>
    )
}

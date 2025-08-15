import React, { Suspense, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import netflix_spinner from './assets/netflix_spinner.gif'
import './pages/Login/Login.css'


const Home = React.lazy(()=>import('./pages/Home/Home'));
const Login = React.lazy(()=>import('./pages/Login/Login'));
const Player = React.lazy(()=>import('./pages/Player/Player'));
const MovieDetails= React.lazy(()=>import('./pages/MovieDetails/MovieDetails'))
const Favorites= React.lazy(()=>import('./pages/Favorites/Favorites'))


const App = () => {

  const navigate = useNavigate();

  useEffect(()=>{

    onAuthStateChanged(auth, async (user)=>{
      if(user){
        console.log("Logged In");
        navigate('/')
      }
      else {
        console.log('Logged out');
        navigate('/login')
      }
    })

  },[])

  return (
    <div>
      <ToastContainer theme='dark'/>
      <Suspense fallback={<div className="login-spinner">
            <img src={netflix_spinner} alt="" />
          </div>}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/player/:id' element={<Player/>}/>
        <Route path='/movies/:id' element={<MovieDetails/>}/>
        <Route path='/favorites' element={<Favorites/>}/>
      </Routes>
      </Suspense>
    </div>
  )
}

export default App

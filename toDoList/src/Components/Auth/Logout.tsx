import './authStyle.css';
import { useNavigate } from 'react-router-dom';


const Logout = () => {
  const navigate = useNavigate();

    const logout = async () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/');// redirige vers home
    }

  return (
    <div className="postion-relative">
      <li onClick={logout} className='position-absolute top-0 end-0 myStyleOff'>
        <i className="fas fa-power-off mt-3 me-3 myHover"></i>
      </li>
    </div>
  )
}

export default Logout

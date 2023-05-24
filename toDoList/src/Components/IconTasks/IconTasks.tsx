import './iconTask.css';
import IconListe from '../../assets/liste.svg';


const IconTache = (props:any) => {
    
  return (
    <div>
      <img className='img-fluid iconList' src={IconListe} alt="Icon d'une liste" />
    </div>
  )
}

export default IconTache;

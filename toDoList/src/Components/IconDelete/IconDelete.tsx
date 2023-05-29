import iconDeleting from '../../assets/corbeille.svg';

import './iconDelete.css';


export default function IconDelete() {
  return (
    <div>
      <img className='img-fluid iconDeleting' src={iconDeleting} alt="Icone d'un corbeille"></img>
    </div>
  )
}

import './iconEdit.css';

import IconEditing from '../../assets/editer.svg';


export default function IconEdit(props:any) {

    return (
        <div>
          <img className='img-fluid iconEditing' src={IconEditing} alt="Icon d'une liste à modifier"></img>
        </div>
      )
}

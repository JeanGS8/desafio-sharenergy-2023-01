import { useEffect, useState } from "react";
import { cats } from '../../services/Service';
import Button from '@mui/material/Button'

export default function Gatos(){
  
  const [foto, setFoto] = useState('');

  function pegaFoto(){
    cats('400', setFoto);
  }

  return(
    <>
      <Button variant="text" color="inherit" onClick={pegaFoto} fullWidth>
        Clica aqui
      </Button>
      <div style={{width: '300px', height: '300px'}}>
        <img src={foto} alt="" />
      </div>
    </>
  )
}
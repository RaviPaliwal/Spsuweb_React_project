import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const icon = require('../../Assets/spsulogo.png')
export default function Loader(props) {
return (
<div>
<Backdrop
sx={{
backgroundColor: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
color: '#fff',
zIndex: (theme) => theme.zIndex.drawer + 1,
}}
open={props.open}
>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
<img className='me-4' src={icon} alt="SpsuIcon" height="64" />
<h2 style={{ marginTop: '1rem', fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'Helvetica Neue' }}>Loading...</h2>
<CircularProgress style={{ marginTop: '1rem', color: '#609e99' }} />
</div>
</Backdrop>
</div>
);
}
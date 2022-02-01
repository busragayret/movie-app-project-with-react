import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function ActorsThumb({ img, name, character }) {
    return (
        <Card sx={{ height: 428, borderRadius: '16px', borderColor: 'grey', padding: '5%' }}>
            <CardMedia sx={{ borderRadius: '16px' }}
                component="img"
                alt={name}
                image={img}
            />
            <CardContent>
                <Typography sx={{ m: "3%", fontFamily: 'Monospace', fontWeight: 'bold', fontSize: 17 }} gutterBottom variant="p" component="div">
                    <div className="Atahan">
                        {name}
                    </div>
                </Typography>
                <Typography sx={{ fontFamily: 'Monospace', }} variant="body2" color="text.secondary">
                    <div className="Atahan">
                        {character}
                    </div>
                </Typography>
            </CardContent>
        </Card>
    );
}
export default ActorsThumb;
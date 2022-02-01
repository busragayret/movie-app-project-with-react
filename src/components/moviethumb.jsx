import * as React from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DiscoverSection from './discover';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { addFavorites, deleteFavorites } from '../reducers/favorites';
import { addSeenlist, deleteSeenlist } from '../reducers/seenlist';
import { useSelector, useDispatch } from 'react-redux';

const MovieThumb = ({ poster_path, title, release_date, id, genre, }) => {

    const favorites = useSelector((state) => state.favorites);
    const seenlist = useSelector((state) => state.seenlist);
    const dispatch = useDispatch();


    const ITEM_HEIGHT = 48;


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);


    }
    return (
        <Card variant="outlined" sx={{
            width: {
                md: 300
            },
            height: {
                md: 590
            },
            margin: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: '16px',
            borderColor: 'grey',
        }}>

            <CardContent >
                <div className="menu">

                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}>
                        <MoreVertIcon />
                    </IconButton>

                    <Menu
                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '20ch',
                            },
                        }}
                    >
                        <MenuItem>
                            <p className="favIcon">Favorite</p>
                            {
                                favorites.favoriteFilms.some(film => film.id === id) ?
                                    <IconButton aria-label="share" onClick={() => dispatch(deleteFavorites(id))}>
                                        <FavoriteIcon sx={{ color: red[600]}} />
                                    </IconButton>
                                    :
                                    <IconButton aria-label="share" onClick={() => dispatch(addFavorites(id, title, genre, release_date))}>
                                        <FavoriteIcon />
                                    </IconButton>
                            }
                        </MenuItem>

                        <MenuItem>
                            <p className="favIcon">Watched</p>
                            {
                                seenlist.seenFilms.some(film => film.id === id) ?
                                    <IconButton aria-label="share" onClick={() => dispatch(deleteSeenlist(id))}>
                                        <BookmarkIcon sx={{ color: red[600] }} />
                                    </IconButton>
                                    :
                                    <IconButton aria-label="share" onClick={() => dispatch(addSeenlist(id, title, genre, release_date))}>
                                        <BookmarkIcon />
                                    </IconButton>
                            }

                        </MenuItem>



                    </Menu>

                </div>
                <Link to={`/moviedetail/${id}`}>
                    <CardMedia sx={{ borderRadius: '16px' }}
                        component="img"
                        image={poster_path}
                        alt={title}

                    />
                    <Typography sx={{ m: "5%", fontFamily: 'Monospace', fontWeight: 'bold', fontSize: 17 }} color="text.secondary">
                        <div className="Atahan">
                            {title}
                        </div>

                    </Typography>
                    <Typography sx={{ fontFamily: 'Monospace', }} color="text.secondary">
                        {release_date}
                    </Typography>
                </Link>
            </CardContent>
        </Card >

    );

};

export default MovieThumb;





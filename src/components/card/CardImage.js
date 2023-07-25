import * as React from 'react';
import { IconButton, Icon, Card, CardActions, CardMedia } from '@mui/material';
import PropTypes from "prop-types";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Avatar, Stack } from '@mui/material';

const CardImage = (props) => {
    const { isDocument } = props;
    return (
        <Card sx={props.sx}>
            {!isDocument ? <CardMedia
                component="img"
                height={props.height}
                image={props.src}
                alt={props.alt}
            />
                :
                <Stack direction="row" justifyContent="center" mt={1}>
                    <Avatar variant="rounded">
                        <InsertDriveFileIcon />
                    </Avatar>
                </Stack>
            }
            <CardActions sx={props.sxicon}>
                <IconButton onClick={props.deleteSelected}>
                    <Icon color="error" fontSize={props.fontSize}>{props.icon}</Icon>
                </IconButton>
            </CardActions>
        </Card>
    )
}
CardImage.propTypes = {
    sx: PropTypes.string,
    height: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
    sxicon: PropTypes.string,
    deleteSelected: PropTypes.string,
    fontSize: PropTypes.string,
    icon: PropTypes.string,
    isDocument: PropTypes.bool,
};

export default CardImage;

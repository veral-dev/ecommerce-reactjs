import React from 'react'

/* ----STYLE COMPONENTS----*/
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const ProductCard = ({ product, category }) => {

    return (
        <Breadcrumbs style={{ fontSize: '12px' }} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link color="inherit" href="/">
                {category}
            </Link>
            <Typography style={{ fontSize: '12px' }}>{product}</Typography>
        </Breadcrumbs>
    );
}

export default ProductCard
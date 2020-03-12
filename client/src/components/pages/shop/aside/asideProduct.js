import React from 'react'

import './aside.css'
/* ----ROUTES----*/

/* ----STYLE COMPONENTS----*/

/* ----ICONS----*/

const AsideProductMain = () => {

    return (
        <aside className="main-aside aside-color">
            <h4 className="text-center">Por qué somos diferentes</h4>
            <p>Todos nuestros productos de cama están diseñados para mejorar tu comodidad cuidando del planeta. Tenemos en cuenta cada paso a lo largo de la producción para minimizar nuestra huella de carbono desde el principio.</p>
            <p> Nuestras sábanas están hechas en el norte de Portugal, dónde parte de la energía empleada procede de fuentes de energías renovables.</p>
            <p>Nuestros productos cuentan con la certificación Oeko-Tex Standard 100, lo que significa que superan el criterio más alto de prueba contra el uso de productos químicos y sintéticos dañinos.</p>
            <img className="aside-img-oeko" src="/OekoTex-Standard-160x51.png" alt="oekotex logo" />
        </aside>
    );
}

export default AsideProductMain
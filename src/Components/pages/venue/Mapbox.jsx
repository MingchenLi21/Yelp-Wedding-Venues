import { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "../../../style/Mapbox.css"
import 'mapbox-gl/dist/mapbox-gl.css';

const Mapbox = ( { geometry, venueTitle, location } ) => {

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    const mapContainer = useRef( null );
    const map = useRef( null );

    const [ lng ] = useState( geometry.coordinates[ 0 ] );
    const [ lat ] = useState( geometry.coordinates[ 1 ] );
    const [ zoom ] = useState( 7 );

    useEffect( () => {
        if ( map.current ) return; // initialize map only once
        map.current = new mapboxgl.Map( {
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/outdoors-v11',
            center: [ lng, lat ],
            zoom: zoom
        } );

        new mapboxgl.Marker()
            .setLngLat( geometry.coordinates )
            .setPopup(
                new mapboxgl.Popup( { offset: [ 0, -15 ] } )
                    .setHTML(
                        `<h3>${ venueTitle }</h3><p>${ location }</p>`
                    )
            )
            .addTo( map.current );

        map.current.addControl( new mapboxgl.NavigationControl() );

    } );

    return (
        <div>
            <div ref={ mapContainer } className="map-container" />
        </div>
    );
};

export default Mapbox;
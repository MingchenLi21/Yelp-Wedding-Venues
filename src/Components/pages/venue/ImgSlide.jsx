import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import { useState } from "react";

const ImgSlide = ( { images } ) => {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    return (
        <Carousel controls={images.length > 1} indicators={ false } activeIndex={index} onSelect={handleSelect}>
            { images.map( img => <Carousel.Item key={img._id}>
                <Image src={img.url} />
            </Carousel.Item> ) }
        </Carousel>
    );
};

export default ImgSlide;
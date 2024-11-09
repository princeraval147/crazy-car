import SimpleImageSlider from "react-simple-image-slider";

const images = [
    { url: "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?cs=srgb&dl=pexels-mikebirdy-3729464.jpg&fm=jpg" },
    { url: "https://imgd.aeplcdn.com/642x336/n/cw/ec/139651/curvv-exterior-right-front-three-quarter.jpeg?isig=0&q=80" },
    { url: "https://static.toiimg.com/photo/80387978.cms" },
];

const ImageSlider = () => {
    return (
        <div>
            <SimpleImageSlider
                width={500}
                height={400}
                images={images}
                showBullets={true}
                showNavs={true}
            />
        </div>
    );
}

export default ImageSlider
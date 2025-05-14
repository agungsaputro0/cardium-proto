import Banner from "../organisms/Banner";
import TipsSection from "../organisms/TipsSection";
import FeatureSection from "../organisms/FeatureSection";
import TheirStories from "../organisms/TheirStories";

const LandingLayouts = () => {

    const images = [
        '../../../assets/img/banner-1.jpg',
        '../../../assets/img/banner-2.jpg',
        '../../../assets/img/banner-3.jpg',
      ];

    return (
        <div className="pt-[65px] flex flex-col justify-between items-center min-h-screen">
            <div className="w-full">
                <div className="custom-slider-container">
                    <Banner images={images} />
                    <FeatureSection />
                    <TipsSection />
                    <TheirStories />
                </div>
            </div>
        </div>
    );
}

export default LandingLayouts;

import "./about.css";
import Cart from "../Components/cart";
import Footer from "../Components/footer";
import Header from "../Components/header";
import Products from "../Components/products";
import { useTranslation } from "../TranslationContext";

export default function About({
  showProducts,
  toggleCartVisibility,
  toggleProductsVisibility,
  cart,
}) {
  const { translations } = useTranslation();
  return (
    <>
      <Header
        toggleProductsVisibility={toggleProductsVisibility}
        toggleCartVisibility={toggleCartVisibility}
        cart={cart}
      />
      <Products showProducts={showProducts} />
      <section class="aboutcontent">
        <div class="aboutTitle">
          <h1 class="abtit">{translations.abtit}</h1>
        </div>
        <div className="mobvideo">
          <video
            width="100%"
            height="700px"
            autoplay="autoplay"
            muted="muted"
            loop="loop"
            playsInline
            preload="auto"
            loading="lazy">
            <source src="/assets/Final Comp.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="webvideo">
          <video autoplay="autoplay" muted="muted" loop="loop">
            <source src="/assets/Comp 1web.mp4" />
          </video>
        </div>

        <div class="brief">
          <h1 class="chtitle">{translations.chtitle}</h1>
          <p class="chparagraph pt-5">{translations.chparagraph}</p>
        </div>
      </section>
      <section class="visioncontent">
        <div class="brief">
          <h1 class="vision">{translations.vision}</h1>
          <p class="visioncont pt-5">{translations.visioncont}</p>
        </div>
      </section>
      <section class="visioncontent">
        <div class="brief">
          <h1 class="choose">{translations.choose}</h1>
          <p class="choosecont">{translations.choosecont}</p>
        </div>
      </section>
      <Footer />
    </>
  );
}

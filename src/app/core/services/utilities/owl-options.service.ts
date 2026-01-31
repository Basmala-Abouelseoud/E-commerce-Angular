import { OwlOptions } from "ngx-owl-carousel-o";

export function getOwlOptions(options?: OwlOptions) : OwlOptions{
return {
       loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    autoplaySpeed:1450,
    autoplayTimeout:1500,
    slideTransition:'linear',
    responsive: options?.responsive ? options.responsive: {} ,
    items: options?.items ? options?.items : 0,
    nav: false
  }
}
// $(document).ready(function() {
//   $(".carousel__inner").slick({
//     infinite: true,
//     // adaptiveHeight: true,
//     prevArrow:
//       '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
//     nextArrow:
//       '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
//     responsive: [
//       {
//         breakpoint: 992,
//         settings: {
//           dots: true,
//           arrows: false
//         }
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           arrows: false
//         }
//       }
//     ]
//   });
// });
const slider = tns({
  container: ".carousel__inner",
  items: 1,
  slideBy: "page",
  autoplay: false,
  controls: false,
  responsive: {
    640: {
      autoplay: false,
      controls: false
    },
    700: {
      touch: true,
      autoWidth: true
    },
    900: {
      items: 1
    }
  }
});

document
  .querySelector(".next")
  .addEventListener("click", () => slider.goTo("next"));

document
  .querySelector(".prev")
  .addEventListener("click", () => slider.goTo("prev"));

$(document).ready(function() {
  $("ul.catalog__tabs").on("click", "li:not(.catalog__tab_active)", function() {
    $(this)
      .addClass("catalog__tab_active")
      .siblings()
      .removeClass("catalog__tab_active")
      .closest("div.container")
      .find("div.catalog__content")
      .removeClass("catalog__content_active")
      .eq($(this).index())
      .addClass("catalog__content_active");
  });

  function toggleSlide(item) {
    $(item).each(function(i) {
      $(this).on("click", function(e) {
        e.preventDefault();
        $(".catalog-item__content")
          .eq(i)
          .toggleClass("catalog-item__content_active");
        $(".catalog-item__list")
          .eq(i)
          .toggleClass("catalog-item__list_active");
      });
    });
  }
  toggleSlide(".catalog-item__link");
  toggleSlide(".catalog-item__back");

  //MODAL BUTTON
  $("[data-modal=consultation]").on("click", function() {
    $(".overlay, #consultation").fadeIn("slow");
  });
  $(".modal__close").on("click", function() {
    $(".overlay, #consultation,#thanks,#order").fadeOut("slow");
  });

  $(".button_mini").each(function(i) {
    $(this).on("click", function() {
      $("#order .modal__descr").text(
        $(".catalog-item__subtitle")
          .eq(i)
          .text()
      );
      $(".overlay, #order").fadeIn("slow");
    });
  });
  //validate form
  function validateForms(form) {
    $(form).validate({
      rules: {
        // simple rule, converted to {required:true}
        name: "required",
        phone: "required",
        email: {
          require: true,
          email: true
        }
      },
      messages: {
        name: "Please specify your name",
        phone: "Please enter your phone number",
        email: {
          required: "We need your email address to contact you",
          email: "Your email address must be in the format of name@domain.com"
        }
      }
    });
  }
  validateForms("#consultation-form");
  validateForms("#consultation form");
  validateForms("#order form");

  $("input[name=phone]").mask("+7 (999) 999-99-99");
});

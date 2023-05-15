const testimonialsContainer = document.querySelector(".testimonials");
const testimonials = document.querySelectorAll(".testimonial-box");
const btnPrevTestimonials = document.querySelector(".testimonials .btn-left");
const btnNextTestimonials = document.querySelector(".testimonials .btn-right");
const testimonialDots = document.querySelector(".dots");
let slideIndex = 0;

const formFields = new Array(
  ...document.querySelectorAll(".contact-us form input"),
  document.querySelector(".contact-us form textarea")
);
const errorMessages = document.querySelectorAll(
  ".contact-us form .error-message"
);
const btnSubmit = document.getElementById("submit-contact-us");
const formData = {
  name: "",
  email: "",
  message: "",
};

// Testiminials slider
// Create slider dots
testimonials.forEach((t) => {
  const dot = document.createElement("button");
  dot.classList.add("dot");
  testimonialDots.append(dot);
});
addActiveDot(slideIndex);
testimonials[slideIndex].style.opacity = "1";

btnNextTestimonials.addEventListener("click", moveNext);
btnPrevTestimonials.addEventListener("click", movePrev);

function addActiveDot(i) {
  document
    .querySelectorAll(".dots .dot")
    .forEach((dot) => dot.classList.remove("dot--active"));
  document.querySelectorAll(".dots .dot")[i].classList.add("dot--active");
}

function moveTo(index) {
  addActiveDot(index);
  testimonials.forEach((testimonial) => {
    testimonial.style.transform = `translateX(${-100 * index}%)`;
    testimonial.style.opacity = 0;
  });
  testimonials[index].style.opacity = "1";

  if (index === 0) {
    btnPrevTestimonials.disabled = true;
  } else {
    btnPrevTestimonials.disabled = false;
  }

  if (index >= testimonials.length - 1) {
    btnNextTestimonials.disabled = true;
  } else {
    btnNextTestimonials.disabled = false;
  }
}

function moveNext() {
  if (slideIndex < testimonials.length - 1) {
    slideIndex++;
    moveTo(slideIndex);
  }
}
function movePrev() {
  if (slideIndex > 0) {
    slideIndex--;
    moveTo(slideIndex);
  }
}

document.querySelectorAll(".dots .dot").forEach((dot, index) =>
  dot.addEventListener("click", () => {
    slideIndex = index;
    moveTo(slideIndex);
  })
);

// Validating form
validateSubmition();

function checkInput(input, index) {
  const fieldName = input.id;
  const value = input.value;
  const email = input.type === "email";
  const minLength = Number(input.dataset.minlength);
  const maxLength = Number(input.dataset.maxlength);

  if (value) {
    errorMessages[index].textContent = "";
    if (email) {
      if (!validateEmail(value)) {
        errorMessages[index].textContent = "Email isn't valid";
        formData[fieldName] = "";
      } else {
        formData[fieldName] = value;
      }
    } else if (value.length < minLength) {
      errorMessages[index].textContent = `${fieldName} must be ${minLength}`;
      formData[fieldName] = "";
    } else if (value.length > maxLength) {
      errorMessages[index].textContent = `${fieldName} must be ${maxLength}`;
      formData[fieldName] = "";
    } else {
      formData[fieldName] = value;
    }
  } else {
    formData[fieldName] = "";
    errorMessages[index].textContent = "This field is required";
  }
}

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/
    );
}

formFields.forEach((field, i) => {
  field.addEventListener("keyup", () => {
    checkInput(field, i);
    validateSubmition();
  });
});

function validateSubmition() {
  for (let [k, v] of Object.entries(formData)) {
    if (!v) {
      btnSubmit.disabled = true;
      break;
    } else {
      btnSubmit.disabled = false;
    }
  }
}

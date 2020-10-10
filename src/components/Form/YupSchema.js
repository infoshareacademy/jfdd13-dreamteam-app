import * as Yup from "yup";

export const accountFormSchema = Yup.object().shape({
  title: Yup.string()
    .max(40, 'Tytuł za długi, skróć do 40 znaków.')
    .required("Pole wymagane.")
    .matches(new RegExp(/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s]+$/), "Używaj wyłącznie liter i spacji."),
  date: Yup.string()
    .required("Pole wymagane."),
  price: Yup.number()
    .moreThan(20, "Minimalna cena za dobę to 20 zł.")
    .lessThan(2001, "Maksymalna cena za dobę to 2000 zł.")
    .positive("Cena musi być liczbą dodatnią")
    .required("Pole wymagane."),
  city: Yup.string()
    .matches(new RegExp(/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s]+$/), "Używaj wyłącznie liter i spacji.")
    .required("Pole wymagane."),
  continent: Yup.string()
    .required("Pole wymagane."),
  description: Yup.string()
    .max(400, "Opis za długi, skróć tekst do 400 znaków."),
  email: Yup.string()
    .required("Pole wymagane.")
    .matches(new RegExp(/^\S+@\S+\.\S+$/), 'Nieprawidłowy format e-maila.'),
  terms: Yup.boolean()
    .oneOf([true], 'Zaznacz pole powyżej.'),
  tripImageUrl: Yup.string()
    .required("Zdjęcie wycieczki jest wymagane")
});
let moment = require("moment");
moment.locale("es");
const getFechas = (time) => {
  let timenow = "";
  let timeaux = "";
  let formatter = "";
  if (time == "30 min") {
    timenow = moment().format("YYYY-MM-DD HH:mm:ss");
    timeaux = moment().subtract(30, "minutes").format("YYYY-MM-DD HH:mm:ss");
  }
  if (time == "Ultima hora") {
    timenow = moment().format("YYYY-MM-DD HH:mm:ss");
    timeaux = moment().subtract(1, "h").format("YYYY-MM-DD HH:mm:ss");
  }
  if (time == "Dia") {
    timenow = moment().format("YYYY-MM-DD HH:mm:ss");
    timeaux = moment().subtract(1, "d").format("YYYY-MM-DD HH:mm:ss");
  }
  if (time == "Semana") {
    timenow = moment().format("YYYY-MM-DD HH:mm:ss");
    timeaux = moment().subtract(1, "w").format("YYYY-MM-DD HH:mm:ss");
  }
  if (time == "Mes") {
    timenow = moment().format("YYYY-MM-DD HH:mm:ss");
    timeaux = moment().subtract(1, "months").format("YYYY-MM-DD HH:mm:ss");
  }
  if (time == "Año") {
    timenow = moment().format("YYYY-MM-DD HH:mm:ss");
    timeaux = moment().subtract(1, "y").format("YYYY-MM-DD HH:mm:ss");
  }

  switch (time) {
    case "Dia":
      formatter = "dd HH";
      break;
    case "Semana":
      formatter = "dddd";
      break;
    case "Mes":
      formatter = "MMMM-Do";
      break;
    case "Año":
      formatter = "MMMM";
      break;

    default:
      formatter = "HH:mm";
      break;
  }

  return { timenow, timeaux, formatter };
};

const getFechasIter = ({ time }) => {
  let formatter = "";
  let legend = "";
  let timeres = "";
  let iter = 0;

  switch (time) {
    case "Ultima hora":
      formatter = "HH:mm";
      legend = "minutes";
      timeres = 1;
      iter = 60;

      break;
    case "Dia":
      formatter = "dd HH";
      legend = "minutes";
      timeres = 15;
      iter = 96;
      break;
    case "Semana":
      formatter = "dddd";
      legend = "d";
      timeres = 1;
      iter = 7;

      break;
    case "Mes":
      formatter = "MMMM-Do";
      legend = "d";
      timeres = 1;
      iter = 30;

      break;

    case "Año":
      formatter = "MMMM";
      legend = "d";
      timeres = 15;
      iter = 24;

      break;

    default:
      formatter = "HH:mm";
      legend = "minutes";
      timeres = 1;
      iter = 30;
      break;
  }

  let feInit = moment().format("YYYY-MM-DD HH:mm");
  let ArrFechas = [];
  for (let i = 0; i < iter; i++) {
    ArrFechas = [...ArrFechas, feInit];
    feInit = moment(feInit)
      .subtract(timeres, legend)
      .format("YYYY-MM-DD HH:mm");
  }
  return { ArrFechas, formatter };
};
module.exports = { getFechas, getFechasIter };

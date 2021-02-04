let component_sensors = {
  YTR061: "temperature",
  YTR062: "temperature",
  YTR063: "temperature",
  YTR064: "temperature",
  YPR064: "pressure",
  YPR066: "pressure",
  YQR060: "flow",
};

let component_parameters = {
  temperature: {
    label: "Température",
    unit: "°K",
  },
  pressure: {
    label: "Pression",
    unit: "Bar",
  },
  flow: {
    label: "Débit",
    unit: "L/s",
  },
};

function getSensorParameter(sensor) {
  let key, label, unit;

  try {
    key = component_sensors[sensor.replace(/\s/g, "")];
  } catch (error) {
    key = sensor.replace(/\s/g, "");
  }

  try {
    label =
      component_parameters[component_sensors[sensor.replace(/\s/g, "")]].label;
  } catch (error) {
    label = sensor.replace(/\s/g, "");
  }

  try {
    unit =
      component_parameters[component_sensors[sensor.replace(/\s/g, "")]].unit;
  } catch (error) {
    unit = "-";
  }

  let parameters = {
    sensor,
    key,
    label,
    unit,
  };

  return parameters;
}

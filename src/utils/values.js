export const companies = [
  {
    name: 'Cabify',
    key: 'cabify',
  },
  {
    name: 'Uber',
    key: 'uber',
  },
  {
    name: 'Glovo',
    key: 'glovo',
  },
  {
    name: 'Rappi',
    key: 'rappi',
  },
];

export const alertTypes = [
  {
    name: 'Accidente',
    key: 'accident',
  },
  {
    name: 'Choque',
    key: 'crash',
  },
  {
    name: 'Problema con un local',
    key: 'store',
  },
  {
    name: 'Problema de tránsito',
    key: 'traffic',
  },
  {
    name: 'Me robaron mientras trabajaba',
    key: 'theft',
  },
  {
    name: 'Problema con un cliente',
    key: 'mistreatment',
  },
  {
    name: 'Otros',
    key: 'other',
  },
];

export const problemTypes = [
  {
    name: 'Tuve un accidente',
    key: 'accident',
  },
  {
    name: 'Me bloquearon',
    key: 'block',
  },
  {
    name: 'Me multaron',
    key: 'fine',
  },
  {
    name: 'Me suspendieron',
    key: 'suspension',
  },
  {
    name: 'La tasa de aceptación cayó sin motivos',
    key: 'rate_drop',
  },
  {
    name: 'Me robaron mientras trabajaba',
    key: 'theft',
  },
  {
    name: 'Sufrí acoso laboral',
    key: 'mobbing',
  },
  {
    name: 'Sufrí acoso sexual',
    key: 'sexual_harassment',
  },
  {
    name: 'Sufrí maltrato/s',
    key: 'mistreatment',
  },
  {
    name: 'Otros',
    key: 'other',
  },
];

export const seniorities = [
  {
    name: 'Menos de 3 meses',
    key: 'less_than_3',
  },
  {
    name: 'Más de 3 meses',
    key: 'more_than_3',
  },
  {
    name: 'Más de un año',
    key: 'year',
  }
];

export const provinces = [
  {
    name: 'Buenos Aires',
    key: 'Buenos_Aires',
  },
  {
    name: 'Ciudad de Buenos Aires',
    key: 'Ciudad_de_Buenos_Aires',
  },
  {
    name: 'Catamarca',
    key: 'Catamarca',
  },
  {
    name: 'Chaco',
    key: 'Chaco',
  },
  {
    name: 'Chubut',
    key: 'Chubut',
  },
  {
    name: 'Córdoba',
    key: 'Córdoba',
  },
  {
    name: 'Corrientes',
    key: 'Corrientes',
  },
  {
    name: 'Entre Ríos',
    key: 'Entre_Ríos',
  },
  {
    name: 'Formosa',
    key: 'Formosa',
  },
  {
    name: 'Jujuy',
    key: 'Jujuy',
  },
  {
    name: 'La Pampa',
    key: 'La_Pampa',
  },
  {
    name: 'La Rioja',
    key: 'La_Rioja',
  },
  {
    name: 'Mendoza',
    key: 'Mendoza',
  },
  {
    name: 'Misiones',
    key: 'Misiones',
  },
  {
    name: 'Neuquén',
    key: 'Neuquén',
  },
  {
    name: 'Río Negro',
    key: 'Río_Negro',
  },
  {
    name: 'Salta',
    key: 'Salta',
  },
  {
    name: 'San Juan',
    key: 'San_Juan',
  },
  {
    name: 'San Luis',
    key: 'San_Luis',
  },
  {
    name: 'Santa Cruz',
    key: 'Santa_Cruz',
  },
  {
    name: 'Santa Fe',
    key: 'Santa_Fe',
  },
  {
    name: 'Santiago del Estero',
    key: 'Santiago_del_Estero',
  },
  {
    name: 'Tierra del Fuego',
    key: 'Tierra_del_Fuego',
  },
  {
    name: 'Tucumán',
    key: 'Tucumán',
  },
];


const getName = (list, key) => {
  const item = list.find((item) => {
    if (item.key == key) {
      return item.name;
    }
  });

  if (item) {
    return item.name;
  }
}

export const getKeys = (list) => {
  return list.map(e => e.key)
}

export const getCompanyLabel = (key) => {
  return getName(companies, key);
}

export const getProblemLabel = (key) => {
  return getName(problemTypes, key);
}

export const getAlertLabel = (key) => {
  return getName(alertTypes, key);
}

export const getSeniorityLabel = (key) => {
  return getName(seniorities, key);
}

export const getProvinceLabel = (key) => {
  return getName(provinces, key);
}

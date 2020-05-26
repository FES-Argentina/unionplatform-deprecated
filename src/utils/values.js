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

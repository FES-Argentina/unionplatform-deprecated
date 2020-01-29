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
    name: 'Otros',
    key: 'other',
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

export const getCompanyLabel = (key) => {
  return getName(companies, key);
}

export const getProblemLabel = (key) => {
  return getName(problemTypes, key);
}

export const getAlertLabel = (key) => {
  return getName(alertTypes, key);
}

type GeoblockingAreaSource = {
   id: string;
   fullLabel: string;
   shortLabel: string;
};
const GEOBLOCKING_AREAS_SOURCE = [
   {
      id: 'ALL',
      fullLabel: 'Worldwide',
      shortLabel: 'World',
   },
   {
      id: 'EUR_PLUS',
      fullLabel: 'Europe Plus',
      shortLabel: 'Euro+',
   },
   {
      id: 'SAT',
      fullLabel: 'Europe Sat',
      shortLabel: 'EuroSat',
   },
   {
      id: 'EUR_UK',
      fullLabel: 'Europe UK',
      shortLabel: 'EuroUK',
   },
   {
      id: 'EUR_DE_FR',
      fullLabel: 'German and French speaking countries',
      shortLabel: 'DE/FR+',
   },
   {
      id: 'DE_FR',
      fullLabel: 'Germany & France',
      shortLabel: 'DE/FR',
   },
] as const satisfies readonly GeoblockingAreaSource[];

export const GEOBLOCKING_AREA_IDS: GeoblockingAreaId[] = GEOBLOCKING_AREAS_SOURCE.map(({ id }) => id);

export const GEOBLOCKING_AREAS: readonly GeoblockingArea[] = GEOBLOCKING_AREAS_SOURCE as readonly GeoblockingArea[];

export const getGeoblockingAreaById = (id: string | null): GeoblockingArea | null => {
   if (!id) {
      return null;
   }
   const area = GEOBLOCKING_AREAS.find((area) => area.id === id);
   return area || null;
};

export type GeoblockingArea = Omit<GeoblockingAreaSource, 'id'> & {
   id: GeoblockingAreaId;
};

export type GeoblockingAreaId = (typeof GEOBLOCKING_AREAS_SOURCE)[number]['id'];

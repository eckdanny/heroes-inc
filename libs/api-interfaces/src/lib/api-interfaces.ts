export interface Message {
  message: string;
}

export interface ISkill {
  id: string;
  name: string;
  description: string;
}

export interface IVIP {
  id: string;
  name: string;
}

export interface IHero {
  id: string;
  name: string;
  skills: ISkill[];
  // vips: IVIP[];
}

export interface IIncident {
  id: string;
  name: string;
  description: string;
}

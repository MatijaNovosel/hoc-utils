export type Op = "==" | "!=" | ">=" | "<=" | ">" | "<";

export type Condition =
  | { type: "stat"; stat: number; op: Op; value: number }
  | { type: "flag"; key: string; op: Op; value: boolean | number | string };

export type Trigger =
  | { type: "giveItem"; value: number }
  | { type: "setFlag"; key: string; value: boolean | number | string };

export interface Choice {
  id: string;
  text: string;
  nextStepId: string | null;
  onFailStepId?: string | null;
  conditions?: Condition[];
  triggers?: Trigger[];
}

export interface Step {
  id: string;
  nextStepId: string | null;
  text: string;
  choices: Choice[];
}

export interface StartPoint {
  conditions: Condition[];
  startStepId: string;
}

export interface Dialogue {
  id: string;
  npcId: number;
  startStepId: string;
  startPoint?: StartPoint[];
  steps: Step[];
}

export interface DialogueFile {
  dialogues: Dialogue[];
}

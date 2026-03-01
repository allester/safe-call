/**
 * Scenario definitions for ElevenLabs agent dynamic variables.
 * They must be Record<string, string | number | boolean>.
 * Arrays like hidden_fields are converted to comma-separated strings.
 */

export type ScenarioInput = {
  scenario_type: string;
  scenario_description: string;
  caller_name: string;
  caller_age: number;
  emotional_state: string;
  location: string;
  suspect_present: boolean;
  weapon_present: boolean;
  children_present: boolean;
  injuries: string;
  hidden_fields?: string[];
  [key: string]: string | number | boolean | string[] | undefined;
};

function toDynamicVariables(obj: ScenarioInput): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined) continue;
    if (Array.isArray(v)) {
      out[k] = v.join(',');
    } else if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
      out[k] = v;
    }
  }
  return out;
}

export const fireScenario: ScenarioInput = {
  scenario_type: 'fire_emergency',
  scenario_description:
    "The caller's apartment caught fire due to a kitchen grease fire. Smoke is filling the hallway, and the building alarm is sounding. The caller is trapped inside but has access to a balcony.",
  caller_name: 'Harry Parker',
  caller_age: 29,
  emotional_state: 'panicked',
  location: 'Apartment 12B, Oakridge Towers',
  suspect_present: false,
  weapon_present: false,
  children_present: false,
  injuries: 'smoke inhalation, coughing',
  hidden_fields: ['exact_location_in_apartment', 'severity_of_fire', 'neighbor_status'],
};

export const SCENARIOS: Record<string, Record<string, string | number | boolean>> = {
  fire: toDynamicVariables(fireScenario),
  // Add more scenarios:
  // medical: toDynamicVariables(medicalScenario),
  // robbery: toDynamicVariables(robberyScenario),
};

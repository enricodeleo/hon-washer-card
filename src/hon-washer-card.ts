import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import iconDrying from "../assets/states/drying.svg";
import iconError from "../assets/states/error.svg";
import iconFinished from "../assets/states/finished.svg";
import iconHeating from "../assets/states/heating.svg";
import iconOff from "../assets/states/off.svg";
import iconPaused from "../assets/states/paused.svg";
import iconReady from "../assets/states/ready.svg";
import iconRinse from "../assets/states/rinse.svg";
import iconScheduled from "../assets/states/scheduled.svg";
import iconSpin from "../assets/states/spin.svg";
import iconWashing from "../assets/states/washing.svg";
import iconWeighing from "../assets/states/weighing.svg";

declare const __VERSION__: string;

// The few Home Assistant frontend types this card uses.
interface HassEntityState {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
}

interface HassEntityRegistryEntry {
  entity_id: string;
  device_id?: string;
  platform: string;
  translation_key?: string;
}

interface Hass {
  states: Record<string, HassEntityState>;
  entities: Record<string, HassEntityRegistryEntry>;
  locale: { language: string };
  formatEntityState?(stateObj: HassEntityState): string;
}

type Role =
  | "phase"
  | "program"
  | "error"
  | "remaining"
  | "start_time"
  | "end_time"
  | "temperature"
  | "spin_speed"
  | "rinses"
  | "weight"
  | "energy"
  | "water"
  | "door"
  | "door_lock"
  | "child_lock"
  | "detergent"
  | "energy_saving"
  | "night_wash"
  | "steam"
  | "cycle"
  | "mean_water";

interface CardConfig extends Partial<Record<Role, string>> {
  type: string;
  entity: string;
  name?: string;
}

// The hOn integration (gvigroux/hon) puts these entities on the washing machine's device,
// mostly without translation keys, so they are found there by the end of the entity id.
const DISCOVERY: Record<Role, { domain: string; match: RegExp }> = {
  phase: { domain: "sensor", match: /_program_phase$/ },
  program: { domain: "sensor", match: /_program_name$/ },
  error: { domain: "sensor", match: /_error$/ },
  remaining: { domain: "sensor", match: /_remaining_time$/ },
  start_time: { domain: "sensor", match: /_start_time$/ },
  end_time: { domain: "sensor", match: /_end_time$/ },
  temperature: { domain: "sensor", match: /_temperature$/ },
  spin_speed: { domain: "sensor", match: /_spin_speed$/ },
  rinses: { domain: "sensor", match: /_remaining_rinse_iterations$/ },
  weight: { domain: "sensor", match: /_estimated_weight$/ },
  energy: { domain: "sensor", match: /_current_electricity_used$/ },
  water: { domain: "sensor", match: /_current_water_used$/ },
  door: { domain: "binary_sensor", match: /_door_status$/ },
  door_lock: { domain: "binary_sensor", match: /_door_lock$/ },
  child_lock: { domain: "binary_sensor", match: /_child_lock$/ },
  detergent: { domain: "sensor", match: /_detergent_level$/ },
  energy_saving: { domain: "binary_sensor", match: /_energy_saving$/ },
  night_wash: { domain: "binary_sensor", match: /_night_wash$/ },
  steam: { domain: "binary_sensor", match: /_steam$/ },
  cycle: { domain: "sensor", match: /_current_wash_cycle$/ },
  mean_water: { domain: "sensor", match: /_mean_water_consumption$/ },
};

const LABELS: Record<string, string> = {
  entity: "Washing machine mode sensor (hOn)",
  name: "Name",
  phase: "Program phase",
  program: "Program name",
  error: "Error",
  remaining: "Remaining time",
  start_time: "Start time",
  end_time: "End time",
  temperature: "Temperature",
  spin_speed: "Spin speed",
  rinses: "Remaining rinses",
  weight: "Estimated weight",
  energy: "Electricity used this cycle",
  water: "Water used this cycle",
  door: "Door",
  door_lock: "Door lock",
  child_lock: "Child lock",
  detergent: "Detergent level",
  energy_saving: "Energy saving",
  night_wash: "Night wash",
  steam: "Steam",
  cycle: "Current wash cycle",
  mean_water: "Mean water consumption",
};

// hOn's mode values (sensor state), as the integration's wash_mode translations name them.
type Mode = "disconnected" | "ready" | "running" | "paused" | "scheduled" | "error" | "finished" | "ending";
const MODES: Record<string, Mode> = {
  "0": "disconnected",
  "1": "ready",
  "2": "running",
  "3": "paused",
  "4": "scheduled",
  "5": "scheduled",
  "6": "error",
  "7": "finished",
  "8": "running", // "test"
  "9": "ending",
};

type Phase =
  | "ready"
  | "weighing"
  | "heating"
  | "washing"
  | "tumbling"
  | "refresh"
  | "rinse"
  | "spin"
  | "drying"
  | "steam"
  | "scheduled";
const PHASES: Record<string, Phase> = {
  "0": "ready",
  "1": "washing",
  "2": "washing",
  "3": "spin",
  "4": "rinse",
  "5": "rinse",
  "6": "rinse",
  "7": "drying",
  "8": "drying",
  "9": "steam",
  "10": "ready",
  "11": "spin",
  "12": "weighing",
  "13": "weighing",
  "14": "washing",
  "15": "washing",
  "16": "washing",
  "17": "rinse",
  "18": "rinse",
  "19": "scheduled",
  "20": "tumbling",
  "24": "refresh",
  "25": "washing",
  "26": "heating",
  "27": "washing",
};

// Which of the three steps (Wash, Rinse, Spin) a phase belongs to. Phase 3 is the short
// spin between rinses, so it stays in Rinse; phase 11 is the final spin, and phase 10
// ("Ready") comes right after it while the mode still says Running.
function stepOf(code: string, phase: Phase | undefined): number {
  if (code === "3") return 1;
  if (code === "11" || code === "10") return 2;
  if (phase === "rinse") return 1;
  if (phase === "spin" || phase === "drying") return 2;
  return 0;
}

// hOn error codes, as the integration's washingmachine_error translations name them.
const ERRORS: Record<string, "E2" | "E4" | "Unb"> = {
  "100000000000": "E2",
  "8000000000000": "E4",
  "400000000000000": "Unb",
};
const NO_ERROR = new Set(["00", "0", "", "None", "unknown", "unavailable"]);
const NO_VALUE = new Set(["", "None", "unknown", "unavailable"]);

type Icon =
  | "off"
  | "ready"
  | "weighing"
  | "heating"
  | "washing"
  | "rinse"
  | "spin"
  | "drying"
  | "paused"
  | "scheduled"
  | "error"
  | "finished";
const ICONS: Record<Icon, string> = {
  off: iconOff,
  ready: iconReady,
  weighing: iconWeighing,
  heating: iconHeating,
  washing: iconWashing,
  rinse: iconRinse,
  spin: iconSpin,
  drying: iconDrying,
  paused: iconPaused,
  scheduled: iconScheduled,
  error: iconError,
  finished: iconFinished,
};
const PHASE_ICON: Partial<Record<Phase, Icon>> = {
  weighing: "weighing",
  heating: "heating",
  rinse: "rinse",
  spin: "spin",
  drying: "drying",
  steam: "drying",
  scheduled: "scheduled",
};

type Tone = "grey" | "blue" | "amber" | "purple" | "orange" | "green";
const MODE_TONE: Record<Mode, Tone> = {
  disconnected: "grey",
  ready: "grey",
  running: "blue",
  paused: "amber",
  scheduled: "purple",
  error: "orange",
  finished: "green",
  ending: "blue",
};

const duration = (m: number) =>
  m >= 60 ? `${Math.floor(m / 60)} h${m % 60 ? ` ${m % 60} min` : ""}` : `${m} min`;

const TEXT = {
  en: {
    title: "Washing machine",
    modes: {
      disconnected: "Disconnected",
      ready: "Ready",
      running: "Running",
      paused: "Paused",
      scheduled: "Scheduled",
      error: "Error",
      finished: "Finished",
      ending: "Ending",
    } as Record<Mode, string>,
    phases: {
      ready: "Ready",
      weighing: "Weighing",
      heating: "Heating",
      washing: "Washing",
      tumbling: "Tumbling",
      refresh: "Refresh",
      rinse: "Rinse",
      spin: "Spin",
      drying: "Drying",
      steam: "Steam",
      scheduled: "Scheduled",
    } as Record<Phase, string>,
    errorLabel: (c: string) => `Error ${c}`,
    errors: {
      E2: "Check if the door is closed",
      E4: "Check the water supply",
      Unb: "The machine might be overloaded",
    },
    offline: "Machine powered off or offline",
    noProgram: "No program running",
    noProgramRow: "No program",
    program: "Program",
    phase: "Phase",
    remaining: "Remaining",
    endsAt: "Ends at",
    startsAt: "Starts at",
    finishedRow: "Finished",
    door: "Door",
    open: "Open",
    closed: "Closed",
    duration,
    ago: (d: string) => `${d} ago`,
    steps: ["Wash", "Rinse", "Spin"],
    rinsesLeft: (n: number) => `Rinse · ${n} left`,
    energy: "Energy",
    water: "Water",
    load: "Load",
    energySaving: "Energy saving",
    nightWash: "Night wash",
    steam: "Steam",
    doorLocked: "Door locked",
    doorUnlocked: "Door unlocked",
    detergent: (p: number) => `Detergent ${p}%`,
    detergentEmpty: "Detergent empty",
    childLock: "Child lock on",
    footer: (cycle: string, water: string) =>
      [cycle && `Cycle ${cycle}`, water && `${water} L average per cycle`].filter(Boolean).join(" · "),
    missing: "Entity not found",
  },
  it: {
    title: "Lavatrice",
    modes: {
      disconnected: "Disconnessa",
      ready: "Pronta",
      running: "In funzione",
      paused: "In pausa",
      scheduled: "Programmata",
      error: "Errore",
      finished: "Finita",
      ending: "In chiusura",
    } as Record<Mode, string>,
    phases: {
      ready: "Pronta",
      weighing: "Pesatura",
      heating: "Riscaldamento",
      washing: "Lavaggio",
      tumbling: "Rotazione",
      refresh: "Rinfresco",
      rinse: "Risciacquo",
      spin: "Centrifuga",
      drying: "Asciugatura",
      steam: "Vapore",
      scheduled: "Programmata",
    } as Record<Phase, string>,
    errorLabel: (c: string) => `Errore ${c}`,
    errors: {
      E2: "Controlla che l'oblò sia chiuso",
      E4: "Controlla l'alimentazione dell'acqua",
      Unb: "La lavatrice potrebbe essere sovraccarica",
    },
    offline: "Lavatrice spenta o non raggiungibile",
    noProgram: "Nessun programma in corso",
    noProgramRow: "Nessuno",
    program: "Programma",
    phase: "Fase",
    remaining: "Mancano",
    endsAt: "Fine alle",
    startsAt: "Parte alle",
    finishedRow: "Finita",
    door: "Oblò",
    open: "Aperto",
    closed: "Chiuso",
    duration,
    ago: (d: string) => `${d} fa`,
    steps: ["Lavaggio", "Risciacquo", "Centrifuga"],
    rinsesLeft: (n: number) => `Risciacquo · ${n}`,
    energy: "Energia",
    water: "Acqua",
    load: "Carico",
    energySaving: "Risparmio energetico",
    nightWash: "Lavaggio notturno",
    steam: "Vapore",
    doorLocked: "Oblò bloccato",
    doorUnlocked: "Oblò sbloccato",
    detergent: (p: number) => `Detersivo ${p}%`,
    detergentEmpty: "Detersivo finito",
    childLock: "Blocco bambini attivo",
    footer: (cycle: string, water: string) =>
      [cycle && `Ciclo ${cycle}`, water && `${water} L in media per ciclo`].filter(Boolean).join(" · "),
    missing: "Entità non trovata",
  },
};

interface Pill {
  text: string;
  entity?: HassEntityState;
  icon: string;
  kind: "neutral" | "ok" | "bad";
}

export class HonWasherCard extends LitElement {
  @property({ attribute: false }) hass?: Hass;
  @state() private config?: CardConfig;
  // Bumped every minute so "2 min ago" and "ends at" stay current between state changes.
  @state() private tick = 0;
  private clock?: number;
  private readonly reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  private readonly onMotionChange = () => this.requestUpdate();

  static getConfigForm() {
    const optional = (name: string, domain: string) => ({
      name,
      selector: { entity: { filter: { domain } } },
    });
    return {
      schema: [
        {
          name: "entity",
          required: true,
          selector: { entity: { filter: { domain: "sensor", integration: "hon" } } },
        },
        { name: "name", selector: { text: {} } },
        {
          type: "expandable",
          name: "",
          title: "Entities (found automatically on the washing machine's device)",
          schema: (Object.keys(DISCOVERY) as Role[]).map((r) => optional(r, DISCOVERY[r].domain)),
        },
      ],
      computeLabel: (field: { name: string }) => LABELS[field.name],
    };
  }

  static getStubConfig(hass: Hass): Partial<CardConfig> {
    const source = Object.values(hass.entities).find(
      (e) => e.platform === "hon" && e.translation_key === "wash_mode",
    );
    return { entity: source?.entity_id ?? "sensor.washing_machine_mode" };
  }

  setConfig(config: CardConfig): void {
    if (!config.entity) {
      throw new Error("entity is required: the hOn washing machine mode sensor");
    }
    this.config = config;
  }

  getCardSize(): number {
    return 7;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.clock = window.setInterval(() => this.tick++, 60000);
    this.reducedMotion.addEventListener("change", this.onMotionChange);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearInterval(this.clock);
    this.reducedMotion.removeEventListener("change", this.onMotionChange);
  }

  private get t() {
    const lang = this.hass?.locale.language.split("-")[0] ?? "en";
    return lang === "it" ? TEXT.it : TEXT.en;
  }

  // Configured entities first, then the hOn entities on the same device.
  private entities(): Partial<Record<Role, HassEntityState>> {
    const hass = this.hass!;
    const config = this.config!;
    const deviceId = hass.entities[config.entity]?.device_id;
    const onDevice = deviceId
      ? Object.values(hass.entities).filter((e) => e.device_id === deviceId && e.platform === "hon")
      : [];
    const out: Partial<Record<Role, HassEntityState>> = {};
    for (const role of Object.keys(DISCOVERY) as Role[]) {
      const { domain, match } = DISCOVERY[role];
      const id =
        config[role] ??
        onDevice.find((e) => e.entity_id.startsWith(`${domain}.`) && match.test(e.entity_id))?.entity_id;
      if (id && hass.states[id]) out[role] = hass.states[id];
    }
    return out;
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (!changed.has("hass") || changed.size > 1) return true;
    const before = changed.get("hass") as Hass | undefined;
    if (!before || !this.hass || !this.config) return true;
    if (before.locale !== this.hass.locale || before.entities !== this.hass.entities) return true;
    const config = this.config;
    const ids = [
      config.entity,
      ...(Object.keys(DISCOVERY) as Role[]).map((r) => config[r]),
      ...Object.values(this.entities()).map((s) => s.entity_id),
    ].filter((id): id is string => Boolean(id));
    return ids.some((id) => before.states[id] !== this.hass!.states[id]);
  }

  // The icons animate with SMIL; hold them still when the user asks for reduced motion.
  protected updated(): void {
    const svg = this.renderRoot.querySelector<SVGSVGElement>(".art svg");
    if (!svg) return;
    if (this.reducedMotion.matches) {
      svg.pauseAnimations();
      svg.setCurrentTime(0);
    } else {
      svg.unpauseAnimations();
    }
  }

  private time(date: Date): string {
    return date.toLocaleTimeString(this.hass?.locale.language, { hour: "2-digit", minute: "2-digit" });
  }

  private since(iso: string): string {
    const minutes = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
    if (minutes < 48 * 60) return this.t.duration(minutes);
    return `${Math.round(minutes / 1440)} d`;
  }

  private moreInfo(ev: Event, entityId: string): void {
    ev.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("hass-more-info", { detail: { entityId }, bubbles: true, composed: true }),
    );
  }

  private pill(p: Pill): TemplateResult {
    const icon = p.entity
      ? html`<ha-state-icon .hass=${this.hass} .stateObj=${p.entity}></ha-state-icon>`
      : html`<ha-icon icon=${p.icon}></ha-icon>`;
    return html`<span
      class="pill ${p.kind} ${p.entity ? "link" : ""}"
      @click=${p.entity ? (e: Event) => this.moreInfo(e, p.entity!.entity_id) : undefined}
      >${icon}${p.text}</span
    >`;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this.config) return nothing;
    void this.tick;
    const t = this.t;
    const config = this.config;
    const source = this.hass.states[config.entity];
    if (!source) {
      return html`<ha-card><div class="missing">${t.missing}: ${config.entity}</div></ha-card>`;
    }
    const ents = this.entities();
    const value = (role: Role) => {
      const s = ents[role]?.state;
      return s === undefined || NO_VALUE.has(s) ? undefined : s;
    };
    const num = (role: Role) => {
      const v = Number(value(role));
      return value(role) === undefined || Number.isNaN(v) ? undefined : v;
    };
    const on = (role: Role) => ents[role]?.state === "on";

    // Anything but a known mode (unavailable, unknown, "None" during a reconnect) is offline.
    const mode: Mode = MODES[source.state] ?? "disconnected";
    const offline = mode === "disconnected";
    const active = mode === "running" || mode === "paused" || mode === "ending" || mode === "error";
    const phaseCode = value("phase") ?? "0";
    const phase = PHASES[phaseCode];

    const errorRaw = value("error") ?? "00";
    const hasError = !offline && (!NO_ERROR.has(errorRaw) || mode === "error");
    const errorCode = ERRORS[errorRaw];
    const errorText = errorCode
      ? t.errors[errorCode]
      : hasError && !NO_ERROR.has(errorRaw)
        ? (this.hass.formatEntityState?.(ents.error!) ?? errorRaw)
        : "";

    const programState = ents.program && value("program") && value("program") !== "No program" ? ents.program : undefined;
    const program = programState ? (this.hass.formatEntityState?.(programState) ?? programState.state) : "";
    const temperature = num("temperature");
    const spin = num("spin_speed");
    const programLine = [
      program,
      temperature ? `${temperature}°` : "",
      spin ? `${spin} rpm` : "",
    ]
      .filter(Boolean)
      .join(" · ");

    const label = hasError ? t.errorLabel(errorCode ?? "").trim() : t.modes[mode];
    const tone: Tone = hasError ? "orange" : MODE_TONE[mode];
    const sub = offline ? t.offline : mode === "ready" ? t.noProgram : programLine || t.modes[mode];
    const icon: Icon = hasError
      ? "error"
      : mode === "disconnected"
        ? "off"
        : mode === "ready"
          ? "ready"
          : mode === "paused"
            ? "paused"
            : mode === "scheduled"
              ? "scheduled"
              : mode === "finished"
                ? "finished"
                : mode === "ending"
                  ? "spin"
                  : ((phase && PHASE_ICON[phase]) ?? "washing");

    const remaining = num("remaining") ?? 0;
    const endTime = value("end_time");
    const endsAt = endTime
      ? this.time(new Date(endTime))
      : remaining > 0
        ? this.time(new Date(Date.now() + remaining * 60000))
        : "—";
    const startTime = value("start_time");

    let rows: Array<[string, string]>;
    if (offline) {
      rows = [[t.program, "—"], [t.remaining, "—"]];
    } else if (mode === "ready") {
      rows = [[t.program, t.noProgramRow], [t.door, on("door") ? t.open : t.closed]];
    } else if (mode === "scheduled") {
      rows = [[t.program, program || "—"], [t.startsAt, startTime ? this.time(new Date(startTime)) : "—"]];
    } else if (mode === "finished") {
      // hOn reports Finished for about two minutes, then Ready.
      const at = source.last_changed;
      rows = [[t.program, program || "—"], [t.finishedRow, `${this.time(new Date(at))} · ${t.ago(this.since(at))}`]];
    } else {
      rows = [
        [t.phase, phase ? t.phases[phase] : "—"],
        [t.remaining, remaining > 0 ? t.duration(remaining) : "—"],
        [t.endsAt, endsAt],
      ];
    }

    const options = offline
      ? []
      : [
          on("energy_saving") && t.energySaving,
          on("night_wash") && t.nightWash,
          on("steam") && t.steam,
        ].filter((x): x is string => Boolean(x));

    const current = mode === "finished" ? 3 : mode === "ending" ? 2 : active ? stepOf(phaseCode, phase) : -1;
    const rinses = num("rinses") ?? 0;
    const steps = t.steps.map((name, i) => {
      const text = i === 1 && rinses > 0 && current >= 0 && current <= 1 ? t.rinsesLeft(rinses) : name;
      const cls =
        i < current
          ? mode === "finished"
            ? "complete"
            : "done"
          : i === current
            ? `current ${hasError ? "error" : mode === "paused" ? "paused" : ""}`
            : "";
      return html`<div class="step ${cls}"><span></span><label>${text}</label></div>`;
    });

    const fmt = (v: number | undefined, digits: number, unit: string) =>
      v === undefined ? "—" : `${v.toFixed(digits)} ${unit}`;
    const stats =
      active || mode === "finished"
        ? [
            [t.energy, fmt(num("energy"), 2, "kWh")],
            [t.water, fmt(num("water"), 0, "L")],
            [t.load, fmt(num("weight"), 0, "kg")],
          ]
        : [];

    const pills: Pill[] = [];
    if (!offline) {
      if (ents.door_lock) {
        pills.push({
          text: on("door_lock") ? t.doorLocked : t.doorUnlocked,
          entity: ents.door_lock,
          icon: "mdi:lock",
          kind: "neutral",
        });
      }
      // hOn reports 0 % for a moment while reconnecting, so an empty tank only counts
      // when the machine is connected (offline is excluded above).
      const detergent = num("detergent");
      if (detergent !== undefined) {
        pills.push({
          text: detergent <= 0 ? t.detergentEmpty : t.detergent(Math.round(detergent)),
          entity: ents.detergent,
          icon: "mdi:bottle-tonic-outline",
          kind: detergent <= 10 ? "bad" : "ok",
        });
      }
      if (on("child_lock")) {
        pills.push({ text: t.childLock, entity: ents.child_lock, icon: "mdi:lock", kind: "neutral" });
      }
    }

    const cycle = value("cycle") ?? "";
    const meanWater = num("mean_water");
    const footer = t.footer(cycle, meanWater === undefined ? "" : String(Math.round(meanWater)));

    return html`
      <ha-card class="tone-${tone}" @click=${(e: Event) => this.moreInfo(e, config.entity)}>
        <div class="head">
          <div class="titles">
            <div class="name">${config.name ?? t.title}</div>
            <div class="muted">${sub}</div>
          </div>
          <span class="chip">${label}</span>
        </div>
        ${errorText
          ? html`<div class="alert">
              ${errorCode ? html`<strong>${errorCode}</strong>` : nothing}<span>${errorText}</span>
            </div>`
          : nothing}
        <div class="body">
          <div class="art">${unsafeHTML(ICONS[icon])}</div>
          <div class="facts">
            ${rows.map(([k, v]) => html`<div class="fact"><span class="muted">${k}</span><span>${v}</span></div>`)}
            ${options.length
              ? html`<div class="options">${options.map((o) => html`<span>${o}</span>`)}</div>`
              : nothing}
          </div>
        </div>
        <div class="steps">${steps}</div>
        ${stats.length
          ? html`<div class="stats">
              ${stats.map(([k, v]) => html`<div class="stat"><span class="muted">${k}</span><span>${v}</span></div>`)}
            </div>`
          : nothing}
        ${pills.length ? html`<div class="pills">${pills.map((p) => this.pill(p))}</div>` : nothing}
        ${footer ? html`<div class="footer muted">${footer}</div>` : nothing}
      </ha-card>`;
  }

  static styles = css`
    ha-card {
      --hwc-blue: var(--blue-color, #2196f3);
      --hwc-ok: var(--success-color, #43a047);
      --hwc-warn: var(--warning-color, #fb8c00);
      --hwc-amber: var(--amber-color, #ffc107);
      --hwc-tone: var(--secondary-text-color);
      padding: 20px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .tone-blue {
      --hwc-tone: var(--hwc-blue);
    }
    .tone-amber {
      --hwc-tone: var(--hwc-amber);
    }
    .tone-purple {
      --hwc-tone: var(--deep-purple-color, #673ab7);
    }
    .tone-orange {
      --hwc-tone: var(--hwc-warn);
    }
    .tone-green {
      --hwc-tone: var(--hwc-ok);
    }
    .head {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .titles {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .name {
      font-size: 16px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .muted,
    .missing {
      color: var(--secondary-text-color);
      font-size: 13px;
    }
    .chip {
      padding: 5px 12px;
      border-radius: 16px;
      font-size: 13px;
      font-weight: 500;
      white-space: nowrap;
      /* Pulled toward the text color so light tones stay readable on light themes. */
      color: color-mix(in srgb, var(--hwc-tone) 65%, var(--primary-text-color));
      background: color-mix(in srgb, var(--hwc-tone) 16%, transparent);
    }
    .alert {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 8px;
      font-size: 13px;
      color: color-mix(in srgb, var(--hwc-warn) 70%, var(--primary-text-color));
      background: color-mix(in srgb, var(--hwc-warn) 16%, transparent);
    }
    .alert strong {
      font-weight: 500;
    }
    .body {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .art {
      width: 136px;
      height: 136px;
      flex: none;
      color: var(--primary-text-color);
    }
    .art svg {
      width: 100%;
      height: 100%;
      display: block;
    }
    .art .paper {
      fill: var(--card-background-color, var(--ha-card-background, #fff));
    }
    .art .paper-stroke {
      stroke: var(--card-background-color, var(--ha-card-background, #fff));
    }
    .art .glass {
      fill: color-mix(in srgb, var(--hwc-blue) 12%, var(--card-background-color, #fff));
    }
    .art .knob-off {
      fill: var(--disabled-text-color, #bdbdbd);
    }
    .facts {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .fact {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      font-size: 14px;
      color: var(--primary-text-color);
    }
    .fact .muted {
      font-size: 14px;
    }
    .fact span:last-child {
      font-weight: 500;
      text-align: right;
    }
    .options {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 6px;
    }
    .options span {
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      color: color-mix(in srgb, var(--hwc-blue) 70%, var(--primary-text-color));
      background: color-mix(in srgb, var(--hwc-blue) 16%, transparent);
    }
    .steps,
    .stats {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 6px;
    }
    .stats {
      gap: 8px;
    }
    .step span {
      display: block;
      height: 6px;
      border-radius: 3px;
      background: var(--divider-color);
    }
    .step.done span {
      background: color-mix(in srgb, var(--primary-color) 45%, transparent);
    }
    .step.current span {
      background: var(--primary-color);
    }
    .step.current.paused span {
      background: var(--hwc-amber);
    }
    .step.current.error span {
      background: var(--hwc-warn);
    }
    .step.complete span {
      background: var(--hwc-ok);
    }
    .step label {
      display: block;
      margin-top: 8px;
      font-size: 13px;
      color: var(--secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .step.current label {
      color: var(--primary-text-color);
      font-weight: 500;
    }
    .stat {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 8px 12px;
      border-radius: 8px;
      background: color-mix(in srgb, var(--primary-text-color) 5%, transparent);
    }
    .stat .muted {
      font-size: 12px;
    }
    .stat span:last-child {
      font-size: 16px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      border-radius: 8px;
      font-size: 12px;
      color: var(--primary-text-color);
      background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
      --mdc-icon-size: 16px;
    }
    .pill ha-state-icon,
    .pill ha-icon {
      --state-icon-color: currentColor;
      color: var(--secondary-text-color);
    }
    .pill.ok ha-state-icon,
    .pill.ok ha-icon {
      color: var(--hwc-ok);
    }
    .pill.bad {
      color: color-mix(in srgb, var(--hwc-warn) 70%, var(--primary-text-color));
      background: color-mix(in srgb, var(--hwc-warn) 16%, transparent);
    }
    .pill.bad ha-state-icon,
    .pill.bad ha-icon {
      color: inherit;
    }
    .pill.link {
      cursor: pointer;
    }
    .footer {
      font-size: 12px;
    }
  `;
}

if (!customElements.get("hon-washer-card")) {
  customElements.define("hon-washer-card", HonWasherCard);
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}

window.customCards = window.customCards ?? [];
if (!window.customCards.some((c) => c.type === "hon-washer-card")) window.customCards.push({
  type: "hon-washer-card",
  name: "hOn Washer Card",
  description: "Cycle steps, end time, consumption and status for an hOn (Haier, Candy, Hoover) washing machine.",
  preview: true,
  documentationURL: "https://github.com/enricodeleo/hon-washer-card",
});

console.info(`%c hon-washer-card ${__VERSION__} `, "background:#55bbf8;color:#111");

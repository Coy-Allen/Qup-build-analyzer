// strange import to force correct typing.
import * as hcgridImport from "../node_modules/honeycomb-grid/dist/honeycomb-grid.mjs";
import type * as hct from "honeycomb-grid";
const hc:typeof hct = hcgridImport;

interface perkData {
	// returns all perkHexs that should be proced
	shouldProc: (gameState:gameState)=>boolean;
	procFunc: (grid:hct.Grid<PerkHex>, cursor:hct.HexCoordinates)=>PerkHex[];
	procMax: number;
}
interface gameState {
	afterFlip: boolean,
	didWin: boolean,
	activationCount: number,
}

const perkDatabase = {
} satisfies Record<string,perkData>;

class PerkHex extends hc.defineHex({ dimensions: 4 }) {
	constructor(coordinates: hct.HexCoordinates) {super(coordinates)}
	static create(coordinates: hct.HexCoordinates){
		const hex = new PerkHex(coordinates)
		return hex
	}
	perkId: keyof typeof perkDatabase;
	procCount: number = 0;
}

const tile = PerkHex;
const grid = new hc.Grid(tile, hc.spiral({ radius: 3 }));
grid.forEach(console.log);

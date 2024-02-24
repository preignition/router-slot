import { html } from "lit";
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { ensureAnchorHistory } from "../lib/util/anchor";
import { ensureHistoryEvents } from "../lib/util/history";
import { path } from "../lib/util/url";
import fixture from './fixture';
import { addBaseTag, clearHistory } from "./test-helpers";

const testPath = `/about`;

describe("anchor", () => {
	async function setupTest(testPath: string){
		const template = html`<a id="anchor" href="${testPath}">Anchor</a>`
		const $anchor = await fixture<HTMLAnchorElement>(template);
		if (!$anchor) {
			throw new Error('Could not query rendered <lapp-test-order>.');
		}
		return {
			$anchor,
		}
	};

	beforeAll(() => {
		ensureHistoryEvents();
		ensureAnchorHistory();
		addBaseTag();
	});

	afterAll(() => {
		clearHistory();
	});

	it("[ensureAnchorHistory] should change anchors to use history API", async () => {
		window.addEventListener("pushstate", () => {
			expect(path({end: false})).to.equal(testPath);
		});
		const {$anchor} = await setupTest(testPath);
		$anchor.click();
	});
	
	it("[ensureAnchorHistory] should not change anchors with target _blank", async () => {
		window.addEventListener("pushstate", () => {
			expect(true).to.equal(false);
		});
		const {$anchor} = await setupTest(testPath);
		$anchor.target = "_blank";
		$anchor.click();
	});

	it("[ensureAnchorHistory] should not change anchors with [data-router-slot]='disabled'", async () => {
		window.addEventListener("pushstate", () => {
			expect(true).to.equal(false);
		});
		const {$anchor} = await setupTest(testPath);
		$anchor.setAttribute("data-router-slot", "disabled");
		$anchor.click();
	});
});

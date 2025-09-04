import { withPluginApi } from "discourse/lib/plugin-api";

const observer = new MutationObserver(mutationCallback);

function mutationCallback(records)
{
	for (const r of records)
	{
		for (const x of r.addedNodes)
		{
			if (	x.nodeType === Node.ELEMENT_NODE &&
				x.classList.contains("d-editor-input") )
			{
				x.setAttribute("spellcheck", "false");
				observer.disconnect();
			}
		}
	}
}

function initialize(api)
{
	const changes =
	{
		didInsertElement()
		{
			this._super();

			const options = {subtree: true, childList: true};
			observer.observe(this.element, options);
		}
	};

	api.modifyClass("component:d-editor", changes);
}

export default
{
	name: "disable-spell-checking",
	initialize()
	{
		withPluginApi("1.38.0", initialize)
	}
};

import { withPluginApi } from "discourse/lib/plugin-api";

function initialize(api)
{
	const changes =
	{
		didInsertElement()
		{
			this._super();

			const input = this.element.querySelector(".d-editor-input")
			input.setAttribute("spellcheck", "false");
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

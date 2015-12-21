		/* building react helloworld component */
		var HelloWorld = React.createClass({
			render: function () {
				return (
					<div>
						<h1>Hello World!!!</h1>
						<p>This is changes</p>
					</div>
					);
			}
		});
		React.render(<HelloWorld />, document.body);

		// /* Transformed to this output */
		// var HelloWorld = React.createClass({displayName: "HelloWorld",
		// 	render: function () {
		// 		return (
		// 			React.createElement("div", null, 
		// 				React.createElement("h1", null, "Hello World!!!"), 
		// 				React.createElement("p", null, "This is some text in the hello world component")
		// 			)
		// 			);
		// 	}
		// });
		// React.render(React.createElement(HelloWorld, null), document.body);
var Note = React.createClass({displayName: "Note",
	getInitialState: function () {
		return {editing: false};
	},
	create: function() {
		alert('creating new note');
	},
	edit: function() {
		this.setState({editing: true});
	},
	save: function() {
		// supposedly React getDOMNode has been deprecated in favor of ReactDOM.FindDOMNode
		// but that isn't working either
		var val = this.refs.newText.getDOMNode().value;
		alert("TODO: save note value " + val);
		this.setState({editing: false});
	},
	remove: function() {
		alert('remove note');
	},
	renderDisplay: function() {
		return (
			React.createElement("div", {className: "note"}, 
				React.createElement("p", null, this.props.children), 
				React.createElement("span", null, 
					React.createElement("button", {onClick: this.create, 
						className: "btn btn-success glyphicon glyphicon-plus"}), 
					React.createElement("button", {onClick: this.edit, 
						className: "btn btn-primary glyphicon glyphicon-pencil"}), 
					React.createElement("button", {onClick: this.remove, 
						className: "btn btn-danger glyphicon glyphicon-trash"})
				)
			)
			);
	},
	renderForm: function() {
		return (
			React.createElement("div", {className: "note"}, 
				React.createElement("textarea", {ref: "newText", defaultValue: this.props.children, className: "form-control"}), 
				React.createElement("button", {onClick: this.save, className: "btn btn-success btn-sm glyphicon glyphicon-floppy-disk"})
			)
			);
	},
	render: function() {
		if (this.state.editing) {
			return this.renderForm();
		} else {
			return this.renderDisplay();
		}
	}
});

var Board = React.createClass({displayName: "Board",
	// propTypes from react library, helps handle validation
	propTypes: {
		count: function(props, propName) {
			if (typeof props[propName] !== "number") {
				return new Error('The count property must be a number');
			}
			if (props[propName] > 100) {
				return new Error("creating " + props[propName] + " notes is ridiculous");
			}
		}
	},

	render: function() {
		return React.createElement("div", {className: "board"}, this.props.count)
	}
});

React.render(React.createElement(Board, {count: 10}), 
	document.getElementById("react-container")
	);
var Note = React.createClass({displayName: "Note",
	getInitialState: function () {
		return {editing: false};
	},
	// react function, component will mount
	// react fires this right before first render
	componentWillMount: function () {
		console.log("componentWillMount");
		// generate random position via top/bottom
		// generate random rotation
		this.style = {
			right: this.randomBetween(0, window.innerWidth - 150) + 'px',
			top: this.randomBetween(0, window.innerHeight - 150) + 'px',
			transform: 'rotate(' + this.randomBetween(-15, 15) + 'deg)'
		};
	},
	// to drag notes around board
	componentDidMount: function () {
		$(this.getDOMNode()).draggable();
	},
	// generate a random number between min and max
	randomBetween: function(min, max) {
		return (min + Math.ceil(Math.random() * max));
	},
	edit: function() {
		this.setState({editing: true});
	},
	save: function() {
		// supposedly React getDOMNode has been deprecated in favor of ReactDOM.FindDOMNode
		// but that isn't working either
		this.props.onChange(this.refs.newText.getDOMNode().value, this.props.index);
		this.setState({editing: false});
	},
	remove: function() {
		this.props.onRemove(this.props.index);
	},
	// display static note
	renderDisplay: function() {
		return (
			React.createElement("div", {className: "note", 
				style: this.style}, 
				React.createElement("p", null, this.props.children), 
				React.createElement("span", null, 
					React.createElement("button", {onClick: this.edit, 
						className: "btn btn-primary glyphicon glyphicon-pencil"}), 
					React.createElement("button", {onClick: this.remove, 
						className: "btn btn-danger glyphicon glyphicon-trash"})
				)
			)
			);
	},
	// for editing state, so can edit text
	renderForm: function() {
		return (
			React.createElement("div", {className: "note", 
				style: this.style}, 
				React.createElement("textarea", {ref: "newText", defaultValue: this.props.children, className: "form-control"}), 
				React.createElement("button", {onClick: this.save, className: "btn btn-success btn-sm glyphicon glyphicon-floppy-disk"})
			)
			);
	},
	// depending on whether note is currently in editing state, render differently
	render: function() {
		if (this.state.editing) {
			return this.renderForm();
		} else {
			return this.renderDisplay();
		}
	}
});